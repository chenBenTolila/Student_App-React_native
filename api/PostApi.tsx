import apiClient from "./ClientApi";

const getAllPosts = async () => {
  return apiClient.get("/student");
};

const getMyPosts = async () => {
  return apiClient.get("/student");
};

const addPost = async (studentJson: any) => {
  return apiClient.post("/student", studentJson);
};

const uploadImage = async (image: any) => {
  return apiClient.post("/file/file", image);
};

export default {
  getAllPosts,
  getMyPosts,
  addPost,
  uploadImage,
};
