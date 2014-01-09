using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SqlMigrator
{
    class Program
    {
        static void Main(string[] args)
        {
            var arg1 = args[0];
            var arg2 = args[1];

            var connectionString = arg1.Substring(arg1.IndexOf(Convert.ToChar(":")) + 1);
            var sqlUpdateScriptPath = arg2.Substring(arg2.IndexOf(Convert.ToChar(":")) + 1);


            var dirInfo = new DirectoryInfo(sqlUpdateScriptPath);
            var files = dirInfo.GetFiles();

            foreach (var fileInfo in files)
            {
                var migrationName = Path.GetFileNameWithoutExtension(fileInfo.Name);
                var sqlConnection = new SqlConnection(connectionString);

                var sqlCommand =
                    new SqlCommand(
                        "SELECT * FROM __MigrationHistory WHERE MigrationId = '" + Path.GetFileNameWithoutExtension(fileInfo.Name) + "'");

                sqlCommand.Connection = sqlConnection;

                sqlConnection.Open();

                var reader = sqlCommand.ExecuteReader();
                var hasRows = reader.HasRows;
                reader.Close();
                sqlConnection.Close();

                if (hasRows)
                {
                    Console.WriteLine("Migration {0} exists. Skipping to next migration.", migrationName);
                    continue;
                }
                Console.WriteLine("Migration {0} does not exist.", migrationName);
                Console.WriteLine("Executing {0} migration...", migrationName);
                
                sqlCommand.CommandText = fileInfo.OpenText().ReadToEnd();
                sqlConnection.Open();
                sqlCommand.ExecuteNonQuery();
                sqlConnection.Close();

                Console.WriteLine("Succesfully executed {0}!", migrationName);
            }
        }
    }
}
