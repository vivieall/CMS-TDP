<template>
  <v-flex>
    <!--Botón para volver a la lista de servicios-->
    <v-btn @click="volverAlServicio" style="margin: 6px 0px">
      <v-icon>reply</v-icon>
    </v-btn>
    <v-toolbar flat>
      <v-toolbar-title>Detalles de {{ servicioActual.nombre }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-text-field
        class="text-xs-center"
        v-model="search"
        append-icon="search"
        label="Búsqueda"
        single-line
        hide-details=""
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn medium color="indigo white--text" elevation="2" @click="crearNuevo"
        >Agregar detalle</v-btn
      >
    </v-toolbar>
    <!--Lista de datos de detalle de servicio-->
    <v-data-table
      class="elevation-1"
      :headers="headers"
      :items="detalles"
      :search="search"
      :loading="cargandoLista || cargandoEliminacion"
      loading-text="Cargando detalles"
      no-data-text="No hay detalles"
    >
      <template v-slot:[`item.edit`]="{ item }">
        <v-btn icon @click="abrirDialogoEdicion(item)">
          <v-icon>create</v-icon>
        </v-btn>
      </template>

      <template v-slot:[`item.delete`]="{ item }">
        <v-btn icon @click="abrirDialogoEliminacion(item.id)">
          <v-icon>delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <!-- Formulario de edición de detalle de servicio -->
    <v-dialog v-model="editDialog" max-width="700px">
      <v-card :loading="cargandoEdicion">
        <v-card-title>
          <span>Edición de contenido</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form v-model="edicionValida" ref="form">
              <v-flex xs12 sm12 md12>
                <v-text-field
                  v-model="detalle.nombre"
                  label="Nombre"
                  :rules="reglaEditNombre"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-textarea
                  v-model="detalle.descripcion"
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
     <!--Diálogo de confirmación - Edición de detalle de servicio-->
    <dialogo-edicion
      :dialog="confirmEditionDialog"
      @close="confirmEditionDialog = false"
      @editarValido="editar"
      titulo="detalle"
    >
    </dialogo-edicion>

    <!--Diálogo de confirmación - Eliminación de detalle de servicio-->
    <dialogo-eliminacion
      :dialog="confirmEliminationDialog"
      titulo="detalle"
      @close="confirmEliminationDialog = false"
      @borrarValido="eliminar"
    ></dialogo-eliminacion>
  </v-flex>
</template>

<script>
import DialogoEdicion from "../DialogosValidacion/DialogoEdicion.vue";
import DialogoEliminacion from "../DialogosValidacion/DialogoEliminacion.vue";
import axios from "axios";
export default {
  name: "DetalleServicio",
  components: {
    DialogoEdicion,
    DialogoEliminacion,
  },
  data() {
    return {
      idservicio: "",
      search: "",
      headers: [
        { text: "Nombre", value: "nombre", sortable: false },
        { text: "Descripción", value: "descripcion", sortable: false },
        { text: "Editar", value: "edit", sortable: false },
        { text: "Eliminar", value: "delete", sortable: false },
      ],

      //Modelo de edición de detalle
      detalle: {
        id: "",
        nombre: "",
        descripcion: "",
      },
      //Lista de detalles
      detalles: [],

      //Servicio asociado a los detalles
      servicioActual: {
        id: "",
        nombre: "",
      },
      //Parámetros de la ruta de la vista
      tipoServicio: "",
      nombreServicioRuta: "",

      //Animaciones de cargando
      cargandoLista: false,
      cargandoEdicion: false,
      cargandoEliminacion: false,

      //--EDICIÓN--//
      editDialog: false, //Abre el formulario de edición
      edicionValida: false, //Define si el form tiene los campos válidos
      confirmEditionDialog: false, //Abre el diálogo de confirmación

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
      confirmEliminationDialog: false,//Abre el diálogo de confirmación
      id_delete: "",//Id del detalle de servicio a eliminar
    };
  },
  created() {
    //Extracción del valor de una variable en Vuex store (Ubicación: store.js)
    this.servicioActual.id = this.$store.state.servicio.servicio_id;
    this.servicioActual.nombre = this.$store.state.servicio.nombre_servicio;
    this.tipoServicio = this.$route.params.tipoServicio;
    this.nombreServicioRuta = this.$route.params.servicio;
    this.listar();
  },
  methods: {
    volverAlServicio() {
      this.$router.push("/servicios/" + this.tipoServicio);
    },
    //INSERCIÓN
    crearNuevo() {
      console.log(
        `/servicios/${this.tipoServicio}/${this.nombreServicioRuta}/nuevo`
      );
      this.$router.push(
        `/servicios/${this.tipoServicio}/${this.nombreServicioRuta}/nuevo`
      );
    },
    //LISTADO
    listar() {
      this.cargandoLista = true;
      axios
        .get(`/detalle-servicio/idservicio/${this.servicioActual.id}`)
        .then((response) => {
          this.detalles = response.data.sort((a, b) => {
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
      this.detalle.id = item.id;
      this.detalle.nombre = item.nombre;
      this.detalle.descripcion = item.descripcion;
      this.detalle.precio = item.precio;
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
      if (this.edicionValida) {
        this.cargandoEdicion = true;
        this.confirmEditionDialog = false;
        axios
          .put(`/detalle-servicio/${this.detalle.id}`, {
            nombre: this.detalle.nombre,
            descripcion: this.detalle.descripcion,
            servicio: {
              id: this.servicioActual.id,
            },
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
      console.log("ID de detalle a eliminar: " + this.id_delete);
      this.confirmEliminationDialog = true;
    },
    eliminar() {
      this.confirmEliminationDialog = false;
      this.cargandoEliminacion = true;
      axios
        .delete(`/detalle-servicio/${this.id_delete}`)
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