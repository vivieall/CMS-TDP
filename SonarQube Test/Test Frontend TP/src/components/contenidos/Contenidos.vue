<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Contenidos {{ textoTitulo }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-text-field
          class="text-xs-center"
          append-icon="search"
          label="Búsqueda"
          single-line
          hide-details=""
        ></v-text-field>

        <v-spacer></v-spacer>

        <v-btn @click="crearNuevo">Crear nuevo contenido</v-btn>

        <v-spacer></v-spacer>

        <v-btn>Asignaciones</v-btn>
      </v-toolbar>

      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span>Edición de contenido</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    v-model="contenido.nombre"
                    label="Nombre"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    v-model="contenido.descripcion"
                    label="Descripción"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    v-model="contenido.url_imagen"
                    label="URL Imagen"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-grey lighten-4" 
              large @click.native="cerrarDialogo"
              >Cancelar</v-btn
            >
            <v-btn color="blue-grey lighten-4" 
              large flat @click.native="editarContenido"
              >Guardar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-data-table class="elevation-1" :headers="headers" :items="contenidosActuales">
        <template v-slot:[`item.url_imagen`]="{ item }">
          <div class="p-2">
            <v-img
              :src="item.url_imagen"
              :alt="item.nombre"
              class="imagen"
            ></v-img>
          </div>
        </template>

        <template v-slot:[`item.edit`]="{ item }">
          <v-btn icon @click="abrirDialogo(item)">
            <v-icon>create</v-icon>
          </v-btn>
        </template>

        <template v-slot:[`item.delete`]="{ item }">
          <v-btn icon @click="borrarContenido(item.id)">
            <v-icon>delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios';
export default {
  name: "Contenidos",
  props: ["contenidos", "tipoContenido"],
  data() {
    return {
      textoTitulo: "",
      contenidosActuales: [],
      dialog: false,
      headers: [
        { text: "Nombre", value: "nombre", sortable: false },
        { text: "Descripcion", value: "descripcion", sortable: false },
        { text: "Imagen", value: "url_imagen", sortable: false },
        { text: "Editar", value: "edit", sortable: false },
        { text: "Eliminar", value: "delete", sortable: false },
      ],
      contenido: {
        id: 0,
        nombre: "",
        descripcion: "",
        url_imagen: "",
      },
    };
  },
  created() {
    console.log("Creando contenidos");
    this.contenidosActuales = this.$props.contenidos;
    console.log("Contenidos" + this.contenidosActuales);
    var tp = this.$props.tipoContenido;
    if (tp == "generico") {
      this.textoTitulo = "Génericos";
    } else if (tp == "personalizado") {
      this.textoTitulo = "Personalizados";
    }
  },
  methods: {
   
    crearNuevo() {
      this.$router.push("/contenidos/" + this.$props.tipoContenido + "/nuevo");
    },
    abrirDialogo(item) {
      this.contenido.id = item.id;
      this.contenido.nombre = item.nombre;
      this.contenido.descripcion = item.descripcion;
      this.contenido.url_imagen = item.url_imagen;
      this.dialog = true;
      console.log(this.contenido.id);
    },
    editarContenido() {
      /* let me = this;
        axios.put("api/contenidos/" + this.tipoContenido, {
            nombre: me.contenido.nombre,
            descripcion: me.contenido.descripcion,
            urlImagen: me.contenido.urlImagen
        })
        .then((response) => {
            this.cerrarDialogo();
            this.listarContenidos();
        })
        .catch((error) => {
            console.log(error);
        })*/
      for (var item in this.contenidosActuales) {
        if (item.id == this.contenido.id) {
          this.item.nombre = this.contenido.nombre;
          this.item.descripcion = this.contenido.descripcion;
          this.item.url_imagen = this.contenido.url_imagen;
        }
      }
      this.$emit('editado', 1);
      console.log(
        "Contenido #" + this.contenido.id + " editado: " + this.contenido
      );
      this.cerrarDialogo();
    },
    cerrarDialogo() {
      this.dialog = false;
      this.limpiarContenidoAEditar();
    },
    borrarContenido(id) {
      /*let me = this;
        axios.delete(`api/contenidos/${this.tipoContenido}/${id}`)
        .then((response) => {
            this.listarContenidos();
        })
        .catch((error) => {
            console.log(error);
        })*/
      console.log("Se borró el contenido " + id);
    },
    limpiarContenidoAEditar() {
      /*this.contenido = {
        id: 0,
        nombre: "",
        descripcion: "",
        url_imagen: "",
      };*/
    },
  },
};
</script>


<style>
.imagen {
  width: 150px;
  height: 100px;
  margin: 4px;
}
.dialog-button {
  color: #444;
}
</style>