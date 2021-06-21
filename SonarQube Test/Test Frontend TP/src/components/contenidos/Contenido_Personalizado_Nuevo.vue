<template>
  <v-layout align-start>
    <v-flex>
      <v-container>
        <v-list-item>Nuevo Contenido {{ this.textoTitulo }}</v-list-item>

        <v-toolbar flat color="white">
          <v-btn @click="returnToList">
            <v-icon>reply</v-icon>
          </v-btn>
          <v-spacer></v-spacer>

          <v-progress-circular
            v-if="cargandoCreacion"
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </v-toolbar>
        <v-divider></v-divider>
        <v-form v-model="validForm" ref="form">
          <v-row class="first_row">
            <v-col lg="2">
              <p>Titulo</p>
            </v-col>
            <v-col>
              <v-text-field
                :rules="nombreReglas"
                v-model="contenido.titulo"
                label="Titulo"
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
                v-model="contenido.descripcion"
                label="Descripcion"
                required
                solo
                rows="1"
                auto-grow
                row-height="12"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col lg="2">
              <p>Imagen URL</p>
            </v-col>
            <v-col>
              <v-textarea
                :rules="descripcionReglas"
                v-model="contenido.urlimagen"
                label="Imagen URL"
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

      <dialogo-insercion
        :dialog="validInsertion"
        v-on:close="validInsertion = false"
        v-on:guardarValido="guardar"
        :titulo="titulo"
      >
      </dialogo-insercion>
    </v-flex>
  </v-layout>
</template>


<script>
import axios from "axios";
import DialogoInsercion from "../DialogosValidacion/DialogoInsercion.vue";
export default {
  name: "Contenido_Post",
  components: {
    DialogoInsercion,
  },
  data() {
    return {
      validForm: false,
      textoTitulo: "",
      tipoContenido: "",
      cargandoCreacion: false,
      contenido: {
        titulo: "",
        descripcion: "",
        urlimagen: "",
      },
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
      //// Dialogo inserción válida ////
      validInsertion: false,
      titulo: "contenido",
    };
  },
  created() {
    this.tipoContenido = this.$route.params.tipo_contenido;
    if (this.tipoContenido == "generico") {
      this.textoTitulo = "Genérico";
    } else if ((this.tipoContenido = "personalizado")) {
      this.textoTitulo = "Personalizada";
    }
    console.log("Creando: " + this.textoTitulo);
  },
  methods: {
    postHandler() {
      console.log(this.contenido);
    },
    returnToList() {
      this.$router.push("/contenidos/" + this.tipoContenido);
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
        console.log("Posteando...");
        console.log(this.contenido.titulo);
        console.log(this.contenido.descripcion);
        var c = this.contenido;
        axios
          .post("/oferta",{
             titulo: c.titulo,
             descripcion:c.descripcion,
             urlimagen:c.urlimagen

         })
          .then((response) => {
            console.log("Creando en axios");
            console.log(response.data);
            this.cargandoCreacion = false;
            this.returnToList();
            this.$alert("Registro exitoso", "Exitoso", "success");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    imagenValida(cadena) {
      if (
        cadena.includes(".jpg") ||
        cadena.includes(".png") ||
        cadena.includes(".jpeg") ||
        cadena.includes(".JPG") ||
        cadena.includes(".PNG") ||
        cadena.includes(".JPEG")
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
<style>
.text-cargando {
  margin: auto;
  display: block;
}
</style>