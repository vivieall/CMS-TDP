<template>
  <v-layout align-start>
    <v-flex>
      <v-container>
        <v-list-item>Nuevo Contenido {{ this.textoTitulo }}</v-list-item>

        <v-toolbar flat color="white">
          <!--Botón de retorno a la lista de contenidos genéricos-->
          <v-btn @click="returnToList">
            <v-icon>reply</v-icon>
          </v-btn>

          <v-spacer></v-spacer>

          <!--Animación de cargando - Creación de contenido genérico-->
          <v-progress-circular
            v-if="cargandoCreacion"
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>

        </v-toolbar>

        <v-divider></v-divider>

        <!--Formulario de registro de contenido genérico-->
        <v-form v-model="validForm" ref="form">
          <v-row class="first_row">
            <v-col lg="2">
              <p>Nombre</p>
            </v-col>
            <v-col>
              <v-text-field
                :rules="nombreReglas"
                v-model="contenido.nombre"
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
              <p>Imagen</p>
            </v-col>

            <v-col>
            <!--Input de archivo - Subida de imagen de contenido genérico-->
              <v-file-input
                accept="image/*"
                label="Imagen"
                solo
                prepend-icon="perm_media"
                v-model="contenido.file"
                :rules="imagenReglas"
              >
              </v-file-input>
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

      <!--Diálogo de confirmación - Creación de contenido genérico-->
      <dialogo-insercion
        :dialog="validInsertion"
        v-on:close="validInsertion = false"
        v-on:guardarValido="guardar"
        titulo="contenido"
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

   

      //Abre el diálogo de confirmación de registro
      validInsertion: false,

      //Texto del título que puede ser tanto genérico como personalizado
      textoTitulo: "",

      //Tipo de contenido extraído de la ruta de la página
      tipoContenido: "",

      //Animación de cargando
      cargandoCreacion: false,

      //Modelo de registro de contenido
      contenido: {
        nombre: "",
        descripcion: "",
        file: null,
      },

      //Define si los campos del formulario son válidos o no
      validForm: false,

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
      imagenReglas: [
        (v) => !!v || "La imagen es requerida.",
        (v) => (v && v.size < 2000000) || "La imagen debe pesar menos de 2MB.",
      ],

   

    };
  },
  created() {
    this.tipoContenido = this.$route.params.tipo_contenido;
    if (this.tipoContenido == "generico") {
      this.textoTitulo = "Genérico";
    } else if ((this.tipoContenido = "personalizado")) {
      this.textoTitulo = "Personalizado";
    }
  },
  methods: {
    returnToList() {
      this.$router.push("/contenidos/" + this.tipoContenido);
    },
    abrirDialogoInsercion() {
      //Muestra las validaciones del form si los campos no son válidos
      this.$refs.form.validate();
      if (this.validForm) {
        this.validInsertion = true;
      }
    },
    guardar() {
      //Utiliza el FormData para enviar los datos de contenido junto con su imagen en un formato válido
      this.validInsertion = false;
      this.cargandoCreacion = true;
      if (this.validForm) {
        const fd = new FormData();
        var c = this.contenido;
        fd.append("file", c.file);
        fd.append("nombre", c.nombre);
        fd.append("descripcion", c.descripcion);
        axios
          .post("contenido/upload", fd)
          .then((response) => {
            this.cargandoCreacion = false;
            this.returnToList();
            this.$alert("Registro exitoso", "Exitoso", "success");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
