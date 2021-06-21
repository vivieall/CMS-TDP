<template>
  <v-layout align-start>
    <v-flex>
        <v-btn @click="volverTipo_Configuracion"
            style="margin: 6px 0px;">
          <v-icon>reply</v-icon>
        </v-btn>
      <v-toolbar flat color="white">
        
        <v-toolbar-title>{{ titulo }}</v-toolbar-title>

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

        <v-btn medium color="indigo white--text" @click="crearNuevo">Agregar {{ textoBoton }}</v-btn>
      </v-toolbar>

      <v-data-table
        class="elevation-1"
        :headers="headers"
        :search="search"
        :items="configuraciones"
        @click:row="verDetalle"
        :loading="cargandoConfiguraciones || cargandoEliminacion" :loading-text="textoCargando"
      >
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

         <!-- Diálogo de edición -->
      <v-dialog v-model="editDialog" max-width="700px">
        <v-card>
          <v-card-title>
            <span>Edición de {{textoBoton}}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form v-model="edicionValida" ref="form">
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    v-model="configuracion.nombre"
                    label="Nombre"
                    :rules="reglaEditNombre"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    v-model="configuracion.descripcion"
                    label="Descripcion"
                    :rules="reglaEditDescripcion"
                  ></v-text-field>
                </v-flex>
              </v-form>
            </v-container>
          </v-card-text>


          

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="dialog-button"
              color="blue-grey lighten-4" 
              @click.native="cerrarDialogoEdicion"
              >Cancelar</v-btn
            >
            <v-btn
              class="dialog-button"
              color="blue-grey lighten-4" 
              @click.native="abrirDialogoConfirmarEdicion"
              >Guardar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!--Diálogo de edición-->
      <dialogo-edicion
        :dialog="confirmEditDialog"
        @close="confirmEditDialog = false"
        @editarValido="confirmarEdicion"
        :titulo="textoBoton">    
      </dialogo-edicion>

      <!--Diálogo de eliminación-->
      <dialogo-eliminacion
      :dialog="deleteDialog"
      :titulo="textoBoton"
      @close="deleteDialog = false"
      @borrarValido="confirmarEliminacion">
      </dialogo-eliminacion>

    </v-flex>
  </v-layout>
</template>

<script>
import DialogoEdicion from '../../components/DialogosValidacion/DialogoEdicion.vue';
import DialogoEliminacion from "../../components/DialogosValidacion/DialogoEliminacion.vue";
import axios from 'axios';
export default {
  name: "Configuracion",
  components: {
    DialogoEliminacion,
    DialogoEdicion,
  },
  data() {
    return {
      titulo: "",
      tituloEdicion: "",
      textoBoton: "",
      search:"",
      idtipo_configuracion: "",
      cadena: "",
      headers: [
        { text: "Nombre", value: "nombre", sortable: false },
        { text: "Descripcion", value: "descripcion", sortable: false },
        { text: "Editar", value: "edit" },
        { text: "Eliminar", value: "delete" },
      ],
      configuraciones: [],
      configuracion: {
        id: "",
        nombre: "",
        descripcion: "",
        clima: "",
      },
      //EDICIÓN
      editDialog: false,
      edicionValida: false,
      confirmEditDialog: false,
      cargandoConfiguraciones:false,
      cargandoEliminacion: false,
      textoCargando:"Cargando configuraciones",
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
      //ELIMINACIÓN
      deleteDialog: false
    };
  },
  created() {
    var aux = this.$route.params.tipoConfiguracion;
    this.cadena = aux;
    this.titulo = aux.charAt(0).toUpperCase() + aux.slice(1);
    if (aux.charAt(aux.length - 1).toUpperCase() == "S") {
         this.textoBoton = aux.slice(0, -1);
    } else {
      this.textoBoton = aux;
    }
    this.idtipo_configuracion = this.$store.state.tipo_configuracion_id;
    this.listar();
  },
  methods: {
    crearNuevo() {
     this.$router.push("/configuraciones/" + this.cadena + "/nuevo");
    },
    verDetalle(item) {
    //  this.$router.push(
       // "/configuraciones/" + this.cadena + "/" + item.idservicio + "/detalle"
     // );
    },
    volverTipo_Configuracion() {
      this.$router.push("/configuraciones");
    },
    //LISTADO
    listar(){
      this.cargandoConfiguraciones = true;
      axios.get("/configuracion/tipoconfiguracion/" + this.idtipo_configuracion)
      .then(response => {
          this.cargandoConfiguraciones = false;
          this.configuraciones = response.data;
      })
      .catch(error => {
      })
    },
    //EDICIÓN
    abrirDialogoEdicion(item){
        this.configuracion.id = item.id;
        this.configuracion.nombre = item.nombre;
        this.configuracion.descripcion = item.descripcion;
        this.editDialog = true;
    },
    cerrarDialogoEdicion(){
        this.editDialog = false;
    },
    abrirDialogoConfirmarEdicion(){
        this.$refs.form.validate();
        if(this.edicionValida){
          this.confirmEditDialog = true;
        }
        
    },
    editar(){
      this.confirmEditDialog = false;
      axios.put("/configuracion/" + this.configuracion.id,{
        nombre: this.configuracion.nombre,
        descripcion: this.configuracion.descripcion,
      })
      .then(response => {
          this.editDialog = false;
          this.listar();
          this.alerta_edicion();
        
      })
    },
    confirmarEdicion(){
        if(this.edicionValida){
          this.editar();
        }
    },
    //ELIMINACIÓN
    abrirDialogoEliminacion(id){
      this.configuracion.id = id;
      this.deleteDialog = true;
    },
    eliminar(){
      this.cargandoEliminacion = true;
      axios.delete("configuracion/" + this.configuracion.id)
      .then(response => {
        this.cargandoEliminacion = false;
          this.deleteDialog = false;
          this.listar();
          this.alerta_eliminacion();
        
      })
    },
    alerta_edicion(){
        this.$alert("", "Edicion Exitosa","success").then(() => console.log("Closed"));
    },
    alerta_eliminacion(){
        this.$alert("", "Eliminacion Exitosa","success").then(() => console.log("Closed"));
    },
    confirmarEliminacion(){
      this.eliminar()
    }
  },
};
</script>