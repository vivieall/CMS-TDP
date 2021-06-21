<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <!--Botón para volver a la lista de productos-->
        <v-btn @click="returnToList">
          <v-icon>reply</v-icon>
        </v-btn>
        <v-list-item>Nuevo Producto</v-list-item>

        <v-list-item>Transacción: {{ transaccion.nombre }}</v-list-item>
        <v-spacer></v-spacer>
        <!--Animación de cargando creación-->
        <v-progress-circular
          v-if="cargandoCreacion || cargandoEliminacionProducto"
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-toolbar>

      <v-divider></v-divider>
      <!--Registro de producto por pasos-->
      <v-stepper v-model="nPaso">
        <v-stepper-header>
          <!--El primer paso consiste en ingresar datos directos del producto,
           los cuales son monto del producto y cantidad-->
          <v-stepper-step :complete="nPaso > 1" step="1">
            Monto y cantidad
          </v-stepper-step>

          <v-divider></v-divider>
          <!--El segundo paso es la información del producto,
          es decir el nombre, descripción y archivo de imagen.
          Estos pertenecen a la entidad contenido-->
          <v-stepper-step :complete="nPaso > 2" step="2">
            Información del producto
          </v-stepper-step>
        </v-stepper-header>
        <!--Formulario del paso 1-->
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-container>
              <v-form v-model="formValido1" ref="form1">
                <v-row>
                  <v-col lg="2">
                    <p>Cantidad</p>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="producto.cantidad"
                      label="Cantidad"
                      type="number"
                      solo
                      :rules="reglaCantidad"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col lg="2">
                    <p>Precio</p>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="producto.precio"
                      label="Precio"
                      :rules="reglaPrecio"
                      solo
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
            <!--Botón de continuar al siguiente paso
            Sin embargo, este llama a la función guardarProducto
            para que previamente se cree un id de producto/item-transaccion-->
            <v-btn
              medium
              color="indigo white--text"
              @click="guardarProducto"
              style="margin-right: 10px"
              >Continuar</v-btn
            >
          </v-stepper-content>
          <!--Formulario del paso 2
          Luego de crearse un producto, el id queda guardado y se pasa como dato
          al objeto contenido para poder guardarlo.
          Por tanto, ambos elementos quedarán guardados y relacionados 
          en la base de datos-->
          <v-stepper-content step="2">
            <v-form v-model="formValido2" ref="form2">
              <v-row class="first_row">
                <v-col lg="2">
                  <p>Nombre</p>
                </v-col>
                <v-col>
                  <v-text-field
                    :rules="nombreReglas"
                    v-model="productoContenido.nombre"
                    label="Nombre"
                    required
                    solo
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col lg="2">
                  <p>Descripcion</p>
                </v-col>
                <v-col>
                  <v-textarea
                    :rules="descripcionReglas"
                    v-model="productoContenido.descripcion"
                    label="Descripcion"
                    required
                    solo
                    rows="1"
                    auto-grow
                    row-height="12"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col lg="2">
                  <p>Imagen</p>
                </v-col>

                <v-col>
                  <v-file-input
                    accept="image/*"
                    label="Imagen"
                    solo
                    prepend-icon="perm_media"
                    v-model="productoContenido.file"
                    :rules="imagenReglas"
                  >
                  </v-file-input>
                </v-col>
              </v-row>
            </v-form>
            <v-btn
              medium
              color="indigo white--text"
              style="margin-right: 10px"
              @click="abrirDialogoInsercion"
              >Registrar</v-btn
            >
            <!--Botón cancelar, el cual borra de la base de datos el producto creado anteriormente-->
            <v-btn medium color="blue-grey lighten-4" @click="borrarProducto"
              >Cancelar</v-btn
            >
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>

      <!--Diálogo de confirmación - Creación de producto-->
      <dialogo-insercion
        :dialog="dialogoConfirmarInsercion"
        v-on:close="dialogoConfirmarInsercion = false"
        v-on:guardarValido="guardarProductoContenido"
        titulo="producto"
      >
      </dialogo-insercion>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from "axios";
