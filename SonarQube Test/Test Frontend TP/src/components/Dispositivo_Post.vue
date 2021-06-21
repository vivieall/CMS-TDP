<template>
  <v-layout align-start>
    <v-flex>
      <v-container>
        <v-list-item>Nuevo dispositivo</v-list-item>
        <v-toolbar flat color="white">
          <!--Botón de retorno a lista de dispositivos-->
          <v-btn @click="retornar">
            <v-icon>reply</v-icon>
          </v-btn>
          <v-spacer></v-spacer>

          <!--Animación de cargando - Creación de Dispositivo-->
          <v-progress-circular
            v-if="cargandoCreacion"
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>

        </v-toolbar>

        <v-divider></v-divider>

        <!--Formulario de registro de dispositivo-->
        <v-form v-model="validForm" ref="form">
          <v-row class="first_row">
            <v-col lg="2">
              <p>Nombre</p>
            </v-col>
            <v-col>
              <v-text-field
                :rules="nombreReglas"
                v-model="dispositivo.nombre"
                label="Nombre"
                required
                solo
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col lg="2">
              <p>Descripción</p>
            </v-col>
            <v-col>
              <v-textarea
                :rules="descripcionReglas"
                v-model="dispositivo.descripcion"
                label="Descripción"
                required
                solo
                rows="1"
                auto-grow
                row-height="12"
              ></v-textarea>
            </v-col>
          </v-row>
        <!--Formulario de registro de dispositivo
         <v-row>
            <v-col lg="2">
              <p>Asignación Contenido</p>
            </v-col>
            <v-col>
              <v-select
                v-model="selected_Contenido"
                :items="asignacion-contenido"
                item-text="id"
                item-value="id"
                label="Seleccionar asignación contenido"
                persistent-hint
                return-object
                single-line
                required
              ></v-select>
            </v-col>
         </v-row> --->

          <v-row>
            <v-col>
              <v-btn
                medium
                color="indigo white--text"
                @click="abrirDialogoInsercion"
              >
                Guardar
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>

      <!--Diálogo de confirmación - Creación de dispositivo-->
      <dialogo-insercion
        :dialog="validInsertion"
        v-on:close="validInsertion = false"
        v-on:guardarValido="guardar"
        titulo="dispositivo"
      >
      </dialogo-insercion>
    </v-flex>
  </v-layout>
</template>


<script>
import axios from "axios";
import DialogoInsercion from "./DialogosValidacion/DialogoInsercion.vue";
export default {
  name: "Dispositivo_Post",
  components: {
    DialogoInsercion,
  },
  data() {
    return {
    contenido: [],
    asignacion_contenido: '',
    idasignacion_contenido: 0,
    nombre_contenido:"",

      //Para mostrar animación de cargando
      cargandoCreacion: false,

      //Modelo para la creación del dispositivo
      dispositivo: {
        nombre: "",
        descripcion: "",
      },
      //Tipo de dispositivo asociado
      tipoDispositivo: {
        id: "",
        nombre: "",
      },

      //Parámetro de ruta
      nombreRutaTipoDispositivo: "",

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

      validInsertion: false, //Abre el diálogo para confirmar la creación
      validForm: false, //Campos del formulario válidos
    };
  },
  created() {
    this.listar_asignacion_contenido();
  },
  methods: {

listar_asignacion_contenido() {
      let me=this;
      axios
      .get("/asignacion-contenido/")
      .then(function(response){
        me.asignacion_contenido=response.data;
        })
      .catch(function(error){console.log(error);
      });
    },

    abrirDialogoInsercion() {
      //Activa las validaciones del form
      this.$refs.form.validate();
      if (this.validForm) {
        this.validInsertion = true;
      }
    },
    guardar() {
      this.validInsertion = false;
      this.cargandoCreacion = true;
      if (this.validForm) {
        axios
          .post("/dispositivo", {
            nombre: this.dispositivo.nombre,
            descripcion: this.dispositivo.descripcion,
            id: "3ed451a1-e7a1-427a-9cf7-1079f5a9409b",
            //asignacioncontenido: {
            //  id: this.id
            //},
          })
          .then((response) => {
            this.cargandoCreacion = false;
            this.retornar();
            this.$alert("Registro exitoso", "Exitoso","success");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    retornar() {
      this.$router.push("/dispositivos");
    },
  },
};
</script>
