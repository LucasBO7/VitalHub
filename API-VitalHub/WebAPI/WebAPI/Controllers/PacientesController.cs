﻿using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Repositories;
using WebAPI.Utils.BlobStorage;
using WebAPI.Utils.Mail;
using WebAPI.ViewModels;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PacientesController : ControllerBase
    {
        private IPacienteRepository pacienteRepository { get; set; }

        private readonly EmailSendingService _emailSendingService;

        public PacientesController(EmailSendingService emailSendingService)
        {
            pacienteRepository = new PacienteRepository();
            _emailSendingService = emailSendingService;
        }

        [HttpGet("PerfilLogado")]
        public IActionResult GetLogged()
        {
            try
            {
                Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                return Ok(pacienteRepository.BuscarPorId(idUsuario));

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //[Authorize]
        [HttpGet("BuscarPorId")]
        public IActionResult BuscarPorId(Guid id)
        {
            return Ok(pacienteRepository.BuscarPorId(id));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] PacienteViewModel pacienteModel)
        {
            try
            {
                //objeto a ser cadastrado
                Usuario user = new Usuario();

                //recebe os valores e preenche as propriedades do objeto
                user.Nome = pacienteModel.Nome;
                user.Email = pacienteModel.Email;
                user.TipoUsuarioId = pacienteModel.IdTipoUsuario;

                //define o nome do container do blob
                var containerName = "containervitalhubtardeg9";

                //define a string de conexão
                var connectionString = "DefaultEndpointsProtocol=https;AccountName=blobvitalhubgrupo9lucas;AccountKey=HkZ7y53ynW0tBGwN4THDHaNqsqK/re+Pf7JYsl+X3d43BpkazDCSCxDxvvZC1jkpIJJJkNkHf62B+AStDAOLMw==;EndpointSuffix=core.windows.net";

                //aqui vamos chamar o método para upload da imagem
                user.Foto = await AzureBlobStorageHelper.UploadImageBlobAsync(pacienteModel.Arquivo!, connectionString, containerName);

                user.Senha = pacienteModel.Senha;

                user.Paciente = new Paciente();
                user.Paciente.DataNascimento = pacienteModel.DataNascimento;
                user.Paciente.Rg = pacienteModel.Rg;
                user.Paciente.Cpf = pacienteModel.Cpf;

                user.Paciente.Endereco = new Endereco();
                user.Paciente.Endereco.Logradouro = pacienteModel.Logradouro;
                user.Paciente.Endereco.Numero = pacienteModel.Numero;
                user.Paciente.Endereco.Cep = pacienteModel.Cep;
                user.Paciente.Endereco.Cidade = pacienteModel.Cidade;

                pacienteRepository.Cadastrar( user);

                await _emailSendingService.SendWelcomeEmail(user.Email!, user.Nome!);

                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        //[HttpPost]
        //public async Task<IActionResult> Post([FromForm] PacienteViewModel pacienteModel)
        //{
        //    try
        //    {
        //        //objeto a ser cadastrado
        //        Usuario user = new Usuario();

        //        //recebe os valores e preenche as propriedades do objeto
        //        user.Nome = pacienteModel.Nome;
        //        user.Email = pacienteModel.Email;
        //        user.TipoUsuarioId = pacienteModel.IdTipoUsuario;

        //        //define o nome do container do blob
        //        var containerName = "containervitalhubtarde";

        //        //define a string de conexão
        //        var connectionString = "DefaultEndpointsProtocol=https;AccountName=blobvitalhubgrupo9lucas;AccountKey=HkZ7y53ynW0tBGwN4THDHaNqsqK/re+Pf7JYsl+X3d43BpkazDCSCxDxvvZC1jkpIJJJkNkHf62B+AStDAOLMw==;EndpointSuffix=core.windows.net";

        //        //aqui vamos chamar o método para upload da imagem
        //        user.Foto = await AzureBlobStorageHelper.UploadImageBlobAsync(pacienteModel.Arquivo!, connectionString, containerName);

        //        user.Senha = pacienteModel.Senha;

        //        user.Paciente = new Paciente();
        //        user.Paciente.DataNascimento = pacienteModel.DataNascimento;
        //        user.Paciente.Rg = pacienteModel.Rg;
        //        user.Paciente.Cpf = pacienteModel.Cpf;

        //        user.Paciente.Endereco = new Endereco();
        //        user.Paciente.Endereco.Logradouro = pacienteModel.Logradouro;
        //        user.Paciente.Endereco.Numero = pacienteModel.Numero;
        //        user.Paciente.Endereco.Cep = pacienteModel.Cep;
        //        user.Paciente.Endereco.Cidade = pacienteModel.Cidade;

        //        pacienteRepository.Cadastrar(user);

        //        await _emailSendingService.SendWelcomeEmail(user.Email!, user.Nome!);

        //        return Ok(user);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

        [HttpGet("BuscarPorData")]
        public IActionResult GetByDate(DateTime data, Guid id)
        {
            try
            {
                return Ok(pacienteRepository.BuscarPorData(data, id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public IActionResult UpdateProfile(Guid idUsuario, PacienteViewModel paciente)
        {
            try
            {
                return Ok(pacienteRepository.AtualizarPerfil(idUsuario, paciente));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}