// import { FC, useEffect, useState } from "react";
// import {
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   Button,
//   Alert,
//   TextInput,
//   ScrollView,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import Ionicons from "@expo/vector-icons/Ionicons";

// import FormData from "form-data";

// import AuthModel, { User } from "../model/AuthModel";

// const Login: FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const onLoginCallback = async () => {
//     // need to add progress bar (called activity indicator)
//     console.log("register was pressed");

//     try {
//       if (avatarUri != "") {
//         console.log("uploading image");
//         const url = await AuthModel.uploadImage(avatarUri);
//         user.image = url;
//         console.log("got url from upload: " + url);
//       }
//       console.log("saving user");
//       await AuthModel.addUser(user);
//     } catch (err) {
//       console.log("fail adding user: " + err);
//     }
//     navigation.goBack();
//   };

//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         <Text>Login To the App</Text>
//         <TextInput
//           style={styles.input}
//           onChangeText={setEmail}
//           value={email}
//           placeholder={"Email Address"}
//         />

//         <TextInput
//           style={styles.input}
//           onChangeText={setPassword}
//           value={password}
//           placeholder={"password"}
//         />
//         <View style={styles.buttonsContainer}>
//           <TouchableOpacity onPress={onLoginCallback} style={styles.button}>
//             <Text style={styles.buttonText}>LOGIN</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     //marginTop: StatusBar.currentHeight,
//     flex: 1,
//     //backgroundColor: "grey",
//   },
//   avatar: {
//     height: 200,
//     resizeMode: "contain",
//     alignSelf: "center",
//     margin: 40,
//     width: "100%",
//   },
//   input: {
//     height: 40,
//     margin: 12, // for space between the imput texts
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 3,
//   },
//   buttonsContainer: {
//     //flex: 1,
//     flexDirection: "row",
//   },
//   button: {
//     flex: 1,
//     margin: 12,
//     padding: 12,
//     backgroundColor: "blue",
//     borderRadius: 10,
//   },
//   buttonText: {
//     textAlign: "center",
//     color: "white",
//   },
//   cameraButton: {
//     position: "absolute",
//     bottom: -10,
//     left: 10,
//     width: 50,
//     height: 50,
//   },
//   galleryButton: {
//     position: "absolute",
//     bottom: -10,
//     right: 10,
//     width: 50,
//     height: 50,
//   },
// });

// export default Login;
