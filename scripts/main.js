//Linking main canvas
var canvas = document.getElementById('mars');
var ctx = canvas.getContext('2d');
    
//Linking map canvas
var map = document.getElementById('map');
var mCtx = map.getContext('2d');

//Activating full scree request
document.addEventListener("click", function (e) {
    console.log(e.path);

    if(!e.path) return;
    if(e.path[3].id === "expand" || e.path[2].id === "expand" ){
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
var spacemanVelFac = 0.03;
var character = {};
var scenarioScale = 2;
var itemScale = 0.75;
var deepFactorChar = 1;
var deepFactorSpaceman;
var deepFactorEnemie;
var enemiesQuantity = 20;
var shoots = [];
var keys = [];

var gameState = 'inactive';
var charActive = 'spaceman';
var stationInside = false;
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
var stationsIntImages = [
    './images/StationInt1.png',
    './images/StationInt2.png',
    './images/StationInt3.png',
    './images/StationInt4.png',
    './images/StationInt5.png',
    './images/StationInt6.png',
    './images/StationInt7.png',
    './images/StationInt8.png'
]
var interiors = [];

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

generateInteriors();

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

addEventListener('keydown',function(e){
    keys[e.keyCode]=true;
});

addEventListener('keyup', function(e){
    keys[e.keyCode]=false;
});

addEventListener('keydown',function(e){
    if (gameState === 'inactive' || gameState === 'paused'){
        if(e.keyCode === 13) pauseResumeGame();
    } else if (gameState === 'active'){
        if(e.keyCode === 13) pauseResumeGame();
        if(charActive === 'spaceman'){
            if(e.keyCode === 17) createShoots(spaceman);
            if(e.keyCode === 73) gettingInStation();
            if(e.keyCode === 77) toggleMap();
            if(e.keyCode === 79) gettingOutStation();
            if(e.keyCode === 85) gettingInRover();
        }
        if(charActive === 'rover'){
            if(e.keyCode === 17) createShoots(rover);
            if(e.keyCode === 77) toggleMap();
            if(e.keyCode === 37) turnLeft(rover);
            if(e.keyCode === 39) turnRight(rover);
            if(e.keyCode === 68) gettingOutRover();
        }
    } else if (gameState === 'gameOver'){
        if(e.keyCode === 13) reStartGame();

    }
});

function keyControls(){
    if (gameState === 'inactive' || gameState === 'paused'){
        //console.log('game Inactive', key);
        //if (keys[80] === true) pauseResumeGame();
    
    } else if (gameState === 'active'){
        //console.log('game active', key)
        if (charActive === 'spaceman'){
            //if (keys[17] === true) createShoots(spaceman);
            if (keys[37] === true) spacemanWest(spaceman);
            if (keys[38] === true) spacemanNorth(spaceman);
            if (keys[39] === true) spacemanEast(spaceman);
            if (keys[40] === true) spacemanSouth(spaceman);
            //switch(key.keyCode){
            //    case 17:
            //        //Shoot
            //        createShoots(spaceman);
            //    break;
            //    case 37:
            //        //Walk West
            //        spacemanWest(spaceman);
            //    break;
            //    case 38:
            //        //Walk North
            //        spacemanNorth(spaceman);
            //    break;
            //    case 39:
            //        //Walk East
            //        spacemanEast(spaceman);
            //    break;
            //    case 40:
            //        //Walk South
            //        spacemanSouth(spaceman);
            //    break;
            //    case 77:
            //        //Toggle Map Visibility
            //        toggleMap();
            //    break;
            //    case 80:
            //        //Pause or resume the game
            //        pauseResumeGame();
            //    break;
            //    case 83:
            //        //Show summary
            //        toggleMap();
            //    break;
            //    case 85:
            //        //Spaceman getting in the Rover
            //        gettingInRover();
            //    break;
            //    default:
            //    break;        
            //}
        } else if (charActive === 'rover'){
            //if (keys[17] === true) createShoots(rover);
            //if (keys[37] === true) turnLeft(rover);
            if (keys[38] === true) moveForward(rover);
            //if (keys[39] === true) turnRight(rover);
            if (keys[40] === true) moveBackward(rover);
            //if (keys[77] === true) toggleMap();
            //if (keys[80] === true) pauseResumeGame();
            if (keys[68] === true) gettingOutRover();
    
            //switch(key.keyCode){
            //    case 17:
            //        //Shoot
            //        createShoots(rover);
            //    break;
            //    case 37:
            //        //Turn Left
            //        turnLeft(rover);
            //    break;
            //    case 38:
            //        //Move Forward
            //        moveForward(rover);
            //    break;
            //    case 39:
            //        //Turn Rigth
            //        turnRight(rover);
            //    break;
            //    case 40:
            //        //Move Backward
            //        moveBackward(rover);
            //    break;
            //    case 68:
            //        //Spaceman getting out of the Rover
            //        gettingOutRover();
            //    break;
            //    case 77:
            //        //Toggle Map Visibility
            //        toggleMap();
            //    break;
            //    case 80:
            //        //Pause or resume the game
            //        pauseResumeGame();
            //    break;
            //    case 83:
            //        //Show summary
            //        toggleMap();
            //    break;
            //    default:
            //    break;        
            //}
        }
    }
}

//addEventListener('keydown', function(e){
//    key = e;
//});
    
//Excecuting the game
startGame();