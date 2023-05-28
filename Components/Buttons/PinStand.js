import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const PinStand = ({ buttonTitle, onPress, ...rest }) => {
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
          backgroundColor: "white",
          borderColor: "#cd0000",
        }}
        onPress={handlePress}
        {...rest}
      >
        <Text style={{ fontSize: 25, color: "#000000" }}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PinStand;
