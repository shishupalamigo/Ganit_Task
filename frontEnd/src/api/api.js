import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const getData = (apiUrl) => {
  return axios.get(apiUrl);
};

export const postData = (payload) => {
  return axios.post("/", payload);
};