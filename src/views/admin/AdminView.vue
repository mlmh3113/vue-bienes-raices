<template>
    <h2 class="text-center text-h3 font-weight-bold my-5" >Admin Panel</h2>

    <v-btn
    color="blue-darken-1"
    variant="flat"
    :to="{ name: 'nueva-propiedad' }"
    >
        Nueva Propiedad
    </v-btn>

    <v-card>
        <v-list>
            <v-list-item  v-for="prop in propiedadesCollection" :key="prop.id"
            :to="{ name: 'editar-propiedad', params: { id: prop.id } }"
            variant="flat"
            >

            <template v-slot:prepend>
                <v-list-item-media :start="true">
                    <img width="180" :src="prop.imagen" alt="imagen-propiedad">
                </v-list-item-media>
            </template>

                <v-list-item-title>{{ prop.titulo }}</v-list-item-title>
                <v-list-item-subtitle>{{ priceProperty(prop.precio) }}</v-list-item-subtitle>

            <template v-slot:append>
               
                    <v-btn
                    color="blue-darken-1"
                    variant="flat"
                    class="mr-2"
                    :to="{ name: 'editar-propiedad', params: { id: prop.id } }"
                    >Editar  
                    </v-btn>

                    <v-btn
                    color="red-darken-1"
                    variant="flat"
                    class="mr-2"
                    @click="eliminarPropiedad(prop.id,prop.imagen)"
                    >eliminar  
                    </v-btn>
              
                  
               
            </template>
                
            </v-list-item>
        </v-list>
    </v-card>

  

</template>



<script setup>
import usePropiedades from '@/composables/usePropiedades';

const { propiedadesCollection , priceProperty , eliminarPropiedad } = usePropiedades();

</script>

<style  scoped>

</style>