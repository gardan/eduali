IF EXISTS (SELECT name FROM master.dbo.sysdatabases WHERE name = 'Ilc')

BEGIN
	ALTER DATABASE [Ilc] 
	SET OFFLINE 
	WITH ROLLBACK IMMEDIATE;
	
	
	ALTER DATABASE [Ilc]
	SET ONLINE;
	DROP DATABASE Ilc
END