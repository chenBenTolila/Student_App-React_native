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
          <Tab.Screen
            name="StudentStackCp"
            component={StudentStackCp}
            options={{ headerShown: false }}
          />
          <Tab.Screen name="Profile" component={Profile} />
          <Tab.Screen name="Info" component={InfoScreen} />
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
