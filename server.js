var http= require("http");
var express=require("express");
var hostname="127.0.0.1";
var filename="/Users/VIMAL/Desktop/EXTRAS/node js/login_signup/index.html";
var fs=require('fs');
const app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json() );       // to support JSON-encoded bodies

app.get('/',function(request,response){
    response.send("Specify the document to search");
});

app.get("/signup",function(request,response){
    response.sendFile(filename);
});

var olddata=[];
app.post('/signup',urlencodedParser,function(request,response){
    var userdata=request.body;
    response.sendFile(filename);
    fs.readFile("db.json",'utf8',function(err,data){
        if(err)
        {
            console.log(err);
        }
        else
        {
            var olddata=JSON.parse(data);
            var len=olddata.length;
            olddata[len]=userdata;
            console.log("Data inserted successfully...\n");
            fs.writeFile("db.json",JSON.stringify(olddata), function(err){
                if(err)
                {
                    console.log(err);
                }
            });
        }
    });
    
});

app.post('/login',urlencodedParser,function(request,response){
    var username=request.body.name;
    var password=request.body.password;
    fs.readFile("db.json",'utf8',function(err,data){
        if(err)
        {
            console.log(err);
        }
        else
        {
            var olddata=JSON.parse(data);
            var len=olddata.length;
            var flag=0;
            for(var i=0;i<len;i++)
            {
                if(olddata[i].name==username && olddata[i].password==password)
                {
                    flag=1;
                }
            }
            if(flag==0)
            {
                response.redirect('/signup');
                console.log("Register first");
            }
            else
            {    
                response.send("Successfull login");
                console.log("Successfully logged in");
            }
        }
    });
    
});

http.createServer(app).listen(8000);

console.log('Server running at http://127.0.0.1:8000/');



