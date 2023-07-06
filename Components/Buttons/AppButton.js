import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { windowHeight } from "../../utils/Dimensions";

const AppButton = ({ buttonTitle, ...rest }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
    width: "70%",
    height: windowHeight / 15,
    backgroundColor: "#673AB7",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    // fontFamily: "Lato-Regular",
  },
});
