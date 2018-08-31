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
var scenario = new Scenario(0,-canvas.height,canvas.width*2, canvas.height*2);
var rover = new Rover((canvas.width/(2*scale)),(canvas.height/(2*scale)),100,54);
var station1 = new Station((canvas.width*2)*0.85,50,100,30);


//Defining auxiliar functions

function startGame(){
    ctx.scale(scale,scale);
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


addEventListener('keydown', function(e){
    switch(e.keyCode){
        case 37:
            //W
            rover.image.src = '../images/RoverWest.png'
            console.log(scale)
            if (rover.x > scenario.x + (scenario.width - scenario.width*(1/(4*scale))) //0.25
                || rover.x < scenario.x + (scenario.width - scenario.width*(3/(4*scale)))){  //0.75
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
        break;
        case 38:
            //N
            rover.image.src = '../images/RoverNorth.png'
            if (rover.y > scenario.y + (scenario.height - scenario.height*(1/(4*scale)))
                || rover.y < scenario.y + (scenario.height - scenario.height*(3/(4*scale)))){
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
        break;
        case 39:
            //E
            rover.image.src = '../images/RoverEast.png'
            if (rover.x > scenario.x + (scenario.width - scenario.width*(1/(4*scale)))
                || rover.x < scenario.x + (scenario.width - scenario.width*(3/(4*scale)))){
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
        break;
        case 40:
            //S
            rover.image.src = '../images/RoverSouth.png'
            if (rover.y > scenario.y + (scenario.height - scenario.height*(1/(4*scale)))
                || rover.y < scenario.y + (scenario.height - scenario.height*(3/(4*scale)))){
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
