using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HealthWiseBackend.API.Data;
using HealthWiseBackend.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HealthWiseBackend.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class PeopleController : ControllerBase
  {
    private readonly HealthWiseDbContext _healthWiseDbContext;

    public PeopleController(HealthWiseDbContext healthWiseDbContext)
    {
      _healthWiseDbContext = healthWiseDbContext;
    }
    // GET: api/<PeopleController>
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<List<PersonDto>>> Get()
    {
      var people = await _healthWiseDbContext.People.Select(person => new PersonDto { Id = person.Id, Firstname = person.Firstname, Lastname = person.Lastname}).ToListAsync();
      return Ok(people);
    }

    // GET api/<PeopleController>/5
    [HttpGet("{id}")]
    public async Task<ActionResult<PersonDto>> Get(Guid id)
    {
      var person = await _healthWiseDbContext.People.FindAsync(id);

      if (person == null)
      {
        return NotFound("The person does not exist");
      }

      var personDto = new PersonDto {
        Id = person.Id,
        Firstname = person.Firstname,
        Lastname = person.Lastname,
      };
      return Ok(personDto);
    }

    // POST api/<PeopleController>
    [HttpPost]
    public void Post([FromBody] string value)
    {
    }

    // PUT api/<PeopleController>/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody] string value)
    {
    }

    // DELETE api/<PeopleController>/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
  }
}
