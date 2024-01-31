<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';



const auth = useAuthStore();


</script>

<template>
  <v-card elevation="3" max-width="1200" class="mx-auto">
    <v-layout>
      <v-app-bar color="blue-darken-1">



        <template v-slot:prepend>
          <v-btn class="uppercase ml-2" :to="{ name: 'home' }">bienes raices - vuefire</v-btn>
        </template>


        <template v-slot:append>

          <div v-if="auth.isAuth">
            <v-btn class="uppercase mr-2" :to="{ name: 'admin-propiedades' }">Admin</v-btn>
            <v-btn class="uppercase mr-2" @click="auth.logout">Cerrar Sesion</v-btn>
          </div>

          <div v-else>
            <v-btn class="uppercase mr-2" :to="{ name: 'home' }">Inicio</v-btn>
            <v-btn class="uppercase mr-2" :to="{ name: 'login' }">Iniciar Sesion</v-btn>
          </div>

        </template>



      </v-app-bar>
      <v-main>
        <v-container>
          <RouterView />
        </v-container>
      </v-main>

    </v-layout>

  </v-card>
</template>


<style scoped></style>
