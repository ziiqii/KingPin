import { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import PinInit from "../../Components/Buttons/PinInit";
import PinDown from "../../Components/Buttons/PinDown";
import PinStand from "../../Components/Buttons/PinStand";
import ScoreBoard from "../../Components/Tables/ScoreBoard";
import updateGame from "../../Functions/updateGame";
import Modal from "react-native-modal";

const RollScreen1 = ({ navigation, route }) => {
  // First, obtain the current game from the database
  const { frameNum, rollNum, gameId } = route.params;
  const [frameState, setFrameState] = useState(null);

  // for the fading out of "confirm" button before "strike" is pressed or pins are toggled
  const [isConfirmDisabled, setIsConfirmDisabled] = useState(true);

  // for the fading out of "strike" button once it has been pressed once
  const [isStrikeDisabled, setIsStrikeDisabled] = useState(false);

  // for toggling the instructions modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // Initialisation of pinState
  const [pinState, setPinState] = useState(
    // {1: "down", 2: "standing", ...,}
    Object.fromEntries(
      Array.from({ length: 10 }, (_, index) => [index + 1, "initial"])
    )
  );

  // Check if all pins down
  const allPinsDown = Object.values(pinState).every(
    (state) => state === "down"
  );

  // This toggles the state of the pins
  const togglePinState = (id) => {
    const pinType = {
      initial: "standing",
      standing: "initial",
      down: "standing",
    };

    if (allPinsDown) {
      resetState();
    }

    // Check if this pin standing and all other pins are in initial state
    // If so, call setStrike
    const thisStandingAndOthersInitial = Object.keys(pinState).every(
      (pinId) => {
        if (pinId === id) {
          return pinState[pinId] === "standing";
        } else {
          return pinState[pinId] === "initial";
        }
      }
    );
    // Pls stay down
    if (thisStandingAndOthersInitial) {
      // setStrike();
      // setIsStrikeDisabled(true);
      setIsConfirmDisabled(true);
    } else {
      setIsConfirmDisabled(false);
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
    setIsConfirmDisabled(false);
    setFrameState("strike");
  };

  // TODO: Consider adding a "Gutter" button -> all pins become standing

  const resetState = () => {
    setPinState(
      Object.fromEntries(Object.keys(pinState).map((id) => [id, "initial"]))
    );
    setFrameState(null);
    setIsConfirmDisabled(true);
  };

  const confirmPress = () => {
    const updatedPinState = Object.fromEntries(
      Object.entries(pinState).map(([id, state]) => [
        id,
        state === "initial" ? "down" : state,
      ])
    );

    // if there is a strike, then navigate back to RollScreen1 but with updated frameNum
    if (allPinsDown) {
      if (frameNum == 10) {
        // frame 10 strike logic
        navigation.replace("RollScreen1", {
          frameNum: frameNum,
          rollNum: rollNum + 1,
          gameId: gameId,
        });
      } else {
        // frames 1 - 9 strike logic
        navigation.replace("RollScreen1", {
          frameNum: frameNum + 1,
          rollNum: 1,
          gameId: gameId,
        });
      }
    } else {
      navigation.replace("RollScreen2", {
        pinState: updatedPinState,
        frameNum: frameNum,
        rollNum: rollNum + 1,
        gameId: gameId,
      });
    }

    if (rollNum == 3) {
      navigation.replace("GameOverScreen", { gameId: gameId });
    }
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
        <ScoreBoard Id={gameId} />
      </View>

      {/* Instructions Button */}
      <TouchableOpacity
        onPress={toggleModal}
        style={{ padding: 10, alignSelf: "flex-end" }}
      >
        <Text style={{ fontSize: 16, color: "#2e64e5" }}>Instructions</Text>
      </TouchableOpacity>

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
          onPress={() => {
            setStrike();
            setIsStrikeDisabled(true);
          }}
          disabled={isStrikeDisabled}
          style={{
            opacity: isStrikeDisabled ? 0.3 : 1,
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 16, color: "white" }}>Strike</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            resetState();
            setIsStrikeDisabled(false);
          }}
          style={{
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 16, color: "white" }}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            confirmPress();
            updateGame(gameId, frameNum, rollNum, pinState, frameState);
          }}
          disabled={isConfirmDisabled}
          style={{
            opacity: isConfirmDisabled ? 0.3 : 1,
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 16, color: "white" }}>Confirm</Text>
        </TouchableOpacity>
      </View>

      {/* Instructions modal */}

      <Modal isVisible={isModalVisible}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={{ backgroundColor: "white", padding: 20 }}>
            <Text style={{ fontSize: 16 }}>
              Select the pins that remain standing after your throw, or "Strike"
              if all pins were knocked down. Select "Reset" to return all pins
              to the original standing position. Once you are ready, select
              "Confirm" to affirm your choice.
            </Text>
            <TouchableOpacity
              onPress={toggleModal}
              style={{ marginTop: 20, alignSelf: "flex-end" }}
            >
              <Text style={{ fontSize: 16, color: "blue" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RollScreen1;
