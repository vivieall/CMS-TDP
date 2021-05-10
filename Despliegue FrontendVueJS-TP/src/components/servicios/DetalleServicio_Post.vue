<template>
  <v-layout align-start>
    <v-flex>
      <v-container>
        <v-list-item>Nuevo Detalle</v-list-item>
        <v-list-item>Servicio: {{ servicio.nombre }}</v-list-item>
        <v-toolbar flat color="white">
          <!--Botón para volver a la lista de detalles-->
          <v-btn @click="returnToList">
            <v-icon>reply</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <!--Animación de cargando-->
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
                v-model="detalle.nombre"
                label="Nombre"
                required
                solo
                :rules="nombreReglas"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col lg="2">
              <p>Descripción</p>
            </v-col>

            <v-col>
              <v-textarea
                v-model="detalle.descripcion"
                label="Descripción"
                required
                solo
                :rules="descripcionReglas"
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
            >Guardar</v-btn
          >
        </v-form>
      </v-container>

    <!--Diálogo de confirmación - Creación de detalle de servicio-->
      <dialogo-insercion
        :dialog="validInsertion"
        v-on:close="validInsertion = false"
        v-on:guardarValido="guardar"
        titulo="detalle"
      >
      </dialogo-insercion>
    </v-flex>
  </v-layout>
</template>

<script>
import DialogoInsercion from "../DialogosValidacion/DialogoInsercion.vue";
import axios from "axios";
export default {
  name: "DetalleServicio_Post",
  components: {
    DialogoInsercion,
  },
  data() {
    return {
      //ParámetroS que se encuentra en la ruta de la vista
      nombreTipoServicio: "",
      nombreServicio: "",

      //Servicio asociado al detalle a crear
      servicio: {
        id: "",
        nombre: "",
      },
      
      //Cargando
      cargandoCreacion: false,

      //INSERCIÓN
      validForm: false,//Define que el form es válido
      validInsertion: false, //Abre el diálogo de confirmación
      
      //Reglas de los campos del form
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

      //Modelo de detalle para crearlo
      detalle: {
        nombre: "",
        descripcion: "",
      },
    };
  },
  created() {
    this.nombreServicio = this.$route.params.servicio;
    this.nombreTipoServicio = this.$route.params.tipoServicio;
    //Variables extraídas del Vuex Store (store.js)
    this.servicio.id = this.$store.state.servicio.servicio_id;
    this.servicio.nombre = this.$store.state.servicio.nombre_servicio;
  },
  methods: {
    abrirDialogoInsercion() {
      this.$refs.form.validate();
      if (this.validForm) {
        this.validInsertion = true;
      }
    },
    returnToList() {
      this.$router.push(
        `/servicios/${this.nombreTipoServicio}/${this.nombreServicio}`
      );
    },
    guardar() {
      if (this.validForm) {
        this.validInsertion = false;
        this.cargandoCreacion = true;
        axios
          .post("detalle-servicio", {
            nombre: this.detalle.nombre,
            descripcion: this.detalle.descripcion,
            servicio: {
              id: this.servicio.id,
            },
          })
          .then((response) => {
            this.cargandoCreacion = false;
            this.returnToList();
            this.$alert("Registro exitoso", "Exitoso","success");
          });
      }
    },
  },
};
</script>