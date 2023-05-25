import React, { useState } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const Pin = ({ buttonTitle, isRemaining, onPress, ...rest }) => {
  // Call the onPress function from the parent component
  const handlePress = () => {
    onPress();
  };

  return (
    <TouchableOpacity
      style={{
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 100,
        backgroundColor: isRemaining ? "orange" : "white",
        borderWidth: 1,
      }}
      onPress={handlePress}
      {...rest}
    >
      <Text>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default Pin;

// const styles = StyleSheet.create({
//   pin: {
//     width: 50,
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 10,
//     borderRadius: 100,
//     backgroundColor: isRemaining ? "orange" : "white",
//     borderWidth: 1,
//   },
// });
