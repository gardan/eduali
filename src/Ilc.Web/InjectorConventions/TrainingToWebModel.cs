using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Data.Models;
using Ilc.Web.Models;
using Omu.ValueInjecter;

namespace Ilc.Web.InjectorConventions
{
    public class TrainingToWebModel : ConventionInjection
    {
        protected override bool Match(ConventionInfo c)
        {
            return c.SourceProp.Name == c.TargetProp.Name ||
                (c.SourceProp.Name == "InterviewPlans" && c.TargetProp.Name == "InterviewPlan");
        }

        protected override object SetValue(ConventionInfo c)
        {
            if (c.SourceProp.Name == "Owners" && c.TargetProp.Name == "Owners")
            {
                var users = c.SourceProp.Value as ICollection<UserProfile>;
                return users.Select(u => new UserModel() {Username = u.Username}).ToArray();
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
            if (c.SourceProp.Name == "Trainer" && c.TargetProp.Name == "Trainer")
            {
                return new TrainerModel().InjectFrom(c.SourceProp.Value);
            }
            if (c.SourceProp.Name == "Customer" && c.TargetProp.Name == "Customer")
            {
                return new CustomerModel().InjectFrom(c.SourceProp.Value);
            }
            if (c.SourceProp.Name == "InterviewPlans" && c.TargetProp.Name == "InterviewPlan")
            {
                var interviewPlan = (c.SourceProp.Value as ICollection<InterviewPlan>);
                return interviewPlan == null ? null : new InterviewPlanApiModel().InjectFrom(interviewPlan);
            }
            return base.SetValue(c);
        }
    }
}