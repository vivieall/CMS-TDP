<template>
  <v-layout align-start>
    <v-flex>
      <!--Volver a la lista de transacciones-->
      <v-btn @click="volverATransacciones" style="margin: 6px 0px">
        <v-icon>reply</v-icon>
      </v-btn>
      <v-toolbar flat color="white">
        <v-toolbar-title>Ventas de {{ transaccion.nombre }}</v-toolbar-title>

        <v-spacer></v-spacer>

    
      </v-toolbar>
       <!--Tabla de datos - Ventas-->
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="ventasComputadas"
        :loading="cargandoLista"
        :loading-text="textoCargandoLista"
        no-data-text="No hay ventas">

        <template v-slot:[`item.edit`]="{ item }">
          <v-btn icon @click.stop.prevent="abrirDialogoEdicion(item)">
            <v-icon>create</v-icon>
          </v-btn>
        </template>

        <template v-slot:[`item.detalle`]="{ item }">
          <v-btn elevation="2" color="blue-grey lighten-4" 
            medium @click.stop.prevent="verDetalle(item)">
            VER DETALLE
          </v-btn>
        </template>
            
      </v-data-table>

      <!-- Formulario de edición de venta en diálogo -->
      <v-dialog v-model="dialogoEdicion" max-width="700px">
        <v-card :loading="cargandoEdicion">
          <v-card-title>
            <span>Edición de venta</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form v-model="formValido" ref="form">
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    v-model="venta.descripcion"
                    label="Descripción"
                    :rules="reglaEditDescripcion"
                  ></v-text-field>
                </v-flex>
                
                <v-flex xs12 sm12 md12>
                  <!--DateTime picker para seleccionar la fecha y hora
                  Tiene el formato: 01/01/01 09:00:00-->
                    <v-datetime-picker
                      v-model="fechaConFormato"
                      @input="setFecha"
                      :textFieldProps="textFieldProps"
                      label="Fecha"
                      :datePickerProps="datePickerProps"
                      date-format="dd/MM/yyyy"
                      clearText="Cancelar"
                      okText="Aceptar"
                    ></v-datetime-picker>

                   </v-flex>
                <v-flex xs12 sm12 md12> 
                    <v-select
                    v-model="venta.moneda"
                    label="Moneda"
                    :items="listaMoneda"
                    :rules="reglaMoneda"
                  ></v-select>
                  <v-flex xs12 sm12 md12> 
                  <v-text-field
                    v-model="venta.monto"
                    label="Monto"
                    :rules="reglaMonto"
                  ></v-text-field>
                </v-flex>
                </v-flex>
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

      <!--Diálogo de edición-->
      <dialogo-edicion
        :dialog="dialogoConfirmarEdicion"
        @close="dialogoConfirmarEdicion = false"
        titulo="venta"
        @editarValido="editar"
      >
      </dialogo-edicion>
    </v-flex>
  </v-layout>
</template>


