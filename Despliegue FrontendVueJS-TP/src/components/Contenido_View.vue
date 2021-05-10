<template>
<v-layout align-center>
        <v-container >
    <v-row class="first_image_row">
        <v-col cols="6">
            <v-card class="element-with-pointer" @click="push_generico">
                <v-img src="https://www.cocoschool.com/wp-content/uploads/ejemplo-de-digital-signage-1024x512.jpg" aspect-ratio="1.7"></v-img>
                <v-card-title>Contenido Generico</v-card-title>
            </v-card>
        </v-col>
        <v-col cols="6">
            <v-card class="element-with-pointer" @click="push_personalizado" >
                <v-img src="https://www.novisign.com/wp-content/uploads/2018/08/digital-signage-for-hotels.png" aspect-ratio="1.7"></v-img>
                <v-card-title>Contenido Personalizado</v-card-title>
            </v-card>
        </v-col>
    </v-row>
        </v-container>
</v-layout>
</template>

<script>
export default {
    methods:{
        push_generico(){
            this.$router.push( '/contenidos/generico' );
        },
        push_personalizado(){
            this.$router.push( '/contenidos/personalizado' );
        },
    }
}
</script>

<style>

.element-with-pointer{
    cursor: pointer;
}
</style>

