using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using WebAPI.Domains;

namespace WebAPI.ViewModels
{
    public class PacienteViewModel
    {
        public string? Rg { get; set; }

        public string? Cpf { get; set; }

        public DateTime? DataNascimento { get; set; }

        public string? Cep { get; set; }

        public string? Logradouro { get; set; }

        public int? Numero { get; set; }

        public string? Cidade { get; set; }

        public string? Nome { get; set; }

        public string? Email { get; set; }

        public string? Senha { get; set; }

        public Guid IdTipoUsuario { get; set; }

        //ignora qualquer json pois sera preciso apenas dcaptar a imagem
        [NotMapped]
        [JsonIgnore]
        //É preciso de uma prop do tipo iformfile
        public IFormFile? File { get; set; }
        public string? Foto { get; set; }



    }
}