<script>
/*El módulo de ventas solo permite visualizarlas y editarlas*/
/*Para agregar una o eliminarla se debe utilizar un cliente como Postman*/
import axios from 'axios';
//Librería date-fns para manejar fechas
import { format, parseISO } from "date-fns";
import DialogoEdicion from "../DialogosValidacion/DialogoEdicion.vue";
export default {
  name: "Ventas",
  components: {
    DialogoEdicion,
  },
  data() {
    return {

      headers: [
        { text: "Descripción", value: "descripcion", sortable: false },
        { text: "Moneda", value: "moneda", sortable: false },
        { text: "Monto", value: "monto", sortable: false },
        { text: "Fecha", value: "fecha", sortable: false },
        { text: "Editar", value: "edit", sortable: false },
         { text: "", value: "detalle", sortable: false },
      ],
      //Transacción asociada a las ventas
      transaccion: {
        id: "",
        nombre: "",
      },
      //Lista de ventas a mostrar
      ventas: [
         
        ],

      //Parámetros de ruta
      tipoTransaccionRuta: "",
      transaccionRuta: "",


      //Animaciones y texto de cargando
      cargandoLista: false,
      cargandoEdicion: false,
      textoCargandoLista: "Cargando ventas",

      //--Edición--//
      //REGLAS
      reglaEditDescripcion: [
        (v) => !!v || "La descripcion es requerida.",
        (v) =>
          (v && v.length <= 200 && v.length > 1) ||
          "Debe contener menos de 200 caracteres.",
        (v) =>
          /^[^\s]+(\s+[^\s]+)*$/.test(v) ||
          "No deben haber espacios al inicio o al final.",
      ],
      //Validación con expresiones regulares para que
      // el precio requiera de 2 decimales con un punto: "50.00"
      reglaMonto: [
        (v) => !!v || "El monto es requerido",
        (v) =>
          /^\d{1,8}\.\d{2}$/.test(v) || "El precio debe tener la forma: 50.00.",
      ],
      reglaMoneda:[
        (v) => !!v || "El monto es requerido",
        (v) =>
          /^[^\s]+(\s+[^\s]+)*$/.test(v) ||
          "No deben haber espacios al inicio o al final.",
      ],
      // Tipo de moneda en el combo box del form de edición
      listaMoneda: ["S/.", "US$"],

      //Propiedades v-datetime-picker//
      textFieldProps: {
        appendIcon: "event",
        rules: [
          (v) => !!v || "La fecha es requerida"
        ]
      },
      datePickerProps: {
        locale: "es",
      },
      //////////////////

      //Fecha y hora que cambia de acuerdo a lo seleccionado en el v-datetime-picker
      fechaConFormato: null,
      

      //Diálogos de edición
      //Variables para mostrar los diálogos
      dialogoEdicion: false, //Formulario
      dialogoConfirmarEdicion: false, //Confirmación

      //Formulario de edición valida
      formValido: false,

      //Modelo de venta para la edición
      venta:{
          id: "",
          monto: 0.0,
          moneda:"",
          descripcion:"",
          fecha:null
      },

    };
  },
  created(){
     //Extracción del valor de una variable en Vuex store (Ubicación: store.js)
      this.transaccion.id = this.$store.state.transaccion.transaccion_id;
      this.transaccion.nombre = this.$store.state.transaccion.nombre_transaccion;
      this.tipoTransaccionRuta = this.$route.params.tipoTransaccion;
      this.transaccionRuta = this.$route.params.transaccion;
      this.listar()
  },
  computed:{
    //Modificando en tiempo de ejecución la lista real de ventas
    // Se modifica la fecha primero a un formato ISO
    //  y luego se cambia a este formato: Nov 25, 2020, 1:25:00 PM
    ventasComputadas(){
      return this.ventas.map(venta => {

        var fechaVenta = parseISO(String(venta.fecha));
        return {
          id: venta.id,
          //Monto de venta con dos decimales
          monto: parseFloat(venta.monto).toFixed(2),
          moneda: venta.moneda,
          fecha: format(fechaVenta, "PPpp", { code: "es" }),
          descripcion: venta.descripcion
        }
  
      }); 
    }
  },
  methods: {
    volverATransacciones(){
        this.$router.push(`/tipo-transacciones/${this.tipoTransaccionRuta}`)
    },
    verDetalle(item){
     
       //Método para cambiar el valor de una variable guardada en Vuex store (Ubicación: store.js)
      this.$store.commit("changeValueOfVenta", {venta_id: item.id, descripcion_venta: item.descripcion});
       this.$router.push("/tipo-transacciones/" + this.tipoTransaccionRuta + 
      "/" + this.transaccionRuta + "/ventas/detalle");
    },
    listar() {
      this.cargandoLista = true;
      axios.get("venta/transaccion/" + this.transaccion.id)
      .then(response => {
        if(response.data.length > 0){
          this.ventas = response.data;
        }
        this.cargandoLista = false;
      })
      .catch(error => {
        console.log(error)
      })
    },


    //Edición
    abrirDialogoEdicion(item){
      this.venta.id = item.id;
      this.venta.descripcion = item.descripcion;
      this.venta.monto = item.monto;
      this.venta.moneda = item.moneda;
      this.fechaConFormato = new Date(item.fecha)
      this.setFecha();
      this.dialogoEdicion = true;
    },

    abrirDialogoConfirmarEdicion(){
      //Visualizar validaciones si hay algún error
      this.$refs.form.validate();
      if(this.formValido){
        this.dialogoConfirmarEdicion = true;
      }
    },
    //Inicializar el modelo de venta con la fecha del datetime-picker
    setFecha(){
        this.venta.fecha = this.fechaConFormato;
    },
    editar() {
      this.dialogoConfirmarEdicion = false;
      this.cargandoEdicion = true;
 
      axios.put("venta/" + this.venta.id, {
        descripcion: this.venta.descripcion,
        monto: parseFloat(this.venta.monto),
        moneda: this.venta.moneda,
        fecha: this.venta.fecha,
      })
      .then(response => {
        this.cargandoEdicion = false;
        this.dialogoEdicion = false;
        this.listar();
        this.$alert("Edición exitosa", "Exitoso", "success");
      })
      .catch(error => {
        console.log(error);
      })
    },

  
  },
};
</script>