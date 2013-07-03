using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Ilc.Web.Models
{
    public class CreateTransferModel
    {
        public string Homework { get; set; }
        public string LessonDate { get; set; }
        public string LessonNumber { get; set; }
        public string LessonTime { get; set; }
        public string ProgressAndComments { get; set; }
        public string StudentName { get; set; }
        public string Trainer { get; set; }
        public int[] TransferTypes { get; set; }
        public string TransferredFrom { get; set; }
        public string TransfferedTo { get; set; }
    }
}