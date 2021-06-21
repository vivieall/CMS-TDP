<template>
  <v-layout align-start>
    <v-flex>
      <v-container>
        <v-list-item>Nuevo tipo de transacción</v-list-item>

        <v-toolbar flat color="white">
          <v-btn @click="volverATipoTransacciones">
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
                v-model="tipoTransaccion.nombre"
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
                v-model="tipoTransaccion.descripcion"
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
        titulo="tipo de transacción"
      >
      </dialogo-insercion>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios';
import DialogoInsercion from "../DialogosValidacion/DialogoInsercion.vue";
export default {
  name: "TipoTransaccion_Post",
  components: {
    DialogoInsercion,
  },
  data() {
    return {
      //Modelo
      tipoTransaccion: {
        nombre: "",
        descripcion: "",
      },

      //Reglas
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

      //Inserción
      dialogoConfirmarInsercion: false,
      validForm: false,

      //Animación de cargando
      cargandoCreacion: false,
    };
  },
  methods: {
    volverATipoTransacciones() {
      this.$router.push("/tipo-transacciones");
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
      axios.post("tipo-transaccion", this.tipoTransaccion)
      .then(response => {
        this.cargandoCreacion = false;
        this.volverATipoTransacciones();
        this.$alert("Registro exitoso", "Exitoso","success");
      }).catch(error =>{
        console.log(error);
      })
    },
  },
};
</script>