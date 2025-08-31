<template>
  <div>
    <h1>Hello, World! about</h1>
    <router-link to="/">Home</router-link>
    <v-btn @click="goHome">Go Home</v-btn>
    <v-btn @click="$uigo('/')">Go Home</v-btn>
    <div>
      <v-text-field v-model="input" label="Input" />
      <v-btn @click="hello">Hello</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { uigo } from '../easyKit'
import { server } from '../server';
const input = ref('');
async function hello(){
  const get = await server.hello.query(input.value);
  input.value = get;
}
function goHome() {
  uigo('/')
}
</script>