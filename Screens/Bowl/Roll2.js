import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Pin from "../../Components/Buttons/ClickablePin";
import FadedPin from "../../Components/Buttons/FadedPin";

const Roll2 = ({ navigation, route }) => {
  const { pinState } = route.params;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {pinState.map((pin) => {
        if (!pin.isRemaining) {
          return <FadedPin key={pin.id} buttonTitle={pin.id.toString()} />;
        } else {
          // Render regular Pin component for pins that are remaining
          return (
            <Pin
              key={pin.id}
              buttonTitle={pin.id.toString()}
              isRemaining={!pin.isRemaining}
              onPress={() => {
                togglePinState(pin.id);
                // console.log(pinState);  // just some checking to see that state was changed.
              }}
            />
          );
        }
      })}

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
