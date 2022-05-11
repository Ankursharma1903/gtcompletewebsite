
var express = require('express');
var app = express();
var router = express.Router();
const bodyparser=require("body-parser");

  
var path = __dirname + '/views/';
  
app.use('/',router);
app.use('/static',express.static('static'))
app.use(express.urlencoded())
// connecting mongoose
const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

mongoose.connect('mongodb://localhost/gamingtitans',{useNewUrlParser:true});
var db = mongoose.connection;
// this will make connection
db.on('error', console.error.bind(console,'connection error:'));
db.once('open',function(){
    // we are connected !
    console.log("we are connected bro....")
});
// define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    Phone: String,
    Branch: String,
    Section: String,
    Enrollment: String,
    Year: String,
    Game: String,
    subject:String,
    message: String
  });
  var contact = mongoose.model('contact', contactSchema);
// it likely same for mysql
//  mpm i body-parser is must to take input


// mongoose part ends
  
router.get('/',function(req, res){
  res.sendFile(path + 'index.html');
});
  
router.get('/read',function(req, res){
  res.sendFile(path + 'read.html');});
  
router.get('/core-team',function(req, res){
  res.sendFile(path + 'core-team.html');
});
router.get('/contact',function(req,res){
  
   
  res.sendFile(path + 'contact.html');
});
// setting my form
// router.post('/contact',function(req,res){
app.post('/contact',function(req,res){
  
  var mydata = new contact(req.body);
//   so when someone click we will form a new data
mydata.save().then(()=>{
    res.send("this item has been saved to the database")
}).catch(()=>{
 res.status(400).send("item was not saved");
})
});
// form part ends


app.use('*',function(req, res){
  res.send('Error 404: Not Found!');
});
  
app.listen(3000,function(){
  console.log("Server running at Port 3000");
});

// write cd c:  to change the directory to c drive and then run mongo d

// in another terminal write mongo
// in mongo terminal write
// use contactDance
// show collections
// we can use bootstrap alert


// write in mongoose 
// db.contacts.find()
// to see all the data stored in it