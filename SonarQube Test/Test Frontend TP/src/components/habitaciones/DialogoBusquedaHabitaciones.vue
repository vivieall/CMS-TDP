<template>
  <v-dialog :value="dialog" @click:outside="cerrarDialogo" width="700">
    <v-card>
      <v-card-title>Habitaciones</v-card-title>
      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col>
              <v-text-field
                label="Buscar habitación"
                v-model="busqueda"
              ></v-text-field>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue-grey lighten-4"
                  large
                  @click.native="cerrarDialogo"
                  >Cancelar</v-btn
                >
                <v-btn
                  :disabled="id_habitacion_seleccionada == null ? true : false"
                  color="blue-grey lighten-4"
                  large
                  @click.native="enviarHabitacion"
                  >Aceptar</v-btn
                >
              </v-card-actions>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              
              <p>Lista de Habitaciones</p>
              <v-progress-circular
                v-if="habitaciones.length <= 0"
                indeterminate
                color="primary"
              >
              </v-progress-circular>
              <v-list
                v-if="habitaciones.length > 0"
                style="max-height: 220px"
                class="overflow-y-auto"
              >
                <v-list-item-group v-model="index">
                  <template v-for="(item, index) in habitacionesComputadas">
                    <v-list-item
                      :key="item.id"
                      :value="item"
                      @change="elegirHabitacion(item.id)"
                    >
                      <template v-slot:default="{ active }">
                        <v-list-item-content>
                          <v-list-item-title
                            v-text="item.numero"
                          ></v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action>
                          <v-icon v-if="!active">check_circle_outline</v-icon>
                          <v-icon v-else color="indigo">check_circle</v-icon>
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
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
export default {
  name: "DialogoBusquedahabitaciones",
  props: ["dialog"],
  data() {
    return {
      habitaciones: [],
      busqueda: "",
      index: null,
      id_habitacion_seleccionada: null,
     
      habitacionSeleccionada: {},
    };
  },
  computed: {
    habitacionesComputadas() {
      if (this.habitaciones.length > 0) {
        var habitaciones = this.habitaciones.map((habitacion) => {
          return {
            id: habitacion.id,
            numero: habitacion.numerohabitacion,
            activo: habitacion.activo
          };
        });

        return habitaciones.filter((habitacion) => {
          //Verificar si mejor hacerlo en el backend
          return (String(habitacion.numero).match(this.busqueda));
        });

      }
    },
  },
  created() {
    this.listarHabitaciones();
  },
  watch:{
    index(value){
      if(value == null) this.id_habitacion_seleccionada = null;
    }
  },
  methods: {
    cerrarDialogo() {

      this.index = null;
      this.$emit("dialogoCerrado");
    },
    enviarHabitacion() {

      this.habitacionSeleccionada = this.habitaciones.filter((habitacion) => {
        return habitacion.id.match(this.id_habitacion_seleccionada);
      })[0];
      this.index = null;

      this.$emit("habitacionEnviada", this.habitacionSeleccionada);
    },
    elegirHabitacion(id) {

      this.id_habitacion_seleccionada = id;
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
  },
};
</script>

<style>
</style>