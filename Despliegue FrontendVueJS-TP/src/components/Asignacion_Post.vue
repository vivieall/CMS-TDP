<template>
  <v-layout align-start>
    <v-flex>
      <v-container>
        <v-list-item>Nueva asignación</v-list-item>
        <v-toolbar flat color="white">
          <v-btn @click="retornar">
            <v-icon>reply</v-icon> Regresar a asignaciones
          </v-btn>
          <v-toolbar-title></v-toolbar-title>
          <v-spacer></v-spacer>

        </v-toolbar>
        <v-divider></v-divider>
         <v-form  v-model="valid_form_grupo" ref="form">
          <v-row>
            <v-col lg="2">
              <p>Dispositivo</p>
            </v-col>

            <v-col>
              <v-select
                v-model="selected_Dispositivo"
                :items="dispositivos"
                :rules="[(v) => !!v || 'Dispositivo es requerido']"
                item-text="nombre"
                item-value="iddispositivo"
                label="Seleccionar dispositivo"
                required
                return-object
                single-line>
              </v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col lg="2">
              <p>Seleccionar </p>
            </v-col>


         <v-radio-group row v-model="contenido" :rules="[v => !!v || 'Debe seleccionar uno']" required>
      <v-radio
        label="Contenido Genérico"
        @click="activeDrop = true, activeDrop2=false"
        value="generico"
      ></v-radio>
      <v-radio
        label="Grupo Contenido"
        @click="activeDrop2 = true, activeDrop=false"
        value="grupo"
      ></v-radio>
    </v-radio-group>
          <v-select
                         v-if="activeDrop2"
                        v-model="selected_Grupo"
                        :items="grupos_contenido"
                        item-text= "nombre"
                        item-value="id"
                        label="Seleccione grupo"
                        :rules="[(v) => !!v || 'Grupo es requerido']"
                        persistent-hint
                        return-object
                        single-line></v-select> 


          <v-select
                         v-if="activeDrop"
                        v-model="selected_Contenido"
                        :items="contenidos"
                        item-text= "nombre"
                        item-value="id"
                        label="Seleccione contenido generico"
                        :rules="[(v) => !!v || 'Contenido es requerido']"
                        persistent-hint
                        return-object
                        single-line>
                          <template v-slot:selection="{ item }">
                          <img :src="item.url_imagen" style="width: 32px"> {{ " " + item.nombre }}
                          </template>
                          <template v-slot:item="{ item }">
                          <img :src="item.url_imagen" style="width: 32px">{{ " " + item.nombre }}
                          </template>
          
                      </v-select>
     
      </v-row>

          <v-row justify="space-around">
            <v-time-picker
              v-model="iniciotiempo"
              color="black_color"
              header-color="primary"
              required
            ></v-time-picker>
            <v-time-picker
              v-model="fintiempo"
              color="black_color"
              required        
            ></v-time-picker>
          </v-row>

        <v-btn medium color="indigo white--text" 
          @click="abrirDialogoInsercion" >
          Guardar
        </v-btn>
        </v-form>
      </v-container>

      <dialogo-insercion
        :dialog="validInsertion"
        v-on:close="validInsertion = false"
        v-on:guardarValido="guardar"
        :titulo="tituloDialogo"
      >
      </dialogo-insercion>


    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import DialogoInsercion from "./DialogosValidacion/DialogoInsercion.vue";
export default {
    components: {
    DialogoInsercion,
  },
  data() {
    return {
      //x: 'one',
      //Lista de contenidos genéricos
      contenidos: [],
      dispositivos: [],
      grupos_contenido: [],
      btnDisable: true,
      //Form
      iniciotiempo: '',
      contenido: null,
      fintiempo: '',
      valid_form_grupo:false,
      validInsertion:false,
      tituloDialogo:"Asignaciones",
      selected_Dispositivo: '',
      selected_Grupo: '',
      selected_Contenido: '',
      nombredispositivo: '',
      activeDrop: false,
      activeDrop2: false
    };
  },
  computed: {
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.listar_dispositivos();
    this.listar_grupos_contenido();
    this.listar();
  },
  methods: {
    listar_dispositivos() {
      let me = this;
      axios
        .get("/dispositivo")
        .then(function (response) {
          me.dispositivos = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    toggleDropdown () {
    this.showDropdown = ! this.showDropdown
    },
    hideDropdown () {
    this.showDropdown = false
    },

    listar() {
      //Endpoint: contenido/generic
      //Todos los contenidos que no estén relacionados con algun producto (item-transaccion) o asignación
      // son considerados genéricos
      let me = this;
      axios
        .get("contenido/generic")
        .then((response) => {
          if (response.data != null) {
            //Ordenando los contenidos por orden alabético
            this.contenidos = response.data.sort((a, b) => {
              return a.nombre
                .toLowerCase()
                .localeCompare(b.nombre.toLowerCase(), "es", {
                  sensitivity: "base",
                  numeric: true,
                });
            });
            this.cargandoContenidos = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    listar_grupos_contenido() {
      let me = this;
      axios
        .get("/grupo-contenido")
        .then(function (response) {
          me.grupos_contenido = response.data;
          console.log(me.grupos_contenido);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    
    abrirDialogoInsercion() {
     this.$refs.form.validate();
     if(this.valid_form_grupo && this.iniciotiempo != "" && this.fintiempo != "" ){
      this.validInsertion = true;
      }
    },

    guardar() {
      this.validInsertion = false;
      let me = this;
      if (me.valid_form_grupo){
        if(me.activeDrop2){
              console.log(me.selected_Grupo.id);
              console.log(me.selected_Dispositivo.id);

               axios
        .post("/asignacion", {
          iniciotiempo: me.iniciotiempo,
          fintiempo: me.fintiempo,
          dispositivo: me.selected_Dispositivo.id,
        })
        .then(function (response) {
                axios
                .post("/asignacion-contenido", {
                     grupocontenido: me.selected_Grupo.id,
                     asignacion: response.data.identifiers[0].id
                   })
        .then(function (response) {          
          me.retornar();
          me.alerta_post();
          me.cargandoCreacion = false;
        })
        .catch(function (error) {
          console.log(error);
        });
        })
        .catch(function (error) {
          console.log(error);
        });



        }else{
               axios
        .post("/asignacion", {
          iniciotiempo: me.iniciotiempo,
          fintiempo: me.fintiempo,
          dispositivo: me.selected_Dispositivo.id,
        })
        .then(function (response) {
                axios
                .post("/asignacion-contenido", {
                     contenido: me.selected_Contenido.id,
                     
                     asignacion: response.data.identifiers[0].id
                   })
        .then(function (response) {          
          me.retornar();
          me.alerta_post();
          me.cargandoCreacion = false;
        })
        .catch(function (error) {
          console.log(error);
        });
        })
        .catch(function (error) {
          console.log(error);
        });
        }
        
    }},
    retornar() {
      this.$router.push("/asignaciones");
    },
    alerta_post(){
        this.$alert("", "Asignación Exitosa","success").then(() => console.log("Closed"));
    }
  },
};
</script>

