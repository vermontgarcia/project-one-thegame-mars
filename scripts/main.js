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
for (i=0; i<scenarioImages.length; i++){
    let scenario = new Scenario(0,-canvas.height*(scenarioScale-1),canvas.width*scenarioScale, canvas.height*scenarioScale,scenarioImages[i])
    scenarios.push(scenario);
}

generateStations();

var spaceman = new Spaceman(canvas.width*0.25, canvas.height*0.75, spacemanWidth*itemScale*deepFactorChar, spacemanHeight*itemScale*deepFactorChar);
character.spaceman = spaceman;

var rover = new Rover(canvas.width*0.45, canvas.height*0.55, roverWidthSide*itemScale*deepFactorChar, roverHeight*itemScale*deepFactorChar);

character.rover = rover;

var score = new Score();

//Defining auxiliar functions

function isMobile(){
    if (
        (navigator.userAgent.match (/Android/i)) ||
        (navigator.userAgent.match (/webOS/i)) ||
        (navigator.userAgent.match (/Mobi/i)) ||
        (navigator.userAgent.match (/iPhone/i)) ||
        (navigator.userAgent.match (/iPad/i)) ||
        (navigator.userAgent.match (/iPod/i)) ||
        (navigator.userAgent.match (/BlackBerry/i))        
    ) return true;
    return false;
}

isMobile = isMobile();
console.log('Is mobile device?', isMobile);
ctx.font = '55px serif';
ctx.fillText(isMobile, 100, 100);

function startGame(){
    gameState = 'active';
    
    //Initializing variables
    
    //Setting drawing interval 60 frames per second
    interval = setInterval(function(){
        
        frames++;
        
        //Drawing main canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //Drawing map canvas
        mCtx.clearRect(0, 0, map.width, map.height);
        mCtx.lineWidth = 3;
        
        
        scenarios[scenActive].draw();
        scenarios[scenActive].stations[0].draw();
        
        //Auxiliar drawings
        ctx.beginPath();    
        ctx.arc(scenarios[scenActive].stations[0].x + scenarios[scenActive].stations[0].width/2, scenarios[scenActive].stations[0].y + scenarios[scenActive].stations[0].height/2, scenarios[scenActive].stations[0].width/2, 0, Math.PI*2, false)
        ctx.stroke();
        /////
        
        
        mCtx.beginPath();
        mCtx.moveTo(map.width/2,map.height/2-10);
        mCtx.lineTo(map.width/2,map.height/2+10)
        mCtx.moveTo(map.width/2-10,map.height/2);
        mCtx.lineTo(map.width/2+10,map.height/2)
        mCtx.stroke();
        //mCtx.beginPath();
        //mCtx.arc(map.width/2, map.height/2, 13, 0, Math.PI*2, false)
        //mCtx.stroke();
        
        
        generateEnemies();
        rover.draw();
        spaceman.draw();
        drawEnemies();
        
        score.draw();

        ctx.fillText('Scenario Active ' + scenActive, 100, 100);

        
    }), 1000/60 ;
}

function distance(x1,y1,x2,y2){
    return Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
}

function enemyDirection(enemy,character){
    let direction = '';
    if(enemy.y + enemy.height*0.5 > character.y + character.height * 0.5){
        direction += 'N'
        if (enemy.x + enemy.width * 0.5 > character.x + character.width * 0.5){
            direction += 'W'
        } else {
            direction += 'E';
        }
    } else {
        direction += 'S'
        if (enemy.x + enemy.width * 0.5 > character.x + character.width * 0.5){
            direction += 'W'
        } else {
            direction += 'E';
        }
    }
    return direction;
}

function gameOver(){
    console.log('game Over')
    gameState = 'gameOver';
    clearInterval(interval);
    
}

function roverDimUpdate(){
    deepFactorRover = (rover.y - scenarios[scenActive].y)/scenarios[scenActive].height;
    rover.height = roverHeight * deepFactorRover * itemScale;
    if (rover.direction === 'E' || rover.direction === 'W'){
        rover.width = roverWidthSide * deepFactorRover * itemScale;
    } else {
        rover.width = roverWidthFront * deepFactorRover * itemScale;
    }
}

