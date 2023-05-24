import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

const Roll1 = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity>
        <Text>Strike</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.replace("Roll2")}>
        <Text>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Roll1;
