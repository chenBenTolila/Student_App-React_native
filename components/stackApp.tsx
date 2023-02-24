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
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StudentAdd from "./StudentAdd";

const HomeScreen: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const [message, setMessage] = useState("non");
  useEffect(() => {
    console.log("useEffect" + route.params?.newPostId);
    if (route.params?.newPostId) {
      setMessage(JSON.stringify(route.params?.newPostId));
    }
  }, [route.params?.newPostId]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.navigate("Details", { id: 12345 })}
      />
    </View>
  );
};

const DetailsScreen: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const itemId = JSON.stringify(route.params.id);
  // const name = JSON.stringify(route.params.name);
  const [count, setCount] = useState(0);

  useEffect(() => {
    navigation.setOptions({
      title: itemId,
      headerRight: () => (
        <Button
          onPress={() => {
            setCount((c) => c + 1), console.log("counter: " + count);
          }}
          title="count++"
        />
      ),
    });
  });

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen </Text>
      <Text>{itemId}</Text>
      <Button
        title="Go to Home... again"
        onPress={() => {
          navigation.navigate("Home", { newPostId: "6666" });
        }}
      />
    </View>
  );
};

const Stack = createNativeStackNavigator();

const HeaderTitle: FC = () => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log("title pressed");
      }}
    >
      <Image
        style={{ height: 50, width: 50 }}
        source={require("./assets/avatar.png")}
      />
    </TouchableOpacity>
  );
};

const App: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          title: "Apply to all",
          headerStyle: { backgroundColor: "red" },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: () => <HeaderTitle />,
            headerRight: () => (
              <Button
                onPress={() => alert("This is a button!")}
                title="Info"
                color="grey"
              />
            ),
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          initialParams={{ id: 42 }}
          options={{ title: "Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
  },
});

export default App;
