import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Roll1Pins from "../../Components/Buttons/Roll1Pins";

const Roll1 = ({ navigation }) => {
  // This toggles the state of the pins
  const [pinState, setPinState] = useState([
    { id: 1, aftRoll1: false, aftRoll2: false },
    { id: 2, aftRoll1: false, aftRoll2: false },
    { id: 3, aftRoll1: false, aftRoll2: false },
    { id: 4, aftRoll1: false, aftRoll2: false },
    { id: 5, aftRoll1: false, aftRoll2: false },
    { id: 6, aftRoll1: false, aftRoll2: false },
    { id: 7, aftRoll1: false, aftRoll2: false },
    { id: 8, aftRoll1: false, aftRoll2: false },
    { id: 9, aftRoll1: false, aftRoll2: false },
    { id: 10, aftRoll1: false, aftRoll2: false },
  ]);
  const togglePinState = (id) => {
    const updatedPinState = pinState.map((pin) => {
      if (pin.id === id) {
        return {
          ...pin,
          aftRoll1: !pin.aftRoll1,
        };
      }
      return pin;
    });
    setPinState(updatedPinState);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {pinState.map((pin) => (
        <Roll1Pins
          key={pin.id}
          buttonTitle={pin.id.toString()}
          aftRoll1={pin.aftRoll1}
          onPress={() => {
            togglePinState(pin.id);
            // console.log(pinState);  // just some checking to see that state was changed.
          }}
        />
      ))}
      <TouchableOpacity>
        <Text>Strike</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.replace("Roll2", { pinState })}
      >
        <Text>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Roll1;