function spacemanDimUpdate(){
    deepFactorSpaceman = (spaceman.y - scenarios[scenActive].y)/scenarios[scenActive].height;
    spaceman.height = spacemanHeight * deepFactorSpaceman * itemScale;
    spaceman.width = spacemanWidth * deepFactorSpaceman * itemScale;
}

function gettingInRover(){
    if (distance(spaceman.x + spaceman.width*0.5, spaceman.y, rover.x + rover.width*0.8, rover.y + rover.height * 0.2 ) <= spaceman.width){
        charActive = 'rover';
    }
}

function gettingOutRover(){
    spaceman.x = rover.x + rover.width*0.8;
    spaceman.y = rover.y + rover.height * 0.5;
    charActive = 'spaceman';
}

function generateEnemies(){
    if (scenarios[scenActive].enemies.length > enemiesQuantity-1) return;
    if (frames % 1000 == 0 || frames % 700 == 0 || frames % 1700 == 0){
        let width = enemyWidth*itemScale;
        let height = enemyHeight*itemScale;
        let x = scenarios[scenActive].x + Math.floor(Math.random()*scenarios[scenActive].width)-width;
        let y = scenarios[scenActive].y + Math.floor(Math.random()*scenarios[scenActive].height)-height;
        if(distance(x,y,character[charActive].x,character[charActive].y) > character[charActive].height * character[charActive].saveDistanceFactor){
            let enemy = new Enemy(x,y,width,height)
            scenarios[scenActive].enemies.push(enemy);
        }
    }
}

function generateStations(){

    let x = scenarios[scenActive].x + scenarios[scenActive].width*0.8;
    let y =scenarios[scenActive].y + scenarios[scenActive].height*0.5;
    let width = stationWidth*scenarioScale;
    let height = stationHeight*scenarioScale;    
    
    for (i = 0; i < scenarios.length; i++){
        let station = new Station(x, y, width, height);
        scenarios[i].stations.push(station);
    }
}

function drawEnemies (){
    scenarios[scenActive].enemies.forEach(function(enemy, index){
        deepFactorEnemie = (enemy.y - scenarios[scenActive].y)/scenarios[scenActive].height;
        enemy.width = enemyWidth * itemScale * deepFactorEnemie;
        enemy.height = enemyHeight * itemScale * deepFactorEnemie;
        enemy.draw(enemyDirection(enemy,character[charActive]),character[charActive]);
        if(character[charActive].collition(enemy)){
            character[charActive].receiveDamage(enemy);
            enemy.receiveDamage(character[charActive],index);
        }
    });
}

function spacemanNorth(){
    if (frames%2 === 0){
        spaceman.image.src = './images/SpacemanNorth2.png';
    } else {
        spaceman.image.src = './images/SpacemanNorth.png';
    }
    if (spaceman.y - scenarios[scenActive].y > (1-(canvas.height*0.5/scenarios[scenActive].height))*scenarios[scenActive].height
    || spaceman.y - scenarios[scenActive].y < canvas.height/2){
        //Scenario fixed, Character moving
        spaceman.y -= spaceman.height*spacemanVelFac;
    } else {
        //Character fixed, Scenario moving
        scenarios[scenActive].y +=spaceman.height*spacemanVelFac;
        scenarios[scenActive].stations[0].y +=spaceman.height*spacemanVelFac;
        rover.y +=spaceman.height*spacemanVelFac;
        scenarios[scenActive].enemies.forEach(function(enemy){
            enemy.y += spaceman.height*spacemanVelFac;
        });
    }

}

