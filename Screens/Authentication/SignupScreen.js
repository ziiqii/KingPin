import * as React from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../../assets/logo.png")}
          style={{ width: 500, height: 500 }}
        />
        <TextInput
          style={{ height: 40 }}
          placeholder="Email"
          onChangeText={(newText) => setEmail(newText)}
          defaultValue={email}
        />
        <TextInput
          style={{ height: 40 }}
          placeholder="Password"
          onChangeText={(newText) => setPassword(newText)}
          defaultValue={password}
        />
        <TextInput
          style={{ height: 40 }}
          placeholder="Confirm Password"
          onChangeText={(newText) => setPassword(newText)}
          defaultValue={password}
        />
      </View>
      <TouchableOpacity>
        <Text>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
        <Text>Have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;
