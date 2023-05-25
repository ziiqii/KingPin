import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Pin from "../../Components/Buttons/Pin";

const Roll1 = ({ navigation }) => {
  // This toggles the state of the pins
  const [pinState, setPinState] = useState([
    { id: 1, isRemaining: false },
    { id: 2, isRemaining: false },
    { id: 3, isRemaining: false },
    { id: 4, isRemaining: false },
    { id: 5, isRemaining: false },
    { id: 6, isRemaining: false },
    { id: 7, isRemaining: false },
    { id: 8, isRemaining: false },
    { id: 9, isRemaining: false },
    { id: 10, isRemaining: false },
  ]);
  const togglePinState = (id) => {
    const updatedPinState = pinState.map((pin) => {
      if (pin.id === id) {
        return {
          ...pin,
          isRemaining: !pin.isRemaining,
        };
      }
      return pin;
    });
    setPinState(updatedPinState);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {pinState.map((pin) => (
        <Pin
          key={pin.id}
          buttonTitle={pin.id.toString()}
          id={pin.id}
          isRemaining={pin.isRemaining}
          onPress={() => {
            togglePinState(pin.id);
            // console.log(pinState);  // just some checking to see that state was changed.
          }}
        />
      ))}
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
