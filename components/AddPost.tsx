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

import PostModel, { Post } from "../model/PostModel";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddPost: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const [imageUri, setImageUri] = useState("");
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const [userId, setUserId] = useState("")

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
        setImageUri(uri);
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
        setImageUri(uri);
      }
    } catch (err) {
      console.log("open camera error:" + err);
    }
  };

  const onSaveCallback = async () => {
    // TODO - need to add progress bar (called activity indicator)
    // TODO - need to check that the post and text are not empty!!!!!!!!!!!!!!!

    console.log("save was pressed");

    if (imageUri == "" || text == "") {
      setErrorMessage("please provide text and image");
      return;
    }

    const userId: any = await AsyncStorage.getItem("userId");

    const newPost = {
      image: imageUri,
      message: text,
      userId: userId,
    };

    try {
      if (imageUri != "") {
        console.log("uploading image");
        const url = await PostModel.uploadImage(imageUri);
        newPost.image = url;
        console.log("got url from upload: " + url);
      }
      console.log("saving user");
      await PostModel.addPost(newPost);
    } catch (err) {
      console.log("fail adding post: " + err);
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
          {imageUri == "" && (
            <Image
              source={require("../assets/avatar.png")}
              style={styles.avatar}
            ></Image>
          )}
          {imageUri != "" && (
            <Image source={{ uri: imageUri }} style={styles.avatar}></Image>
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
          onChangeText={setText}
          value={text}
          placeholder={"Text"}
        />
        {/* ErrorMessage &&
        {<Text style={styles.buttonText}>please provide text and image</Text>} */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={onCancelCallback} style={styles.button}>
            <Text style={styles.buttonText}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSaveCallback} style={styles.button}>
            <Text style={styles.buttonText}>SAVE</Text>
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
  errMsg: {
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

export default AddPost;
