using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace Z01.Models
{
  public class NoteFilterModel
  {
    private int _page;

    public NoteFilterModel(NoteFilterModel other)
    {
      From = other.From;
      To = other.To;
      Category = other.Category;
      Page = other.Page;
      PageSize = other.PageSize;
    }

    public NoteFilterModel(DateTime from, DateTime to, string category, int page, int pageSize)
    {
      From = from == new DateTime() ? DateTime.Now.AddDays(-7) : from;
      To = to == new DateTime() ? DateTime.Now.AddDays(1) : to;
      Category = category;
      Page = page < 0 ? 0 : page;
      PageSize = pageSize;
    }

    public NoteFilterModel() : this(new DateTime(), new DateTime(), null, 0,  5)
    {
    }


    [DataType(DataType.Date)] public DateTime From { get; set; }
    [DataType(DataType.Date)] public DateTime To { get; set; }
    public string Category { get; set; }
    public int PageSize { get; set; }

    [HiddenInput]
    public int Page
    {
      get => _page;
      set => _page = value < 0 ? 0 : value;
    }

    public NoteFilterModel TrimPages(int maxPage)
    {
      if (Page > maxPage) Page = maxPage;

      return this;
    }
  }
}
