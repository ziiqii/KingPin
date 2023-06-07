/*
Calculates current score given the state of game.
Takes in a game.

calculateScore(array of frames):
let prev = 0 if first frame, else previous frame's score
for each frame:
    if 9th frame:
        return prev + calculateFrameTen()
    else:
        if this frame strike:
            return prev + calculateStrike(this frame)
        elif this frame spare:
            return prev + calculateSpare(this frame)
        else this frame open:
            return prev + calculateOpenFrame(this frame)


calculateStrike(frame):
if next frame first throw gutter:
    return 10
elif next frame strike:
    if this is 8th frame:
        if 10th frame first throw strike:
            return 30
        else:
            return 20 + 10th frame first throw
    elif next next frame strike:
        return 30
    else:
        return 20 + next next frame first throw
elif next frame spare:
    return 20
else next frame open:
    return 10 + calculateOpenFrame(next frame)


calculateSpare(frame):
if next frame gutter:
    return 10
elif next frame strike:
    return 20
else:
    return 10 + next frame first throw

calculateOpenFrame(frame):
return this frame first roll + this frame second roll

calculateFrameTen:
score = 0

if 10th frame first throw strike:
    score = 10
    if 10th frame second throw strike:
        score = 20
        else:
            if 10th frame third throw strike:
                score = 30
            else: 10th frame third throw open:
                score = 20 + third throw
            if 10th frame third spare:
                score = 20
    else:
        score += (10th frame second throw, 10th frame third throw)
else:
    if 10th frame third throw is spare [X, -, /]:
        score = 20
    elif 10th frame second throw is spare:
        if last throw strike [?, /, X]:
            score = 20
        else [?, /, ?]:
            score = 10 + 10th frame third throw

    else 10th frame 2nd throw open frame:
        score = calculateOpenFrame(10th frame, which is first two rolls)

return score
*/

export default function calculateScore(game) {
    const g = [...game]; // shallow copy
  
    return g;
  }
  