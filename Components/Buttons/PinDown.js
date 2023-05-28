import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const PinDown = ({ buttonTitle, onPress, ...rest }) => {
  // Call the onPress function from the parent component
  const handlePress = () => {
    onPress();
  };

  return (
    <View style={{margin: 10}}>
      <TouchableOpacity
        style={{
          width: 65,
          height: 65,
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
        <Text style={{ fontSize: 25, color: "#a6a6a6" }}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PinDown;
