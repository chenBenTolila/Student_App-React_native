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
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";

import FormData from "form-data";

import UserModel, { User } from "../model/UserModel";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Test: FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUri, setAvatarUri] = useState("");

  const setUserDetails = async () => {
    const userId: any = await AsyncStorage.getItem("userId");
    console.log("current UserId:");
    console.log(userId);
    if (userId != null) {
      const res: any = await UserModel.getUserById(userId);
      if (!res) {
        console.log("fail to get user");
        return;
      }
      const user: any = res.data;
      console.log("user: ");
      console.log(user);
      console.log("user name - " + user.name);
      setName(user.name);
      setAvatarUri(user.imageUrl);
      setEmail(user.email);
    }
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
    const uri: string = "http://192.168.1.229:3000/uploads\1677355309637.jpg";
    setAvatarUri(uri);
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

  const onSaveCallback = async () => {
    // need to add progress bar (called activity indicator)
    console.log("register was pressed");
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
    } catch (err) {
      console.log("fail adding user: " + err);
    }
    navigation.goBack();
  };

  const onCancelCallback = () => {
    console.log("cancel was pressed");
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          {avatarUri != "" && (
            <Image source={{ uri: "avatarUri" }} style={styles.avatar}></Image>
          )}
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

export default Test;
