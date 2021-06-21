<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Check-In</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn
          medium
          color="indigo white--text"
          elevation="2"
          @click="crearCheckIn"
          >Agregar Check-In</v-btn
        >
      </v-toolbar>

      <v-data-table
        :headers="headers"
        :items="listaCheckInComputada"
        class="elevation-1"
        calculate-widths
        :loading="cargandoLista || cargandoEliminacion"
        loading-text="Cargando lista de check-in"
        no-data-text="No hay lista de check-in"
      >
        <template v-slot:[`item.huesped`]="{ item }">
          <p style="margin: auto 0px">
            {{ item.huesped.nombre + " " + item.huesped.apellido }}
          </p>
        </template>
        <template v-slot:[`item.habitacion`]="{ item }">
          <p style="margin: auto 0px">{{ item.habitacion.numerohabitacion }}</p>
        </template>
        <template v-slot:[`item.edit`]="{ item }">
          <v-btn icon @click.stop.prevent="abrirDialogoDeEdicion(item)">
            <v-icon>create</v-icon>
          </v-btn>
        </template>

        <template v-slot:[`item.delete`]="{ item }">
          <v-btn icon @click.stop.prevent="abrirDialogoDeEliminacion(item.id)">
            <v-icon>delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>

      <v-dialog v-model="dialogoEdicion" max-width="800px">
        <v-card :loading="cargandoEdicion">
          <v-card-title>
            <span>Edición de check-in</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form v-model="formValido" ref="form">
                <v-row>
                  <v-col sm="12" md="6" xs="3">
                    <p>Fecha y hora de inicio</p>
                    <v-datetime-picker
                      @input="setTiempoInicio"
                      v-model="tiempoInicioConFormato"
                      :textFieldProps="textFieldInicioProps"
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
                      @input="setTiempoFin"
                      :textFieldProps="textFieldFinProps"
                      :datePickerProps="datePickerProps"
                      date-format="dd/MM/yyyy"
                      clearText="Cancelar"
                      okText="Aceptar"
                    ></v-datetime-picker>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <p>
                      Huésped:
                      <b v-if="checkIn.huesped.nombre">{{
                        checkIn.huesped.nombre + " " + checkIn.huesped.apellido
                      }}</b
                      ><b v-else>...</b>
                    </p>
                    <v-text-field
                      label="Buscar huésped"
                      v-model="busquedaHuesped"
                    ></v-text-field>
                    <p>Lista de huéspedes</p>
                    <v-progress-circular
                      v-if="huespedes.length <= 0"
                      indeterminate
                      color="primary"
                    >
                    </v-progress-circular>
                    <v-list
                      v-if="huespedes.length > 0"
                      style="max-height: 220px"
                      class="overflow-y-auto"
                    >
                      <v-list-item-group v-model="index_huesped">
                        <template v-for="(item, index) in huespedesComputados">
                          <v-list-item
                            :key="item.id"
                            @change="setHuesped(item.id)"
                          >
                            <template v-slot:default="{ active }">
                              <v-list-item-content>
                                <v-list-item-title
                                  v-text="item.nombreCompleto"
                                ></v-list-item-title>
                              </v-list-item-content>

                              <v-list-item-action>
                                <v-icon v-if="!active"
                                  >check_circle_outline</v-icon
                                >
                                <v-icon v-else color="indigo"
                                  >check_circle</v-icon
                                >
                              </v-list-item-action>
                            </template>
                          </v-list-item>
                          <v-divider
                            v-if="index < huespedesComputados.length"
                            :key="index"
                          ></v-divider>
                        </template>
                      </v-list-item-group>
                    </v-list>
                  </v-col>
                  <v-col>
                    <p>
                      Habitación:
                      <b v-if="checkIn.habitacion.numerohabitacion">{{
                        checkIn.habitacion.numerohabitacion
                      }}</b>
                      <b v-else>...</b>
                    </p>
                    <!--Búsqueda de habitaciones-->
                    <v-text-field
                      v-model="busquedaHabitacion"
                      label="Buscar habitación"
                    ></v-text-field>
                    <p>Lista de habitaciones</p>
                    <v-progress-circular
                      v-if="habitaciones.length <= 0"
                      indeterminate
                      color="primary"
                    >
                    </v-progress-circular>
                    <!--Lista de habitaciones-->
                    <v-list
                      v-if="habitaciones.length > 0"
                      style="max-height: 220px"
                      class="overflow-y-auto"
                    >
                      <v-list-item-group v-model="index_habitacion">
                        <template
                          v-for="(item, index) in habitacionesComputadas"
                        >
                          <v-list-item
                            :key="item.id"
                            @change="setHabitacion(item.id)"
                          >
                            <template v-slot:default="{ active }">
                              <v-list-item-content>
                                <v-list-item-title
                                  v-text="item.numerohabitacion"
                                ></v-list-item-title>
                              </v-list-item-content>

                              <v-list-item-action>
                                <v-icon v-if="!active"
                                  >check_circle_outline</v-icon
                                >
                                <v-icon v-else color="indigo"
                                  >check_circle</v-icon
                                >
                              </v-list-item-action>
                            </template>
                          </v-list-item>
                          <v-divider
                            v-if="index < habitacionesComputadas.length"
                            :key="index"
                          ></v-divider>
                        </template>
                      </v-list-item-group>
                    </v-list>

                    <p style="margin-top: 5px">Opciones de edición</p>
                    <v-card-actions>
                      <v-btn
                        color="blue-grey lighten-4"
                        large
                        @click.native="cerrarDialogoEdicion"
                        >Cancelar</v-btn
                      >
                      <v-btn
                        color="blue-grey lighten-4"
                        large
                        @click.native="abrirDialogoConfirmarEdicion"
                        >Guardar</v-btn
                      >
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>

      <dialogo-edicion
        :dialog="dialogoConfirmarEdicion"
        @close="dialogoConfirmarEdicion = false"
        @editarValido="editar"
        titulo="check-in"
      >
      </dialogo-edicion>

      <dialogo-eliminacion
        :dialog="dialogoConfirmarEliminacion"
        titulo="check-in"
        @close="dialogoConfirmarEliminacion = false"
        @borrarValido="eliminar"
      ></dialogo-eliminacion>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import DialogoEdicion from "../DialogosValidacion/DialogoEdicion.vue";
