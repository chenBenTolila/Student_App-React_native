import apiClient from "./ClientApi";

const addUser = async (userJson: any) => {
  return apiClient.post("/auth/register", userJson);
};

const uploadImage = async (image: any) => {
  return apiClient.post("/file/file", image);
};

const loginUser = async (credentials: any) => {
  return apiClient.post("/auth/login", credentials);
};

export default {
  addUser,
  uploadImage,
  loginUser,
};
