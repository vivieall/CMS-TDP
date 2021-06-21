<template>
    <v-layout align-start>
    <v-flex>
      <v-container>
        <v-list-item>Nueva transacción</v-list-item>
         <v-list-item>Tipo de transacción: {{ tipoTransaccion.nombre }}</v-list-item>
        <v-toolbar flat color="white">
          <v-btn @click="returnToList">
            <v-icon>reply</v-icon>
          </v-btn>
          <v-spacer></v-spacer>

          <v-progress-circular
            v-if="cargandoCreacion"
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </v-toolbar>
        <v-divider></v-divider>
        <v-form v-model="validForm" ref="form">
          <v-row class="first_row">
            <v-col lg="2">
              <p>Nombre</p>
            </v-col>
            <v-col>
              <v-text-field
                :rules="nombreReglas"
                v-model="transaccion.nombre"
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
                v-model="transaccion.descripcion"
                label="Descripcion"
                required
                solo
                rows="1"
                auto-grow
                row-height="12"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-btn
            medium
            color="indigo white--text"
            @click="abrirDialogoInsercion"
          >
            Guardar
          </v-btn>
        </v-form>
      </v-container>

      <dialogo-insercion
        :dialog="dialogoConfirmarInsercion"
        v-on:close="dialogoConfirmarInsercion = false"
        v-on:guardarValido="guardar"
        titulo="transacción"
      >
      </dialogo-insercion>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios';
import DialogoInsercion from "../DialogosValidacion/DialogoInsercion.vue";
export default {
    name: "Transaccion_Post",
    components: {
    DialogoInsercion,
  },
  data() {
    return {
      //Formulario valido
      validForm: false,

      //Para mostrar rueda de cargando
      cargandoCreacion: false,

      //Objeto a ser guardado
      transaccion: {
        nombre: "",
        descripcion: "",
      },

      //Tipo de anuncio que se encuentra en el Vuex Store
      tipoTransaccion: {
        id: "",
        nombre: "",
      },

      nombreRutaTipoTransaccion: "",

      //Validaciones del formulario
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

      //// Dialogo inserción válida ////
      dialogoConfirmarInsercion: false,
      //Propiedad en el diálogo de confirmar creación
     
    };
  },
  created() {
    this.nombreRutaTipoTransaccion = this.$route.params.tipoTransaccion;
    this.tipoTransaccion.id = this.$store.state.tipoTransaccion.tipo_transaccion_id;
    this.tipoTransaccion.nombre = this.$store.state.tipoTransaccion.nombre_tipo_transaccion;
  },
  methods: {
    returnToList() {
      this.$router.push("/tipo-transacciones/" + this.nombreRutaTipoTransaccion);
    },
    abrirDialogoInsercion() {
      this.$refs.form.validate();
      if (this.validForm) {
        this.dialogoConfirmarInsercion = true;
      }
    },
    guardar() {
      this.dialogoConfirmarInsercion = false;
      this.cargandoCreacion = true;
      axios
          .post("transaccion", {
            nombre: this.transaccion.nombre,
            descripcion: this.transaccion.descripcion,
            tipotransaccion:{
              id: this.tipoTransaccion.id
            }
          })
          .then((response) => {
            this.cargandoCreacion = false;
            this.returnToList();
            this.$alert("Registro exitoso", "Exitoso","success");
          })
          .catch((error) => {
            console.log(error);
          });
    },
  },
};
</script>