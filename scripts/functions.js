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
function intro(lang){
    let image = new Image();
    image.src = './images/Mars-featured-image.jpg';
    image.onload = function(){
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      }
    if (lang === ''){
        $(".modal").toggleClass("active");

        $('#eng-btn').hover(function() {
            $(this).css('cursor','pointer');
            $(this).addClass('hover');
            $(this).click(function(){
                language = 'english'
                $(".modal").toggleClass("active");
                setTimeout(function(){
                    $(".modal").attr("style", "display: none");
                    writeMars();
                },1500);
            });
        }, function(){
            $(this).removeClass('hover');
        });

        $('#spa-btn').hover(function() {
            $(this).css('cursor','pointer');
            $(this).addClass('hover');
            $(this).click(function(){
                language = 'spanish'
                $(".modal").toggleClass("active");
                setTimeout(function(){
                    $(".modal").attr("style", "display: none");
                    writeMars();
                },1500);
            });
        }, function(){
            $(this).removeClass('hover');
        });
    }

    $('#1p-btn').hover(function(){
        $(this).css('cursor','pointer');
        $(this).addClass('hover');
        $(this).click(function(){
            //Code here          
            $(this).addClass('selection');
            $(this).siblings().removeClass('selection');
            enableStart();
            players = 1;
        });
    }, function(){
        $(this).removeClass('hover');
    });
    
    $('#2p-btn').hover(function(){
        $(this).css('cursor','pointer');
        $(this).addClass('hover');
        $(this).click(function(){
            //Code here
            $(this).addClass('selection');
            $(this).siblings().removeClass('selection');
            enableStart();
            players = 2;
        });
    }, function(){
        $(this).removeClass('hover');
    });
    $('#surv-btn').hover(function(){
        $(this).css('cursor','pointer');
        $(this).addClass('hover');
        $(this).click(function(){
            //Code here
            $(this).addClass('selection');
            $(this).siblings().removeClass('selection');
            mode = 'survival';
            enableStart();
        });
    }, function(){
        $(this).removeClass('hover');
    });
    $('#mission-btn').hover(function(){
        $(this).css('cursor','pointer');
        $(this).addClass('hover');
        $(this).click(function(){
            //Code here
            $(this).addClass('selection');
            $(this).siblings().removeClass('selection');
            mode = 'mission';
            enableStart();
        });
    }, function(){
        $(this).removeClass('hover');
    });
    $('#easy-btn').hover(function(){
        $(this).css('cursor','pointer');
        $(this).addClass('hover');
        $(this).click(function(){
            //Code here
            $(this).addClass('selection');
            $(this).siblings().removeClass('selection');
            difficulty = 'easy';
            enableStart();
        });
    }, function(){
        $(this).removeClass('hover');
    });
    $('#hard-btn').hover(function(){
        $(this).css('cursor','pointer');
        $(this).addClass('hover');
        $(this).click(function(){
            //Code here
            $(this).addClass('selection');
            $(this).siblings().removeClass('selection');
            difficulty = 'hard';
            enableStart();
        });
    }, function(){
        $(this).removeClass('hover');
    });
    $('#expert-btn').hover(function(){
        $(this).css('cursor','pointer');
        $(this).addClass('hover');
        $(this).click(function(){
            //Code here
            $(this).addClass('selection');
            $(this).siblings().removeClass('selection');
            difficulty = 'expert';
            enableStart();
        });
    }, function(){
        $(this).removeClass('hover');
    });

    $('#start-btn').hover(function() {
        $(this).css('cursor','pointer');
        $(this).addClass('hover');
        $(this).click(function(){
            $("#controls").attr("style", "display: none");
            console.log(players,mode,difficulty);
            startGame();            
        });
    }, function(){
        $(this).removeClass('hover');
    });
}

function writeMars(){
    ctx.font = '900 250px arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('MARS', canvas.width*0.5, canvas.height*0.65);
    $("#controls").attr("style", "display: flex");
    setTimeout(function(){
        $("#controls").addClass("active");
    },1000);
}

function enableStart(){
    if ($('#players').children().hasClass('selection')
        && $('#mode').children().hasClass('selection')
        && $('#difficulty').children().hasClass('selection')){
        console.log('Ready');
        $('#start').removeClass('hide');
    } else {
        console.log('Not Ready');
    }
}

