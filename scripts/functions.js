//Defining auxiliar functions

//Identify device
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

//Game controling
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
        
        mCtx.beginPath();
        mCtx.moveTo(map.width/2,map.height/2-10);
        mCtx.lineTo(map.width/2,map.height/2+10)
        mCtx.moveTo(map.width/2-10,map.height/2);
        mCtx.lineTo(map.width/2+10,map.height/2)
        mCtx.stroke();
        
        generateEnemies();
        rover.draw();
        spaceman.draw();
        drawEnemies();
        drawShoots();
        score.draw();

        ctx.fillText('Scenario Active ' + scenActive, 100, 100);
        
    },1000/60);
}

function gameOver(){
    console.log('game Over')
    gameState = 'gameOver';
    clearInterval(interval);
    
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

//Scenario
function generateScenarios(){
    for (i=0; i<scenarioImages.length; i++){
        let scenario = new Scenario(0,-canvas.height*(scenarioScale-1),canvas.width*scenarioScale, canvas.height*scenarioScale,scenarioImages[i]);
        scenarios.push(scenario);
    }
}

//Stations
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

//Enemies
function generateEnemies(){
    if (scenarios[scenActive].enemies.length > enemiesQuantity-1) return;
    if (frames % 100 === 0 || frames % 140 === 0 || frames % 340 === 0){
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

function drawEnemies (){
    scenarios[scenActive].enemies.forEach(function(enemy, indexEnemy){
        deepFactorEnemie = (enemy.y - scenarios[scenActive].y)/scenarios[scenActive].height;
        enemy.width = enemyWidth * itemScale * deepFactorEnemie;
        enemy.height = enemyHeight * itemScale * deepFactorEnemie;
        enemy.draw(enemyDirection(enemy,character[charActive]),character[charActive]);
        if(character[charActive].collition(enemy)){
            character[charActive].receiveDamage(enemy);
            enemy.receiveDamage(character[charActive],indexEnemy);
        }
        shoots.forEach(function(shoot,indexShoot){
            if(shoot.collition(enemy)){
                enemy.receiveDamage(shoot,indexEnemy,indexShoot);
            }
        });
    });
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

//Spaceman
function spacemanNorth(){
    spaceman.direction = 'N';
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
    spaceman.direction = 'E';
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
    spaceman.direction = 'S'
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
    spaceman.direction = 'W';
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

function spacemanDimUpdate(){
    deepFactorSpaceman = (spaceman.y - scenarios[scenActive].y)/scenarios[scenActive].height;
    spaceman.height = spacemanHeight * deepFactorSpaceman * itemScale;
    spaceman.width = spacemanWidth * deepFactorSpaceman * itemScale;
}

//Rover
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
                scenarios[scenActive].stations[0].x = scenarios[scenActive].x + scenarios[scenActive].width*0.8;
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
                scenarios[scenActive].stations[0].x = scenarios[scenActive].x + scenarios[scenActive].width*0.8;
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

function roverDimUpdate(){
    deepFactorRover = (rover.y - scenarios[scenActive].y)/scenarios[scenActive].height;
    rover.height = roverHeight * deepFactorRover * itemScale;
    if (rover.direction === 'E' || rover.direction === 'W'){
        rover.width = roverWidthSide * deepFactorRover * itemScale;
    } else {
        rover.width = roverWidthFront * deepFactorRover * itemScale;
    }
}

//Additional functions
function distance(x1,y1,x2,y2){
    return Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
}

function createShoots(character){
    let x =character.x + character.width *0.25;
    let y =character.y + character.height*0.25;
    let width = character.height*0.5;
    let height =character.height*0.5;
    let shoot = new Shooting(x, y, width, height, character.direction);
    shoots.push(shoot);
}

function drawShoots(){
    shoots.forEach(function(shoot){
        shoot.draw();
    });
}