//window.onload = function() {

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
        ) return 'Movile';
        return 'PC';
    }

    //Game controling
    function intro(lang){
        let image = new Image();
        image.src = './images/Mars-featured-image.jpg';
        image.onload = function(){
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        }
        if (lang === ''){

            $('#controls').addClass('hide');
            $('#language').toggleClass('active');

            $('#eng-btn').hover(function() {
                $(this).css('cursor','pointer');
                $(this).addClass('hover');
                $(this).click(function(){
                    effects[0].stop();
                    effects[0].sound.currentTime = 0;
                    effects[0].play();
                    $(this).addClass('selection');
                    language = 'english'
                    $('#language').toggleClass('active');
                    setTimeout(function(){
                        $('#language').addClass('hide');
                        writeMars();
                    },1000);
                });
            }, function(){
                $(this).removeClass('hover');
            });

            $('#spa-btn').hover(function() {
                $(this).css('cursor','pointer');
                $(this).addClass('hover');
                $(this).click(function(){
                    effects[0].stop();
                    effects[0].sound.currentTime = 0;
                    effects[0].play();
                    $(this).addClass('selection');
                    language = 'spanish'
                    $('#language').toggleClass("active");
                    setTimeout(function(){
                        $('#language').attr("style", "display: none");
                        writeMars();
                    },1500);
                });
            }, function(){
                $(this).removeClass('hover');
            });
        } else {
            writeMars();
        }

        $('#1p-btn').hover(function(){
            $(this).css('cursor','pointer');
            $(this).addClass('hover');
            $(this).click(function(){
                //Code here
                effects[0].stop();
                effects[0].sound.currentTime = 0;
                effects[0].play();
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
                effects[0].stop();
                effects[0].sound.currentTime = 0;
                effects[0].play();
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
                effects[0].stop();
                effects[0].sound.currentTime = 0;
                effects[0].play();
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
                effects[0].stop();
                effects[0].sound.currentTime = 0;
                effects[0].play();
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
                effects[0].stop();
                effects[0].sound.currentTime = 0;
                effects[0].play();
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
                effects[0].stop();
                effects[0].sound.currentTime = 0;
                effects[0].play();
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
                effects[0].stop();
                effects[0].sound.currentTime = 0;
                effects[0].play();
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
                effects[0].stop();
                effects[0].sound.currentTime = 0;
                effects[0].play();
                $("#controls").attr("style", "display: none");
                //console.log(players,mode,difficulty);
                songs[0].stop();

                if (players === 2 && mode === 'survival'){
                    scenarioScale = 1;
                    if (difficulty === 'easy'){
                        enemiesQuantity = 40;
                        frame1 = 100;
                        frame2 = 180;
                        frame3 = 320;
                    } else if (difficulty === 'hard'){
                        enemiesQuantity = 80;
                        frame1 = 60;
                        frame2 = 130;
                        frame3 = 200;
                    } else if (difficulty === 'expert'){
                        enemiesQuantity = 120;
                        frame1 = 40;
                        frame2 = 70;
                        frame3 = 130;
                    }
                } else if (players === 1 && mode === 'survival'){
                    scenarioScale = 1;
                    if (difficulty === 'easy'){
                        enemiesQuantity = 40;
                        frame1 = 100;
                        frame2 = 180;
                        frame3 = 320;
                    } else if (difficulty === 'hard'){
                        enemiesQuantity = 60;
                        frame1 = 60;
                        frame2 = 130;
                        frame3 = 200;
                    } else if (difficulty === 'expert'){
                        enemiesQuantity = 80;
                        frame1 = 40;
                        frame2 = 70;
                        frame3 = 130;
                    }
                } else if (players === 1 && mode === 'mission'){
                    scenarioScale = 2;
                    if (difficulty === 'easy'){
                        enemiesQuantity = 30;
                        frame1 = 100;
                        frame2 = 180;
                        frame3 = 320;
                    } else if (difficulty === 'hard'){
                        enemiesQuantity = 60;
                        frame1 = 60;
                        frame2 = 130;
                        frame3 = 200;
                    } else if (difficulty === 'expert'){
                        enemiesQuantity = 90;
                        frame1 = 40;
                        frame2 = 70;
                        frame3 = 130;
                    }
                }
                createInstances();
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
            songs[0].play();
        },1000);
    }

    function enableStart(){
        if ($('#players').children().hasClass('selection')
            && $('#mode').children().hasClass('selection')
            && $('#difficulty').children().hasClass('selection')){
            //console.log('Ready');
            $('#start').removeClass('hide');
        } else {
            //console.log('Not Ready');
        }
    }


    var counter = 0;
    var counter2 = 0;

    function finishGame(){
        if (counter < 420) {
            scenarios[scenActive].spaceship[0].y -= 0.3;
            counter++;
        } else if (counter < 420 + 60) {
            
            scenarios[scenActive].spaceship[0].y += 1 ;
            scenarios[scenActive].spaceship[0].x += 2.8 + counter2;
            counter2++;
            counter++;
        } else if (counter < 420 + 60 + 120) {
            
            scenarios[scenActive].spaceship[0].y += 1 ;
            scenarios[scenActive].spaceship[0].x += 2.8 + counter2;
            counter2++;
            counter++;
        } else{
            pauseResumeGame();
            let image = new Image();
            image.src = './images/Mars-featured-image.jpg';
            let ship = new Image();
            ship.src = './images/Spaceship.png';

            frames = 0;

            let x = canvas.width*0.25;
            let y = canvas.height*0.5;
            let width = 20;
            let height = 13;

            interval = setInterval(function(){

                if (frames < 360){
                    width +=1*0.5;
                    height += 0.57*0.5;
                } else if (frames < 360 + 240){
                    x+=1.5;
                    y+=0.1;
                } else if (frames < 360 + 240 + 240){
                    x+=1.5;
                    y-=0.1;
                } else if (frames < 360 + 240 + 240 + 300){
                    x+=2.5;
                    y-=0.3;
                    width +=2*0.5;
                    height += 1.14*0.5;
                } else {
                    songs[0].stop();
                    clearInterval(interval);            
                    writeMars();
                }

                frames++;
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                ctx.font = '900 250px arial';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                ctx.fillText('MARS', canvas.width*0.5, canvas.height*0.65);

                ctx.drawImage(ship, x, y, width, height);
                
            },1000/60);



            image.onload = function(){
            }

        }
    
        
    }

    function startGame(){
        if(isMobile==='mobile'){
            $('#mobile-controls').toggleClass('hide');
            $('#mobile-controls').toggleClass('active');
            $('#mobile-controls').attr('style', 'display: flex');
        }

        if(players === 2){
            if (mode === 'mision'){
                $('.container').addClass('halfHeight');
                $('#2').removeClass('hide');
                $('#map').addClass('halfHeightMap');
                $('#map2').addClass('halfHeightMap');
            } else if (mode === 'survival'){
                $('.container').addClass('fullHeight');
                $('#map').addClass('fullHeightMap');
                $('#map2').addClass('fullHeightMap');
            }
        } else if (players === 1) {
            $('.container').addClass('fullHeight');
            $('#map').addClass('fullHeightMap');
            $('#map2').addClass('fullHeightMap');
        }
        gameState = 'active';
        songs[1].play();
        
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
                //mCtx2.clearRect(0, 0, map.width, map.height);
                //mCtx2.lineWidth = 3;
                //Drawing main canvas
                scenarios[scenActive].draw();
                scenarios[scenActive].stations[0].draw();
                if (scenActive === 0){
                    scenarios[scenActive].spaceship[0].draw();
                    }
                //Drawing map canvas
                mCtx.beginPath();
                mCtx.moveTo(map.width/2,map.height/2-10);
                mCtx.lineTo(map.width/2,map.height/2+10)
                mCtx.moveTo(map.width/2-10,map.height/2);
                mCtx.lineTo(map.width/2+10,map.height/2)
                mCtx.stroke();

                //mCtx2.beginPath();
                //mCtx2.moveTo(map.width/2,map.height/2-10);
                //mCtx2.lineTo(map.width/2,map.height/2+10)
                //mCtx2.moveTo(map.width/2-10,map.height/2);
                //mCtx2.lineTo(map.width/2+10,map.height/2)
                //mCtx2.stroke();
                //Drawing main canvas
                generateEnemies();
                rover.draw();
                spaceman.draw();
                if (players === 2 && mode === 'survival'){
                    spaceman2.draw();
                }
                drawEnemies();
                drawShoots();
                score.draw();
                statusCharacter.draw(spaceman.health, rover.condition, scenarios[0].spaceship[0].condition);
        
                //ctx.fillText('Scenario Active ' + scenActive, 100, 100);

            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                interiors[2].draw();
                spaceman.draw();
            }
            if (winner){
                finishGame();
            }
        },1000/60);
    }

    function gameOver(){
        songs[1].stop();
        songs[2].stop();
        songs[4].sound.currentTime=2;
        songs[4].play();
        //console.log('game Over')
        gameState = 'gameOver';
        //console.log(interval);
        clearInterval(interval);
        $('#game-over').removeClass('hide');
        $('#game-over').toggleClass("active");
        $('#restart-btn').hover(function() {
            $(this).css('cursor','pointer');
            $(this).addClass('hover');
            $(this).click(function(){
                effects[0].stop();
                effects[0].sound.currentTime = 0;
                effects[0].play();
                $("#game-over").toggleClass('active');
                $("#game-over").addClass('hide');
                reStartGame();
            });
        }, function(){
            $(this).removeClass('hover');
        });
        $('#menu-btn').hover(function() {
            $(this).css('cursor','pointer');
            $(this).addClass('hover');
            $(this).click(function(){
                effects[0].stop();
                effects[0].sound.currentTime = 0;
                effects[0].play();
                $("#game-over").toggleClass('active');
                $("#game-over").addClass('hide');
                songs[4].stop();
                intro(language);
                //$("#controls").attr("style", "display: flex");
                //setTimeout(function(){
                //    $("#controls").addClass("active");
                //    songs[0].play();
                //},1000);
                //
            });
        }, function(){
            $(this).removeClass('hover');
        });
    }

    function reStartGame(){
        songs[4].stop();
        //console.log('restarting....')
        $('#game-over').toggleClass("active");
        setTimeout(function(){
            $('#game-over').addClass('hide');
        },500);
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

    //Audio Songs
    function generateAudio(){
        for (i=0; i<audioSongs.length; i++){
            let song = new Sound(audioSongs[i]);
            songs.push(song);
        }
    }
    
    function generateEffects(){
        for (i=0; i<audioEffects.length; i++){
            let effect = new Effect(audioEffects[i]);
            effects.push(effect);
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

    function generateSpaceship(){
        let x = scenarios[scenActive].x + scenarios[scenActive].width*0.1;
        let y = scenarios[scenActive].y + scenarios[scenActive].height*0.5;
        let width = spaceshipWidth*scenarioScale;
        let height = spaceshipHeight*scenarioScale;    
        
        for (i = 0; i < 1; i++){
            let spaceship = new Spaceship(x, y, width, height);
            scenarios[i].spaceship.push(spaceship);
        }
    }

    function generateSpare(){
        console.log('generating')
        for (i=0; i<spaceshipImages.length; i++){
            let image = new Image();
            image.src = spaceshipImages[i];
            spaceshipSpare.push(image);
        }
    }

    function fixShip(){
        if (fixesShip < spaceshipImages.length){
            effects[2].stop();
            effects[2].sound.currentTime = 0;
            effects[2].play();
            scenarios[0].spaceship[0].condition += 40;
            scenarios[scenActive].spaceship[0].images.push(spaceshipSpare[fixesShip]);
            score.update(1500,0);
            fixesShip++;
            if (fixesShip === spaceshipImages.length){
                console.log('You win');
                songs[1].stop();
                songs[0].play();
                winner = true;
                charActive = 'rover';
                finishGame();
            }
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
        if (frames % frame1 === 0 || frames % frame2 === 0 || frames % frame3 === 0){
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
        if (players === 1){
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
        } else if (players === 2 && mode === 'survival'){
            scenarios[scenActive].enemies.forEach(function(enemy, indexEnemy){
                deepFactorEnemie = (enemy.y - scenarios[scenActive].y)/scenarios[scenActive].height;
                enemy.width = enemyWidth * itemScale * deepFactorEnemie;
                enemy.height = enemyHeight * itemScale * deepFactorEnemie;
                if (charActive === 'spaceman'){
                    charActive = 'spaceman2'
                    enemy.draw(enemyDirection(enemy,character[charActive]),character[charActive]);
                    if(character[charActive].collition(enemy)){
                        character[charActive].receiveDamage(enemy);
                        enemy.receiveDamage(character[charActive],indexEnemy);
                    }
                } else {
                    charActive = 'spaceman'
                    enemy.draw(enemyDirection(enemy,character[charActive]),character[charActive]);
                    if(character[charActive].collition(enemy)){
                        character[charActive].receiveDamage(enemy);
                        enemy.receiveDamage(character[charActive],indexEnemy);
                    }
                }
                shoots.forEach(function(shoot,indexShoot){
                    if(shoot.collition(enemy)){
                        enemy.receiveDamage(shoot,indexEnemy,indexShoot);
                    }
                });
            });

        }
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
        if (spacemanControl >= 5) spacemanControl = 0;
        //console.log(spacemanControl,spacemanN[spacemanControl]);
        if (Math.floor(frames/2) % 3 === 0 ){
            spacemanControl+=1;
            spaceman.image.src = spacemanN[spacemanControl];
        } else {
            spaceman.image.src = spacemanN[spacemanControl];
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
                if (scenActive === 0){
                    scenarios[scenActive].spaceship[0].y +=spaceman.height*spacemanVelFac;
                }
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

    var spacemanControl = 0;

    function spacemanEast(spaceman){
        spaceman.direction = 'E';
        if (spacemanControl >= 9) spacemanControl = 0;
        //console.log(spacemanControl,spacemanE[spacemanControl]);
        if (Math.floor(frames/2) % 3 === 0 ){
            spacemanControl+=1;
            spaceman.image.src = spacemanE[spacemanControl];
        } else {
            spaceman.image.src = spacemanE[spacemanControl];
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
                if (scenActive === 0){
                    scenarios[scenActive].spaceship[0].x -=spaceman.height*spacemanVelFac;
                }
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
        if (spacemanControl >= 5) spacemanControl = 0;
        //console.log(spacemanControl,spacemanS[spacemanControl]);
        if (Math.floor(frames/2) % 3 === 0 ){
            spacemanControl+=1;
            spaceman.image.src = spacemanS[spacemanControl];
        } else {
            spaceman.image.src = spacemanS[spacemanControl];
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
                    if (scenActive === 0){
                        scenarios[scenActive].spaceship[0].y -=spaceman.height*spacemanVelFac;
                    }
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
        if (spacemanControl >= 9) spacemanControl = 0;
        //console.log(spacemanControl,spacemanW[spacemanControl]);
        if (Math.floor(frames/2) % 3 === 0 ){
            spacemanControl+=1;
            spaceman.image.src = spacemanW[spacemanControl];
        } else {
            spaceman.image.src = spacemanW[spacemanControl];
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
                if (scenActive === 0){
                    scenarios[scenActive].spaceship[0].x +=spaceman.height*spacemanVelFac;
                }
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
        if (rover.condition > 0){
            let x1 = spaceman.x + spaceman.width*0.5;
            let y1 = spaceman.y;
            let x2 = rover.x + rover.width*0.8;
            let y2 = rover.y + rover.height * 0.2;
            if (distance(x1, y1, x2, y2) <= spaceman.width){
                charActive = 'rover';
            }
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
            if (mode === 'mission'){
                songs[1].stop();
            } else {
                songs[2].stop();
            }
            songs[3].play();
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
            songs[3].stop();
            if (mode === 'mission'){
                songs[1].play();
            } else {
                songs[2].play();
            }
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
                if (Math.floor(frames/2) % 3 === 0 ){
                    rover.image.src = './images/RoverNorth2.png';
                    rover.dust.src = './images/Dust1.png';
                } else {
                    rover.image.src = './images/RoverNorth.png';
                    rover.dust.src = './images/Dust2.png';
                }
                if (rover.y - scenarios[scenActive].y > (1-(canvas.height*0.5/scenarios[scenActive].height))*scenarios[scenActive].height
                    || rover.y - scenarios[scenActive].y < canvas.height/2){
                    //Scenario fixed, Character moving
                    rover.y -= rover.height*roverVelFac;
                } else {
                    //Character fixed, Scenario moving
                    scenarios[scenActive].y +=rover.height*roverVelFac;
                    scenarios[scenActive].stations[0].y +=rover.height*roverVelFac;
                    if (scenActive === 0){
                        scenarios[scenActive].spaceship[0].y +=rover.height*roverVelFac;
                    }
                    scenarios[scenActive].enemies.forEach(function(enemy){
                        enemy.y += rover.height*roverVelFac;
                    });
                    shoots.forEach(function(shoot){
                        shoot.y += rover.height*roverVelFac;
                    });
                }
            break;
            case "E":
                if (Math.floor(frames/2) % 3 === 0 ){
                    rover.image.src = './images/RoverEast2.png';
                    rover.dust.src = './images/Dust1.png';
                    ctx.drawImage(rover.dust, rover.x-20, rover.y+10+rover.height*0.5, rover.width+20, rover.height*0.5);
                } else {
                    rover.image.src = './images/RoverEast.png';
                    rover.dust.src = './images/Dust2.png';
                    ctx.drawImage(rover.dust, rover.x-20, rover.y+10+rover.height*0.5, rover.width+20, rover.height*0.5);
                }
                if (rover.x - scenarios[scenActive].x < canvas.width/2 
                    || rover.x - scenarios[scenActive].x > (1-(canvas.width*0.5/scenarios[scenActive].width))*scenarios[scenActive].width){
                    //Scenario fixed, Character moving
                    rover.x +=rover.height*roverVelFac;
                } else {
                    //Character fixed, Scenario moving
                    scenarios[scenActive].x -=rover.height*roverVelFac;
                    scenarios[scenActive].stations[0].x -=rover.height*roverVelFac;
                    if (scenActive === 0){
                        scenarios[scenActive].spaceship[0].x -=rover.height*roverVelFac;
                    }
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
                if (Math.floor(frames/2) % 3 === 0 ){
                    rover.image.src = './images/RoverSouth2.png';
                    rover.dust.src = './images/Dust1.png';
                    ctx.drawImage(rover.dust, rover.x-20, rover.y+10+rover.height*0.5, rover.width+20, rover.height*0.5);
                } else {
                    rover.image.src = './images/RoverSouth.png';
                    rover.dust.src = './images/Dust2.png';
                    ctx.drawImage(rover.dust, rover.x-20, rover.y+10+rover.height*0.5, rover.width+20, rover.height*0.5);
                }
                if (rover.y - scenarios[scenActive].y > (1-(canvas.height*0.5/scenarios[scenActive].height))*scenarios[scenActive].height
                    || rover.y - scenarios[scenActive].y < canvas.height/2){
                    //Scenario fixed, Character moving
                    rover.y +=rover.height*roverVelFac;
                } else {
                    //Character fixed, Scenario moving
                    scenarios[scenActive].y -= rover.height*roverVelFac;
                    scenarios[scenActive].stations[0].y -= rover.height*roverVelFac;
                    if (scenActive === 0){
                        scenarios[scenActive].spaceship[0].y -=rover.height*roverVelFac;
                    }
                    scenarios[scenActive].enemies.forEach(function(enemy){
                        enemy.y -= rover.height*roverVelFac;
                    });
                    shoots.forEach(function(shoot){
                        shoot.y -= rover.height*roverVelFac;
                    });
                }
            break;
            case "W":
                if (Math.floor(frames/2) % 3 === 0 ){
                    rover.image.src = './images/RoverWest2.png';
                    rover.dust.src = './images/Dust1.png';
                    ctx.drawImage(rover.dust, rover.x-20, rover.y+10+rover.height*0.5, rover.width+20, rover.height*0.5);
                } else {
                    rover.image.src = './images/RoverWest.png';
                    rover.dust.src = './images/Dust2.png';
                    ctx.drawImage(rover.dust, rover.x-20, rover.y+10+rover.height*0.5, rover.width+20, rover.height*0.5);
                }
                if (rover.x - scenarios[scenActive].x < canvas.width/2 
                    || rover.x - scenarios[scenActive].x > (1-(canvas.width*0.5/scenarios[scenActive].width))*scenarios[scenActive].width){
                    //Scenario fixed, Character moving
                    rover.x -=rover.height*roverVelFac;
                } else {
                    //Character fixed, Scenario moving
                    scenarios[scenActive].x +=rover.height*roverVelFac;
                    scenarios[scenActive].stations[0].x +=rover.height*roverVelFac;
                    if (scenActive === 0){
                        scenarios[scenActive].spaceship[0].x +=rover.height*roverVelFac;
                    }
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
                if (Math.floor(frames/2) % 3 === 0 ){
                    rover.image.src = './images/RoverSouth2.png';
                    rover.dust.src = './images/Dust1.png';
                    ctx.drawImage(rover.dust, rover.x-20, rover.y+10+rover.height*0.5, rover.width+20, rover.height*0.5);
                } else {
                    rover.image.src = './images/RoverSouth.png';
                    rover.dust.src = './images/Dust2.png';
                    ctx.drawImage(rover.dust, rover.x-20, rover.y+10+rover.height*0.5, rover.width+20, rover.height*0.5);
                }
                if (rover.y - scenarios[scenActive].y > (1-(canvas.height*0.5/scenarios[scenActive].height))*scenarios[scenActive].height
                    || rover.y - scenarios[scenActive].y < canvas.height/2){
                    //Scenario fixed, Character moving
                    rover.y -=rover.height*roverVelFac;
                } else {
                    //Character fixed, Scenario moving
                    scenarios[scenActive].y +=rover.height*roverVelFac;
                    scenarios[scenActive].stations[0].y +=rover.height*roverVelFac;
                    if (scenActive === 0){
                        scenarios[scenActive].spaceship[0].y +=rover.height*roverVelFac;
                    }
                    scenarios[scenActive].enemies.forEach(function(enemy){
                        enemy.y += rover.height*roverVelFac;
                    });
                    shoots.forEach(function(shoot){
                        shoot.y += rover.height*roverVelFac;
                    });
                }
                break;
            case "W":
                if (Math.floor(frames/2) % 3 === 0 ){
                    rover.image.src = './images/RoverWest2.png';
                    rover.dust.src = './images/Dust1.png';
                    ctx.drawImage(rover.dust, rover.x-20, rover.y+10+rover.height*0.5, rover.width+20, rover.height*0.5);
                } else {
                    rover.image.src = './images/RoverWest.png';
                    rover.dust.src = './images/Dust2.png';
                    ctx.drawImage(rover.dust, rover.x-20, rover.y+10+rover.height*0.5, rover.width+20, rover.height*0.5);
                }
                if (rover.x - scenarios[scenActive].x < canvas.width/2 
                    || rover.x - scenarios[scenActive].x > (1-(canvas.width*0.5/scenarios[scenActive].width))*scenarios[scenActive].width){
                    //Scenario fixed, Character moving
                    rover.x +=rover.height*roverVelFac;
                } else {
                    //Character fixed, Scenario moving
                    scenarios[scenActive].x -=rover.height*roverVelFac;
                    scenarios[scenActive].stations[0].x -=rover.height*roverVelFac;
                    if (scenActive === 0){
                        scenarios[scenActive].spaceship[0].x -=rover.height*roverVelFac;
                    }
                    scenarios[scenActive].enemies.forEach(function(enemy){
                        enemy.x -= rover.height*roverVelFac;
                    });
                    shoots.forEach(function(shoot){
                        shoot.x -= rover.height*roverVelFac;
                    });
                }
                break;
            case "N":
                if (Math.floor(frames/2) % 3 === 0 ){
                    rover.image.src = './images/RoverNorth2.png';
                    rover.dust.src = './images/Dust1.png';
                    ctx.drawImage(rover.dust, rover.x-20, rover.y+10+rover.height*0.5, rover.width+20, rover.height*0.5);
                } else {
                    rover.image.src = './images/RoverNorth.png';
                    rover.dust.src = './images/Dust2.png';
                    ctx.drawImage(rover.dust, rover.x-20, rover.y+10+rover.height*0.5, rover.width+20, rover.height*0.5);
                }
                if (rover.y - scenarios[scenActive].y > (1-(canvas.height*0.5/scenarios[scenActive].height))*scenarios[scenActive].height 
                    || rover.y - scenarios[scenActive].y < canvas.height/2){
                    //Scenario fixed, Character moving
                    rover.y +=rover.height*roverVelFac;
                } else {
                    //Character fixed, Scenario moving
                    scenarios[scenActive].y -=rover.height*roverVelFac;
                    scenarios[scenActive].stations[0].y -=rover.height*roverVelFac;
                    if (scenActive === 0){
                        scenarios[scenActive].spaceship[0].y -=rover.height*roverVelFac;
                    }
                    scenarios[scenActive].enemies.forEach(function(enemy){
                        enemy.y -= rover.height*roverVelFac;
                    });
                    shoots.forEach(function(shoot){
                        shoot.y -= rover.height*roverVelFac;
                    });
                }
            break;
            case "E":
                if (Math.floor(frames/2) % 3 === 0 ){
                    rover.image.src = './images/RoverEast2.png';
                    rover.dust.src = './images/Dust1.png';
                    ctx.drawImage(rover.dust, rover.x-20, rover.y+10+rover.height*0.5, rover.width+20, rover.height*0.5);
                } else {
                    rover.image.src = './images/RoverEast.png';
                    rover.dust.src = './images/Dust2.png';
                    ctx.drawImage(rover.dust, rover.x-20, rover.y+10+rover.height*0.5, rover.width+20, rover.height*0.5);
                }
                if (rover.x - scenarios[scenActive].x < canvas.width/2 
                    || rover.x - scenarios[scenActive].x > (1-(canvas.width*0.5/scenarios[scenActive].width))*scenarios[scenActive].width){
                    //Scenario fixed, Character moving
                    rover.x -=rover.height*roverVelFac;
                } else {
                    //Character fixed, Scenario moving
                    scenarios[scenActive].x +=rover.height*roverVelFac;
                    scenarios[scenActive].stations[0].x +=rover.height*roverVelFac;
                    if (scenActive === 0){
                        scenarios[scenActive].spaceship[0].x +=rover.height*roverVelFac;
                    }
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
            if(e.keyCode === 32) toggleDirections();
        } else if (gameState === 'active'){
            if(e.keyCode === 13) pauseResumeGame();
            if(e.keyCode === 32) toggleDirections();
            if(charActive === 'spaceman'){
                if(e.keyCode === 17) createShoots(spaceman);
                if(e.keyCode === 73) gettingInStation();
                if(e.keyCode === 77) toggleMap();
                if(e.keyCode === 79) gettingOutStation();
                if(e.keyCode === 85) gettingInRover();
                if(e.keyCode === 70) fixShip();
            }
            if(charActive === 'rover'){
                if (rover.condition <= 0) charActive = 'spaceman';
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
                if (rover.condition <= 0) charActive = 'spaceman';
                if (keys[38] === true) moveForward(rover);
                if (keys[40] === true) moveBackward(rover);
                if (keys[68] === true) gettingOutRover();
            }
        }
    }

    function mobileControlsRigth(){
        if (gameState === 'active'){
            if (charActive === 'spaceman'){
                //Spaceman 1
                $('#up').click(function(){
                    //console.log('up');
                    spacemanNorth(spaceman);
                });
                $('#left').click(function(){
                    //console.log('left');
                    spacemanWest(spaceman);
                });
                $('#rigth').click(function(){
                    //console.log('rigth');
                    spacemanEast(spaceman);
                });
                $('#down').click(function(){
                    //console.log('down');
                    spacemanSouth(spaceman);
                });
                //Spaceman 2
            } else if (charActive === 'rover'){
                if (rover.condition <= 0) charActive = 'spaceman';
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
        effects[1].stop();
        effects[1].sound.currentTime = 0;
        effects[1].play();
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
//}