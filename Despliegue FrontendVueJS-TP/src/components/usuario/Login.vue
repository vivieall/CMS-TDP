<template>
  <div class="login-page">
    <h1 class="titulo">Bienvenido a CMS</h1>
    <v-card class="card" elevation="5" :loading="cargandoLogIn">
      <v-card-title>{{ texto }}</v-card-title>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="Email"
          class="text-field"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="mostrar ? 'visibility' : 'visibility_off'"
          :rules="contrasenaRules"
          label="Contraseña"
          class="text-field"
          :type="mostrar ? 'text' : 'password'"
          @click:append="mostrar = !mostrar"
        ></v-text-field>
        <v-btn
          class="login-button"
          color="primary"
          depressed
          @click="iniciarSesion"
          >Iniciar sesión</v-btn
        >
      </v-form>
    </v-card>
    <v-alert
      v-if="!validCredentials"
      dense
      outlined
      class="alert-incorrect-credentials"
      type="error"
    >
      <strong>Credenciales incorrectas.</strong> Por favor, intente nuevamente.
    </v-alert>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      valid: false,
      texto: "Iniciar sesión",
      cargandoLogIn: false,
      loggedIn: false,
      email: "",
      password: "",
      mostrar: false,
      emailRules: [
        (u) => !!u || "Email es requerido",
        (u) =>
          (u && u.length <= 80) || "Debe contener 80 caracteres como máximo",
        (u) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(u) ||
          "El email debe ser válido",
        (u) => u.split(" ").length <= 1 || "No se permiten espacios en blanco",
      ],

      contrasenaRules: [
        (c) => !!c || "Contraseña es requerida",
        (c) => c.split(" ").length <= 1 || "No se permiten espacios en blanco",
      ],

      validCredentials: true,
    };
  },
  methods: {
    iniciarSesion() {
      this.$refs.form.validate();
      if (this.valid) {
        this.cargandoLogIn = true;
        axios
          .post("administrador/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            if (
              response.data.status == 201
            ) {
              console.log("Iniciando sesión...");
              this.loggedIn = true;
              this.cargandoLogIn = false;
              this.$emit("logueado", this.loggedIn);
              
            } 
          })
          .catch((error) => {
            if (error.response) {
              if(error.response.status == 401){
                console.log("Credenciales incorrectas");
                this.cargandoLogIn = false;
                this.validCredentials = false;
              }
            }
          });
      }
    },
  },
};
</script>


<style>
.login-page {
  margin: auto;
  width: 80%;
}

.titulo {
  font-size: 40px;
  text-align: center;
}

.card {
  margin: 20px auto;
  width: 60%;
  height: 300px;
}

.alert-incorrect-credentials {
  margin: 10px auto;
  width: 60%;
}

.text-field {
  margin: 10px 30px;
}

.login-button {
  float: right;
  margin: 10px 30px;
}
</style>

