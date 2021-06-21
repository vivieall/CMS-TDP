<template>
  <v-layout align-start>
    <v-flex>
        
      <v-toolbar flat color="white">
         <v-btn text
         @click="retornar" >
           <v-icon>reply</v-icon>  Regresar a grupos
      </v-btn>
        <v-spacer></v-spacer>
        <v-text-field
          class="text-xs-center"
          v-model="search"
          append-icon="search"
          label="Búsqueda"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
         <v-btn 
         medium color="indigo white--text"
         @click="open_edit" >
            Editar Grupo
      </v-btn>


        <v-dialog v-model="dialog" max-width="500px">
         <v-card 
         class="mx-auto">
            <v-form v-model="valid_form_grupo">
            <v-card-title>
              <span class="headline">Editar Grupo</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="grupo_contenido_selected.nombre" label="Nombre" :rules="nameRules"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="grupo_contenido_selected.descripcion" label="Descripcion" :rules="descripcionRules"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

             <v-card-actions>
              <v-spacer></v-spacer>
               <v-btn  
          @click.native="close" color="blue-grey lighten-4" >
            Cancelar
      </v-btn>
      <v-btn 
          @click.native="abrirDialogoConfirmarEdicion" color="blue-grey lighten-4" >
            Guardar
      </v-btn>
            </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialog_contenido" max-width="500px">
         <v-card>
            <v-card-title>
              <span class="headline">Editar Contenido</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="nombre_contenido" label="Nombre"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="descripcion_contenido" label="Descripcion"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="url_imagen" label="URL Imagen"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

             <v-card-actions>
              <v-spacer></v-spacer>
               <v-btn 
          @click.native="close_contenido" color="blue-grey lighten-4" >
            Cancelar
      </v-btn>
      <v-btn 
          @click.native="guardar_contenido" color="blue-grey lighten-4" >
            Guardar
      </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>


      <v-card-title>
              <span class="headline">{{ nombre_grupo }}</span>
      </v-card-title>

      <v-btn 
         @click="open_nuevo" >
            Agregar Contenido
      </v-btn>

      <dialogo-edicion
        :dialog="validDialogEdition"
        @close="validDialogEdition = false"
        @editarValido="guardar_edit_grupo"
        titulo="grupo"
        >
      </dialogo-edicion>

      <dialogo-eliminacion
      :dialog="deleteDialog"
      :titulo="titulo_eliminacion"
      @close="deleteDialog = false"
      @borrarValido="borrarContenido">
      </dialogo-eliminacion>

      <v-data-table
    :headers="headers"
    :items="contenido"
    class="elevation-1"
    :search="search"
    :loading="cargandoContenidos || cargandoEliminacion" 
        :loading-text="textoCargando"
  >

        <template v-slot:[`item.contenido.url_imagen`]="{ item }">
          <div class="p-2">
            <v-img
              :src="item.contenido.url_imagen"
              :alt="item.nombre"
              class="imagen"
            ></v-img>
          </div>
        </template>

    
       

        <template v-slot:[`item.delete`]="{ item }">
            <v-btn icon  @click="abrirDialogoEliminacion(item.id)">
                <v-icon>delete</v-icon>
                </v-btn>
        </template>

  </v-data-table>
    

    </v-flex>
  </v-layout>
