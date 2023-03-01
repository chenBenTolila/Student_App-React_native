import { FC, useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Alert,
  TextInput,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";

import UserModel, { User } from "../model/UserModel";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

const Register: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUri, setAvatarUri] = useState("");
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);

  // google variables
  const [googleToken, setGoogleToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      setShowActivityIndicator(true);
      console.log("focusin login");
      cleanScreen();
      setShowActivityIndicator(false);
    });
    return unsubscribe;
  });

  useEffect(() => {
    if (userInfo != null) {
      console.log("user info!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      setEmail(userInfo.email);
      console.log("my pictureeee: " + userInfo.picture);
      setAvatarUri(userInfo.picture);
      setName(userInfo.given_name + " " + userInfo.family_name);
    }
  }, [userInfo]);

  const cleanScreen = () => {
    setEmail("");
    setName("");
    setPassword("");
    setAvatarUri("");
  };

  const askPermission = async () => {
    try {
      const res = await ImagePicker.getCameraPermissionsAsync();
      if (!res.granted) {
        alert("camera permission is requiered!");
      }
    } catch (err) {
      console.log("ask permission error " + err);
    }
  };

  useEffect(() => {
    askPermission();
  }, []);

  const openCamera = async () => {
    try {
      const res = await ImagePicker.launchCameraAsync();
      if (!res.canceled && res.assets.length > 0) {
        const uri = res.assets[0].uri;
        setAvatarUri(uri);
      }
    } catch (err) {
      console.log("open camera error:" + err);
    }
  };

  const openGallery = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync();
      if (!res.canceled && res.assets.length > 0) {
        const uri = res.assets[0].uri;
        setAvatarUri(uri);
      }
    } catch (err) {
      console.log("open camera error:" + err);
    }
  };

  const onRegisterCallback = async () => {
    // need to add progress bar (called activity indicator)
    console.log("register was pressed");
    setShowActivityIndicator(true);

    if (email == "" || name == "" || password == "") {
      // setErrorMessage("please provide text and image");
      setShowActivityIndicator(false);
      return;
    }

    const user: User = {
      email: email,
      name: name,
      password: password,
      image: "",
    };
    try {
      if (avatarUri != "") {
        console.log("uploading image");
        const url = await UserModel.uploadImage(avatarUri);
        user.image = url;
        console.log("got url from upload: " + url);
      }
      console.log("saving user");
      await UserModel.addUser(user);
      navigation.goBack();
    } catch (err) {
      console.log("fail adding user: " + err);
    }
    //navigation.goBack();
  };

  const onCancelCallback = () => {
    console.log("cancel was pressed");
    navigation.goBack();
  };

  const onGoogleCallback = () => {
    ToastAndroid.show("google", ToastAndroid.LONG);
    setUserInfo(null);
    googlePromptAsync();
  };

  const [request, response, googlePromptAsync] = Google.useAuthRequest({
    expoClientId:
      "806690312426-07ugfudravdns682rc9fetqo8477utv4.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      setGoogleToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, googleToken]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${googleToken}` },
        }
      );

      const googleUser = await response.json();
      setUserInfo(googleUser);
      console.log(googleUser);
      // navigation.navigate("Register", { email: user.email });
    } catch (error) {
      // Add your own error handler here
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <ActivityIndicator
          color={"#93D1C1"}
          size={130}
          animating={showActivityIndicator}
          style={{ position: "absolute", marginTop: 270, marginStart: 140 }}
        />
        <View>
          {avatarUri == "" && (
            <Image
              source={require("../assets/avatar.png")}
              style={styles.avatar}
            ></Image>
          )}
          {avatarUri != "" && (
            <Image source={{ uri: avatarUri }} style={styles.avatar}></Image>
          )}

          <TouchableOpacity onPress={openCamera}>
            <Ionicons name={"camera"} style={styles.cameraButton} size={50} />
          </TouchableOpacity>
          <TouchableOpacity onPress={openGallery}>
            <Ionicons name={"image"} style={styles.galleryButton} size={50} />
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder={"Email Address"}
        />
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder={"Name"}
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder={"password"}
        />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={onCancelCallback} style={styles.button}>
            <Text style={styles.buttonText}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onRegisterCallback} style={styles.button}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onGoogleCallback}>
          <Ionicons name="md-logo-google" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    //marginTop: StatusBar.currentHeight,
    flex: 1,
    //backgroundColor: "grey",
  },
  avatar: {
    height: 200,
    resizeMode: "contain",
    alignSelf: "center",
    margin: 40,
    width: "100%",
  },
  input: {
    height: 40,
    margin: 12, // for space between the imput texts
    borderWidth: 1,
    padding: 10,
    borderRadius: 3,
  },
  buttonsContainer: {
    //flex: 1,
    flexDirection: "row",
  },
  button: {
    flex: 1,
    margin: 12,
    padding: 12,
    backgroundColor: "#009999",
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
  },
  cameraButton: {
    position: "absolute",
    bottom: -10,
    left: 10,
    width: 50,
    height: 50,
  },
  galleryButton: {
    position: "absolute",
    bottom: -10,
    right: 10,
    width: 50,
    height: 50,
  },
});

export default Register;
