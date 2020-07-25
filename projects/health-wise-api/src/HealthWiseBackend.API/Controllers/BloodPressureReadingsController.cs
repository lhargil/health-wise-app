using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HealthWiseBackend.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HealthWiseBackend.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class BloodPressureReadingsController : ControllerBase
  {
    private readonly HealthWiseDbContext _healthWiseDbContext;

    public BloodPressureReadingsController(HealthWiseDbContext healthWiseDbContext)
    {
      _healthWiseDbContext = healthWiseDbContext;
    }
    // GET: api/<BloodPressureReadingsController>
    [HttpGet]
    public async Task<ActionResult> Get()
    {
      return Ok(await _healthWiseDbContext.BloodPressureReadings.ToListAsync());
    }

    // GET api/<BloodPressureReadingsController>/5
    [HttpGet("{id}")]
    public string Get(int id)
    {
      return "value";
    }

    // POST api/<BloodPressureReadingsController>
    [HttpPost]
    public void Post([FromBody] string value)
    {
    }

    // PUT api/<BloodPressureReadingsController>/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody] string value)
    {
    }

    // DELETE api/<BloodPressureReadingsController>/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
  }
}
