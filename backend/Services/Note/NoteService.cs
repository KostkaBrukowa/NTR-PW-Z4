using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL;
using Microsoft.EntityFrameworkCore;
using Z01.Exceptions;
using Z01.Models;

namespace Z01.services
{
  public class NoteService
  {
    private readonly MyContext _myContext;

    public NoteService(MyContext myContext)
    {
      _myContext = myContext;
    }

    private void DeleteUnusedCategories(Note noteToUpdate, string[] categories)
    {
      var categoriesToDelete = noteToUpdate.NoteCategories
          .Where(noteCategory => categories.All(it => it != noteCategory.Category.Name))
          .ToList();

      categoriesToDelete.ForEach(it =>
      {
        noteToUpdate.NoteCategories.Remove(it);

        var category = _myContext.Categories
          .Include(itt => itt.NoteCategories)
          .First(itt => itt.CategoryID == it.CategoryID);
        if (category.NoteCategories.Count <= 1)
        {
          _myContext.Categories.Remove(category);
        }
      });
    }

    private void UpdateCategories(Note noteToUpdate, string[] categories)
    {
      foreach (var categoryName in categories)
      {
        if (noteToUpdate.NoteCategories.Any(it => it.Category.Name == categoryName)) continue;

        var category = _myContext.Categories.SingleOrDefault(t => t.Name == categoryName);

        if (category == null)
        {
          category = new Category { Name = categoryName };
          _myContext.Categories.Add(category);
        }

        noteToUpdate.NoteCategories.Add(new NoteCategory()
        {
          Category = category,
          Note = noteToUpdate,
          CategoryID = category.CategoryID,
          NoteID = noteToUpdate.NoteID ?? 0
        });
      }

      DeleteUnusedCategories(noteToUpdate, categories);
    }

    private async Task<bool> UpdateNote(Note note, string[] categories)
    {
      if (note.RowVersionString == null)
      {
        throw new ExecutionError("Row version was not passed");
      }

      var noteToUpdate = _myContext.Notes
          .Include(it => it.NoteCategories)
          .ThenInclude(it => it.Category)
          .FirstOrDefault(it => it.NoteID == note.NoteID);

      if (noteToUpdate == null)
      {
        throw new ExecutionError("Someone has already deleted this note.");
      }

      var rowVersion = Convert.FromBase64String(note.RowVersionString);

      _myContext.Entry(noteToUpdate).Property("RowVersion").OriginalValue = rowVersion;

      noteToUpdate.Title = note.Title;
      noteToUpdate.Description = note.Description;
      noteToUpdate.Markdown = note.Markdown;

      UpdateCategories(noteToUpdate, categories);

      try
      {
        await _myContext.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException e)
      {
        throw new ExecutionError("Some has already edited this note. Refresh the page and try again.");
      }

      return true;
    }

    private async Task<bool> SaveNewNote(Note note, string[] categories)
    {
      note.NoteCategories = new List<NoteCategory>();
      _myContext.Notes.Add(note);

      //            throw new ExecutionError("Title was not unique.");

      UpdateCategories(note, categories);

      await _myContext.SaveChangesAsync();

      return true;
    }

    public Tuple<int, List<Note>> GetAllNotes(NoteFilterModel filterModel)
    {
      var notes = _myContext.Notes
          .Include(it => it.NoteCategories)
          .ThenInclude(it => it.Category)
          .ToList();

      var notesFilteredByCategory = filterModel.Category == null
          ? notes
          : notes
              .Where(_ => _.NoteCategories.Any(__ => __.Category.Name == filterModel.Category));

      var filteredNotes = notesFilteredByCategory
          .Where(it => it.NoteDate >= filterModel.DateFrom)
          .Where(it => it.NoteDate <= filterModel.DateTo.AddDays(1))
          .ToList();

      //            filteredNotes.ForEach(it => it.RowVersionString = it.RowVersion.ToString());

      var maxPages = (int)Math.Ceiling((double)((filteredNotes.Count - 1) / (filterModel.PageSize)));
      filterModel.TrimPages(maxPages);

      var paginatedNotes = filteredNotes
          .Skip(filterModel.Page * filterModel.PageSize)
          .Take(filterModel.PageSize)
          .ToList();

      return new Tuple<int, List<Note>>(filteredNotes.Count, paginatedNotes);
    }

    public Note GetNoteById(int id)
    {
      var todoItem = _myContext.Notes
          .Include(it => it.NoteCategories)
          .ThenInclude(it => it.Category);

      return todoItem.FirstOrDefault(it => it.NoteID == id);
    }

    public Task<bool> SaveNote(Note note)
    {
      var categories = note.Categories;
      note.Description = note.Description.TrimEnd();

      return note.NoteID == null ? SaveNewNote(note, categories) : UpdateNote(note, categories);
    }

    public async Task<bool> RemoveNote(int id, string rowVersionString)
    {
      var todoItem = _myContext.Notes
          .Include(it => it.NoteCategories)
          .ThenInclude(it => it.Category)
          .FirstOrDefault(it => it.NoteID == id);

      var rowVersion = Convert.FromBase64String(rowVersionString);

      if (todoItem == null)
      {
        throw new ExecutionError("Note was not found");
      }

      if (!todoItem.RowVersion.SequenceEqual(rowVersion))
      {
        throw new ExecutionError("Someone has deleted this note before you");
      }

      DeleteUnusedCategories(todoItem, new string[] { });
      _myContext.Notes.Remove(todoItem);

      try
      {
        await _myContext.SaveChangesAsync();
      }
      catch (Exception e)
      {
        Console.WriteLine("dupa");
      }

      return true;
    }

    public HashSet<Category> GetAllCategories()
    {
      var noteCategories = _myContext.NoteCategories
          .Include(it => it.Category)
          .Include(it => it.Note)
          .Where(it => it.Note != null)
          .Select(it => it.Category)
          .ToHashSet();

      return noteCategories;
    }

    public List<string> GetNoteCategories(int noteId)
    {
      var categories = _myContext.NoteCategories
          .Include(it => it.Category)
          .Include(it => it.Note)
          .Where(it => it.Note.NoteID == noteId)
          .Select(it => it.Category.Name)
          .ToList();

      return categories;
    }
  }
}
