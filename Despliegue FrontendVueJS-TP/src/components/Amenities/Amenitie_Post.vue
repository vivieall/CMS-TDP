<template>
  <v-layout align-start>
    <v-flex>
      <v-container>
        <v-list-item>Nuevo {{ titulo }}</v-list-item>
        <v-toolbar flat color="white">
          <v-btn @click="returnToList">
            <v-icon>reply</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-progress-circular
            v-if="cargando"
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </v-toolbar>
        <v-divider></v-divider>
        <v-form v-model="validForm" ref="form">
          <v-row class="first_row">
            <v-col lg="2">
              <p>Nombre</p>
            </v-col>
            <v-col>
              <v-text-field
                v-model="amenitie.nombre"
                label="Nombre"
                required
                solo
                :rules="nombreReglas"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col lg="2">
              <p>Descripción</p>
            </v-col>

            <v-col>
              <v-text-field
                v-model="amenitie.descripcion"
                label="Descripción"
                required
                solo
                :rules="descripcionReglas"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn @click="abrirDialogoInsercion">Guardar</v-btn>
        </v-form>
      </v-container>

      <dialogo-insercion
        :dialog="validInsertion"
        v-on:close="validInsertion = false"
        v-on:guardarValido="guardar"
        :titulo="tituloDialogo"
      >
      </dialogo-insercion>
    </v-flex>
  </v-layout>
</template>

<script>
import DialogoInsercion from "../../components/DialogosValidacion/DialogoInsercion.vue";
import axios from 'axios';
export default {
  name: "Amenitie_Post",
  components: {
    DialogoInsercion
  },
  data() {
    return {
      titulo: "",
      cadena: "",
      cargando: false,
      idgrupo_contenido: "",
      amenitie: {
        nombre: "",
        descripcion: "",
      },
      validForm: false,
      //INSERCIÓN
      tituloDialogo: "",
      validInsertion: false,
      nombreReglas: [
        (v) => !!v || "El nombre es requerido.",
        (v) => (v && v.length <= 50) || "Debe contener menos de 50 caracteres.",
        (v) => /^[^\s]+(\s+[^\s]+)*$/.test(v) || "No deben haber espacios al inicio o al final.",
      ],
      descripcionReglas: [
        (v) => !!v || "La descripción es requerida.",
        (v) =>
          (v && v.length <= 200) || "Debe contener menos de 200 caracteres.",
          (v) => /^[^\s]+(\s+[^\s]+)*$/.test(v) || "No deben haber espacios al inicio o al final.",
      ],
    };
  },
  created() {
    var aux = this.$route.params.tipoAmenitie;
    this.cadena = aux;
    console.log(aux);
    this.titulo = aux.charAt(0).toUpperCase();
    var continuacion = " ";
    if (aux.charAt(aux.charAt(length - 1).toUpperCase() == "S")) {
      continuacion = aux.slice(1, -1);
    } else {
      continuacion = aux.slice(1);
    }
    this.titulo = this.titulo + continuacion;
    this.tituloDialogo = this.cadena.slice(0,-1);
    this.idgrupo_contenido = this.$store.state.tipo_amenitie_id;

  },
  methods: {
    abrirDialogoInsercion() {
     this.$refs.form.validate();
     if(this.validForm){
      this.validInsertion = true;
      }
    },
    returnToList() {
      this.$router.push("/amenities/" + this.cadena);
    },
    guardar(){
        this.cargando = true;
        this.validInsertion = false;
        axios.post("/amenitie",
         {
           nombre: this.amenitie.nombre,
           descripcion: this.amenitie.descripcion,
           clima: "Lima, PE",
           tipoAmenitie :{
             id: this.idgrupo_contenido
           }

         })
        .then(response => {
            this.cargando = true;
            this.returnToList();   
            this.alerta_post(); 
          
        })
    },
    confirmarGuardado(){
        
        if(this.validForm){
          this.guardar();
        }
    },
    alerta_post(){
        this.$alert("", "Agregacion Exitosa","success").then(() => console.log("Closed"));
    }
  },
};
</script>