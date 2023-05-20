import React from "react";
import { Text, View, Button } from "react-native";
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
      <Text>Email: {auth.currentUser?.email}</Text>
      <Button title="sign out" onPress={handleSignOut}></Button>
    </View>
  );
};

export default SettingsScreen;
