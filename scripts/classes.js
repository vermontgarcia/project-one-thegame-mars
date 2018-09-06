//Classes definition

class Item{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

class Scenario extends Item{
    constructor(x,y,width,height,image){
        super(x,y,width,height)
        this.image = new Image();
        this.image.src = image;
        this.stations = [];
        this.enemies = [];
    } 
    draw (){
        //Main drawing
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

        //Map drawing
        mCtx.drawImage(this.image, 0, 0, map.width, map.height);
    }
}

class Rover extends Item{
    constructor(x,y,width,height){
        super(x,y,width,height);
        this.direction = 'E';
        this.image = new Image();
        this.image.src = './images/RoverEast.png';
        this.dischargeImage = new Image();
        this.dischargeImage.src = './images/discharge.png';
        this.saveDistanceFactor = 3;
        this.damage = 1;
        this.energy = 100;
        this.condition = 10000;
        }

    boundaries(){

    }

    collition(enemy){
        //console.log('testing');
        return (this.x < enemy.x + enemy.width) &&
            (this.x + this.width > enemy.x) &&
            (this.y + this.height*0.3 < enemy.y + enemy.height) &&
            (this.y + this.height*0.8 > enemy.y);
    }

    receiveDamage(enemy){
        this.condition -= enemy.damage;
        ctx.drawImage(this.dischargeImage, this.x - this.width/2, this.y - this.height/2, this.width*2, this.height*2);
        mCtx.drawImage(this.dischargeImage, (this.x - this.width - scenarios[scenarioActive].x) * scale, (this.y - this.height - scenarios[scenarioActive].y)*scale, this.width*2*scale, this.height*2*scale);
        //console.log('Rover ',this.condition);

    }

    draw(){
        //deepFactorRover = (rover.y - scenario.y)/scenario.height;
        roverDimUpdate();

        //Main drawing
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

        
        ctx.beginPath();
        ctx.moveTo(this.x,this.y+this.height*0.3)
        ctx.lineTo(this.x + this.width, this.y+this.height*0.3)
        ctx.lineTo(this.x + this.width, this.y+this.height*0.8);
        ctx.lineTo(this.x, this.y+this.height*0.8);
        ctx.lineTo(this.x, this.y+this.height*0.3);
        ctx.stroke();

        //Map drawing
        
        mCtx.drawImage(this.image, (this.x-this.width/2-scenarios[scenarioActive].x)*scale, (this.y-this.height/2-scenarios[scenarioActive].y)*scale, this.width*scale, this.height*scale);

        mCtx.beginPath();
        mCtx.strokeStyle = 'green';
        mCtx.arc((this.x-scenarios[scenarioActive].x)*scale, (this.y-scenarios[scenarioActive].y)*scale, Math.abs(this.width*.5*scale), 0, Math.PI*2, false)
        mCtx.stroke();
        mCtx.strokeStyle = 'black';

    }
}

class Enemy extends Item{
    constructor(x,y,width,height){
        super(x,y,width,height);
        this.direction = 'N';
        this.image = new Image();
        this.image.src = './images/Enemy2.png';
        this.damage = 1;
        this.health = 100;
    }

    receiveDamage(item, index){
        this.health -= item.damage;
        //console.log ('enemy ',index, 'health ', this.health)
        score.update(item.damage,0);
        if (this.health <= 0){
            scenarios[scenarioActive].enemies.splice(index,1);
            score.update(0,1);
        }
    }

