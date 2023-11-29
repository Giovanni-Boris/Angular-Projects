namespace Ecommerce.Exeptions
{
    public class ResourceAlreadyCreatedException : Exception
    {
        public ResourceAlreadyCreatedException()
        {
        }

        public ResourceAlreadyCreatedException(string message)
            : base(message)
        {
        }

        public ResourceAlreadyCreatedException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

    }
}
