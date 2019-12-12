using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Text;
using System.Web.Http;
using System.Net.Http.Formatting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Z01.Exceptions;
using Z01.Models;
using Z01.services;

namespace Z4.Controllers
{
    [Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly NoteService _noteService = new NoteService();

        private class ErrorResponse
        {
            public string Error { get; set; }
        }

        public class PaginatedResponse<T>
        {
            public int total { get; set; }
            public IEnumerable<T> values { get; set; }
        }

        public string RandomString(int size, bool lowerCase)
        {
            StringBuilder builder = new StringBuilder();
            Random random = new Random();
            char ch;
            for (int i = 0; i < size; i++)
            {
                ch = Convert.ToChar(Convert.ToInt32(Math.Floor(26 * random.NextDouble() + 65)));
                builder.Append(ch);
            }

            if (lowerCase)
                return builder.ToString().ToLower();
            return builder.ToString();
        }

        // GET api/values
        [Microsoft.AspNetCore.Mvc.HttpGet]
        public ActionResult<PaginatedResponse<NoteModel>> Get([FromQuery] NoteFilterModel filters)
        {
            var (total, notes) = _noteService.GetAllNotes(filters);

            return new PaginatedResponse<NoteModel> {total = total, values = notes};
        }

        // GET api/values/5
        [Microsoft.AspNetCore.Mvc.HttpGet("{id}")]
        public ActionResult<NoteModel> Get(string id)
        {
            return _noteService.GetNoteById(id);
        }

        // POST api/values
        [Microsoft.AspNetCore.Mvc.HttpPost]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult Post([Microsoft.AspNetCore.Mvc.FromBody] NoteModel note)
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
        [Microsoft.AspNetCore.Mvc.HttpPut]
        public ActionResult Put([Microsoft.AspNetCore.Mvc.FromBody] NoteModel note)
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
        [Microsoft.AspNetCore.Mvc.HttpDelete("{id}")]
        public StatusCodeResult Delete(string id)
        {
            try
            {
                _noteService.RemoveNote(id.ToString());
                return NoContent();
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }
        }
    }
}
