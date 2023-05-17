import * as React from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";

const LoginScreen = () => {
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
      </View>
      <TouchableOpacity>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
