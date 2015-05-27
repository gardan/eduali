using System;
using System.Collections.Generic;
using System.Linq;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using Ilc.Data.Models.SimpleMembership;

namespace Ilc.Core.Services
{
    public class StudentsService : IStudentsService
    {
        public IUow Uow { get; set; }
        public IUsersService Users { get; set; }

        public FilteredResults<Student> GetFiltered(FilterArgumentsStudents parameters)
        {
            // set defaults
            parameters.Length = parameters.Length == 0 ? 10 : parameters.Length;
            var user = Users.GetByEmail();
            var query = Uow.Students.GetAll().Where(s => s.Customer.CompanyId == user.CompanyId);
            var totalResults = query.Count();
            var totalDisplayRecords = totalResults;

            // filter
            if (parameters.CustomerId > 0)
            {
                query = query.Where(s => s.CustomerId == parameters.CustomerId);
            }

            if (parameters.TrainingDate != DateTimeOffset.MinValue)
            {
                query =
                    query.Where(
                        s =>
                        s.Trainings.Any(
                            t => t.ScheduleDays.Any(sd => sd.StartDate.Day == parameters.TrainingDate.Day)));
            }

            if (!string.IsNullOrWhiteSpace(parameters.Query))
            {
                query = query.Where(s => s.UserProfile.UserDetails.FirstName.Contains(parameters.Query) || s.UserProfile.UserDetails.LastName.Contains(parameters.Query));
            }

            foreach (var filter in parameters.Filter)
            {
                var inFilter = filter;
                switch (filter.Field)
                {
                    case "name":
                        query = query.Where(s => s.UserProfile.UserDetails.FirstName.Contains(inFilter.Value) ||
                                                 s.UserProfile.UserDetails.LastName.Contains(inFilter.Value));
                        break;
                    case "customer":
                        query = query.Where(s => s.Customer.Name.Contains(inFilter.Value));
                        break;
                    case "gender":
                        if (Convert.ToString(inFilter.Value).ToLower().Equals(Convert.ToString("male").ToLower()))
                        {
                            query = query.Where(s => s.UserProfile.UserDetails.Gender == 1);
                        }
                        else if (Convert.ToString(inFilter.Value).ToLower().Equals(Convert.ToString("female").ToLower()))
                        {
                            query = query.Where(s => s.UserProfile.UserDetails.Gender == 2);
                        }
                        else
                        {
                            query = query.Where(s => s.UserProfile.UserDetails.Gender == 0);
                        }
                        break;
                    case "city":
                        query = query.Where(s => s.UserProfile.UserDetails.City.Contains(inFilter.Value));
                        break;
                    case "country":
                        query = query.Where(s => s.UserProfile.UserDetails.Country.Contains(inFilter.Value));
                        break;
                    case "address":
                        query = query.Where(s => s.UserProfile.UserDetails.Address.Contains(inFilter.Value));
                        break;


                    default:
                        // TODO: log that no such field exists.
                        break;
                }
            }

            // order
            query = query.OrderBy(e => e.Id);

            // paging
            query = query.Skip(parameters.StartIndex).Take(parameters.Length);

            return new FilteredResults<Student>()
            {
                Data = query.ToList(),
                TotalDisplayRecords = totalDisplayRecords,
                TotalRecords = totalDisplayRecords
            };
        }

        public Student GetByStudentId(int id)
        {
            return Uow.Students.GetById(id);
        }

        public void Create(Student newStudent)
        {
            // first create the user.
            var email = newStudent.UserProfile.Email;
            var userDetails = newStudent.UserProfile.UserDetails;
            newStudent.UserProfile = null;
            
            // Creat the user
            var user = Users.GetByEmail();
            var role = Uow.Roles.GetAll().FirstOrDefault(r => r.RoleName == "Student" && r.CompanyId == user.CompanyId);
            var newUser = new UserProfile() { Email = email, UserDetails = userDetails, Roles = new List<Role>() { role }};
            Users.Create(newUser, "");

            newStudent.UserProfileId = newUser.Id;

            Uow.Students.Add(newStudent);
            // TODO: i don't know why this is here, i feel like this is redundant
            newStudent.Customer = Uow.Customers.GetById(newStudent.CustomerId);
            Uow.Commit();
        }

        public void Update(Student updateStudent)
        {
            Uow.Students.Update(updateStudent);
            Uow.Commit();
        }

        public void Delete(int id)
        {
            var student = Uow.Students.GetById(id);

            var trainings = Uow.Trainings.GetAll().Where(t => t.Students.Any(o => o.Id == id)).ToList();
            foreach (var training in trainings)
            {
                training.Students.Remove(student);
                Uow.Trainings.Update(training);
            }

            Uow.Commit();

            var userId = student.UserProfileId;
            Users.Delete(userId);
        }

        public Student GetByUserId(int currentUserId)
        {
            return Uow.Students.GetAll().FirstOrDefault(s => s.UserProfileId == currentUserId);
        }
    }
}
