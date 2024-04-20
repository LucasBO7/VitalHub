namespace WebAPI.Utils.Mail
{
    public class EmailSettings
    {
        //E-mail do remetente
        public string? Email { get; set; }

        //Senha do remetente
        public string? Password { get; set; }

        //Host do servidor SMTP (Simple Mail Transfer Protocol)
        public string? Host { get; set; }

        //Nome exibido do remetente
        public string? DisplayName { get; set; }

        //Porta do servidor SMTP (Simple Mail Transfer Protocol)
        public int Port { get; set; }
    }
}