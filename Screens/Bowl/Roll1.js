import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import PinInit from "../../Components/Buttons/PinInit";
import PinDown from "../../Components/Buttons/PinDown";
import PinStand from "../../Components/Buttons/PinStand";
import ScoreBoard from "../../Components/Tables/ScoreBoard";

const Roll1 = ({ navigation }) => {
  // Initialisation of pinState
  const [pinState, setPinState] = useState(
    Object.fromEntries(
      Array.from({ length: 10 }, (_, index) => [index + 1, "initial"])
    )
  );

  // This toggles the state of the pins
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

    // Finally set the pin state
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

  const confirmPress = () => {
    // TODO: On strike, write to db and nav to screen 2

    // TODO: Write to db
    // Non strike: nav to screen 2, "initial" pins -> "down"
    const updatedPinState = Object.fromEntries(
      Object.entries(pinState).map(([id, state]) => [
        id,
        state === "initial" ? "down" : state,
      ])
    );

    navigation.replace("Roll2", { pinState: updatedPinState });
  };

  const invertedTriangle = {
    0: ["7", "8", "9", "10"],
    1: ["4", "5", "6"],
    2: ["2", "3"],
    3: ["1"],
  };

  return (
    <View>
      {/* Scoreboard */}
      <View style={{ alignItems: "stretch" }}>
        <ScoreBoard />
      </View>

      {/* Pin Display */}
      <View style={{ flexDirection: "column" }}>
        {Object.entries(invertedTriangle).map(([rowIndex, pins]) => (
          <View
            key={rowIndex}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              margin: -5,
            }}
          >
            {pins.map((pinId) => {
              const pinType = pinState[pinId];

              switch (pinType) {
                case "initial":
                  return (
                    <PinInit
                      key={pinId}
                      buttonTitle={pinId}
                      onPress={() => togglePinState(pinId)}
                    />
                  );
                case "down":
                  return (
                    <PinDown
                      key={pinId}
                      buttonTitle={pinId}
                      onPress={() => togglePinState(pinId)}
                    />
                  );
                case "standing":
                  return (
                    <PinStand
                      key={pinId}
                      buttonTitle={pinId}
                      onPress={() => togglePinState(pinId)}
                    />
                  );
                default:
                  return null;
              }
            })}
          </View>
        ))}
      </View>

      {/* Buttons */}
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity onPress={() => setStrike()}>
          <Text style={{fontSize: 16, color: "white"}}>Strike</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => resetState()}>
          <Text style={{fontSize: 16, color: "white"}}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => confirmPress()}>
          <Text style={{fontSize: 16, color: "white"}}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Roll1;
