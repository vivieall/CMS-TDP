<template>
  <v-layout align-start>
    <v-flex>

    <v-container >
      <v-btn text
         @click="retornar" >
             <v-icon>reply</v-icon>Regresar a Contenidos
      </v-btn>

      <v-toolbar flat color="white">
                 <v-list-item-title class="custom-title">Nuevo Contenido</v-list-item-title>

        <v-toolbar-title></v-toolbar-title>
         <v-spacer></v-spacer>
        <v-progress-circular
          v-if="cargandoCreacion"
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>


      </v-toolbar>
      
      <v-divider ></v-divider>



      <v-form class="form_contenido" v-model="validForm_select" :disabled="value_contenido" ref="form_select">
            <v-row>
                <v-col lg="4">
                    <v-select
                        v-model="selected_Contenido"
                        :items="contenidos"
                        item-text= "nombre"
                        item-value="id"
                        label="Seleccione contenido"
                        persistent-hint
                        return-object
                        single-line></v-select> 
                  </v-col>
              </v-row>
      </v-form>

      <v-checkbox v-model="value_contenido" :label="`No se encuentra tu contenido?`"></v-checkbox>

      <v-form :disabled="!value_contenido" ref="form" v-model="validForm"> 
          <v-row class="first_row">
            <v-col lg="4">
                <p>Nombre del contenido</p>
            </v-col>
            <v-spacer></v-spacer>
            <v-col lg="6">
                <p>Descripcion del contenido</p>
            </v-col>
          </v-row>
          <v-row>
             <v-col lg="4">
                <v-text-field
                    v-model="contenido.nombre"
                    label="Nombre"
                    required
                    :rules="nombreReglas"
                    solo
                ></v-text-field>    
            </v-col>
                        <v-spacer></v-spacer>
             <v-col   lg="6">
                  <v-text-field
                      v-model="contenido.descripcion"
                      :rules="descripcionReglas"
                      label="Descripcion"
                      required
                      solo
                  ></v-text-field>      
            </v-col>
          </v-row>
          <v-row >
              <v-col lg="2">
                <p>URL de Imagen</p>
              </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-file-input
                accept="image/*"
                label="Imagen"
                solo
                prepend-icon="perm_media"
                v-model="contenido.file"
                @change="postHandler"
                :rules="imagenReglas"
              >
              </v-file-input>
            </v-col>
            </v-row>
                <v-btn 
                @click="abrirDialogoInsercion" >
                Guardar
                </v-btn>
    
      </v-form>
</v-container>

      <dialogo-insercion
        :dialog="validInsertion"
        v-on:close="validInsertion = false"
        v-on:guardarValido="guardar"
        :titulo="titulo"
      >
      </dialogo-insercion>


    </v-flex>
  </v-layout>
</template>




<script>
import axios from "axios";
import DialogoInsercion from "../DialogosValidacion/DialogoInsercion.vue";
export default {
  components: {
    DialogoInsercion,
  },
  data() {
    return {
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
      imagenReglas: [
        (v) => !!v || "La imagen es requerida.",
        (v) => (v && v.size < 2000000) || "La imagen debe pesar menos de 2MB."
      ],

      //Form

      nombre: '',
      contenidos:[],
      contenido_asignado:[],
      contenido_disponible:[],
      selected_Contenido:'',
      value_contenido:false,
            validForm: false,
                  validForm_select: false,
      descripcion: '',
      url_imagen: '',
      idgrupo_contenido: "",
      idcontenido_nuevo: "",
       cargandoCreacion: false,
      contenido: {
        nombre: "",
        descripcion: "",
        file: null,
      },

      validInsertion: false,
      titulo: "contenido",


    };
  },
  computed: {},

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.idgrupo_contenido = this.$store.state.grupo_id;
    this.listar_contenidos_genericos();

  },
  methods: {
    postHandler() {
    },
    listar_contenidos_genericos(){
      let me=this;
      axios
      .get("/contenido")
      .then(function(response){
        me.contenidos=response.data;
        me.listar_asignacion_contenido();
        })
      .catch(function(error){console.log(error);});
    },
    listar_asignacion_contenido() {
      let me=this;
      axios
      .get("/asignacion-contenido/idgrupo/"+ me.idgrupo_contenido)
      .then(function(response){
        me.contenido_asignado=response.data;
        me.comparacion();
        })
      .catch(function(error){console.log(error);});
    },
    abrirDialogoInsercion() {
      if(!this.value_contenido){
      this.$refs.form_select.validate();
      if (this.validForm_select) {
        this.validInsertion = true;
      }
      }else{
        this.$refs.form.validate();
          if (this.validForm) {
          this.validInsertion = true;
      }   
      }
    },
    guardar() {
      this.cargandoCreacion = true;
      if(!this.value_contenido){
      let me = this;
      axios
        .post("/asignacion-contenido", {
          contenido :{
             id: this.selected_Contenido.id
           },
           grupocontenido :{
             id: this.idgrupo_contenido
           }
        })
        .then(function (response) {
          me.cargandoCreacion = false;
          me.retornar();
        })
        .catch(function (error) {
          console.log(error);
        });
        }else{
          this.validInsertion = false;
          if (this.validForm) {
            const fd = new FormData();
            var c = this.contenido;
            fd.append("file", c.file);
            fd.append("nombre", c.nombre);
            fd.append("descripcion", c.descripcion);
        axios
          .post("contenido/upload", fd)
          .then((response) => {
              this.idcontenido_nuevo = response.data.id;
              this.cargandoCreacion = false;
              this.cargandoCreacion = false;
              this.post_asignacion();
          })
          .catch((error) => {
            console.log(error);
          });
          
      }
        }
    },

    post_asignacion(){
        //post Asignacion
        let me = this;
          axios
        .post("/asignacion-contenido", {
          contenido :{
             id: this.idcontenido_nuevo
           },
           grupocontenido :{
             id: this.idgrupo_contenido
           }
        })
        .then(function (response) {
          me.retornar();
          me.alerta_post();
        })
        .catch(function (error) {
          console.log(error);
        });     
    },
    imagenValida(cadena) {
      if (
        cadena.includes(".jpg") ||
        cadena.includes(".png") ||
        cadena.includes(".jpeg") ||
        cadena.includes(".JPG") ||
        cadena.includes(".PNG") ||
        cadena.includes(".JPEG")
      ) {
        return true;
      } else {
        return false;
      }
    },
     alerta_post(){
        this.$alert("Contenido agregado", "Agregacion Exitosa","success").then(() => console.log("Closed"));
    },
    retornar() {      
      this.$router.push("/grupos_contenido/contenido");
    },
    comparacion(){
      this.contenido_disponible  = this.contenidos.filter(o=> !this.contenido_asignado.some(i=> i.contenido.id === o.id));
      this.contenidos = this.contenido_disponible;
}
  },
};
</script>

<style >
  .custom-title {
    font-size: 2.2em;
  }
  .form_contenido{
    margin-top:2%;
  }
</style>

