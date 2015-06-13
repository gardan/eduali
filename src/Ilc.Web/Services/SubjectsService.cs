using System;
using System.Linq;
using System.Net;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Core.Exceptions;
using Ilc.Data.Contracts;
using Ilc.Data.Migrations;
using Ilc.Data.Models;
using Ilc.Web.Filters.Request;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack;

namespace Ilc.Web.Services
{
    [IlcAuth]
    public class SubjectsService : BaseService<
        SubjectModel, 
        SubjectModel, 
        SubjectModel, 
        FilterSubjectsParameters, 
        Subject, 
        SubjectModel>
    {
        public override IQueryable<Subject> ApplyCustomSearchLogic(IQueryable<Subject> query, FilterSubjectsParameters request)
        {
            // predefined search
            // This searches for subjects that belong or not, to a trainer.
            // e.g. You want all the subjects that a trainer has.
            // e.g. You want all the subjects that a trainer does NOT have.
            if (request.TrainerId > 0)
            {
                query = request.Assigned 
                    ? query.Where(s => s.Trainers.Any(t => t.Id == request.TrainerId)) 
                    : query.Where(s => s.Trainers.All(t => t.Id != request.TrainerId));
            }

            return query;
        }

        public override HttpResult Delete(SubjectModel request)
        {
            var subject = Uow.Subjects.GetById(request.Id);
            
            if (subject.Trainers.Any())
            {
                throw new HttpError(HttpStatusCode.MethodNotAllowed, "Subject belongs to trainers.");
            }
            if (Uow.Trainings.GetAll().Any(t => t.SubjectId == subject.Id))
            {
                throw new HttpError(HttpStatusCode.MethodNotAllowed, "Subject belongs to active trainings.");
            }

            return base.Delete(request);
        }
    }

    public class SubjectModel : BaseRequestModel
    {
        public string Name { get; set; }
    }

    public class FilterSubjectsParameters : FilterArgumentsSubjects
    {
    }
}