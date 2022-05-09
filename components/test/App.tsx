import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { FlatList } from "react-native";
import { ContactList } from "./ContactList";

export default function App() {
  const [count, setCount] = useState(0);
  const [result, setContact] = useState("");
  const onPress = () => setCount((prevCount) => prevCount + 1);

  return (
    <View style={styles.container}>
      {/* <View style={styles.countContainer}>
        <Text>Count: {count}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={read}
      >
        <Text>Get Contact</Text>
        
      </TouchableOpacity> */}

      <ContactList />
    </View>
  );
}

const read = async () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  await fetch("http://exercice-tpa/rest-api/contact/read.php", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  countContainer: {
    alignItems: "center",
    padding: 10,
  },
});
