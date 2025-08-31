<script setup lang="ts">
import { ref } from "vue";
import { server } from "./server";
import Normal from "./components/frame/Normal.vue";
import routes from "~pages";
const test = ref("null");
const input = ref("");
async function hello() {
	const res = await server.hello.query(input.value);
	test.value = res;
}
console.log(routes);
</script>

<template>
  
    <Normal title="Normal App" >
		<template #bar>
			<v-btn icon="mdi-account-card"></v-btn>
		</template>
		<template #drawer>
			<v-list-item link title="模具" prepend-icon="mdi-anvil"></v-list-item>
			<v-list-item link title="列表2" prepend-icon="mdi-view-list"></v-list-item>
			<v-list-item link title="列表3" prepend-icon="mdi-view-list"></v-list-item>
		</template>
	</Normal>

</template>

<style scoped></style>
