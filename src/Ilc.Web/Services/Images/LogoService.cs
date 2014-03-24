using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using Ilc.Core.Contracts;
using Ilc.Web.Contracts;
using ServiceStack;

namespace Ilc.Web.Services.Images
{
    public class LogoService : Service
    {
        public ICompaniesService Companies { get; set; }

        public HttpResult Put(LogoModel request)
        {
            var rootPath = GetRootPath();
            var logoDirName = WebConfigurationManager.AppSettings["LogoDir"];
            var companyId = request.Id;
            var extension = new ImageFormatConverter().ConvertToString(ImageFormat.Png).ToLower();
            var filename = string.Format("logo.{0}", extension);

            var logoDir = Path.Combine(rootPath, logoDirName, companyId.ToString(CultureInfo.InvariantCulture));
            Directory.CreateDirectory(logoDir);

            var logoPath = Path.Combine(logoDir, filename);
            request.Image.Save(logoPath);

            return new HttpResult();
        }

        public ImageResult Get(GetLogoModel request)
        {
            var avatarPath = CompanyLogoPath(request.Id);
            if (!File.Exists(avatarPath))
            {
                return new ImageResult(Image.FromFile(DefaultAvatarPath()));
            }
            return new ImageResult(Image.FromFile(avatarPath));

        }

        private string DefaultAvatarPath()
        {
            var rootPath = GetRootPath(); ;
            const string defaultAvatarPath = @"Images\web64\avatar.png";
            return Path.Combine(rootPath, defaultAvatarPath);
        }

        private string CompanyLogoPath(int id)
        {
            var logoDir = WebConfigurationManager.AppSettings["LogoDir"];
            const string filename = "logo.png";
            return Path.Combine(GetRootPath(), logoDir, id.ToString(CultureInfo.InvariantCulture), filename);
        }

        private string GetRootPath()
        {
            return Path.Combine(HostContext.VirtualPathProvider.RootDirectory.RealPath, @"..\");
        }
    }

    public class LogoModel : IImage
    {
        public Image Image { get; set; }
        public int Id { get; set; }
    }

    public class GetLogoModel
    {
        public int Id { get; set; }
    }
}