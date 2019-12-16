using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Z01.Models;
using Z01.services;

namespace Z4.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly NoteService _noteService;
        private readonly MyContext _myContext;

        public CategoriesController(MyContext myContext)
        {
            _myContext = myContext;
            _noteService = new NoteService(myContext);
        }

        // GET api/categories
        [HttpGet]
        public ActionResult<CategoriesResponse> Get()
        {
            return new CategoriesResponse
            {
                Categories = _noteService.GetAllCategories()
            };
        }

        public class CategoriesResponse
        {
            public IEnumerable<Category> Categories { get; set; }
        }
    }
}
