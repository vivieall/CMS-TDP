<template>
<v-layout align-start>
    <v-flex>

    <v-container >

      <v-toolbar flat color="white">
         
      <v-btn 
         @click="retornar" >
             <v-icon>reply</v-icon>
      </v-btn>
        <v-toolbar-title></v-toolbar-title>
         <v-spacer></v-spacer>
 


      </v-toolbar>
      <v-divider ></v-divider>
      <v-form >
    <v-row class="first_row">
        <v-col 
        lg="2"
        >
        <p>Nombre</p>
        </v-col>
     
        <v-col>
        <v-text-field
      v-model="nombre_dispositivo"
      label="Nombre del dispositivo"
      required
      solo
    ></v-text-field>    
        </v-col>
    </v-row>
    
      </v-form>
</v-container>



    </v-flex>
  </v-layout>
</template>




<script>
import axios from "axios";
export default {
    props: ['iddispositivo'],
    data() {
    return {
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 50) || 'Name must be less than 10 characters',
      ],
      nombre_dispositivo: '',
    };
  },
  computed: {
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
      console.log(this.iddispositivo)

  },
  methods: {

    guardar() {
    },
    retornar(){
     this.$router.push( '/dispositivos' );
    }
  }
};
</script>
