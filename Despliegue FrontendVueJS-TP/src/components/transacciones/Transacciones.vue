<template>
  <v-layout align-start>
    <v-flex>
      <v-btn @click="volverATiposDeTransaccion" style="margin: 6px 0px">
        <v-icon>reply</v-icon>
      </v-btn>
      <v-toolbar flat color="white">
        <v-toolbar-title>{{ tipoTransaccion.nombre }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn medium color="indigo white--text" @click="crearNuevo"
          >Agregar transacción</v-btn
        >
      </v-toolbar>

      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="transacciones"
        :loading="cargandoLista || cargandoEliminacion"
        :loading-text="textoDeCargando"
        no-data-text="No hay transacciones"
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

        <template v-slot:[`item.productos`]="{ item }">
          <v-btn elevation="2" color="blue-grey lighten-4" 
            medium @click.stop.prevent="verProductos(item)">VER PRODUCTOS</v-btn>
        </template>

        <template v-slot:[`item.ventas`]="{ item }">
          <v-btn elevation="2" color="blue-grey lighten-4" 
            medium @click.stop.prevent="verVentas(item)">VER VENTAS</v-btn>
        </template>
      </v-data-table>

      <!-- Diálogo de edición -->
      <v-dialog v-model="dialogoEdicion" max-width="700px">
        <v-card :loading="cargandoEdicion">
          <v-card-title>
            <span>Edición de transacción</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form v-model="edicionValida" ref="form">
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    v-model="transaccion.nombre"
                    label="Nombre"
                    :rules="reglaEditNombre"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-textarea
                    v-model="transaccion.descripcion"
                    label="Descripción"
                    :rules="reglaEditDescripcion"
                    rows="1"
                    auto-grow
                    row-height="12"
                  ></v-textarea>
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
        titulo="transacción"
        @editarValido="editar"
      >
      </dialogo-edicion>

      <!--Diálogo de eliminación-->
      <dialogo-eliminacion
        :dialog="dialogoConfirmarEliminacion"
        titulo="transacción"
        @close="dialogoConfirmarEliminacion = false"
        @borrarValido="eliminar"
      >
      </dialogo-eliminacion>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios';
import DialogoEdicion from "../DialogosValidacion/DialogoEdicion.vue";
import DialogoEliminacion from "../DialogosValidacion/DialogoEliminacion.vue";
export default {
  name: "Transacciones",
  components: {
    DialogoEdicion,
    DialogoEliminacion,
  },
  data() {
    return {
      headers: [
        { text: "Nombre", value: "nombre" , sortable: false },
        { text: "Descripción", value: "descripcion", sortable: false  },
        { text: "Editar", value: "edit", sortable: false  },
        { text: "Eliminar", value: "delete", sortable: false  },
        { text: "Productos", value: "productos", align: "center", sortable: false },
        { text: "Ventas", value: "ventas", align: "center", sortable: false  },
      ],

      textoDeCargando: "Cargando transacciones",

      //Lista
      transacciones: [
        //{ id: "123", nombre: "sadgsg", descripcion: "Descrisadgsadpción" },
      ],

      //Tipo de transacción asociado
      tipoTransaccion: {
          id: "",
          nombre: ""
      },
      nombreTipoTransaccionRuta: "",

      //Animaciones de cargando
      cargandoLista: false,
      cargandoEdicion: false,
      cargandoEliminacion: false,

      //Edición
      ///Activadores de diálogos
      dialogoEdicion: false,
      dialogoConfirmarEdicion: false,

      //Eliminación
      id_delete: "",
      dialogoConfirmarEliminacion: false,

      //Validación form
      edicionValida: false,

      ///Modelo
      transaccion: {
        id: "",
        nombre: "",
        descripcion: "",
      },
      //Reglas
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
    };
  },
  created(){
     //Extracción del valor de una variable en Vuex store (Ubicación: store.js)
      this.tipoTransaccion.id = this.$store.state.tipoTransaccion.tipo_transaccion_id;
      this.tipoTransaccion.nombre = this.$store.state.tipoTransaccion.nombre_tipo_transaccion;
      this.nombreTipoTransaccionRuta = this.$route.params.tipoTransaccion;
      this.listar();
 },    
  methods: {
    crearNuevo() {
      this.$router.push("/tipo-transacciones/" + this.nombreTipoTransaccionRuta + "/nuevo");
    },
    volverATiposDeTransaccion(){
      this.$router.push("/tipo-transacciones");
    },
    procesarRuta(item){
      //Convertir el texto a minúscula y reemplazar los espacios por guión bajo
      var transaccionRuta = item.nombre.toLowerCase().replace(/ /g,"-");
      //Método para cambiar el valor de una variable guardada en Vuex store (Ubicación: store.js)
      this.$store.commit("changeValueOfTransaction", {transaccion_id: item.id, nombre_transaccion: item.nombre});
      return transaccionRuta;
    },

    verProductos(item){
      var transaccionRuta = this.procesarRuta(item);
      this.$router.push("/tipo-transacciones/" + this.nombreTipoTransaccionRuta + 
      "/" + transaccionRuta + "/productos");
    },
    verVentas(item){
     var transaccionRuta = this.procesarRuta(item);
      this.$router.push("/tipo-transacciones/" + this.nombreTipoTransaccionRuta + 
      "/" + transaccionRuta + "/ventas");
    },

    //Listar
    listar(){
      this.cargandoLista = true;
      axios.get("tipo-transaccion/" + this.tipoTransaccion.id)
      .then(response => {
        if(response.data.transaccion.length > 0){
          this.transacciones = response.data.transaccion;
        }
        this.cargandoLista = false;
      })
      .catch(error =>{
        console.log(error);
      })
    },

    //Editar
    abrirDialogoEdicion(item) {
      this.transaccion.id = item.id;
      this.transaccion.nombre = item.nombre;
      this.transaccion.descripcion = item.descripcion;
      this.dialogoEdicion = true;
    },
    abrirDialogoConfirmarEdicion() {
      this.$refs.form.validate();
      if(this.edicionValida){
        this.dialogoConfirmarEdicion = true;
      }
    },
    editar() {
      this.cargandoEdicion = true;
      this.dialogoConfirmarEdicion = false;
      axios.put("transaccion/" + this.transaccion.id,
      {
        nombre: this.transaccion.nombre,
        descripcion: this.transaccion.descripcion,
        tipotransaccion:{
          id: this.tipoTransaccion.id
        }
      })
      .then(response => {
        this.cargandoEdicion = false;
         this.dialogoEdicion = false;
         this.listar();
         this.$alert("Edición exitosa", "Exitoso", "success");
      }).catch(error =>{
        console.log(error);
      })
     
    },

    //Eliminar
    abrirDialogoEliminacion(id) {
      this.id_delete = id;
      this.dialogoConfirmarEliminacion = true;
    },
    eliminar() {
      this.dialogoConfirmarEliminacion = false;
      this.cargandoEliminacion = true;
      axios.delete("transaccion/" + this.id_delete)
      .then(response => {
        this.cargandoEliminacion = false,
        this.listar();
        this.$alert("Eliminación exitosa", "Exitoso", "success");
      })
    },
  },
};
</script>