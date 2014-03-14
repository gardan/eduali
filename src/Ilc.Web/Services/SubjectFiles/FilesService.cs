using System;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Web.Configuration;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Core.Helpers;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using Ilc.Web.InjectorConventions;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack;
using ServiceStack.Web;

namespace Ilc.Web.Services.SubjectFiles
{
    public class FilesService : Service
    {
        public IStamper Stamper { get; set; }
        public IUow Uow { get; set; }
        public ISubjectFilesService SubjectFiles { get; set; }

        public FilteredDataModel<SubjectFileModel> Get(FilterParametersSubjectFiles request)
        {
            var results = SubjectFiles.GetFiltered(request);

            return new FilteredDataModel<SubjectFileModel>()
            {
                Data = results.Data.Select(f => new SubjectFileModel().InjectFrom<SubjectFileToSubjectFileModel>(f) as SubjectFileModel).ToList(),
                TotalDisplayRecords = results.TotalDisplayRecords,
                TotalRecords = results.TotalRecords
            };
        }

        public HttpResult Post(FileUploadModel request)
        {
            request.Id = Convert.ToInt32(this.Request.PathInfo.Split(Convert.ToChar(@"/"))[2]);
            var filename = this.Request.Headers["X-File-Name"];

            var fileDir = Path.Combine(
                HostContext.VirtualPathProvider.RootDirectory.RealPath,
                WebConfigurationManager.AppSettings["Documents"], 
                WebConfigurationManager.AppSettings["SubjectDocuments"],
                request.Id.ToString(CultureInfo.InvariantCulture),
                DateTime.UtcNow.Date.ToString("yyyy-MM-dd"));
            Directory.CreateDirectory(fileDir);

            using (var file = File.Create(Path.Combine(fileDir, filename)))
            {
                request.RequestStream.CopyTo(file);
            }

            if (!File.Exists(Path.Combine(fileDir, filename)))
            {
                var subjectFile = new SubjectFile()
                {
                    Filename = filename,
                    Directory = fileDir,
                    SubjectId = request.Id
                };
                Stamper.Stamp(subjectFile);
                Uow.SubjectFiles.Add(subjectFile);
                Uow.Commit();
            }
            
            return new HttpResult();
        }
        
        

        public HttpResult Delete(SubjectFileModel request)
        {
            var subjectFile = Uow.SubjectFiles.GetById(request.Id);
            var filePath = Path.Combine(subjectFile.Directory, subjectFile.Filename);

            File.Delete(filePath);

            Uow.SubjectFiles.Delete(subjectFile);
            Uow.Commit();

            return new HttpResult()
                {
                    StatusCode =  HttpStatusCode.OK
                };
        }
    }

    public class FilterParametersSubjectFiles : FilterArgumentsSubjectFiles
    {
        
    }

    public class SubjectFileModel
    {
        public int Id { get; set; }
        public string Filename { get; set; }
        public string Description { get; set; }
        public UserModel Creator { get; set; }
        public DateTime CreatedDate { get; set; }
    }

    public class FileUploadModel : IRequiresRequestStream
    {
        public int Id { get; set; }
        public Stream RequestStream { get; set; }
    }
}