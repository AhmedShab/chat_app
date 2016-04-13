var socket = io();
var name = getQueryVariable('name');

socket.on('connect', function () {
  socket.emit('join', {
    name: name
  });
})


$('form').submit(function(){
  socket.emit('message', {
    name: name,
    text: $('#m').val()
  });

  $('#m').val('');
  return false;
});

socket.on('load messages', function (data) {
  for (var i = 0; i < data.length; i++) {
    displayMessages(data[i]);
  }
});

socket.on('message', function(msg){
  displayMessages(msg);
});

function displayMessages(msg) {
  var $messages = jQuery('.messages');
  var $message = jQuery('<li class="list-group-item"></li>');

  $message.append('<p class="text-left"><strong>' + msg.name +'</strong></p>');
  $message.append('<p class="text-left">' + msg.text +'</p>');
  // $message.append('<br/>');
  $messages.append($message);
}
