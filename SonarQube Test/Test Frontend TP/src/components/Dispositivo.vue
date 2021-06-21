<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Dispositivos</v-toolbar-title>
        <v-spacer></v-spacer>
              
    
    <v-spacer></v-spacer>
        <!--Campo de búsqueda de dispositivos-->
        <v-text-field
          class="text-xs-center"
          v-model="search"
          append-icon="search"
          label="Búsqueda"
          single-line
          hide-details
        ></v-text-field>

        <v-spacer></v-spacer>

        <v-btn medium color="indigo white--text" @click="verDetalle"
                    >Interacciones</v-btn>


 </v-toolbar>
    
<v-btn medium color="indigo white--text" @click="crearNuevo"
                    >Agregar dispositivo</v-btn>
    <!--Tabla de la lista de dispositivos
    @click:row="verDetalle" -->
    <v-data-table
    :headers="headers"
    :items="dispositivos"
    class="elevation-1"
    :search="search"
    :loading="cargandoContenidos" 
    :loading-text="textoCargando"
    
    no-data-text="No hay dispositivos"
    >


<!--Botones de edición y eliminación en cada fila-->
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

    <!-- Diálogo de edición -->
    <v-dialog v-model="editDialog" width="800px"  height="300px">
      <v-card :loading="cargandoEdicion">
        <v-card-title>
          <span>Edición de Dispositivo</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form v-model="edicionValida" ref="form">
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    v-model="dispositivo.nombre"
                    label="Nombre"
                    :rules="reglaEditNombre"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-textarea
                    v-model="dispositivo.descripcion"
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

<!-- Diálogos emergentes -->
    <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-grey lighten-4" 
              large @click.native="cerrarDialogoEdicion"
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

     <!--Diálogo de edición--> 
    <dialogo-edicion
      :dialog="confirmEditionDialog"
      @close="confirmEditionDialog = false"
      @editarValido="editar"
      titulo="detalle"
    >
    </dialogo-edicion>

  <!--Diálogo de eliminación-->
    <dialogo-eliminacion
      :dialog="confirmEliminationDialog"
      titulo="detalle"
      @close="confirmEliminationDialog = false"
      @borrarValido="eliminar"
    ></dialogo-eliminacion>

    </v-flex>
  </v-layout>
</template>
<script>

import DialogoEdicion from "./DialogosValidacion/DialogoEdicion.vue";
import DialogoEliminacion from "./DialogosValidacion/DialogoEliminacion.vue";
import axios from "axios";
export default {
    components: {
    DialogoEdicion,
    DialogoEliminacion,
  },
  data() {
    return {
    grupos_contenido: '',
      dispositivos: [],
      nombre: '',
      descripcion: '',
      grupos_contenido: [],
      //Variable para la búsqueda de servicios por texto
      search: "",
      dialog: false,
      //Cabeceras del data table
      headers: [
        //{text: 'ID',value: 'id',sortable:false},
        {text: 'Nombre',value: 'nombre',sortable:false},
        {text: 'Descripcion',value: 'descripcion',sortable:false},
        {text: 'Editar', value: 'edit', sortable:false},
        {text: 'Eliminar', value: 'delete', sortable:false}

      ],
      cargandoContenidos: true,
      textoCargando:"Cargando dispositivos",

      //Modelo usado para la edición de dispositivo
      dispositivo: {
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

      //CARGANDO
      cargandoLista: false,
      cargandoEdicion: false,
      cargandoEliminacion: false,

      //EDICIÓN
      editDialog: false,
      edicionValida: false,
      confirmEditionDialog: false,

      //ELIMINACIÓN
      confirmEliminationDialog: false,
      id_delete: "",
    };
  },
  computed: {},

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.listar();
  },

  methods: {
    //Ir a pantalla de creación
    crearNuevo() {
      this.$router.push(
        "/dispositivo_nuevo"
        );
    },
    //LISTADO
    listar() {
      let me = this;
      axios
      .get("/dispositivo")
      .then(function(response){
        console.log("entro al endpoint");
        me.dispositivos =response.data;
        me.cargandoContenidos = false;
        })
      .catch(function(error){
        console.log(error);});
    },
    verDetalle(item) {
      //var servicioRuta = item.nombre.toLowerCase().replace(/ /g,"-");
      //Método para cambiar el valor de la variable servicio en Vuex store (Ubicación: store.js)
      //this.$store.commit('changeValueOfService', { dispositivo_id: item.id, nombre_dispositivo: item.nombre });
      this.$router.push("/DispositivoInteraccion");
    },

//EDICIÓN
    abrirDialogoEdicion(item) {
      this.dispositivo.id = item.id;
      this.dispositivo.nombre = item.nombre,
      this.dispositivo.descripcion = item.descripcion,
      console.log("ID de detalle a editar: " + this.id);
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
          .put(`/dispositivo/` + this.dispositivo.id, {
            nombre: this.dispositivo.nombre,
            descripcion: this.dispositivo.descripcion, 
          })
          .then((response) => {
            this.cargandoEdicion = false;
            this.editDialog = false;
            this.listar()
            console.log("EDITADO");
            this.$alert("Edición exitosa", "Exitoso","success");
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
      console.log("ENTROO");
      this.confirmEliminationDialog = false;
      this.cargandoEliminacion = true;
      axios
        .delete("/dispositivo/" + this.id_delete)
        .then((response) => {
          this.cargandoEliminacion = false;
          this.listar();
          this.$alert("", "Eliminacion Exitosa","success").then(() => console.log("Closed"));
        })
        .catch(function (error) {});
    },

  },
};
</script>
<style>
  @import '../assets/app.css';
</style>
