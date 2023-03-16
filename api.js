const dboperation = require('./dboperation');
var Db = require('./dboperation');
var Order = require('./order');

var express= require('express');
var bodyParser=require('body-parser');
var cors=require('cors');
var app=express();
var router = express.Router();


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api',router);


router.use((request,response,next)=>{

        console.log('middleware');
        next();
})

router.route('/orders').get((request,response)=>{
    if(request.query.id!=null){   //representing route ('/orders?id=2')
        dboperation.getOrder(request.query.id).then(result =>{
   
            response.json(result[0]);
        })
    } 
    else{
        dboperation.getOrders().then(result =>{

        response.json(result[0]);
    })
    }

})
router.route('/orders/:id').get((request,response)=>{
    dboperation.getOrder(request.params.id).then(result =>{
   
        response.json(result[0]);
    })
})


router.route('/orders').post((request,response)=>{
    let order = {... request.body}
    dboperation.addOrder(order).then(result =>{
   
        response.status(201).json(result);
    })
})

router.route('/orders').put((request,response)=>{
    let order = {... request.body}
    dboperation.updateOrder(order).then(result =>{
   
        response.status(200).json(result);
    })
})
router.route('/orders/:id').put((request,response)=>{
    let order = {... request.body}
    dboperation.updateOrderById(request.params.id,order).then(result =>{
   
        response.status(200).json(result);
    })
})
router.route('/orders/:id').patch((request,response)=>{
    let order = {... request.body}
    dboperation.patchOrderById(request.params.id,order).then(result =>{
   
        response.status(200).json(result);
    })
})


router.route('/orders/:id').delete((request,response)=>{
    
    dboperation.deleteOrder(request.params.id).then(result =>{
   
        response.status(200).json(result);
    })
})

var port = process.env.PORT||8090;
app.listen(port);
console.log('Order Api is running at'+port);




dboperation.getOrders().then(result=>{
    console.log(result);
})