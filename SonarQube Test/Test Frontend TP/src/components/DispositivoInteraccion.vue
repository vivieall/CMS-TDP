
<template>
  <v-layout align-start>
    <v-flex>
        <v-btn @click="volverADispositivos" style="margin: 6px 0px">
        <v-icon>reply</v-icon>
      </v-btn>
      <v-toolbar flat color="white">
        <v-toolbar-title>Interacción Usuario Dispositivo</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
      </v-toolbar>
    

    <!--Tabla de la lista de interacciones-->
    <v-data-table
    :headers="headers"
    :items="interacciones"
    class="elevation-1"
    :search="search"
    :loading="cargandoContenidos" 
    :loading-text="textoCargando"
    no-data-text="No hay interacciones"
    >

    <template v-slot:[`item.idpersona.oferta1.urlimagen`]="{ item }">
          <div class="p-2">
            <v-img
              :src="item.idpersona.oferta1.urlimagen"
              :alt="item.idpersona.nombre"
              class="imagen"
              style="max-height: 600px;"
            ></v-img>
          </div>
        </template>

    <template v-slot:[`item.idpersona.oferta2.urlimagen`]="{ item }">
          <div class="p-2">
            <v-img
              :src="item.idpersona.oferta2.urlimagen"
              :alt="item.idpersona.nombre"
              class="imagen"
              style="max-height: 600px;"
            ></v-img>
          </div>
        </template>


        <template v-slot:[`item.idpersona.oferta3.urlimagen`]="{ item }">
          <div class="p-2">
            <v-img
              :src="item.idpersona.oferta3.urlimagen"
              :alt="item.idpersona.nombre"
              class="imagen"
              style="max-height: 600px;"
            ></v-img>
          </div>
        </template>

    
    

<!--Botones de edición y eliminación en cada fila-->
      <template v-slot:[`item.edit`]="{ item }">
         <v-btn icon @click="abrirDialogoEdicion(item)">
              <v-icon>create</v-icon>
          </v-btn>
      </template>

      <template v-slot:[`item.delete`]="{ item }">
        <v-btn icon @click="abrirDialogoEliminacion(item.id)">
          <v-icon>delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    </v-flex>
  </v-layout>
</template>
<script>

import axios from "axios";
export default {
  name: "DispositivoInteraccion",
  data() {
    return {
    grupos_contenido: '',
      ofertas: [],
      personas: [],
      interacciones: [],
      nombre: '',
      descripcion: '',
      //Variable para la búsqueda de servicios por texto
      search: "",
      dialog: false,
      //Cabeceras del data table
      headers: [
        {text: 'ID',value: 'id',sortable:false},
        {text: 'Nombre',value: 'idpersona.nombre',sortable:false},
        {text: 'Codigo',value: 'idpersona.codalumno',sortable:false},
        {text: 'Imagen',value: 'idpersona.oferta1.urlimagen',sortable:false},
        {text: 'Imagen2',value: 'idpersona.oferta2.urlimagen',sortable:false},
        {text: 'Imagen3',value: 'idpersona.oferta3.urlimagen',sortable:false},
      ],
      cargandoContenidos: true,
      textoCargando:"Cargando interacciones",
      
      //Cargando
      cargandoLista: false,
    };
  },
  computed: {},

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.listar_persona();
  },

  methods: {

  
    listar_persona(){
      let me = this;
      axios
      .get("/persona")
      .then(function(response){
        me.personas =response.data;
        me.listar_oferta();
        })
      .catch(function(error){
        console.log(error);});
    },
    listar_interaccion(){
      let me = this;
      axios
      .get("/interaccion")
      .then(function(response){
        me.interacciones =response.data;
        me.agregar_datos();
        })
      .catch(function(error){
        console.log(error);});
    },
    listar_oferta(){
      let me = this;
      axios
      .get("/oferta")
      .then(function(response){
        me.ofertas =response.data;
        me.cargandoContenidos = false;
        me.listar_interaccion();
        })
      .catch(function(error){
        console.log(error);});
    },
    agregar_datos(){
       var ninguno = {
        nombre:"-",
        codalumno:"-",
        oferta1:{
          urlimagen:""
      },
      oferta2:{
          urlimagen:""
      },
      oferta3:{
          urlimagen:""
      },
      
      };
        for(var index in this.interacciones){
            var result = this.personas.find(obj => {
              return obj.id === this.interacciones[index].idpersona;
            });
           if (result !== undefined) {
            var oferta_1 = this.ofertas.find(obj2 => {
              return obj2.id == result.preferencia1;
            });
            var oferta_2 = this.ofertas.find(obj3 => {
              return obj3.id == result.preferencia2;
            });
            var oferta_3 = this.ofertas.find(obj4 => {
              return obj4.id == result.preferencia3;
            });
            
            result.oferta1 = oferta_1;
            result.oferta2 = oferta_2;
            result.oferta3 = oferta_3;
            this.interacciones[index].idpersona = result;
           }
           else{
              this.interacciones[index].idpersona = ninguno;
           }
        }

        console.log(this.interacciones);
    },
    volverADispositivos(){
      this.$router.push("/dispositivos");
    }

  }
};
</script>
<style>
  @import '../assets/app.css';
</style>
