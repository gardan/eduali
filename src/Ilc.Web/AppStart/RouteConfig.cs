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
            routes.Add<Services.UpdateTrainingModel>("/api/trainings/{id}", "PUT,GET");
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
            routes.Add<Services.UserModel>("/api/users/{id}", "PUT");

            routes.Add<Services.FilterParametersRoles>("/api/roles", "GET");
            routes.Add<Services.CreateRoleModel>("/api/roles", "POST");
            routes.Add<Services.RoleModel>("/api/roles/{id}", "PUT");

            routes.Add<Services.RoleAssignmentModel>("/api/roleassignments", "POST");
            routes.Add<Services.RoleAssignmentModel>("/api/roleassignments/{roleId}/{userId}", "DELETE");

            routes.Add<Services.FilterParametersClaims>("/api/claims", "GET");

            routes.Add<Services.CreateRoleClaimsModel>("/api/roleclaims", "POST");

            routes.Add<Services.FilterSubjectsParameters>("/api/subjects", "GET");
            routes.Add<Services.SubjectModel>("/api/subjects", "POST");
            routes.Add<Services.SubjectModel>("/api/subjects/{id}", "PUT");

            routes.Add<Services.FilterParametersContacts>("/api/customers/{customerId}/contacts", "GET");
            routes.Add<Services.CreateContactModel>("/api/contacts", "POST");
            routes.Add<Services.ContactModel>("/api/contacts/{id}", "PUT");

            routes.Add<Services.CreateTrainersSubjectModel>("/api/trainerssubjects", "POST");
            routes.Add<Services.TrainerSubjectModel>("/api/trainers/{trainerId}/subjects/{subjectId}", "DELETE");

            routes.Add<Services.FilterParametersGradingSystems>("/api/gradingsystems", "GET");
            routes.Add<Services.GradingSystemModel>("/api/gradingsystems", "POST");

            routes.Add<Services.FilterParametersGrades>("/api/grades", "GET");
            routes.Add<Services.CreateGradeModel>("/api/grades", "POST");

            routes.Add<Services.SpendingModel>("/api/spendings/{id}", "PUT");

            routes.Add<Services.FilterStatusDefinitionsParameters>("/api/statusdefinitions", "GET");
            routes.Add<Services.StatusDefinitionUpdateModel>("/api/statusdefinitions/{id}", "PUT");

            routes.Add<GridConfigRequestParameters>("/api/config/grid", "GET");
            routes.Add<UpdateGridColumnConfigModel>("/api/config/grid", "PUT");

            routes.Add<CreateOfferModel>("/api/offers", "POST");
            routes.Add<Services.FilterParametersOffer>("/api/offers", "GET");

            routes.Add<Services.ClientConfigurationModel>("/api/configuration", "GET");

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
            routes.Add<Services.FilterParametersSpendingsStatisticsModel>("/api/statistics/spendings", "GET");
            routes.Add<Services.FilterParametersTrainingsStatisticsModel>("/api/statistics/trainings", "GET");

            routes.Add<Services.FilterParametersLessons>("/api/trainings/{trainingId}/lessons", "GET");
            routes.Add<Services.UpdateLessonModel>("/api/trainings/{trainingId}/lessons/{id}", "PUT");
            routes.Add<Services.FilterParametersLessonSchedule>("/api/trainings/{trainingId}/lessonsSchedule", "GET");
            routes.Add<Services.FilterParametersLessonsSchedule>("/api/lessons", "GET");

            routes.Add<Services.FilterParametersAvailability>("/api/availabilities", "GET");

            routes.Add<Services.FilterParametersQuestions>("/api/questions", "GET");
        }
    }
}