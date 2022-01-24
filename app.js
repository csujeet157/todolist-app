const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = [];
let workitem = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
    
    let today = new Date();
 

    let option = {
     weekday: "long",
    

 };
 let day = today.toLocaleDateString("en-US", option);

 res.render('list' , { listTitle: day +" "+"Household List" ,newListitems: items});
})

app.post("/" , function(req,res){
    let item =  req.body.Newitem;
    if(req.body.list ==="work")
 {
     workitem.push(item);
     res.redirect("/work");
 }
 else{
    items.push(item);
    res.redirect("/");
 }
  
  
});

app.get("/work" ,function(req,res){
    let today = new Date()
    let currentDay = today.getDay();
    let option = {
        weekday: "long",
   
    };
    let day = today.toLocaleDateString("en-US", option);
    res.render("list",{listTitle: day+" "+"work list", newListitems:workitem});
})

app.listen(3000,function(){
    console.log("server is running at port 3000");
});