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
var interval;
var frames = 0;
var velocity = 5;
var roverVelFac = 0.05;
var enemies = [];
var scenarioScale = 2.5;
var itemScale = 0.35;
var roverSDFactor = 3;
var deepFactorRover;
var deepFactorEnemie;
var enemiesQuantity = 20;


var borderError = "Error trying to excced the grid borders";

var northBoundary;
var stationBoundary;

//Defining constants
const roverHeight = 300;
const roverWidthFront = 300;
const roverWidthSide = 300*1.38;
const enemyHeight = 200;
const enemyWidth = 160;
const stationWidth = 200;
const stationHeight = stationWidth * 0.4;
const scale = 0.3/scenarioScale;

//Creating instances
var scenario = new Scenario(0,-canvas.height*(scenarioScale-1),canvas.width*scenarioScale, canvas.height*scenarioScale);

deepFactorRover = (canvas.height/2 - scenario.y)/scenario.height;
//var rover = new Rover(scenario.x + scenario.width*(0.5/scenarioScale), scenario.y + scenario.height * (0.5*scenarioScale), roverWidthSide*itemScale*deepFactorRover, roverHeight*itemScale*deepFactorRover);

var station1 = new Station(scenario.x + scenario.width*0.8, scenario.y + scenario.height*0.5,stationWidth*scenarioScale,stationHeight*scenarioScale);

var rover = new Rover(canvas.width*0.25, canvas.height*0.75, roverWidthSide*itemScale*deepFactorRover, roverHeight*itemScale*deepFactorRover);
//console.log('scenario x, y, w & h ', scenario.x, scenario.y, scenario.width, scenario.height)
//console.log('rover x, y, w & h ', rover.x, rover.y, rover.width, rover.height)
//console.log('station1 x, y, w & h ', station1.x, station1.y, station1.width, station1.height)

//Defining auxiliar functions

function startGame(){

    //Initializing variables
    northBoundary = scenario.height - scenario.height*0.53;

    //Setting drawing interval 60 frames per second
    interval = setInterval(function(){
        
        frames++;
        
        //Drawing main canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //Drawing map canvas
        mCtx.clearRect(0, 0, map.width, map.height);
        mCtx.lineWidth = 3;
        
        
        scenario.draw();
        station1.draw();
        
        //Auxiliar drawings
        ctx.beginPath();    
        ctx.arc(station1.x + station1.width/2, station1.y + station1.height/2, station1.width/2, 0, Math.PI*2, false)
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
        drawEnemies();
        
    }), 1000/60 ;
}

function distance(x1,y1,x2,y2){
    return Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
}

function enemyDirection(enemy,rover){
    let direction = '';
    if(enemy.y > rover.y){
        direction += 'N'
        if (enemy.x > rover.x){
            direction += 'W'
        } else {
            direction += 'E';
        }
    } else {
        direction += 'S'
        if (enemy.x > rover.x){
            direction += 'W'
        } else {
            direction += 'E';
        }
    }
    return direction;
}

function gameOver(){

}

function roverDimUpdate(){
    deepFactorRover = (rover.y - scenario.y)/scenario.height;
    rover.height = roverHeight * deepFactorRover * itemScale;
    if (rover.direction === 'E' || rover.direction === 'W'){
        rover.width = roverWidthSide * deepFactorRover * itemScale;
    } else {
        rover.width = roverWidthFront * deepFactorRover * itemScale;
    }
}

function generateEnemies(){
    if (enemies.length > enemiesQuantity-1) return;
    if (frames % 1000 == 0 || frames % 700 == 0 || frames % 1700 == 0){
        let width = enemyWidth*itemScale;
        let height = enemyHeight*itemScale;
        let x = scenario.x + Math.floor(Math.random()*scenario.width)-width;
        let y = scenario.y + Math.floor(Math.random()*scenario.height)-height;
        if(/*y > northBoundary &&*/ distance(x,y,rover.x,rover.y) > rover.height * roverSDFactor){
            let enemy = new Enemy(x,y,width,height)
            enemies.push(enemy);
        }
    }
}

function drawEnemies (){
    enemies.forEach(function(enemy){
        deepFactorEnemie = (enemy.y - scenario.y)/scenario.height;
        enemy.width = enemyWidth * itemScale * deepFactorEnemie;
        enemy.height = enemyHeight * itemScale * deepFactorEnemie;

        enemy.draw(enemyDirection(enemy,rover),deepFactorEnemie);

        if(rover.collition(enemy)){
            console.log('damage')
        }
    })
}


