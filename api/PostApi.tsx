// import apiClient from "./ClientApi";

// const getAllPosts = async () => {
//   return apiClient.get("/student");
// };

// const getMyPosts = async () => {
//   return apiClient.get("/student");
// };

// const addPost = async (studentJson: any) => {
//   return apiClient.post("/student", studentJson);
// };

// const uploadImage = async (image: any) => {
//   return apiClient.post("/file/file", image);
// };

// export default {
//   getAllPosts,
//   getMyPosts,
//   addPost,
//   uploadImage,
// };

/////////////////////////////////////////////////////////////

import UserModel from "../Model/UserModel";
import { newPost } from "../Model/postModel";
import apiClient from "./ClientApi";

const getAllPosts = async () => {
  const res: any = await apiClient.get("/post");
  console.log("in getAllPosts " + res.status);

  // TODO: add refresh token
  if (res.status == 401) {
    // console.log("in 401 - getAllPosts");
    // await UserModel.refreshToken();
    // return apiClient.get("/post");
  }
  return res;
};

const getPostById = async (postId: String) => {
  const res: any = await apiClient.get("/post/" + postId);
  console.log("in getPostById ");

  // if (res.status == 401) {
  //   console.log("in 401 - getPostById");
  //   await UserModel.refreshToken();
  //   return apiClient.get("/post/" + postId);
  // }
  return res;
};

const getAllUserPosts = async (userId: string) => {
  const res: any = await apiClient.get("/post?sender=" + userId);
  console.log("in getAllUserPosts " + res.status);

  // if (res.status == 401) {
  //   console.log("in 401 - getAllUserPosts");
  //   await UserModel.refreshToken();
  //   return apiClient.get("/post?sender=" + userId);
  // }
  return res;
};

const addPost = async (postJson: any) => {
  const res: any = await apiClient.post("/post", postJson);
  console.log("in add new post " + res.status);
  // if (res.status == 401) {
  //   console.log("in 401 - addPost");

  //   await UserModel.refreshToken();
  //   return apiClient.post("/post", postJson);
  // }
  return res;
};

const deletePost = async (postId: String) => {
  const res: any = await apiClient.delete("/post/" + postId);
  console.log("in delete post " + res.status);
  // if (res.status == 401) {
  //   console.log("in 401 - deletePost");

  //   await UserModel.refreshToken();
  //   return apiClient.delete("/post/" + postId);
  // }
  return res;
};

const editPost = async (postId: String, post: newPost) => {
  console.log("********* in postApi *************");
  console.log(post);
  const res: any = await apiClient.put("/post/" + postId, post);
  console.log("in edit post " + res.status);
  // if (res.status == 401) {
  //   console.log("in 401 - editPost");

  //   await UserModel.refreshToken();
  //   return apiClient.put("/post/" + postId, post);
  // }
  return res;
};

const uploadImage = async (image: any) => {
  return apiClient.post("/file/file", image);
};

export default {
  getAllPosts,
  addPost,
  uploadImage,
  getAllUserPosts,
  deletePost,
  getPostById,
  editPost,
};
