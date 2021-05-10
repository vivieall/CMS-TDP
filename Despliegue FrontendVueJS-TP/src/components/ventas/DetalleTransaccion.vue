<template>
  <v-layout align-start>
    <v-flex>
      <!--Botón de volver a las ventas-->
      <v-btn @click="volverAVentas" style="margin: 6px 0px">
        <v-icon>reply</v-icon>
      </v-btn>
      <v-toolbar flat color="white">
        <v-toolbar-title>Detalles de venta</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <p v-if="checkin.huesped" style="display: block; margin: auto 10px">
            Huésped:
            {{ checkin.huesped.nombre + " " + checkin.huesped.apellido }}
          </p>
          <p
            v-if="checkin.habitacion"
            style="display: block; margin: auto 10px"
          >
            Habitación: {{ checkin.habitacion.numerohabitacion }}
          </p>
        </v-toolbar-items>
      </v-toolbar>
      <!--Lista de detalles de transacción-->
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="listaDetalleVenta"
        :loading="cargandoLista"
        :loading-text="textoCargandoLista"
        no-data-text="No hay detalles"
      >
        <template v-slot:[`item.url_imagen`]="{ item }">
          <div class="p-2">
            <v-img
              :src="item.url_imagen"
              :alt="item.nombre_producto"
              class="imagen"
              style="max-height: 600px"
            ></v-img>
          </div>
        </template>

        <template v-slot:[`item.precio_unitario`]="{ item }">
          <p v-if="item.precio_unitario == 0" style="margin: auto 0px">
            Sin precio
          </p>
          <p v-else style="margin: auto 0px">{{ item.precio_unitario }}</p>
        </template>

        <template v-slot:[`item.importe`]="{ item }">
          <p v-if="item.precio == 0" style="margin: auto 0px">
            {{ item.precio }}
          </p>
          <p v-else style="margin: auto 0px">{{ item.precio }}</p>
        </template>

        <template v-slot:[`item.edit`]="{ item }">
          <v-btn icon @click.stop.prevent="abrirDialogoEdicion(item)">
            <v-icon>create</v-icon>
          </v-btn>
        </template>
      </v-data-table>

     <!--Formulario de edición de detalle de transacción en un diálogo-->
      <v-dialog v-model="dialogoEdicion" max-width="700px">
        <v-card :loading="cargandoEdicion">
          <v-card-title>
            <span>Edición de detalle de venta</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form v-model="formValido" ref="form">
                <v-row>
                  <v-col>
                    <v-text-field label="Cantidad" v-model="cantidadProducto" type="number"></v-text-field>
                    <v-text-field label="Importe" v-model="detalle.precio" :rules="reglaEditPrecio"></v-text-field>
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

      <!--Diálogo de confirmación - Edición de detalle transacción-->
      <dialogo-edicion
        :dialog="dialogoConfirmarEdicion"
        @close="dialogoConfirmarEdicion = false"
        titulo="detalle de venta"
        @editarValido="editar"
      >
      </dialogo-edicion>
    </v-flex>
  </v-layout>
</template>

<script>
/*Los detalles de transacción es el conjunto de productos vendidos 
 en una venta. Asimismo, se muestra la cantidad de cada producto 
 que se ha comprado*/ 
