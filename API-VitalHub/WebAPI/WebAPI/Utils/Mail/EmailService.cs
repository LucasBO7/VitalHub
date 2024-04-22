using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using System.Net.Mail;

namespace WebAPI.Utils.Mail
{
    public class EmailService : IEmailService
    {
        //Criando uma variavel privata que é somente lida
        private readonly EmailSettings emailSettings;

        //Construtor com todos os dados injetados obrigatóriamente do EmailSettings

        public EmailService(IOptions<EmailSettings> options)
        {
            //Adicionando os valores de options dentro da variavel criada
            emailSettings = options.Value;
        }

        //Método para envio de email
        public async Task SendEmailAsync(MailRequest mailRequest)
        {
            try
            {
                //Objeto que representa o email
                var email = new MimeMessage();

                //Define o remetente do email
                email.Sender = MailboxAddress.Parse(emailSettings.Email);

                //Define o destinatário do email
                email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));

                //Define o assunto do email
                email.Subject = mailRequest.Subject;

                //Cria o corpo do email
                var builder = new BodyBuilder();

                //Define o corpo do email como html
                builder.HtmlBody = mailRequest.Body;

                //Define o corpo do email no objeto MimiMessage
                email.Body = builder.ToMessageBody();

                //Após parar de utilizar o recurso o using fecha o mesmo sem precisar que fechemos a mão
                using (var smtp = new MailKit.Net.Smtp.SmtpClient())
                {
                    //Conecta ao servidor SMTP usando os  dados do emailSettings
                    smtp.Connect(emailSettings.Host, emailSettings.Port, SecureSocketOptions.StartTls);

                    //Autenticação ao servidor SMTP usando o sdados do emailSettings
                    smtp.Authenticate(emailSettings.Email, emailSettings.Password);

                    //Envia o email
                    await smtp.SendAsync(email);
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}