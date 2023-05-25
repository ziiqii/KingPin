import React from "react";
import { Text, TouchableOpacity } from "react-native";

const Roll2Pins = ({ buttonTitle, aftRoll2, onPress, ...rest }) => {
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
        backgroundColor: aftRoll2 ? "orange" : "white",
        borderWidth: 1,
      }}
      onPress={handlePress}
      {...rest}
    >
      <Text>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default Roll2Pins;

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
