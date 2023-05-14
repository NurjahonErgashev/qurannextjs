import axios from "axios";

export const zapros = axios.create({
  baseURL: "https://api.alquran.cloud/v1/surah",
  timeout: Infinity,
});
