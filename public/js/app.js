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

socket.on('message', function(msg){
  var $messages = jQuery('.messages');
  var $message = jQuery('<li class="list-group-item"></li>');

  $message.append('<p><strong>' + msg.name +'</strong></p>');
  $message.append('<p>' + msg.text +'</p>');
  $message.append('<br/>');
  $messages.append($message);
});
