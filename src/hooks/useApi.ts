import axios from "axios";
import { Operation } from "../types/Operation";

const api = axios.create({
  baseURL: "http://ec2-3-140-196-210.us-east-2.compute.amazonaws.com:8080",
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
  getUserCredit: async () => {
    const response = await api.get("/record/credit", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  },
  getUserRecords: async () => {
    const response = await api.get("/record", {
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
    return response.data.result;
  },
});
