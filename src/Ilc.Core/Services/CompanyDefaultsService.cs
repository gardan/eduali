﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using Ilc.Data.Models.SimpleMembership;

namespace Ilc.Core.Services
{
    public class CompanyDefaultsService : ICompanyDefaultsService
    {
        public IUow Uow { get; set; }

        public List<Role> CreateRoles(int companyId)
        {
            var roles = new List<Role>()
                {
                    new Role()
                        {
                            CompanyId = companyId,
                            CanDelete = false,
                            RoleName = "Customer Contact",
                            Claims = new List<RoleClaim>()
                                {
                                    new RoleClaim() {Name = SystemClaims.MainCustomerContact, Value = true.ToString()}
                                }
                        },
                    new Role()
                        {
                            CompanyId = companyId,
                            CanDelete = false,
                            RoleName = "Customer Supervizor",
                            Claims = new List<RoleClaim>()
                                {
                                    new RoleClaim() {Name = SystemClaims.CustomerTrainingContact, Value = true.ToString()}
                                }
                        },
                    new Role() // Student
                        {
                            CompanyId = companyId,
                            CanDelete = false,
                            RoleName = "Student",
                            Claims = new List<RoleClaim>()
                                {
                                    new RoleClaim() {Name = SystemClaims.TasksStudent, Value = true.ToString()}
                                }
                        },
                    new Role() // Trainer
                        {
                            CompanyId = companyId,
                            CanDelete = false,
                            RoleName = "Trainer",
                            Claims = new List<RoleClaim>()
                                {
                                    new RoleClaim() {Name = SystemClaims.TasksTrainer, Value = true.ToString()}
                                }
                        },
                    new Role() // Zeus
                        {
                            CompanyId = companyId,
                            CanDelete = false,
                            RoleName = "Zeus",
                            Claims = new List<RoleClaim>()
                                {
                                    new RoleClaim() {Name = SystemClaims.TasksAdministration, Value = true.ToString()},
                                    new RoleClaim() {Name = SystemClaims.TasksSales, Value = true.ToString()},
                                    new RoleClaim() {Name = SystemClaims.TasksCoordinator, Value = true.ToString()},
                                    new RoleClaim() {Name = SystemClaims.UiSettingsRead, Value = true.ToString()}
                                }
                        }
                };

            foreach (var role in roles)
            {
                Uow.Roles.Add(role);
            }

            Uow.Commit();
            return roles;
        }

        public void CreateStatusDefinitions(int companyId)
        {
            var arr = new[] { "Rfi", "PlanInterview", "Interview", "Offer", "Accepted", "Rejected", "Planned", 
                              "ProgressEvaluation", "Exam", "TrainingEvaluation", "Ended", "Complete" };
            foreach (var status in arr)
            {
                var definition = new StatusDictionary()
                    {
                        CompanyId = companyId,
                        Name = status,
                        FriendlyName = status
                    };
                Uow.StatusDictionary.Add(definition);
            }

            Uow.Commit();
        }

        public void CreateSubjects(int companyId)
        {
            Uow.Subjects.Add(new Subject()
                {
                    Name = "English",
                    CompanyId = companyId
                });
            Uow.Commit();
        }
    }
}
