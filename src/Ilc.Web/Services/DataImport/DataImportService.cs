using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using Ilc.Web.Filters.Request.Verification.Import;
using Microsoft.VisualBasic.FileIO;
using ServiceStack;

namespace Ilc.Web.Services.DataImport
{
    public class DataImportService : Service
    {
        public IUow Uow { get; set; }
        public IUsersService Users { get; set; }
        public ICustomersService Customers { get; set; }
        public IStudentsService Students { get; set; }

        
        /// <summary>
        /// /api/import/customers
        /// </summary>
        /// <returns></returns>
        /// <!-- Validation checks for the following:
        /// 1. All emails must be unique -->
        [ValidateTrainersImport]
        public HttpResult Post(ImportTrainersModel request)
        {
            var trainers = new List<Trainer>();
            var companyId = Users.GetByEmail().CompanyId;

            foreach (var trainerBulkImport in request.Data)
            {
                var subject = Uow.Subjects.GetAll().FirstOrDefault(s => s.Name == trainerBulkImport.Subjects);

                var subjects = new List<Subject>();
                if (subject == null)
                {
                    subjects.Add(new Subject()
                        {
                            Name = trainerBulkImport.Subjects,
                            CompanyId = companyId
                        });
                }
                else
                {
                    subjects.Add(subject);
                }

                trainers.Add(new Trainer()
                    {
                        UserProfile = new UserProfile()
                            {
                                Email = trainerBulkImport.Email,
                                CompanyId = companyId,
                                UserDetails = new UserDetails()
                                    {
                                        FirstName = trainerBulkImport.FirstName,
                                        LastName = trainerBulkImport.LastName,
                                        DateOfBirth = new DateTimeOffset(DateTime.SpecifyKind(trainerBulkImport.Birthday, DateTimeKind.Unspecified), TimeSpan.Zero),
                                        Phone = trainerBulkImport.Phone
                                    }
                            },
                        CompanyId = companyId,
                        Subjects = subjects
                    });
            }

            foreach (var trainer in trainers)
            {
                Uow.Trainers.Add(trainer);
            }

            Uow.Commit();

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

        public HttpResult Post(ImportCustomersModel request)
        {
            var customers = new List<Customer>();
            var companyId = Users.GetByEmail().CompanyId;

            foreach (var customerBulkImport in request.Data)
            {
                var splitted = customerBulkImport.ContactName.Split(Convert.ToChar(" "));
                var lastName = splitted.Last();
                var firstName = string.Join(" ", splitted.Take(splitted.Length - 1));
                
                customers.Add(new Customer()
                    {
                        Name = customerBulkImport.Name,
                        BankAccount = customerBulkImport.BankAccount,
                        BillingAddress = customerBulkImport.BillingAddress,
                        CompanyId = companyId,
                        ContactPersons = new List<ContactPerson>()
                            {
                                new ContactPerson()
                                    {
                                        UserProfile = new UserProfile()
                                            {
                                                Email = customerBulkImport.ContactEmail,
                                                UserDetails = new UserDetails()
                                                    {
                                                        FirstName = firstName,
                                                        LastName = lastName
                                                    }
                                            }
                                    }
                            }
                    });
            }

            foreach (var customer in customers)
            {
                Customers.Create(customer);
            }

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

        public HttpResult Post(ImportStudentsModel request)
        {
            var students = new List<Student>();
            var companyId = Users.GetByEmail().CompanyId;

            foreach (var studentBulkImport in request.Data)
            {
                var customerId = Uow.Customers.GetAll().FirstOrDefault(c => c.Name == studentBulkImport.CustomerName && c.CompanyId == companyId).Id;

                students.Add(new Student()
                    {
                        CustomerId = customerId,
                        UserProfile = new UserProfile()
                        {
                            Email = studentBulkImport.Email,
                            CompanyId = companyId,
                            UserDetails = new UserDetails()
                            {
                                FirstName = studentBulkImport.FirstName,
                                LastName = studentBulkImport.LastName,
                                DateOfBirth = new DateTimeOffset(DateTime.SpecifyKind(studentBulkImport.Birthday, DateTimeKind.Unspecified), TimeSpan.Zero),
                                Phone = studentBulkImport.Phone
                            }
                        }
                    });   
            }

            foreach (var student in students)
            {
                Students.Create(student);
            }

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }
    }

    public class ImportTrainersModel
    {
        public TrainerBulkImport[] Data { get; set; }
    }

    public class ImportCustomersModel
    {
        public CustomerBulkImport[] Data { get; set; }
    }

    public class ImportStudentsModel
    {
        public StudentBulkImport[] Data { get; set; }
    }

    public class TrainerBulkImport
    {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Birthday { get; set; }
        public string Phone { get; set; }
        public string Subjects { get; set; }
    }

    public class CustomerBulkImport
    {
        public string Name { get; set; }
        public string BankAccount { get; set; }
        public string BillingAddress { get; set; }
        public string ContactName { get; set; }
        public string ContactEmail { get; set; }
    }

    public class StudentBulkImport
    {
        public string CustomerName { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Birthday { get; set; }
        public string Phone { get; set; }
    }
}