using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Data.Contracts;
using Ilc.Web.Models;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Services
{
    public class FilesService : Service
    {
        public IUow Uow { get; set; }

        public FilteredDataModel<FileModel> Get(FilesFilterParameters request)
        {
            var data = new List<FileModel>();

            switch (request.Category)
            {
                case "offer":
                    var offers = Uow.Offers.GetAll().Where(o => o.TrainingId == request.TrainingId).ToList();
                    var training = Uow.Trainings.GetById(request.TrainingId);

                    foreach (var trainingOffer in offers)
                    {
                        data.Add(new FileModel()
                            {
                                CreateDate = trainingOffer.CreateDate,
                                Creator = new UserModel() { Email = "admin", Id = 1 },
                                Name = string.Format("Offer-{0}-{1}", trainingOffer.Id, training.Customer.Name),
                                Url = "pdf/offer/" + trainingOffer.Id
                            });
                    }
                    break;
                default:

                    break;
            }


            return new FilteredDataModel<FileModel>()
                {
                    Data = data
                };
        }

    }


    public class FileModel
    {
        public string Name { get; set; }
        public UserModel Creator { get; set; }
        public DateTimeOffset CreateDate { get; set; }
        public string Url { get; set; }
    }

    public class FilesFilterParameters : FilterParametersBase
    {
        public string Category { get; set; }
        public int TrainingId { get; set; }
    }
}