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

  const onLoginCallback = async () => {
    // TODO - need to add progress bar (called activity indicator)
    console.log("login was pressed");
    // TODO - check if the credentials are empty
    try {
      const res: any = await UserModel.loginUser(email, password);
      console.log("after login request ");
      console.log(res);
      if (!res) {
        console.log("fail to login");
        return;
      }
      if (res.status != 200) {
        console.log("returned status 400");
        return;
      }
      const resData: any = res.data;
      setToken(resData.tokens.accessToken);
      apiClient.setHeader("Authorization", "JWT " + resData.tokens.accessToken);
      await AsyncStorage.setItem("accessToken", resData.tokens.accessToken);
      await AsyncStorage.setItem("refreshToken", resData.tokens.refreshToken);
      await AsyncStorage.setItem("userId", resData.userId);
    } catch (err) {
      console.log("fail to login the user: " + err);
    }
    // navigation.goBack();
  };

  const onRegisterCallback = () => {
    console.log("register was pressed");
    navigation.navigate("Register");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
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
