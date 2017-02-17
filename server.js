const express = require('express');
const app = express();
const request = require('request');
const curl = require('curlrequest');
var gcm = require('node-gcm');
var jsonServer = require('json-server');
var dbs = jsonServer.create();
var regTokenlist;
function notification(){
  var message = new gcm.Message({
      // data: { key1: 'msg1' }
  });

  var options = {
    url : 'http://localhost:3000/recievers/1'
  };
  curl.request(options,function(err,data){
    jsononbject = JSON.parse(data);
    regTokenlist = jsononbject.recArray;
    var sender = new gcm.Sender('YOUR GCM API KEY');
    var regTokens = regTokenlist;

    sender.send(message, { registrationTokens: regTokens }, function (err, response) {
        if(err) console.error(err);
        else 	console.log(response);
    });
  });
//  console.log(regTokenlist);


}
// (function run() {
//   setInterval(notification, 30000);
// })();

//app.use(express.bodyParser());
app.post('/', function(req, res) {
  //console.log(req.body);
  //  res.send(200);
  notification();
});

app.use(express.static('./public'))

// app.get('/', function(req, res) {
//     res.sendFile(__dirname + '/index.html');
// });


/*To format Jive Response */
app.listen(1337,(err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://127.0.0.1:1337');
});
