import { create } from "apisauce";
const apiClient = create({
  baseURL: "http://192.168.43.107:3000",
  headers: { Accept: "application/vnd.github.v3+json" },
});
export default apiClient;
