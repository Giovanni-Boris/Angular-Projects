using Ecommerce.data;
using Ecommerce.models;

namespace Ecommerce
{
    public class Seed
    {
        private readonly DataContext dataContext;

        public Seed(DataContext context)
        {
            this.dataContext = context;
        }

        public void SeedDataContext()
        {
            if (!dataContext.Users.Any())
            {
               
            }
        }
    }
}
