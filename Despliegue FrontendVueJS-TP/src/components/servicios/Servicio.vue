<template>
  <v-layout align-start>
    <v-flex>
      <!--Botón de retorno a tipos de servicio-->
      <v-btn @click="volverATiposServicio" style="margin: 6px 0px">
        <v-icon>reply</v-icon>
      </v-btn>
      <v-toolbar flat color="white">
        <v-toolbar-title>{{ nombreTipoServicio }}</v-toolbar-title>
        
        <v-spacer></v-spacer>

        <!--Campo de búsqueda de servicios-->
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
          >Agregar servicio</v-btn
        >
      </v-toolbar>

      <!--Tabla de la lista de servicios-->
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="servicios"
        @click:row="verDetalle"
        :search="search"
        :loading="cargandoLista || cargandoEliminacion"
        :loading-text="textoCargandoLista"
        no-data-text="No hay servicios"
      >


       <template v-slot:[`item.url_imagen`]="{ item }">
          <div class="p-2">
            <v-img
              :src="item.url_imagen"
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

        <!--Botones de edición y eliminación en cada fila-->
        <template v-slot:[`item.delete`]="{ item }">
          <v-btn
            icon
            @click.stop.prevent="abrirDialogoEliminacion(item.id)"
          >
            <v-icon>delete</v-icon>
          </v-btn>
        </template>

        <template v-slot:[`item.reserva`]="{ item }">
            <v-btn elevation="2" color="blue-grey lighten-4" 
            medium @click.stop.prevent="verReservasDelServicio(item)">VER RESERVAS</v-btn>
        </template>
      </v-data-table>

      <!-- Formulario de edición de servicio en diálogo -->
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
                    v-model="servicio.nombre"
                    label="Nombre"
                    :rules="reglaEditNombre"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-textarea
                    v-model="servicio.descripcion"
                    label="Descripción"
                    :rules="reglaEditDescripcion"
                    rows="1"
                    auto-grow
                    row-height="12"
                  ></v-textarea>
                </v-flex>

                <v-flex xs12 sm12 md12>
                  <v-file-input
                    accept="image/*"
                    label="Imagen *"
                    prepend-icon="perm_media"
                    v-model="servicio.file"
                    :rules="reglaEditImagen"
                  >
                  </v-file-input>
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

      <!--Diálogo de confirmación - Edición de servicio-->
      <dialogo-edicion
        :dialog="confirmEditDialog"
        @close="confirmEditDialog = false"
        @editarValido="editarContenido"
        titulo="servicio"
      >
      </dialogo-edicion>

      <!--Diálogo de confirmación - Eliminación de servicio-->
      <dialogo-eliminacion
        :dialog="deleteDialog"
        titulo="servicio"
        @close="deleteDialog = false"
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
  name: "Servicio",
  components: {
    DialogoEliminacion,
    DialogoEdicion,
  },
  data() {
    return {
     
      //Variable para la búsqueda de servicios por texto
      search:"",

      //Animaciones de cargando
      cargandoLista: false,
      cargandoEdicion: false,
      cargandoEliminacion: false,
      textoCargandoLista: "Cargando servicios",

      //Cabeceras del data table
      headers: [
        { text: "Nombre", value: "nombre", sortable: false },
        { text: "Descripcion", value: "descripcion", sortable: false  },
        { text: "Imagen", value: "url_imagen", sortable: false},
        { text: "Editar", value: "edit", sortable: false  },
        { text: "Eliminar", value: "delete", sortable: false  },
        { text: "Reservas", value: "reserva", sortable: false, align: "center" },
      ],

      servicios: [ ],

      //Objeto servicio que permite la edición. Obtiene los campos actuales del servicio seleccionado
      //Se modifican al cambiar su valor en el formulario
      servicio: {
        id: "",
        nombre: "",
        descripcion: "",
        file: null,
      },

      //Parámetro en la ruta de la página
      tipoServicioDeRuta: "",

      //Variables extraídas de Vuex Store (store.js)
      tipoServicioId: "", //ID del tipo de servicio actual
      nombreTipoServicio: "", //Nombre del tipo de servicio actual

      //--EDICIÓN--//

      editDialog: false, //Activador del diálogo de edición
      edicionValida: false,  //Define si los campos del formulario son válidos.
      confirmEditDialog: false, //Activador del diálogo de confirmar edición

      //Reglas de los campos de texto del formulario de edición
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

      //--ELIMINACIÓN--//

      deleteDialog: false, //Activador del diálogo de confirmar eliminació
      id_delete: "", //ID del servicio a eliminar
    };
  },

  created() {
    //Extracción del valor de una variable en Vuex store (Ubicación: store.js)
    this.tipoServicioId = this.$store.state.tipoServicio.tipo_servicio_id;
    this.nombreTipoServicio = this.$store.state.tipoServicio.nombre_tipo_servicio;
    this.tipoServicioDeRuta = this.$route.params.tipoServicio;
    this.listar();
  },

  methods: {
    //--RUTAS--//

    crearNuevo() {
      this.$router.push("/servicios/" + this.tipoServicioDeRuta + "/nuevo");
    },

    verDetalle(item) {
      var servicioRuta = item.nombre.toLowerCase().replace(/ /g,"-");
      //Método para cambiar el valor de la variable servicio en Vuex store (Ubicación: store.js)
      this.$store.commit('changeValueOfService', { servicio_id: item.id, nombre_servicio: item.nombre });
      this.$router.push(
        "/servicios/" + this.tipoServicioDeRuta + "/" + servicioRuta
      );
    },

    verReservasDelServicio(item){
      var servicioRuta = item.nombre.toLowerCase().replace(/ /g,"-");
      //Método para cambiar el valor de una variable guardada en Vuex store (Ubicación: store.js)
      this.$store.commit('changeValueOfService', { servicio_id: item.id, nombre_servicio: item.nombre });
      this.$router.push(
        "/servicios/" + this.tipoServicioDeRuta + "/" + servicioRuta + "/reservas"
      );
    },

    volverATiposServicio() {
      this.$router.push("/servicios");
    },

    //LISTADO
    listar() {
      this.cargandoLista = true;
      axios
        .get("servicio/idtiposervicio/" + this.tipoServicioId)
        .then((response) => {
          if (response.data.length == 0) {
            this.servicios = [];
          } else {
            //Ordenar alfabéticamente
            this.servicios = response.data.sort((a, b) => {
              return a.nombre
                .toLowerCase()
                .localeCompare(b.nombre.toLowerCase(), "es", {
                  sensitivity: "base",
                  numeric: true,
                });
            });

          }
          this.cargandoLista = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //--EDICIÓN--//

    abrirDialogoEdicion(item) {
      this.servicio.id = item.id;
      this.servicio.nombre = item.nombre;
      this.servicio.descripcion = item.descripcion;
       this.servicio.file = null;
      this.editDialog = true;
    },
    cerrarDialogoEdicion() {
      this.editDialog = false;
    },
    abrirDialogoConfirmarEdicion() {
      this.$refs.form.validate();
      if (this.edicionValida) {
        this.confirmEditDialog = true;
      }
    },

    editarContenido() {
      this.confirmEditDialog = false;
      let me = this;
      if (this.edicionValida && me.servicio.id != "") {
        this.cargandoEdicion = true;
        if(me.servicio.file != null){
          this.editarConImagen(); 
        } else{
           this.editarSinImagen(me.servicio.id);
        }
      }
    },

    editarSinImagen(id){
      let me = this;
       axios.put("servicio/" + id,
          {
            nombre: me.servicio.nombre,
            descripcion: me.servicio.descripcion
          })
          .then(response => {
            if(response){
              this.cargandoEdicion = false;
              this.editDialog = false;
              this.listar();
              this.alerta_edicion();   
          }
          })
          .catch(error => {
            console.log(error);
          });
    },

    editarConImagen(){
      let me = this;
       var formData = new FormData();
        formData.append("file", me.servicio.file);
        formData.append("nombre", me.servicio.nombre);
        formData.append("descripcion", me.servicio.descripcion);
        formData.append("id", me.servicio.id);
        axios
          .post("servicio", formData)
          .then((response) => {
              if(response){
                  this.cargandoEdicion = false;
                  this.editDialog = false;
                  this.listar();
                  this.alerta_edicion();
              }    
          })
          .catch((error) => {
            console.log(error);
          });
    },

    //ELIMINACIÓN
    abrirDialogoEliminacion(id) {
      this.id_delete = id;
      this.deleteDialog = true;
      console.log("Servicio a eliminar: " + this.id_delete);
    },

     alerta_edicion(){
        this.$alert("", "Edicion Exitosa","success").then(() => console.log("Closed"));
    },
    alerta_eliminacion(){
        this.$alert("", "Eliminacion Exitosa","success").then(() => console.log("Closed"));
    },
    eliminar() {
      this.cargandoEliminacion = true;
      axios.delete("servicio/" + this.id_delete).then((response) => {
          this.deleteDialog = false;
          this.cargandoEliminacion = false;
          this.listar(); 
          this.$alert("Eliminación exitosa", "Exitoso","success");
      })
      .catch(error => {
            console.log(error);
          });
    },
  },
};
</script>

