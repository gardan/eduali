namespace Ilc.Infrastructure.Contracts
{
    public interface INotifyHost
    {
        void SendMessage(object value);
    }
}