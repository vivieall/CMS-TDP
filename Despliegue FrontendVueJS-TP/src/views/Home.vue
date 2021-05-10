<template>
<v-layout align-center>
        <v-container >
    <v-row class="first_image_row">
        <v-col cols="4">
            <v-card class="card_clickable" @click="push_contenido">
                <v-img src="https://www.cocoschool.com/wp-content/uploads/ejemplo-de-digital-signage-1024x512.jpg" aspect-ratio="1.7"></v-img>
                <v-card-title>Contenido</v-card-title>
            </v-card>
        </v-col>
        <v-col cols="4">
            <v-card class="card_clickable" @click="push_grupo">
                <v-img src="https://digitalsignageworld.es/wp-content/uploads/2020/06/ahora-nuevo-y-proximo-en-senalizacion-digital.jpg" aspect-ratio="1.7"></v-img>
                <v-card-title>Grupo Contenido</v-card-title>
            </v-card>
        </v-col>
        <v-col cols="4">
            <v-card class="card_clickable" @click="push_servicio">
                <v-img src="https://www.novisign.com/wp-content/uploads/2018/08/digital-signage-for-hotels.png" aspect-ratio="1.7"></v-img>
                <v-card-title>Servicios</v-card-title>
            </v-card>
        </v-col>
    </v-row>
    <v-row class="second_image_row">
        <v-col cols="4">
            <v-card class="card_clickable" @click="push_amenities">
                <v-img  src="https://lh6.googleusercontent.com/cbUv6fbSgtpD36aFc5VsXRB-3xP17chZ3OPNLGqXvAEblbk2NxzYt3veEO8sZQFDGlwOOcQIrtv23fji__T3VygSiepTWEEXyjguz3X41165ZH8TvAMsfjQGC3s-_4l-k8zfITA" aspect-ratio="1.7"></v-img>
                <v-card-title>Amenities</v-card-title>
            </v-card>
        </v-col>
        <v-col cols="4">
            <v-card class="card_clickable" @click="push_transacciones" >
                <v-img src="https://blog.gastfreund.net/data/2018/10/Digital-Guest-Directory-of-Guestfriend_Touchscreen-Kiosk-%C2%A9Gastfreund-GmbH-1400x933.jpg" aspect-ratio="1.7"></v-img>
                <v-card-title>Transacciones</v-card-title>
            </v-card>
        </v-col>
        <v-col cols="4">
            <v-card>
                <v-img @click="push_interacciones" src="https://cdn.cosmicjs.com/947ef480-fe23-11ea-a525-3597bcdfdc76-Depositphotos274144642ds.png" aspect-ratio="1.7"></v-img>
                <v-card-title>Interacciones</v-card-title>
            </v-card>
        </v-col>
    </v-row>
        </v-container>
</v-layout>
</template>

<script>
export default {
    methods:{
        push_grupo(){
            this.$router.push( '/grupos_contenido' );
        },
        push_contenido(){
            this.$router.push( '/contenido_home');
        },
        push_servicio(){
            this.$router.push( '/servicios' );

        },
        push_amenities(){
            this.$router.push( '/amenities' );

        },
        push_transacciones(){
            this.$router.push( '/tipo-transacciones' );

        },
        push_interacciones(){
            this.$router.push( '/' );

        }
    }
}
</script>

<style>
.card_clickable{
  cursor: pointer;
}
</style>

