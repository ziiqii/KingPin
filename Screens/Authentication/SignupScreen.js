import * as React from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import styles from "./SignupScreen.style";
import FormInput from "../../Components/Inputs/FormInput";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  return (
    <View>
      <View style={styles.container}>
        <Text>Create an account</Text>
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
        <FormInput
          labelValue={confirmPassword}
          onChangeText={(userPassword) => setConfirmPassword(userPassword)}
          placeholderText="Confirm Password"
          iconType="lock"
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity>
        <Text>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text>Have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;
