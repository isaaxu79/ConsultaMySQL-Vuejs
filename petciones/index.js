var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var exec = require('child_process').exec;
var mysql = require('mysql');

server.listen(3000);

io.on('connection', function (socket) {
  var connection;
  var respu;
  socket.on('conexion',  (data)=> {
    console.log(data)
    this.connection = mysql.createConnection({
      host: data[1],
      user: data[0],
      password: data[3],
      database: data[4],
      port: data[2]
    });
    this.connection.connect(function(error){
      if(error){
        socket.emit('server', 'Ha la cagaste')
      }else{
         //console.log('Conexion correcta.');
         socket.emit('server', 'conexion chida')
      }
    });
  });
  socket.on('ejec',(data) =>{
    console.log(data)
    var query = this.connection.query(data[1], (error, result) =>{
      if(error){
         console.log('error')
      }else{
         this.respu = result;
         socket.emit('server',result)
         //console.log(result)
      }
   });
   switch (data[0]) {
    case 'insert':
      var query2 = this.connection.query('select * from '+data[2], (error, result)=>{
        if(error){
           console.log('error')
        }else{
           socket.emit('server',result)
        }
      });
      break;
    case 'delete':
      var query2 = this.connection.query('select * from '+data[2], (error, result)=>{
        if(error){
          console.log('error')
        }else{
          socket.emit('server',result)
        }
      });
      break;
    case 'update':
      var query2 = this.connection.query('select * from '+data[2], (error, result)=>{
        if(error){
          console.log('error')
        }else{
          socket.emit('server',result)
        }
      });
      break;
   }
  })
});

