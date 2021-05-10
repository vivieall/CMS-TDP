<template>
  <v-layout align-start>
    <v-flex>
      <v-container>
        <v-list-item>Nuevo tipo de servicio</v-list-item>
        <v-toolbar flat color="white">

           <!--Botón de retorno a lista de tipos de servicio-->
          <v-btn @click="returnToList">
            <v-icon>reply</v-icon>
          </v-btn>

          <v-spacer></v-spacer>

          <!--Animación de cargando - Creación de Tipo de servicio-->
          <v-progress-circular
            v-if="cargandoCreacion"
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>

        </v-toolbar>
        <v-divider></v-divider>

        <!--Formulario de registro de Tipo de servicio-->
        <v-form v-model="validForm" ref="form">
          <v-row class="first_row">
            <v-col lg="2">
              <p>Nombre</p>
            </v-col>
            <v-col>
              <v-text-field
                :rules="nombreReglas"
                v-model="servicio.nombre"
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
                v-model="servicio.descripcion"
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

      <!--Diálogo de confirmación - Creación de tipo de servicio-->
      <dialogo-insercion
        :dialog="validInsertion"
        v-on:close="validInsertion = false"
        v-on:guardarValido="confirmarGuardado"
        titulo="servicio"
      >
      </dialogo-insercion>
    </v-flex>
  </v-layout>
</template>

<script>
import DialogoInsercion from "../DialogosValidacion/DialogoInsercion.vue";
import axios from "axios";
export default {
  name: "TipoServicio_Post",
  components: {
    DialogoInsercion,
  },
  data() {
    return {
      //Para mostrar animación de cargando
      cargandoCreacion: false,

      
      //Modelo para la creación del servicio
      servicio: {
        nombre: "",
        descripcion: "",
      },
      
      //Validaciones del formulario
      nombreReglas: [
        (v) => !!v || "El nombre es requerido",
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

      validForm: false, //Campos del formulario válidos
      validInsertion: false, //Abre el diálogo para confirmar la creación
    };
  },
  methods: {
    
    abrirDialogoInsercion() {
      //Muestra las validaciones del form si los campos no son válidos
      this.$refs.form.validate();
      if (this.validForm) {
        this.validInsertion = true;
        console.log(this.servicio);
      }
    },

    guardar() {
      axios
        .post("tipo-servicio", this.servicio)
        .then((response) => {
          this.cargandoCreacion = false;
          this.returnToList();
          this.$alert("Registro exitoso", "Exitoso","success");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    confirmarGuardado() {
      if (this.validForm) {
        this.cargandoCreacion = true;
        this.validInsertion = false;
        this.guardar();
      }
    },

    returnToList() {
      this.$router.push("/servicios");
    },
  },
};
</script>
