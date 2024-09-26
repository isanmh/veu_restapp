import axios from "axios";
const domain = "http://localhost:5000";
const urlImage = `${domain}/images/`;
const urlApi = `${domain}/api/`;

const api = axios.create({
  baseURL: urlApi,
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
});

export { api, domain, urlImage };
