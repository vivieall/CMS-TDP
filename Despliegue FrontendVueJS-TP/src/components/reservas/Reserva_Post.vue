<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat>
        <v-btn @click="volverAReservas" style="margin-right: 15px">
          <v-icon>reply</v-icon>
        </v-btn>
        <v-toolbar-title>Reserva de {{ nombreServicio }}</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-progress-circular
          v-if="cargandoCreacion"
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-toolbar>
      <v-divider></v-divider>

      <v-container>
        <v-form v-model="formValido" ref="form">
          <v-row>
            <v-col>
              <p>Descripción</p>
              <v-textarea
                v-model="reserva.descripcion"
                :rules="reglasDescripcion"
                solo
                rows="1"
                auto-grow
                row-height="12"
                label="Inserte la descripción de la reserva"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm="12" md="6" xs="3">
              <p>Fecha y hora de inicio</p>
              <v-datetime-picker
                v-model="tiempoInicioConFormato"
                :textFieldProps="textFieldInicioProps"
                label="Selecciona fecha y hora de inicio"
                :datePickerProps="datePickerProps"
                date-format="dd/MM/yyyy"
                clearText="Cancelar"
                okText="Aceptar"
              ></v-datetime-picker>
            </v-col>
            <v-col sm="12" md="6" xs="3">
              <p>Fecha y hora de fin</p>
              <v-datetime-picker
                v-model="tiempoFinConFormato"
                :textFieldProps="textFieldFinProps"
                label="Selecciona fecha y hora de fin"
                :datePickerProps="datePickerProps"
                date-format="dd/MM/yyyy"
                clearText="Cancelar"
                okText="Aceptar"
              ></v-datetime-picker>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <p>Huésped</p>
              <p v-if="!huespedIngresado" class="mensaje-error">
                Debe seleccionar un huésped
              </p>
              <p v-if="reserva.huesped.nombre">
                <b>{{
                  reserva.huesped.nombre + " " + reserva.huesped.apellido
                }}</b>
              </p>
              <v-btn
                color="blue-grey lighten-4"
                medium
                v-on:click="dialogoHuepedesAbierto = !dialogoHuepedesAbierto"
                >SELECCIONAR HUÉSPED</v-btn
              >
            </v-col>
            <v-col align-self="center">
              <v-btn
                large
                color="indigo white--text"
                @click="abrirDialogoConfirmarInsercion"
                style="margin-top: 15px"
              >
                Guardar
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-flex>

    <dialogo-insercion
      :dialog="mostrarDialogoInsercion"
      v-on:close="mostrarDialogoInsercion = false"
      v-on:guardarValido="guardar"
      titulo="reserva"
    ></dialogo-insercion>

    <dialogo-busqueda-huespedes
      :dialog="dialogoHuepedesAbierto"
      v-on:dialogoCerrado="dialogoHuepedesAbierto = false"
      v-on:huespedEnviado="setHuesped"
    >
    </dialogo-busqueda-huespedes>
  </v-layout>
</template>

