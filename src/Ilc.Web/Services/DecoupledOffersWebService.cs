using System;
using System.Collections.Generic;
using System.Linq;
using Ilc.Core;
using Ilc.Core.Services;
using Ilc.Data.Contracts;
using Ilc.Web.InjectorConventions;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack;

namespace Ilc.Web.Services
{
    public class DecoupledOffersWebService : Service
    {

        public IDecoupledOffersService Offers { get; set; }
        public IUow Uow { get; set; }

        public FilteredDataModel<DecoupledOfferModel> Get(FilterParametersDecoupledOffers request)
        {
            var results = Offers.GetFiltered(request);
            return new FilteredDataModel<DecoupledOfferModel>()
                {
                    Data = new List<DecoupledOfferModel>(results.Data.Select(o => new DecoupledOfferModel()
                        {
                            Id = o.Id,
                            Customer =
                                new CustomerModel().InjectFrom<CustomerToCustomerModel>(o.Customer) as CustomerModel,
                            Creator = new UserModel().InjectFrom<UserProfileToUserModel>(o.Creator) as UserModel,
                            Payed = o.Payed,
                            Amount = o.Amount,
                            SentAt = o.SentAt,
                            Accepted = o.Accepted,
                            PaymentDueAt = o.PaymentDueAt,
                            Tos = o.Tos,
                            CreateDate = o.CreateDate,
                            Trainings =
                                o.Trainings.Map(
                                    t => new TrainingModel().InjectFrom<TrainingToWebModel>(t) as TrainingModel),
                            Active = o.Active
                        })),
                    TotalDisplayRecords = results.TotalDisplayRecords,
                    TotalRecords = results.TotalRecords
                };
        }

        public HttpResult Get(GetDecoupledOfferModel decoupledOfferModel)
        {
            var o = Uow.DecoupledOffers.GetById(decoupledOfferModel.Id);

            var ret = new FilteredDataModel<DecoupledOfferModel>()
                {
                    Data = new List<DecoupledOfferModel>()
                        {
                            new DecoupledOfferModel()
                                {
                                    Id = o.Id,
                                    Customer =
                                        new CustomerModel().InjectFrom<CustomerToCustomerModel>(o.Customer) as
                                        CustomerModel,
                                    Creator = new UserModel().InjectFrom<UserProfileToUserModel>(o.Creator) as UserModel,
                                    Payed = o.Payed,
                                    Amount = o.Amount,
                                    SentAt = o.SentAt,
                                    Accepted = o.Accepted,
                                    PaymentDueAt = o.PaymentDueAt,
                                    Tos = o.Tos,
                                    CreateDate = o.CreateDate,
                                    Trainings =
                                        o.Trainings.Map(
                                            t => new TrainingModel().InjectFrom<TrainingToWebModel>(t) as TrainingModel),
                                    Active = o.Active
                                }
                        }
                };

            return new HttpResult(ret);
        }


 
    }

    public class GetDecoupledOfferModel
    {
        public int Id { get; set; }
    }

    public class FilterParametersDecoupledOffers : FilterArgumentsDecoupledOffer
    {
    }

    public class DecoupledOfferModel
    {
        public int Id { get; set; }

        public CustomerModel Customer { get; set; }

        public UserModel Creator { get; set; }

        public bool Payed { get; set; }

        public decimal Amount { get; set; }

        public DateTimeOffset? SentAt { get; set; }

        public bool Accepted { get; set; }

        public DateTimeOffset PaymentDueAt { get; set; }

        public string Tos { get; set; }

        public DateTimeOffset CreateDate { get; set; }

        public List<TrainingModel> Trainings { get; set; }

        public bool Active { get; set; }
    }
}