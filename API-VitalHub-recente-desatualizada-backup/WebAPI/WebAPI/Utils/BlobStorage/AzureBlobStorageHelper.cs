using Azure.Storage.Blobs;

namespace WebAPI.Utils.BlobStorage
{
    //Criar classe estatica, onde podemos acessar seus métodos estaticos sem precisar instanciar a classe
    public static class AzureBlobStorageHelper
    {
        public static async Task<string> UploadImageBlobAsync(IFormFile file, string connectionString, string containerName)
        {
            //Receba tres parametros, imagem, string de conexao e o nome do container
            //String é para acessar corretamente e o container pois podem ter mais de um container

            try
            {
                //Caso exista um arquivo a lógica será iniciada
                if (file != null)
                {
                    //estamos criando um novo nome para o arquivo para um id com a extensão do arquivo exemplo jpg
                    var blobName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(file.FileName);

                    //Criando uma variavel do blob storage e passando a string de conexão, abrir conexao 
                    var blobServiceClient = new BlobServiceClient(connectionString);

                    //Obter o nome do conteiner que o arquivo sera salvo ser salvo
                    var blobContainerClient = blobServiceClient.GetBlobContainerClient(containerName);

                    //Nome do blob/ nome do arquivo
                    var blobClient = blobContainerClient.GetBlobClient(blobName);

                    //Abre a conexao com o arquivo
                    using (var stream = file.OpenReadStream())
                    {
                        //Aguardo, acesso o blob e envio o stream(arquivo) e um parametro
                        await blobClient.UploadAsync(stream, true);
                    }

                    //Pego a uri do blob e retorno como string para o metodo
                    return blobClient.Uri.ToString();
                }
                else
                {
                    //Imagem padrão
                    return "https://blobvitalhubmatheusd.blob.core.windows.net/containervitalhubmatheusd/profilePatern.jpg";
                }
            }
            catch (Exception)
            {

                throw;
            }

        }
    }
}