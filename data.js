const mongoose = require('mongoose');
const express=require('express');
const app=express();
var nodemailer = require('nodemailer');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
mongoose.set('strictQuery', true)
mongoose.connect("mongodb+srv://mindhacker1098:spn1098@cluster0.t66x9u5.mongodb.net/?retryWrites=true&w=majority").then(()=>{console.log("sucessful")}).catch((err)=>{console.log(err)});

const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    fname: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    date: {
        type: String,
        required: true
    }

})
const User=mongoose.model("lol",UserSchema);
const shit=async(name,fname,email,date,person)=>{
    console.log(name,fname,email,date);

const user = new User({name:name,fname:fname,email:email,date:date})
const ans=await user.save()
console.log(ans);
}
const getu=async()=>{
    //let da=new Date().toISOString().substring(5,10)
    let da=new Date();
    da.setDate(da.getDate()+1);
    da=da.toISOString().substring(5,10);


    const info=await User.find(  {date:{$regex:new RegExp('.....'+da) }})
    
    return info
}


async function damn(){
    // let da=new Date().toISOString().substring(5,10)

    let da=new Date();
    da.setDate(da.getDate()+1);
    da=da.toISOString().substring(5,10);

    
    //  let res = await fetch(`http://localhost:8000/getinfo`);
    let res=await getu();
    // let data=await res.json();
    let data=res;
    for(let i in data){
    
    
    
    
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'birthdaywisher1098@gmail.com',
          pass: 'bfbjvxxuojjtyfto'
        }
      });
      
      var mailOptions = {
        from: 'birthdaywisher1098@gmail.com',
        to: data[i].email,
        subject: `birthday wish from ${data[i].name}`,
        text: `wish you many many happy returns of the day ${data[i].fname}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    
    
    
    }
    
    
    
    }



app.post("/ducky",(req,res)=>{
    console.log(req.body);
shit(req.body.name,req.body.fname,req.body.email,req.body.date);
// res.send("hello friends");
res.sendFile('res.html',{root:__dirname});

})

app.get("/getinfo",(req,res)=>{

    getu().then((resp)=>{

res.send(resp);

    })
})


app.get("/",(req,res)=>{

    res.send("i am home page")
})

var counter = 10;
var myFunction = function() {

        let dat=new Date().toTimeString()
        if(dat.substring(0,5)=="18:30"){
    
    
    console.log(dat.substring(6,8));
    damn();
    
    counter=85800000;
    
        }
        else if(dat.substring(6,8)!="00"){counter=1000;
        
        }
           else if(dat.substring(6,8)=="00"){counter=60000;}
  
    console.log(dat);
    setTimeout(myFunction, counter);
}
setTimeout(myFunction,counter);
var port=process.env.PORT || 8000
app.listen(port,()=>{

    console.log("server started")
})

