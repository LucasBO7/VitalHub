using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Repositories;
using WebAPI.ViewModels;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultasController : ControllerBase
    {

        private IConsultaRepository consultaRepository;
        public ConsultasController()
        {
            consultaRepository = new ConsultaRepository();
        }


        [HttpGet("BuscarPorId")]
        public IActionResult BuscarPorId(Guid idConsulta)
        {
            Consulta consultaBuscada = consultaRepository.BuscarPorId(idConsulta);
            return Ok(consultaBuscada);
        }

        [Authorize]
        [HttpGet("ConsultasPaciente")]
        public IActionResult GetByIdPatient()
        {
            try
            {
                Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);
                List<Consulta> consultas = consultaRepository.ListarPorPaciente(idUsuario);
                return Ok(consultas);
            }
            catch (Exception exc)
            {
                return BadRequest(exc.Message);
            }
        }

        [Authorize(Roles = "Medico")]
        [HttpGet("ConsultasMedico")]
        public IActionResult GetByIdDoctor()
        {
            try
            {
                Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                List<Consulta> consultas = consultaRepository.ListarPorMedico(idUsuario);
                return Ok(consultas);
            }
            catch (Exception exc)
            {
                return BadRequest(exc.Message);
            }
        }

        [HttpPost("Cadastrar")]
        public IActionResult Post(ConsultaViewModel consultaViewModel)
        {
            try
            {
                Consulta consulta = new()
                {
                    SituacaoId = consultaViewModel.SituacaoId,
                    PacienteId = consultaViewModel.PacienteId,
                    MedicoClinicaId = consultaViewModel.MedicoClinicaId,

                    Receita = new(),

                    PrioridadeId = consultaViewModel.PrioridadeId,
                    DataConsulta = consultaViewModel.DataConsulta,
                    Descricao = consultaViewModel.Descricao,
                    Diagnostico = consultaViewModel.Diagnostico
                };

                consultaRepository.Cadastrar(consulta);
            }
            catch (Exception exc)
            {
                BadRequest(exc.Message);
            }
        }

        [HttpPut("Status")]
        public IActionResult UpdateStatus(Guid idConsulta, string status)
        {
            try
            {
                consultaRepository.EditarStatus(idConsulta, status);

                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("Prontuario")]
        public IActionResult UpdateMedicalRecord(ProntuarioViewModel prontuarioviewModel)
        {
            try
            {
                Consulta consulta = consultaRepository.BuscarPorId(prontuarioviewModel.ConsultaId);

                consulta.Descricao = prontuarioviewModel.Descricao;

                consulta.Diagnostico = prontuarioviewModel.Diagnostico;

                if (consulta.ReceitaId != null && prontuarioviewModel.Medicamento != null)
                {
                    consulta.Receita!.Medicamento = prontuarioviewModel.Medicamento;
                }
                if (consulta.ReceitaId == null && prontuarioviewModel.Medicamento != null)
                {

                    Receita receita = new Receita
                    {
                        Medicamento = prontuarioviewModel.Medicamento
                    };

                    consulta.Receita = receita;
                }

                consultaRepository.EditarProntuario(consulta);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
