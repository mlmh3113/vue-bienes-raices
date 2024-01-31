<template>
    <v-card>
        <v-card-title class="text-h5 font-weight-bold text-center">
            {{ prop?.titulo }}
        </v-card-title>
        <v-img height="550" :src="prop?.imagen" cover></v-img>
        <v-card-subtitle>
            {{ prop.precio }}
        </v-card-subtitle>
       
        <div class="d-flex justify-space-between">

             <v-card-text>
            Habitaciones: <span class="font-weight-bold">{{ prop.habitaciones }}</span>
        </v-card-text>
            <v-card-text>
            Baños: <span class="font-weight-bold">{{ prop.banos }}</span>
        </v-card-text>
        <v-card-text>
            Estacionamientos: <span class="font-weight-bold">{{ prop.estacionamiento }}</span>
        </v-card-text>
        <v-card-text>Pileta: <span class="font-weight-bold">{{ prop.alberca ? 'Si' : 'No' }}</span></v-card-text>
       
        </div>

        <v-row>
            <v-col cols="12" md="8">
                   <v-card-text>
            {{ prop.descripcion }}
        </v-card-text>
            </v-col>
            <v-col cols="12" md="4">
                <div style="height:200px">
                    <LMap  zoom=10 :center="prop.ubicacion" :use-global-leaflet="false">
                        <LMarker :lat-lng="prop.ubicacion" />
                        <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></LTileLayer>
                    </LMap>
                </div>
                
            </v-col>
        </v-row>
    

    </v-card>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useFirestore, useDocument } from 'vuefire';
import { doc } from 'firebase/firestore';
import "leaflet/dist/leaflet.css";
import {
    LMap,
    LTileLayer,
    LMarker
} from "@vue-leaflet/vue-leaflet";

const route = useRoute();

const { id } = route.params

const db = useFirestore()
const prop = useDocument(doc(db, "propiedades", id))


</script>

<style  scoped>

</style>