function startGame(){
    if(players === 2){
        $('.container').addClass('halfHeight');
        $('#2').removeClass('hide');
        $('#map').addClass('halfHeightMap');
        $('#map2').addClass('halfHeightMap');
    } else {
        $('.container').addClass('fullHeight');
        $('#map').addClass('fullHeightMap');
        $('#map2').addClass('fullHeightMap');
    }
    gameState = 'active';
    
    //Initializing variables
    
    //Setting drawing interval 60 frames per second
    interval = setInterval(function(){
        frames++;

        if (frames/100 % 2){
            keyControls2();
        }

        if (!stationInside){            
            //Drawing main canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx2.clearRect(0, 0, canvas.width, canvas.height);
            //Drawing map canvas
            mCtx.clearRect(0, 0, map.width, map.height);
            mCtx.lineWidth = 3;
            mCtx2.clearRect(0, 0, map.width, map.height);
            mCtx2.lineWidth = 3;
            //Drawing main canvas
            scenarios[scenActive].draw();
            scenarios[scenActive].stations[0].draw();
            //Drawing map canvas
            mCtx.beginPath();
            mCtx.moveTo(map.width/2,map.height/2-10);
            mCtx.lineTo(map.width/2,map.height/2+10)
            mCtx.moveTo(map.width/2-10,map.height/2);
            mCtx.lineTo(map.width/2+10,map.height/2)
            mCtx.stroke();

            mCtx2.beginPath();
            mCtx2.moveTo(map.width/2,map.height/2-10);
            mCtx2.lineTo(map.width/2,map.height/2+10)
            mCtx2.moveTo(map.width/2-10,map.height/2);
            mCtx2.lineTo(map.width/2+10,map.height/2)
            mCtx2.stroke();
            //Drawing main canvas
            generateEnemies();
            rover.draw();
            spaceman.draw();
            //spaceman2.draw();
            drawEnemies();
            drawShoots();
            score.draw();
            statusCharacter.draw(spaceman.health, rover.condition);
    
            //ctx.fillText('Scenario Active ' + scenActive, 100, 100);

        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            interiors[2].draw();
            spaceman.draw();
        }
    },1000/60);
}

function gameOver(){
    console.log('game Over')
    gameState = 'gameOver';
    console.log(interval);
    clearInterval(interval);
}

function reStartGame(){
    console.log('restarting....')
    frames = 0;
    character = {};
    //scenarioScale = 2;
    itemScale = 0.75;
    deepFactorChar = 1;
    deepFactorSpaceman;
    deepFactorEnemie;
    enemiesQuantity = 20;
    shoots = [];
    keys = [];
    scenarios = [];

    gameState = 'inactive';
    charActive = 'spaceman';
    stationInside = false;
    scenActive = 0;

    generateScenarios();

    generateStations();

    
    spaceman = new Spaceman(canvas.width*0.25, canvas.height*0.75, spacemanWidth*itemScale*deepFactorChar, spacemanHeight*itemScale*deepFactorChar);
    character.spaceman = spaceman;

    rover = new Rover(canvas.width*0.45, canvas.height*0.55, roverWidthSide*itemScale*deepFactorChar, roverHeight*itemScale*deepFactorChar);
    character.rover = rover;
    
    score.score = 0;
    score.enemies = 0;

    startGame();
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
    } else if (gameState === 'inactive' || gameState === 'paused') {
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

//Stations Interior
function generateInteriors(){
    let x = 0;
    let y = 0;
    let width = canvas.width;
    let height = canvas.height;    
    //let image = Mat.floor(Mat.random()*stationsIntImages.length);

    for (i = 0; i < stationsIntImages.length; i++){
        let interior = new StationInt(x, y, width, height,stationsIntImages[i]);
        interiors.push(interior);
    }
    //return interior = new StationInt(x, y, width, height,stationsIntImages[image]);
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
function spacemanNorth(spaceman){
    spaceman.direction = 'N';
    if (frames%2 === 0){
        //spaceman.image.src = './images/SpacemanNorth2.png';
    } else {
        //spaceman.image.src = './images/SpacemanNorth.png';
    }
    if (!stationInside){
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
            shoots.forEach(function(shoot){
                shoot.y += spaceman.height*spacemanVelFac;
            });
        }
    } else {
        spaceman.y -= spaceman.height*spacemanVelFac;
    }
}

function spacemanEast(spaceman){
    spaceman.direction = 'E';
    if (frames%2 === 0){
        spaceman.image.src = './images/SpacemanEast2.png';
    } else {
        spaceman.image.src = './images/SpacemanEast.png';
    }
    if (!stationInside){
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
            shoots.forEach(function(shoot){
                shoot.x -= spaceman.height*spacemanVelFac;
            });
        }
    } else {
        spaceman.x +=spaceman.height*spacemanVelFac;
    }
}

function spacemanSouth(spaceman){
    spaceman.direction = 'S'
    if (frames%2 === 0){
        //spaceman.image.src = './images/SpacemanSouth2.png';
    } else {
        //spaceman.image.src = './images/SpacemanSouth.png';
    }
    if (!stationInside){
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
                shoots.forEach(function(shoot){
                    shoot.y -= spaceman.height*spacemanVelFac;
                });
        }
    } else {
        spaceman.y +=spaceman.height*spacemanVelFac;
    }
}

