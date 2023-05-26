import React from "react";
import { Text, TouchableOpacity } from "react-native";

const PinStand = ({ buttonTitle, onPress, ...rest }) => {
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
        backgroundColor: "white",
        borderColor: "#cd0000",
      }}
      onPress={handlePress}
      {...rest}
    >
      <Text style={{ fontSize: 20, color: "#000000" }}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default PinStand;
