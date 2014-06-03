using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Web.Models;
using ServiceStack;

namespace Ilc.Web.Services
{
    public class FileTemplatesService : Service
    {
        public IUow Uow { get; set; }
        public IUsersService Users { get; set; }

        public FilteredDataModel<FileTemplateModel> Get(FilterParametersFileTemplates request)
        {
            var user = Users.GetByEmail();
            var result = Uow.FileTemplates.GetAll().Where(ft => ft.CompanyId == user.CompanyId);

            var modelResults = new List<FileTemplateModel>();
            foreach (var fileTemplate in result)
            {
                modelResults.Add(new FileTemplateModel()
                    {
                        Id = fileTemplate.Id,
                        Content = fileTemplate.Content,
                        Name = fileTemplate.Name,
                        Type = fileTemplate.Type.ToString()
                    });
            }
            
            return new FilteredDataModel<FileTemplateModel>()
                {
                    Data = modelResults
                };
        }


        public HttpResult Put(FileTemplateModel request)
        {
            var fileTemplate = Uow.FileTemplates.GetById(request.Id);
            fileTemplate.Name = request.Name;
            fileTemplate.Content = request.Content;


            Uow.FileTemplates.Update(fileTemplate);
            Uow.Commit();

            return new HttpResult();
        }

    }

    public class FilterParametersFileTemplates : FilterArguments
    {
        
    }

    public class FileTemplateModel
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
    }
}