function spacemanWest(spaceman){
    spaceman.direction = 'W';
    if (frames%2 === 0){
        spaceman.image.src = './images/SpacemanWest2.png';
    } else {
        spaceman.image.src = './images/SpacemanWest.png';
    }
    if (!stationInside){
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
            shoots.forEach(function(shoot){
                shoot.x += spaceman.height*spacemanVelFac;
            });
        }
    } else {
        spaceman.x -=spaceman.height*spacemanVelFac;
    }
}

function gettingInRover(){
    let x1 = spaceman.x + spaceman.width*0.5;
    let y1 = spaceman.y;
    let x2 = rover.x + rover.width*0.8;
    let y2 = rover.y + rover.height * 0.2;
    if (distance(x1, y1, x2, y2) <= spaceman.width){
        charActive = 'rover';
    }
}

function gettingOutRover(){
    spaceman.x = rover.x + rover.width*0.8;
    spaceman.y = rover.y + rover.height * 0.5;
    charActive = 'spaceman';
}

function gettingInStation(){
    let x1 = spaceman.x + spaceman.width*0.5
    let y1 = spaceman.y
    let x2 = scenarios[scenActive].stations[0].x + scenarios[scenActive].stations[0].width * 0.8;
    let y2 = scenarios[scenActive].stations[0].y + scenarios[scenActive].stations[0].height * 0.2;
    if (distance(x1, y1, x2, y2) <= spaceman.height){
        if(!$('.map').hasClass('hide')){
            spaceman.mapActive = true;
            $('.map').toggleClass('hide');          
        } else {
            spaceman.mapActive = false;
        }
        spaceman.xTemp = spaceman.x;
        spaceman.yTemp = spaceman.y;
        spaceman.itemScaleTemp = itemScale;
        itemScale = 3;
        spacemanDimUpdate(spaceman);
        spaceman.x = canvas.width*0.9;
        spaceman.y = canvas.height - spaceman.height - 150;
        spacemanWest(spaceman);
        stationInside = true;
    }
}

function gettingOutStation(){
    if (stationInside){
        itemScale = spaceman.itemScaleTemp;
        spacemanDimUpdate(spaceman);
        spaceman.x = spaceman.xTemp;
        spaceman.y = spaceman.yTemp;
        spacemanWest(spaceman)
        stationInside = false;
        if(spaceman.mapActive){
            $('.map').removeClass('hide');          
        } else {
            $('.map').addClass('hide');   
        }
    }
}

function spacemanDimUpdate(spaceman){
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
                shoots.forEach(function(shoot){
                    shoot.y += rover.height*roverVelFac;
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
                shoots.forEach(function(shoot){
                    shoot.x -= rover.height*roverVelFac;
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
                shoots.forEach(function(shoot){
                    shoot.y -= rover.height*roverVelFac;
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
                shoots.forEach(function(shoot){
                    shoot.x += spaceman.height*spacemanVelFac;
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
                shoots.forEach(function(shoot){
                    shoot.y += rover.height*roverVelFac;
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
                shoots.forEach(function(shoot){
                    shoot.x -= rover.height*roverVelFac;
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
                shoots.forEach(function(shoot){
                    shoot.y -= rover.height*roverVelFac;
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
                shoots.forEach(function(shoot){
                    shoot.x += rover.height*roverVelFac;
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

//Key Control Functions
function keyControls1(e){
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
}

function keyControls2(){
    if (gameState === 'active'){
        if (charActive === 'spaceman'){
            //Spaceman 1
            if (keys[37] === true) spacemanWest(spaceman);
            if (keys[38] === true) spacemanNorth(spaceman);
            if (keys[39] === true) spacemanEast(spaceman);
            if (keys[40] === true) spacemanSouth(spaceman);
            //Spaceman 2
            if (keys[90] === true) spacemanWest(spaceman2);
            if (keys[83] === true) spacemanNorth(spaceman2);
            if (keys[67] === true) spacemanEast(spaceman2);
            if (keys[88] === true) spacemanSouth(spaceman2);
        } else if (charActive === 'rover'){
            if (keys[38] === true) moveForward(rover);
            if (keys[40] === true) moveBackward(rover);
            if (keys[68] === true) gettingOutRover();
        }
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
    shoots.forEach(function(shoot, indexShoot){
        if (shoot.x > canvas.width ||
            shoot.x < 0 ||
            shoot.y > canvas.height||
            shoot.y < 0){
                shoots.splice(indexShoot,1);
            }
        shoot.draw();
    });
}
