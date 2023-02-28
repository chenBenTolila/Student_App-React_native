import { FC, useState, useEffect } from "react";
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
  TouchableHighlight,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StudentList from "./components/StudentsList";
import StudentDetails from "./components/StudentDetails";
import StudentAdd from "./components/StudentAdd";
import Register from "./components/Register";
import Login from "./components/Login";
import apiClient from "./api/ClientApi";
import Profile from "./components/Profile";
import Test from "./components/Test";
import AddPost from "./components/AddPost";
import PostsList from "./components/PostsList";
import MyPostsList from "./components/MyPostsList";
import EditPost from "./components/EditPost";
import Chat from "./components/Chat";

//need to move to different place
const InfoScreen: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Info Screen</Text>
    </View>
  );
};

const LoginStack = createNativeStackNavigator();

// can stay here
const StudentStack = createNativeStackNavigator();
const StudentStackCp: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const addNewStudents = () => {
    navigation.navigate("StudentAdd");
  };
  return (
    <StudentStack.Navigator>
      <StudentStack.Screen
        name="StudentList"
        component={StudentList}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={addNewStudents}>
              <Ionicons name={"add-outline"} size={40} color={"gray"} />
            </TouchableOpacity>
          ),
        }}
      />
      <StudentStack.Screen name="StudentDetails" component={StudentDetails} />
      <StudentStack.Screen name="StudentAdd" component={StudentAdd} />
    </StudentStack.Navigator>
  );
};

const PostStack = createNativeStackNavigator();
const PostStackCp: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const addNewPost = () => {
    navigation.navigate("AddPost");
  };
  return (
    <StudentStack.Navigator>
      <StudentStack.Screen
        name="PostsList"
        component={PostsList}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={addNewPost}>
              <Ionicons name={"add-outline"} size={40} color={"gray"} />
            </TouchableOpacity>
          ),
        }}
      />
      <StudentStack.Screen name="AddPost" component={AddPost} />
    </StudentStack.Navigator>
  );
};

// TODO - need to add edit post here
const MyPostsStack = createNativeStackNavigator();
const MyPostsStackCp: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const addNewPost = () => {
    navigation.navigate("AddPost");
  };
  return (
    <StudentStack.Navigator>
      <StudentStack.Screen
        name="MyPostsList"
        component={MyPostsList}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={addNewPost}>
              <Ionicons name={"add-outline"} size={40} color={"gray"} />
            </TouchableOpacity>
          ),
        }}
      />
      <StudentStack.Screen name="AddPost" component={AddPost} />
      <StudentStack.Screen name="EditPost" component={EditPost} />
    </StudentStack.Navigator>
  );
};

const updateToken = async (setToken: any) => {
  const token = await AsyncStorage.getItem("accessToken");
  await AsyncStorage.clear();
  console.log("in update token " + token);
  if (token != null) {
    apiClient.setHeader("Authorization", "JWT " + token);
    return setToken(token);
  }
};

const Tab = createBottomTabNavigator();
const App: FC = () => {
  const [token, setToken] = useState();
  updateToken(setToken);
  if (!token) {
    return (
      <NavigationContainer>
        <LoginStack.Navigator>
          <LoginStack.Screen name="Login">
            {(props) => (
              <Login
                route={props.route}
                navigation={props.navigation}
                setToken={setToken}
              />
            )}
          </LoginStack.Screen>
          <LoginStack.Screen name="Register" component={Register} />
        </LoginStack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: any = "";
              if (route.name === "Info") {
                iconName = focused
                  ? "information-circle"
                  : "information-circle-outline";
              } else if (route.name === "StudentStackCp") {
                iconName = focused ? "list-circle" : "list-circle-outline";
              } else if (route.name === "StudentStackCp") {
                iconName = focused ? "home" : "home-outline";
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          {/* <Tab.Screen
            name="StudentStackCp"
            component={StudentStackCp}
            options={{ headerShown: false }}
          /> */}
          <Tab.Screen
            name="PostStackCp"
            component={PostStackCp}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="MyPostsStackCp"
            component={MyPostsStackCp}
            options={{ headerShown: false }}
          />
          <Tab.Screen name="Profile" component={Profile} />
          <Tab.Screen name="Chat" component={Chat} />
          {/* <Tab.Screen name="AddPost" component={AddPost} />
          <Tab.Screen name="Info" component={InfoScreen} /> */}
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
  },
});

export default App;

// עדיף לייצר קובץ COLORS שבו נשים את כל הצבעים שנעבוד איתם
// נמצא במצגת של הרצאה 11 במצגת של הרשימה
