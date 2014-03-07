using System;
using System.Drawing;
using System.IO;
using Ilc.Web.Contracts;
using ServiceStack;
using ServiceStack.Web;

namespace Ilc.Web.AppStart
{
    public static class ContentTypeConfig
    {
        private const string ImgPngContentType = "image/png";
        private const string ImgJpegContentType = "image/jpeg";
        private const string ImgJpgContentType = "image/jpg";

        public static void Configure(AppHostHttpListenerBase appHost)
        {
            appHost.ContentTypes.Register(ImgJpegContentType, ResponseSerializer, StreamDeserializer);
            appHost.ContentTypes.Register(ImgPngContentType, ResponseSerializer, StreamDeserializer);
            appHost.ContentTypes.Register(ImgJpgContentType, ResponseSerializer, StreamDeserializer);
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

        private static void ResponseSerializer(IRequest requestContext, object dto, IResponse httpRes)
        {
        }
    }
}