import DialogoEdicion from "../DialogosValidacion/DialogoEdicion.vue";
import axios from "axios";
export default {
  name: "DetalleTransaccion",
  components: {
    DialogoEdicion,
  },
  data() {
    return {
      headers: [
        { text: "Producto", value: "nombre_producto", sortable: false },
        { text: "Imagen", value: "url_imagen", width: 200, sortable: false },
        { text: "Precio unitario", value: "precio_unitario", sortable: false },
        { text: "Cantidad", value: "cantidad", sortable: false },
        { text: "Importe", value: "precio", sortable: false },
        { text: "Editar", value: "edit", sortable: false },
      ],

      //Venta asociada
      venta: {
        id: "",
        descripcion: "",
      },

      //Parámetros de la ruta
      tipoTransaccionRuta: "",
      transaccionRuta: "",
      
      //Lista de detalles
      detalles: [],

      //Modelo para edición de detalle
      detalle:{
        id: "",
        precio: "",
      },

      //La variable "cantidadProducto" que forma parte del modelo para
      // edición de detalle y se encuentra en la sección "watch" 
      //para cambiar el valor del precio a cantidadProducto * precioUnitario
      //durante la edición
      cantidadProducto: 0,
      precioUnitario: 0.00,

      /*Las ventas asociadas a estos detalles en la base de datos 
      están relacionadas a un checkin.
      Esto es porque este contienen al huésped que realizó la compra.
      En este detalle de transacción se muestra el nombre y
      el número de habitación del huésped.*/
      checkin: {},

      //Animaciones de cargando y textos de cargando
      cargandoLista: false,
      cargandoEdicion: false,
      textoCargandoLista: "Cargando detalle de venta",

      //--Edición--//
      ///Reglas para campos de edición
      reglaEditPrecio: [
        (v) => !!v || "El precio es requerido",
        (v) => (v && v.length < 7) || "Debe contener un máximo de 4 caracteres",
        (v) => /^\d{1,8}\.\d{2}$/.test(v) || "El precio debe tener la forma: 50.00.",
    ],
    
    dialogoEdicion: false, //Abre el formulario de edición
    dialogoConfirmarEdicion: false, //Abre el diálogo de confirmación
    formValido: false,//Define si el formulario de edición es válido para su envío
    };
  },
  computed: {
    //Propiedad computada que modifica la lista real de
    // detalles en la vista
    listaDetalleVenta() {
      return this.detalles.map((detalle) => {
        return {
          id: detalle.id,
          id_producto: detalle.itemTransaccion.id,
          nombre_producto: detalle.itemTransaccion.contenido.nombre,
          precio_unitario: parseFloat(detalle.itemTransaccion.precio).toFixed(2),
          url_imagen: detalle.itemTransaccion.contenido.url_imagen,
          precio: parseFloat(detalle.precio).toFixed(2),
          cantidad: detalle.cantidad,
        };
      });
    },
  },
  watch:{
    cantidadProducto(value){
      this.detalle.precio = parseFloat(value*this.precioUnitario).toFixed(2);
    }
  },

  created() {
     //Extracción del valor de una variable en Vuex store (Ubicación: store.js)
    this.venta.id = this.$store.state.venta.venta_id;
    this.venta.descripcion = this.$store.state.venta.descripcion_venta;
    this.transaccionRuta = this.$route.params.transaccion;
    this.tipoTransaccionRuta = this.$route.params.tipoTransaccion;
    this.obtenerCheckin();
    this.listar();
  },
  methods: {
    volverAVentas() {
      this.$router.push(
        "/tipo-transacciones/" +
          this.tipoTransaccionRuta +
          "/" +
          this.transaccionRuta +
          "/ventas"
      );
    },

    listar() {
      this.cargandoLista = true;
      axios
        .get("detalletransaccion/venta/" + this.venta.id)
        .then((response) => {
          this.detalles = response.data;
          this.cargandoLista = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    obtenerCheckin() {
      axios
        .get("venta/" + this.venta.id + "?huesped=true")
        .then((response) => {
          this.checkin = response.data.checkin;
          console.log(this.checkin);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //Edición
    abrirDialogoEdicion(item){
      this.detalle.id = item.id;
      this.detalle.precio = item.precio;
      this.cantidadProducto = item.cantidad;
      this.precioUnitario = item.precio_unitario;
      this.dialogoEdicion = true;
    },
    abrirDialogoConfirmarEdicion(){
      this.$refs.form.validate();
      if(this.formValido){
        this.dialogoConfirmarEdicion = true;
      }
    },
    editar(){
        this.dialogoConfirmarEdicion = false;
        this.cargandoEdicion = true;
        axios.put("detalletransaccion/" + this.detalle.id,
        {
          precio: parseFloat(this.detalle.precio),
          cantidad: this.cantidadProducto
        })
        .then(response => {
          this.cargandoEdicion = false;
          this.dialogoEdicion = false;
          this.listar();
          this.$alert("Edición exitosa", "Exitoso", "success");
        })
    },
  },
};
</script>