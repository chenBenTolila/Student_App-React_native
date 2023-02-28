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
//import { newPost } from "../Model/postModel";
import apiClient from "./ClientApi";

const getAllPosts = async () => {
  console.log("in getAllPostsApi ");
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
  return res;
};

const getAllUserPosts = async (sender: string) => {
  const res: any = await apiClient.get("/post?sender=" + sender);
  console.log("in getAllUserPosts " + res.status);
  return res;
};

const addPost = async (postJson: any) => {
  return await apiClient.post("/post", postJson);
};

const deletePost = async (postId: String) => {
  const res: any = await apiClient.delete("/post/" + postId);
  console.log("in delete post " + res.status);
  return res;
};

const editPost = async (postId: String, editedPost: any) => {
  console.log("********* in postApi *************");
  console.log(editedPost);
  const res: any = await apiClient.put("/post/" + postId, editedPost);
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
