<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useDataflowStore } from '../store/useDataflowStore';
import { useRoute } from 'vue-router';

const route = useRoute();
const dataflowStore = useDataflowStore();

const fetchData = () => {
    dataflowStore.getDSDbyId(
        route.params.agencyId as string,
        route.params.id as string,
    );
};

onMounted(fetchData);

// Recargar cuando cambien los parámetros
watch(
    () => [route.params.agencyId, route.params.id, route.params.version],
    fetchData
);
</script>

<template>
    <div class="container mx-auto p-4">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">
                Datos: {{ route.params.id }} v{{ route.params.version }}
            </h2>
            <router-link to="/" class="btn btn-ghost">
                Volver a lista
            </router-link>
        </div>

        <div v-if="dataflowStore.dsdLoading">Cargando datos...</div>
        <div v-else-if="dataflowStore.dsdError" class="alert alert-error">
            {{ dataflowStore.dsdError }}
        </div>
        <div v-else class="bg-base-200 p-4 rounded-lg">
            <pre class="overflow-auto max-h-screen">{{ dataflowStore.dsd }}</pre>
        </div>
    </div>
</template>