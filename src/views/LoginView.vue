<template>
 
    <v-card
    flat
    max-width="600"
    class="mx-auto my-6"
    >
    <v-card-title 
    class="text-h4 text-center font-weight-bold">
        Iniciar Seccion
    </v-card-title>

    <v-card-subtitle
    class="text-center font-weight-bold text-h5"
    >
        Inicia Sesion con tu cuenta
    </v-card-subtitle>

    <v-form
    class="mt-5"
    >

    <v-text-field
    type="email"
    label="Email"
    bg-color="blue-grey-lighten-5"
    class="mb-2"
    v-model="email.value.value"
    :error-messages="email.errors.value"
    >
    </v-text-field>

    <v-text-field
    type="password"
    label="Contraseña"
    bg-color="blue-grey-lighten-5"
    class="mb-2"
    v-model="password.value.value"
    :error-messages="password.errors.value"
    >
    </v-text-field>

    <v-alert class="mb-2" v-if="auth.hasError"
    type="error"
    >
    <template v-slot:title>
        {{ auth.hasError }}
          </template>

          Verifique su Mail o Contraseña
    </v-alert>
    
        

    <v-btn
    color="blue"
    class="white--text w-100"
    @click="submit"
    >
        Iniciar Sesion
    </v-btn>

    </v-form>
    </v-card>



</template>

<script setup>
import { useField , useForm } from 'vee-validate';
import { loginSchema as validationSchema } from '../validation/loginSchema.js';
import { useAuthStore } from '../stores/auth.js';


const auth = useAuthStore();

const { handleSubmit } = useForm({validationSchema});



const email = useField('email');
const password = useField('password');

const submit = handleSubmit(values => {
    auth.login(values);
});

</script>

<style scoped>

</style>../validation/loginSchema.js