</template>
<script>
import axios from "axios";
import DialogoEliminacion from "../DialogosValidacion/DialogoEliminacion.vue";
import DialogoEdicion from "../../components/DialogosValidacion/DialogoEdicion";
export default {
    components: {
    DialogoEdicion,
    DialogoEliminacion
  },
  data() {
    return {
      contenido: [],
      grupo_contenido_selected:{},
      dialog: false,
      idgrupo_contenido: "",
      valid_form_grupo:true,
      dialog_contenido: false,
      deleteDialog: false,
      validDialogEdition: false,
      cargandoContenidos:true,
      textoCargando:"Cargando contenidos",
      cargandoEliminacion: false,
      titulo_eliminacion: "contenido del grupo",
      nameRules: [
        (v) => !!v || "El nombre es requerido",
          (v) => (v && v.length <= 50) || "Debe contener menos de 50 caracteres",
          (v) => /^[^\s]+(\s+[^\s]+)*$/.test(v) || "No deben haber espacios al inicio o al final",
      ],
      descripcionRules: [
        (v) => !!v || "La descripción es requerida",
          (v) => (v && v.length <= 200 && v.length > 1) || "Debe contener menos de 200 caracteres",
          (v) => /^[^\s]+(\s+[^\s]+)*$/.test(v) || "No deben haber espacios al inicio o al final",
      ],
      headers: [
        {text: 'Nombre',value: 'contenido.nombre',sortable:false},
        {text: 'Descripcion',value: 'contenido.descripcion',sortable:false},
        { text: "Imagen", value: "contenido.url_imagen", sortable: false },
        //{text: 'Editar', value: 'edit', sortable:false},
        {text: 'Eliminar', value: 'delete', sortable:false}
      ],
      search: "",
      titulo_grupo: "",
      nombre: '',
      descripcion:"",
      nombre_contenido:"",
      descripcion_contenido:"",
      url_imagen:"",
      nombre_grupo:"",
      id_delete: "",
      
    };
  },
  computed: {
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialog_contenido(val) {
      val || this.close();
    }
  },
  created() {
    this.idgrupo_contenido = this.$store.state.grupo_id;
    this.listar();
    this.listar_grupo();
  },
  methods: {
    listar() {
      let me=this;
      axios
      .get("/asignacion-contenido/idgrupo/"+ me.idgrupo_contenido)
      .then(function(response){
        me.contenido=response.data;
        me.cargandoContenidos = false;
        })
      .catch(function(error){console.log(error);});
    },
    listar_grupo(){
      let me=this;
      axios
      .get("/grupo-contenido/"+ me.idgrupo_contenido)
      .then(function(response){
        me.grupo_contenido_selected=response.data;
        me.nombre_grupo = me.grupo_contenido_selected.nombre;
        })
      .catch(function(error){console.log(error);});
    },
    abrirDialogoConfirmarEdicion(){
      if(this.valid_form_grupo){
          this.validDialogEdition = true;
      }
    },
     abrirDialogoEliminacion(id) {
      this.id_delete = id;
      this.deleteDialog = true;
    },
    guardar_edit_grupo() {
      
      if(this.valid_form_grupo){
          let me =this;
          axios
          .put("/grupo-contenido/"+me.grupo_contenido_selected.id,{
            nombre:me.grupo_contenido_selected.nombre,
            descripcion:me.grupo_contenido_selected.descripcion
         })
         .then(function(response){
            me.validDialogEdition = false;
            me.close();
            me.alerta_edicion();
         })
         .catch(function(error){
             console.log(error);
         });
          
      }
    },
    open_nuevo(){
        this.$router.push( '/contenido/'+ this.idgrupo_contenido );
    },
    close() {
      this.listar_grupo();
      this.dialog = false;
    },
    close_contenido(){
      this.dialog_contenido =false;
    },
    open_edit(){
        this.dialog = true;
    },
     open_edit_contenido(){
        this.dialog_contenido = true;
    },
    alerta_edicion(){
        this.$alert("", "Edicion Exitosa","success").then(() => console.log("Closed"));
    },
    alerta_eliminacion(){
        this.$alert("", "Eliminacion Exitosa","success").then(() => console.log("Closed"));
    },
    retornar(){
        this.$router.push( '/grupos_contenido' );
    },
     borrarContenido() {
       this.cargandoEliminacion = true;
      this.deleteDialog = false;
      axios
        .delete("asignacion-contenido/" + this.id_delete)
        .then((response) => {
          this.id_delete = "";
          this.alerta_eliminacion();
          this.listar();
          this.cargandoEliminacion = false;

        })
        .catch((error) => {
          console.log(error);
        });
    },
  }
};
</script>
<style>
  @import '../../assets/app.css';
</style>