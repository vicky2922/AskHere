/**
 * Created by Vicky on 7/3/2017.
 */

var express = require('express');     //importing express
var app = express();
var cors = require('cors')
const path = require('path')
var mongojs = require('mongojs');

var db = mongojs('mongodb://14bce013:14bce013@ds151062.mlab.com:51062/quoradb',['userdata','question','answer','adminquestion','session']);  //db path and collections
//var db = mongojs('mongodb://localhost/quoradb',['userdata','question','answer','adminquestion','session']);  //db path and collections
var bodyParser = require('body-parser');

var ipfind = require('ip')

app.use(express.static(__dirname + '/dist'))
app.use(bodyParser.json())
app.use(cors())

/////////////////////////////////////////////////////////
//Server Running on this port for request
app.listen(process.env.PORT || 8080);
console.log("Server is running on 8080");


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*")
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

//Datbabase Message
db.on('error', function (err) {
  console.log('Database Error', err)
})

db.on('connect', function () {
  console.log('Database Connected')
})


//To load index.html at first homepage request
app.use(express.static(__dirname+"/dist"));
app.use(bodyParser.json());


/*
const forceSSL = function() {
  return function (req, res, next) {
    //console.log("IP is in ssl:" + req.connection.remoteAddress);
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}

app.use(forceSSL());

*/



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
/*app.post('/userLogin',(req,res) => {
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

});*/


//Login Process
app.post('/userLogin', (req, res) => {
  console.log("Request For:-Login Attempt.")
db.userdata.findOne({
  $or: [{
    email: req.body.username
  }, {
    username: req.body.username
  }],
  password: req.body.password
}, (err, user) => {
  if (err || !user) {
  res.json({
    username: 'Not Found!',
    email: 'Not Found!',
    password: 'Not Found!'
  })
} else {
  db.session.insert({
    clientIP: ipfind.address() + '',
    data: user
  }) //session stuff
  res.json(user)
}
})

})

//Get Logged in Session
app.get('/getsession', (req, res) => {
  console.log("Request For:-All Session")
//console.log(ipfind.address())
db.session.find({}, (err, doc) => {
  res.json(doc)
})
})

app.get('/getip', (req, res) => {
  console.log("Request For:-IP")
//console.log(ipfind.address())
res.json({
  client: ipfind.address()
})
})



//delete session
app.delete('/deletesession/:anuvalue', (req, res) => {
  console.log("Request For:-Login Session delete.")
db.session.remove({
  clientIP: ipfind.address()
}, (err, doc) => {
  if (err || !doc) {
  res.json({
    flag: false
  })
} else {
  res.json({
    flag: true
  })
}
})
})


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


//Add question to db in admin part from user
app.post('/addquestion',(req,res)=>{
  console.log("Request for :- Add new Question");
  db.adminquestion.insert(req.body,(err,doc) => {
    res.json({serverMessage:"Question Added to admin side"});
  });
});


//Add question to db from admin part to user
app.post('/addquestiontoweb',(req,res)=>{
  console.log("Request for :- Add new Question");
db.question.insert(req.body,(err,doc) => {
  res.json({serverMessage:"Question Added to web"});
});
});



//Retrieve all Question
app.get('/fetchallquestion',(req,res) => {
  console.log("Request For:-All Question by user.");
db.question.find({},(err,doc) => {
  res.json(doc);
});
});


//Retrieve admin Question
app.get('/fetchadminquestion',(req,res) => {
  console.log("Request For:-All Question by admin.");
db.adminquestion.find({},(err,doc) => {
  res.json(doc);
});
});

//Retrieve admin Answer
app.get('/fetchadminanswer',(req,res) => {
  console.log("Request For:-All Answer by admin.");
db.answer.find({approved:false},(err,doc) => {
  res.json(doc);
});
});


//Retrieve your question
app.get('/fetchyourquestion/:anyvalue',(req,res) => {
  db.question.find({askedby: req.param('anyvalue')},(err, doc) => {
  res.json(doc);
});
});

//delete question by admin
app.delete('/deletequestionbyadmin/:anyvalue', (req,res) => {
  db.adminquestion.remove({_id:mongojs.ObjectID(req.param('anyvalue'))},(err,doc) => {
  res.json({serverMessage:'Question Deleted at admin side!'});
})
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


//fetch question detail for admin side
app.get('/fetchthisquestionforadmin/:anyvalue', (req,res) => {
  db.adminquestion.findOne({_id: mongojs.ObjectID(req.param('anyvalue'))}, (err, doc) => {
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

//Retrive related question to admin side from db by question title

app.get('/fetchrelatedquestions/:anyvalue',(req,res) => {

  console.log("Request For:-related questions")
  db.question.find({

      $text:{
        $search : req.param('anyvalue')
      }

  }, (err,doc) => {
  res.json(doc);
});
});



/*
app.get('*', function (req,res){
    res.sendFile(__dirname+ '/dist/index.html');
  }
)
*/
