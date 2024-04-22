namespace WebAPI.Utils.Mail
{
    public interface IEmailService
    {
        //Método assíncrono para envio de email
        Task SendEmailAsync(MailRequest mailRequest);
    }
}