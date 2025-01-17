using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Repositories;
using WebAPI.Utils.Mail;
using WebAPI.ViewModels;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SendMailController : ControllerBase
    {
        private readonly IEmailService emailService;

        public SendMailController(IEmailService service)
        {
            emailService = service;
        }

        [HttpPost]
        public async Task<IActionResult> SendMail(string email, string userName)
        {
            try
            {
                //cria objeto paara receber os dados do e-mail
                MailRequest mailRequest = new MailRequest();

                //Define o endereço
                mailRequest.ToEmail = email;

                //Define o assunto
                mailRequest.Subject = "Olá, esse é um e-mail vindo da turma de Dev";

                //Define o corpo do e-mail ou seja toda a parte visual do e-mail que está na função
                mailRequest.Body = GetHtmlContent(userName);

                //Chama o método que envia o e-mail
                await emailService.SendEmailAsync(mailRequest);

                return Ok("E-mail enviado com sucesso");
            }
            catch (Exception)
            {
                return BadRequest("Falha ao enviar o E-mail verifique os dados e tente novamente!");
            }
        }
        private string GetHtmlContent(string userName)
        {
            // Constrói o conteúdo HTML do e-mail, incluindo o nome do usuário
            //@ simbolo de interpolação
            string Response = @"
            <div style=""width:100%; background-color:rgba(96, 191, 197, 1); padding: 20px;"">
                <div style=""max-width: 600px; margin: 0 auto; background-color:#FFFFFF; border-radius: 10px; padding: 20px;"">
                    <img src=""https://blobvitalhub.blob.core.windows.net/containervitalhub/logotipo.png"" alt="" Logotipo da Aplicação"" style="" display: block; margin: 0 auto; max-width: 200px;"" />
                    <h1 style=""color: #333333; text-align: center;"">Bem-vindo ao VitalHub!</h1>
                    <p style=""color: #666666; text-align: center;"">Olá <strong>" + userName + @"</strong>,</p>
                    <p style=""color: #666666;text-align: center"">Estamos muito felizes por você ter se inscrito na plataforma VitalHub.</p>
                    <p style=""color: #666666;text-align: center"">Explore todas as funcionalidades que oferecemos e encontre os melhores médicos.</p>
                    <p style=""color: #666666;text-align: center"">Se tiver alguma dúvida ou precisar de assistência, nossa equipe de suporte está sempre pronta para ajudar.</p>
                    <p style=""color: #666666;text-align: center"">Aproveite sua experiência conosco!</p>
                    <p style=""color: #666666;text-align: center"">Atenciosamente,<br>Equipe VitalHub</p>
                </div>
            </div>";

            // Retorna o conteúdo HTML do e-mail
            return Response;
        }
    }
}