function spacemanEast(){
    if (frames%2 === 0){
        spaceman.image.src = './images/SpacemanEast2.png';
    } else {
        spaceman.image.src = './images/SpacemanEast.png';
    }
    if (spaceman.x - scenarios[scenActive].x < canvas.width/2 
        || spaceman.x - scenarios[scenActive].x > (1-(canvas.width*0.5/scenarios[scenActive].width))*scenarios[scenActive].width){
        //Scenario fixed, Character moving
        spaceman.x +=spaceman.height*spacemanVelFac;
    } else {
        //Character fixed, Scenario moving
        scenarios[scenActive].x -=spaceman.height*spacemanVelFac;
        scenarios[scenActive].stations[0].x -=spaceman.height*spacemanVelFac;
        rover.x -=spaceman.height*spacemanVelFac;
        scenarios[scenActive].enemies.forEach(function(enemy){
            enemy.x -= spaceman.height*spacemanVelFac;
        });
    }
}

function spacemanSouth(){
    if (frames%2 === 0){
        spaceman.image.src = './images/SpacemanSouth2.png';
    } else {
        spaceman.image.src = './images/SpacemanSouth.png';
    }
    if (spaceman.y - scenarios[scenActive].y > (1-(canvas.height*0.5/scenarios[scenActive].height))*scenarios[scenActive].height
        || spaceman.y - scenarios[scenActive].y < canvas.height/2){
            //Scenario fixed, Character moving
        spaceman.y +=spaceman.height*spacemanVelFac;
    } else {
        //Character fixed, Scenario moving
            scenarios[scenActive].y -=spaceman.height*spacemanVelFac;
            scenarios[scenActive].stations[0].y -=spaceman.height*spacemanVelFac;
            rover.y -=spaceman.height*spacemanVelFac;
            scenarios[scenActive].enemies.forEach(function(enemy){
                enemy.y -= spaceman.height*spacemanVelFac;
            });
    }
}

function spacemanWest(){
    if (frames%2 === 0){
        spaceman.image.src = './images/SpacemanWest2.png';
    } else {
        spaceman.image.src = './images/SpacemanWest.png';
    }
    if (spaceman.x - scenarios[scenActive].x < canvas.width/2 
        || spaceman.x - scenarios[scenActive].x > (1-(canvas.width*0.5/scenarios[scenActive].width))*scenarios[scenActive].width){
            //Scenario fixed, Character moving
            spaceman.x -=spaceman.height*spacemanVelFac;
    } else {
        //Character fixed, Scenario moving
        scenarios[scenActive].x +=spaceman.height*spacemanVelFac;
        scenarios[scenActive].stations[0].x +=spaceman.height*spacemanVelFac;
        rover.x +=spaceman.height*spacemanVelFac;
        scenarios[scenActive].enemies.forEach(function(enemy){
            enemy.x += spaceman.height*spacemanVelFac;
        });
    }
}

function turnLeft(rover){
    let actualDirection = rover.direction;
    let newDirection;
    //console.log("turnLeft");
    switch (actualDirection){
        case "N":
            newDirection = "W";
            rover.image.src = './images/RoverWest.png';
            rover.width = rover.height*1.38; 
            //console.log("Head West");
        break;
        case "E":
            newDirection = "N";
            rover.image.src = './images/RoverNorth.png';
            rover.width = rover.height; 
            //console.log("Head North");
        break;
        case "S":
            newDirection = "E";
            rover.image.src = './images/RoverEast.png';
            rover.width = rover.height*1.38; 
            //console.log("Head East");
        break;
        case "W":
            newDirection = "S";
            rover.image.src = './images/RoverSouth.png';
            rover.width = rover.height;
            //console.log("Head South");
        break;
        default:
            //console.log("Direction not identified");
        break;
    }
    rover.direction = newDirection;  
}

function turnRight(rover){
    let actualDirection = rover.direction;
    let newDirection;
    //console.log("turnRight");
    switch (actualDirection){
        case "N":
            newDirection = "E";
            rover.image.src = './images/RoverEast.png';
            rover.width = rover.height*1.38; 
            //console.log("Head East");
        break;
        case "E":
            newDirection = "S";
            rover.image.src = './images/RoverSouth.png';
            rover.width = rover.height; 
            //console.log("Head South");
        break;
        case "S":
            newDirection = "W";
            rover.image.src = './images/RoverWest.png';
            rover.width = rover.height*1.38; 
            //console.log("Head West");
        break;
        case "W":
            newDirection = "N";
            rover.image.src = './images/RoverNorth.png';
            rover.width = rover.height; 
            //console.log("Head North");
        break;
        default:
           //console.log("Direction not identified");
        break;
    }
    rover.direction = newDirection;  
}

