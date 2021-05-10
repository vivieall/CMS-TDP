<template>
  <v-layout align-start>
    <v-flex>
      <v-btn @click="volverATransacciones" style="margin: 6px 0px">
        <v-icon>reply</v-icon>
      </v-btn>
      <v-toolbar flat color="white">
        <v-toolbar-title>Productos de {{ transaccion.nombre }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn medium color="indigo white--text" @click="crearNuevo"
          >Agregar producto</v-btn
        >
      </v-toolbar>
      <!--Tabla de datos - Productos-->
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="listaProductos"
        :loading="cargandoLista || cargandoEliminacion"
        :loading-text="textCargandLista"
        no-data-text="No hay productos"
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
        <!--Mostrar el item precio de la tabla como "Sin precio"
            en caso el precio sea 0.00-->
        <template v-slot:[`item.precio`]="{ item }">
          <p v-if="item.precio == 0" style="margin: auto 0px">Sin precio</p>
          <p v-else style="margin: auto 0px">{{ item.precio }}</p>
        </template>
        
        <!--Checkbox que no se puede seleccionar
        Representa si el producto está activo para su venta o no-->
        <template v-slot:[`item.activo`]="{ item }">
          <v-simple-checkbox v-model="item.activo" disabled></v-simple-checkbox>
        </template>
        <template v-slot:[`item.edit`]="{ item }">
          <v-btn icon @click.stop.prevent="abrirDialogoEdicion(item)">
            <v-icon>create</v-icon>
          </v-btn>
        </template>

      </v-data-table>

      <!-- Formulario de edición de producto en diálogo -->
      <v-dialog v-model="dialogoEdicion" max-width="700px">
        <v-card :loading="cargandoEdicion">
          <v-card-title>
            <span>Edición de producto</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <!--Edición de datos de la entidad contenido del producto-->
              <v-form v-model="formValido" ref="form">
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    v-model="producto.contenido.nombre"
                    label="Nombre"
                    :rules="reglaEditNombre"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-textarea
                    v-model="producto.contenido.descripcion"
                    label="Descripción"
                    :rules="reglaEditDescripcion"
                    auto-grow
                    row-height="10"
                    rows="1"

                  ></v-textarea>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <!--Imagen del producto-->
                  <v-file-input
                    accept="image/*"
                    label="Imagen *"
                    prepend-icon="perm_media"
                    v-model="producto.contenido.file"
                    :rules="reglaEditImagen"
                  >
                  </v-file-input>
                  
                </v-flex>
                <v-flex>
                    <h3 class="texto-opcional">* La imagen es opcional. No se actualizará la imagen si no coloca ninguna.</h3>

                </v-flex>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="producto.cantidad"
                      label="Cantidad"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="producto.precio"
                      label="Precio"
                      :rules="reglaEditPrecio"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-checkbox
                      v-model="producto.activo"
                      :label="`${textoActivo}`"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-grey lighten-4"
              large
              @click.native="dialogoEdicion = false"
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

      <!--Diálogo de confirmación - Edición de producto-->
      <dialogo-edicion
        :dialog="dialogoConfirmarEdicion"
        @close="dialogoConfirmarEdicion = false"
        titulo="producto"
        @editarValido="editar"
      >
      </dialogo-edicion>


    </v-flex>
  </v-layout>
</template>

<script>
/*
 Los productos son llamados ITEM-TRANSACCIÓN en backend.
 Estos tienen una relación de uno a uno con la tabla contenido,
 puesto que va a utilizar los campos de esta tabla para poder
 tener un nombre, una descripción y una imagen.
 Los datos de la tabla de item-transacción son precio, activo y cantidad

 Los productos no se pueden eliminar. Sin embargo, en la edición
 se puede seleccionar el checkbox para que deje de estar en 
 estado de activo para su venta

*/
import axios from 'axios';
import DialogoEdicion from "../DialogosValidacion/DialogoEdicion.vue";
import DialogoEliminacion from "../DialogosValidacion/DialogoEliminacion.vue";
export default {
  name: "Productos",
  components: {
    DialogoEdicion,
    DialogoEliminacion,
  },
  data() {
    return {
      headers: [
        { text: "Nombre", value: "nombre", sortable: false },
        { text: "Descripción", value: "descripcion", sortable: false },
        { text: "Precio", value: "precio", sortable: false },
        { text: "Cantidad", value: "cantidad", sortable: false },
        { text: "Imagen", value: "url_imagen", sortable: false },
        { text: "Activo", value: "activo", sortable: false },
        { text: "Editar", value: "edit", sortable: false },
      ],

      //Parámetros de ruta
      tipoTransaccionRuta: "",
      transaccionRuta: "",

      //Texto de cargando lista
      textCargandLista: "Cargando productos",

      //Lista de productos de la tabla
      productos: [
     
      ],

      //Modelo de edición
      producto: {
        id: "",
        cantidad: 0,
        precio: "",
        activo: false,
        //Información de la entidad contenido
        contenido: {
          id: "",
          nombre: "",
          descripcion:"",
          file: null,
        }
      },

      //Transacción asociada a los productos
      transaccion: {
        id: "",
        nombre: "",
      },

      //Animaciones de cargando
      cargandoLista: false,
      cargandoEdicion: false,
      cargandoEliminacion: false,

      //Edición
      dialogoEdicion: false, //Abre el formulario de edición

      formValido: false,  // Valida que todos los campos son correctos

      dialogoConfirmarEdicion: false,
      //Reglas de campos de edición
      //--Reglas--//
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
      reglaEditPrecio: [
        (v) => !!v || "El precio es requerido",
        (v) => (v && v.length < 7) || "Debe contener un máximo de 4 caracteres",
        (v) => /^\d{1,8}\.\d{2}$/.test(v) || "El precio debe tener la forma: 50.00.",
      ],
      

      //Eliminación
      dialogoConfirmarEliminacion: false,
      id_delete: "",
    };
  },
  created() {
     //Extracción del valor de una variable en Vuex store (Ubicación: store.js)
    this.transaccion.id = this.$store.state.transaccion.transaccion_id;
    this.transaccion.nombre = this.$store.state.transaccion.nombre_transaccion;
    this.tipoTransaccionRuta = this.$route.params.tipoTransaccion;
    this.transaccionRuta = this.$route.params.transaccion;
    this.listar();
  },

  computed: {
    textoActivo(){
      if(this.producto.activo){
        return "Activo";
      } else{
        return "No Activo";
      }
    },
    listaProductos(){
      return this.productos.map(producto => {
        return {
          id: producto.id,
          id_contenido: producto.contenido.id,
          nombre: producto.contenido.nombre,
          descripcion: producto.contenido.descripcion,
          url_imagen: producto.contenido.url_imagen,
          
          precio: parseFloat(producto.precio).toFixed(2),
          cantidad: producto.cantidad,
          activo: producto.activo
          
        }
      })
    }
  },
  methods: {
    volverATransacciones() {
      this.$router.push(`/tipo-transacciones/${this.tipoTransaccionRuta}`);
    },

    listar() {
      this.cargandoLista = true;
      console.log(this.transaccion.id);
      axios.get("item-transaccion/transaccion/" + this.transaccion.id)
      .then(response => {
        if(response.data.length > 0){
          console.log(response.data);
           this.productos = response.data;
        }
        this.cargandoLista = false  
      })
    },  

    crearNuevo() {
      this.$router.push(`/tipo-transacciones/${this.tipoTransaccionRuta}/${this.transaccion}/productos/nuevo`);
    },

    //Edición
    abrirDialogoEdicion(item) {
      this.producto.id = item.id;
      this.producto.cantidad = item.cantidad;
      this.producto.precio = item.precio;
      this.producto.activo = item.activo;
      this.producto.contenido.id = item.id_contenido
      this.producto.contenido.nombre = item.nombre
      this.producto.contenido.descripcion = item.descripcion
      this.producto.contenido.file = null;
      this.dialogoEdicion = true;
    },
    abrirDialogoConfirmarEdicion() {
      this.$refs.form.validate();
      if (this.formValido) {
        this.dialogoConfirmarEdicion = true;
      }
    },
    editar() {

      this.dialogoConfirmarEdicion = false;
      this.cargandoEdicion = true;
      // Llamando al endpoint de edición de campos de item-transacción/producto
      axios.put("item-transaccion/" + this.producto.id,
        {
          cantidad: this.producto.cantidad,
          activo: this.producto.activo,
          precio: this.producto.precio,
        }
      )
      .then(response => {
        //Dos métodos para editar en caso 
        //se requiera enviar una nueva imagen o no
        if(this.producto.contenido.file === null){
          this.editarContenidoSinImagen(this.producto.contenido)
        } else{
          this.editarContenidoConImagen(this.producto.contenido)
        }
         
      })
      .catch(error => {
        console.log(error)
      })

      
    },

    editarContenidoSinImagen(contenido){
      axios.put("contenido/" + contenido.id, 
      {
        nombre: contenido.nombre,
        descripcion: contenido.descripcion
      })
      .then(response => {
         this.cargandoEdicion = false;
         this.dialogoEdicion = false;
         this.listar();
         this.$alert("Edición exitosa", "Exitoso", "success");
      })
      .catch(error => {
        console.log(error)
      })
    },

    editarContenidoConImagen(contenido){
      //Se utiliza FormData para enviar el archivo de imagen
        let formData = new FormData();
        formData.append("file", contenido.file);
        formData.append("nombre", contenido.nombre);
        formData.append("descripcion", contenido.descripcion);
        formData.append("id", contenido.id);
       //Endpoint que envia los campos de contenido con la imagen
       // La imagen se subirá al servicio de Amazon S3
        axios
          .post("contenido/upload", formData)
          .then((response) => {
              if(response){
                this.cargandoEdicion = false;
                this.dialogoEdicion = false;
                this.listar();
                this.$alert("Edición exitosa", "Exitoso", "success");
              }
              
          })
          .catch((error) => {
            console.log(error);
          });
    },

  },
};
</script>