<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Contenidos Genéricos</v-toolbar-title>

        <v-spacer></v-spacer>

        <!--Campo de búsqueda de contenidos genéricos-->
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
          >Nuevo contenido</v-btn
        >
        <v-spacer></v-spacer>

        <v-btn color="blue-grey lighten-4" 
              medium>Asignaciones</v-btn>
      </v-toolbar>

      <!--Formulario de edición de contenido genérico en diálogo-->
      <v-dialog v-model="dialog" max-width="700px">
        <v-card :loading="cargandEdicion">
          <v-card-title>
            <span>Edición de contenido</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form v-model="edicionValida" ref="form">
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    v-model="contenido.nombre"
                    label="Nombre"
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
                  <v-file-input
                    accept="image/*"
                    label="Imagen *"
                    prepend-icon="perm_media"
                    v-model="contenido.file"
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

      

      <!--Tabla de lista de contenidos-->
      <v-data-table class="elevation-1" :headers="headers" :items="contenidos" 
      :search="search"
      :loading="cargandoContenidos || cargandoEliminacion" loading-text="Cargando contenidos"
      no-data-text="No hay contenidos genéricos"
      >
        <!-- Muestra de la imagen en las filas de la tabla -->
        <!-- Se puede modificar el elemento de esta fila de la tabla al hacer uso del v-slot -->
        <!-- La url de la imagen a mostrar viene en los datos obtenidos del API RESTful -->
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

      <!--Diálogo de confirmación - Edición de contenido genérico-->
      <dialogo-edicion
        :dialog="validDialogEdition"
        @close="validDialogEdition = false"
        @editarValido="editarContenido"
        titulo="contenido"
      >
      </dialogo-edicion>

      <!--Diálogo de confirmación - Eliminación de contenido genérico-->
      <dialogo-eliminacion
        :dialog="validElimination"
        titulo="contenido"
        @close="validElimination = false"
        @borrarValido="borrarContenido"
      ></dialogo-eliminacion>

    </v-flex>
  </v-layout>
</template>

