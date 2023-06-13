import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import PinDown from "../../Components/Buttons/PinDown";
import PinStand from "../../Components/Buttons/PinStand";
import PinConv from "../../Components/Buttons/PinConv";
import ScoreBoard from "../../Components/Tables/ScoreBoard";
import updateGame from "../../Functions/updateGame";
import calculateAndUpdateScore from "../../Functions/calculateAndUpdateScore";

const RollScreen2 = ({ navigation, route }) => {
  const { frameNum, rollNum, pinState, gameId } = route.params;
  const [newPinState, setNewPinState] = useState(pinState);
  const [newFrameState, setNewFrameState] = useState("open");

  const togglePinState = (id) => {
    const pinType = {
      standing: "converted",
      down: "down",
      converted: "standing",
    };

    const thisStandingAndOthersConvertedOrDown = Object.keys(newPinState).every(
      (pinId) => {
        if (pinId === id) {
          return newPinState[pinId] === "standing";
        } else {
          return (
            newPinState[pinId] === "converted" || newPinState[pinId] === "down"
          );
        }
      }
    );

    const thisConverted = Object.keys(newPinState).every((pinId) => {
      if (pinId === id) {
        return newPinState[pinId] === "converted";
      } else {
        return true;
      }
    });

    if (thisConverted) {
      setNewFrameState("open");
    }

    if (thisStandingAndOthersConvertedOrDown) {
      setSpare();
      pinType.converted = "converted";
    }

    // Finally set the pin state
    setNewPinState((prevState) => ({
      ...prevState,
      [id]: pinType[prevState[id]],
    }));
  };

  const setSpare = () => {
    // "standing" pins -> "converted"
    const updatedPinState = Object.fromEntries(
      Object.entries(pinState).map(([id, state]) => [
        id,
        state === "standing" ? "converted" : state,
      ])
    );
    setNewPinState(updatedPinState);
    setNewFrameState("spare");
  };

  const resetState = () => {
    setNewPinState(pinState);
    setNewFrameState(null);
  };

  //Check if all pins down OR converted (spare check)
  const spare = Object.values(newPinState).every(
    (state) => state === "down" || state === "converted"
  );

  const confirmPress = () => {
    // frame 10 logic
    if (frameNum == 10) {
      if (rollNum == 2 && spare) {
        // this means that the first roll did not strike
        navigation.replace("RollScreen1", {
          frameNum: frameNum,
          rollNum: 3,
          gameId: gameId,
        });
      } else if (rollNum == 2 && !spare) {
        // rollNum == 2 but open
        navigation.replace("GameOverScreen");
      } else {
        // rollNum == 3 (e.g. X, 6, / or X, 6, 3)
        navigation.replace("GameOverScreen");
      }
      return;
    }
    // frames 1 - 9 logic
    navigation.replace("RollScreen1", {
      frameNum: frameNum + 1,
      rollNum: 1,
      gameId: gameId,
    });
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
              const pinType = newPinState[pinId];

              switch (pinType) {
                case "down":
                  return (
                    <PinDown
                      key={pinId}
                      buttonTitle={pinId}
                      onPress={() => togglePinState(pinId)}
                      disabled={true}
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
                case "converted":
                  return (
                    <PinConv
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
        <TouchableOpacity
          onPress={() => setSpare()}
          style={{
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 16, color: "white" }}>Spare</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => resetState()}
          style={{
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 16, color: "white" }}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            confirmPress();
            updateGame(gameId, frameNum, rollNum, newPinState, newFrameState);
            calculateAndUpdateScore(gameId, frameNum);
          }}
          style={{
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 16, color: "white" }}>Confirm</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 16, color: "white", marginTop: 20 }}>
          Instructions:
        </Text>
        <Text style={{ fontSize: 16, color: "white" }}>
          Select the pins that you have knocked down after your throw, or
          "Spare" if all pins were knocked down. Select "Reset" to return
          previously standing pins to the original standing position. Once you
          are ready, select "Confirm" to affirm your choice.
        </Text>
      </View>
    </View>
  );
};

export default RollScreen2;
