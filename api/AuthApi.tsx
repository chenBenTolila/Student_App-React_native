import apiClient from "./ClientApi";

const addUser = async (userJson: any) => {
  return apiClient.post("/auth/register", userJson);
};

const uploadImage = async (image: any) => {
  return apiClient.post("/file/file", image);
};

export default {
  addUser,
  uploadImage,
};
