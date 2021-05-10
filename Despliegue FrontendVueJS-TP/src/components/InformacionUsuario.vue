<template>
    <v-navigation-drawer
        :value="show"
        right
        clipped
        app
        @click:outside="closeDrawer">
    
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          @click="actions(item.title)"
        >
          <v-list-item-icon>
            <v-icon :color="customColorIcon(item.icon)">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title :class="customColor(item.title)">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>

</template>

<script>
export default {
    name: 'InformacionUsuario',
    props: ['show'],
    data(){
        return{
            items: [
                {title: "Configuración", icon: "settings"},
                {title: "Cerrar sesión", icon: "backspace"},
            ]

        }
    },
    methods:{
        customColor(title){
          return (title==="Cerrar sesión") ? 'red--text' : '';
        },
        customColorIcon(icon){
          return (icon==="backspace") ? 'red': '';
        },
        actions(title){
            switch(title){
              case "Cerrar sesión": 
                    this.$emit("cerrarSesionValido");
            }
        },
        closeDrawer(){
          this.$emit('closeInfo');
        }
    }
}
</script>