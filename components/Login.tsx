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

import AsyncStorage from "@react-native-async-storage/async-storage";
import UserModel, { User } from "../model/UserModel";
import apiClient from "../api/ClientApi";
import Ionicons from "@expo/vector-icons/Ionicons";
// import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";

// WebBrowser.maybeCompleteAuthSession();

const Login: FC<{ route: any; navigation: any; setToken: any }> = ({
  route,
  navigation,
  setToken,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      console.log("focusin login");
      setShowActivityIndicator(true);
      cleanScreen();
      setShowActivityIndicator(false);
    });
    return unsubscribe;
  }, []);

  const onLoginCallback = async () => {
    // TODO - need to add progress bar (called activity indicator)
    console.log("login was pressed");
    // TODO - check if the credentials are empty
    setShowActivityIndicator(true);
    if (email == "" || password == "") {
      setShowActivityIndicator(false);
      return;
    }

    try {
      const res: any = await UserModel.loginUser(email, password);
      console.log("after login request ");
      console.log(res);
      if (!res) {
        console.log("fail to login");
        setShowActivityIndicator(false);
        return;
      }
      if (res.status != 200) {
        console.log("returned status 400");
        setShowActivityIndicator(false);
        return;
      }
      const resData: any = res.data;
      setToken(resData.tokens.accessToken);
      await apiClient.setHeader(
        "Authorization",
        "JWT " + resData.tokens.accessToken
      );

      // TODO - need to add the temp when doing refrresh token too
      // TODO - need to add logout when the refreshing the tokens fails
      await AsyncStorage.setItem("temp", "temp");
      await AsyncStorage.setItem("refreshToken", resData.tokens.refreshToken);
      await AsyncStorage.setItem("userId", resData.userId);
      await AsyncStorage.setItem("accessToken", resData.tokens.accessToken);

      setShowActivityIndicator(false);
    } catch (err) {
      console.log("fail to login the user: " + err);
    }
    setShowActivityIndicator(false);
  };

  const onRegisterCallback = () => {
    console.log("register was pressed");
    navigation.navigate("Register");
  };

  // const onGoogleCallback = () => {
  //   ToastAndroid.show("google", ToastAndroid.LONG);
  //   googlePromptAsync();
  // };

  // const [googleToken, setGoogleToken] = useState("");
  // const [userInfo, setUserInfo] = useState(null);

  // const [request, response, googlePromptAsync] = Google.useAuthRequest({
  //   expoClientId:
  //     "806690312426-07ugfudravdns682rc9fetqo8477utv4.apps.googleusercontent.com",
  // });

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     setGoogleToken(response.authentication.accessToken);
  //     getUserInfo();
  //   }
  // }, [response, googleToken]);

  // const getUserInfo = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://www.googleapis.com/userinfo/v2/me",
  //       {
  //         headers: { Authorization: `Bearer ${googleToken}` },
  //       }
  //     );

  //     const user = await response.json();
  //     setUserInfo(user);
  //     console.log(user);
  //     navigation.navigate("Register", { email: user.email });
  //   } catch (error) {
  //     // Add your own error handler here
  //   }
  // };

  const cleanScreen = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator
        color={"#93D1C1"}
        size={130}
        animating={showActivityIndicator}
        style={{ position: "absolute", marginTop: 190, marginStart: 140 }}
      />
      <Text style={styles.text}>Login To the App</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder={"Email Address"}
      />

      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder={"password"}
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={onLoginCallback} style={styles.button}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onRegisterCallback} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity onPress={onGoogleCallback}>
        <Ionicons name="md-logo-google" size={24} color="black" />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    //alignItems: "center",
    // backgroundColor: "grey",
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
    borderWidth: 2,
    padding: 10,
    borderRadius: 3,
    borderColor: "#006B6B",
    width: 260,
    alignSelf: "center",
    fontSize: 15,
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
    width: 350,
    height: 50,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
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
  text: {
    fontWeight: "bold",
    fontSize: 40,
    alignSelf: "center",
    color: "#006B6B",
  },
});

export default Login;
