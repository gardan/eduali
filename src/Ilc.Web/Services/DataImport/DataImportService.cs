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

            var parser = new TextFieldParser(new StringReader(request.Data));
            parser.SetDelimiters(new[] { "," });

            while (!parser.EndOfData)
            {
                var row = parser.ReadFields();
                var subjectName = row[5];

                var subject = Uow.Subjects.GetAll().FirstOrDefault(s => s.Name == subjectName);

                var subjects = new List<Subject>();
                if (subject == null)
                {
                    subjects.Add(new Subject()
                        {
                            Name = subjectName,
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
                                Email = row[0],
                                CompanyId = companyId,
                                UserDetails = new UserDetails()
                                    {
                                        FirstName = row[1],
                                        LastName = row[2],
                                        DateOfBirth = DateTimeOffset.ParseExact(row[3], "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture),
                                        Phone = row[4]
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
        public ImportTrainersModel()
        {
            DataType = "text/csv";
        }

        /// <summary>
        /// Only .csv is supportted, and the data should be provided without the headers.
        /// </summary>
        /// <example>
        /// 
        /// </example>
        public string Data { get; set; }
        public string DataType { get; set; }
    }
}