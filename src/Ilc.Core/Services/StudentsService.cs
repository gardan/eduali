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
            var username = newStudent.UserProfile.UserDetails.FirstName.Trim().Split(Convert.ToChar(" "))[0].ToLower();
            var userDetails = newStudent.UserProfile.UserDetails;
            newStudent.UserProfile = null;
            var originalUsername = username;
            // check to see if the email exists
            var index = 0;
            UserProfile user;
            var usernameFound = true;
            do
            {
                user = Uow.UserProfiles.GetAll().FirstOrDefault(u => u.Email == username);

                if (user != null)
                {
                    username = originalUsername + "_" + index++;
                    usernameFound = false;
                }
                else
                {
                    usernameFound = true;
                }
            } while (!usernameFound);

            // Creat the user
            var role = Uow.Roles.GetAll().FirstOrDefault(r => r.RoleName == "Student");
            var newUser = new UserProfile() { Email = username, UserDetails = userDetails, Roles = new List<Role>() { role }};
            Users.Create(newUser, username);

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
            Uow.Students.Delete(id);
            Uow.Commit();
        }
    }
}
