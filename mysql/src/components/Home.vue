<template>
    <div>
        <v-snackbar
            v-model="snackbar"
            absolute
            top
            right
            color="error">
              <span>Usuario o contraseña incorrectos</span>
              <v-icon dark>error</v-icon>
        </v-snackbar>
        <div style="padding-left:26%;padding-right:26%;padding-top:4%">
            <v-card flat class="contenedor">
                <v-form ref="form" @submit.prevent="submit">
                    <v-container  grid-list-xl fluid>
                        <div style="text-align:center">
                            <h1 class="font-weight-light" style="text-align:center">  
                                <span >MySQL</span><br>
                                <span>Connection request</span>
                            </h1>
                        </div>
                        <br>
                        <div style="padding-left:26%;padding-right:26%;padding-top:4%">
                            <v-layout wrap style="text-align:center">
                                <v-flex xs12 sm6>
                                    <v-text-field
                                    v-model="host"
                                    color="purple darken-2"
                                    label="Host"
                                    required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-text-field
                                    v-model="port"
                                    color="purple darken-2"
                                    label="Port"
                                    :mask="mask"
                                    required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field
                                    v-model="user"
                                    color="purple darken-2"
                                    label="Usuario"
                                    required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field
                                    v-model="password"
                                    :append-icon="show1 ? 'visibility_off' : 'visibility'"
                                    :rules="[rules2.required]"
                                    :type="show1 ? 'text' : 'password'"
                                    name="input-10-1"
                                    label="Contraseña"
                                    @click:append="show1 = !show1"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-text-field
                                    v-model="base"
                                    color="purple darken-2"
                                    label="Base de datos"
                                    required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-btn color="blue" type="submit">
                                        <span style="color:white">Connect</span>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </div>
                    </v-container>
                </v-form>
            </v-card>
            <div style="text-align: right; padding-top:10px" >
                <div class="lista">
                    <ul>
                        <li><router-link to="/" class="sinco">Términos</router-link></li>
                        <li><router-link to="/" class="sinco">Condiciones</router-link></li>
                        <li><router-link to="/" class="sinco">Ayuda</router-link></li>
                    </ul>
                </div>
            </div>
            <br>
        </div>
    </div>
</template>

<script>
 const io = require('socket.io-client');
 var socket = io.connect('http://localhost:3000');
export default {
    data: () => ({
        datos:[],
        show1: false,
        user:'root',
        mask:'########',
        password: 'vasquez123',
        aux:'',
        countries: ['Afghanistan'],
        host:'localhost',
        db:['mexretos','taco','testeo','world'],
        base:'mexretos',
        country: null,
        port:'3308',
        token:{},
        snackbar:false,
        rules2: {
            required: value => !!value || 'Required.',
        },
    }),
    created() {
        // socket.emit('client', 'Hola server');
        // socket.on('server', function (data) {
        //     console.log(data);
        // });		
    },
    methods: {
        submit(){
            this.datos.push(this.user);
            this.datos.push(this.host);
            this.datos.push(this.port);
            this.datos.push(this.password)
            this.datos.push(this.base)
            socket.emit('conexion', this.datos);
            //this.datos= []
            for (let index = 0; index < 5; index++) {
                this.datos.pop()
            }   
            socket.on('server', (data) => {
                if(data == "conexion correcta"){
                this.$router.push({ name: 'nuevo' })
            }
            });
            
        }
    }
}
</script>

<style>
    .sinco{
        text-decoration: none;
        padding-right: 6px
    }
    .sinco:hover{
        border-bottom: 1px solid #3E8CD8;
    }
    .lista ul{
        padding-right: 0px;
        padding-left: 0px;
        padding-bottom: 0px;
        padding-top: 0px;
        margin: 0px;
        word-spacing: 3px
    }
    .lista li{
        list-style-type: none;
        display: inline;
        padding-right: 5px;
    }
    .text{
        font-family: 'Google Sans',arial,sans-serif;text-align: center;font-size: 18px; font-weight: 400;padding-left:22px;        
    }
    .hyper{
        font-family: 'Google Sans',arial,sans-serif;text-align: center;font-size: 16px; font-weight: 400;padding-left:0px;        
    }
    .contenedor{
        box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.75); padding-left: 12px; padding-top:22px; padding-right: 12px; border-radius: 7px
    }
</style>