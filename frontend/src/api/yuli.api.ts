import axios from 'axios';

export const YuliApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_YULI_API_URL,
  headers: {
    Authorization: "Basic Y3JpczpwYXNzd29yZA==",
    Accept: "application/json",
  },
});
