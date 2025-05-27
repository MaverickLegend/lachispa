import { defineStore } from "pinia";
import { ref } from "vue";
import type { Codelist, Dataflow, DataflowReferenceMap } from "../types/dataflow";
import { dataflowApi } from "../api/dataflowApi";
import { extractDSDId } from "../utils/extractDsd";
import axios from "axios";

export const useDataflowStore = defineStore("dataflow", () => {
  // Estado de la lista de dataflows
  const dataflows = ref<Dataflow[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Estado para los datos de un dataflow
  const data = ref(null);
  const dataLoading = ref(false);
  const dataError = ref<string | null>(null);

  // Estado para la estructura DSD
  const dsd = ref(null);
  const dsdLoading = ref(false);
  const dsdError = ref<string | null>(null);

  // Estado para las codelists
  const codeList = ref<any>(null);
  const codeListLoading = ref(false);
  const codeListError = ref<string | null>(null);

  // Estado de todos los codelists
  const allCodelist = ref<Codelist[]>([]);
  const allCodelistLoading = ref(false);
  const allCodelistError = ref<string | null>(null);

  // Obtener todos los dataflows
  async function fetchDataflows() {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await dataflowApi.get("/dataflow");
      const dataflowMap: DataflowReferenceMap = data.data?.dataflows ?? {};
      dataflows.value = Object.values(dataflowMap);
    } catch (err: any) {
      error.value = err.message || "Error al obtener dataflows";
    } finally {
      loading.value = false;
    }
  }

  // Obtener un DSD por su ID
  async function getDSDbyId(agencyId: string, dsdId: string) {
    dsd.value = null;
    dsdError.value = null;
    dsdLoading.value = true;

    try {
      dsdId = extractDSDId(dsdId) || dsdId;
      const { data } = await dataflowApi.get(`/datastructure/${agencyId}/${dsdId}`);
      dsd.value = data.data.dataStructures;
    } catch (err: any) {
      dsdError.value = err.message || "Error al obtener DSD";
    } finally {
      dsdLoading.value = false;
    }
  }

  // Obtener datos de un dataflow específico
  async function getDataById(agencyId: string, dataflowId: string, version: string) {
    data.value = null;
    dataError.value = null;
    dataLoading.value = true;

    try {
      const { data: response } = await axios.get(
        `https://sdmx.ine.gob.cl/rest/data/${agencyId},${dataflowId},${version}`,
        {
          headers: {
            Accept: "application/vnd.sdmx.data+json; charset=utf-8; version=2",
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );
      data.value = response.data;
    } catch (err: any) {
      dataError.value = err.message || "Error al obtener datos";
    } finally {
      dataLoading.value = false;
    }
  }

  async function getCodelistsFromDSD(agencyId: string, structureId: string) {
    codeList.value = [];
    codeListError.value = null;
    codeListLoading.value = true;

    try {
      const dsdId = extractDSDId(structureId);
      console.log(dsdId);
      const { data } = await dataflowApi.get(`/datastructure/${agencyId}/${dsdId}`);
      const structure = data?.data?.dataStructures?.[0] ?? {};
      console.log(structure.dataStructureComponents.attributeList.attributes);

      codeList.value = structure.dataStructureComponents;
      console.log(codeList.value);
    } catch (err: any) {
      codeListError.value = err.message || "Error al obtener codelists desde DSD";
    } finally {
      codeListLoading.value = false;
    }
  }

  async function getAllCodeList() {
    allCodelistLoading.value = false;
    allCodelistError.value = null;
    try {
      const { data } = await dataflowApi.get("/codelist/CL01");
      allCodelist.value = data.data.codelists;
      console.log(allCodelist.value);
    } catch (err: any) {
      allCodelistError.value = err.message || "Error al obtener todas las codelists";
    }
  }

  return {
    // Estado general
    dataflows,
    loading,
    error,

    // Datos
    data,
    dataLoading,
    dataError,

    // DSD
    dsd,
    dsdLoading,
    dsdError,

    // Codelist
    codeList,
    codeListLoading,
    codeListError,

    // Todas las codelists
    allCodelist,

    // Métodos
    fetchDataflows,
    getDSDbyId,
    getDataById,
    getCodelistsFromDSD,
    getAllCodeList,
  };
});
