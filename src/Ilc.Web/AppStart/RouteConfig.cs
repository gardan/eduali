using Ilc.Web.Models;
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

            routes.Add<GridConfigRequestParameters>("/api/config/grid", "GET");
            routes.Add<UpdateGridColumnConfigModel>("/api/config/grid", "PUT");

            routes.Add<CreateOfferModel>("/api/offers", "POST");

            routes.Add<Services.FilterParametersTasks>("/api/tasks", "GET");
            routes.Add<Services.RfiModel>("/api/tasks/training/rfi", "POST");
            routes.Add<Services.TrainingEvaluationModel>("/api/tasks/training/trainingevaluations", "POST");

            routes.Add<Services.FilesFilterParameters>("/api/files", "GET");

            routes.Add<FilterParametersCustomerStatisticsModel>("/api/statistics/customerTrainings", "GET");
        }
    }
}