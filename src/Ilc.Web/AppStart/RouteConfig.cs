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

            routes.Add<FilterParametersStudents>("/api/students", "GET");
            routes.Add<CreateStudentModel>("/api/students", "POST");
            routes.Add<EditStudentModel>("/api/students/{id}", "PUT");

            routes.Add<FilterParametersTrainers>("/api/trainers", "GET");
            routes.Add<CreateTrainerModel>("/api/trainers", "POST");
            routes.Add<EditTrainerModel>("/api/trainers/{id}", "PUT");
        }
    }
}