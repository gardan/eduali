using System;
using System.Activities;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Core.Contracts;
using Ilc.Data.Models;

namespace Ilc.Infrastructure.Workflows.Activities.Training
{
    public class PersistOffer : CodeActivity
    {
        public OutArgument<TrainingOffer> OutOffer { get; set; }
        public InArgument<TrainingOffer> Offer { get; set; }

        protected override void Execute(CodeActivityContext context)
        {
            var offers = context.GetExtension<IOffersService>();
            var offer = Offer.Get<TrainingOffer>(context);
            offers.Create(offer);
            OutOffer.Set(context, offer);
        }
    }
}
