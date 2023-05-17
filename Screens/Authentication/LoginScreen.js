// import * as React from "react";
// import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
// import { useState } from "react";

// const LoginScreen = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   return (
//     <View>
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <Image
//           source={require("../../assets/logo.png")}
//           style={{ width: 500, height: 500 }}
//         />
//         <TextInput
//           style={{ height: 40 }}
//           placeholder="Email"
//           onChangeText={(newText) => setEmail(newText)}
//           defaultValue={email}
//         />
//         <TextInput
//           style={{ height: 40 }}
//           placeholder="Password"
//           onChangeText={(newText) => setPassword(newText)}
//           defaultValue={password}
//         />
//       </View>
//       <TouchableOpacity>
//         <Text>Login</Text>
//       </TouchableOpacity>
//       <TouchableOpacity>
//         <Text>Register</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default LoginScreen;

import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import FormInput from "../../Components/Inputs/FormInput";
import FormButton from "../../Components/Buttons/FormButton";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Text style={styles.text}>KingPin</Text>

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormButton buttonTitle="Sign In" onPress={() => {}} />

      <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate("SignupScreen")}
      >
        <Text style={styles.navButtonText}>
          Don't have an acount? Create here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: "cover",
  },
  text: {
    fontFamily: "Kufam-SemiBoldItalic",
    fontSize: 28,
    marginBottom: 10,
    color: "#051d5f",
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
    fontFamily: "Lato-Regular",
  },
});
