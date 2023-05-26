import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Roll1Pins from "../../Components/Buttons/Roll1Pins";

const Roll1 = ({ navigation }) => {
  // This toggles the state of the pins
  // aftRoll#: whether or not pin left standing after Roll#
  const [pinState, setPinState] = useState(
    Object.fromEntries(
      Array.from({ length: 10 }, (_, index) => [
        index + 1,
        { aftRoll1: false, aftRoll2: false },
      ])
    )
  );
  const togglePinState = (id) => {
    const updatedPinState = {
      ...pinState,
      [id]: { ...pinState[id], aftRoll1: !pinState[id].aftRoll1 },
    };
    setPinState(updatedPinState);
  };

  const setStrike = () => {};

  const resetState = () => {
    const updatedPinState = Object.fromEntries(
      Object.entries(pinState).map(([id, pin]) => [
        id,
        { ...pin, aftRoll1: false },
      ])
    );
    setPinState(updatedPinState);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#36393f"}}>
      {Object.entries(pinState).map(([id, pin]) => (
        <Roll1Pins
          key={id}
          buttonTitle={id.toString()}
          aftRoll1={pin.aftRoll1}
          onPress={() => {
            togglePinState(id);
            // console.log(pinState);  // just some checking to see that state was changed.
          }}
        />
      ))}
      <TouchableOpacity>
        <Text>Strike</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => resetState()}>
        <Text>Reset</Text>
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
