<template>
  <v-app id="app">

    <v-navigation-drawer
      v-if="loggedIn"
      permanent
      clipped
      app
    >
    <!--:clipped="$vuetify.breakpoint.lgAndUp"-->
      <v-list dense>
        <template v-for="item in items">
          <v-list-item
            v-if="!item.children"
            :key="item.text"
            @click="currentSelection = item.text"
            router
            :to="item.route"
            :class="currentSelection == item.text ? 'grey lighten-2' : ''"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-group
            v-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              @click="
                item.model = false;
                currentSelection = child.text;
              "
              router
              :to="child.route"
              :class="currentSelection == child.text ? 'grey lighten-2' : ''"
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>

      <!--<template v-slot:append>
        <div class="pa-2">
          <v-btn color="error" block @click="abrirDialogoCerrarSesion">Cerrar Sesion</v-btn>
        </div>
      </template>-->
    </v-navigation-drawer>

    

     <v-app-bar app clipped-left clipped-right color="indigo darken-3 white--text">
      <!--<v-app-bar-nav-icon
        @click="drawer = !drawer"
        v-if="loggedIn"
      ></v-app-bar-nav-icon>-->
      <v-toolbar-title :class="loggedIn ? 'element-with-pointer' : 'element-no-pointer'" @click="push_home">SignHub</v-toolbar-title>
      <v-spacer></v-spacer>
      
      <v-toolbar-title v-if="loggedIn" style="margin-right: 10px; font-size: 16px; cursor: pointer;"
       @click="infoShow = !infoShow">Hola, Juan Pérez</v-toolbar-title>
      <v-avatar v-if="loggedIn" class="element-with-pointer" @click="infoShow = !infoShow">
        <img 
        src="https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-creador-de-avatar-masculino.jpg">
      </v-avatar>
    
    </v-app-bar>

    <InformacionUsuario
    v-if="loggedIn"
    :show="infoShow"
     v-on:closeInfo="closeInfo"
     v-on:cerrarSesionValido="abrirDialogoCerrarSesion">
    </InformacionUsuario>


    <DialogoCerrarSesion
      :dialog="dialogCerrarSesion"
      v-on:close="dialogCerrarSesion = false"
      v-on:cerrarSesionValido="cerrarSesion">
    </DialogoCerrarSesion>

    <v-main>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <router-view 
          v-on:logueado="logueandoUsuario"
        />
        </v-slide-y-transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import DialogoCerrarSesion from "./components/DialogosValidacion/DialogoCerrarSesion.vue";
import InformacionUsuario from "./components/InformacionUsuario.vue";
export default {
  name: "App",
  components:{
    DialogoCerrarSesion,
    InformacionUsuario
  },
  data() {
    return {
      loggedIn: false,
      drawer: false,
      infoShow: false,
      currentSelection: "",
      items: [
        {
          icon: "live_tv",
          text: "Grupo de Contenidos",
          route: "/grupos_contenido",
        },
         {
          icon: "keyboard_arrow_up",
          "icon-alt": "keyboard_arrow_down",
          text: "Contenidos",
          model: false,
          children: [
            { icon:"local_offer", text: "Génericos", route: "/contenidos/generico" },
            { icon:"emoji_people", text: "Personalizados", route: "/contenidos/personalizado" },
          ],
        },
        { icon: "tv", text: "Dispositivos", route: "/dispositivos" },
        { icon: "share", text: "Asignaciones", route: "/asignaciones" },
        { icon: "room_service", text: "Servicios", route: "/servicios" },
        { icon: "satellite", text: "Amenities", route: "/amenities"},
        { icon: "announcement", text: "Anuncios", route: "/tipo-anuncios"},
        { icon: "attach_money", text: "Transacciones", route: "/tipo-transacciones"},
        { icon: "event_available", text: "Check-in", route: "/check-in"},
        /*{
          icon: "keyboard_arrow_up",
          "icon-alt": "keyboard_arrow_down",
          text: "Servicios IRES",
          model: false,
          children: [
            { text: "Gimnasio", route: "/gimnasios" },
            { text: "Restaurante", route: "/restaurantes" },
            { text: "Spa", route: "/spa" },
          ],
        },*/
      ],
      ////CERRAR SESIÓN
      dialogCerrarSesion: false,
    };
  },
 
  created() {
    console.log("App creada");
    this.loggedIn = localStorage.getItem("loggedIn");
    
    if (this.loggedIn != null && this.loggedIn == true) {
      console.log("AUTH:" +  this.loggedIn);
      this.infoShow = false;
      this.loggedIn = true;
      this.drawer = true;
      this.construir();
    } else if(this.loggedIn == null || this.loggedIn == false){
      this.infoShow = false;
      this.drawer = false;
      this.loggedIn = false;
      this.$router.push("/login")
    }
  },
  methods: {
    onClick(e, item) {
      e.stopPropagation();
    },
    logueandoUsuario(autenticado) {
      console.log("Se inicio sesión");
      console.log("Parámetro 'loggedIn': " + autenticado);
      this.loggedIn = true;
      localStorage.setItem("loggedIn", this.loggedIn);
      this.$router.push("/");

      this.construir();
    },
    closeInfo(){
        console.log("Drawer cerrado");
        this.infoShow = false;
    },
    abrirDialogoCerrarSesion(){
      this.dialogCerrarSesion = true;
    },
    cerrarSesion() {
      localStorage.removeItem("loggedIn");
      this.loggedIn = false;
      this.dialogCerrarSesion = false;
      this.$router.replace("/login");
    },
    push_home(){
      if(this.loggedIn){
        this.$router.push("/");
      } else {
        this.$router.replace("/login");
      }
      
    },

    construir() {
      this.currentSelection = this.items[0].text;

      var current = "";
      if (current) {
        var self = this;
        this.items.forEach((item, i) => {
          if (item.text == current) {
            this.currentSelection = current;
          }
          if (item.children && item.children.length) {
            if (item.children.map((x) => x.text).includes(current)) {
              self.items[i].model = true;
              this.currentSelection = current;
            }
          }
        });
      }
      this.$router.push("/");
     
    },
  },
};
</script>
<style>
.texto-appbar{
  cursor: pointer;
  color: "#FFFFFF";
}

.element-with-pointer{
  cursor: pointer;
}

.element-no-pointer{
  cursor: default;
}


</style>
