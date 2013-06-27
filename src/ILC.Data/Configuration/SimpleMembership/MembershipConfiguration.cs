using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using Ilc.Data.Models.SimpleMembership;

namespace Ilc.Data.Configuration.SimpleMembership
{
    public class MembershipConfiguration : EntityTypeConfiguration<Membership>
    {
        public MembershipConfiguration()
        {
            // Primary Key
            HasKey(t => t.UserId);

            // Properties
            Property(t => t.UserId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            Property(t => t.ConfirmationToken)
                .HasMaxLength(128);

            Property(t => t.Password)
                .IsRequired()
                .HasMaxLength(128);

            Property(t => t.PasswordSalt)
                .IsRequired()
                .HasMaxLength(128);

            Property(t => t.PasswordVerificationToken)
                .HasMaxLength(128);

            // Table & Column Mappings
            ToTable("webpages_Membership");
        }
    }
}
