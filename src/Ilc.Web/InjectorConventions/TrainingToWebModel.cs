using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Data.Models;
using Ilc.Web.Models;
using Ilc.Web.Services;
using Ilc.Web.Services.Grading;
using Omu.ValueInjecter;
using SubjectModel = Ilc.Web.Models.SubjectModel;

namespace Ilc.Web.InjectorConventions
{
    public class TrainingToWebModel : ConventionInjection
    {
        protected override bool Match(ConventionInfo c)
        {
            return c.SourceProp.Name == c.TargetProp.Name; // ||
//                (c.SourceProp.Name == "InterviewPlans" && c.TargetProp.Name == "InterviewPlan") ||
//                (c.SourceProp.Name == "Offers" && c.TargetProp.Name == "Hours") ||
//                (c.SourceProp.Name == "Offers" && c.TargetProp.Name == "LessonsNo") ||
//                (c.SourceProp.Name == "Offers" && c.TargetProp.Name == "Price");
        }

        protected override object SetValue(ConventionInfo c)
        {
            if (c.SourceProp.Name == "Owners" && c.TargetProp.Name == "Owners")
            {
                var users = c.SourceProp.Value as ICollection<UserProfile>;
                return users.Select(u => new UserModel().InjectFrom<UserProfileToUserModel>(u) as UserModel).ToArray();
            }
            if (c.SourceProp.Name == "Students" && c.TargetProp.Name == "Students")
            {
                var students = c.SourceProp.Value as ICollection<Student>;
                return students.Select(u => new StudentModel() { UserInfo = new UserInfoModel().InjectFrom(u.UserProfile.UserDetails) as UserInfoModel , Id = u.Id }).ToArray();
            }
            if (c.SourceProp.Name == "Subject" && c.TargetProp.Name == "Subject")
            {
                return new SubjectModel().InjectFrom(c.SourceProp.Value);
            }
//            if (c.SourceProp.Name == "Trainer" && c.TargetProp.Name == "Trainer")
//            {
//                return new TrainerModel().InjectFrom<TrainerToTrainerModel>(c.SourceProp.Value);
//            }
            if (c.SourceProp.Name == "Customer" && c.TargetProp.Name == "Customer")
            {
                if (c.SourceProp.Value == null) return null;
                return new CustomerModel().InjectFrom(c.SourceProp.Value);
            }
//            if (c.SourceProp.Name == "InterviewPlans" && c.TargetProp.Name == "InterviewPlan")
//            {
//                var interviewPlan = (c.SourceProp.Value as ICollection<InterviewPlan>);
//                return interviewPlan.Count == 0 ? null : new InterviewPlanApiModel() { Date = interviewPlan.First().Date.DateTime, Location = interviewPlan.First().Location };
//            }
            if (c.SourceProp.Name == "Spendings" && c.TargetProp.Name == "Spendings")
            {
                var spendings = c.SourceProp.Value as Spendings;
                return spendings == null ? null : new SpendingModel().InjectFrom(spendings);
            }
            if (c.SourceProp.Name == "Offers" && c.TargetProp.Name == "Hours")
            {
                var offers = c.SourceProp.Value as ICollection<TrainingOffer>;
                foreach (var trainingOffer in offers)
                {
                    if (trainingOffer.Selected)
                    {
                        return trainingOffer.NoLessons*trainingOffer.LessonDuration;
                    }
                }
                return 0;
            }
            if (c.SourceProp.Name == "Offers" && c.TargetProp.Name == "LessonsNo")
            {
                var offers = c.SourceProp.Value as ICollection<TrainingOffer>;
                foreach (var trainingOffer in offers)
                {
                    if (trainingOffer.Selected)
                    {
                        return trainingOffer.NoLessons;
                    }
                }
                return 0;
            }
            if (c.SourceProp.Name == "Offers" && c.TargetProp.Name == "Price")
            {
                var offers = c.SourceProp.Value as ICollection<TrainingOffer>;
                foreach (var trainingOffer in offers)
                {
                    if (trainingOffer.Selected) return trainingOffer.Price;
                }
                return 0m;
            }
//            if (c.SourceProp.Name == "OwnersConfiguration" && c.TargetProp.Name == "OwnersConfiguration")
//            {
//                var config = c.SourceProp.Value as TrainingOwnersConfiguration;
//                return new TrainingOwnersConfigurationModel()
//                    {
//                        Administration = config.AdministrationId,
//                        Coordinator = config.CoordinatorId,
//                        Sales = config.SalesId 
//                    };
//            }
            if (c.SourceProp.Name == "DateOfValidation" && c.TargetProp.Name == "DateOfValidation")
            {
                return ((DateTimeOffset) c.SourceProp.Value).DateTime;
            }
            if (c.SourceProp.Name == "GradingAttributes")
            {
                var list = c.SourceProp.Value as ICollection<GradingAttribute>;
                if (list != null)
                    return list.Select(g => new GradingAttributeModel().InjectFrom(g) as GradingAttributeModel).ToList();
                return new List<GradingAttributeModel>();
            }
            return base.SetValue(c);
        }
    }
}