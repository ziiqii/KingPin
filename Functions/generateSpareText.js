/*
A pinState for bucket is:
Object {
  "1": "initial",
  "10": "initial",
  "2": "standing",
  "3": "initial",
  "4": "standing",
  "5": "standing",
  "6": "initial",
  "7": "initial",
  "8": "standing",
  "9": "initial",
}

generateSpare converts pinState to the string "2-4-5-8".
- order is strictly ascending
*/

export default function generateSpare(pinState) {
  const sparePins = [];

  for (let pin = 1; pin <= 10; pin++) {
    if (pinState[pin] === "standing") {
      sparePins.push(pin);
    }
  }
  
  return sparePins.length == 0 ? "" : sparePins.join("-");
}
