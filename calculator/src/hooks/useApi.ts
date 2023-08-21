import axios from "axios";
import { Operation } from "../types/Operation";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const useApi = () => ({
  signIn: async (username: string, password: string) => {
    const response = await api.post("/auth/login", { username, password });
    return response.data;
  },
  getOperations: async () => {
    const response = await api.get("/operation", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  },
  getUserRecords: async (userId: number) => {
    const response = await api.get("/record?user-id?" + userId, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  },
  performOperation: async (
    operation: Operation,
    paramOne: number,
    paramTwo: number
  ) => {
    const response = await api.post(
      "/operation/" + operation.type,
      { operation, paramOne, paramTwo },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
    return response.data.result;
  },
});
