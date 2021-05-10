<template>
  <v-layout align-start>
    <v-flex>
      <v-container>
        <v-list-item>Nuevo servicio</v-list-item>
        <v-list-item>Tipo de servicio: {{ tipoDeServicioActual }}</v-list-item>
        <v-toolbar flat color="white">
          <v-btn @click="returnToList">
            <v-icon>reply</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <!--Animación de cargando-->
          <v-progress-circular
            v-if="cargando"
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </v-toolbar>
        <v-divider></v-divider>
        <!--Formulario de creación-->
        <v-form v-model="validForm" ref="form">
          <v-row class="first_row">
            <v-col lg="2">
              <p>Nombre</p>
            </v-col>
            <v-col>
              <v-text-field
                v-model="servicio.nombre"
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
              <v-textarea
                v-model="servicio.descripcion"
                label="Descripción"
                required
                solo
                :rules="descripcionReglas"
                rows="1"
                auto-grow
                row-height="12"
              ></v-textarea>
            </v-col>
          </v-row>

           <v-row>
            <v-col lg="2">
              <p>Imagen</p>
            </v-col>

            <v-col>
              <v-file-input
                accept="image/*"
                label="Imagen"
                solo
                prepend-icon="perm_media"
                v-model="servicio.file"
                @change="postHandler"
                :rules="imagenReglas"
              >
              </v-file-input>
            </v-col>
          </v-row>
          <v-btn
            medium
            color="indigo white--text"
            @click="abrirDialogoInsercion"
            >Guardar</v-btn
          >
        </v-form>
      </v-container>
       <!--Diálogo de confirmación - Creación de servicio-->
      <dialogo-insercion
        :dialog="validInsertion"
        v-on:close="validInsertion = false"
        v-on:guardarValido="guardar"
        titulo="servicio"
      >
      </dialogo-insercion>
    </v-flex>
  </v-layout>
</template>

<script>
import DialogoInsercion from "../DialogosValidacion/DialogoInsercion.vue";
import axios from "axios";
export default {
  name: "Servicio_Post",
  components: {
    DialogoInsercion,
  },
  data() {
    return {
      //Animación de cargando
      cargando: false,
      //Servicio a crear
      servicio: {
        nombre: "",
        descripcion: "",
        file: null,
      },
     //INSERCIÓN
      validForm: false, // Define si el form es válido
      tipoServicioDeRuta: "", // Parámetro tipo de servicio en la ruta de la vista
      tipo_servicio_id: "", //Id del tipo de servicio asociado al servicio a crear
      validInsertion: false, //Abre el diálogo de confirmación

      //Reglas del formulario de creación
      nombreReglas: [
        (v) => !!v || "El nombre es requerido.",
        (v) => (v && v.length <= 50) || "Debe contener menos de 50 caracteres.",
        (v) =>
          /^[^\s]+(\s+[^\s]+)*$/.test(v) ||
          "No deben haber espacios al inicio o al final.",
      ],
      descripcionReglas: [
        (v) => !!v || "La descripción es requerida.",
        (v) =>
          (v && v.length <= 200) || "Debe contener menos de 200 caracteres.",
        (v) =>
          /^[^\s]+(\s+[^\s]+)*$/.test(v) ||
          "No deben haber espacios al inicio o al final.",
      ],

      imagenReglas: [
        (v) => !!v || "La imagen es requerida.",
        (v) => (v && v.size < 2000000) || "La imagen debe pesar menos de 2MB.",
      ],
    };
  },
  computed: {
    //Retorna el tipo de servicio actual sin guardarlo en una variable
    //Se extrae de Vuex Store (store.js)
    tipoDeServicioActual() {
      return this.$store.state.tipoServicio.nombre_tipo_servicio;
    },
  },
  created() {
    this.tipo_servicio_id = this.$store.state.tipoServicio.tipo_servicio_id;
    this.tipoServicioDeRuta = this.$route.params.tipoServicio;
  },
  methods: {
    abrirDialogoInsercion() {
      this.$refs.form.validate();
      if (this.validForm) {
        this.validInsertion = true;
      }
    },
    returnToList() {
      this.$router.push("/servicios/" + this.tipoServicioDeRuta);
    },
    
    postHandler() {
      console.log(this.servicio);
    },
    guardar() {
      this.validInsertion = false;
      this.cargando = true;
      if (this.validForm) {
        const fd = new FormData();
        var c = this.servicio;
        fd.append("file", c.file);
        fd.append("nombre", c.nombre);
        fd.append("descripcion", c.descripcion);
        fd.append("tiposervicio",this.tipo_servicio_id);
        
        axios
          .post("servicio", fd)
          .then((response) => {
            console.log("Creando en axios");
            console.log(response.data);
            this.cargando = false;
            this.returnToList();
            this.$alert("Registro exitoso", "Exitoso", "success");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    confirmarGuardado() {
      if (this.validForm) {
        this.guardar();
      }
    },
  },
};
</script>