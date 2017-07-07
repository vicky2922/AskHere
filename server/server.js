/**
 * Created by Vicky on 7/3/2017.
 */

var express = require('express');     //importing express
var app = express();
var mongojs = require('mongojs');
var db = mongojs('mongodb://<14bce013>:<14bce013>@ds151062.mlab.com:51062/quoradb',['userdata','question','answer']);  //db path and collections
var bodyParser = require('body-parser');


/////////////////////////////////////////////////////////
//Server Running on this port for request
app.listen(3000 || process.env.PORT);
console.log("Server is running on 3000");

//Datbabase Message
db.on('error', function (err) {
  console.log('Database Error', err)
})

db.on('connect', function () {
  console.log('Database Connected')
})


//To load index.html at first homepage request
app.use(express.static("../dist"));
app.use(bodyParser.json());




/////////////////////////////////////////////////////////
//User Related
/////////////////////////////////////////////////////////

//Username and Email Live Check for new registration
app.get('/usernamecheck/:anyvalue',(req,res) => {
  db.userdata.findOne({username: req.param('anyvalue')},(err,doc) => {
  if(err || !doc){
  return res.json({available:true});
}else{
  return res.json({available:false});
}
});
});


app.get('/emailcheck/:anyvalue',(req,res) => {
  db.userdata.findOne({email: req.param('anyvalue')},(err,doc) => {
  if(err || !doc){
  return res.json({available:true});
}else{
  return res.json({available:false});
}
});
});

//To add new user-new Registration
app.post('/newUserReg', (req,res) => {
  console.log("Request For:-Add New User");
db.userdata.insert(req.body, (err,doc) => {
  res.json(doc);
})
});

//Deleting user
app.delete('/deleteuser/:anyvalue',(req,res) => {
  db.userdata.remove({_id: mongojs.ObjectID(req.param('anyvalue'))},(err,doc) => {
  res.json({serverMessage:'User Deleted!'});
});
});

//Login Process
app.post('/userLogin',(req,res) => {
  console.log("Request For:-Login Attempt.");
db.userdata.findOne({$or: [{email:req.body.username},{username:req.body.username}],password: req.body.password }, (err, user) => {
  if( err || !user)
{
  res.json({username: 'Not Found!', email: 'Not Found!', password: 'Not Found!'});
}
else
{
  res.json(user);
}
});

});

//Returning all user for admin use
app.get('/adminreqforuser',(req,res)=>{
  console.log("Request For:-All User Details by Admin.");
db.userdata.find({},(err,doc)=>{
  res.json(doc);
});
});

//Retrieve One User by ID
app.get('/getOneUser/:anyvalue',(req,res)=>{
  console.log("Request For:-One User Request");
db.userdata.findOne({_id: mongojs.ObjectID(req.param('anyvalue'))},(err,doc) => {
  res.json(doc);
});
});


//Retrieve One Question if its present (Live Check)
app.get('/questioncheck/:anyvalue',(req,res) => {
  db.question.findOne({question: req.param('anyvalue')},(err,doc) => {
  if(err || !doc){
  return res.json({available: true});
  }
  else{
    return res.json({available: false});
  }
});
});


//Add question to db
app.post('/addquestion',(req,res)=>{
  console.log("Request for :- Add new Question");
  db.question.insert(req.body,(err,doc) => {
    res.json({serverMessage:"Question Added..."});
  });
});


//Retrieve all Question
app.get('/fetchallquestion',(req,res) => {
  console.log("Request For:-All Question by user.");
db.question.find({},(err,doc) => {
  res.json(doc);
});
});

//Retrieve your question
app.get('/fetchyourquestion/:anyvalue',(req,res) => {
  db.question.find({askedby: req.param('anyvalue')},(err, doc) => {
  res.json(doc);
});
});

//delete question by user
app.delete('/deletequestion/:anyvalue', (req,res) => {
  db.question.remove({_id:mongojs.ObjectID(req.param('anyvalue'))},(err,doc) => {
    res.json({serverMessage:'Question Deleted!'});
})
});

//fetch question detail for answer purpose
app.get('/fetchthisquestion/:anyvalue', (req,res) => {
  db.question.findOne({_id: mongojs.ObjectID(req.param('anyvalue'))}, (err, doc) => {
    res.json(doc);
});
});


//Add answer to db
app.post('/addanswer',(req,res)=>{
  console.log("Request for :- Add new Answer");
db.answer.insert(req.body,(err,doc) => {
  res.json({serverMessage:"Answer Added..."});
});
});

//Retrive answer from db

app.get('/fetchqanswer/:anyvalue',(req,res) => {
  db.answer.find({ofqueid: req.param('anyvalue')}, (err,doc) => {
    res.json(doc);
});
});
