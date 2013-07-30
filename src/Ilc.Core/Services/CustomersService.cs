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
            return Uow.Customers.GetById(id);
        }

        public void Create(Customer newCustomer)
        {
            Uow.Customers.Add(newCustomer);
            Uow.Commit();
        }

        public void Update(Customer updateCustomer)
        {
            Uow.Customers.Update(updateCustomer);
            Uow.Commit();
        }

        public void Delete(int id)
        {
            Uow.Customers.Delete(id);
            Uow.Commit();
        }
    }
}
