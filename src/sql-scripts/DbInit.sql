USE [sociapp]
GO
/****** Object:  Table [dbo].[RoleId]    Script Date: 4/28/2022 11:53:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RoleId](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[CanPost] [bit] NOT NULL,
	[CanEditOwnPost] [bit] NOT NULL,
	[CanDeleteOwnPost] [bit] NOT NULL,
	[CanEditOthersPost] [bit] NOT NULL,
	[CanDeleteOthersPost] [bit] NOT NULL,
	[CanReviewReportedPost] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 4/28/2022 11:53:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Email] [nvarchar](256) NOT NULL,
	[Password] [nvarchar](max) NOT NULL,
	[FirstName] [nvarchar](64) NOT NULL,
	[LastName] [nvarchar](64) NOT NULL,
	[BirthDate] [date] NOT NULL,
	[RoleId] [int] NOT NULL,
	[Timestamp] [datetime] NOT NULL,
	[Description] [nvarchar](max) NULL,
	[Location] [nvarchar](max) NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[RoleId] ON 
GO
INSERT [dbo].[RoleId] ([Id], [Name], [CanPost], [CanEditOwnPost], [CanDeleteOwnPost], [CanEditOthersPost], [CanDeleteOthersPost], [CanReviewReportedPost]) VALUES (1, N'User', 1, 1, 1, 0, 0, 0)
GO
SET IDENTITY_INSERT [dbo].[RoleId] OFF
GO
/****** Object:  StoredProcedure [dbo].[CreateUser]    Script Date: 4/28/2022 11:53:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateUser]
	 @Email NVARCHAR(256)
	,@Password NVARCHAR(MAX)
	,@FirstName NVARCHAR(64)
	,@LastName NVARCHAR(64)
	,@BirthDate DATE
AS
	INSERT INTO [dbo].[User] (
		 [Email]
		,[Password]
		,[FirstName]
		,[LastName]
		,[BirthDate]
		,[RoleId]
		,[Timestamp]
	) VALUES (
		 @Email
		,@Password
		,@FirstName
		,@LastName
		,@BirthDate
		,1
		,GETDATE()
	);
GO
/****** Object:  StoredProcedure [dbo].[GetUserProfile]    Script Date: 4/28/2022 11:53:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetUserProfile]
	@Id INT
AS
	SELECT
		 [u].[Id] AS [Id]
		,[u].[Email] AS [Email]
		,[u].[FirstName] AS [FirstName]
		,[u].[BirthDate] AS [BirthDate]
		,[u].[Timestamp] AS [Timestamp]
		,[u].[Description] AS [Description]
		,[u].[Location] AS [Location]
	FROM [dbo].[User] [u]
	WHERE [u].[Id] = @Id;
GO
