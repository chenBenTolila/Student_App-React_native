import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput } from 'react-native';

const App = () => {
  console.log("my app is running")

  const [id, setId] = useState("")
  const [address, setAddress] = useState("")
  const [name, setName] = useState("")

  const onPressCallback = () => {
    console.log("button was pressed")
    Alert.alert("Alert", "This is my alert text", [{text: 'OK', onPress: ()=>{console.log("alert pressed")}}])
  }

  return (
    <View style={styles.container}>
      <Image source={require('./assets/avatar.png')} style={styles.avatar}></Image>
      <TextInput
        style={styles.input}
        onChangeText={setId}
        value={id}
        placeholder={'Student ID'}
      />
      <TextInput
        style={styles.input}
        onChangeText={setAddress}
        value={id}
        placeholder={'Student Name'}
      />
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={id}
        placeholder={'Student Addres'}
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={onPressCallback} style={styles.button}>
          <Text style={styles.buttonText}>CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressCallback} style={styles.button}>
          <Text style={styles.buttonText}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  avatar: {
    height: 200,
    resizeMode: "contain",
    alignSelf: "center",
    margin: 40
  },
  input: {
    height: 40,
    margin: 12,   // for space between the imput texts
    borderWidth: 1,
    padding: 10,
    borderRadius: 3
  },
  buttonsContainer: {
    //flex: 1,
    flexDirection: "row"
  },
  button: {
    flex: 1,
    margin: 12,
    padding: 12,
    backgroundColor: "blue",
    borderRadius: 10
  },
  buttonText: {
    textAlign: "center",
    color: 'white'
  }

});

export default App
