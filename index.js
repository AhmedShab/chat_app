var port = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var clients = [];

// mongoose.connect('mongodb://localhost:27017/chat', function (err) {
mongoose.connect('mongodb://ahmed:ahmed16@ds023560.mlab.com:23560/ahmed-chat-db', function (err) {

})
  if (err) {
    console.log('failed to connect');
  }
  else {
    console.log('connected successfuly');
  }
});

var chatSchema = mongoose.Schema({
  name: String,
  text: String
});

var Chat = mongoose.model('Message', chatSchema);

app.use(express.static(__dirname +'/public'));

io.on('connection', function(socket){
  Chat.find({}, function (err, data) {
    // console.log('getting old messages');
    socket.emit('load messages', data);
  });

  console.log("new user is has joined in");
  socket.on('message', function(msg){
    var newMessage = new Chat ({name: msg.name, text: msg.text});
    // console.log(newMessage);
    newMessage.save(function (err) {
      if (err) throw err;
    });
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
