import React from "react";
import { Text, TouchableOpacity } from "react-native";

const PinDown = ({ buttonTitle, onPress, ...rest }) => {
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
        borderColor: "#737373",
      }}
      onPress={handlePress}
      {...rest}
    >
      <Text style={{ fontSize: 20, color: "#a6a6a6" }}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default PinDown;
