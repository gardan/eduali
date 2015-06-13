using System.Collections.Generic;
using System.Linq;
using System.Net;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models.Base;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack;

namespace Ilc.Web.Services
{
    public class BaseService<TCreate, TUpdate, TDelete, TGet, TM, TResponse> : Service
        where TCreate : class // SS Model
        where TUpdate : BaseRequestModel // SS Model
        where TDelete : BaseRequestModel // SS Model
        where TGet : FilterArguments
        where TM : CompanyBaseEntity, new() // Data Model
        where TResponse : class, new()
    {
        public IUow Uow { get; set; }
        public IUsersService Users { get; set; }

        public virtual IQueryable<TM> ApplyCustomSearchLogic(IQueryable<TM> query, TGet request)
        {
            return query;
        }

        public virtual FilteredDataModel<TResponse> Get(TGet request)
        {
            request.Length = request.Length == 0 ? 10 : request.Length;
            request.Filter = request.Filter ?? new List<Filter>();

            var user = Users.GetByEmail();
            var query = Uow.GetStandardRepo<TM>().GetAll().Where(m => m.CompanyId == user.CompanyId);

            query = ApplyCustomSearchLogic(query, request);

            foreach (var filter in request.Filter)
            {
                //var inFilter = filter;
                //switch (filter.Field)
                //{
                //    case "name":
                //        query = query.Where(c => c.Name.Contains(inFilter.Value));
                //        break;
                //    default:
                //        // if trying to search for unavalable column, just exit
                //        // TODO: log this shit.
                //        break;
                //}
            }

            var totalRecords = query.Count();
            var totalDisplayRecords = totalRecords;

            // order
            query = query.OrderBy(e => e.Id);

            query = query.Skip(request.StartIndex).Take(request.Length);

            return new FilteredDataModel<TResponse>()
                {
                    Data = query.ToList().Select(s => new TResponse().InjectFrom(s) as TResponse).ToList(),
                    TotalDisplayRecords = totalDisplayRecords,
                    TotalRecords = totalRecords
                };
        }

        public virtual HttpResult Post(TCreate request)
        {
            var newEntity = new TM().InjectFrom(request) as TM;
            newEntity.CompanyId = Users.GetByEmail().CompanyId;

            Uow.GetStandardRepo<TM>().Add(newEntity);
            Uow.Commit();

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.Created
                };
        }

        public virtual HttpResult Put(TUpdate request)
        {
            var entity = Uow.GetStandardRepo<TM>().GetById(request.Id).InjectFrom(request) as TM;

            Uow.GetStandardRepo<TM>().Update(entity);
            Uow.Commit();

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

        public virtual HttpResult Delete(TDelete request)
        {
            var entity = Uow.GetStandardRepo<TM>().GetById(request.Id) as TM;

            Uow.GetStandardRepo<TM>().Delete(entity);
            Uow.Commit();

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };

        }
    }
}