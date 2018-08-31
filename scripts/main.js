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

//Definig vairables
var interval;
var frames = 0;
var velocity = 5;
var enemies = [];
var scale = 1; 
var deepFactor = 0.3;
var enemiesQuantity = 20;

//Creating instances
var scenario = new Scenario(0,-canvas.height*3,canvas.width*4, canvas.height*4);
var rover = new Rover((canvas.width/2),(canvas.height/2),100,54);
var station1 = new Station((canvas.width*2)*0.85,50,100,30);

console.log('Scenario' + scenario.width, scenario.height)
console.log('Scenario' + scenario.x, scenario.y)
console.log('rover' + rover.x, rover.y)


//Defining auxiliar functions

function startGame(){
    //ctx.scale(scale,scale);
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

function generateEnemies(){
    if (enemies.length > enemiesQuantity-1) return;
    if (frames % 1000 == 0 || frames % 700 == 0 || frames % 1700 == 0){
        let width = 45;
        let height = 60;
        let x = Math.floor(Math.random()*canvas.width)-width;
        let y = Math.floor(Math.random()*canvas.height)-height;
        let enemy = new Enemy(x,y,width,height)
        enemies.push(enemy);
    }
}

function drawEnemies (){
    enemies.forEach(function(enemy){
        enemy.draw(enemyDirection(enemy,rover));
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
        console.log("Head West");
      break;
      case "E":
        newDirection = "N";
        rover.image.src = '../images/RoverNorth.png';
        console.log("Head North");
      break;
      case "S":
        newDirection = "E";
        rover.image.src = '../images/RoverEast.png';
        console.log("Head East");
      break;
      case "W":
        newDirection = "S";
        rover.image.src = '../images/RoverSouth.png';
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
        console.log("Head East");
      break;
      case "E":
        newDirection = "S";
        rover.image.src = '../images/RoverSouth.png';
        console.log("Head South");
      break;
      case "S":
        newDirection = "W";
        rover.image.src = '../images/RoverWest.png';
        console.log("Head West");
      break;
      case "W":
        newDirection = "N";
        rover.image.src = '../images/RoverNorth.png';
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
    switch (actualDirection){
        case "N":
            if (rover.y - 1 < 0){
                console.log(borderError);
            } else {
                //rover.image.src = '../images/RoverNorth.png'
                if (rover.y - scenario.y > 2800 || rover.y - scenario.y < 400){
                    rover.y -=velocity;
                } else {
                    scenario.y +=velocity;
                    station1.y +=velocity;
                    enemies.forEach(function(enemy){
                        enemy.y += velocity;
                    });
                }
                rover.width = rover.width - deepFactor;
                rover.height = rover.height - deepFactor;
            }
        break;
        case "E":
            if (rover.x + 1 > canvas.width){
                console.log(borderError);
            } else {
                //rover.image.src = '../images/RoverEast.png'
                if (rover.x - scenario.x < 600 || rover.x - scenario.x > 4200){
                    rover.x +=velocity;
                    console.log('E If '+ rover.x,scenario.x)
                } else {
                    scenario.x -=velocity;
                    station1.x -=velocity;
                    enemies.forEach(function(enemy){
                        enemy.x -= velocity;
                    });
                    console.log('E If '+ rover.x,scenario.x)
                }
            }
        break;
        case "S":
            if (rover.y + 1 > canvas.height){
                console.log(borderError);
            } else {
                //rover.image.src = '../images/RoverSouth.png'
                if (rover.y - scenario.y > 2800 || rover.y - scenario.y < 400){
                    rover.y +=velocity;
                } else {
                    scenario.y -=velocity;
                    station1.y -=velocity;
                    enemies.forEach(function(enemy){
                        enemy.y -= velocity;
                    });
                }
                rover.width = rover.width + deepFactor;
                rover.height = rover.height + deepFactor;
            }    
        break;
        case "W":
            if (rover.x - 1 < 0){
                console.log(borderError);
            } else {
                //rover.image.src = '../images/RoverWest.png'
                if (rover.x - scenario.x < 600 || rover.x - scenario.x > 4200){
                        rover.x -=velocity;
                        console.log('W If '+ rover.x,scenario.x)
                } else {
                    scenario.x +=velocity;
                    station1.x +=velocity;
                    enemies.forEach(function(enemy){
                        enemy.x += velocity;
                    });
                    console.log('W else '+ rover.x,scenario.x)
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
    switch (actualDirection){
        case "S":
            if (rover.y + 1 > canvas.height){
                console.log(borderError);
            } else {
                //rover.image.src = '../images/RoverNorth.png'
                if (rover.y - scenario.y > 2800 || rover.y - scenario.y < 400){
                    rover.y -=velocity;
                } else {
                    scenario.y +=velocity;
                    station1.y +=velocity;
                    enemies.forEach(function(enemy){
                        enemy.y += velocity;
                    });
                }
                rover.width = rover.width - deepFactor;
                rover.height = rover.height - deepFactor;
            }
        break;
        case "W":
            if (rover.x - 1 < 0){
                console.log(borderError);
            } else {
                //rover.image.src = '../images/RoverEast.png'
                if (rover.x - scenario.x < 600 || rover.x - scenario.x > 4200){
                    rover.x +=velocity;
                    console.log('E If '+ rover.x,scenario.x)
                } else {
                    scenario.x -=velocity;
                    station1.x -=velocity;
                    enemies.forEach(function(enemy){
                        enemy.x -= velocity;
                    });
                    console.log('E If '+ rover.x,scenario.x)
                }
            }
        break;
        case "N":
            if (rover.y - 1 < 0){
                console.log(borderError);
            } else {
                //rover.image.src = '../images/RoverSouth.png'
                if (rover.y - scenario.y > 2800 || rover.y - scenario.y < 400){
                    rover.y +=velocity;
                } else {
                    scenario.y -=velocity;
                    station1.y -=velocity;
                    enemies.forEach(function(enemy){
                        enemy.y -= velocity;
                    });
                }
                rover.width = rover.width + deepFactor;
                rover.height = rover.height + deepFactor;
            }
        break;
        case "E":
            if (rover.x + 1 > canvas.width){
                console.log(borderError);
            } else {
                //rover.image.src = '../images/RoverWest.png'
                if (rover.x - scenario.x < 600 || rover.x - scenario.x > 4200){
                        rover.x -=velocity;
                        console.log('W If '+ rover.x,scenario.x)
                } else {
                    scenario.x +=velocity;
                    station1.x +=velocity;
                    enemies.forEach(function(enemy){
                        enemy.x += velocity;
                    });
                    console.log('W else '+ rover.x,scenario.x)
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
            //S
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
