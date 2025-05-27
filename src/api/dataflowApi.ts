import axios from "axios";

const dataflowApi = axios.create({
  baseURL: "https://sdmx.ine.gob.cl/rest/",

  headers: {
    Accept: "application/vnd.sdmx.structure+json; charset=utf-8; version=1.0.0-wd",
    "Content-Type": "application/json; charset=utf-8",
  },
});

export { dataflowApi };
