<template>
  <v-layout align-start>
    <v-flex>
      <v-container>
        <v-list-item>Nuevo anuncio</v-list-item>
        <v-list-item>Tipo de anuncio: {{ tipoAnuncio.nombre }}</v-list-item>
        <v-toolbar flat color="white">
          <!--Botón de retorno a lista de anuncios-->
          <v-btn @click="returnToList">
            <v-icon>reply</v-icon>
          </v-btn>
          <v-spacer></v-spacer>

          <!--Animación de cargando - Creación de Anuncio-->
          <v-progress-circular
            v-if="cargandoCreacion"
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>

        </v-toolbar>

        <v-divider></v-divider>

        <!--Formulario de registro de anuncio-->
        <v-form v-model="validForm" ref="form">
          <v-row class="first_row">
            <v-col lg="2">
              <p>Nombre</p>
            </v-col>
            <v-col>
              <v-text-field
                :rules="nombreReglas"
                v-model="anuncio.nombre"
                label="Nombre"
                required
                solo
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col lg="2">
              <p>Detalle</p>
            </v-col>
            <v-col>
              <v-textarea
                :rules="descripcionReglas"
                v-model="anuncio.descripcion"
                label="Descripción"
                required
                solo
                rows="1"
                auto-grow
                row-height="12"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn
                medium
                color="indigo white--text"
                @click="abrirDialogoInsercion"
              >
                Guardar
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>

      <!--Diálogo de confirmación - Creación de anuncio-->
      <dialogo-insercion
        :dialog="validInsertion"
        v-on:close="validInsertion = false"
        v-on:guardarValido="guardar"
        titulo="anuncio"
      >
      </dialogo-insercion>
    </v-flex>
  </v-layout>
</template>


<script>
import axios from "axios";
import DialogoInsercion from "../DialogosValidacion/DialogoInsercion.vue";
export default {
  name: "TipoAnuncio_Post",
  components: {
    DialogoInsercion,
  },
  data() {
    return {

      //Para mostrar animación de cargando
      cargandoCreacion: false,

      //Modelo para la creación del anuncio
      anuncio: {
        nombre: "",
        descripcion: "",
      },
      //Tipo de anuncio asociado
      tipoAnuncio: {
        id: "",
        nombre: "",
      },

      //Parámetro de ruta
      nombreRutaTipoAnuncio: "",

      //Validaciones del formulario
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

      validInsertion: false, //Abre el diálogo para confirmar la creación
      validForm: false, //Campos del formulario válidos
    };
  },
  created() {
    this.nombreRutaTipoAnuncio = this.$route.params.tipoAnuncio;
    //Parámetros de tipo de anuncio - En Vuex Store (store.js)
    this.tipoAnuncio.id = this.$store.state.tipoAnuncio.tipo_anuncio_id;
    this.tipoAnuncio.nombre = this.$store.state.tipoAnuncio.nombre_tipo_anuncio;
  },
  methods: {
    returnToList() {
      this.$router.push("/tipo-anuncios/" + this.nombreRutaTipoAnuncio);
    },
    abrirDialogoInsercion() {
      //Activa las validaciones del form
      this.$refs.form.validate();
      if (this.validForm) {
        this.validInsertion = true;
      }
    },
    guardar() {
      this.validInsertion = false;
      this.cargandoCreacion = true;
      if (this.validForm) {
        axios
          .post("anuncio", {
            nombre: this.anuncio.nombre,
            descripcion: this.anuncio.descripcion,
            tipoanuncio: {
              id: this.tipoAnuncio.id,
            },
          })
          .then((response) => {
            this.cargandoCreacion = false;
            this.returnToList();
            this.$alert("Registro exitoso", "Exitoso","success");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
