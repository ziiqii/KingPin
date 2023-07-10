import { Text, View } from "react-native";
import { useState } from "react";
import PinInit from "../../Components/Buttons/PinInit";
import PinStand from "../../Components/Buttons/PinStand";
import generateSpare from "../../Functions/generateSpareText";

const GuideScreen = () => {
  const [frameState, setFrameState] = useState(null);

  // Initialisation of pinState
  const [pinState, setPinState] = useState(
    // {1: "down", 2: "standing", ...,}
    Object.fromEntries(
      Array.from({ length: 10 }, (_, index) => [index + 1, "initial"])
    )
  );

  // This toggles the state of the pins
  const togglePinState = (id) => {
    const pinType = {
      // dict for switching pinTypes
      initial: "standing",
      standing: "initial",
    };

    // Set the pin state
    setPinState((prevState) => ({
      ...prevState,
      [id]: pinType[prevState[id]],
    }));
  };

  const invertedTriangle = {
    0: ["7", "8", "9", "10"],
    1: ["4", "5", "6"],
    2: ["2", "3"],
    3: ["1"],
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
      {/* Displays pin #*/}
      <Text style={{ fontSize: 25, color: "#ffffff" }}>
        {generateSpare(pinState)}
      </Text>

      {/* Display common name if exists in library */}

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

              switch (
                pinType // only 2 pinTypes needed
              ) {
                case "initial":
                  return (
                    <PinInit
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
              }
            })}
          </View>
        ))}
      </View>

      {/* Shows button if diagram exists, else display text */}
    </View>
  );
};

export default GuideScreen;
