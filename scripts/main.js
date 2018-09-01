//Linking the canvas
var canvas = document.getElementById('mars');
var ctx = canvas.getContext('2d');

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
var scenarioScale = 4;
var itemScale = 0.5;
var deepFactorRover;
var deepFactorEnemie;
var enemiesQuantity = 20;
var borderError = "Error trying to excced the grid borders";


//Defining constants
const roverHeight = 300;
const roverWidthFront = 300;
const roverWidthSide = 300*1.38;
const enemyHeight = 200;
const enemyWidth = 160;

//Creating instances
var scenario = new Scenario(0,-canvas.height*(scenarioScale-1),canvas.width*scenarioScale, canvas.height*scenarioScale);

deepFactorRover = (canvas.height/2 - scenario.y)/scenario.height;
var rover = new Rover((canvas.width/2),(canvas.height/2),roverWidthSide*itemScale*deepFactorRover,roverHeight*itemScale*deepFactorRover);
var station1 = new Station((canvas.width*2)*0.85,50,100,30);

//Defining auxiliar functions

function startGame(){
    interval = setInterval(function(){
        frames++;
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        scenario.draw();
        station1.draw();
        generateEnemies();
        rover.draw();
        drawEnemies();
    }), 1000/60 ;
}

function distance(x1,y1,x2,y2){
    return Math.sqrt((Math.pow(x2,x1)+Math.pow(y2-y1)));
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
        let x = Math.floor(Math.random()*scenario.width)-width;
        let y = Math.floor(Math.random()*scenario.height)-height;
        if(y > scenario.height/2){
            let enemy = new Enemy(x,y,width,height)
            enemies.push(enemy);
        }
    }
}

function drawEnemies (){
    enemies.forEach(function(enemy){
        deepFactorEnemie = (enemy.y - scenario.y)/scenario.height;
        enemy.width = enemyWidth*itemScale*deepFactorEnemie;
        enemy.height = enemyHeight*itemScale*deepFactorEnemie;

        enemy.draw(enemyDirection(enemy,rover),deepFactorEnemie);
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
            if (rover.y - rover.height/2 - velocity*2 < 0){
                console.log(borderError);
            } else {

                if (rover.y - scenario.y > (1-(canvas.height*0.5/scenario.height))*scenario.height
                    || rover.y - scenario.y < canvas.height/2){
                    rover.y -= rover.height*roverVelFac;
                } else {
                    scenario.y +=rover.height*roverVelFac;
                    station1.y +=rover.height*roverVelFac;
                    enemies.forEach(function(enemy){
                        enemy.y += rover.height*roverVelFac;
                    });
                }
            }
        break;
        case "E":
            if (rover.x + rover.width/2 + velocity*2 > canvas.width){
                console.log(borderError);
            } else {
                if (frames%2 === 0){
                    rover.image.src = '../images/RoverEast2.png';
                } else {
                    rover.image.src = '../images/RoverEast.png';
                }
                if (rover.x - scenario.x < canvas.width/2 
                    || rover.x - scenario.x > (1-(canvas.width*0.5/scenario.width))*scenario.width){
                    rover.x +=rover.height*roverVelFac;
                } else {
                    scenario.x -=rover.height*roverVelFac;
                    station1.x -=rover.height*roverVelFac;
                    enemies.forEach(function(enemy){
                        enemy.x -= rover.height*roverVelFac;
                    });
                }
            }
        break;
        case "S":
            if (rover.y + rover.height/2 + velocity*2 > canvas.height){
                console.log(borderError);
            } else {
                if (rover.y - scenario.y > (1-(canvas.height*0.5/scenario.height))*scenario.height
                    || rover.y - scenario.y < canvas.height/2){
                    rover.y +=rover.height*roverVelFac;
                } else {
                    scenario.y -=rover.height*roverVelFac;
                    station1.y -=rover.height*roverVelFac;
                    enemies.forEach(function(enemy){
                        enemy.y -= rover.height*roverVelFac;
                    });
                }
            }    
        break;
        case "W":
            if (rover.x - rover.width/2 - velocity*2 < 0){
                console.log(borderError);
            } else {
                if (rover.x - scenario.x < canvas.width/2 
                    || rover.x - scenario.x > (1-(canvas.width*0.5/scenario.width))*scenario.width){
                        rover.x -=rover.height*roverVelFac;
                } else {
                    scenario.x +=rover.height*roverVelFac;
                    station1.x +=rover.height*roverVelFac;
                    enemies.forEach(function(enemy){
                        enemy.x += rover.height*roverVelFac;
                    });
                }
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
            if (rover.y - rover.height/2 - velocity*2 < 0){
                console.log(borderError);
            } else {
                if (rover.y - scenario.y > (1-(canvas.height*0.5/scenario.height))*scenario.height 
                    || rover.y - scenario.y < canvas.height/2){
                    rover.y -=rover.height*roverVelFac;
                } else {
                    scenario.y +=rover.height*roverVelFac;
                    station1.y +=rover.height*roverVelFac;
                    enemies.forEach(function(enemy){
                        enemy.y += rover.height*roverVelFac;
                    });
                }
            }
        break;
        case "W":
            if (rover.x + rover.width/2 + velocity*2 > canvas.width){
                console.log(borderError);
            } else {
                if (rover.x - scenario.x < canvas.width/2 
                    || rover.x - scenario.x > (1-(canvas.width*0.5/scenario.width))*scenario.width){
                    rover.x +=rover.height*roverVelFac;
                } else {
                    scenario.x -=rover.height*roverVelFac;
                    station1.x -=rover.height*roverVelFac;
                    enemies.forEach(function(enemy){
                        enemy.x -= rover.height*roverVelFac;
                    });
                }
            }
        break;
        case "N":
            if (rover.y + rover.height/2 + velocity*2 > canvas.height){
                console.log(borderError);
            } else {
                if (rover.y - scenario.y > (1-(canvas.height*0.5/scenario.height))*scenario.height 
                    || rover.y - scenario.y < canvas.height/2){
                    rover.y +=rover.height*roverVelFac;
                } else {
                    scenario.y -=rover.height*roverVelFac;
                    station1.y -=rover.height*roverVelFac;
                    enemies.forEach(function(enemy){
                        enemy.y -= rover.height*roverVelFac;
                    });
                }
            }
        break;
        case "E":
            if (rover.x - rover.width/2 - velocity*2 < 0){
                console.log(borderError);
            } else {
                if (frames%2 === 0){
                    rover.image.src = '../images/RoverEast2.png';
                } else {
                    rover.image.src = '../images/RoverEast.png';
                }
                if (rover.x - scenario.x < canvas.width/2 
                    || rover.x - scenario.x > (1-(canvas.width*0.5/scenario.width))*scenario.width){
                        rover.x -=rover.height*roverVelFac;
                } else {
                    scenario.x +=rover.height*roverVelFac;
                    station1.x +=rover.height*roverVelFac;
                    enemies.forEach(function(enemy){
                        enemy.x += rover.height*roverVelFac;
                    });
                }
            }
        break;
        default:
        console.log("Direction not identified");
        break;
    }
    console.log("Position (" + rover.x + "," + rover.y + ")");
    //updatePosition(rover, grid, "R");
    //printGrid(grid);
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
