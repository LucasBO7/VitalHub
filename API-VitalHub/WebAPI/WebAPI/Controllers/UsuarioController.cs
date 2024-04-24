using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Repositories;
using WebAPI.Utils.BlobStorage;
using WebAPI.ViewModels;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private IUsuarioRepository usuarioRepository { get; set; }

        public UsuarioController()
        {
            usuarioRepository = new UsuarioRepository();
        }

        [HttpPut("AlterarSenha")]
        public IActionResult UpdatePassword(string email, AlterarSenhaViewModel senha)
        {
            try
            {
                usuarioRepository.AlterarSenha(email, senha.SenhaNova!);

                return Ok("Senha alterada com sucesso !");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("BuscarPorId")]
        public IActionResult GetById(Guid id)
        {
            try
            {
                return Ok(usuarioRepository.BuscarPorId(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("AlterarFotoPerfil")]
        public async Task<IActionResult> UploadProfileImage(Guid id,[FromForm] UsuarioViewModel user)
        {
            try
            {
                Usuario usuarioBuscado = usuarioRepository.BuscarPorId(id);

                if (usuarioBuscado == null)
                {
                    return NotFound();
                }

                // Lógica para o upload de imagem
                // String de conexão com o serviço Azure
                var connectionString = "DefaultEndpointsProtocol=https;AccountName=blobvitalhubgrupo9lucas;AccountKey=HkZ7y53ynW0tBGwN4THDHaNqsqK/re+Pf7JYsl+X3d43BpkazDCSCxDxvvZC1jkpIJJJkNkHf62B+AStDAOLMw==;EndpointSuffix=core.windows.net";

                // Nome do Blob
                var containerName = "containervitalhubtardeg9";

                // Realiza o upload de imagem e guarda a url da imagem na variável
                string photoUrl = await AzureBlobStorageHelper.UploadImageBlobAsync(user.Arquivo!, connectionString, containerName);
                // Fim da lógica para upload de imagem

                // usuarioBuscado.Foto = photoUrl;
                usuarioRepository.AtualizarFoto(id, photoUrl);

                return Ok(photoUrl);
            }
            catch (Exception exc)
            {
                return BadRequest(exc.Message);
            }
        }
    }
}
