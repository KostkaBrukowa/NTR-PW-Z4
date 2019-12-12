using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Z01.services;

namespace Z4.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly CategoryService _categoriesService = new CategoryService();

        // GET api/categories
        [HttpGet]
        public ActionResult<CategoriesResponse> Get()
        {
            return new CategoriesResponse
            {
                Categories = _categoriesService.GetAllCategories()
            };
        }

        public class CategoriesResponse
        {
            public IEnumerable<string> Categories { get; set; }
        }
    }
}
