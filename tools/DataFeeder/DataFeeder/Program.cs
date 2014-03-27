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
        public static void parseCSV(Stream stream, int option)
        {
            try
            {
                using (StreamReader readFile = new StreamReader(stream))
                {
                    const string cnStringImportdata = @"Data Source=localhost\sqlexpress;Initial Catalog=Ilc;Integrated Security=True";
                    var cn = new SqlConnection(cnStringImportdata);
                    string line;
                    string[] row;

                    while ((line = readFile.ReadLine()) != null)
                    {
                        row = line.Split(',');
                        switch (option)
                        {
                            case 1:
                                    //skip the first line from csv file
                                if (row[1].Contains("bankAccount"))
                                    continue;
                                InserCustomerCommand(row, cn);
                                break;
                            case 2:
                                if (row[0].Contains("Username"))
                                    continue;
                                InsertUsersCommand(row,cn);
                                break;
                            default:
                                break;
                        }

                        cn.Close();
                        Console.WriteLine("Execution finished. Press any key to exit!");
                    }
                }
            }
            catch (Exception e)
            {
                //Response.Write("CSV parser error.<br>" + e.Message);
            }
        }

        public static void InserCustomerCommand(string[] row, SqlConnection cn)
        {
            SqlConnection sqlCon = cn;
            var insertCommand = new SqlCommand("INSERT INTO Customer(Name, BillingAddress, BankAccount, CompanyId)" +
                                           "Values('" + row[0] + "','" + row[2] + "','" + row[1] + "','" + row[3] + "')", sqlCon);
            sqlCon.Open();
            insertCommand.ExecuteNonQuery();
            sqlCon.Close();
        }

        public static void InsertUsersCommand(string[] row, SqlConnection cn)
        {
            int userDBId = 0;
            int customerDBId = 0;
            SqlConnection sqlCon = cn;
            SqlCommand selectCommand = null;
            SqlCommand insertCommand = null;
            SqlDataReader dataRdr = null;
            sqlCon.Open();

            insertCommand = new SqlCommand("INSERT INTO UserProfile(Email,CompanyId)" +
                                           "Values('" + row[3] + "','" + row[6] + "')", sqlCon);
            insertCommand.ExecuteNonQuery();

            selectCommand = new SqlCommand("SELECT TOP 1 Id, Email" + " FROM UserProfile" + " WHERE (Email LIKE @Username)",
                                           sqlCon);
            selectCommand.Parameters.Add(new SqlParameter("@Username", System.Data.SqlDbType.NVarChar, -1, "Email"));
            selectCommand.Parameters["@Username"].Value = row[3];

            dataRdr = selectCommand.ExecuteReader();
            if (dataRdr.Read())
                userDBId = int.Parse(dataRdr["Id"].ToString());
            sqlCon.Close();
            
            sqlCon.Open();
            var salt = Ilc.Crypto.Crypto.GenerateSalt();
            var hashedPwd = Ilc.Crypto.Crypto.Hash(salt + Ilc.Crypto.Crypto.Hash(salt + row[0]));
            insertCommand = new SqlCommand("INSERT INTO webpages_Membership(UserId, PasswordFailuresSinceLastSuccess, Password, PasswordSalt)" +
                                           "Values('" + userDBId + "','" + 0 + "','" + hashedPwd + "','" + salt + "')", sqlCon);
            insertCommand.ExecuteNonQuery();
            sqlCon.Close();

            sqlCon.Open();
            insertCommand = new SqlCommand("INSERT INTO UserDetails(Id, FirstName, LastName, Phone)" +
                                           "Values('" + userDBId + "','" + row[1] + "','" + row[2] + "','" + row[4] + "')", sqlCon);
            insertCommand.ExecuteNonQuery();

            selectCommand = new SqlCommand("SELECT TOP 1 Name, Id" + "  FROM Customer" + " WHERE (Name LIKE @Name)",
                                           sqlCon);
            selectCommand.Parameters.Add(new SqlParameter("@Name", System.Data.SqlDbType.NVarChar, -1, "Name"));
            selectCommand.Parameters["@Name"].Value = row[5];

            dataRdr = selectCommand.ExecuteReader();
            if (dataRdr.Read())
                customerDBId = int.Parse(dataRdr["Id"].ToString());
            sqlCon.Close();

            sqlCon.Open();
            insertCommand = new SqlCommand("INSERT INTO Student(Name, CustomerId, UserProfileId)" +
                                           "Values('" + row[1] + " " + row[2] + "','" + customerDBId + "','" + userDBId +"')", sqlCon);
            insertCommand.ExecuteNonQuery();
            sqlCon.Close();

            sqlCon.Open();
            insertCommand = new SqlCommand("INSERT INTO webpages_UsersInRoles(UserId, RoleId)" +
                                          "Values('" + userDBId + "','" + 1 + "')", sqlCon);
            insertCommand.ExecuteNonQuery();
            sqlCon.Close();
        }

        static void Main(string[] args)
        {
            Console.WriteLine("Select opction:" +
                              Environment.NewLine + "1 Import customers" +
                              Environment.NewLine + "2 Import students" +
                              Environment.NewLine + "3 Import trainers" +
                              Environment.NewLine + "Please enter your selection:");
            var ans = Console.ReadLine();

            var location = Assembly.GetExecutingAssembly().Location;
            var directory = Path.GetDirectoryName(location);
            string csvFilePath = "";
            
            int choice = 0;
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

            parseCSV(File.OpenRead(csvFilePath), choice);

            Console.ReadLine();
        
        }
    }
}
