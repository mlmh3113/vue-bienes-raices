<template>
    <v-card max-width="800" flat class="mx-auto">

        <v-card-title class="text-h4 text-center font-weight-bold">
            Nueva Propiedad
        </v-card-title>

        <v-card-subtitle class="text-center font-weight-bold text-h5">
            Crea una nueva propiedad llenando el siguiente formulario
        </v-card-subtitle>

        <v-form class="mt-10">

            <v-text-field label="Titulo Propiedad" class="mb-5" v-model="titulo.value.value"
                :error-messages="titulo.errorMessage.value"></v-text-field>

            <v-file-input accept="image/jpg, image/png" label="Fotografia" prepend-icon="mdi-camera" class="mb-5"
                v-model="imagen.value.value" :error-messages="imagen.errorMessage.value" @change="uploadImage">
                >
            </v-file-input>

            <div class="my-5" v-if="image">

                <p class="font-weight-bold">Imagen Propiedad</p>
                <img class="w-50" :src="image" alt="imagen propiedad">

            </div>

            <v-text-field label="Precio" class="mb-5" v-model="precio.value.value"
                :error-messages="precio.errorMessage.value"></v-text-field>

            <v-row>
                <v-col cols="12" md="4">
                    <v-select :items="items" label="Habitaciones" class="mb-5" v-model="habitaciones.value.value"
                        :error-messages="habitaciones.errorMessage.value">
                    </v-select>
                </v-col>

                <v-col cols="12" md="4">
                    <v-select :items="items" label="Baños" class="mb-5" v-model="banos.value.value"
                        :error-messages="banos.errorMessage.value">
                    </v-select>
                </v-col>

                <v-col cols="12" md="4">
                    <v-select :items="items" label="Cantidad de estacionamientos" class="mb-5"
                        v-model="estacionamiento.value.value" :error-messages="estacionamiento.errorMessage.value">
                    </v-select>
                </v-col>

            </v-row>

            <v-textarea cols="12" label="Descripión" class="mb-5" v-model="descripcion.value.value"
                :error-messages="descripcion.errorMessage.value">
            </v-textarea>

            <v-checkbox label="Alberca" v-model="alberca.value.value"></v-checkbox>

            <h2 class="text-center font-weight-bold my-5">Ubicacion</h2>
            <div class="pb-10">
            <div style="height:600px">
                <LMap 
                v-model:zoom="zoom" 
                :center="center"
                :use-global-leaflet="false" 
                >
                    <LMarker :lat-lng="center" draggable @moveend="pin"></LMarker>
                    <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" ></LTileLayer>
                </LMap>
            </div>
            </div>

            <v-btn @click="submit" color="pink-darken-1" block>
                Agregar Propiedad
            </v-btn>


        </v-form>
    </v-card>
</template>

<script setup>
import { useForm, useField } from 'vee-validate';
import { validationSchema, imageSchema } from '@/validation/propiedadSchema';
import { collection, addDoc } from 'firebase/firestore';
import { useFirestore } from 'vuefire';
import { useRouter } from 'vue-router';
import useImage from '@/composables/useImage';
import useLocationMap from '@/composables/useLocationMap';
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer , LMarker } from "@vue-leaflet/vue-leaflet";

const items = ['1', '2', '3', '4', '5']

const { uploadImage, image, url } = useImage();

const { zoom , center , pin} = useLocationMap();

const db = useFirestore();

const router = useRouter();

const { handleSubmit } = useForm(
    {
        validationSchema: {
            ...validationSchema,
            ...imageSchema
        }
    }
);

const titulo = useField('titulo');
const imagen = useField('imagen');
const precio = useField('precio');
const habitaciones = useField('habitaciones');
const banos = useField('banos');
const estacionamiento = useField('estacionamiento');
const descripcion = useField('descripcion');
const alberca = useField('alberca', null, {
    initialValue: false
});



const submit = handleSubmit(async (values) => {
    const { imagen, ...propiedad } = values;
    const docRef = await addDoc(collection(db, "propiedades"), {
        ...propiedad,
        imagen: url.value,
        ubicacion : center.value,
    });

    if (docRef.id) {
        router.push({ name: 'admin-propiedades' });
    }
});



</script>

<style scoped></style>