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
  $('#messages').append('<p><strong>' + msg.name +'</strong></p>');
  $('#messages').append('<p>' + msg.text +'</p>');
  $('#messages').append('<br/>');
});
