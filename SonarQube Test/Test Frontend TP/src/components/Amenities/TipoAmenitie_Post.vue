<template>
  <v-layout align-start>
    <v-flex>
      <v-container>
        <v-list-item>Nuevo Amenitie</v-list-item>
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
                v-model="amenitie.nombre"
                label="Nombre"
                required
                solo
              ></v-text-field>
            </v-col>
          </v-row>

          <v-btn @click="abrirDialogoInsercion"> Guardar </v-btn>
        </v-form>
      </v-container>

      <dialogo-insercion
        :dialog="validInsertion"
        v-on:close="validInsertion = false"
        v-on:guardarValido="confirmarGuardado"
        :titulo="titulo"
      >
      </dialogo-insercion>
    </v-flex>
  </v-layout>
</template>

<script>
import DialogoInsercion from "../../components/DialogosValidacion/DialogoInsercion.vue";
import axios from "axios";
export default {
  name: "TipoAmenitie_Post",
  components: {
    DialogoInsercion,
  },
  data() {
    return {
      validInsertion: false,
      amenitie: {
        nombre: ""
      },
      file: null,
      validForm: false,
      cargandoCreacion: false,
      ///DIALOG INSERTION
      titulo: "amenitie",
      //REGLAS
      nombreReglas: [
        (v) => !!v || "El nombre es requerido",
        (v) => (v && v.length <= 50) || "Debe contener menos de 50 caracteres.",
        (v) =>
          /^[^\s]+(\s+[^\s]+)*$/.test(v) ||
          "No deben haber espacios al inicio o al final.",
      ],
    };
  },
  methods: {

    abrirDialogoInsercion() {
      this.$refs.form.validate();
      if (this.validForm) {
        this.validInsertion = true;
      }
    },
    guardar() {
      axios
        .post("tipo-amenitie", this.amenitie)
        .then((response) => {
          this.cargandoCreacion = false;
          this.returnToList();
          this.alerta_post();
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
      this.$router.push("/amenities");
    },
    alerta_post(){
        this.$alert("", "Agregacion Exitosa","success").then(() => console.log("Closed"));
    }
    
  },
};
</script>