function moveForward(rover){
let actualDirection = rover.direction;
    switch (actualDirection){
        case "N":
            if (frames%2 === 0){
                rover.image.src = './images/RoverNorth2.png';
            } else {
                rover.image.src = './images/RoverNorth.png';
            }
            if (rover.y - scenarios[scenActive].y > (1-(canvas.height*0.5/scenarios[scenActive].height))*scenarios[scenActive].height
                || rover.y - scenarios[scenActive].y < canvas.height/2){
                //Scenario fixed, Character moving
                rover.y -= rover.height*roverVelFac;
            } else {
                //Character fixed, Scenario moving
                scenarios[scenActive].y +=rover.height*roverVelFac;
                scenarios[scenActive].stations[0].y +=rover.height*roverVelFac;
                scenarios[scenActive].enemies.forEach(function(enemy){
                    enemy.y += rover.height*roverVelFac;
                });
            }
        break;
        case "E":
            if (frames%2 === 0){
                rover.image.src = './images/RoverEast2.png';
            } else {
                rover.image.src = './images/RoverEast.png';
            }
            if (rover.x - scenarios[scenActive].x < canvas.width/2 
                || rover.x - scenarios[scenActive].x > (1-(canvas.width*0.5/scenarios[scenActive].width))*scenarios[scenActive].width){
                //Scenario fixed, Character moving
                rover.x +=rover.height*roverVelFac;
            } else {
                //Character fixed, Scenario moving
                scenarios[scenActive].x -=rover.height*roverVelFac;
                scenarios[scenActive].stations[0].x -=rover.height*roverVelFac;
                scenarios[scenActive].enemies.forEach(function(enemy){
                    enemy.x -= rover.height*roverVelFac;
                });
            }
            if (rover.x > canvas.width){
                if (scenActive === 5){
                    scenActive = 0;
                } else{
                    scenActive += 1;
                }
                scenarios[scenActive].x = 0;
                rover.x = -rover.width;
            }
        break;
        case "S":
            if (frames%2 === 0){
                rover.image.src = './images/RoverSouth2.png';
            } else {
                rover.image.src = './images/RoverSouth.png';
            }
            if (rover.y - scenarios[scenActive].y > (1-(canvas.height*0.5/scenarios[scenActive].height))*scenarios[scenActive].height
                || rover.y - scenarios[scenActive].y < canvas.height/2){
                    //Scenario fixed, Character moving
                rover.y +=rover.height*roverVelFac;
            } else {
                //Character fixed, Scenario moving
                scenarios[scenActive].y -= rover.height*roverVelFac;
                scenarios[scenActive].stations[0].y -= rover.height*roverVelFac;
                scenarios[scenActive].enemies.forEach(function(enemy){
                    enemy.y -= rover.height*roverVelFac;
                });
            }
        break;
        case "W":
            if (frames%2 === 0){
                rover.image.src = './images/RoverWest2.png';
            } else {
                rover.image.src = './images/RoverWest.png';
            }
            if (rover.x - scenarios[scenActive].x < canvas.width/2 
                || rover.x - scenarios[scenActive].x > (1-(canvas.width*0.5/scenarios[scenActive].width))*scenarios[scenActive].width){
                    //Scenario fixed, Character moving
                rover.x -=rover.height*roverVelFac;
            } else {
                //Character fixed, Scenario moving
                scenarios[scenActive].x +=rover.height*roverVelFac;
                scenarios[scenActive].stations[0].x +=rover.height*roverVelFac;
                scenarios[scenActive].enemies.forEach(function(enemy){
                    enemy.x += rover.height*roverVelFac;
                });
            }
            if (rover.x + rover.width < 0){
                if (scenActive === 0){
                    scenActive = 5;
                } else{
                    scenActive -= 1;
                }
                scenarios[scenActive].x = -canvas.width*(scenarioScale-1);
                rover.x = canvas.width;
            }

        break;
        default:
            //console.log("Direction not identified");
        break;
    }
}
  
