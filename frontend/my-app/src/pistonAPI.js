import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const executeCode = async (language, code, questionId) => {
  const response = await API.post(`run/${questionId}`, {
    language,
    code,
    version: LANGUAGE_VERSIONS[language],
  });
  console.log(response);
  return response.data;
};
