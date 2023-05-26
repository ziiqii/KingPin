import React from "react";
import { Text, View, Button } from "react-native";
import { getAuth, signOut } from "firebase/auth";

const SettingsScreen = ({ navigation }) => {
  const auth = getAuth();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful
        navigation.replace("LoginScreen");
      })
      .catch((error) => alert(error.message));
      console.log("Signed out with: ", auth.currentUser?.email);
  };

  return (
    <View>
      <Text>Email: {auth.currentUser?.email}</Text>
      <Button title="sign out" onPress={handleSignOut}></Button>
    </View>
  );
};

export default SettingsScreen;
