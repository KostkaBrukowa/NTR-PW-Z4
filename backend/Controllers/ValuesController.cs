using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Z01.Exceptions;
using Z01.Models;
using Z01.services;

namespace Z4.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly NoteService _noteService = new NoteService();

        // GET api/values
        [HttpGet]
        public ActionResult<PaginatedResponse<NoteModel>> Get([FromQuery] NoteFilterModel filters)
        {
            var (total, notes) = _noteService.GetAllNotes(filters);

            return new PaginatedResponse<NoteModel> {total = total, values = notes};
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<NoteModel> Get(string id)
        {
            return _noteService.GetNoteById(id);
        }

        // POST api/values
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult Post([FromBody] NoteModel note)
        {
            try
            {
                _noteService.SaveNote(note);
                return Ok();
            }
            catch (TitleNotUniqueException)
            {
                return BadRequest(new ErrorResponse {Error = "Title is not unique"});
            }
        }

        // PUT api/values
        [HttpPut]
        public ActionResult Put([FromBody] NoteModel note)
        {
            try
            {
                _noteService.SaveNote(note);
                return Ok();
            }
            catch (TitleNotUniqueException)
            {
                return BadRequest(new ErrorResponse {Error = "Title is not unique"});
            }
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public StatusCodeResult Delete(string id)
        {
            try
            {
                _noteService.RemoveNote(id);
                return NoContent();
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }
        }

        private class ErrorResponse
        {
            public string Error { get; set; }
        }

        public class PaginatedResponse<T>
        {
            public int total { get; set; }
            public IEnumerable<T> values { get; set; }
        }
    }
}
