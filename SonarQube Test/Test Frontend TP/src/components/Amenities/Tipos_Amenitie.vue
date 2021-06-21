<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Amenities</v-toolbar-title>

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

        <v-btn medium color="indigo white--text" @click="crearNuevo">Agregar Amenitie</v-btn>

       
      </v-toolbar>

      <v-data-table class="elevation-1" :headers="headers" :items="tiposAmenitie"
      :search="search"
       @click:row="amenitie_Info" :loading="cargandoAmenities || cargandoEliminacion" :loading-text="textoCargando">
          
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
            <span>Edición de amenitie</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form v-model="edicionValida" ref="form">
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    v-model="tipoAmenitie.nombre"
                    label="Nombre"
                    :rules="reglaEditNombre"
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
        titulo="amenitie"
        @editarValido="confirmarEdicion">    
      </dialogo-edicion>

      <!--Diálogo de eliminación-->
      <dialogo-eliminacion
      :dialog="deleteDialog"
      titulo="amenitie"
      @close="deleteDialog = false"
      @borrarValido="confirmarEliminacion">
      </dialogo-eliminacion>

      
    </v-flex>
  </v-layout>
</template>

<script>
import DialogoEdicion from '../../components/DialogosValidacion/DialogoEdicion.vue';
import DialogoEliminacion from '../../components/DialogosValidacion/DialogoEliminacion.vue';
import axios from 'axios';
export default {
  name: "TiposAmenities",
  components:{
    DialogoEdicion,
    DialogoEliminacion,
  },
  data() {
    return {
      headers: [
        { text: "Nombre", value: "nombre", sortable: false },
        { text: "Editar", value: "edit"},
        { text: "Eliminar", value: "delete"},
      ],
      tiposAmenitie: [],
      textoCargando: "Cargando tipo de amenities",
      cargandoAmenities: false,
      search:"",
      //EDICIÓN
      editDialog: false,
      confirmEditDialog: false,
      edicionValida: false,
      tipoAmenitie: {
        id: "",
        nombre: ""
      },
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
      deleteDialog: false,
      id_delete: "",
      cargandoEliminacion: false,
     
    };
  },
  created(){
    this.listar();
  },
  methods:{
    //Rutas
    crearNuevo(){
      this.$router.push("/amenities/nuevo")
    },
    amenitie_Info(item){
      var tipo = item.nombre.toLowerCase();
      this.$store.commit('changeValueOfID_Tipo_Amenitie',item.id);
      this.$router.push("/amenities/" + tipo);
    },
    //LISTADO
    listar(){
     //COMENTANDO EL CARGANDO POR EL MOMENTO
      this.cargandoAmenities = true;
      axios.get("/tipo-amenitie")
      .then(response => {
          this.cargandoAmenities = false;
          this.tiposAmenitie = response.data.sort((a, b) => {
              return a.nombre
                .toLowerCase()
                .localeCompare(b.nombre.toLowerCase(), "es", {
                  sensitivity: "base",
                  numeric: true,
                });
            });
      })
      .catch(error => {
      });
    },
    //EDICIÓN
    abrirDialogoEdicion(item){
       this.tipoAmenitie.id = item.id;
       this.tipoAmenitie.nombre = item.nombre;
       this.editDialog = true;
    },
    cerrarDialogoEdicion(){
       this.tipoAmenitie.id = "",
       this.tipoAmenitie.nombre = "";
       this.editDialog = false;
    },
    abrirDialogoConfirmarEdicion(){
       this.$refs.form.validate();
       if(this.edicionValida){
          this.confirmEditDialog = true;
       }
      
    },
    editar(){
      
      axios.put("/tipo-amenitie/" + this.tipoAmenitie.id, 
      {
        nombre: this.tipoAmenitie.nombre
      })
      .then(response => {
              this.confirmEditDialog = false;
              this.cerrarDialogoEdicion();
              this.listar();
              this.alerta_edicion();
      })
      .catch(error =>{
      })
      
    },
    confirmarEdicion(){
     
      if(this.edicionValida){
          this.editar();
      
      }
      
    },
    //ELIMINACIÓN
    abrirDialogoEliminacion(id){
        this.deleteDialog = true;
        this.id_delete = id;
    },
    confirmarEliminacion(){
      this.cargandoEliminacion = true;
      this.eliminar();
    },
    eliminar(){
      this.deleteDialog = false;
      this.cargandoEliminacion = true;
      axios.delete("/tipo-amenitie/" + this.id_delete)
      .then(response =>{
          this.cargandoEliminacion = false;
          this.listar(); 
          this.alerta_eliminacion();
      })
      .catch(error => {
      })
    },
    alerta_edicion(){
        this.$alert("", "Edicion Exitosa","success").then(() => console.log("Closed"));
    },
    alerta_eliminacion(){
        this.$alert("", "Eliminacion Exitosa","success").then(() => console.log("Closed"));
    },
  }
};
</script>

