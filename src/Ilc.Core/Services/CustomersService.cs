using System;
using System.Linq;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;

namespace Ilc.Core.Services
{
    public class CustomersService : ICustomersService
    {
        public IUow Uow { get; set; }

        public Customer GetByCustomerId(int id)
        {
            return Uow.Customer.GetById(id);
        }

        public void Create(Customer newCustomer)
        {
            Uow.Customer.Add(newCustomer);
            Uow.Commit();
        }

        public void Update(Customer updateCustomer)
        {
            Uow.Customer.Update(updateCustomer);
            Uow.Commit();
        }

        public void Delete(int id)
        {
            Uow.Customer.Delete(id);
            Uow.Commit();
        }
    }
}
