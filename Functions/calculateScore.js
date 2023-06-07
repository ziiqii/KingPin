/*prev
Calculates current score given the state of game.
Takes in a game.

calculateScore(array of frames): [frame, frame, frame, ...]
[?/, X]
20, 30
let prev = 0 if first frame, else previous frame's score
for each frame:
    if 10th frame:
        curr = prev + calculateFrameTen()
    else normal frame:
        if frame type strike:
            curr = prev + calculateStrike(this frame)
        elif frame type spare:
            curr = prev + calculateSpare(this frame)
        else frame type open:
            curr = prev + calculateOpenFrame(this frame)
    this frame.score = curr


calculateStrike(frame):
if next frame strike:
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
        if 10th frame third throw strike:
            score = 30
        else: 10th frame third throw open: [X, X, ?]
            score = 20 + third throw
    elif 10th frame third throw spare: [X, ?, /]
        score = 20
    else: [X, ?, ?]
        score = 10 + (10th frame second throw, 10th frame third throw)
else:
    if 10th frame second throw is spare: [?, /,  ]
        if last throw strike [?, /, X]:
            score = 20
        else [?, /, ?]:
            score = 10 + 10th frame third throw

    else 10th frame 2nd throw open frame: [?, ?,  ]
        score = calculateOpenFrame(10th frame, which is first two rolls)

return score

calculateFrameTenv2:

if third throw null, score = calculateOpenFrame(this frame)
score = all throws of frame ten


*/

export default function calculateScore(game) {
    const g = [...game]; // shallow copy
  

    return g;
  }
  