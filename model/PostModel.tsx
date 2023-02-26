// import apiClient from "../api/ClientApi";
// import PostApi from "../api/PostApi";
// import FormData from "form-data";

// export type Post = {
//   userId: String;
//   text: String;
//   image: String;
//   postId: String;
//   userImage: String;
// };

// const createPostsList = async (res: any) => {
//   let posts = Array<Post>();
//   if (res.data) {
//       console.log(" in  if (res.data)");
//       console.log(res.data);
//       const postlist = res.data.post;
//       console.log(postlist);
//       for (let i = 0; i < postlist.length; ++i) {
//           console.log("element: " + postlist[i]._id);
//           const user: any = await userModel.getUserById(postlist[i].sender);
//           console.log("user name - " + user.fullName);
//           const st: Post = {
//               username: user.fullName,
//               message: list[i].message,
//               image: list[i].image,
//               postId: list[i]._id,
//               userImage: user.image,
//           };
//           posts.push(st);
//       }
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
