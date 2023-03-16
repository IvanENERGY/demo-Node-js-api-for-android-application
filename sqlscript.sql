create table Orders 
(id nchar(10) not null PRIMARY KEY,
Title nvarchar(max) not null,
Quantity numeric(18,0) not null,
[Message] nvarchar(max) not null,
City nvarchar(max) not null)
-------------------------------------------------------------------------------------
Insert into Orders(id,Title,Quantity,[Message],City) 
values('1','Mobile phone',3,'Nokia3310','Vienna')
,('2','Game',1,'Hogwart Legacy','HKSAR')
-------------------------------------------------------------------------------------
USE CRUDAndroidDB;
DROP PROCEDURE if exists InsertOrders  
GO  

CREATE PROCEDURE InsertOrders  
    @Id nchar(10),   
    @Title nvarchar(max) ,
	@Quantity numeric(18,0),
	@Message nvarchar(max),
	@City nvarchar(max)
AS   

Insert into Orders(id,Title,Quantity,[Message],City) 
values(@Id,@Title,@Quantity,@Message,@City)
Select * from Orders where Id=@Id

GO  
--execute InsertOrders '32','CD',1,'MJ','Washington';
-------------------------------------------------------------------------------------
USE CRUDAndroidDB;
DROP PROCEDURE if exists UpdateOrders  
GO  

CREATE PROCEDURE UpdateOrders  
    @Id nchar(10),   
    @Title nvarchar(max) ,
	@Quantity numeric(18,0),
	@Message nvarchar(max),
	@City nvarchar(max)
AS   

Update Orders SET Title=@Title,Quantity=@Quantity,[Message]=@Message,City=@City WHERE id=@Id
Select * from Orders where Id=@Id
GO  
--execute UpdateOrders '32','CD',1,'Elden Ring','Washington';
-------------------------------------------
EXEC sp_rename 'Orders.id', 'Id'
-----------------------------------------
USE CRUDAndroidDB;
DROP PROCEDURE if exists PatchOrder  
GO  

CREATE PROCEDURE PatchOrder  
    @Id nchar(10),   
    @Title nvarchar(max) ,
	@Quantity numeric(18,0),
	@Message nvarchar(max),
	@City nvarchar(max)
AS   

IF NOT(@Title IS NULL)
BEGIN
	Update Orders SET Title=@Title WHERE id=@Id
END
IF NOT(@Quantity IS  NULL)
BEGIN
	Update Orders SET Quantity=@Quantity WHERE id=@Id
END
IF NOT(@Message IS  NULL)
BEGIN
	Update Orders SET [Message]=@Message WHERE id=@Id
END
IF NOT(@City IS  NULL)
BEGIN
	Update Orders SET City=@City WHERE id=@Id
END


Select * from Orders where Id=@Id
GO  
--execute PatchOrder '1234','CD',null,null,null;