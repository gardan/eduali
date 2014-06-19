using Ilc.Web.Models;
using Ilc.Web.Models.Student;
using Ilc.Web.Services.Grading;
using Ilc.Web.Services.Images;
using Ilc.Web.Services.Tasks.Training;
using Ilc.Web.Services.Trainings;
using ServiceStack.Web;

namespace Ilc.Web.AppStart
{
    public class RouteConfig
    {
        public static void Init(IServiceRoutes routes)
        {
            routes.Add<FilterParametersBase>("/transfers", "GET");
            routes.Add<CreateTransferModel>("/transfers", "POST");

            routes.Add<FilterParametersOpenTrainings>("/opentrainings", "GET");

            routes.Add<FilterParametersTrainings>("/trainings", "GET");
            routes.Add<CreateTrainingModel>("/trainings", "POST");
            routes.Add<TrainingStudentInterviewModel>("/trainings/{id}/students", "GET");
            routes.Add<UpdateTrainingModel>("/trainings/{id}", "PUT,GET");
            routes.Add<Services.FilterParameterProgressEvaluations>("/trainings/{trainingId}/progressEvaluationsStudents", "GET");

            routes.Add<Services.PostTrainingContactsModel>("/trainings/{trainingId}/contacts", "POST");
            routes.Add<Services.DeleteTrainingContactModel>("/trainings/{trainingId}/contacts/{id}", "DELETE");

            routes.Add<FilterParametersCustomers>("/customers", "GET");
            routes.Add<CreateCustomerModel>("/customers", "POST");
            routes.Add<EditCustomerModel>("/customers/{id}", "PUT");
            routes.Add<DeleteCustomerModel>("/customers/{id}", "DELETE");

            routes.Add<Services.Customers.LogsFilterParameters>("/customers/{customerId}/logs", "GET");
            routes.Add<Services.Customers.CustomerLogModel>("/logs", "POST");
            routes.Add<Services.Customers.CustomerLogModel>("/logs/{id}", "PUT");

            routes.Add<FilterParametersStudents>("/students", "GET");
            routes.Add<CreateStudentModel>("/students", "POST");
            routes.Add<EditStudentModel>("/students/{id}", "PUT,GET");
            routes.Add<DeleteStudentModel>("/students/{id}", "DELETE");

            routes.Add<FilterParametersTrainers>("/trainers", "GET");
            routes.Add<CreateTrainerModel>("/trainers", "POST");
            routes.Add<EditTrainerModel>("/trainers/{id}", "PUT");
            routes.Add<DeleteTrainerModel>("/trainers/{id}", "DELETE");

            routes.Add<Services.FilterParametersUsers>("/users", "GET");
            routes.Add<Services.CreateUserModel>("/users", "POST");
            routes.Add<Services.UserModel>("/users/{id}", "PUT,DELETE");

            routes.Add<Services.FilterParametersRoles>("/roles", "GET");
            routes.Add<Services.CreateRoleModel>("/roles", "POST");
            routes.Add<Services.RoleModel>("/roles/{id}", "PUT,DELETE");

            routes.Add<Services.RoleAssignmentModel>("/roleassignments", "POST");
            routes.Add<Services.RoleAssignmentModel>("/roleassignments/{roleId}/{userId}", "DELETE");

            routes.Add<Services.FilterParametersClaims>("/claims", "GET");

            routes.Add<Services.CreateRoleClaimsModel>("/roleclaims", "POST");
            routes.Add<Services.DeleteRoleClaimModel>("/roles/{roleId}/claims/{name}", "DELETE");

            routes.Add<Services.FilterSubjectsParameters>("/subjects", "GET");
            routes.Add<Services.SubjectModel>("/subjects", "POST");
            routes.Add<Services.SubjectModel>("/subjects/{id}", "PUT,DELETE");

            routes.Add<Services.FilterParametersContacts>("/customers/{customerId}/contacts", "GET");
            routes.Add<Services.CreateContactModel>("/contacts", "POST");
            routes.Add<Services.ContactModel>("/contacts/{id}", "PUT");

            routes.Add<Services.CreateTrainersSubjectModel>("/trainerssubjects", "POST");
            routes.Add<Services.TrainerSubjectModel>("/trainers/{trainerId}/subjects/{subjectId}", "DELETE");

            routes.Add<FilterParametersGradingSystems>("/gradingsystems", "GET");
            routes.Add<GradingSystemModel>("/gradingsystems", "POST");
            routes.Add<GradingSystemModel>("/gradingsystems/{id}", "PUT,GET,DELETE");

            routes.Add<FilterParametersAttributes>("/gradingattributes", "GET");
            routes.Add<GradingAttributeModel>("/gradingattributes/{id}", "PUT,DELETE");
            routes.Add<CreateGradingAttributeModel>("/gradingattributes", "POST");

            routes.Add<TrainingGradingAttributeDeleteModel>("/trainings/{trainingId}/gradingattributes/{gradingAttributeId}", "DELETE");
            routes.Add<TrainingGradingAttributeCreateModel>("/trainings/{trainingId}/gradingattributes", "POST");

            routes.Add<FilterParametersGrades>("/grades", "GET");
            routes.Add<CreateGradeModel>("/grades", "POST");

            routes.Add<Services.SpendingModel>("/spendings/{id}", "PUT");

            routes.Add<Services.FilterStatusDefinitionsParameters>("/statusdefinitions", "GET");
            routes.Add<Services.StatusDefinitionUpdateModel>("/statusdefinitions/{id}", "PUT");

            routes.Add<GridConfigRequestParameters>("/config/grid", "GET");
            routes.Add<UpdateGridColumnConfigModel>("/config/grid", "PUT");

            routes.Add<CreateOfferModel>("/offers", "POST");
            routes.Add<Services.FilterParametersOffer>("/offers", "GET");

            routes.Add<Services.ClientConfigurationModel>("/configuration", "GET");

            routes.Add<FilterParametersTasks>("/tasks", "GET");
            routes.Add<RfiModel>("/tasks/training/rfi", "POST");
            routes.Add<InterviewPlanModel>("/tasks/training/interviewplan", "POST");
            routes.Add<StudentInterviewModel>("/tasks/training/interview", "POST");
            routes.Add<TrainingOfferModel>("/tasks/training/offer", "POST");
            routes.Add<TrainingOfferSelectModel>("/tasks/training/offer/toggle", "POST");
            // routes.Add<Services.RejectedModel>("/tasks/training/rejected", "POST");
            routes.Add<AcceptedModel>("/tasks/training/accepted", "POST");
            routes.Add<PlannedModel>("/tasks/training/planned", "POST");
            routes.Add<ProgressEvaluationModel>("/tasks/training/progressevaluation", "POST");
            routes.Add<TrainingEvaluationModel>("/tasks/training/trainingevaluation", "POST");
            routes.Add<EndedModel>("/tasks/training/ended", "POST");
            routes.Add<Services.Tasks.Training.PlanningModel>("/tasks/training/planning", "POST");
            routes.Add<Services.Tasks.Training.PublishingModel>("/tasks/training/publish", "POST");
            routes.Add<Services.Tasks.Training.PendingValidationModel>("/tasks/training/validation", "POST");
            routes.Add<Services.Tasks.Training.UserRegistrationModel>("/tasks/training/registration", "POST");

            routes.Add<Services.FilesFilterParameters>("/files", "GET");

            routes.Add<FilterParametersCustomerStatisticsModel>("/statistics/customerTrainings", "GET");
            routes.Add<Services.FilterParametersSpendingsStatisticsModel>("/statistics/spendings", "GET");
            routes.Add<Services.FilterParametersTrainingsStatisticsModel>("/statistics/trainings", "GET");

            routes.Add<Services.FilterParametersLessons>("/trainings/{trainingId}/lessons", "GET");
            routes.Add<Services.UpdateLessonModel>("/trainings/{trainingId}/lessons", "POST");
            routes.Add<Services.UpdateLessonModel>("/trainings/{trainingId}/lessons/{id}", "PUT");
            routes.Add<Services.FilterParametersLessonSchedule>("/trainings/{trainingId}/lessonsSchedule", "GET");

            routes.Add<Services.FilterParametersLessonsSchedule>("/lessons", "GET");
            routes.Add<Services.UpdateLessonModel>("/lessons/{id}", "DELETE");

            routes.Add<Services.FilterParametersAvailability>("/availabilities", "GET");
            routes.Add<Services.CreateAvailabilityModel>("/availabilities", "POST");
            routes.Add<Services.AvailabilityModel>("/availabilities/{id}", "DELETE,PUT");

            routes.Add<Services.FilterParametersTemplates>("/templates", "GET");
            routes.Add<Services.TemplateModel>("/templates", "POST");
            routes.Add<Services.TemplateModel>("/templates/{id}", "PUT,DELETE");

            routes.Add<AvatarModel>("/users/{id}/avatar", "PUT");
            routes.Add<AvatarGetRequestModel>("/users/{userId}/avatar", "GET");

            routes.Add<Services.FilterParametersGenders>("/genders", "GET");

            routes.Add<Services.FilterParametersCompanies>("/companies", "GET");
            routes.Add<Services.CreateCompanyModel>("/companies", "POST");
            routes.Add<Services.CompanyModel>("/companies/{id}", "PUT");

            routes.Add<Services.FilterParametersQuestions>("/questions", "GET");

            routes.Add<Services.FilterParametersInterviews>("/trainings/{trainingId}/students/{studentId}/interviews");
            routes.Add<Services.UpdateInterviewModel>("/interviews/{id}", "PUT");

            routes.Add<Services.FilterParametersAssesments>("/trainings/{trainingId}/students/{studentId}/assesments", "GET");

            routes.Add<Services.Evaluations.FilterParametersProgressEvaluations>("/trainings/{trainingId}/progressevaluations", "GET");
            routes.Add<Services.Evaluations.ProgressEvaluationModel>("/progressevaluations/{id}", "PUT");

            routes.Add<Services.SubjectFiles.FileUploadModel>("/subjects/{id}/files", "POST");
            routes.Add<Services.SubjectFiles.FilterParametersSubjectFiles>("/subjects/{subjectId}/files", "GET");
            routes.Add<Services.SubjectFiles.SubjectFileModel>("/files/{id}", "DELETE,GET");

            routes.Add<GetLogoModel>("/companies/{id}/logo", "GET");
            routes.Add<LogoModel>("/companies/{id}/logo", "PUT");

            routes.Add<Ilc.Web.Services.FilterParametersFileTemplates>("/filetemplates", "GET");
            routes.Add<Ilc.Web.Services.FileTemplateModel>("/filetemplates/{id}", "PUT");
            routes.Add<Ilc.Web.Services.FileTemplateModel>("/filetemplates", "POST");

            routes.Add<Ilc.Web.Services.FilterParametersExpenseTypes>("/expensetypes", "GET");
            routes.Add<Ilc.Web.Services.ExpenseTypeModel>("/expensetypes", "POST");
            routes.Add<Ilc.Web.Services.ExpenseTypeModel>("/expensetypes/{id}", "PUT, DELETE");

            // START - Apis for the logged in user
            routes.Add<Services.AuthModel>("/auth", "POST");

            routes.Add<Services.GeneralModel>("/profile/general", "PUT");
            routes.Add<Services.EmailModel>("/profile/email", "PUT");
            routes.Add<Services.PasswordModel>("/profile/password", "PUT");

            // Password reset apis
            // NOTE: these are available publicly
            routes.Add<Services.Recovery.InitPasswordResetModel>("/recovery", "POST");
            routes.Add<Services.Recovery.ResetPasswordModel>("/recovery/{token}", "PUT"); // Replace the password

            // END - Apis for the logged in user

            routes.Add<Services.DataImport.ImportCustomersModel>("/import/customers", "POST");
            routes.Add<Services.DataImport.ImportTrainersModel>("/import/trainers", "POST");
            routes.Add<Services.DataImport.ImportStudentsModel>("/import/students", "POST");
        }
    }
}