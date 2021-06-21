<template>
  <v-layout align-start>
    <v-flex>
      <v-container>
        <v-list-item>Nuevo tipo de anuncio</v-list-item>

        <v-toolbar flat color="white">
          <!--Botón de retorno a lista de tipos de anuncio-->
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

        <!--Formulario de registro de tipo de anuncio-->
        <v-form v-model="validForm" ref="form">
          <v-row class="first_row">
            <v-col lg="2">
              <p>Nombre</p>
            </v-col>
            <v-col>
              <v-text-field
                :rules="nombreReglas"
                v-model="tipoAnuncio.nombre"
                label="Nombre"
                required
                solo
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col lg="2">
              <p>Descripcion</p>
            </v-col>
            <v-col>
              <v-textarea
                :rules="descripcionReglas"
                v-model="tipoAnuncio.descripcion"
                label="Descripcion"
                required
                solo
                rows="1"
                auto-grow
                row-height="12"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-btn
            medium
            color="indigo white--text"
            @click="abrirDialogoInsercion"
          >
            Guardar
          </v-btn>
        </v-form>
      </v-container>
      <!--Diálogo de confirmación - Creación de tipo de anuncio-->
      <dialogo-insercion
        :dialog="validInsertion"
        v-on:close="validInsertion = false"
        v-on:guardarValido="guardar"
        titulo="tipo de anuncio"
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

      //Modelo para la creación del tipo de anuncio
      tipoAnuncio: {
        nombre: "",
        descripcion: "",
      },

      //Reglas de los campos del formulario
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

      validForm: false, //Valida que todos los campos sean correctos
      validInsertion: false, //Abre diálogo de confirmación
    };
  },
  created() {},
  methods: {
    returnToList() {
      this.$router.push("/tipo-anuncios");
    },
    abrirDialogoInsercion() {
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
          .post("tipo-anuncio", {
            nombre: this.tipoAnuncio.nombre,
            descripcion: this.tipoAnuncio.descripcion,
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
