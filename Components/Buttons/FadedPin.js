import React from "react";
import { Text, TouchableOpacity } from "react-native";

const FadedPin = ({ buttonTitle, ...rest }) => {
  return (
    <TouchableOpacity
      style={{
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 100,
        backgroundColor: "white",
        borderWidth: 1,
        opacity: 0.2,
      }}
      {...rest}
      disabled={true}
    >
      <Text>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default FadedPin;

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
