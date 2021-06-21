<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
         <v-toolbar-title>Asignaciones </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px"></v-dialog>
    
      
      
      <v-spacer></v-spacer>

      <v-toolbar-title>{{ titulo }}</v-toolbar-title>
        <!--Campo de búsqueda de asignaciones-->
      <v-text-field
          class="text-xs-center"
          v-model="search"
          append-icon="search"
          label="Búsqueda"
          single-line
          hide-details
      ></v-text-field>  
      <v-spacer></v-spacer>


      <v-btn @click="open_nuevo" > Crear nueva asignacion
      </v-btn>   
   </v-toolbar>

  <!--Tabla de la lista de asignaciones-->
  <v-data-table
    :headers="headers"
    :items="asignaciones"
    class="elevation-1"
    :search="search"
    :loading="cargandoContenidos || cargandoEliminacion" 
    :loading-text="textoCargando"
  >

  <!--Botones de edición y eliminación en cada fila-->
      <template v-slot:[`item.edit`]="{ item }">
         <v-btn icon @click="abrirDialogoEdicion(item)">
              <v-icon>create</v-icon>
          </v-btn>
      </template>


      <template v-slot:[`item.delete`]="{ item }">
        <v-btn icon @click="abrirDialogoEliminacion(item)">
          <v-icon>delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

<!-- Diálogo de edición -->
    <v-dialog v-model="editDialog" width="800px"  height="300px">
      <v-card :loading="cargandoEdicion">
        <v-card-title>
          <span>Edición de la asignación (Inicio-Fin) </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form v-model="edicionValida" ref="form">

          <v-row justify="space-around">
            <v-time-picker
              v-model="iniciotiempo"
              color="black_color"
              header-color="primary"
              required
            ></v-time-picker>
            <v-time-picker
              v-model="fintiempo"
              color="black_color"
              required        
            ></v-time-picker>
          </v-row>

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
      titulo="asignación"
    >
    </dialogo-edicion>

  <!--Diálogo de eliminación-->
    <dialogo-eliminacion
      :dialog="confirmEliminationDialog"
      titulo="asignación"
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
      titulo: "",
      asignaciones: [],
      asignacion_det: [],
      dialog: false,
      headers: [
        /////{text: 'ID',value: 'idasignacion',sortable:false},
        {text: "Nombre Dispositivo", value: "asignacion.dispositivo.nombre", sortable: false },
        {text: 'Horario de inicio',value: 'asignacion.iniciotiempo',sortable:false},
        {text: "Horario de fin", value: "asignacion.fintiempo", sortable: false },
        {text: "Asignacion", value: "contenido.nombre", sortable: false },
        {text: "Grupo", value: "grupocontenido.nombre", sortable: false },
        {text: 'Editar', value: 'edit', sortable:false},
        {text: 'Eliminar', value: 'delete', sortable:false}
      ],
      iniciotiempo: '',
      fintiempo: '',
      search: "",
      grupos_contenido: [],
      selected_Grupo: { idgrupo: 0 },
      cargandoContenidos: true,
      textoCargando:"Cargando asignaciones",

      //Cargando
      cargandoLista: false,
      cargandoEdicion: false,
      cargandoEliminacion: false,

      //EDICIÓN
      //id_edit: "",
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
    //this.asignaciones.id = this.$store.state.asignaciones.asignaciones_id;
    //this.grupo_contenido = this.$store.state.asignaciones.grupo_contenido;
    this.listar_asignacion();
  },

  methods: {
    listar() {
      let me = this;
      axios
      .get("/asignacion-contenido")
      .then(function(response){
        me.asignaciones = response.data;
        me.filtrar_asignaciones();
        me.cargandoContenidos = false;
        })
      .catch(function(error){
        console.log(error);});
    },

    listar_asignacion() {
      let me = this;
      axios
      .get("/asignacion")
      .then(function(response){
         me.asignacion_det = response.data;
         me.listar();
        })
      .catch(function(error){
        console.log(error);});
    },

    open_nuevo(){
        this.$router.push( '/asignacion_nuevo' );
    },

//EDICIÓN
    abrirDialogoEdicion(item) {
      this.id = item.asignacion.id;
      this.iniciotiempo = item.asignacion.iniciotiempo,
      this.fintiempo = item.asignacion.fintiempo,
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
          .put(`/asignacion/` + this.id, {
            iniciotiempo: this.iniciotiempo,
            fintiempo: this.fintiempo, 
          })
          .then((response) => {
            this.cargandoEdicion = false;
            this.editDialog = false;
            this.listar_asignacion()
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
      this.id_delete = id.asignacion.id;
      console.log("ID de detalle a eliminar: " + this.id_delete);
      this.confirmEliminationDialog = true;
    },
    eliminar() {
      console.log("ENTROO");
      this.confirmEliminationDialog = false;
      this.cargandoEliminacion = true;
      axios
        .delete("/asignacion/" + this.id_delete)
        .then((response) => {
          this.cargandoEliminacion = false;
          this.listar_asignacion();
          this.$alert("", "Eliminacion Exitosa","success").then(() => console.log("Closed"));
        })
        .catch(function (error) {});
    },

    
    filtrar_asignaciones(){
        this.asignaciones = this.asignaciones.filter(e=> e.asignacion!== null);
        console.log("asignciones filtrado")
        console.log(this.asignaciones);
        this.agregar_asignacion();
    },
    agregar_asignacion(){
        for(var index in this.asignaciones){
          this.asignaciones[index].asignacion =  this.find_asignacion(index);
        }
    },

    find_asignacion(index){
      var result = this.asignacion_det.find(obj => {
              return obj.id == this.asignaciones[index].asignacion.id;
            });
      return result;
    }
  },
};
</script>
<style>
  @import '../assets/app.css';
</style>
