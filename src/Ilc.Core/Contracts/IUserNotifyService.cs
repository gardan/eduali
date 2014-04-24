namespace Ilc.Core.Contracts
{
    public interface IUserNotifyService
    {
        void Notify(string email, string body, string subject);
    }
}
