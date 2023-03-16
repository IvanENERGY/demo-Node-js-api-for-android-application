var config =require('./dbconfig');
const sql=require ('mssql');

async function getOrders(){
    try{
        let pool=await sql.connect(config);
        let products = await pool.request().query("SELECT * from Orders");
        return products.recordsets;
    }
    catch (error){
        console.log(error);
    }

}

async function getOrder(orderId){
    try{
        let pool=await sql.connect(config);
        let products = await pool.request()
        .input('input_parameter',sql.Int,orderId)
        .query("SELECT * from Orders Where Id = @input_parameter");
        return products.recordsets;
    }
    catch (error){
        console.log(error);
    }

}
async function addOrder(order){
    try{
        let pool=await sql.connect(config);
        let insertProduct = await pool.request()
        .input('Id',sql.Int,order.Id)
        .input('Title',sql.NVarChar,order.Title)
        .input('Quantity',sql.Int,order.Quantity)
        .input('Message',sql.NVarChar,order.Message)
        .input('City',sql.NVarChar,order.City)
        .execute('InsertOrders'); //stored procedure
        //.query("Insert Into Orders(id,Title,Quantity,[Message],City) Values(@Id,@Title,@Quantity,@Message,@City);Select * from Orders where id=@Id");
        return insertProduct.recordsets[0][0]; // the return of the stored proc or the query
    }
    catch (error){
        console.log(error);
    }

}

async function updateOrder(order){
    try{
        let pool=await sql.connect(config);
        let updateProduct = await pool.request()
        .input('Id',sql.Int,order.Id)
        .input('Title',sql.NVarChar,order.Title)
        .input('Quantity',sql.Int,order.Quantity)
        .input('Message',sql.NVarChar,order.Message)
        .input('City',sql.NVarChar,order.City)
        //.execute('UpdateOrders');
        .query("Update Orders SET Title=@Title,Quantity=@Quantity,[Message]=@Message,City=@City WHERE id=@Id;Select * from Orders where id=@Id");
        return updateProduct.recordsets;
    }
    catch (error){
        console.log(error);
    }

}


async function updateOrderById(orderId,order){
    try{
        let pool=await sql.connect(config);
        let updateProduct = await pool.request()
        .input('input_parameter',sql.Int,orderId)
        .input('Title',sql.NVarChar,order.Title)
        .input('Quantity',sql.Int,order.Quantity)
        .input('Message',sql.NVarChar,order.Message)
        .input('City',sql.NVarChar,order.City)
     
        .query("Update Orders SET Title=@Title,Quantity=@Quantity,[Message]=@Message,City=@City WHERE id=@input_parameter;Select * from Orders where id=@input_parameter");
        return updateProduct.recordsets[0][0];
    }
    catch (error){
        console.log(error);
    }

}
async function patchOrderById(orderId,order){
    try{
        let pool=await sql.connect(config);
        let updateProduct = await pool.request()
        .input('Id',sql.Int,orderId)
        .input('Title',sql.NVarChar,order.Title)
        .input('Quantity',sql.Int,order.Quantity)
        .input('Message',sql.NVarChar,order.Message)
        .input('City',sql.NVarChar,order.City)
        .execute('PatchOrder')
       ;
        return updateProduct.recordsets[0][0];
    }
    catch (error){
        console.log(error);
    }

}
async function deleteOrder(orderId){
    try{
        let pool=await sql.connect(config);
        let deleteProduct = await pool.request()
        .input('Id',sql.Int,orderId)

        .query("Delete from Orders WHERE id=@Id");
        return deleteProduct.recordsets;
    }
    catch (error){
        console.log(error);
    }

}



module.exports = {
    getOrders : getOrders,
    getOrder : getOrder,
    addOrder :addOrder,
    updateOrder:updateOrder,
    updateOrderById:updateOrderById,
    patchOrderById:patchOrderById,
    deleteOrder:deleteOrder
}