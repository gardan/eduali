﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using ServiceStack;
using ServiceStack.Razor;
using ServiceStack.Testing;
using ServiceStack.VirtualPath;

namespace Ilc.Web.Helpers
{
    public static class Templates
    {
        public static string ForgotPasswordInitiated(dynamic data)
        {
            var razor = new RazorFormat()
                {
                    VirtualPathProvider = new InMemoryVirtualPathProvider(new BasicAppHost()),
                    EnableLiveReload = false // Don't scan for file system changes
                }.Init();

            var tpl = File.ReadAllText(Path.Combine(HostContext.VirtualPathProvider.RootDirectory.RealPath, "..", @"Views\Templates\Email\ForgotPasswordInitiated.cshtml"));
            var razorPage = razor.CreatePage(tpl);
            var html = razor.RenderToHtml(razorPage, data);
            return html;
        }
    }
}