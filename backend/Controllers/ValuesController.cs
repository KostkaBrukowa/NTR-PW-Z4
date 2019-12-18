using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GraphQL;
using GraphQL.Types;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Z01.Exceptions;
using Z01.Models;
using Z01.services;
using Z4.dto;
using Z4.GraphQL.resolvers;
using Z4.GraphQL.types;
using Z4.Mappers;

namespace Z4.Controllers
{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class ValuesController : ControllerBase
//    {
//        private readonly NoteService _noteService;
//        private readonly MyContext _myContext;
//
//        public ValuesController(MyContext myContext)
//        {
//            _myContext = myContext;
//            _noteService = new NoteService(myContext);
//        }
//
//        // GET api/values
//        [HttpGet]
//        public ActionResult<PaginatedResponse<NoteResponseDTO>> Get([FromQuery] NoteFilterModel filters)
//        {
//            var (maxPages, total, notes) = _noteService.GetAllNotes(filters);
//            var noteMapper = new NoteMapper();
//            var noteResponse = notes.Select(_ => noteMapper.mapNoteToResponse(_));
//
//            return new PaginatedResponse<NoteResponseDTO> {total = total, values = noteResponse};
//        }
//
//        // GET api/values/5
//        [HttpGet("{id}")]
//        public ActionResult<Note> Get(int id)
//        {
//            return _noteService.GetNoteById(id);
//        }
//
//        // POST api/values
//        [HttpPost]
//        [ProducesResponseType(StatusCodes.Status400BadRequest)]
//        public ActionResult Post([FromBody] NoteRequestDTO note)
//        {
//            try
//            {
//                var noteMapper = new NoteMapper();
//                _noteService.SaveNote(noteMapper.mapResponseToNote(note), note.Categories.ToArray());
//                return Ok();
//            }
//            catch (TitleNotUniqueException)
//            {
//                return BadRequest(new ErrorResponse {Error = "Title is not unique"});
//            }
//        }
//
//        // PUT api/values
//        [HttpPut]
//        public ActionResult Put([FromBody] NoteRequestDTO note)
//        {
//            try
//            {
//                var noteMapper = new NoteMapper();
//                _noteService.SaveNote(noteMapper.mapResponseToNote(note), note.Categories.ToArray());
//                return Ok();
//            }
//            catch (TitleNotUniqueException)
//            {
//                return BadRequest(new ErrorResponse {Error = "Title is not unique"});
//            }
//        }
//
//        // DELETE api/values/5
//        [HttpDelete("{id}")]
//        public async Task<StatusCodeResult> Delete(int id, byte[] rowVersion)
//        {
//            try
//            {
//                await _noteService.RemoveNote(id, rowVersion);
//                return NoContent();
//            }
//            catch (EntityNotFoundException)
//            {
//                return NotFound();
//            }
//        }
//
//        private class ErrorResponse
//        {
//            public string Error { get; set; }
//        }
//
//        public class PaginatedResponse<T>
//        {
//            public int total { get; set; }
//            public IEnumerable<T> values { get; set; }
//        }
//    }
    [Route("graphql")]
    [ApiController]
    public class GraphQLController : Controller
    {
        private readonly MyContext _myContext;

        public GraphQLController(MyContext myContext)
        {
            _myContext = myContext;
        }

        public async Task<IActionResult> Post([FromBody] GraphQLQuery query)
        {
            var inputs = query.Variables.ToInputs();

            var schema = new Schema
            {
                Query = new NoteQuery(_myContext),
                Mutation = new NoteMutation(_myContext)
            };

            var result = await new DocumentExecuter().ExecuteAsync(_ =>
            {
                _.Schema = schema;
                _.Query = query.Query;
                _.OperationName = query.OperationName;
                _.Inputs = inputs;
            });

            if(result.Errors?.Count > 0)
            {
                return BadRequest(result.Errors);
            }

            return Ok(result);
        }
    }

}
