using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataFeeder
{
    class Program
    {
        /// <summary>
        /// Csv file is readed via FileUpload method.
        /// </summary>
        public static List<string[]> parseCSV(Stream stream)
        {
            List<string[]> parsedData = new List<string[]>();

            try
            {
                using (StreamReader readFile = new StreamReader(stream))
                {
                    string line;
                    string[] row;

                    while ((line = readFile.ReadLine()) != null)
                    {
                        row = line.Split(',');
                        parsedData.Add(row);
                    }
                }
            }
            catch (Exception e)
            {
                //Response.Write("CSV parser error.<br>" + e.Message);
            }

            return parsedData;
        }

        static void Main(string[] args)
        {
            //path to file
            List<string[]> csv = parseCSV(File.OpenRead(@"H:\Diverse\Work\GitHub\ILC\tools\DataFeeder\DataFeeder\customers.csv"));

            string error;
            for (int i = 1; i < csv.Count; i++)
            {
                try
                {
                    string cnStringImportdata = @"Data Source=localhost\sqlexpress;Initial Catalog=Ilc;Integrated Security=True";

                    using (SqlConnection cn = new SqlConnection(cnStringImportdata))
                    {
                        SqlCommand insertCommand =
                            new SqlCommand("INSERT INTO Customer(Name, BillingAddress, BankAccount)" +
                                           "Values('" + csv[i][0] + "','" + csv[i][2] + "','" + csv[i][1] + "')", cn);
                        cn.Open();
                        insertCommand.ExecuteNonQuery();
                        cn.Close();
                    }
                }
                catch (Exception ex)
                {
                     Console.WriteLine(ex.Message);
                }
            }
        }
    }
}
