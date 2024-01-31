<template>
<v-col
cols="12"
md="4"
>
<v-card>
    <v-img :src="prop.imagen" height="250" cover></v-img>
    <v-card-title>
        {{ prop.titulo }}
    </v-card-title>
    <v-card-subtitle>
        {{ prop.precio }}
    </v-card-subtitle>
    <v-card-text class="text-truncate">
        {{ prop.descripcion }}
    </v-card-text>

    <template v-slot:actions>
        <v-btn
        block
        color="blue-darken-1"
        variant="flat"
        :to="{ name: 'propiedad', params: { id: prop.id } }"
        >
            Ver Informacion
        </v-btn>
    </template>



</v-card>
</v-col>
</template>

<script setup>

const props = defineProps({
    prop: Object
})

</script>

<style scoped>

</style>