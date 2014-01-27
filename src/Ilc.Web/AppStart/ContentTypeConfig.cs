using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using Ilc.Web.Contracts;
using ServiceStack.ServiceHost;
using ServiceStack.WebHost.Endpoints;

namespace Ilc.Web.AppStart
{
    public static class ContentTypeConfig
    {
        private const string ImgJpegContentType = "image/jpeg";

        public static void Configure(AppHostBase appHost)
        {

            appHost.ContentTypeFilters.Register(ImgJpegContentType, ResponseSerializer, StreamDeserializer);
        }

        private static object StreamDeserializer(Type type, Stream fromStream)
        {
            var img = Image.FromStream(fromStream);
            var instance = Activator.CreateInstance(type);

            if (instance is IImage)
            {
                var fieldInfo = type.GetProperty("Image");
                fieldInfo.SetValue(instance, img);
            }

            return instance;
        }

        private static void ResponseSerializer(IRequestContext requestContext, object dto, IHttpResponse httpRes)
        {
            
        }
    }
}