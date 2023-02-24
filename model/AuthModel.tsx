import apiClient from "../api/ClientApi";
import AuthApi from "../api/AuthApi";
import FormData from "form-data";

export type User = {
  email: String;
  name: String;
  password: String;
  image: String;
};

const addUser = async (user: User) => {
  console.log("addUser");
  console.log("email: " + user.email);
  console.log("name: " + user.name);
  console.log("password: " + user.password);
  console.log("imageUri: " + user.image);
  const data = {
    _email: user.email,
    name: user.name,
    password: user.password,
    image: user.image,
  };
  try {
    const res = AuthApi.addUser(data);
  } catch (err) {
    console.log("add user fail: " + err);
  }
};

const uploadImage = async (imageURI: String) => {
  var body = new FormData();
  body.append("file", { name: "name", type: "image/jpeg", uri: imageURI });
  try {
    const res = await AuthApi.uploadImage(body);
    if (!res.ok) {
      console.log("save failed " + res.problem);
    } else {
      if (res.data) {
        const d: any = res.data;
        console.log("----= url:" + d.url);
        return d.url;
      }
    }
  } catch (err) {
    console.log("save failed " + err);
  }
  return "";
};

const loginUser = async (email: String, password: String) => {};

// @react-native-async-storage/async-storage

export default { addUser, uploadImage };
