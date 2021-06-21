<template>
    <v-dialog :value="dialog" @click:outside="cerrarDialogo" width="570">
        <v-card>
            <v-card-title>
                ¿Seguro que quieres cerrar la sesión?
            </v-card-title>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" class="white--text" width="120" @click="cerrarDialogo">NO</v-btn>
                <v-btn color="green" class="white--text" width="120" @click="cerrarSesionValidado">SÍ</v-btn> 
            </v-card-actions>

        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'DialogoCerrarSesion',
    props: ['dialog'],
    data(){
        return{
           
        }
    },
    methods:{
        cerrarDialogo(){
            this.$emit('close');
        },
        cerrarSesionValidado(){
            this.$emit('cerrarSesionValido');
        }
    }
}
</script>


<style>

</style>