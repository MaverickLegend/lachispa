<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useDataflowStore } from '../store/useDataflowStore';

const route = useRoute();
const dataflowStore = useDataflowStore();

const fetchData = async () => {
    await dataflowStore.getCodelistsFromDSD(
        route.params.agencyId as string,
        route.params.structure as string,
    );
    await dataflowStore.getAllCodeList()
};

onMounted(async () => {
    await fetchData();
});
</script>


<template>
    <div class="container mx-auto p-4">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Data Structure Components</h2>
            <router-link to="/" class="btn btn-ghost">
                Volver a lista
            </router-link>
        </div>

        <div v-if="dataflowStore.codeListLoading" class="flex justify-center">
            <span class="loading loading-spinner loading-lg"></span>
            <span class="ml-2">Cargando estructura...</span>
        </div>

        <div v-else-if="dataflowStore.codeListError" class="alert alert-error">
            {{ dataflowStore.codeListError }}
        </div>

        <div v-else-if="dataflowStore.codeList">

            <!-- Debug completo -->
            <details class="collapse collapse-arrow bg-base-300 px-5 my-5">
                <summary class="collapse-title font-medium">
                    🔍 Ver estructura completa (Debug)
                </summary>
                <div class="collapse-content">
                    <pre
                        class="text-xs overflow-auto max-h-96 bg-base-100 p-4 rounded whitespace-pre-wrap">{{ JSON.stringify(dataflowStore.codeList, null, 2) }}</pre>
                </div>
            </details>
            <details class="collapse collapse-arrow bg-base-300 px-5 my-5">
                <summary class="collapse-title font-medium">
                    🔍 Ver todos los códigos
                </summary>
                <div class="collapse-content pt-4">
                    <div class="overflow-x-auto">
                        <table class="table table-xs table-zebra">
                            <thead>
                                <tr>
                                    <th class="w-1/4">ID Codelist</th>
                                    <th class="w-1/4">Nombre Codelist</th>
                                    <th class="w-1/2">Códigos</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="codelist in dataflowStore.allCodelist" :key="codelist.id">
                                    <td>
                                        <code class="text-xs">{{ codelist.id }}</code>
                                    </td>
                                    <td>
                                        <span class="text-xs">{{ codelist.name }}</span>
                                    </td>
                                    <td>
                                        <div class="max-h-32 overflow-y-auto">
                                            <table class="table table-xs py-5">
                                                <thead class="sticky top-0">
                                                    <tr>
                                                        <th class="bg-base-200">ID</th>
                                                        <th class="bg-base-200">Nombre</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="code in codelist.codes" :key="code.id">
                                                        <td>
                                                            <code class="text-xs">{{ code.id }}</code>
                                                        </td>
                                                        <td>
                                                            <span class="text-xs">{{ code.name }}</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </details>
            <div class="grid grid-cols-2 gap-4">
                <!-- Attribute List -->
                <div v-if="dataflowStore.codeList.attributeList?.attributes" class="card bg-base-100 shadow-lg">
                    <div class="card-body">
                        <h3 class="card-title text-info">
                            🏷️ Attributes ({{ dataflowStore.codeList.attributeList.attributes.length }})
                        </h3>
                        <div class="overflow-x-auto">
                            <table class="table table-zebra">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Assignment Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="attribute in dataflowStore.codeList.attributeList.attributes"
                                        :key="attribute.id">
                                        <td>
                                            <code class="badge badge-outline">{{ attribute.id }}</code>
                                        </td>
                                        <td>
                                            <span class="badge" :class="{
                                                'badge-success': attribute.assignmentStatus === 'Mandatory',
                                                'badge-warning': attribute.assignmentStatus === 'Conditional',
                                                'badge-ghost': attribute.assignmentStatus === 'Optional'
                                            }">
                                                {{ attribute.assignmentStatus }}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Dimension List -->
                <div v-if="dataflowStore.codeList.dimensionList?.dimensions" class="card bg-base-100 shadow-lg">
                    <div class="card-body">
                        <h3 class="card-title text-info">
                            📊 Dimensions ({{ dataflowStore.codeList.dimensionList.dimensions.length }})
                        </h3>
                        <div class="overflow-x-auto">
                            <table class="table table-zebra">
                                <thead>
                                    <tr>
                                        <th>Posición</th>
                                        <th>ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="dimension in dataflowStore.codeList.dimensionList.dimensions"
                                        :key="dimension.id">
                                        <td>
                                            <span class="badge badge-neutral">{{ dimension.position }}</span>
                                        </td>
                                        <td>
                                            <code class="badge badge-outline">{{ dimension.id }}</code>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Time Dimensions -->
                <div v-if="dataflowStore.codeList.dimensionList?.timeDimensions" class="card bg-base-100 shadow-lg">
                    <div class="card-body">
                        <h3 class="card-title text-info">
                            ⏰ Time Dimensions ({{ dataflowStore.codeList.dimensionList.timeDimensions.length }})
                        </h3>
                        <div class="overflow-x-auto">
                            <table class="table table-zebra">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Posición</th>
                                        <th>Representación</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="timeDim in dataflowStore.codeList.dimensionList.timeDimensions"
                                        :key="timeDim.id">
                                        <td>
                                            <code class="badge badge-outline">{{ timeDim.id }}</code>
                                        </td>
                                        <td>
                                            <span class="badge badge-neutral">{{ timeDim.position }}</span>
                                        </td>
                                        <td>
                                            <div v-if="timeDim.localRepresentation" class="text-sm">
                                                {{ timeDim.localRepresentation.textFormat?.textType || 'Time Format' }}
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Measure List -->
                <div v-if="dataflowStore.codeList.measureList?.primaryMeasure" class="card bg-base-100 shadow-lg">
                    <div class="card-body">
                        <h3 class="card-title text-info">
                            📏 Primary Measure
                        </h3>
                        <div class="bg-base-200 p-4 rounded-lg">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <strong>ID:</strong>
                                    <code
                                        class="ml-2 badge badge-outline">{{ dataflowStore.codeList.measureList.primaryMeasure.id }}</code>
                                </div>
                                <div>
                                    <strong>Nombre:</strong>
                                    {{ dataflowStore.codeList.measureList.primaryMeasure.name ||
                                        dataflowStore.codeList.measureList.primaryMeasure.names?.es || 'N/A' }}
                                </div>
                                <div v-if="dataflowStore.codeList.measureList.primaryMeasure.localRepresentation"
                                    class="md:col-span-2">
                                    <strong>Representación:</strong>
                                    <div class="mt-1 text-sm">
                                        {{
                                            dataflowStore.codeList.measureList.primaryMeasure.localRepresentation.textFormat?.textType
                                            || 'Numeric' }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>


        <div v-else class="alert alert-info">
            No hay datos de estructura disponibles
        </div>
    </div>
</template>