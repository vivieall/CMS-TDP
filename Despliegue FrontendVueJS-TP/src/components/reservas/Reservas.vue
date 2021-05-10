<template>
  <v-layout align-start>
    <v-flex>
      <!--Volver a la lista de servicios-->
      <v-btn @click="volverAServicios" style="margin: 8px">
        <v-icon>reply</v-icon>
      </v-btn>
      <v-toolbar flat color="white">
        <v-toolbar-title>Reservas de {{ nombreServicio }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn medium color="indigo white--text" elevation="2" @click="reservar"
          >Reservar</v-btn
        >
      </v-toolbar>
      <!--Lista de reservas-->
      <v-data-table
        :headers="headers"
        :items="reservasComputadas"
        class="elevation-1"
        calculate-widths
        :loading="cargandoLista || cargandoEliminacion"
        loading-text="Cargando reservas del servicio"
        no-data-text="No hay reservas"
      >
        <template v-slot:[`item.huesped`]="{ item }">
          <p style="margin: auto 0px">
            {{ item.huesped.nombre + " " + item.huesped.apellido }}
          </p>
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

      <!--Formulario de edición de reservas-->
      <v-dialog v-model="dialogoEdicion" max-width="800px">
        <v-card :loading="cargandoEdicion">
          <v-card-title>
            <span>Edición de reserva</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form v-model="formValido" ref="form">
                <v-row>
                  <v-col>
                    <p>Descripción</p>
                    <v-textarea
                      v-model="reserva.descripcion"
                      :rules="reglasDescripcion"
                      rows="1"
                      auto-grow
                      row-height="12"
                      label="Inserte la descripción de la reserva"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <!--DateTimePickers para seleccionar el tiempo de inicio
                  y el tiempo de fin de la reserva-->
                <v-row>
                  <v-col sm="12" md="6" xs="3">
                    <p>Fecha y hora de inicio</p>
                    <v-datetime-picker
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
                      <b v-if="reserva.huesped.nombre">{{
                        reserva.huesped.nombre + " " + reserva.huesped.apellido
                      }}</b>
                    </p>
                    <!--Búsqueda de huéspedes-->
                    <v-text-field
                      label="Buscar huésped"
                      v-model="busqueda"
                    ></v-text-field>
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

                  <v-col>
                    <!--Lista de huéspedes para buscar y escoger-->
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
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!--Dialogo de confirmar edición-->
      <dialogo-edicion
        :dialog="dialogoConfirmarEdicion"
        @close="dialogoConfirmarEdicion = false"
        @editarValido="editar"
        titulo="reserva"
      >
      </dialogo-edicion>

      <dialogo-eliminacion
        :dialog="dialogoConfirmarEliminacion"
        titulo="reserva"
        @close="dialogoConfirmarEliminacion = false"
        @borrarValido="eliminar"
      ></dialogo-eliminacion>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import DialogoEliminacion from "../DialogosValidacion/DialogoEliminacion.vue";
import DialogoEdicion from "../DialogosValidacion/DialogoEdicion.vue";
import { format, parseISO } from "date-fns";
export default {
  name: "Reservas",
  components: {
    DialogoEliminacion,
    DialogoEdicion,
  },
  data() {
    return {
      headers: [
        { text: "Huésped", value: "huesped", sortable: false  },
        { text: "Descripción", value: "descripcion", sortable: false  },
        { text: "Tiempo de inicio", value: "tiempo_inicio", sortable: false  },
        { text: "Tiempo de fin", value: "tiempo_fin", sortable: false  },
        { text: "Editar", value: "edit", sortable: false  },
        { text: "Eliminar", value: "delete", sortable: false  },
      ],

      //Lista que se muestra en el v-data-table
      reservas: [],

      //Servicio asociado a la reserva y guardado en Vuex
      servicio: {
        id: "",
        nombre: "",
      },

      //Parámetros de la ruta
      tipoServicioDeRuta: "",
      servicioDeRuta: "",

      //Mostrar animación de cargando
      cargandoLista: false,
      cargandoEdicion: false,
      cargandoEliminacion: false,

      //Edición

      ///Mostrar menús de fecha, hora de inicio y hora de fin
      mostrarMenuFecha: false,
      mostrarMenuHoraInicio: false,
      mostrarMenuHoraFin: false,

      //Eliminación
      ///Mostrar diálogo de confirmación
      dialogoConfirmarEliminacion: false,
      ///Id de la reserva a eliminar
      id_delete: "",

      //Reglas
      reglasDescripcion: [
        (v) => !!v || "La descripción es requerida.",
        (v) =>
          (v && v.length <= 200) || "Debe contener menos de 200 caracteres.",
        (v) =>
          /^[^\s]+(\s+[^\s]+)*$/.test(v) ||
          "No deben haber espacios al inicio o al final.",
      ],
      reglasDatePickerInicio: [
        (v) => !!v || "El tiempo de inicio es requerido.",
      ],
      reglasDatePickerFin: [
        (v) => !!v || "El tiempo de fin es requerido.",
        (v) => (v && v > this.tiempoInicioConFormato) || "El tiempo de fin no puede ser mayor al de inicio."
      ],
      //Propiedades v-datetime-picker
      textFieldInicioProps: {
          prependInnerIcon: "event",
          rules: [
            (v) => !!v || "El tiempo de inicio es requerido",
            (v) =>
              this.validacionFecha(v) ||
              "El tiempo de inicio debe ser menor a la fecha de fin",
          ],
        },
      textFieldFinProps: {
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

      //Huéspedes
      id_huesped_seleccionado: null,
      index_huesped: null,
      huesped_anterior: null,

      //Edición
      
      ///Mostrar diálogo de edición
      dialogoEdicion: false,
      //Reglas formulario cumplidas
      formValido: false,
      ///Mostrar diálogo de confirmación
      dialogoConfirmarEdicion: false,
      //Cadena de texto para buscar al huésped
      busqueda: "",
      //Lista de huéspedes en diálogo de edición para escoger
      huespedes: [],
     
     //Modelo
      //Variables que usan los datepickers respectivos
      tiempoInicioConFormato: null,
      tiempoFinConFormato: null,
      //Modelo de edición de reserva
      reserva: {
        id: "",
        descripcion: "",
        tiempo_inicio: null,
        tiempo_fin: null,
        huesped: {},
      },
    };
  },
  computed: {
    nombreServicio() {
      return this.$store.state.servicio.nombre_servicio;
    },
    fechaMostrada() {
      return this.fechaFormateada(this.reserva.fecha);
    },
    //Listar campos requeridos de huéspedes
    //Añadir función de búsqueda de huésped
    huespedesComputados() {
      if (this.huespedes.length > 0) {
        var huespedes = this.huespedes.map((huesped) => {
          return {
            id: huesped.id,
            nombreCompleto: huesped.nombre + " " + huesped.apellido,
          };
        });

        return huespedes.filter((huesped) => {
          return huesped.nombreCompleto.match(this.busqueda);
        });
        return huespedes;
      }
    },
    reservasComputadas() {
      if (this.reservas.length > 0) {
        return this.reservas.map((reserva) => {
          var res = reserva;
          //Convertir tiempo a formato estándar
          var tiempoInicio = parseISO(String(reserva.tiempo_inicio));
          var tiempoFin = parseISO(String(reserva.tiempo_fin));
          //Darle el formato requerido al tiempo. Ejemplo: "Nov 20, 2020, 3:00:00 PM"
          res.tiempo_inicio = format(tiempoInicio, "PPpp", { code: "es" });
          res.tiempo_fin = format(tiempoFin, "PPpp", { code: "es" });
          return res;
        });
      }
    },
  },
  
  created() {
    this.servicio.id = this.$store.state.servicio.servicio_id;
    this.tipoServicioDeRuta = this.$route.params.tipoServicio;
    this.servicioDeRuta = this.$route.params.servicio;
    this.listar();
    this.listarHuespedes();
  },
  watch: {
    //Selección de huesped por la variable id_huesped_seleccionado
    id_huesped_seleccionado(value) {
      if (value != null) {
        console.log("Llega nuevo id para actualizar")
        console.log("ID: " + value);
        this.reserva.huesped = this.huespedes.filter((huesped) => {
          return huesped.id.match(value);
        })[0];
      }
    },

    tiempoInicioConFormato(value){
      if(this.tiempoFinConFormato != null){
      this.$nextTick(() => {
        this.$refs.form.validate();
      });
      }
      this.reserva.tiempo_inicio = this.tiempoInicioConFormato;
    },

    tiempoFinConFormato(value){
      if(this.tiempoInicioConFormato != null){
      this.$nextTick(() => {
        this.$refs.form.validate();
      });
      }
      this.reserva.tiempo_fin = this.tiempoFinConFormato;
    },

    //El huésped de la reserva vuelve a ser el actual en caso se deseleccione el que se eligió en la lista
    index_huesped: function () {
      if (this.index_huesped == null) {
        this.reserva.huesped = this.huesped_anterior;
        this.id_huesped_seleccionado = this.huesped_anterior.id;
      }
      
    },

  },
  methods: {
    //Reservar
    reservar() {
      this.$router.push(
        "/servicios/" +
          this.tipoServicioDeRuta +
          "/" +
          this.servicioDeRuta +
          "/reservas/nuevo"
      );
    },
    //Volver a servicios
    volverAServicios() {
      this.$router.push("/servicios/" + this.tipoServicioDeRuta);
    },
    //Listar
    listar() {
      this.cargandoLista = true;
      axios
        .get("servicio/" + this.servicio.id)
        .then((response) => {
          if (response) {
            console.log("Listando");
            this.reservas = response.data.reservaServicio;
            this.cargandoLista = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //Editar
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
    extraerDatosReserva(item) {
      this.reserva.id = item.id;
      //Convertir el texto a fecha y hora
      this.tiempoInicioConFormato = new Date(item.tiempo_inicio);
      this.tiempoFinConFormato = new Date(item.tiempo_fin);
      this.huesped_anterior = item.huesped;
      //this.setTiempoInicio();
      //this.setTiempoFin();
      this.setHuesped(item.huesped.id);
      this.reserva.descripcion = item.descripcion;
    },

    //Inicializar tiempos del modelo de reserva con 
    //las variables usadas por los datepickers
   /* setTiempoInicio() {
      if((this.tiempoFinConFormato !== null && this.tiempoInicioConFormato < this.tiempoFinConFormato)
        || this.tiempoFinConFormato === null)
      this.reserva.tiempo_inicio = this.tiempoInicioConFormato;
    },
    setTiempoFin() {
        if((this.tiempoInicioConFormato !== null && this.tiempoInicioConFormato < this.tiempoFinConFormato)
        || this.tiempoFinConFormato === null)
          this.reserva.tiempo_fin = this.tiempoFinConFormato;  
    },*/

    //Inicializar el id del huésped seleccionado
    // Esto activa la propiedad watch id_huesped_seleccionado
    // para inicializar el huésped de la reserva
    setHuesped(id) {
      this.id_huesped_seleccionado = id;
    },

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
      this.extraerDatosReserva(item);
      this.dialogoEdicion = true;
    },
    cerrarDialogoEdicion() {
      this.dialogoEdicion = false;
      this.id_huesped_seleccionado = null;
      this.index_huesped = null;
      this.id_huesped_seleccionado = null;
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
      axios
        .put("reserva-servicio/" + this.reserva.id, {
          descripcion: this.reserva.descripcion,
          tiempo_inicio: this.reserva.tiempo_inicio,
          tiempo_fin: this.reserva.tiempo_fin,
          huesped: this.reserva.huesped,
          cantidadpersona: 2,
        })
        .then((response) => {
          if (response) {
            this.cargandoEdicion = false;
            this.dialogoEdicion = false;
            this.listar();
            this.$alert("Edición exitosa", "Exitoso", "success");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    
    //Eliminar
    abrirDialogoDeEliminacion(id) {
      this.dialogoConfirmarEliminacion = true;
      this.id_delete = id;
    },
    eliminar() {
      this.dialogoConfirmarEliminacion = false;
      this.cargandoEliminacion = true;
      axios
        .delete("reserva-servicio/" + this.id_delete)
        .then((response) => {
          if (response) {
            this.cargandoEliminacion = false;
            this.listar();
            this.$alert("Eliminación exitosa", "Exitoso", "success");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>