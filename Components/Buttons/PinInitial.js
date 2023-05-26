import React from "react";
import { Text, TouchableOpacity } from "react-native";

const PinInitial = ({ buttonTitle, onPress, ...rest }) => {
  // Call the onPress function from the parent component
  const handlePress = () => onPress();

  return (
    <TouchableOpacity
      style={{
        width: 75,
        height: 75,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 100,
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#d9d9d9",
      }}
      onPress={handlePress}
      {...rest}
    >
      <Text style={{fontSize: 20}}>hi</Text>
    </TouchableOpacity>
  );
};

export default PinInitial;
