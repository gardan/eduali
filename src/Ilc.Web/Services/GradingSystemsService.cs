﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Core;
using Ilc.Data.Contracts;
using Ilc.Web.InjectorConventions;
using Omu.ValueInjecter;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Services
{
    public class GradingSystemsService : Service
    {
        public IUow Uow { get; set; }

        public FilteredResults<GradingSystemModel> Get(FilterParametersGradingSystems request)
        {
            var results = Uow.GradingSystems.GetAll().ToList();
            
            return new FilteredResults<GradingSystemModel>()
                {
                    Data = results.Select(s => new GradingSystemModel().InjectFrom<GradingSystemToWebModel>(s) as GradingSystemModel).ToList()
                    // Data = new List<GradingSystemModel>()
                    //     {
                    //         new GradingSystemModel()
                    //             {
                    //                 Id = 1,
                    //                 Name = "Toefell",
                    //                 Grades = new[]
                    //                     {
                    //                         new GradeModel() { Id = 1, Name = "A1", Order = 1 }, 
                    //                     }.OrderBy(g => g.Order).ToArray()
                    //             }
                    //     }
                };
        }
    }

    public class GradingSystemModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        
        public GradeModel[] Grades { get; set; }
    }

    public class GradeModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Order { get; set; }
    }

    public class FilterParametersGradingSystems : FilterArguments
    {
    }
}