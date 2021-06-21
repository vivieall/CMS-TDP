<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat>
        <v-btn @click="volverACheckIn" style="margin-right: 15px">
          <v-icon>reply</v-icon>
        </v-btn>
        <v-toolbar-title>Nuevo Check-In</v-toolbar-title>
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
              <p v-if="checkIn.huesped.nombre">
                <b>{{
                  checkIn.huesped.nombre + " " + checkIn.huesped.apellido
                }}</b>
              </p>
              <v-btn
                color="blue-grey lighten-4"
                medium
                v-on:click="dialogoHuepedesAbierto = !dialogoHuepedesAbierto"
                >SELECCIONAR HUÉSPED</v-btn
              >
            </v-col>

            <v-col>
              <p>Nº Habitación</p>
              <p v-if="!habitacionIngresada" class="mensaje-error">
                Debe seleccionar una habitación
              </p>
              <p v-if="checkIn.habitacion.numerohabitacion">
                <b>{{ checkIn.habitacion.numerohabitacion }}</b>
              </p>
              <v-btn
                color="blue-grey lighten-4"
                medium
                v-on:click="dialogoHabitacionesAbierto = !dialogoHabitacionesAbierto"
                >SELECCIONAR HABITACIÓN</v-btn
              >
            </v-col>
          </v-row>
          <v-row>
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
      titulo="check-in"
    ></dialogo-insercion>

    <dialogo-busqueda-huespedes
      :dialog="dialogoHuepedesAbierto"
      v-on:dialogoCerrado="dialogoHuepedesAbierto = false"
      v-on:huespedEnviado="setHuesped"
    >
    </dialogo-busqueda-huespedes>

    <dialogo-busqueda-habitaciones
      :dialog="dialogoHabitacionesAbierto"
      v-on:dialogoCerrado="dialogoHabitacionesAbierto = false"
      v-on:habitacionEnviada="setHabitacion"
    >
    </dialogo-busqueda-habitaciones>
  </v-layout>
</template>

<script>
import axios from "axios";
import { format, parseISO } from "date-fns";
import DialogoInsercion from "../DialogosValidacion/DialogoInsercion.vue";
import DialogoBusquedaHuespedes from "../reservas/DialogoBusquedaHuespedes.vue";
import DialogoBusquedaHabitaciones from "../habitaciones/DialogoBusquedaHabitaciones.vue";
export default {
  name: "CheckIn_Post",
  components: {
    DialogoInsercion,
    DialogoBusquedaHuespedes,
    DialogoBusquedaHabitaciones,
  },
  data() {
    return {
      
      //Variables de los datetime-pickers
      tiempoInicioConFormato: null,
      tiempoFinConFormato: null,

      //Modelo de checkin
      checkIn: {
        tiempoInicio: null,
        tiempoFin: null,
        huesped: {},
        habitacion: {},
      },

      //Propiedades v-datetime-picker
      datePickerProps: {
        locale: "es",
      },

      //Inserción
     
      formValido: false,  //Define si los campos son validos en el formulario

      //Propiedades de cada datetime-picker
      textFieldInicioProps: {
        prependInnerIcon: "event",
        solo: true,
        rules: [
          (v) => !!v || "La fecha de inicio es requerida",
          (v) =>
            this.validacionFecha(v) ||
            "La fecha de inicio debe ser menor a la fecha de fin",
        ],
      },
      textFieldFinProps: {
        prependInnerIcon: "event",
        solo: true,
        rules: [
          (v) => !!v || "La fecha de fin es requerida",
          (v) =>
            this.validacionFecha(v) ||
            "La fecha de fin debe ser mayor a la fecha de inicio",
        ],
      },

      //Valida que un huésped y una habitación fueron seleccionados para crear un checkIn
      huespedIngresado: true,
      habitacionIngresada: true,

      mostrarDialogoInsercion: false, //Mostrar diálogo de confirmacion
      dialogoHuepedesAbierto: false, //Mostrar diálogo de selección de huéspedes
      dialogoHabitacionesAbierto: false,//Mostrar diálogo de selección de habitaciones
      cargandoCreacion: false, //Animación de cargando
    };
  },
  created() {},
  watch: {
    //Si se cambia el valor de "tiempoInicioConFormato" y "tiempoFinConFormato" no es nulo,
    // se mostrarán los mensajes respectivos en caso no cumplam con "validacionFecha()"
    tiempoInicioConFormato(value) {
      if(this.tiempoFinConFormato != null){
        this.$nextTick(() => {
        this.$refs.form.validate();
      });
      }
      this.checkIn.tiempoInicio = value;
    },
    //Es el caso contrario al anterior, pero la misma lógica
    tiempoFinConFormato(value) {
      if(this.tiempoInicioConFormato != null){
      this.$nextTick(() => {
        this.$refs.form.validate();
      });
      }
      this.checkIn.tiempoFin = value;
    },
  },
  methods: {
    volverACheckIn() {
      this.$router.push("/check-in");
    },
    //Diálogo de huéspedes
    abrirDialogoHuespedes() {
      console.log("Dialogo de huespedes");
      this.dialogoHuepedesAbierto = true;
    },
    //Se inicializan el huésped y la habitación de checkIn después de seleccionarlos en 
    // el respectivo diálogo de selección
    setHuesped(huesped) {
      this.checkIn.huesped = huesped;
      this.dialogoHuepedesAbierto = false;
      this.huespedIngresado = true;
    },
    setHabitacion(habitacion) {
      this.checkIn.habitacion = habitacion;
      this.dialogoHabitacionesAbierto = false;
      this.habitacionIngresada = true;
    },
    //Inserción
    //Si la fecha de inicio es mayor a la de fin o viceversa,
    //entonces se mostrará el mensaje respectivo de fechas invalidas
    /// La condición no actúa si las fechas tienen valor null
    validacionFecha(v) {
      if (
        this.tiempoInicioConFormato != null &&
        this.tiempoFinConFormato != null
      ) {
        if (this.tiempoInicioConFormato.getTime() < this.tiempoFinConFormato.getTime()) {
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
      if(!this.checkIn.huesped.nombre){
        this.huespedIngresado = false;
        this.formValido = false;
      }
      if(!this.checkIn.habitacion.numerohabitacion){
        this.habitacionIngresada = false;
        this.formValido = false;
      }

      if (this.formValido) {
        this.mostrarDialogoInsercion = true;
      }
    },
    guardar() {
      this.mostrarDialogoInsercion = false;
      this.cargandoCreacion = true;
      var checkInPost = {
        tiempo_inicio: this.checkIn.tiempoInicio,
        tiempo_fin: this.checkIn.tiempoFin,
        huesped: {
          id: this.checkIn.huesped.id,
        },
        habitacion: this.checkIn.habitacion.id,
      };
      axios
        .post("checkin", checkInPost)
        .then((response) => {
          if (response) {
            this.inhabilitarHabitacion();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //Inhabilita la habitación que ha sido reservada en el checkin para que no pueda
    // mostrarse de nuevo en la lista
    inhabilitarHabitacion() {
      axios
        .put("habitacion/" + this.checkIn.habitacion.id, {
          activo: false,
        })
        .then((response) => {
          this.cargandoCreacion = false;
          this.volverACheckIn();
          this.$alert("Registro exitoso", "Exitoso", "success");
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