    draw(direction, character){
        if ((frames / 10) % 2 === 0){
            var distanceCharacter = distance(this.x + this.width * 0.5, this.y + this.height * 0.5, character.x + character.width * 0.5, character.y + character.height * 0.5);
            
            if(distanceCharacter < character.height * character.saveDistanceFactor){
                let vel = 0.2;
                switch(direction){
                    case 'NW':
                        this.image.src = './images/Enemy.png';
                        this.x -= Math.floor(Math.random()*this.width*vel);
                        this.y -= Math.floor(Math.random()*this.width*vel);
                    break;
                    case 'NE':
                        this.image.src = './images/Enemy2.png';
                        this.x += Math.floor(Math.random()*this.width*vel);
                        this.y -= Math.floor(Math.random()*this.width*vel);
                    break;
                    case 'SW':
                        this.image.src = './images/Enemy.png';
                        this.x -= Math.floor(Math.random()*this.width*vel);
                        this.y += Math.floor(Math.random()*this.width*vel);
                    break;
                    case 'SE':
                        this.image.src = './images/Enemy2.png';
                        this.x += Math.floor(Math.random()*this.width*vel);
                        this.y += Math.floor(Math.random()*this.width*vel);
                    break;
                } 
            
            } else {    
                let vel = 0.05;

                if (Math.floor(Math.random()*2)===1){
                    //console.log('Direction')
                    switch(direction){
                        case 'NW':
                            this.image.src = './images/Enemy.png';
                            this.x -= Math.floor(Math.random()*this.width*vel);
                            this.y -= Math.floor(Math.random()*this.width*vel);
                        break;
                        case 'NE':
                            this.image.src = './images/Enemy2.png';
                            this.x += Math.floor(Math.random()*this.width*vel);
                            this.y -= Math.floor(Math.random()*this.width*vel);
                        break;
                        case 'SW':
                            this.image.src = './images/Enemy.png';
                            this.x -= Math.floor(Math.random()*this.width*vel);
                            this.y += Math.floor(Math.random()*this.width*vel);
                        break;
                        case 'SE':
                            this.image.src = './images/Enemy2.png';
                            this.x += Math.floor(Math.random()*this.width*vel);
                            this.y += Math.floor(Math.random()*this.width*vel);
                        break;
                    } 
                } else {
                    //console.log('No direction')
                    let direction = Math.pow(-1, Math.floor(Math.random()*3));
                    //console.log('direction', direction)
                    this.x -= Math.floor(Math.random()*this.width*vel)*direction;
                    direction = Math.pow(-1, Math.floor(Math.random()*3));
                    this.y -= Math.floor(Math.random()*this.width*vel)*direction;
                    if (this.y < (scenarios[scenarioActive].height*0.55)+scenarios[scenarioActive].y){
                        this.y+= 20;
                    }
                }
            }            
        }
        //Main drawing
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        //Temporal black rectangle
        ctx.beginPath();
        ctx.moveTo(this.x,this.y)
        ctx.lineTo(this.x + this.width, this.y)
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();

        //Map drawing
        mCtx.drawImage(this.image, (this.x-this.width/2-scenarios[scenarioActive].x)*scale, (this.y-this.height/2-scenarios[scenarioActive].y)*scale, this.width*scale, this.height*scale);
        //Red circle
        mCtx.beginPath();
        mCtx.strokeStyle = '#FF0000';
        mCtx.arc((this.x-scenarios[scenarioActive].x)*scale, (this.y-scenarios[scenarioActive].y)*scale, Math.abs(this.width*scale), 0, Math.PI*2, false)
        mCtx.stroke();
        mCtx.strokeStyle = '#000000';
    }
}

class Spaceman extends Item{
    constructor(x,y,width,height){
        super(x,y,width,height);
        this.direction = 'E';
        this.image = new Image();
        this.image.src = './images/SpacemanEast.png';
        this.dischargeImage = new Image();
        this.dischargeImage.src = './images/discharge.png';
        this.saveDistanceFactor = 5;
        this.damage = 1;
        this.energy = 100;
        this.oxigen = 100;
        this.health = 200;
    }

    collition(enemy){
        return (this.x+ this.width*0.2 < enemy.x + enemy.width) &&
            (this.x + this.width*0.8 > enemy.x) &&
            (this.y + this.height*0.1 < enemy.y + enemy.height) &&
            (this.y + this.height*0.9 > enemy.y);
    }

    receiveDamage(enemy){
        this.health -= enemy.damage;
        ctx.drawImage(this.dischargeImage, this.x - this.width/2, this.y - this.height/2, this.width*2, this.height*2);
        mCtx.drawImage(this.dischargeImage, (this.x - this.width - scenarios[scenarioActive].x) * scale, (this.y - this.height - scenarios[scenarioActive].y)*scale, this.width*2*scale, this.height*2*scale);
        if (this.health <= 0){
            gameOver();
        }

    }


    draw(){

        spacemanDimUpdate();

        //Main drawing
        if (characterActive === 'spaceman'){
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            //Temporal black rectangle
            ctx.beginPath();
            ctx.moveTo(this.x + this.width*0.2,this.y + this.height*0.1)
            ctx.lineTo(this.x + this.width*0.8, this.y + this.height*0.1)
            ctx.lineTo(this.x + this.width*0.8, this.y + this.height*0.9);
            ctx.lineTo(this.x + this.width*0.2, this.y + this.height*0.9);
            ctx.lineTo(this.x + this.width*0.2, this.y + this.height*0.1);
            ctx.stroke();
    
            //Map drawing
            mCtx.drawImage(this.image, (this.x-this.width/2-scenarios[scenarioActive].x)*scale, (this.y-this.height/2-scenarios[scenarioActive].y)*scale, this.width*scale, this.height*scale);
            //Green circle    
            mCtx.beginPath();
            mCtx.strokeStyle = 'green';
            mCtx.arc((this.x-scenarios[scenarioActive].x)*scale, (this.y-scenarios[scenarioActive].y)*scale, Math.abs(this.height*.5*scale), 0, Math.PI*2, false)
            mCtx.stroke();
            mCtx.strokeStyle = 'black';
        }

    }
}

class Transbordador extends Item{
    constructor(){

    }
    draw(){

    }
}

class Station extends Item{
    constructor(x,y,width,height){
        super(x,y,width,height);
        this.image = new Image();
        this.image.src = './images/MarsStation.png'
    }
    draw(){
        //Main drawing
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        //Map drawing
        mCtx.drawImage(this.image, (this.x-scenarios[scenarioActive].x)*scale, (this.y-scenarios[scenarioActive].y)*scale, this.width*scale, this.height*scale);
    }
}

class Map{
    constructor(){

    }
    draw(){

    }
}

class Visor{
    constructor(){

    }
}

class Score{
    constructor(){
        this.hiScore = 0;
        this.score = 0;
        this.enemies = 0;
    }

    update(points, enemies){
        this.score += points;
        if (this.hiScore < this.score) this.hiScore = this.score;
        this.enemies += enemies;
    }

    draw(){
        ctx.font = '45px serif';
        ctx.fillText('Hi Score ' + this.hiScore, 1600, 100);
        ctx.fillText('Score    ' + this.score, 1600, 150);
        ctx.fillText('Enemies  ' + this.enemies, 1600, 200);
    }
}