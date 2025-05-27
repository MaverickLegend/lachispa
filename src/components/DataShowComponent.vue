<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useDataflowStore } from '../store/useDataflowStore';
import { useRoute } from 'vue-router';

const route = useRoute();
const dataflowStore = useDataflowStore();
const name = route.params.name as string;

const fetchData = () => {
    dataflowStore.getDataById(
        route.params.agencyId as string,
        route.params.id as string,
        route.params.version as string,
    );
};

onMounted(fetchData);

watch(
    () => [route.params.agencyId, route.params.id, route.params.version],
    fetchData
);
</script>

<template>
    <div class="container mx-auto p-4">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold">
                Datos de: {{ name }}
            </h2>
            <router-link to="/" class="btn btn-outline btn-ghost">
                Volver a lista
            </router-link>
        </div>

        <div v-if="dataflowStore.dataLoading">Cargando datos...</div>
        <div v-else-if="dataflowStore.dataError" class="alert alert-error">
            {{ dataflowStore.dataError }}
        </div>
        <div v-else class="bg-base-200 p-4 rounded-lg">
            <pre class="overflow-auto max-h-screen">{{ dataflowStore.data }}</pre>
        </div>
    </div>
</template>