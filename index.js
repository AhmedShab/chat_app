var port = process.env.PORT || 5000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = [];

app.use(express.static(__dirname +'/public'));

io.on('connection', function(socket){
  users.push(socket);

  console.log("new user is has joined in");
  socket.on('message', function(msg){
    io.emit('message', msg);
  });

  socket.on('disconnect', function () {
    var i = users.indexOf(socket);
     console.log(users.splice(i, 1));

    io.emit('message', {
      name: users.name,
      text: "user has disconnected"
    });
  });
});

http.listen(port, function () {
  console.log('Server is starting at port ' + port);
});
