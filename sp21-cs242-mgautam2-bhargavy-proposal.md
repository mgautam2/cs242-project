# Multiplayer Tank Game

Mrinal Gautam (mgautam2) | Moderator: Bhargav Yadavalli


## Abstract
### Project Purpose
Create a multiplayer player tank game, where two people can complete against to two destroy each other's tanks 

### Project Motivation
I am interested in a creating a robust orchestrator backend to create a game room that manages game state and brodcasts player states and updates it based on user actions. I will be 
leveraging web sockets to achieve this

## Technical Specification
- Platform: React App and Node Server
- Programming Languages: JavaScript (For both Frontend and Backend )
- Stylistic Conventions: Airbnb JavaScript Style Guide
- SDK: Socket.IO
- IDE: Atom
- Target Audience: Broad-range audience

## Functional Specification
### Features
- Users would be able to create game rooms share links to let another user to join the game
- Users can play a 2D tank game, where the objective will be to shoot the other player using the tank gun 
and other rechargable special weapons
- Users would be able to communicate with other players using a chat bar and an audio channel


## Brief Timeline
- Week 1: 
* Set up a Node Server using Express and Socket.io
* Backend can create socket connection whenever a user connects. And starts the game when two users connect  
* Create a React App to display the Home page 
* Create Game page which displays a static display for the game

- Week 2: 
* Frontend can support users to create a game room and create a link to allow another player to join
* Frontend will support player actions (ie fire gun,move) and send them to the Backend
* Backend would manage player positons and broadcast frames to the Frontend to update the game on the Frontend

- Week 3: 
* Frontend will support rechargeable special weapons that do more damage than the regular tank gun
* The game will display User health and weapons and include a timer for every match
* Create gaveover screen which will end the game and display the winner

- Week 4: 
* Backend would support messages between the users by broadcasting events from one user to the other
* Backend would support an audio channel for voice chat
* Frontend can allow chat and voice chat functionality
* Frontend can allow users to mute/unmute themselves 

## Rubrics
### Week 1
| Category  | Total Score Allocated | Detailed Rubrics                                                            |
|-----------|:---------:|-------------------------------------------------------------------------------|
|  Set up Node server |  1  |   +1 for properly set up Node server |
|  Backend game room |  1  |  0: Didn't implement anything <br/> +1: implemented |
|  Connect users and start game |  2  |  0: Didn't implement anything <br/> +2: implemented |
|  Set up React App |  1 |  +1 for properly set up React app |
|  Create start page and game page|  3  |  0: Didn't implement anything <br/> 1: Implemented page without functional buttoms <br/> +3: Implemented everything |
|  Unit test |  2  |  +0.5 per unit test |
|  Manual-test-plan |  2  |  +1 for each screenshot test case |

### Week 2
| Category  | Total Score Allocated | Detailed Rubrics                                                            |
|-----------|:---------:|-------------------------------------------------------------------------------|
|  Create shareable game links |  2  |  0: Didn't implement anything <br> create game links which allow users to start game|
|  User actions and Keyboard events  |  2  |  0: Didn't implement anything  <br> +2: Listen for actions and send back to server|
|  Game state |  2  |  0: Didn't implement anything <br> +2: Manage game state on server |
|  Update Game on Frontend |  3  |  0: Didn't implement anything  <br> +3: Backend emits current frame to Users and updates game state |
|  Unit test |  3  |  +0.5 per unit test |
|  Manual-test-plan |  5  |  +1 for each screenshot test case |


### Week 3
| Category  | Total Score Allocated | Detailed Rubrics                                                            |
|-----------|:---------:|-------------------------------------------------------------------------------|
|  Powerups and special weapons|  3  |  0: Didn't implement anything <br> +2: Implemented a rechargeable lazer gun <br> +3: Implemented more powerups like freezing enemy tank for two seconds| 
|  Display Stats and Timer |  2  |  0: Didn't implement anything <br> +1: Implemented Game stat (i.e. Health, powerups left) <br> +2: Implemented a 90 sec Timer for the game |
|  Game over |  2  |  0: Didn't implement anything <br> Created a game over screen and declare winner |
|  Unit test |  3  |  +0.5 per unit test |
|  Manual-test-plan |  4  |  +1 for each screenshot test case |


### Week 4
| Category  | Total Score Allocated | Detailed Rubrics                                                            |
|-----------|:---------:|-------------------------------------------------------------------------------|
|  In Game chat |  3  |  0: Didn't implement anything <br> +2: Displays most recent message  <br> +3: Chat history is also displayed for the current game session |
|  Voice chat |  3  |  0: Didn't implement anything <br> +3 In game voice chat channel |
|  Frontend chat feature addons |  2  |  0: Didn't implement anything <br> +2: Users can mute and unmute themselves |
|  Unit test |  3  |  +0.5 per unit test |
|  Manual-test-plan |  4  |  +1 for each screenshot test case |

