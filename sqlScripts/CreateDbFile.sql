USE [master]
GO

/****** Object:  Database [Ilc]    Script Date: 09/13/2013 18:24:08 ******/
CREATE DATABASE [Ilc] ON  PRIMARY 
( NAME = N'Ilc', FILENAME = N'c:\Program Files\Microsoft SQL Server\MSSQL11.SQLEXPRESS\MSSQL\DATA\Ilc.mdf' , SIZE = 4096KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'Ilc_log', FILENAME = N'c:\Program Files\Microsoft SQL Server\MSSQL11.SQLEXPRESS\MSSQL\DATA\Ilc_log.LDF' , SIZE = 768KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO

ALTER DATABASE [Ilc] SET COMPATIBILITY_LEVEL = 100
GO

IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Ilc].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO

ALTER DATABASE [Ilc] SET ANSI_NULL_DEFAULT OFF 
GO

ALTER DATABASE [Ilc] SET ANSI_NULLS OFF 
GO

ALTER DATABASE [Ilc] SET ANSI_PADDING OFF 
GO

ALTER DATABASE [Ilc] SET ANSI_WARNINGS OFF 
GO

ALTER DATABASE [Ilc] SET ARITHABORT OFF 
GO

ALTER DATABASE [Ilc] SET AUTO_CLOSE ON 
GO

ALTER DATABASE [Ilc] SET AUTO_CREATE_STATISTICS ON 
GO

ALTER DATABASE [Ilc] SET AUTO_SHRINK OFF 
GO

ALTER DATABASE [Ilc] SET AUTO_UPDATE_STATISTICS ON 
GO

ALTER DATABASE [Ilc] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO

ALTER DATABASE [Ilc] SET CURSOR_DEFAULT  GLOBAL 
GO

ALTER DATABASE [Ilc] SET CONCAT_NULL_YIELDS_NULL OFF 
GO

ALTER DATABASE [Ilc] SET NUMERIC_ROUNDABORT OFF 
GO

ALTER DATABASE [Ilc] SET QUOTED_IDENTIFIER OFF 
GO

ALTER DATABASE [Ilc] SET RECURSIVE_TRIGGERS OFF 
GO

ALTER DATABASE [Ilc] SET  ENABLE_BROKER 
GO

ALTER DATABASE [Ilc] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO

ALTER DATABASE [Ilc] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO

ALTER DATABASE [Ilc] SET TRUSTWORTHY OFF 
GO

ALTER DATABASE [Ilc] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO

ALTER DATABASE [Ilc] SET PARAMETERIZATION SIMPLE 
GO

ALTER DATABASE [Ilc] SET READ_COMMITTED_SNAPSHOT OFF 
GO

ALTER DATABASE [Ilc] SET HONOR_BROKER_PRIORITY OFF 
GO

ALTER DATABASE [Ilc] SET  READ_WRITE 
GO

ALTER DATABASE [Ilc] SET RECOVERY SIMPLE 
GO

ALTER DATABASE [Ilc] SET  MULTI_USER 
GO

ALTER DATABASE [Ilc] SET PAGE_VERIFY CHECKSUM  
GO

ALTER DATABASE [Ilc] SET DB_CHAINING OFF 
GO


