var port = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var clients = [];

app.use(express.static(__dirname +'/public'));

io.on('connection', function(socket){

  console.log("new user is has joined in");
  socket.on('message', function(msg){
    io.emit('message', msg);
  });

  socket.on('join', function (data) {
    clients[socket.id] = data;
    console.log(clients[socket.id]);
    socket.broadcast.emit('message', {
      name: data.name,
      text: 'has joined in'
    });
  });

  socket.on('disconnect', function () {
    var disconnectedClient = clients[socket.id];
    io.emit('message', {
      name: "",
      text: disconnectedClient.name +" has disconnected"
    });

    delete clients[socket.id];
    console.log(clients);
  });
});



http.listen(port, function () {
  console.log('Server is starting at port ' + port);
});
