<template>
    <v-dialog :value="dialog" @click:outside="cerrarDialogo" width="500">
        <v-card>
            <v-card-title>
               ¿Continuar con la eliminación de grupo de<br/>contenido?
            </v-card-title>
            <v-card-text>
                No se podrá recuperar el grupo después de esta acción.
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" class="white--text" width="120" @click="cerrarDialogo">NO</v-btn>
                <v-btn color="green" class="white--text" width="120" @click="borrarValidado">SÍ</v-btn> 
            </v-card-actions>

        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'DialogoEliminacionGrupo',
    props: ['dialog'],
    data(){
        return{
           
        }
    },
    methods:{
        cerrarDialogo(){
            this.$emit('close');
        },
        borrarValidado(){
            this.$emit('borrarValido')
        }
    }
}
</script>


<style>

</style>