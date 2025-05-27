<script setup lang="ts">
import { onMounted } from 'vue';
import { useDataflowStore } from '../../store/useDataflowStore';

const dataflowStore = useDataflowStore();

onMounted(() => {
    dataflowStore.fetchDataflows();
});
</script>

<template>
    <div class="container mx-auto p-4">
        <div>
            <h2 class="text-center text-3xl pb-5">Lista de Dataflows</h2>
            <div v-if="dataflowStore.loading">Cargando...</div>
            <div v-if="dataflowStore.error">{{ dataflowStore.error }}</div>
            <table class="trable table-xs table-fixed w-full border-collapse border border-gray-400">
                <thead>
                    <tr>
                        <th class="border bg-primary text-xs">ID</th>
                        <th class="border bg-primary text-xs">Nombre</th>
                        <th class="border bg-primary text-xs">Agencia</th>
                        <th class="border bg-primary text-xs">Versión</th>
                        <th class="border bg-primary text-xs">Anotaciones</th>
                        <th class="border bg-primary text-xs">Data Structure</th>
                        <th class="border bg-primary text-xs">Datos</th>
                        <th class="border bg-primary text-xs">Codelist</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in dataflowStore.dataflows" :key="item.id">
                        <td class="text-base-content text-center border">{{ item.id }}</td>
                        <td class="text-base-content text-center border">{{ item.name }}</td>
                        <td class="text-base-content text-center border">{{ item.agencyID }}</td>
                        <td class="text-base-content text-center border">{{ item.version }}</td>
                        <td class="text-base-content text-center border">{{ item.annotations }}</td>
                        <td class="text-base-content text-center border">
                            <router-link :to="{
                                name: 'dsd-detail',
                                params: {
                                    agencyId: item.agencyID,
                                    id: item.structure
                                }
                            }" class="btn btn-secondary btn-sm">
                                Obtener DSD
                            </router-link>
                        </td>
                        <td class="text-base-content text-center border">
                            <router-link :to="{
                                name: 'dataflow-detail',
                                params: {
                                    name: item.name,
                                    agencyId: item.agencyID,
                                    id: item.id,
                                    version: item.version
                                }
                            }" class="btn btn-secondary btn-sm">
                                Ver
                            </router-link>
                        </td>
                        <td class="text-base-content text-center border">
                            <router-link :to="{
                                name: 'dsd-codelist',
                                params: {
                                    name: item.name,
                                    agencyId: item.agencyID,
                                    version: item.version,
                                    structure: item.structure,
                                }
                            }" class="btn btn-secondary btn-sm">
                                Ver
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped></style>