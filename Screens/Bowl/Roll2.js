import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import FadedPin from "../../Components/Buttons/FadedPin";
import Roll2Pins from "../../Components/Buttons/Roll2Pins";

const Roll2 = ({ navigation, route }) => {
  const { pinState } = route.params;
  const [newPinState, setNewPinState] = useState(pinState);

  const togglePinState = (id) => {
    const updatedPinState = {
      ...newPinState,
      [id]: { ...newPinState[id], aftRoll2: !newPinState[id].aftRoll2 },
    };
    setNewPinState(updatedPinState);
  };

  const setSpare = () => {};

  const resetState = () => {
    setNewPinState(pinState);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {Object.entries(newPinState).map(([id, pin]) => {
        if (!pin.aftRoll1) {
          return <FadedPin key={id} buttonTitle={id.toString()} />;
        } else {
          // Render regular Pin component for pins that are remaining
          return (
            <Roll2Pins
              key={id}
              buttonTitle={id.toString()}
              aftRoll2={pin.aftRoll2}
              onPress={() => {
                togglePinState(id);
                // console.log(pinState); // just some checking to see that state was changed.
              }}
            />
          );
        }
      })}
      <TouchableOpacity>
        <Text>Spare</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => resetState()}>
        <Text>Reset</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.replace("Roll1")}>
        <Text>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Roll2;
