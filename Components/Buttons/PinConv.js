import React from "react";
import { Text, TouchableOpacity } from "react-native";

const PinConv = ({ buttonTitle, onPress, ...rest }) => {
  // Call the onPress function from the parent component
  const handlePress = () => {
    onPress();
  };

  return (
    <TouchableOpacity
      style={{
        width: 75,
        height: 75,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 100,
        borderWidth: 3,
        backgroundColor: "transparent",
        borderColor: "#d5fddb",
      }}
      onPress={handlePress}
      {...rest}
    >
      <Text style={{ fontSize: 30, color: "#ffffff" }}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default PinConv;