import DialogoEliminacion from "../DialogosValidacion/DialogoEliminacion.vue";
import { format, parseISO } from "date-fns";
export default {
  name: "CheckIn",
  components: {
    DialogoEdicion,
    DialogoEliminacion,
  },
  data() {
    return {
      headers: [
        { text: "Huésped", value: "huesped", sortable: false },
        { text: "Habitación", value: "habitacion", sortable: false  },
        { text: "Tiempo de inicio", value: "tiempo_inicio", sortable: false  },
        { text: "Tiempo de fin", value: "tiempo_fin", sortable: false  },
        { text: "Editar", value: "edit", sortable: false  },
        { text: "Eliminar", value: "delete", sortable: false  },
      ],

      //Lista que se muestra en el v-data-table
      lista_checkin: [],

      //Mostrar animación de cargando
      cargandoLista: false,
      cargandoEdicion: false,
      cargandoEliminacion: false,

      //Eliminación
      ///Mostrar diálogo de confirmación
      dialogoConfirmarEliminacion: false,
      ///Id del checkIn a eliminar
      id_delete: "",

      //Edición
      ///Mostrar diálogo de edición
      dialogoEdicion: false,
      //Reglas formulario cumplidas
      formValido: false,
      ///Mostrar diálogo de confirmación
      dialogoConfirmarEdicion: false,
      //Cadena de texto para buscar al huésped
      busquedaHuesped: "",
      //Cadena de texto para buscar la habitación
      busquedaHabitacion: "",

      //Lista de huéspedes en diálogo de edición para escoger
      huespedes: [],
      //Huéspedes
      id_huesped_seleccionado: null,
      huesped_anterior: null,
      index_huesped: null,
      //Lista para escoger habitación
      habitaciones: [],
      index_habitacion: null,
      id_habitacion_seleccionada: null,
      habitacion_anterior: null,
      

      //Modelo de edición
      checkIn: {
        id: "",
        habitacion: {},
        tiempo_inicio: null,
        tiempo_fin: null,
        huesped: {},
      },
      //Variables de los datetime-pickers
      tiempoInicioConFormato: null,
      tiempoFinConFormato: null,
      

      //Propiedades v-datetime-picker
      textFieldInicioProps: {
        prependInnerIcon: "event",
        rules: [
          (v) => !!v || "La fecha de inicio es requerida",
          (v) =>
            this.validacionFecha(v) ||
            "La fecha de inicio debe ser menor a la fecha de fin",
        ],
      },
      textFieldFinProps: {
        prependInnerIcon: "event",
        rules: [
          (v) => !!v || "La fecha de fin es requerida",
          (v) =>
            this.validacionFecha(v) ||
            "La fecha de fin debe ser mayor a la fecha de inicio",
        ],
      },
      datePickerProps: {
        locale: "es",
      },

    };
  },
  computed: {
    //Visualizar campos requeridos de huéspedes y habitaciónes para sus respectivas listas
    huespedesComputados() {
      if (this.huespedes.length > 0) {
        var huespedes = this.huespedes.map((huesped) => {
          return {
            id: huesped.id,
            nombreCompleto: huesped.nombre + " " + huesped.apellido,
          };
        });

        return huespedes.filter((huesped) => {
          return huesped.nombreCompleto.match(this.busquedaHuesped);
        });
        return huespedes;
      }
    },
    habitacionesComputadas() {
      if (this.habitaciones.length > 0) {
        return this.habitaciones.filter((hab) => {
          return String(hab.numerohabitacion).match(this.busquedaHabitacion);
        });
      }
    },
    listaCheckInComputada() {
      if (this.lista_checkin.length > 0) {
        return this.lista_checkin.map((checkIn) => {
          var check = checkIn;
          //Convertir tiempo a formato estándar
          var tiempoInicio = parseISO(String(checkIn.tiempo_inicio));
          var tiempoFin = parseISO(String(checkIn.tiempo_fin));

          //Darle el formato requerido al tiempo. Ejemplo: "Nov 20, 2020, 3:00:00 PM"
          check.tiempo_inicio = format(tiempoInicio, "PPpp", { code: "es" });
          check.tiempo_fin = format(tiempoFin, "PPpp", { code: "es" });
        
          return check;
        });
      }
    },
  },
  watch: {
    //Los watchers tienen que tener el mismo nombre que la variable a la que esta asociada

    //Si se cambia el valor de "tiempoInicioConFormato" y "tiempoFinConFormato" no es nulo,
    // se mostrarán los mensajes respectivos en caso no cumplam con "validacionFecha()"
    tiempoInicioConFormato(value) {
      if(this.tiempoFinConFormato != null){
        this.$nextTick(() => {
          this.$refs.form.validate();
        });
      }
      this.setTiempoInicio();
    },

    //Es el caso contrario al anterior, pero la misma lógica
    tiempoFinConFormato(value) {
      if(this.tiempoInicioConFormato != null){
        this.$nextTick(() => {
          this.$refs.form.validate();
        });
      }
      this.setTiempoFin();
    },
    
    /*Propiedades watch para la lista de huéspedes y habitaciones en el form de edición*/

    //Se inicializa el huesped de checkin cuando cambia la variable id_huesped_seleccionado
    id_huesped_seleccionado(value) {
      if (value != null) {
        this.checkIn.huesped = this.huespedes.filter((huesped) => {
          return huesped.id.match(value);
        })[0];
      }
    },
    //Si se deselecciona un huésped de la lista, se inicializa el huésped de checkin como el actual
    index_huesped: function () {
      if (this.index_huesped == null)
        this.checkIn.huesped = this.huesped_anterior;
        this.id_huesped_seleccionado = this.huesped_anterior.id;
    },

    //Tienen la misma lógica que las propiedades watch anteriores, pero trabajan con la lista de habitaciones
    id_habitacion_seleccionada(value) {
      if (value != null) {
        this.checkIn.habitacion = this.habitaciones.filter((habitacion) => {
          return habitacion.id.match(value);
        })[0];
      }
    },
    index_habitacion: function () {
      if (this.index_habitacion == null)
        this.checkIn.habitacion = this.habitacion_anterior;
    },
  },
  created() {
    this.listarHuespedes();
    this.listarHabitaciones();
    this.listar();
  },
  methods: {
    listar() {
      this.cargandoLista = true;
      axios
        .get("checkin")
        .then((response) => {
          this.lista_checkin = response.data;
          this.cargandoLista = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    listarHuespedes() {
      axios
        .get("huesped")
        .then((response) => {
          this.huespedes = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    listarHabitaciones() {
      axios
        .get("habitacion")
        .then((response) => {
          this.habitaciones = response.data.sort((a, b) => {
              return a.numerohabitacion - b.numerohabitacion;
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    crearCheckIn() {
      this.$router.push("/check-in/nuevo");
    },

    //Edición
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

    abrirDialogoDeEdicion(item) {
      this.checkIn.id = item.id;
      //Convertir el texto a fecha y hora
      this.tiempoInicioConFormato = new Date(item.tiempo_inicio);
      this.tiempoFinConFormato = new Date(item.tiempo_fin);

      this.setHuesped(item.huesped.id);
      this.checkIn.habitacion = item.habitacion;
      this.habitacion_anterior = item.habitacion;
      this.huesped_anterior = item.huesped;
      this.dialogoEdicion = true;
    },
    cerrarDialogoEdicion() {
      this.dialogoEdicion = false;
      this.index_huesped = null;
      this.index_habitacion = null;
      this.id_huesped_seleccionado = null;
    },
    //Inicializar habitación de checkin con su propiedad watch
    setHabitacion(id) {
      this.id_habitacion_seleccionada = id;
    },
    //Inicializar huésped de checkin con su propiedad watch
    setHuesped(id) {
      this.id_huesped_seleccionado = id;
    },
    //Inicializar tiempos de checkin con las variables de los datepickers
    setTiempoInicio() {
      this.checkIn.tiempo_inicio = this.tiempoInicioConFormato;
    },
    setTiempoFin() {
      this.checkIn.tiempo_fin = this.tiempoFinConFormato;
    },
    abrirDialogoConfirmarEdicion() {
      this.$refs.form.validate();
      if (this.formValido) {
        this.dialogoConfirmarEdicion = true;
      }
    },

    editar() {
      this.dialogoConfirmarEdicion = false;
      this.cargandoEdicion = true;
      var obj = {
        tiempo_inicio: this.checkIn.tiempo_inicio,
        tiempo_fin: this.checkIn.tiempo_fin,
        huesped: this.checkIn.huesped,
        habitacion: this.checkIn.habitacion.id,
      };
      //Se añade "antiguaHabitación" al objeto para actualizar la habitación a libre (activa).
      //La nueva habitación estará ocupada (inactiva).
      if (this.checkIn.habitacion.id !== this.habitacion_anterior.id) {
        obj["antiguaHabitacion"] = this.habitacion_anterior.id;
      }
      axios
        .put("checkin/" + this.checkIn.id, obj)
        .then((response) => {
          if (response) {
            this.cargandoEdicion = false;
            this.dialogoEdicion = false;
            this.listar();
            this.index_huesped = null;
            this.index_habitacion = null;
            this.listarHabitaciones();
            this.$alert("Edición exitosa", "Exitoso", "success");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //Eliminación
    abrirDialogoDeEliminacion(id) {
      this.dialogoConfirmarEliminacion = true;
      this.id_delete = id;
    },
    eliminar() {
      this.dialogoConfirmarEliminacion = false;
      this.cargandoEliminacion = true;
      axios.delete("checkin/" + this.id_delete)
      .then(response => {
        this.cargandoEliminacion = false;
        this.listar();
        this.listarHabitaciones();
        this.$alert("Eliminación exitosa", "Exitoso", "success")
      })
      .catch(error => {
        console.log(error)
      })

      this.cargandoEliminacion = false;
    },
  },
};
</script>
