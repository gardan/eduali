using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ServiceStack.Razor;
using ServiceStack.Testing;
using ServiceStack.VirtualPath;

namespace Ilc.Web.Helpers
{
    public static class Templates
    {
        public static string ForgotPasswordIniated(dynamic data)
        {
            var razor = new RazorFormat()
                {
                    VirtualPathProvider = new InMemoryVirtualPathProvider(new BasicAppHost()),
                    EnableLiveReload = false // Don't scan for file system changes
                }.Init();

            var tpl = razor.CreatePage("Hello, Please click this link to reset your password http://localhost:54877/#recover?token=@Model.Token");
            var html = razor.RenderToHtml(tpl, data);
            return html;
        }
    }
}