<script>
import axios from "axios";
import { format, parseISO } from "date-fns";
import DialogoInsercion from "../DialogosValidacion/DialogoInsercion.vue";
import DialogoBusquedaHuespedes from "./DialogoBusquedaHuespedes.vue";
export default {
  name: "Reserva_Post",
  components: {
    DialogoInsercion,
    DialogoBusquedaHuespedes,
  },
  data() {
    return {
      ///Mostrar menús de fecha, hora de inicio y hora de fin
      mostrarMenuFecha: false,
      mostrarMenuHoraInicio: false,
      mostrarMenuHoraFin: false,
      //Variables de los datetimepicker
      tiempoInicioConFormato: null,
      tiempoFinConFormato: null,
      //Modelo de reserva a crear
      reserva: {
        descripcion: "",
        tiempoInicio: null,
        tiempoFin: null,
        huesped: {},
        servicio: {
          id: "",
        },
      },
      
      //Propiedades v-datetime-picker
        textFieldInicioProps: {
          solo: true,
          prependInnerIcon: "event",
          rules: [
            (v) => !!v || "El tiempo de inicio es requerido",
            (v) =>
              this.validacionFecha(v) ||
              "El tiempo de inicio debe ser menor a la fecha de fin",
          ],
        },
        textFieldFinProps: {
          solo: true,
          prependInnerIcon: "event",
          //Reglas de fecha y hora
          rules: [
            (v) => !!v || "El tiempo de fin es requerido",
            (v) =>
              this.validacionFecha(v) ||
              "El tiempo de fin debe ser mayor a la fecha de inicio",
          ],
        },
      datePickerProps: {
        locale: "es",
      },


      //Campos validos en el formulario
      formValido: false,

      //Reglas
      reglasDescripcion: [
        (v) => !!v || "La descripción es requerida.",
        (v) =>
          (v && v.length <= 200) || "Debe contener menos de 200 caracteres.",
        (v) =>
          /^[^\s]+(\s+[^\s]+)*$/.test(v) ||
          "No deben haber espacios al inicio o al final.",
      ],
      reglasFecha: [(v) => !!v || "La fecha es requerida."],
      reglasHora: [(v) => !!v || "La hora es requerida."],

      //Inserción
      huespedIngresado: true,

      mostrarDialogoInsercion: false, //Abrir diálogo de confirmación
      dialogoHuepedesAbierto: false, //Abrir diálogo para buscar y escoger un huésped
      cargandoCreacion: false, //Animación de cargando
    };
  },
  computed: {
    nombreServicio() {
      return this.$store.state.servicio.nombre_servicio;
    },

  },
  watch:{
    tiempoInicioConFormato(value){
      if(this.tiempoFinConFormato != null){
      this.$nextTick(() => {
        this.$refs.form.validate();
      });
      }
      this.reserva.tiempoInicio = this.tiempoInicioConFormato;
    },
    tiempoFinConFormato(value){
      if(this.tiempoInicioConFormato != null){
      this.$nextTick(() => {
        this.$refs.form.validate();
      });
      }
      this.reserva.tiempoFin = this.tiempoFinConFormato;
    }
  },
  created() {
    this.reserva.servicio.id = this.$store.state.servicio.servicio_id;
  },
  methods: {
    volverAReservas() {
      var tipoServicio = this.$route.params.tipoServicio;
      var servicio = this.$route.params.servicio;
      this.$router.push(
        "/servicios/" + tipoServicio + "/" + servicio + "/reservas"
      );
    },

    //Diálogo de huéspedes
    abrirDialogoHuespedes() {
      this.dialogoHuepedesAbierto = true;
    },
    setHuesped(huesped) {
      this.reserva.huesped = huesped;
      this.dialogoHuepedesAbierto = false;
      this.huespedIngresado = true;
    },

    //Inserción

    ///Validaciones de campos
    //Si la fecha de inicio es mayor a la de fin o viceversa, 
    //entonces se mostrará el mensaje respectivo de fechas invalidas
    validacionFecha(v) {
      if (
        this.tiempoInicioConFormato != null &&
        this.tiempoFinConFormato != null
      ) {
        if (
          this.tiempoInicioConFormato.getTime() <
          this.tiempoFinConFormato.getTime()
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    abrirDialogoConfirmarInsercion() {
      this.$refs.form.validate();
      if(!this.reserva.huesped.nombre){
        this.huespedIngresado = false;
      }
      if (this.formValido) {
        this.mostrarDialogoInsercion = true;
      }
    },
    guardar() {
      this.mostrarDialogoInsercion = false;
      this.cargandoCreacion = true;
      var reservaPost = {
        descripcion: this.reserva.descripcion,
        tiempo_inicio: this.reserva.tiempoInicio,
        tiempo_fin: this.reserva.tiempoFin,
        huesped: {
          id: this.reserva.huesped.id,
        },
        servicio: {
          id: this.reserva.servicio.id,
        },
        cantidadpersona: 2,
      };

      axios
        .post("reserva-servicio", reservaPost)
        .then((response) => {
          if (response) {
            this.cargandoCreacion = false;
            this.volverAReservas();
            this.$alert("Registro exitoso", "Exitoso", "success");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.campo-hora {
  max-width: 300px;
}
.campo-fecha {
  max-width: 300px;
}
.mensaje-error{
  font-size: 12px; 
  color: #E53935;
}

</style>
