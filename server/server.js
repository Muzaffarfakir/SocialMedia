/////require all libs here /////
let express = require("express");
let app = express();
let cors = require("cors")
let port = process.env.PORT || 8000;
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let path = require("path");
let multer = require('multer')
let jwt = require("jsonwebtoken");
let cloud = require("cloudinary").v2;

//// conect db here 
let par = {
    useNewUrlParser: true

}
let url = "mongodb+srv://fakirmuzaffar771:Muzaffar@cluster0.eexjwpq.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(url, par).then(() => {
    console.log("Connected")
}).catch((er) => {
    console.log(er)
})
cloud.config({
    cloud_name: 'dm0thlxai',
    api_key: '583765424425853',
    api_secret: 'brfFu8p3eAEMmLWOaMcUxtyL96s'
});

////// multer here 
let storage = multer.diskStorage({
    destination: "upload/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({
    storage: storage
})

//////midle ware all here

app.use(express.json({ limit: "50mb", }));
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("upload/"))

///////Schema or models here 
let us = new mongoose.Schema({
    img: String,
    name: String,
    email: String,
    pass: String,
    mobile: Number,
    des: String,
    post: [{
        text: String,
        img: String,
        view:Number
    }],

})
let User = new mongoose.model("User", us)



//////Routing here 


app.get("/", (req, res) => {
    res.send('Hello Muju')
})
let img;
app.post("/signImg", upload.single("img"), (req, res) => {
    img = req.file.path;

})
app.post("/signData",async (req, res) => {
   // let url = req.protocol + "://" + req.get("host");
    try{
    let da=await cloud.uploader.upload(img).then((r)=>{
        
  
    
    let data = new User({
        img: r.secure_url,
        name: req.body.name,
        email: req.body.email,
        pass: req.body.pass,
        mobile: req.body.mobile,
        des: req.body.des,


    })
  

    data.save();
});
   
    }
    catch(er){
        console.log(er);


    }

});
let imgs,_id;
app.post('/postImg',upload.single('imgs'),(req,res)=>{
    imgs=req.file.path;
})
app.post('/postsid',(req,res)=>{
    _id=req.body.id;
})

app.post("/posts",async (req, res) => {
    let url = req.protocol + "://" + req.get("host");
    let rr="";
    try{
    let d=  cloud.uploader.upload(imgs).then((r)=>{
        rr=r.url
        
    })
        
  
    let _id=req.body.id
    let v=Math.floor(Math.random()*100);
   await  User.findOneAndUpdate({_id:_id},{$push:{post:{text:req.body.text,img:rr,view:v}}})
          
    }catch(er){
        console.log(er);
    }
 

  

});
app.get(`/profile/:id`,async(req,res)=>{
    let data=await User.findById(req.params.id)
    res.send([data])
})

let email, pass;
app.post("/login", async (req, res) => {
    email = req.body.email;
    pass = req.body.pass;
    let data = await User.findOne({ email: email, pass: pass })
    if (data) {
        let token = jwt.sign({ id: data._id }, "Muju");
        res.json({ mess: "hai", token: token, id: data._id })
    }
    else {
        res.json({ mess: "nahi" })
    }




})
app.get("/allpost",async(req,res)=>{
    let data=await User.find();
    res.send(data)
})



//////listen on the port number that /////
app.listen(port)
