using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using Microsoft.VisualBasic.FileIO;
using ServiceStack;

namespace Ilc.Web.Services.DataImport
{
    public class DataImportService : Service
    {
        public IUow Uow { get; set; }
        public IUsersService Users { get; set; }

        /// <summary>
        /// /api/import/customers
        /// </summary>
        /// <returns></returns>
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
                                        DateOfBirth = new DateTimeOffset(trainerBulkImport.Birthday, TimeSpan.Zero),
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

    }

    public class ImportTrainersModel
    {
        public TrainerBulkImport[] Data { get; set; }
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
}