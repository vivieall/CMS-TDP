<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Contenido Personalizado</v-toolbar-title>

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

        <v-btn medium color="indigo white--text" @click="crearNuevo">Agregar Contenido</v-btn>

       
      </v-toolbar>

      <v-data-table class="elevation-1" :headers="headers" :items="tiposContenido_Personalizado"
      :search="search" :loading="cargandoContenido || cargandoEliminacion" :loading-text="textoCargando">

       <template v-slot:[`item.urlimagen`]="{ item }">
          <div class="p-2">
            <v-img
              :src="item.urlimagen"
              :alt="item.nombre"
              class="imagen"
              style="max-height: 600px;"
            ></v-img>
          </div>
        </template>
          
        <template v-slot:[`item.edit`]="{ item }">
          <v-btn icon @click.stop.prevent="abrirDialogoEdicion(item)">
            <v-icon>create</v-icon>
          </v-btn>
        </template>

        
      </v-data-table>

      <!-- Diálogo de edición -->
      <v-dialog v-model="editDialog" max-width="700px">
        <v-card>
          <v-card-title>
            <span>Edición de Contenido Personalizado</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form v-model="edicionValida" ref="form">
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    v-model="contenido.titulo"
                    label="Titulo"
                    :rules="reglaEditNombre"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm12 md12>
                  <v-textarea
                    v-model="contenido.descripcion"
                    label="Descripción"
                    :rules="reglaEditDescripcion"
                    auto-grow
                    row-height="10"
                    rows="1"

                  ></v-textarea>
                </v-flex>
                <!--Input de archivo - Subida de imagen de contenido genérico-->
                <v-flex xs12 sm12 md12>
                  <v-textarea
                    v-model="contenido.urlimagen"
                    label="URL Imagen"
                    :rules="reglaEditDescripcion"
                    auto-grow
                    row-height="10"
                    rows="1"

                  ></v-textarea>
                </v-flex>

                <v-flex>
                    <h3 class="texto-opcional">* La imagen es opcional. No se actualizará la imagen si no coloca ninguna.</h3>
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
        titulo="contenido"
        @editarValido="editarContenido">    
      </dialogo-edicion>

      <!--Diálogo de eliminación-->
      <dialogo-eliminacion
      :dialog="deleteDialog"
      titulo="contenido "
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
  name: "Contenidos_Personalizados",
  components:{
    DialogoEdicion,
    DialogoEliminacion,
  },
  data() {
    return {
      headers: [
        { text: "Nombre", value: "titulo"},
        { text: "Descripcion", value: "descripcion", sortable: false},
        { text: "Imagen", value: "urlimagen", sortable: false},
        { text: "Editar", value: "edit", sortable: false },
      ],
      tiposContenido_Personalizado: [],
      textoCargando: "Cargando contenidos personalizados",
      cargandoContenido: false,
      search:"",
      //EDICIÓN
      editDialog: false,
      confirmEditDialog: false,
      edicionValida: false,
      contenido: {
        id: "",
        titulo: "",
        descripcion: "",
        urlimagen: "",
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

      reglaEditImagen: [
        (v) => !v || v.size < 2000000 || "La imagen debe pesar menos de 2MB."
      ],
      //ELIMINACIÓN
      deleteDialog: false,
      id_delete: "",
      cargandoEliminacion: false,

      ////////////////////////////////
      contenidosPersonalizados: [
        {
          id: 2,
          nombre: "Contenido 2",
          descripcion: "Descripción 2",
          urlImagen:
            "https://img.blogs.es/anexom/wp-content/uploads/2016/08/hoteles-w.jpg",
        },
      ],
      /////////////////////////////////
    };
  },
  created(){
    this.listar();
  },
  methods:{
    //Rutas
    crearNuevo(){
      this.$router.push("/contenidos/personalizado/nuevo_contenido")
    },
   
    //LISTADO
    listar(){
     //COMENTANDO EL CARGANDO POR EL MOMENTO
      this.cargandoContenido = true;
      axios.get("/oferta")
      .then(response => {
          this.cargandoContenido = false;
          this.tiposContenido_Personalizado = response.data.sort((a, b) => {
              return a.titulo
                .toLowerCase()
                .localeCompare(b.titulo.toLowerCase(), "es", {
                  sensitivity: "base",
                  numeric: true,
                });
            });
      })
      .catch(error => {
      });
    },
    //EDICIÓN
    abrirDialogoEdicion(item) {
      this.contenido.id = item.id;
      this.contenido.titulo = item.titulo;
      this.contenido.descripcion = item.descripcion;
      this.contenido.urlimagen = item.urlimagen;
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

     editarContenido() {
      this.confirmEditDialog = false;
      let me = this;
      if (this.edicionValida && me.contenido.id != "") {
        this.cargandEdicion = true;
           this.editarSinImagen(me.contenido.id);
      }
    },

    editarSinImagen(id){
      let me = this;
       axios.put("oferta/" + id,
          {
            titulo: me.contenido.titulo,
            descripcion: me.contenido.descripcion,
            urlimagen: me.contenido.urlimagen
          })
          .then(response => {
            if(response){
              this.cargandEdicion = false;
              this.editDialog = false;
              this.listar();
              this.alerta_edicion();   
          }
          })
          .catch(error => {
            console.log(error);
          });
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
      axios.delete("/oferta/" + this.id_delete)
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

<style>
.imagen {
  width: 150px;
  height: 100px;
  margin: 4px;
}
.dialog-button {
  color: #444;
}
</style>