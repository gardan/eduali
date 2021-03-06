﻿using System.Collections.Generic;
using System.Linq;
using System.Net;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using Ilc.Web.InjectorConventions;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack;

namespace Ilc.Web.Services
{
    public class StudentsService : Service
    {
        public IStudentsService Students { get; set; }
        public IUow Uow { get; set; }

        public FilteredDataModel<StudentModel> Get(FilterParametersStudents request)
        {
            var results = Students.GetFiltered(request);

            return new FilteredDataModel<StudentModel>()
                {
                    TotalDisplayRecords = results.TotalDisplayRecords,
                    TotalRecords = results.TotalRecords,
                    Data = results.Data.Select(s => new StudentModel().InjectFrom<StudentToStudentModel>(s) as StudentModel).ToList()
                };
        }

        public HttpResult Get(EditStudentModel request)
        {

            var studentModel = new StudentModel().InjectFrom<StudentToStudentModel>(Students.GetByStudentId(request.Id)) as StudentModel;
            return new HttpResult(new FilteredDataModel<StudentModel>()
            {
                Data = new List<StudentModel>() { studentModel }
            });
        }

        public HttpResult Post(CreateStudentModel request)
        {
            var newStudent = new Student().InjectFrom(request) as Student;
            var userInfo = new UserDetails().InjectFrom<UserInfoModelToUserDetails>(request.UserInfo) as UserDetails;
            newStudent.UserProfile = new UserProfile() { Email = request.UserInfo.Email, UserDetails = userInfo};

            Students.Create(newStudent);

            var returnModel = new StudentModel().InjectFrom<StudentToStudentModel>(newStudent);

            return new HttpResult(returnModel)
                {
                    StatusCode = HttpStatusCode.Created,
                    Location = Request.AbsoluteUri.CombineWith(newStudent.Id)
                };
        }

        public HttpResult Put(EditStudentModel request)
        {
            var userDetails = new UserDetails().InjectFrom<UserInfoModelToUserDetails>(request.UserInfo) as UserDetails;
            var updatedStudent = Uow.Students.GetById(request.Id);
            updatedStudent.UserProfile.Email = request.UserInfo.Email;
            updatedStudent.UserProfile.UserDetails.PopulateWithNonDefaultValues(userDetails);

            Students.Update(updatedStudent);

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

        public HttpResult Delete(DeleteStudentModel request)
        {
            Students.Delete(request.Id);

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }
    }
}