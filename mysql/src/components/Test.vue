<template>
<div>
    <v-toolbar color="#1867C0">
        <v-toolbar-title>
            <i class="fas fa-database" style="color:white;margin:3px"></i>
            <span style="color:white; padding-left:1%"> MySQL Gestor</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-btn flat @click="logOut">
                <span style="color:white">Desconectar</span>
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
    <div class="contenedor1">
          <v-text-field
            label="Escribe tu query ..."
            outline
            v-model="quer"
            append-outer-icon="search"
            @click:append-outer="buscar"
          ></v-text-field>
    </div>
    <div>
        <v-alert
        :value="alert"
        color="red"
        icon="warning"
        dismissible
        transition="scale-transition"
        >
        Query invalida, por favor introduce bien los datos
        </v-alert>
    </div>
    <div class="con">
        <v-data-table dark :headers="headers" :items="data" hide-actions class="elevation-1">
            <template slot="items" slot-scope="props">
                <td v-for="header in headers" :key="header"> {{ props.item[header.value] }} </td>
            </template>
            <template slot="pageText" slot-scope="props">
                Lignes {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
            </template>
        </v-data-table>
    </div>
</div>

</template>

<script>
const io = require('socket.io-client');
var socket = io('http://localhost:3000');
export default {
    data:() => ({
        buscara:'',
        tittle: [],
        data: [],
        headers: [],
        alert:  false,
        quer:'',
        bars: [
        { 'class': '' },
        { 'class': '', dark: true },
        { 'class': 'primary', dark: true },
        { 'class': 'elevation-0' }
      ]
    }),
    methods: {
        buscar() {
            var newQuery
            var c;
            var datos = [];
            var cadena = this.quer
            var cad = cadena.split(' ', 1);
            datos.push(cad[0])
            datos.push(this.quer)
            switch (cad[0]) {
                case 'insert':
                    c = this.quer
                    newQuery = c.split(' ', 3)
                    datos.push(newQuery[2])
                    break;
                case 'delete':
                    c = this.quer
                    newQuery = c.split(' ', 3)
                    datos.push(newQuery[2])
                    break;
                case 'select':
                    c = this.quer
                    newQuery = c.split('from ')
                    datos.push(newQuery[1])
                    break;
                case 'update':
                    c = this.quer
                    newQuery = c.split(' ', 2)
                    datos.push(newQuery[1])
                    break;
                default:
                    break;
            }
            socket.emit('ejec', datos);
            socket.on('server', (data2)=> {
                this.data = data2;
                if(data2 == 'error'){
                    this.alert=true
                    this.limpiar()
                }else{
                    this.alert=false
                    this.llenarHeaders();    
                }
            });
        },
        llenarHeaders() {
            this.tittle = Object.keys(this.data[0]);
            var p = [];
            for (var k in this.tittle) {
                p[k] = { text: this.tittle[k], value: this.tittle[k] };
            }
            this.headers = p;
        },
        logOut(){
            socket.emit('logout');
            this.$router.push({ name: 'home' })
        }
    },
}

</script>

<style>
  .con{
    padding-left:2%;
    padding-right: 2%  
  }
  .contenedor1{
    margin-left: 2%;
    margin-right: 30%;
    margin-top: 3%
  }
</style>