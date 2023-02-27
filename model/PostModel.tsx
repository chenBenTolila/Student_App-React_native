// import apiClient from "../api/ClientApi";
// import PostApi from "../api/PostApi";
// import FormData from "form-data";
// import UserModel from "./UserModel";

// export type Post = {
//   postId: String;
//   userName: String;
//   text: String;
//   image: String;
//   userImage: String;
// };

// const createPostsList = async (res: any) => {
//   let posts = Array<Post>();
//   if (res.data) {
//     console.log(" in  if (res.data)");
//     console.log(res.data);
//     const postlist = res.data.post;
//     console.log(postlist);
//     for (let i = 0; i < postlist.length; ++i) {
//       console.log("element: " + postlist[i]._id);
//       const user: any = await UserModel.getUserById(postlist[i].sender);
//       console.log("user name - " + user.fullName);
//       const st: Post = {
//         username: user.fullName,
//         message: list[i].message,
//         image: list[i].image,
//         postId: list[i]._id,
//         userImage: user.image,
//       };
//       posts.push(st);
//     }
//   }
//   return posts;
// };

// const getAllPosts = async () => {
//   console.log("getAllPosts");
//   const res: any = await PostApi.getAllPosts();

//   let data = Array<Post>();
//   if (res.data) {
//     res.data.forEach((obj: any) => {
//       // console.log("element: " + obj._id)
//       const st: Post = {
//         userId: obj.name,
//         id: obj._id,
//         image: obj.avatarUrl,
//       };
//       data.push(st);
//     });
//   }
//   return data;
// };

// const getMyPosts = async () => {
//   console.log("getAllStudents()");
//   const res: any = await PostApi.getAllPosts();
//   let data = Array<Post>();
//   if (res.data) {
//     res.data.forEach((obj: any) => {
//       // console.log("element: " + obj._id)
//       const st: Post = {
//         userId: obj.name,
//         id: obj._id,
//         image: obj.avatarUrl,
//       };
//       data.push(st);
//     });
//   }
//   return data;
// };

// const addPost = async (student: Student) => {
//   console.log("addStudent");
//   const data = {
//     _id: student.id,
//     name: student.name,
//     avatarUrl: student.image,
//   };
//   try {
//     const res = StudentApi.addStudent(data);
//   } catch (err) {
//     console.log("add student fail: " + err);
//   }
// };

// const uploadImage = async (imageURI: String) => {
//   var body = new FormData();
//   body.append("file", { name: "name", type: "image/jpeg", uri: imageURI });
//   try {
//     const res = await StudentApi.uploadImage(body);
//     if (!res.ok) {
//       console.log("save failed " + res.problem);
//     } else {
//       if (res.data) {
//         const d: any = res.data;
//         console.log("----= url:" + d.url);
//         return d.url;
//       }
//     }
//   } catch (err) {
//     console.log("save failed " + err);
//   }
//   return "";
// };
// export default { getAllStudents, addStudent, uploadImage };

////////////////////////////////////////////////////////////

import PostApi from "../api/PostApi";
import FormData from "form-data";
import UserModel from "./UserModel";

export type Post = {
  userEmail: String;
  message: String;
  image: String;
  postId: String;
  userImage: String;
};

export type newPost = {
  //TODO - to delete
  message: String;
  image: String;
};

const createPostsList = async (res: any) => {
  let posts = Array<Post>();
  if (res.data) {
    console.log(" in  if (res.data)");
    console.log(res.data);
    const list = res.data.post;
    console.log(list);
    for (let i = 0; i < list.length; ++i) {
      console.log("element: " + list[i]._id);
      const user: any = await UserModel.getUserById(list[i].sender);
      console.log("user name - " + user.fullName);
      const st: Post = {
        userEmail: user.fullName,
        message: list[i].message,
        image: list[i].image,
        postId: list[i]._id,
        userImage: user.image,
      };
      posts.push(st);
    }
  }
  return posts;
};

const getAllPosts = async () => {
  console.log("getAllPosts()");
  let res: any = await PostApi.getAllPosts();
  if (res.status == 410) {
    res = await UserModel.refresh();
    if (!res) {
      // error in refresh
      // TODO - need to handle it - maybe logout the user
      return;
    }
    res = await PostApi.getAllPosts();
  }
  return createPostsList(res);
};

const getPostById = async (PostId: String) => {
  console.log("getPostById()");
  let res: any = await PostApi.getPostById(PostId);
  if (res.status == 410) {
    res = await UserModel.refresh();
    if (!res) {
      // error in refresh
      // TODO - need to handle it - maybe logout the user
      return;
    }
    res = await PostApi.getAllPosts();
  }
  return res;
};

const editPostById = async (postId: String, Post: any) => {
  console.log("editPostById()");
  console.log(postId);
  let res: any = PostApi.editPost(postId, Post);
  if (res.status == 410) {
    res = await UserModel.refresh();
    if (!res) {
      // error in refresh
      // TODO - need to handle it - maybe logout the user
      return;
    }
    res = await PostApi.editPost(postId, Post);
  }
  return res;
};

const getAllUserPosts = async (userId: string) => {
  console.log("getAllUserPosts()");
  let res: any = await PostApi.getAllUserPosts(userId);
  if (res.status == 410) {
    res = await UserModel.refresh();
    if (!res) {
      // error in refresh
      // TODO - need to handle it - maybe logout the user
      return;
    }
    res = await PostApi.getAllUserPosts(userId);
  }
  return createPostsList(res);
};

const addPost = async (post: newPost) => {
  const data = {
    message: post.message,
    image: post.image,
  };
  try {
    let res: any = await PostApi.addPost(data);
    if (res.status == 410) {
      res = await UserModel.refresh();
      if (!res) {
        // error in refresh
        // TODO - need to handle it - maybe logout the user
        return;
      }
      res = await PostApi.addPost(data);
    }
    return res;
  } catch (err) {
    console.log("add post fail " + err);
  }
};

const deletePost = async (postId: String) => {
  try {
    let res: any = await PostApi.deletePost(postId);
    if (res.status == 410) {
      res = await UserModel.refresh();
      if (!res) {
        // error in refresh
        // TODO - need to handle it - maybe logout the user
        return;
      }
      res = await PostApi.deletePost(postId);
    }
    return res;
  } catch (err) {
    console.log("add post fail " + err);
  }
};

const uploadImage = async (imageURI: String) => {
  var body = new FormData();
  body.append("file", {
    name: "name",
    type: "image/jpeg",
    uri: imageURI,
  });
  try {
    const res = await PostApi.uploadImage(body);
    if (!res.ok) {
      console.log("save failed " + res.problem);
    } else {
      if (res.data) {
        const d: any = res.data;
        console.log("url: " + d.url);
        return d.url;
      }
    }
  } catch (err) {
    console.log("save failed " + err);
  }
  return "";
};

export default {
  getAllPosts,
  addPost,
  uploadImage,
  getAllUserPosts,
  deletePost,
  getPostById,
  editPostById,
};
