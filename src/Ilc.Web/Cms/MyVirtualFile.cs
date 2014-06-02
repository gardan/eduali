using System.IO;
using System.Web.Hosting;

namespace Ilc.Web.Cms
{
    public class MyVirtualFile : VirtualFile
    {
        private byte[] data;

        public MyVirtualFile(string virtualPath, byte[] data)
            : base(virtualPath)
        {
            this.data = data;
        }

        public override System.IO.Stream Open()
        {
            return new MemoryStream(data);
        }
    }
}