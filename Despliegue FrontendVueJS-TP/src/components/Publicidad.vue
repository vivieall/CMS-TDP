<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Publicidad</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          class="text-xs-center"
          v-model="search"
          append-icon="search"
          label="Búsqueda"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
         <v-btn 
         @click="open" color="primary">
            Nuevo
      </v-btn>
        <v-dialog v-model="dialog" max-width="500px">
         
        </v-dialog>
      </v-toolbar>
      <v-data-table
    :headers="headers"
    :items="publicidad"
    class="elevation-1"
    :search="search"
  >

  <template v-slot:[`item.image`]="{ item }">
            <div class="p-2">
              <v-img :src="item.image" :alt="item.name" height="100px" width="100px"></v-img>
            </div>
          </template>

    <template v-slot:no-data>
      <v-btn color="primary" >Reset</v-btn>
    </template>
  </v-data-table>


    </v-flex>
  </v-layout>
</template>
<script>


import axios from "axios";
export default {
  data() {
    return {
      publicidad: [
          {
              titulo : "Nuevos zapatos",
              desc : "Anuncio 1",
              image : "https://ae01.alicdn.com/kf/H33340e8a8c1b455db17a0df23232c4d7E/Nuevos-zapatos-informales-de-primavera-zapatos-transpirables-de-tendencia-para-hombre.jpg"
          },
          {
              titulo : "Nuevos abrigos",
              desc : "Anuncio 2",
              image : "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/zara-abrigos-mujer-1575208355.jpg?crop=0.397xw:0.795xh;0.288xw,0&resize=640:*"
          },{
              titulo : "Nuevos jeans",
              desc : "Anuncio 3",
              image : "https://ae01.alicdn.com/kf/Hf63fcec7f2004f3aabcf43baab360b33r.jpg_q50.jpg"
          }
          
      ],
      dialog: false,
      headers: [
        {text: 'Titulo',value: 'titulo',sortable:false},
        {text: 'Descripcion',value: 'desc',sortable:false},
        { text: "Imagen", value: "image", sortable: false }
      ],
      search: "",
    };
  },
  computed: {
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    //TODO
    this.listar();

  },

  methods: {
    open(){
     this.$router.push( '/ula' );
    }
  }
};
</script>
<style>
  @import '../assets/app.css';
</style>
