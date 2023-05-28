import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const PinInit = ({ buttonTitle, onPress, ...rest }) => {
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
          borderColor: "#d9d9d9",
        }}
        onPress={handlePress}
        {...rest}
      >
        <Text style={{ fontSize: 25, color: "#ffffff" }}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PinInit;
