# KingPin

This is the repository that holds the source code for the Orbital project KingPin, done by [@ZackTheManiac](https://github.com/ZackTheManiac) and [@ziiqii](https://github.com/ziiqii).

## Motivation

Ten-pin bowling is a popular indoor sport where players roll a ball down a wooden lane with the aim of knocking over the ten pins at the end of the lane. The game consists of ten frames, and the player with the highest total score at the end of the game is the winner. Each frame allows the player two chances to knock down as many pins as possible, with a strike achieved by knocking down all ten pins on the first roll. If the bowler fails to knock down all the pins in the first roll, they have a chance to spare on the second. Strategies such as targeting specific pins and adjusting the speed and angle of the ball can be used to improve one's score.

Many novice bowlers have found memorising the spots to stand and aim unintuitive and laborious to commit to memory. Furthermore, it is inconvenient and time-consuming to input the layout of the pins when trying to clear a spare shot, which can disrupt the flow of a game.

Moreover, it can be difficult to determine areas for improvement as players cannot track their stats during the game.

Additionally, with the presence of hundreds of different types of bowling balls on the market, bowlers often cannot remember the stats of each ball, and are unsure of which balls to use in their inventory.

We wish to create an all-in-one bowling companion designed with both beginners and seasoned professionals in mind to provide users with everything they need to do well in bowling.

## Currently implemented features

### Account Creation and Login System

To use KingPin, users will have to create a new account with a valid email and a password longer than 6 characters. They will then be able to log into our app and access more features. Our authentication includes login persistence, so once you have logged into the app once, the app will automatically bring users to the home page for subsequent app launches.

Upon logging into the app, users will be brought the the homepage, where there are bottom tabs to navigate between the other features of our app. As of 27/5/2023, we have implemented the Ball Collection feature and part of the Score Tracker feature. They can be found under the "Balls" tab and "Bowl" tab respectively.

### Ball Collection

Our Ball Collection allows users to save the names of bowling balls in their accounts or remove unwanted ones.

Navigate to the Balls tab by clicking on it in the bottom tab, and press "ADD A NEW BALL". A modal will appear, along with a text input. Type the name of the ball you want to save inside it, then press "Add Ball". You will be brought back to the Balls tab where you can see the name inputted previously. You may click on the "Delete" button below the item to delete it.

Future updates will fully implement the search feature, as well as the Ball Advisor feature where KingPin suggests which ball to use for an inputted lane condition.

### Score Tracker

Our Score Tracker aims to keep track of a user's game state by allowing users to tap on the provided pins on the screen to input game score.

Simply navigate to the Bowl tab and click on "Start Game" to begin. On the Roll1 screen, select the pins that are still remaining after the first throw, then press "Confirm". Select "Strike" if all pins were knocked down in the first throw.

Upon pressing the pins, the initially white outlined pins with dark background will turn into pins with a red outline with a white background. Should a pin be pressed then pressed again, all pins will become faded out but are still interactable. Pressing the confirm button should bring you to the next screen, Roll2 where all pins are faded out. Upon pressing strike, all pins should become faded out.

## Complete README

The complete README can be found here: [link](https://docs.google.com/document/d/1x04KUWEXq2gmz5gpR03JLWfmucEww30ZYyzqP7z3CyU/edit?pli=1)

## Download instructions:

Requirements:

1. [Node.js LTS release](https://nodejs.org/en/)
2. Expo Go app on your mobile device.

Steps:

1. Download the repo [here](https://github.com/ziiqii/KingPin/archive/refs/heads/main.zip).
2. Extract the file to any destination, and within your IDE, open the 'KingPin-main' folder.
3. Bring up your terminal in your IDE to check that you are in the correct folder.
4. Run 'npm install --global expo-cli' to install expo.
5. Run 'npm install' to install dependencies.
6. Run 'expo start' in terminal to start the server.
7. A QR Code will appear in the terminal.
8. Open your camera and scan the QR Code to run the app.

If you have any issues, you can dm us on telegram:

- @zhuyicheng
- @ziiqii
