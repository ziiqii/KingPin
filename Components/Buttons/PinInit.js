import React from "react";
import { Text, TouchableOpacity } from "react-native";

const PinInit = ({ buttonTitle, onPress, ...rest }) => {
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
        borderWidth: 3,
        backgroundColor: "transparent",
        borderColor: "#d9d9d9",
      }}
      onPress={handlePress}
      {...rest}
    >
      <Text style={{ fontSize: 20, color: "#ffffff" }}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default PinInit;