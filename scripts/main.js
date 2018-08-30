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

//Creating instances
var scenario = new Scenario(0,-canvas.height,canvas.width*2, canvas.height*2);
var rover = new Rover(canvas.width/2,canvas.height*.5,50,26);
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

function gameOver(){

}

function generateEnemies(){
    if (enemies.length > 19) return;
    if (frames % 1000 == 0 
        || frames % 700 == 0 
        || frames % 1700 == 0){
            let width = 10;
            let height = 30;
            let x = Math.floor(Math.random()*canvas.width)-width;
            let y = Math.floor(Math.random()*canvas.height)-height;
            let enemy = new Enemy(x,y,width,height)
            enemies.push(enemy);
        }
}

function drawEnemies (){
    enemies.forEach(function(enemy){
        enemy.draw();
    })
}


addEventListener('keydown', function(e){
    switch(e.keyCode){
        case 37:
            //W
            rover.image.src = '../images/RoverWest.png'
            if (rover.x > scenario.x + (scenario.width - scenario.width*0.25)
                || rover.x < scenario.x + (scenario.width - scenario.width*0.75)){
                    rover.x -=velocity;
            } else {
                scenario.x +=velocity;
                station1.x +=velocity;
                enemies.forEach(function(enemy){
                    enemy.x += velocity;
                });
            }
        break;
        case 38:
            //N
            rover.image.src = '../images/RoverNorth.png'
            scenario.y +=velocity;
            station1.y +=velocity;
            enemies.forEach(function(enemy){
                enemy.y += velocity;
            });
            rover.width = rover.width - 0.05;
            rover.height = rover.height - 0.05;
        break;
        case 39:
            //E
            rover.image.src = '../images/RoverEast.png'
            if (rover.x > scenario.x + (scenario.width - scenario.width*0.25)
                || rover.x < scenario.x + (scenario.width - scenario.width*0.75)){
                rover.x +=velocity;
            } else {
                scenario.x -=velocity;
                station1.x -=velocity;
                enemies.forEach(function(enemy){
                    enemy.x -= velocity;
                });
            }
        break;
        case 40:
            //S
            rover.image.src = '../images/RoverSouth.png'
            scenario.y -=velocity;
            station1.y -=velocity;
            enemies.forEach(function(enemy){
                enemy.y -= velocity;
            });
            rover.width = rover.width + 0.05;
            rover.height = rover.height + 0.05;
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
