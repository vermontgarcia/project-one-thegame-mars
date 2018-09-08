//Linking main canvas
var canvas = document.getElementById('mars');
var ctx = canvas.getContext('2d');
    
//Linking map canvas
var map = document.getElementById('map');
var mCtx = map.getContext('2d');

//Activating full scree request
document.addEventListener("click", function (e) {
    if(!e.path) return;
    if(e.path[2].id === "expand"){
        var el = document.documentElement,
        rfs = el.requestFullscreen
                || el.webkitRequestFullScreen
                || el.mozRequestFullScreen
                || el.msRequestFullscreen
        ;
        rfs.call(el);
    }
});

//Definig variables
var isMobile;
var interval;
var frames = 0;
var velocity = 5;
var roverVelFac = 0.05;
var spacemanVelFac = 0.1;
var character = {};
var scenarioScale = 2;
var itemScale = 0.75;
var deepFactorChar = 1;
var deepFactorSpaceman;
var deepFactorEnemie;
var enemiesQuantity = 20;
var shoots = [];

var gameState = 'inactive';
var charActive = 'spaceman';
var scenActive = 0;
var scenarioImages = [
    './images/MarsScenario1.png',
    './images/MarsScenario2.png',
    './images/MarsScenario3.png',
    './images/MarsScenario4.png',
    './images/MarsScenario5.png',
    './images/MarsScenario6.png'
]
var scenarios = [];

var borderError = "Error trying to excced the grid borders";

var stationBoundary;

//Defining constants
const spacemanHeight = 200;
const spacemanWidth = 57;
const roverHeight = 300;
const roverWidthFront = 300;
const roverWidthSide = 300*1.38;
const enemyHeight = 200;
const enemyWidth = 160;
const stationWidth = 200;
const stationHeight = stationWidth * 0.4;
const scale = (map.width/canvas.width)/scenarioScale;

//Creating instances

generateScenarios();

generateStations();

var spaceman = new Spaceman(canvas.width*0.25, canvas.height*0.75, spacemanWidth*itemScale*deepFactorChar, spacemanHeight*itemScale*deepFactorChar);
character.spaceman = spaceman;

var rover = new Rover(canvas.width*0.45, canvas.height*0.55, roverWidthSide*itemScale*deepFactorChar, roverHeight*itemScale*deepFactorChar);
character.rover = rover;

var score = new Score();

//Verifying the device runing the game
isMobile = isMobile();
console.log('Is mobile device?', isMobile);
ctx.font = '55px serif';
ctx.fillText(isMobile, 100, 100);

//Setting the keyboard Controls
var key; 
addEventListener('keydown', function(e){
    key = e;
    if (gameState === 'inactive' || gameState === 'paused'){
        //console.log('game Inactive', key);
        if (key.keyCode === 80) startGame();

    } else if (gameState === 'active'){
        //console.log('game active', key)
        if (charActive === 'spaceman'){
            
            switch(key.keyCode){
                case 17:
                    //Shoot
                    createShoots(spaceman);
                break;
                case 37:
                    //Walk West
                    spacemanWest(spaceman);
                break;
                case 38:
                    //Walk North
                    spacemanNorth(spaceman);
                break;
                case 39:
                    //Walk East
                    spacemanEast(spaceman);
                break;
                case 40:
                    //Walk South
                    spacemanSouth(spaceman);
                break;
                case 77:
                    //Toggle Map Visibility
                    toggleMap();
                break;
                case 80:
                    //Pause or resume the game
                    pauseResumeGame();
                break;
                case 83:
                    //Show summary
                    toggleMap();
                break;
                case 85:
                    //Spaceman getting in the Rover
                    gettingInRover();
                break;
                default:
                break;        
            }
        } else if (charActive === 'rover'){

            switch(key.keyCode){
                case 17:
                    //Shoot
                    createShoots(rover);
                break;
                case 37:
                    //Turn Left
                    turnLeft(rover);
                break;
                case 38:
                    //Move Forward
                    moveForward(rover);
                break;
                case 39:
                    //Turn Rigth
                    turnRight(rover);
                break;
                case 40:
                    //Move Backward
                    moveBackward(rover);
                break;
                case 68:
                    //Spaceman getting out of the Rover
                    gettingOutRover();
                break;
                case 77:
                    //Toggle Map Visibility
                    toggleMap();
                break;
                case 80:
                    //Pause or resume the game
                    pauseResumeGame();
                break;
                case 83:
                    //Show summary
                    toggleMap();
                break;
                default:
                break;        
            }
        }
    }
});
    
//Excecuting the game
startGame();