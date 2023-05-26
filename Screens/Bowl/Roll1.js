import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import PinInit from "../../Components/Buttons/PinInit";
import PinDown from "../../Components/Buttons/PinDown";
import PinStand from "../../Components/Buttons/PinStand";

const Roll1 = ({ navigation }) => {
  // This toggles the state of the pins
  const [pinState, setPinState] = useState(
    Object.fromEntries(
      Array.from({ length: 10 }, (_, index) => [index + 1, "initial"])
    )
  );

  const togglePinState = (id) => {
    const pinType = {
      initial: "standing",
      standing: "initial",
      down: "standing",
    };

    // Check if all pins down
    // If all pins are down, call resetState
    const allPinsDown = Object.values(pinState).every(
      (state) => state === "down"
    );
    if (allPinsDown) {
      resetState();
    }

    // Check if this pin standing and all other pins are in initial state
    // If so, call setStrike
    const thisStandingAndOthersInitial = Object.keys(pinState).every(
      (pinId) => {
        if (pinId === id) {
          if (pinState[pinId] === "standing") {
            return true;
          }
        } else {
          return pinState[pinId] === "initial";
        }
      }
    );
    // Pls stay down
    if (thisStandingAndOthersInitial) {
      setStrike();
      pinType.down = "down";
    }

    setPinState((prevState) => ({
      ...prevState,
      [id]: pinType[prevState[id]],
    }));
  };

  const setStrike = () => {
    setPinState(
      Object.fromEntries(Object.keys(pinState).map((id) => [id, "down"]))
    );
  };

  const resetState = () => {
    setPinState(
      Object.fromEntries(Object.keys(pinState).map((id) => [id, "initial"]))
    );
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
      {Object.entries(pinState).map(([id, pinType]) => {
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
        }
      })}
      <TouchableOpacity onPress={() => setStrike()}>
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
