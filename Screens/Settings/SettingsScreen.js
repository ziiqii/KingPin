import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { auth } from "../../firebase";



const SettingsScreen = ({ navigation }) => {
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("LoginScreen");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View>
      <Text>SettingsScreen</Text>
      <Button onPress={() => navigation.replace("HomeScreen")} title="Go back from SettingsScreen"></Button>
      <Button title="sign out" onPress={handleSignOut}></Button>
    </View>
  );
};

export default SettingsScreen;
