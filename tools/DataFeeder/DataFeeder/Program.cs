using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace DataFeeder
{
    class Program
    {
        /// <summary>
        /// Csv file is readed via FileUpload method.
        /// </summary>
        public static void parseCSV(Stream stream)
        {
            try
            {
                using (StreamReader readFile = new StreamReader(stream))
                {
                    string cnStringImportdata = @"Data Source=localhost\sqlexpress;Initial Catalog=Ilc;Integrated Security=True";
                    SqlConnection cn = new SqlConnection(cnStringImportdata);
                    string line;
                    string[] row;

                    while ((line = readFile.ReadLine()) != null)
                    {
                        row = line.Split(',');
                        //skip the first line from csv file
                        if(row[1].Contains("bankAccount"))
                            continue;
                        SqlCommand insertCommand =
                            new SqlCommand("INSERT INTO Customer(Name, BillingAddress, BankAccount)" +
                                           "Values('" + row[0] + "','" + row[2] + "','" + row[1] + "')", cn);
                        cn.Open();
                        insertCommand.ExecuteNonQuery();
                        cn.Close();
                        Console.WriteLine("Executed: {0}", insertCommand.CommandText);
                    }
                }
            }
            catch (Exception e)
            {
                //Response.Write("CSV parser error.<br>" + e.Message);
            }
        }

        static void Main(string[] args)
        {
            Console.WriteLine("Select opction:" +
                              Environment.NewLine + "1 Import customers\n" +
                              Environment.NewLine + "2 Import students" +
                              Environment.NewLine + "3 Import trainers" +
                              Environment.NewLine + "Please enter your selection:");
            var ans = Console.ReadLine();

            var location = Assembly.GetExecutingAssembly().Location;
            var directory = Path.GetDirectoryName(location);
            string csvFilePath = "";

            int choice=0;
            if (int.TryParse(ans, out choice))
            {
                switch (choice)
                {
                    case 1:
                        csvFilePath = Path.Combine(directory, "customers.csv");
                        break;
                    case 2:
                        csvFilePath = Path.Combine(directory, "students.csv");
                        break;
                    case 3:
                        csvFilePath = Path.Combine(directory, "trainers.csv");
                        break;
                    default:
                        Console.WriteLine("Wrong selection!!!" +
                                          Environment.NewLine + "Press any key for exit");
                        Console.ReadKey();
                        break;
                }
            }

            parseCSV(File.OpenRead(csvFilePath));

            Console.ReadLine();
        }
    }
}