function turnLeft(rover){
    let actualDirection = rover.direction;
    let newDirection;
    console.log("turnLeft");
    switch (actualDirection){
      case "N":
        newDirection = "W";
        rover.image.src = '../images/RoverWest.png';
        rover.width = rover.height*1.38; 
        console.log("Head West");
      break;
      case "E":
        newDirection = "N";
        rover.image.src = '../images/RoverNorth.png';
        rover.width = rover.height; 
        console.log("Head North");
      break;
      case "S":
        newDirection = "E";
        rover.image.src = '../images/RoverEast.png';
        rover.width = rover.height*1.38; 
        console.log("Head East");
      break;
      case "W":
        newDirection = "S";
        rover.image.src = '../images/RoverSouth.png';
        rover.width = rover.height;
        console.log("Head South");
      break;
      default:
        console.log("Direction not identified");
      break;
    }
    console.log("Position (" + rover.x + "," + rover.y + ")");
    //printGrid(grid);
    rover.direction = newDirection;  
  }
  
  function turnRight(rover){
    let actualDirection = rover.direction;
    let newDirection;
    console.log("turnRight");
    switch (actualDirection){
      case "N":
        newDirection = "E";
        rover.image.src = '../images/RoverEast.png';
        rover.width = rover.height*1.38; 
        console.log("Head East");
      break;
      case "E":
        newDirection = "S";
        rover.image.src = '../images/RoverSouth.png';
        rover.width = rover.height; 
        console.log("Head South");
      break;
      case "S":
        newDirection = "W";
        rover.image.src = '../images/RoverWest.png';
        rover.width = rover.height*1.38; 
        console.log("Head West");
      break;
      case "W":
        newDirection = "N";
        rover.image.src = '../images/RoverNorth.png';
        rover.width = rover.height; 
        console.log("Head North");
      break;
      default:
        console.log("Direction not identified");
      break;
    }
    console.log("Position (" + rover.x + "," + rover.y + ")");
    //printGrid(grid);
    rover.direction = newDirection;  
  }
  
  function moveForward(rover){
    let actualDirection = rover.direction;
    //updatePosition(rover, grid, "*");  
    console.log("moveForward");
    //roverDimUpdate();

    switch (actualDirection){
        case "N":
            if (frames%2 === 0){
                rover.image.src = '../images/RoverNorth2.png';
            } else {
                rover.image.src = '../images/RoverNorth.png';
            }
            if (rover.y - scenario.y > (1-(canvas.height*0.5/scenario.height))*scenario.height
            || rover.y - scenario.y < canvas.height/2){
                //Scenario fixed, Character moving
                rover.y -= rover.height*roverVelFac;
            } else {
                //Character fixed, Scenario moving
                scenario.y +=rover.height*roverVelFac;
                station1.y +=rover.height*roverVelFac;
                enemies.forEach(function(enemy){
                    enemy.y += rover.height*roverVelFac;
                });
            }
        break;
        case "E":
            if (frames%2 === 0){
                rover.image.src = '../images/RoverEast2.png';
            } else {
                rover.image.src = '../images/RoverEast.png';
            }
            if (rover.x - scenario.x < canvas.width/2 
                || rover.x - scenario.x > (1-(canvas.width*0.5/scenario.width))*scenario.width){
                //Scenario fixed, Character moving
                rover.x +=rover.height*roverVelFac;
            } else {
                //Character fixed, Scenario moving
                scenario.x -=rover.height*roverVelFac;
                station1.x -=rover.height*roverVelFac;
                enemies.forEach(function(enemy){
                    enemy.x -= rover.height*roverVelFac;
                });
            }
        break;
        case "S":
            if (frames%2 === 0){
                rover.image.src = '../images/RoverSouth2.png';
            } else {
                rover.image.src = '../images/RoverSouth.png';
            }
            if (rover.y - scenario.y > (1-(canvas.height*0.5/scenario.height))*scenario.height
                || rover.y - scenario.y < canvas.height/2){
                //Scenario fixed, Character moving
                rover.y +=rover.height*roverVelFac;
            } else {
                //Character fixed, Scenario moving
                scenario.y -=rover.height*roverVelFac;
                station1.y -=rover.height*roverVelFac;
                enemies.forEach(function(enemy){
                    enemy.y -= rover.height*roverVelFac;
                });
            }
        break;
        case "W":
            if (frames%2 === 0){
                rover.image.src = '../images/RoverWest2.png';
            } else {
                rover.image.src = '../images/RoverWest.png';
            }
            if (rover.x - scenario.x < canvas.width/2 
                || rover.x - scenario.x > (1-(canvas.width*0.5/scenario.width))*scenario.width){
                //Scenario fixed, Character moving
                rover.x -=rover.height*roverVelFac;
            } else {
                //Character fixed, Scenario moving
                scenario.x +=rover.height*roverVelFac;
                station1.x +=rover.height*roverVelFac;
                enemies.forEach(function(enemy){
                    enemy.x += rover.height*roverVelFac;
                });
            }
        break;
        default:
            console.log("Direction not identified");
        break;
    }
    console.log("Position (" + rover.x + "," + rover.y + ")" );
    //updatePosition(rover, grid, "R");
    //printGrid(grid);
  }
  
  function moveBackward(rover){
    var actualDirection = rover.direction;
    //updatePosition(rover, grid, "*");
    console.log("moveBackward");
    //roverDimUpdate();
    switch (actualDirection){
        case "S":
            if (frames%2 === 0){
                rover.image.src = '../images/RoverSouth2.png';
            } else {
                rover.image.src = '../images/RoverSouth.png';
            }
            if (rover.y - scenario.y > (1-(canvas.height*0.5/scenario.height))*scenario.height 
                || rover.y - scenario.y < canvas.height/2){
                //Scenario fixed, Character moving
                rover.y -=rover.height*roverVelFac;
            } else {
                //Character fixed, Scenario moving
                scenario.y +=rover.height*roverVelFac;
                station1.y +=rover.height*roverVelFac;
                enemies.forEach(function(enemy){
                    enemy.y += rover.height*roverVelFac;
                });
            }
        break;
        case "W":
            if (frames%2 === 0){
                rover.image.src = '../images/RoverWest2.png';
            } else {
                rover.image.src = '../images/RoverWest.png';
            }
            if (rover.x - scenario.x < canvas.width/2 
                || rover.x - scenario.x > (1-(canvas.width*0.5/scenario.width))*scenario.width){
                //Scenario fixed, Character moving
                rover.x +=rover.height*roverVelFac;
            } else {
                //Character fixed, Scenario moving
                scenario.x -=rover.height*roverVelFac;
                station1.x -=rover.height*roverVelFac;
                enemies.forEach(function(enemy){
                    enemy.x -= rover.height*roverVelFac;
                });
            }
        break;
        case "N":
            if (frames%2 === 0){
                rover.image.src = '../images/RoverNorth2.png';
            } else {
                rover.image.src = '../images/RoverNorth.png';
            }
            if (rover.y - scenario.y > (1-(canvas.height*0.5/scenario.height))*scenario.height 
                || rover.y - scenario.y < canvas.height/2){
                //Scenario fixed, Character moving
                rover.y +=rover.height*roverVelFac;
            } else {
                //Character fixed, Scenario moving
                scenario.y -=rover.height*roverVelFac;
                station1.y -=rover.height*roverVelFac;
                enemies.forEach(function(enemy){
                    enemy.y -= rover.height*roverVelFac;
                });
            }
        break;
        case "E":
            if (frames%2 === 0){
                rover.image.src = '../images/RoverEast2.png';
            } else {
                rover.image.src = '../images/RoverEast.png';
            }
            if (rover.x - scenario.x < canvas.width/2 
                || rover.x - scenario.x > (1-(canvas.width*0.5/scenario.width))*scenario.width){
                //Scenario fixed, Character moving
                rover.x -=rover.height*roverVelFac;
            } else {
                //Character fixed, Scenario moving
                scenario.x +=rover.height*roverVelFac;
                station1.x +=rover.height*roverVelFac;
                enemies.forEach(function(enemy){
                    enemy.x += rover.height*roverVelFac;
                });
            }
        break;
        default:
        console.log("Direction not identified");
        break;
    }
    //updatePosition(rover, grid, "R");
    //printGrid(grid);
  }

  function toggleMap (){
      $('.map').toggleClass('hide');
  }
  
  function toggleSumary (){
      $('.map').toggleClass('hide');
  }
  
  function pauseGame (){
      $('.map').toggleClass('hide');
  }

addEventListener('keydown', function(e){
    switch(e.keyCode){
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
        case 77:
            //Toggle Map Visibility
            toggleMap();
        break;
        case 80:
            //Pause or resume the game
            toggleMap();
        break;
        case 83:
            //Show summary
            toggleMap();
        break;
        default:
        break;        
    }
})


//Excecuting the game
startGame();

//scenario.image.onload = function(){
//    scenario.draw();
//    
//}
