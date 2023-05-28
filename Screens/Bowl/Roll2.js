import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import PinDown from "../../Components/Buttons/PinDown";
import PinInit from "../../Components/Buttons/PinInit";
import PinStand from "../../Components/Buttons/PinStand";
import PinConv from "../../Components/Buttons/PinConv";

const Roll2 = ({ navigation, route }) => {
  const { pinState } = route.params;
  const [newPinState, setNewPinState] = useState(pinState);

  const togglePinState = (id) => {
    const pinType = {
      standing: "converted",
      down: "down",
      converted: "standing",
    };

    // Finally set the pin state
    setNewPinState((prevState) => ({
      ...prevState,
      [id]: pinType[prevState[id]],
    }));
  };

  const setSpare = () => {
    // "stanidng" pins -> "converted"
    const updatedPinState = Object.fromEntries(
      Object.entries(pinState).map(([id, state]) => [
        id,
        state === "standing" ? "converted" : state,
      ])
    );
    setNewPinState(updatedPinState);
  };

  const resetState = () => {
    setNewPinState(pinState);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#36393f",
      }}
    >
      {Object.entries(newPinState).map(([id, pinType]) => {
        switch (pinType) {
          case "initial":
            return (
              <PinInit
                key={id}
                buttonTitle={id.toString()}
                onPress={() => togglePinState(id)}
              />
            );
          case "down":
            return (
              <PinDown
                key={id}
                buttonTitle={id.toString()}
                onPress={() => togglePinState(id)}
              />
            );
          case "standing":
            return (
              <PinStand
                key={id}
                buttonTitle={id.toString()}
                onPress={() => togglePinState(id)}
              />
            );
          case "converted":
            return (
              <PinConv
                key={id}
                buttonTitle={id.toString()}
                onPress={() => togglePinState(id)}
              />
            );
          default:
            return null; // Good practice, we can handle unrecognized pin types in future
        }
      })}
      <TouchableOpacity onPress={() => setSpare()}>
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
