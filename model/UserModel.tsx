import apiClient from "../api/ClientApi";
import AuthApi from "../api/AuthApi";
import FormData from "form-data";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    return AuthApi.addUser(data);
  } catch (err) {
    console.log("add user fail: " + err);
    return null;
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

const loginUser = async (email: String, password: String) => {
  const data = {
    email: email,
    password: password,
  };
  try {
    const res: any = await AuthApi.loginUser(data);
    return res;
    // TODO - return the status to the app so I can handle it in the screen
  } catch (err) {
    console.log("add user fail: " + err);
    return null;
  }
};

const logout = async () => {
  const refreshToken = await AsyncStorage.getItem("refreshToken");
  console.log(refreshToken);
  apiClient.setHeader("Authorization", "JWT " + refreshToken);
  try {
    console.log("sent logout req");
    const res: any = await AuthApi.logout();
    await AsyncStorage.clear();
    return res;
    // TODO - return the status to the app so I can handle it in the screen
  } catch (err) {
    console.log("fail logout: " + err);
    return null;
  }
};

const getUserById = async (userId: String) => {
  console.log("getUserById()");
  let res = await AuthApi.getUserById(userId);
  console.log("res:");
  console.log(res);
  if (res.status == 410) {
    res = await refresh();
    if (!res) {
      // error in refresh
      // TODO - need to handle it - maybe logout the user
      return;
    }
    res = await AuthApi.getUserById(userId);
  }
  return res;
};

const putUserById = async (userId: String, userDetails: any) => {
  console.log("putUserById()");
  let res = await AuthApi.putUserById(userId, userDetails);
  console.log("res:");
  console.log(res);
  if (res.status == 410) {
    console.log("status is 410");
    res = await refresh();
    if (!res) {
      // error in refresh
      // TODO - need to handle it - maybe logout the user
      return;
    }
    res = await AuthApi.putUserById(userId, userDetails);
  }
  return res;
};

const refresh = async () => {
  console.log("refresh()");
  const refreshToken = await AsyncStorage.getItem("refreshToken");
  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmRiNzdjZmM3OWMzODU3Z…
  console.log(refreshToken);
  apiClient.setHeader("Authorization", "JWT " + refreshToken);

  const res: any = await AuthApi.refresh();
  if (res.status == 400) {
    console.log("error in refresh");
    console.log(res);
    return; //?????????/ TODO
  }
  console.log("end refresh");
  console.log(res);
  // TODO - duplicte code!! maybe move to an new function with login
  apiClient.setHeader("Authorization", "JWT " + res.data.accessToken);
  await AsyncStorage.setItem("accessToken", res.data.accessToken);
  await AsyncStorage.setItem("refreshToken", res.data.refreshToken);

  // check if needed here
  return res;
};

export default {
  addUser,
  uploadImage,
  loginUser,
  getUserById,
  putUserById,
  refresh,
  logout,
};