<script>
import DialogoEliminacion from "../DialogosValidacion/DialogoEliminacion.vue";
import DialogoEdicion from "../DialogosValidacion/DialogoEdicion.vue";
import axios from "axios";
export default {
  name: "Contenidos_Genericos",
  components: {
    DialogoEliminacion,
    DialogoEdicion,
  },
  data() {
    return {
      //Lista de contenidos genéricos
      contenidos: [],
      
      //Campo de búsqueda de contenidos genéricos por texto
      search:"",
      //Cabeceras de la tabla
      headers: [
        { text: "Nombre", value: "nombre"},
        { text: "Descripcion", value: "descripcion", sortable: false},
        { text: "Imagen", value: "url_imagen", sortable: false},
        { text: "Editar", value: "edit", sortable: false },
        { text: "Eliminar", value: "delete", sortable: false },
      ],
      //Mostrar animaciones de cargando
      cargandoContenidos: true,
      cargandEdicion: false,
      cargandoEliminacion: false,
      //--EDICIÓN--//
      //Modelo para la edición del contenido genérico
      contenido: {
        id: "",
        nombre: "",
        descripcion: "",
        file: null,
      },
      dialog: false, //Muestra el formulario de edición
      edicionValida: false, //Define si los campos en el formulario de edición son válidos
      validDialogEdition: false, //Muestra diálogo de confirmación de edición
      //Reglas para los campos de edición
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
          (v && v.length <= 200) ||
          "Debe contener menos de 200 caracteres.",
        (v) =>
          /^[^\s]+(\s+[^\s]+)*$/.test(v) ||
          "No deben haber espacios al inicio o al final.",
      ],
      reglaEditImagen: [
        (v) => !v || v.size < 2000000 || "La imagen debe pesar menos de 2MB."
      ],
      //--ELIMINACIÓN--//
      //Muestra el diálogo de confirmar eliminación
      validElimination: false,
      //Id del contenido a borrar
      id_delete: "",
      
    };
  },
  created() {
    console.log("Creando");
    this.listar();
  },
  methods: {
 
    listar() {
      //Endpoint: contenido/generic
      //Todos los contenidos que no estén relacionados con algun producto (item-transaccion) o asignación
      // son considerados genéricos
      let me = this;
      axios
        .get("contenido/generic")
        .then((response) => {
          if (response.data != null) {
            //Ordenando los contenidos por orden alabético
            this.contenidos = response.data.sort((a, b) => {
              return a.nombre
                .toLowerCase()
                .localeCompare(b.nombre.toLowerCase(), "es", {
                  sensitivity: "base",
                  numeric: true,
                });
            });
            this.cargandoContenidos = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    crearNuevo() {
      this.$router.push("/contenidos/generico/nuevo");
    },
    //EDICIÓN
    abrirDialogoEdicion(item) {
      this.contenido.id = item.id;
      this.contenido.nombre = item.nombre;
      this.contenido.descripcion = item.descripcion;
      this.contenido.file = null;
      this.dialog = true;
    },
    abrirDialogoConfirmarEdicion() {
      //Muestra las validaciones del form si los campos no son válidos
      this.$refs.form.validate();
      if (this.edicionValida) {
        this.validDialogEdition = true;
      }
    },
    //La edición de contenido puede usar uno de dos métodos de edición
    //Depende de que si quiere editar el contenido con imagen o sin imagen
    editarContenido() {
      this.validDialogEdition = false;
      let me = this;
      if (this.edicionValida && me.contenido.id != "") {
        this.cargandEdicion = true;
        if(me.contenido.file != null){
          this.editarConImagen(); 
        } else{
           this.editarSinImagen(me.contenido.id);
        }
      }
    },
    
    //Mensaje de edición exitosa
    alerta_edicion() {
      this.$alert("Edición exitosa", "Exitoso", "success").then(() =>
        console.log("Closed")
      );
    },
    editarSinImagen(id){
      let me = this;
       axios.put("contenido/" + id,
          {
            nombre: me.contenido.nombre,
            descripcion: me.contenido.descripcion
          })
          .then(response => {
            if(response){
              this.cargandEdicion = false;
              this.dialog = false;
              this.listar();
              this.alerta_edicion();   
          }
          })
          .catch(error => {
            console.log(error);
          });
    },
    editarConImagen(){
      //Aquí se utiliza FormData para mandar los datos del contenido y el archivo de imagen
      let me = this;
       var formData = new FormData();
        formData.append("file", me.contenido.file);
        formData.append("nombre", me.contenido.nombre);
        formData.append("descripcion", me.contenido.descripcion);
        formData.append("id", me.contenido.id);
        axios
          .post("contenido/upload", formData)
          .then((response) => {
              if(response){
                  this.cargandEdicion = false;
                  this.dialog = false;
                  this.listar();
                  this.alerta_edicion();
              }    
          })
          .catch((error) => {
            console.log(error);
          });
    },
    cerrarDialogoEdicion() {
      this.dialog = false;
    },
    //ELIMINACIÓN
    abrirDialogoEliminacion(id) {
      this.id_delete = id;
      this.validElimination = true;
    },
    //Mensaje de eliminación exitosa
    alerta_eliminacion(){
        this.$alert("Eliminación exitosa", "Exitoso","success").then(() => console.log("Closed"));
    },
    borrarContenido() {
      this.cargandoEliminacion = true;
      this.validElimination = false;
      axios
        .delete("contenido/" + this.id_delete)
        .then((response) => {
          this.id_delete = "";
          this.cargandoEliminacion = false;
          this.alerta_eliminacion();    
          this.listar();   
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.texto-opcional{
  font-size: 12px;
}
.imagen-table{
  width: 200px;
}
.imagen {
  width: 150px;
  height: 100px;
  margin: 4px;
}
.dialog-button {
  color: #444;
}

</style>