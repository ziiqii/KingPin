export default function calculateScore(game) {
  const frames = { ...game };
  let prevScore = 0;

  for (let frameNum = 1; frameNum <= 10; frameNum++) {
    const frame = frames[frameNum];
    let score;

    if (frameNum === 10) {
      score = calculateFrameTen(frame);
    } else {
      if (frame.type === "strike") {
        score = calculateStrike(
          frame,
          frames[frameNum + 1],
          frames[frameNum + 2]
        );
      } else if (frame.type === "spare") {
        score = calculateSpare(frame, frames[frameNum + 1]);
      } else {
        score = calculateOpenFrame(frame);
      }
    }

    frame.score = prevScore + score;
    prevScore = frame.score;
  }

  return frames;
}

function calculateStrike(frame, nextFrame, nextNextFrame) {
  if (nextFrame.type === "strike") {
    if (frame.frameNum === 8) {
      if (nextNextFrame.rollOne === 10) {
        return 30;
      } else {
        return 20 + nextNextFrame.rollOne;
      }
    } else if (nextNextFrame.type === "strike") {
      return 30;
    } else {
      return 20 + nextNextFrame.rollOne;
    }
  } else if (nextFrame.type === "spare") {
    return 20;
  } else {
    return 10 + (nextFrame.rollOne + nextFrame.rollTwo);
  }
}

function calculateSpare(nextFrame) {
  if (nextFrame.rollOne === 0) {
    return 10;
  } else if (nextFrame.rollOne === 10) {
    return 20;
  } else {
    return 10 + nextFrame.rollOne;
  }
}

function calculateOpenFrame(frame) {
  return frame.rollOne + frame.rollTwo;
}

function calculateFrameTen(frame) {
  if (frame.rollThree == null) {
    return calculateOpenFrame(frame);
  } else {
    return calculateOpenFrame(frame) + frame.rollThree;
  }
}
