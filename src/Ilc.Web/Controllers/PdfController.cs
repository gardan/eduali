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
            eval.CheckBoxQuestions = new List<CheckBoxQuestion>();
            eval.RadioQuestions = new List<RadioQuestion>();

            foreach (var stringAnswer in trainingEval.StringAnswers)
            {
                eval.StringQuestions.Add(new StringQuestion()
                    {
                        Answer = stringAnswer.Text,
                        Text = stringAnswer.Question.Text
                    });
            }


            foreach (var answer in trainingEval.RadioGroupAnswers)
            {
                var answers = new List<RadioQuestionAnswers>();

                foreach (var radioQuestionAnswerse in answer.Question.Answers)
                {
                    answers.Add(new RadioQuestionAnswers()
                        {
                            Text = radioQuestionAnswerse.Text,
                            IsSelected = radioQuestionAnswerse.Id == answer.AnswerId
                        });
                }

                eval.RadioQuestions.Add(new RadioQuestion()
                    {
                        Text = answer.Question.Text,
                        Answers = answers
                    });
            }

            foreach (var answer in trainingEval.CheckboxAnswers)
            {
                eval.CheckBoxQuestions.Add(new CheckBoxQuestion()
                    {
                        Checked = answer.Checked,
                        Text = answer.Question.Text
                    });
            }
            
            return new PdfResult(eval, "TrainingEvaluation");
        }
    }
}