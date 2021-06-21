<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Tipos de anuncio</v-toolbar-title>

        <v-spacer></v-spacer>

        <!--Campo de búsqueda de tipos de anuncio-->
        <v-text-field
          class="text-xs-center"
          v-model="search"
          append-icon="search"
          label="Búsqueda"
          single-line
          hide-details=""
        ></v-text-field>
        <v-spacer></v-spacer>

        <v-btn medium color="indigo white--text" @click="crearNuevo"
          >Agregar tipo de anuncio</v-btn
        >
      </v-toolbar>

      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="tiposDeAnuncio"
        :search="search"
        @click:row="verAnuncios"
        :loading="cargandoLista || cargandoEliminacion"
        loading-text="Cargando tipos de anuncio"
      >
        <!--Botones de edición y eliminación en cada fila-->
        <template v-slot:[`item.edit`]="{ item }">
          <v-btn icon @click.stop.prevent="abrirDialogoEdicion(item)">
            <v-icon>create</v-icon>
          </v-btn>
        </template>

        <template v-slot:[`item.delete`]="{ item }">
          <v-btn icon @click.stop.prevent="abrirDialogoEliminacion(item.id)">
            <v-icon>delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>

      <!--Formulario de edición de tipo de anuncio en diálogo-->
      <v-dialog v-model="editDialog" max-width="700px">
        <v-card :loading="cargandoEdicion">
          <v-card-title>
            <span>Edición de tipo de anuncio</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form v-model="edicionValida" ref="form">
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    v-model="tipoAnuncio.nombre"
                    label="Nombre"
                    :rules="reglaEditNombre"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-textarea
                    v-model="tipoAnuncio.descripcion"
                    label="Descripcion"
                    :rules="reglaEditDescripcion"
                    rows="1"
                    auto-grow
                    row-height="12"
                  ></v-textarea>
                </v-flex>
              </v-form>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-grey lighten-4" 
              large
              @click.native="cerrarDialogoEdicion"
              >Cancelar</v-btn
            >
            <v-btn
              color="blue-grey lighten-4" 
              large
              @click.native="abrirDialogoConfirmarEdicion"
              >Guardar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!--Diálogo de confirmación - Edición de tipo de anuncio-->
      <dialogo-edicion
        :dialog="confirmEditionDialog"
        @close="confirmEditionDialog = false"
        titulo="tipo de anuncio"
        @editarValido="editar"
      >
      </dialogo-edicion>

      <!--Diálogo de confirmación - Eliminación de tipo de anuncio-->
      <dialogo-eliminacion
        :dialog="confirmEliminationDialog"
        titulo="tipo de anuncio"
        @close="confirmEliminationDialog = false"
        @borrarValido="eliminar"
      >
      </dialogo-eliminacion>
    </v-flex>
  </v-layout>
</template>

<script>
import DialogoEdicion from "../DialogosValidacion/DialogoEdicion.vue";
import DialogoEliminacion from "../DialogosValidacion/DialogoEliminacion.vue";
import axios from "axios";
export default {
  name: "TipoAnuncios",
  components: {
    DialogoEdicion,
    DialogoEliminacion,
  },
  data() {
    return {
      //Headers de la tabla
      headers: [
        { text: "Nombre", value: "nombre" },
        { text: "Descripción", value: "descripcion" },
        { text: "Editar", value: "edit" },
        { text: "Eliminar", value: "delete" },
      ],

      //Variable para la búsqueda de tipos de anuncio por algún texto
      search:"",

      //Lista de tipos de anuncio
      tiposDeAnuncio: [],

      //Animaciones de cargando
      cargandoLista: false,
      cargandoEliminacion: false,
      cargandoEdicion: false,

      //--EDICIÓN--//
      
      editDialog: false, //Para abrir el formulario de edición
      edicionValida: false, //Define si los campos son válidos o no
      confirmEditionDialog: false, //Para abrir el diálogo de confirmar edición

      //Modelo para la edición de tipo de anuncio
      tipoAnuncio: {
        id: "",
        nombre: "",
        descripcion: "",
      },

      //Reglas para los campos de edición
      reglaEditNombre: [
        (v) => !!v || "El nombre es requerido.",
        (v) => (v && v.length <= 50) || "Debe contener menos de 50 caracteres.",
        (v) =>
          /^[^\s]+(\s+[^\s]+)*$/.test(v) ||
          "No deben haber espacios al inicio o al final.",
      ],
      reglaEditDescripcion: [
        (v) => !!v || "La descripción es requerida.",
        (v) =>
          (v && v.length <= 200 && v.length > 1) ||
          "Debe contener menos de 200 caracteres.",
        (v) =>
          /^[^\s]+(\s+[^\s]+)*$/.test(v) ||
          "No deben haber espacios al inicio o al final.",
      ],

      //--ELIMINACIÓN--//

      confirmEliminationDialog: false, //Para abrir diálogo de confirmar eliminación
      id_delete: "", //ID del tipo de anuncio a eliminar

 
    };
  },

  created() {
    this.listar();
  },
  methods: {
    //Ir a pantalla de creación
    crearNuevo() {
      this.$router.push("/tipo-anuncios/nuevo");
    },
    //Ir a anuncios del tipo seleccionado
    verAnuncios(item) {
      var tipo = item.nombre.toLowerCase().replace(/ /g, "_");
      //Para cambiar los datos del tipo de anuncio de Vuex al requerido (Ubicación: store.js)
      this.$store.commit("changeValueOfAnnouncementType", {
        tipo_anuncio_id: item.id,
        nombre_tipo_anuncio: item.nombre,
      });
      this.$router.push("/tipo-anuncios/" + tipo);
    },
    //LISTADO
    listar() {
      this.cargandoLista = true;
      axios
        .get("tipo-anuncio")
        .then((response) => {
          //Ordenando alfabéticamente
          this.tiposDeAnuncio = response.data.sort((a, b) => {
            return a.nombre
              .toLowerCase()
              .localeCompare(b.nombre.toLowerCase(), "es", {
                sensitivity: "base",
                numeric: true,
              });
          });
          this.cargandoLista = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //EDICIÓN
    abrirDialogoEdicion(item) {
      this.tipoAnuncio.id = item.id;
      this.tipoAnuncio.nombre = item.nombre;
      this.tipoAnuncio.descripcion = item.descripcion;
      this.editDialog = true;
    },
    cerrarDialogoEdicion() {
      this.editDialog = false;
    },
    abrirDialogoConfirmarEdicion() {
      //Muestra las validaciones del form si los campos no son válidos
      this.$refs.form.validate();
      if (this.edicionValida) {
        this.confirmEditionDialog = true;
      }
    },
    editar() {
      this.confirmEditionDialog = false;
      this.cargandoEdicion = true;
      if (this.edicionValida) {
        axios
          .put(`tipo-anuncio/${this.tipoAnuncio.id}`, {
            nombre: this.tipoAnuncio.nombre,
            descripcion: this.tipoAnuncio.descripcion,
          })
          .then((response) => {
            this.cargandoEdicion = false;
            this.editDialog = false;
            this.listar();
            this.$alert("Edición exitosa", "Exitoso", "success");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    //ELIMINACIÓN
    abrirDialogoEliminacion(id) {
      this.id_delete = id;
      this.confirmEliminationDialog = true;
    },
    eliminar() {
      this.confirmEliminationDialog = false;
      this.cargandoEliminacion = true;
      axios
        .delete(`tipo-anuncio/${this.id_delete}`)
        .then((response) => {
          this.cargandoEliminacion = false;
          this.listar();
          this.$alert("Eliminación exitosa", "Exitoso", "success");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>