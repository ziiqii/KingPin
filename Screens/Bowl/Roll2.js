import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import FadedPin from "../../Components/Buttons/FadedPin";
import Roll2Pins from "../../Components/Buttons/Roll2Pins";

const Roll2 = ({ navigation, route }) => {
  const { pinState } = route.params;
  const [newPinState, setNewPinState] = useState(pinState);

  const togglePinState = (id) => {
    const updatedPinState = newPinState.map((pin) => {
      if (pin.id === id) {
        return {
          ...pin,
          aftRoll2: !pin.aftRoll2,
        };
      }
      return pin;
    });
    setNewPinState(updatedPinState);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {newPinState.map((pin) => {
        if (!pin.aftRoll1) {
          return <FadedPin key={pin.id} buttonTitle={pin.id.toString()} />;
        } else {
          // Render regular Pin component for pins that are remaining
          return (
            <Roll2Pins
              key={pin.id}
              buttonTitle={pin.id.toString()}
              aftRoll2={pin.aftRoll2}
              onPress={() => {
                togglePinState(pin.id);
                // console.log(pinState); // just some checking to see that state was changed.
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
