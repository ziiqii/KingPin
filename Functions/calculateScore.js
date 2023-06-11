export default function calculateScore(game, frameNum) {
  const frames = { ...game };
  let prevScore = 0;

  for (let currFrameNum = 1; currFrameNum <= frameNum; currFrameNum++) {
    const frame = frames[currFrameNum];
    let score;

    if (currFrameNum === 10) {
      score = calculateFrameTen(frame);
    } else {
      if (frame.type === "strike") {
        score = calculateStrike(
          frame,
          frames[currFrameNum + 1],
          frames[currFrameNum + 2]
        );
      } else if (frame.type === "spare") {
        score = calculateSpare(frame, frames[currFrameNum + 1]);
      } else {
        score = calculateOpenFrame(frame);
      }
    }

    frame.score = prevScore + score;
    prevScore = frame.score;
  }

  return frames[frameNum].score;
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

function calculateSpare(frame, nextFrame) {
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
