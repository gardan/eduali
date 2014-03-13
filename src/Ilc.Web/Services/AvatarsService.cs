using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Web.Configuration;
using Ilc.Web.Contracts;
using ServiceStack;
using ServiceStack.Web;

namespace Ilc.Web.Services
{
    public class AvatarsService : Service
    {
        private string GetRootPath()
        {
           return Path.Combine(HostContext.VirtualPathProvider.RootDirectory.RealPath, @"..\");
        }

        public HttpResult Put(AvatarModel request)
        {
            var rootPath = GetRootPath();
            var userFilesPath = WebConfigurationManager.AppSettings["UserFiles"];
            var userId = request.Id;
            var extension = new ImageFormatConverter().ConvertToString(ImageFormat.Png).ToLower();
            var avatarName = string.Format("avatar.{0}", extension);

            var userDir = Path.Combine(rootPath, userFilesPath, userId.ToString());
            Directory.CreateDirectory(userDir);

            var avatarPath = Path.Combine(userDir, avatarName);
            request.Image.Save(avatarPath);

            return new HttpResult();
        }

        public object Get(AvatarGetRequestModel request)
        {
            var avatarPath = UserAvatarPath(request.UserId);

            if (!File.Exists(avatarPath))
            {
                return new ImageResult(Image.FromFile(DefaultAvatarPath()));
            }

            return new ImageResult(Image.FromFile(avatarPath));
        }

        private string UserAvatarPath(int userId)
        {
            var rootPath = GetRootPath();
            var userFilesPath = WebConfigurationManager.AppSettings["UserFiles"];
            const string avatarName = "avatar.png";

            return Path.Combine(rootPath, userFilesPath, userId.ToString(), avatarName);
        }

        private string DefaultAvatarPath()
        {
            var rootPath = GetRootPath(); ;
            const string defaultAvatarPath = @"Images\web64\avatar.png";
            return Path.Combine(rootPath, defaultAvatarPath);
        }
    }

    public class AvatarModel : IImage
    {
        public Image Image { get; set; }
        public int Id { get; set; }
    }

    public class AvatarGetRequestModel
    {
        public int UserId { get; set; }
    }


    public class ImageResult : IDisposable, IStreamWriter, IHasOptions
    {
        private readonly Image image;
        private readonly ImageFormat imgFormat;

        public ImageResult(Image image, ImageFormat imgFormat = null)
        {
            this.image = image;
            this.imgFormat = imgFormat ?? ImageFormat.Png;
            this.Options = new Dictionary<string, string> {
                { HttpHeaders.ContentType, "image/" + this.imgFormat.ToString().ToLower() }
            };
        }

        public void WriteTo(Stream responseStream)
        {
            image.Save(responseStream, imgFormat); //Writes to response stream here
        }

        public void Dispose()
        {
            this.image.Dispose();
        }

        public IDictionary<string, string> Options { get; set; }
    }
}