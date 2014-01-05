using System;
using System.Collections.Generic;
using System.Linq;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;

namespace Ilc.Core.Services
{
    public class CustomersService : ICustomersService
    {
        public IUow Uow { get; set; }
        public IContactsService Contacts { get; set; }

        public FilteredResults<Customer> GetFiltered(FilterArguments parameters)
        {
            // set defaults
            parameters.Length = parameters.Length == 0 ? 10 : parameters.Length;
            parameters.Filter = parameters.Filter ?? new List<Filter>(); 

            var query = Uow.Customers.GetAll();
            var totalResults = query.Count();
            var totalDisplayRecords = totalResults;

            // search
            foreach (var filter in parameters.Filter)
            {
                var inFilter = filter;
                switch (filter.Field)
                {
                    case "id":
                        var id = Convert.ToInt32(inFilter.Value);
                        query = query.Where(c => c.Id == id);
                        break;
                    case "name":
                        query = query.Where(c => c.Name.Contains(inFilter.Value));
                        break;
                    case "contactPerson":
                        query = query.Where(c => c.ContactPersons.FirstOrDefault(cp => cp.IsMain).Name.Contains(inFilter.Value));
                        break;
                    case "bankAccount":
                        query = query.Where(c => c.BankAccount.Contains(inFilter.Value));
                        break;
                    default:
                        // if trying to search for unavalable column, just exit
                        // TODO: log this shit.
                        break;
                }
            }

            // order
            query = query.OrderBy(e => e.Id);

            // paging
            query = query.Skip(parameters.StartIndex).Take(parameters.Length);

            return new FilteredResults<Customer>()
            {
                Data = query.ToList(),
                TotalDisplayRecords = totalDisplayRecords,
                TotalRecords = totalDisplayRecords
            };
        }

        public Customer GetByCustomerId(int id)
        {
            return Uow.Customers.GetById(id);
        }

        public void Create(Customer newCustomer)
        {
            var contact = newCustomer.ContactPersons.FirstOrDefault();
            newCustomer.ContactPersons.Clear();

            Uow.Customers.Add(newCustomer);
            Uow.Commit();

            contact.CustomerId = newCustomer.Id;
            Contacts.Create(contact);
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
