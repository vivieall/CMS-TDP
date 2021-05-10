<template>
  <v-layout align-start>
    <v-flex>
      
      <v-toolbar flat color="white">
        <v-toolbar-title>Grupos de Contenidos</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          class="text-xs-center"
          v-model="search"
          append-icon="search"
          label="Búsqueda"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn  medium color="indigo white--text" @click="open"> Crear nuevo grupo </v-btn>
        <v-dialog v-model="dialog" max-width="500px"> </v-dialog>
      </v-toolbar>

      <dialogo-eliminacion-grupo
      :dialog="dialogoEliminacion"
      v-on:close="dialogoEliminacion = false"
      v-on:borrarValido="deleteItem">

      </dialogo-eliminacion-grupo>

      <v-data-table
        :headers="headers"
        :items="grupos_contenido"
        class="elevation-1"
        :search="search"
        :loading="cargandoContenidos || cargandoEliminacion" 
        :loading-text="textoCargando"
      >
        <template v-slot:[`item.edit`]="{ item }">
          <v-btn icon @click="open_edit(item.id)">
            <v-icon>create</v-icon>
          </v-btn>
        </template>

        <template v-slot:[`item.delete`]="{ item }">
          <v-btn icon @click="validarDelete(item.id)">
            <v-icon>delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from "axios";
import grupo_contenido_post from "../../components/Grupo_Contenido/Grupo_Contenido_Post";
import DialogoEliminacionGrupo from "../../components/DialogosValidacion/DialogoEliminacionGrupo.vue";
export default {
 
  data() {
    return {
      grupos_contenido: [],
      dialog: false,
      headers: [
        { text: "Nombre", value: "nombre", sortable: false },
        { text: "Descripcion", value: "descripcion", sortable: false },
        { text: "Editar", value: "edit", sortable: false },
        { text: "Eliminar", value: "delete", sortable: false },
      ],
      search: "",
      //ELIMINACIÓN
      dialogoEliminacion: false,
      cargandoContenidos:true,
      textoCargando:"Cargando grupo de contenidos",
      cargandoEliminacion: false,
      id_delete: "",
    };
  },
  components: {
    "app-post": grupo_contenido_post,
    DialogoEliminacionGrupo,
  },
  computed: {},

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.listar();
  },

  methods: {
    listar() {
      let me = this;
      axios
        .get("/grupo-contenido")
        .then(function (response) {
          console.log("llego");
          me.grupos_contenido = response.data;
          me.cargandoContenidos = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    open() {
      this.$router.push("/grupo_contenido_nuevo");
    },
    open_edit(id) {
      this.$store.commit('changeValueOfId_Grupo',id);
      this.$router.push("/grupos_contenido/contenido");
    },
    validarDelete(id) {
     
      this.id_delete = id;
      console.log(this.id_delete);
      this.dialogoEliminacion = true;
    },
    alerta_eliminacion(){
        this.$alert("", "Eliminacion Exitosa","success").then(() => console.log("Closed"));
    },
    deleteItem() {
      this.cargandoEliminacion = true;
      let me = this;
      axios
        .delete("/grupo-contenido/" + this.id_delete)
        .then(function (response) {
          me.dialogoEliminacion = false;
          me.id_delete = "";
          me.alerta_eliminacion();
          me.listar();
          me.cargandoEliminacion = false;
        })
        .catch(function (error) {});
    },
    
  },
};
</script>
<style>
@import "../../assets/app.css";
</style>
