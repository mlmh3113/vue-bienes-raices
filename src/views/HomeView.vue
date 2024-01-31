<template>

        <h1 class="text-center text-h3 pb-5">Nuestras Propiedades</h1>
        
        <v-card flat class="py10">
            <v-card-title>
                <h2 class="text-h5 font-weight-bold">Busca por tipo de propiedad</h2>
               <v-checkbox v-model="alberca" label="Alberca">
                   
               </v-checkbox>
            </v-card-title>
            <v-row>
                <Propiedad v-for="prop in propiedadesFiltradas" :key="prop.id" :prop="prop"></Propiedad>
            </v-row>

        </v-card>


</template>

<script setup>
import usePropiedades from '@/composables/usePropiedades';
import Propiedad from '@/components/Propiedad.vue';

const { alberca , propiedadesFiltradas } = usePropiedades();





</script>

<style scoped>

</style>