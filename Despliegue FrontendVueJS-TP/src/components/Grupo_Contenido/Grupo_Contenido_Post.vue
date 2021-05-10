<template>
<v-layout align-start>
    <v-flex>

    <v-container >

      <v-toolbar flat color="white">
         
      <v-btn text
         @click="retornar" >
             <v-icon>reply</v-icon> Regresar a grupos
      </v-btn>
        <v-toolbar-title></v-toolbar-title>
         <v-spacer></v-spacer>
          <v-progress-circular
          v-if="cargandoCreacion"
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>


      </v-toolbar>
      <v-divider ></v-divider>
      <v-form  v-model="valid_form_grupo" ref="form">
    <v-row class="first_row">
        <v-col 
        lg="2"
        >
        <p>Nombre</p>
        </v-col>
     
        <v-col>
        <v-text-field
      v-model="nombre"
      label="Nombre"
      :rules="nombreReglas"
      required
      solo
    ></v-text-field>    
        </v-col>
    </v-row>
    <v-row >
        <v-col 
        lg="2"
        >
        <p>Descripcion</p>
        </v-col>
     
        <v-col>
        <v-text-field
      v-model="descripcion"
      :rules="descripcionReglas"
      label="Descripcion"
      required
      solo
    ></v-text-field>      
        </v-col>
    </v-row>

    
    <v-btn @click="abrirDialogoInsercion" >
          Guardar
      </v-btn>

      </v-form>
</v-container>

    <dialogo-insercion
        :dialog="validInsertion"
        v-on:close="validInsertion = false"
        v-on:guardarValido="guardar_nuevo_grupo"
        :titulo="tituloDialogo"
      >
      </dialogo-insercion>
    
    </v-flex>
  </v-layout>
</template>




<script>
import axios from "axios";
import DialogoInsercion from "../DialogosValidacion/DialogoInsercion.vue";

export default {
   components: {
    DialogoInsercion,
  },
    data() {
    return {
      nombreReglas: [
        (v) => !!v || "El nombre es requerido.",
          (v) => (v && v.length <= 50) || "Debe contener menos de 50 caracteres.",
          (v) => /^[^\s]+(\s+[^\s]+)*$/.test(v) || "No deben haber espacios al inicio o al final.",
      ],
      descripcionReglas: [
          (v) => !!v || "La descripción es requerida.",
          (v) => (v && v.length <= 200 && v.length > 1) || "Debe contener menos de 200 caracteres.",
          (v) => /^[^\s]+(\s+[^\s]+)*$/.test(v) || "No deben haber espacios al inicio o al final.",
      ],
      nombre: '',
      descripcion: '',
      valid_form_grupo:false,
      validInsertion:false,
      tituloDialogo:"Grupo de Contenido"
    };
  },
  computed: {},

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {

  },
  methods: {
    abrirDialogoInsercion() {
     this.$refs.form.validate();
     if(this.valid_form_grupo){
      this.validInsertion = true;
      }
    },
    guardar_nuevo_grupo(){
      this.cargandoCreacion = true;
         let me=this;
         console.log(me.nombre);
         console.log(me.descripcion);
         axios
         .post("/grupo-contenido",{
             nombre:me.nombre,
             descripcion:me.descripcion
         })
         .then(function(response){
             me.retornar();
             me.alerta_post();
             me.cargandoCreacion = false;

         })
         .catch(function(error){
             console.log(error);
         });
    },
    retornar(){
     this.$router.push( '/grupos_contenido' );
    },
    alerta_post(){
        this.$alert("", "Agregacion Exitosa","success").then(() => console.log("Closed"));
    }
  }
};
</script>
<style >
  .first_row{
    margin-top: 4%;
  }
</style>
