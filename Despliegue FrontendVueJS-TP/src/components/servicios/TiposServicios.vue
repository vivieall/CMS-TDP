<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Tipos de servicio</v-toolbar-title>

        <v-spacer></v-spacer>

        <!--Campo de búsqueda de tipos de servicio-->
        <v-text-field
          class="text-xs-center"
          v-model="search"
          append-icon="search"
          label="Búsqueda"
          single-line
          hide-details=""
        ></v-text-field>

        <v-spacer></v-spacer>

        <v-btn
          medium
          color="indigo white--text"
          elevation="2"
          @click="crearNuevo"
          >Agregar tipo de servicio</v-btn
        >
      </v-toolbar>

      <!--Tabla de lista de tipos de servicio-->
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :search="search"
        :items="tiposDeServicio"
        @click:row="verServicio"
        :loading="cargandoServicios || cargandoEliminacion"
        loading-text="Cargando servicios"
        no-data-text="No hay tipos de servicio"
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

      <!-- Formulario de edición de tipo de servicio en diálogo -->
      <v-dialog v-model="editDialog" max-width="700px">
        <v-card :loading="cargandoEdicion">
          <v-card-title>
            <span>Edición de servicio</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form v-model="edicionValida" ref="form">
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    v-model="tipoServicio.nombre"
                    label="Nombre"
                    :rules="reglaEditNombre"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-textarea
                    v-model="tipoServicio.descripcion"
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

      <!--Diálogo de confirmación - Edición de tipo de servicio-->
      <dialogo-edicion
        :dialog="confirmEditDialog"
        @close="confirmEditDialog = false"
        titulo="tipo de servicio"
        @editarValido="confirmarEdicion"
      >
      </dialogo-edicion>

      <!--Diálogo de confirmación - Eliminación de tipo de servicio-->
      <dialogo-eliminacion
        :dialog="deleteDialog"
        titulo="tipo de servicio"
        @close="deleteDialog = false"
        @borrarValido="confirmarEliminacion"
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
  name: "TiposServicios",
  components: {
    DialogoEdicion,
    DialogoEliminacion,
  },
  data() {
    return {
      //Cabeceras del data table
      headers: [
        { text: "Nombre", value: "nombre", sortable: false },
        { text: "Descripción", value: "descripcion", sortable: false },
        { text: "Editar", value: "edit", sortable: false },
        { text: "Eliminar", value: "delete", sortable: false },
      ],

     //Lista de tipos de servicio
      tiposDeServicio: [],

      //Animaciones de cargando
      cargandoServicios: false,
      cargandoEliminacion: false,
      cargandoEdicion: false,

      //Variable para búsqueda de tipos de servicio por texto
      search: "",

      //--EDICIÓN--//

      editDialog: false, //Abrir formulario de edición
      confirmEditDialog: false, //Abrir diálogo de confirmación
      edicionValida: false, //Define si los campos del formulario son válidos

      //Modelo de edición de tipo de servicio
      tipoServicio: {
        id: "",
        nombre: "",
        descripcion: "",
      },

      //Reglas de los campos de edición
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
      deleteDialog: false, //Abrir el diálogo de confirmación
      id_delete: "", //ID del tipo de servicio a eliminar
    };
  },
  created() {
    this.listar();
  },

  methods: {
    //Rutas
    crearNuevo() {
      this.$router.push("/servicios/nuevo");
    },

    verServicio(item) {
      var tipo = item.nombre.toLowerCase().replace(/ /g, "-");
      //Método para cambiar el valor de la variable tipo de servicio en Vuex store (Ubicación: store.js)
      this.$store.commit("changeValueOfServiceType", {
        tipo_servicio_id: item.id,
        nombre_tipo_servicio: item.nombre,
      });
      this.$router.push({ path: `/servicios/${tipo}` });
    },

    //LISTADO
    listar() {
      this.cargandoServicios = true;
      axios
        .get("tipo-servicio")
        .then((response) => {
          this.cargandoServicios = false;
          //Ordenar alfabéticamente
          this.tiposDeServicio = response.data.sort((a, b) => {
            return a.nombre
              .toLowerCase()
              .localeCompare(b.nombre.toLowerCase(), "es", {
                sensitivity: "base",
                numeric: true,
              });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //--EDICIÓN--//

    abrirDialogoEdicion(item) {
      this.tipoServicio.id = item.id;
      this.tipoServicio.nombre = item.nombre;
      this.tipoServicio.descripcion = item.descripcion;

      this.editDialog = true;
    },
    cerrarDialogoEdicion() {
      (this.tipoServicio.id = ""), (this.tipoServicio.nombre = "");
      this.tipoServicio.descripcion = "";

      this.editDialog = false;
    },
    abrirDialogoConfirmarEdicion() {
      this.$refs.form.validate();
      if (this.edicionValida) {
        this.confirmEditDialog = true;
      }
    },
    editar() {
      axios
        .put("tipo-servicio/" + this.tipoServicio.id, {
          nombre: this.tipoServicio.nombre,
          descripcion: this.tipoServicio.descripcion,
        })
        .then((response) => {
          this.confirmEditDialog = false;
          this.cargandoEdicion = false;
          this.cerrarDialogoEdicion();
          this.listar();
          this.$alert("Edición exitosa", "Exitoso", "success");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    confirmarEdicion() {
      if (this.edicionValida) {
        this.confirmEditDialog = false;
        this.cargandoEdicion = true;
        this.editar();
      }
    },

    //--ELIMINACIÓN--//
    abrirDialogoEliminacion(id) {
      this.deleteDialog = true;
      this.id_delete = id;
    },
    confirmarEliminacion() {
      this.cargandoEliminacion = true;
      this.eliminar();
    },
    eliminar() {
      this.deleteDialog = false;
      this.cargandoEliminacion = true;
      axios
        .delete("tipo-servicio/" + this.id_delete)
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