function moveBackward(rover){
    var actualDirection = rover.direction;
    switch (actualDirection){
        case "S":
            if (frames%2 === 0){
                rover.image.src = './images/RoverSouth2.png';
            } else {
                rover.image.src = './images/RoverSouth.png';
            }
            if (rover.y - scenarios[scenActive].y > (1-(canvas.height*0.5/scenarios[scenActive].height))*scenarios[scenActive].height
                || rover.y - scenarios[scenActive].y < canvas.height/2){
                //Scenario fixed, Character moving
                rover.y -=rover.height*roverVelFac;
            } else {
                //Character fixed, Scenario moving
                scenarios[scenActive].y +=rover.height*roverVelFac;
                scenarios[scenActive].stations[0].y +=rover.height*roverVelFac;
                scenarios[scenActive].enemies.forEach(function(enemy){
                    enemy.y += rover.height*roverVelFac;
                });
            }
            break;
        case "W":
        if (frames%2 === 0){
                rover.image.src = './images/RoverWest2.png';
            } else {
                rover.image.src = './images/RoverWest.png';
            }
            if (rover.x - scenarios[scenActive].x < canvas.width/2 
                || rover.x - scenarios[scenActive].x > (1-(canvas.width*0.5/scenarios[scenActive].width))*scenarios[scenActive].width){
                //Scenario fixed, Character moving
                rover.x +=rover.height*roverVelFac;
            } else {
                //Character fixed, Scenario moving
                scenarios[scenActive].x -=rover.height*roverVelFac;
                scenarios[scenActive].stations[0].x -=rover.height*roverVelFac;
                scenarios[scenActive].enemies.forEach(function(enemy){
                    enemy.x -= rover.height*roverVelFac;
                });
            }
            break;
        case "N":
        if (frames%2 === 0){
            rover.image.src = './images/RoverNorth2.png';
            } else {
                rover.image.src = './images/RoverNorth.png';
            }
            if (rover.y - scenarios[scenActive].y > (1-(canvas.height*0.5/scenarios[scenActive].height))*scenarios[scenActive].height 
                || rover.y - scenarios[scenActive].y < canvas.height/2){
                //Scenario fixed, Character moving
                rover.y +=rover.height*roverVelFac;
            } else {
                //Character fixed, Scenario moving
                scenarios[scenActive].y -=rover.height*roverVelFac;
                scenarios[scenActive].stations[0].y -=rover.height*roverVelFac;
                scenarios[scenActive].enemies.forEach(function(enemy){
                    enemy.y -= rover.height*roverVelFac;
                });
            }
        break;
        case "E":
            if (frames%2 === 0){
                rover.image.src = './images/RoverEast2.png';
            } else {
                rover.image.src = './images/RoverEast.png';
            }
            if (rover.x - scenarios[scenActive].x < canvas.width/2 
                || rover.x - scenarios[scenActive].x > (1-(canvas.width*0.5/scenarios[scenActive].width))*scenarios[scenActive].width){
                //Scenario fixed, Character moving
                rover.x -=rover.height*roverVelFac;
            } else {
                //Character fixed, Scenario moving
                scenarios[scenActive].x +=rover.height*roverVelFac;
                scenarios[scenActive].stations[0].x +=rover.height*roverVelFac;
                scenarios[scenActive].enemies.forEach(function(enemy){
                    enemy.x += rover.height*roverVelFac;
                });
            }
            break;
        default:
        //console.log("Direction not identified");
        break;
    }
}

function toggleMap (){
    $('.map').toggleClass('hide');
}
  
function toggleSumary (){
    $('.map').toggleClass('hide');
}

function pauseResumeGame (){

    if (gameState === 'active'){
        gameState = 'paused';
        clearInterval(interval);
    } else if (gameState = 'paused') {
        gameState = 'active';
        startGame();
    }
}



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