import DialogoInsercion from "../DialogosValidacion/DialogoInsercion.vue";
export default {
  name: "Producto_Post",
  components: {
    DialogoInsercion,
  },
  data() {
    return {
      //Transacción asociada a los productos que serán creados
      transaccion: {
        id: "",
        nombre: "",
      },

      //Paso actual del Stepper
      nPaso: 1,

      //Animación de cargando
      cargandoCreacion: false,
      cargandoEliminacionProducto: false,

      //Parámetros de ruta
      tipoTransaccionRuta: "",
      transaccionRuta: "",

      //Inserción
      dialogoConfirmarInsercion: false, //Abre el dialogo de confirmación
      formValido1: false,//Define si el formulario del paso 1 es válido
      formValido2: false,//Define si el formulario del paso 2 es válido
      
      ///Modelos
      //Item-transaccion/Producto a ingresar
      producto: {
        cantidad: null,
        precio: "",
      },
      //Contenido a ingresar al cual se le pasará el id del producto creado
      productoContenido: {
        nombre: "",
        descripcion: "",
        file: null,
      },

      //Reglas
      reglaPrecio: [
        (v) => !!v || "El precio es requerido",
        (v) => (v && v.length < 8) || "Debe contener un máximo de 7 caracteres",
        (v) =>
          /^\d{1,8}\.\d{2}$/.test(v) || "El precio debe tener la forma: 50.00.",
      ],
      reglaCantidad: [(v) => !!v || "La cantidad de producto es requerida"],
      nombreReglas: [
        (v) => !!v || "El nombre es requerido.",
        (v) => (v && v.length <= 50) || "Debe contener menos de 50 caracteres.",
        (v) =>
          /^[^\s]+(\s+[^\s]+)*$/.test(v) ||
          "No deben haber espacios al inicio o al final.",
      ],
      descripcionReglas: [
        (v) => !!v || "La descripción es requerida.",
        (v) =>
          (v && v.length <= 200) || "Debe contener menos de 200 caracteres.",
        (v) =>
          /^[^\s]+(\s+[^\s]+)*$/.test(v) ||
          "No deben haber espacios al inicio o al final.",
      ],
      imagenReglas: [
        (v) => !!v || "La imagen es requerida.",
        (v) => (v && v.size < 2000000) || "La imagen debe pesar menos de 2MB.",
      ],

      //Id del item de transacción / producto creado en el primer paso. Este se usara para crear un contenido nuevo
      //Cuando se seleccione la opción cancelar en el segundo paso, el producto con este id se borrará y el id_item_creado
      // tendrá valor vacío ("")
      id_item_creado: "",
    };
  },
  created() {
    this.tipoTransaccionRuta = this.$route.params.tipoTransaccion;
    this.transaccionRuta = this.$route.params.transaccion;
    this.transaccion.id = this.$store.state.transaccion.transaccion_id;
    this.transaccion.nombre = this.$store.state.transaccion.nombre_transaccion;
  },
  methods: {
    returnToList() {
      this.borrarProducto();
      this.$router.push(
        `/tipo-transacciones/${this.tipoTransaccionRuta}/${this.transaccionRuta}/productos`
      );
    },

    //Inserción
    abrirDialogoInsercion() {
      this.$refs.form2.validate();
      if (this.formValido2) {
        this.dialogoConfirmarInsercion = true;
      }
    },
    guardarProducto() {
      this.$refs.form1.validate();
      if (this.formValido1) {
        this.cargandoCreacion = true;
        axios
          .post("item-transaccion", {
            precio: parseFloat(this.producto.precio),
            activo: true,
            cantidad: this.producto.cantidad,
            transaccion: {
              id: this.transaccion.id,
            },
          })
          .then((response) => {
            this.id_item_creado = response.data.identifiers[0].id;
            console.log(response.data);
            console.log(this.id_item_creado);
            this.nPaso = 2;
            this.cargandoCreacion = false;
          });
      }
    },
    borrarProducto() {
      if (this.id_item_creado) {
        this.cargandoEliminacionProducto = true;
        axios
          .delete("item-transaccion/" + this.id_item_creado)
          .then((response) => {
            this.cargandoEliminacionProducto = false;
            this.nPaso -= 1;
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    guardarProductoContenido() {
      this.cargandoCreacion = true;
      this.dialogoConfirmarInsercion = false;
      if (this.formValido2) {
        const fd = new FormData();
        var c = this.productoContenido;
        fd.append("file", c.file);
        fd.append("nombre", c.nombre);
        fd.append("descripcion", c.descripcion);
        fd.append("itemTransaccion", this.id_item_creado);
        console.log(fd);
        axios
          .post("contenido/upload", fd)
          .then((response) => {
            this.cargandoCreacion = false;
            this.returnToList();
            this.$alert("Registro exitoso", "Exitoso", "success");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>