using System;
using System.Text;
using System.Web.Hosting;
using System.Web.Mvc;
using Ilc.Data.Contracts;
using Ilc.Web.AppStart;
using ServiceStack;

namespace Ilc.Web.Cms
{
    public class MyVirtualPathProvider : VirtualPathProvider
    {
        public override bool FileExists(string virtualPath)
        {
            if (virtualPath.Contains("dynamic_document.cshtml"))
            {
                return true;
            }

            return base.FileExists(virtualPath);
        }

        public override VirtualFile GetFile(string virtualPath)
        {
            if (virtualPath.Contains("dynamic_document.cshtml"))
            {
                var page = FindPage(virtualPath);
                return new MyVirtualFile(virtualPath, Encoding.UTF8.GetBytes(page));
            }
            return base.GetFile(virtualPath);
        }

        private string FindPage(string virtualPath)
        {
            var fileName = System.IO.Path.GetFileNameWithoutExtension(virtualPath);
            var templateId = Convert.ToInt32(fileName.Split(Convert.ToChar("-"))[0]);
            var uow = ServiceStackHost.Instance.Resolve<IUow>();

            return uow.FileTemplates.GetById(templateId).Content;
        }
    }
}