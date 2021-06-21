<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Tipos de Transacción</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn medium color="indigo white--text" @click="crearNuevo"
          >Agregar tipo de transacción</v-btn
        >
      </v-toolbar>

      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="tipoTransacciones"
        :loading="cargandoLista || cargandoEliminacion"
        :loading-text="textoDeCargando"
        @click:row="verTransacciones"
        no-data-text="No hay tipos de transacción"
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
      </v-data-table>

      <!-- Diálogo de edición -->
      <v-dialog v-model="dialogoEdicion" max-width="700px">
        <v-card :loading="cargandoEdicion">
          <v-card-title>
            <span>Edición de tipo de transacción</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form v-model="edicionValida" ref="form">
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    v-model="tipoTransaccion.nombre"
                    label="Nombre"
                    :rules="reglaEditNombre"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-textarea
                    v-model="tipoTransaccion.descripcion"
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

      <!--Diálogo de confirmar edición-->
      <dialogo-edicion
        :dialog="dialogoConfirmarEdicion"
        @close="dialogoConfirmarEdicion = false"
        titulo="tipo de transacción"
        @editarValido="editar"
      >
      </dialogo-edicion>

      <!--Diálogo de eliminación-->
      <dialogo-eliminacion
        :dialog="dialogoConfirmarEliminacion"
        titulo="tipo de transacción"
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
  name: "TipoTransacciones",
  components: {
    DialogoEdicion,
    DialogoEliminacion,
  },
  data() {
    return {
      headers: [
        { text: "Nombre", value: "nombre", sortable: false  },
        { text: "Descripción", value: "descripcion", sortable: false  },
        { text: "Editar", value: "edit", sortable: false  },
        { text: "Eliminar", value: "delete", sortable: false  },
      ],

      //Lista
      tipoTransacciones: [
        //{ id: "123", nombre: "Nombre 1", descripcion: "Descripción" },
      ],
      //Texto de cargando
      textoDeCargando: "Cargando tipos de transacción",

      //Animaciones de cargando
      cargandoLista: false,
      cargandoEdicion: false,
      cargandoEliminacion: false,

      //Edición
      ///Activadores de diálogos
      dialogoEdicion: false,
      dialogoConfirmarEdicion: false,

      //Validación form
      edicionValida: false,

      ///Modelo
      tipoTransaccion: {
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
      //Eliminación
      id_delete: "",
      dialogoConfirmarEliminacion: false,

    };
  },
  created(){
    this.listar();
  },
  methods: {
    listar(){
      this.cargandoLista = true;
      axios.get("tipo-transaccion")
      .then(response => {
        if(response.data.length > 0){
          this.tipoTransacciones = response.data;
        }
        this.cargandoLista = false;
      }).catch(error =>{
        console.log(error);
      })
    },
    crearNuevo() {
      this.$router.push("/tipo-transacciones/nuevo");
    },
    verTransacciones(item){
      //Convertir el texto a minúscula y reemplazar los espacios por guión bajo
      var tipo = item.nombre.toLowerCase().replace(/ /g, "-");
      //Método para cambiar el valor de una variable guardada en Vuex store (Ubicación: store.js)
      this.$store.commit("changeValueOfTransactionType", {
          tipo_transaccion_id: item.id,
          nombre_tipo_transaccion: item.nombre,
      });
      this.$router.push("/tipo-transacciones/" + tipo);

    },

    //Editar
    abrirDialogoEdicion(item) {
      this.tipoTransaccion.id = item.id;
      this.tipoTransaccion.nombre = item.nombre;
      this.tipoTransaccion.descripcion = item.descripcion;

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
      axios.put("tipo-transaccion/" + this.tipoTransaccion.id,
      {
        nombre: this.tipoTransaccion.nombre,
        descripcion: this.tipoTransaccion.descripcion,
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
      axios.delete("tipo-transaccion/" + this.id_delete)
      .then(response => {
          this.cargandoEliminacion = false;
          this.listar();
          this.$alert("Eliminación exitosa", "Exitoso", "success");
      })
    },
  },
};
</script>