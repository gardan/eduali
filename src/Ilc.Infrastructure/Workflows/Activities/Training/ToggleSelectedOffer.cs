using System;
using System.Activities;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Contracts;

namespace Ilc.Infrastructure.Workflows.Activities.Training
{
    public class ToggleSelectedOffer : CodeActivity
    {
        public InArgument<int> OfferId { get; set; }

        protected override void Execute(CodeActivityContext context)
        {
            var uow = context.GetExtension<IUow>();
            var offerId = OfferId.Get<int>(context);
            var newOffer = uow.Offers.GetById(offerId);

            var oldSelectedOffer =
                uow.Offers.GetAll().FirstOrDefault(o => o.TrainingId == newOffer.TrainingId && o.Selected);

            if (oldSelectedOffer != null) // set old selected offer to false
            {
                oldSelectedOffer.Selected = false;
                uow.Offers.Update(oldSelectedOffer);
                uow.Commit();
            }

            newOffer.Selected = !newOffer.Selected;
            uow.Offers.Update(newOffer);
            uow.Commit();
        }
    }
}
