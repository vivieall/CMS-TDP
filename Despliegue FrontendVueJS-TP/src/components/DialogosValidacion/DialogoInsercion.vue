<template>
    <v-dialog :value="dialog" @click:outside="cerrarDialogo" width="570">
        <v-card>
            <v-card-title>
                ¿Continuar con la creación de {{titulo}}?
            </v-card-title>
           
            <v-card-text>
                Verifique que los datos ingresados sean los correctos.
            </v-card-text>
         
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" class="white--text" width="120" @click="cerrarDialogo">NO</v-btn>
                <v-btn color="green" class="white--text" width="120" @click="guardarValidado">SÍ</v-btn> 
            </v-card-actions>

        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'DialogoInsercion',
    props: ['dialog', 'titulo'],
    data(){
        return{
           
        }
    },
    methods:{
        cerrarDialogo(){
            this.$emit('close');
        },
        guardarValidado(){
            this.$emit('guardarValido');
        }
    }
}
</script>


<style>

</style>