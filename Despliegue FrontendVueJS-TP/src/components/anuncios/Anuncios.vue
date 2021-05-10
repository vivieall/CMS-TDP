<template>
  <v-layout align-start>
    <v-flex>
      <!--Botón de retorno a lista de tipos de anuncio-->
      <v-btn @click="volverATiposDeAnuncio" style="margin: 6px 0px">
        <v-icon>reply</v-icon>
      </v-btn>
      <v-toolbar flat color="white">
        <v-toolbar-title>{{ tipoAnuncio.nombre }}</v-toolbar-title>
        <v-spacer></v-spacer>

        <!--Campo de búsqueda de anuncios-->
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
          >Agregar anuncio</v-btn
        >
      </v-toolbar>

      <!--Tabla de lista de anuncios-->
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="anuncios"
        :search="search"
        :loading="cargandoLista || cargandoEliminacion"
        loading-text="Cargando anuncios"
        no-data-text="No hay anuncios"
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

      <!--Formulario de edición de anuncio en diálogo-->
      <v-dialog v-model="editDialog" max-width="700px">
        <v-card :loading="cargandoEdicion">
          <v-card-title>
            <span>Edición de anuncio</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form v-model="edicionValida" ref="form">
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    v-model="anuncio.nombre"
                    label="Nombre"
                    :rules="reglaEditNombre"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-textarea
                    v-model="anuncio.descripcion"
                    label="Descripción"
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

      <!--Diálogo de confirmación - Edición de anuncio-->
      <dialogo-edicion
        :dialog="confirmEditionDialog"
        @close="confirmEditionDialog = false"
        titulo="anuncio"
        @editarValido="editar"
      >
      </dialogo-edicion>

      <!--Diálogo de confirmación - Eliminación de anuncio-->
      <dialogo-eliminacion
        :dialog="confirmEliminationDialog"
        titulo="anuncio"
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
  name: "Anuncios",
  components: {
    DialogoEdicion,
    DialogoEliminacion,
  },
  data() {
    return {
      //Cabeceras de la tabla
      headers: [
        { text: "Nombre", value: "nombre", sortable: false },
        { text: "Descripción", value: "descripcion", sortable: false },
        { text: "Editar", value: "edit", sortable: false },
        { text: "Eliminar", value: "delete", sortable: false },
      ],

      //Lista de anuncios a ser inicializada
      anuncios: [],

      //Tipo de anuncio asociados a los anuncios en la lista. Se obitene del Vuex store (store.js)
      tipoAnuncio: {
        id: "",
        nombre: "",
      },

      //Variable para la búsqueda de anuncios por algún texto
      search: "",

      //Parámetro de la ruta
      nombreRutaTipoAnuncio: "",

      //Animaciones de cargando
      cargandoLista: false,
      cargandoEliminacion: false,
      cargandoEdicion: false,

      //--EDICIÓN--//

      editDialog: false, //Para abrir el formulario de edición
      edicionValida: false, //Define si los campos son válidos
      confirmEditionDialog: false, //Para abrir el diálogo de confirmar edición

      //Modelo usado para la edición de anuncio
      anuncio: {
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
        (v) => !!v || "La descripcion es requerida.",
        (v) =>
          (v && v.length <= 200) || "Debe contener menos de 200 caracteres.",
        (v) =>
          /^[^\s]+(\s+[^\s]+)*$/.test(v) ||
          "No deben haber espacios al inicio o al final.",
      ],

      //--ELIMINACIÓN--//

      confirmEliminationDialog: false, //Para abrir diálogo de confirmar eliminación
      id_delete: "", //ID del anuncio a eliminar

    };
  },
  created() {
    //Extracción del valor de una variable en Vuex store (Ubicación: store.js)
    this.tipoAnuncio.id = this.$store.state.tipoAnuncio.tipo_anuncio_id;
    this.tipoAnuncio.nombre = this.$store.state.tipoAnuncio.nombre_tipo_anuncio;
    this.nombreRutaTipoAnuncio = this.$route.params.tipoAnuncio;
    this.listar();
  },
  methods: {
    //Ir a pantalla de creación
    crearNuevo() {
      this.$router.push(
        "/tipo-anuncios/" + this.nombreRutaTipoAnuncio + "/nuevo"
      );
    },
    //Ir a pantalla de tipos de anuncio
    volverATiposDeAnuncio() {
      this.$router.push("/tipo-anuncios");
    },
    //LISTADO
    listar() {
      this.cargandoLista = true;
      axios
        .get(`anuncio/tipoid/${this.tipoAnuncio.id}`)
        .then((response) => {
          this.anuncios = response.data.sort((a, b) => {
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
      this.anuncio.id = item.id;
      this.anuncio.nombre = item.nombre;
      this.anuncio.descripcion = item.descripcion;
      this.editDialog = true;
    },
    cerrarDialogoEdicion() {
      this.editDialog = false;
    },
    abrirDialogoConfirmarEdicion() {
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
          .put(`anuncio/${this.anuncio.id}`, {
            nombre: this.anuncio.nombre,
            descripcion: this.anuncio.descripcion,
          })
          .then((response) => {
            this.editDialog = false;
            this.cargandoEdicion = false;
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
      this.cargandoEdicion = true;
      this.confirmEliminationDialog = false;
      axios
        .delete(`anuncio/${this.id_delete}`)
        .then((response) => {
          this.cargandoEdicion = false;
          this.listar();
          this.$alert("Eliminación exitosa", "Exitoso", "success");
        })
        .catch((error) => {
          console.log(error);
          console.log("CONCURRENTE");
        });
    },
  },
};
</script>

<style>
</style>