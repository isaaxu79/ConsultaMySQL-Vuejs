<template>
  <div>
    <div class="contenedor1">
      <v-text-field
            outline
            v-model="quer"
            label="Manda tu Query"
            append-outer-icon="search"
            @click:append-outer="query"
      ></v-text-field>
    </div>
    <div id="resultado" class="con"></div>
  </div>
</template>

<script>
const io = require('socket.io-client');
var socket = io.connect('http://localhost:3000');
export default {
  data:() => ({
    quer:'',
  }),
  created() {
    
  },
  methods: {
    query(){
      var datos = [];
      var cadena = this.quer
      var cad = cadena.split(' ', 1);
      datos.push(cad[0])
      datos.push(this.quer)
      switch (cad[0]) {
        case 'insert':
          var c = this.quer
          var newQuery = c.split(' ', 3)
          datos.push(newQuery[2])
          break;
        case 'delete':
          var c = this.quer
          var newQuery = c.split(' ', 3)
          datos.push(newQuery[2])
          break;
        case 'select':
          var c = this.quer
          var newQuery = c.split('from ')
          datos.push(newQuery[1])
          break;
        case 'update':
          var c = this.quer
          var newQuery = c.split(' ', 2)
          datos.push(newQuery[1])
          break;
        default:
          break;
      }
      console.log(cad)
      socket.emit('ejec', datos);
      socket.on('server', (data2)=> {
        console.log('filas '+ data2.length);
        this.crear(Object.values(data2[0]).length , data2.length,data2)
        console.log('columnas '+Object.values(data2[0]).length)
        data2 = null;
      });
      this.quer = ""
    },
    crear(colu,fil,data){
        var col = colu;
        var filas = fil;
        var headers = Object.keys(data[0])
        console.log(headers)
        var tabla="<table border=\"0\">";
        
        tabla+="<tr><td></td>";
        for(var j=0;j<col;j++){ 
            tabla+="<td>"+headers[j]+ "</td>";
        }
        tabla+="</tr>";
        
        for(var i=0;i<filas;i++){
            var s = Object.values(data[i])
            tabla+="<tr>";
            tabla+="<td>"+(i+1)+ "</td>";
            for(var j=0;j<col;j++){ 
                tabla+="<td>"+s[j]+ "</td>";
            }
            tabla+="</tr>";
        }
        tabla+="</table>";
        document.getElementById("resultado").innerHTML=tabla;
    }

  },
}
</script>
<style>
  .con{
    padding-left:3%;
    padding-right: 4%  
  }
  .contenedor1{
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 2%
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    border: 1px solid #ddd;
  }
  
  th, td {
    text-align: left;
    padding: 16px;
  }
  
  tr:nth-child(even) {
    background-color: #f2f2f2
  }
</style>