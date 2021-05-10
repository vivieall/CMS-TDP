<template>
  <v-dialog :value="dialog" @click:outside="cerrarDialogo" width="700">
    <v-card>
      <v-card-title>Huéspedes</v-card-title>
      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col>
              <!--Campo de búsqueda-->
              <v-text-field
                label="Buscar huésped"
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
                  :disabled="id_huesped_seleccionado == null ? true : false"
                  color="blue-grey lighten-4"
                  large
                  @click.native="enviarHuesped"
                  >Aceptar</v-btn
                >
              </v-card-actions>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              
              <p>Lista de huéspedes</p>
              <!--Animación de cargando huéspedes-->
              <v-progress-circular
                v-if="huespedes.length <= 0"
                indeterminate
                color="primary"
              >
              </v-progress-circular>
              <!--Lista de huéspedes-->
              <v-list
                v-if="huespedes.length > 0"
                style="max-height: 220px"
                class="overflow-y-auto"
              >
                <v-list-item-group v-model="index">
                  <template v-for="(item, index) in huespedesComputados">
                    <v-list-item
                      :key="item.id"
                      :value="item"
                      @change="elegirHuesped(item.id)"
                    >
                      <template v-slot:default="{ active }">
                        <v-list-item-content>
                          <v-list-item-title
                            v-text="item.nombreCompleto"
                          ></v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action>
                          <v-icon v-if="!active">check_circle_outline</v-icon>
                          <v-icon v-else color="indigo">check_circle</v-icon>
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
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
export default {
  name: "DialogoBusquedaHuespedes",
  props: ["dialog"],
  data() {
    return {
      huespedes: [],
      busqueda: "",
      index: null,
      id_huesped_seleccionado: null,
      huespedSeleccionado: {},
    };
  },
  computed: {
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
  },
  watch:{
    //El id_huesped_seleccionado se vuelve null si se deselecciona algun huesped o se cierra el 
    // diálogo de selección de huésped
    index(value){
      if(value == null) this.id_huesped_seleccionado = null;
    }
  },
  created() {
    this.listarHuespedes();
  },
  methods: {
    cerrarDialogo() {
      this.index = null;
      this.$emit("dialogoCerrado");
    },
    //Envía el huésped a la vista padre 
    enviarHuesped() {
      this.huespedSeleccionado = this.huespedes.filter((huesped) => {
        return huesped.id.match(this.id_huesped_seleccionado);
      })[0];
      this.index = null;
      this.$emit("huespedEnviado", this.huespedSeleccionado);
    },
    elegirHuesped(id) {
      this.id_huesped_seleccionado = id;
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
  },
};
</script>

<style>
</style>