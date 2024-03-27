namespace WebAPI.ViewModels
{
    public class MedicoViewModel
    {

        public string? Nome { get; set; }

        public string? Email { get; set; }

        public string? Senha { get; set; }
        public Guid? TipoUsuarioId { get; set; }

        public string? Foto { get; set; }

        public Guid? EspecialidadeId { get; set; }

        public string? Crm { get; set; }
    }
}
