using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Configuration;
using Ilc.Core.Contracts;
using Ilc.Web.Contracts;
using ServiceStack.Common.Web;
using ServiceStack.ServiceInterface;
using ServiceStack.WebHost.Endpoints;

namespace Ilc.Web.Services
{
    public class UserSettingsService : Service
    {
        public IUsersService Users { get; set; }

        public HttpResult Put(AvatarModel request)
        {
            var rootPath = EndpointHost.VirtualPathProvider.RootDirectory.RealPath;
            var userFilesPath = WebConfigurationManager.AppSettings["UserFiles"];
            var userId = request.Id;
            var extension = new ImageFormatConverter().ConvertToString(request.Image.RawFormat).ToLower();
            var avatarName = string.Format("avatar.{0}", extension);

            var userDir = Path.Combine(rootPath, userFilesPath, userId.ToString());
            Directory.CreateDirectory(userDir);

            var avatarPath = Path.Combine(userDir, avatarName);
            request.Image.Save(avatarPath);

            return new HttpResult();
        }

    }

    public class AvatarModel : IImage
    {
        public Image Image { get; set; }
        public int Id { get; set; }
    }
}