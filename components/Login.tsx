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
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import UserModel, { User } from "../model/UserModel";
import apiClient from "../api/ClientApi";

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
  });

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
      <Text>Login To the App</Text>
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
          <Text style={styles.buttonText}>Register to the App</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: "blue",
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

export default Login;
