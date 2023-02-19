import { FC, useState } from "react";
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

import StudentModel, { Student } from "./model/StudentModel";

const StudentAdd: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  console.log("my app is running");

  const [id, setId] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");

  const onSaveCallback = () => {
    console.log("save was pressed");
    // need to add address to student type
    const student: Student = {
      id: id,
      name: name,
      image: "aa",
    };
    StudentModel.addStudent(student);
    navigation.goBack();
  };

  const onCancelCallback = () => {
    console.log("cancel was pressed");
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={require("./assets/avatar.png")}
          style={styles.avatar}
        ></Image>
        <TextInput
          style={styles.input}
          onChangeText={setId}
          value={id}
          placeholder={"Student ID"}
        />
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder={"Student Name"}
        />
        <TextInput
          style={styles.input}
          onChangeText={setAddress}
          value={address}
          placeholder={"Student Address"}
        />
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
});

export default StudentAdd;
