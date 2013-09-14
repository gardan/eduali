using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Ilc.Data.Contracts;
using Ilc.Web.Models;
using RazorPDF;

namespace Ilc.Web.Controllers
{
    public class PdfController : Controller
    {
        public IUow Uow { get; set; }

        public ViewResult Offer(int id)
        {
            var offer = new LightOfferModel() { StartDate = DateTimeOffset.UtcNow };
            var offer2 = Uow.Offers.GetById(id);

            offer.NoLessons = offer2.NoLessons;
            offer.LessonDuration = offer2.LessonDuration;
            offer.PossibleCosts = offer2.Price.ToString();

            return new PdfResult(offer, "Offer");
        }

        public ViewResult TrainingEvaluation(int id)
        {
            var eval = new TrainingEvaluationPdfModel();

            var trainingEval = Uow.TrainingEvaluations.GetById(id);
            eval.StringQuestions = new List<StringQuestion>();

            foreach (var stringAnswer in trainingEval.StringAnswers)
            {
                eval.StringQuestions.Add(new StringQuestion()
                    {
                        Answer = stringAnswer.Text,
                        Text = stringAnswer.Question.Text
                    });
            }


            eval.RadioQuestions = new List<RadioQuestion>()
                {
                    new RadioQuestion() { DisplayCategory = true, CategoryName = "Training", Text = "Veeeeeeery looooooong fucking questioooooooooooooooooooooooooooooooon??????????????????????????????????", Answers = new List<RadioQuestionAnswers>()
                        {
                            new RadioQuestionAnswers() { Text = "Ion" },
                            new RadioQuestionAnswers() { Text = "Gheo" },
                            new RadioQuestionAnswers() { Text = "Vasile", IsSelected = true},
                            new RadioQuestionAnswers() { Text = "Gheo" },
                            new RadioQuestionAnswers() { Text = "Gheo" },
                            new RadioQuestionAnswers() { Text = "Gheo" }
                        }}
                };

            eval.CheckBoxQuestions = new List<CheckBoxQuestion>()
                {
                    new CheckBoxQuestion() {Text = "Text me?", Checked = false},
                    new CheckBoxQuestion() {Text = "Don't text me?", Checked = true}
                };

            return new PdfResult(eval, "TrainingEvaluation");
        }
    }
}