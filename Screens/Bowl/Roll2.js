import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

const Roll2 = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity>
        <Text>Spare</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.replace("Roll1")}>
        <Text>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Roll2;
