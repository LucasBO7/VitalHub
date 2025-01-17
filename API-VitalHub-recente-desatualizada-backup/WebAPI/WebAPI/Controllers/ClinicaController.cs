using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Repositories;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClinicaController : ControllerBase
    {
        private IClinicaRepository clinicaRepository;
        public ClinicaController()
        {
            clinicaRepository = new ClinicaRepository();
        }

        [HttpGet("ListarTodas")]
        public IActionResult Get()
        {
            try
            {
                return Ok(clinicaRepository.Listar());
            }
            catch (Exception exc)
            {
                return BadRequest(exc.Message);
            }
        }

        [HttpPost("Cadastrar")]
        public IActionResult Post(Clinica clinica)
        {
            clinicaRepository.Cadastrar(clinica);
            return StatusCode(201);
        }

        [HttpGet("BuscarPorId")]
        public IActionResult GetById(Guid id)
        {
            try
            {
                return Ok(clinicaRepository.BuscarPorId(id));
            }
            catch (Exception exc)
            {
                return BadRequest(exc.Message);
            }
        }

        [HttpGet("BuscarPorCidade")]
        public IActionResult GetByCity(string cidade)
        {
            try
            {
                return Ok(clinicaRepository.ListarPorCidade(cidade));

            }
            catch (Exception exc)
            {
                return BadRequest(exc.Message);
            }
        }
    }
}
