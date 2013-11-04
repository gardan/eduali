using Ilc.Web.Models;
using Ilc.Web.Models.Student;
using ServiceStack.ServiceHost;

namespace Ilc.Web.AppStart
{
    public class RouteConfig
    {
        public static void Init(IServiceRoutes routes)
        {
            routes.Add<FilterParametersBase>("/api/transfers", "GET");
            routes.Add<CreateTransferModel>("/api/transfers", "POST");

            routes.Add<FilterParametersTrainings>("/api/trainings", "GET");
            routes.Add<CreateTrainingModel>("/api/trainings", "POST");
            routes.Add<TrainingStudentInterviewModel>("/api/trainings/{id}/students", "GET");
            routes.Add<Services.UpdateTrainingModel>("/api/trainings/{id}", "PUT");
            routes.Add<Services.FilterParameterProgressEvaluations>("/api/trainings/{trainingId}/progressEvaluationsStudents", "GET");

            routes.Add<FilterParametersCustomers>("/api/customers", "GET");
            routes.Add<CreateCustomerModel>("/api/customers", "POST");
            routes.Add<EditCustomerModel>("/api/customers/{id}", "PUT");
            routes.Add<DeleteCustomerModel>("/api/customers/{id}", "DELETE");

            routes.Add<FilterParametersStudents>("/api/students", "GET");
            routes.Add<CreateStudentModel>("/api/students", "POST");
            routes.Add<EditStudentModel>("/api/students/{id}", "PUT");
            routes.Add<DeleteStudentModel>("/api/students/{id}", "DELETE");

            routes.Add<FilterParametersTrainers>("/api/trainers", "GET");
            routes.Add<CreateTrainerModel>("/api/trainers", "POST");
            routes.Add<EditTrainerModel>("/api/trainers/{id}", "PUT");
            routes.Add<DeleteTrainerModel>("/api/trainers/{id}", "DELETE");

            routes.Add<Services.FilterParametersUsers>("/api/users", "GET");
            routes.Add<Services.CreateUserModel>("/api/users", "POST");

            routes.Add<Services.FilterParametersRoles>("/api/roles", "GET");
            routes.Add<Services.CreateRoleModel>("/api/roles", "POST");

            routes.Add<Services.CreateRoleAssignmentModel>("/api/roleassignments", "POST");

            routes.Add<Services.FilterParametersClaims>("/api/claims", "GET");

            routes.Add<Services.CreateRoleClaimsModel>("/api/roleclaims", "POST");

            routes.Add<Services.FilterSubjectsParameters>("/api/subjects", "GET");
            routes.Add<Services.SubjectModel>("/api/subjects", "POST");

            routes.Add<Services.FilterStatusDefinitionsParameters>("/api/statusdefinitions", "GET");
            routes.Add<Services.StatusDefinitionUpdateModel>("/api/statusdefinitions/{id}", "PUT");

            routes.Add<GridConfigRequestParameters>("/api/config/grid", "GET");
            routes.Add<UpdateGridColumnConfigModel>("/api/config/grid", "PUT");

            routes.Add<CreateOfferModel>("/api/offers", "POST");
            routes.Add<Services.FilterParametersOffer>("/api/offers", "GET");

            routes.Add<Services.FilterParametersTasks>("/api/tasks", "GET");
            routes.Add<Services.RfiModel>("/api/tasks/training/rfi", "POST");
            routes.Add<Services.InterviewPlanModel>("/api/tasks/training/interviewplan", "POST");
            routes.Add<Services.StudentInterviewModel>("/api/tasks/training/interview", "POST");
            routes.Add<Services.TrainingOfferModel>("/api/tasks/training/offer", "POST");
            routes.Add<Services.TrainingOfferSelectModel>("/api/tasks/training/offer/toggle", "POST");
            // routes.Add<Services.RejectedModel>("/api/tasks/training/rejected", "POST");
            routes.Add<Services.AcceptedModel>("/api/tasks/training/accepted", "POST");
            routes.Add<Services.PlannedModel>("/api/tasks/training/planned", "POST");
            routes.Add<Services.ProgressEvaluationModel>("/api/tasks/training/progressevaluation", "POST");
            routes.Add<Services.TrainingEvaluationModel>("/api/tasks/training/trainingevaluation", "POST");
            routes.Add<Services.EndedModel>("/api/tasks/training/ended", "POST");

            routes.Add<Services.FilesFilterParameters>("/api/files", "GET");

            routes.Add<FilterParametersCustomerStatisticsModel>("/api/statistics/customerTrainings", "GET");

            routes.Add<Services.FilterParametersLessons>("/api/trainings/{trainingId}/lessons", "GET");
            routes.Add<Services.FilterParametersLessonSchedule>("/api/trainings/{trainingId}/lessonsSchedule", "GET");

            routes.Add<Services.FilterParametersQuestions>("/api/questions", "GET");
        }
    }
}