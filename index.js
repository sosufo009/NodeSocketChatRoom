var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    io.emit('chat message', 'User leave!');
  });
});

http.listen(process.env.PORT || 5000, function(){
  console.log('listening on *:5000');
});

