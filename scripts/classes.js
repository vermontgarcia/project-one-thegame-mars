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
    constructor(x,y,width,height){
        super(x,y,width,height)
        this.image = new Image();
        this.image.src = './images/MarsLandsCape.png';
    } 
    draw (){
        //this.x--;
        //if(this.x < -canvas.width) this.x = 0;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        //ctx.drawImage(this.image, this.x+this.width, this.y, this.width, this.height);
    }
}

class Rover extends Item{
    constructor(x,y,width,height){
        super(x,y,width,height);
        this.direction = 'E';
        this.image = new Image();
        this.image.src = './images/RoverEast.png';
        this.damage = 10;
    }
    draw(){
        //deepFactorRover = (rover.y - scenario.y)/scenario.height;
        ctx.drawImage(this.image, this.x-this.width/2, this.y-this.height/2, this.width, this.height);
    }
}

class Enemy extends Item{
    constructor(x,y,width,height){
        super(x,y,width,height);
        this.direction = 'N';
        this.image = new Image();
        this.image.src = './images/Enemy2.png';
    }
    draw(direction){
        if ((frames / 10) % 2 === 0){
            //let direction = Math.pow(-1, Math.floor(Math.random()*10));
            
            let vel=0.1;
            switch(direction){
                case 'NW':
                    this.image.src = './images/Enemy.png';
                    this.x -= Math.floor(Math.random()*this.height*vel);
                    this.y -= Math.floor(Math.random()*this.height*vel);
                break;
                case 'NE':
                    this.image.src = './images/Enemy2.png';
                    this.x += Math.floor(Math.random()*this.height*vel);
                    this.y -= Math.floor(Math.random()*this.height*vel);
                break;
                case 'SW':
                    this.image.src = './images/Enemy.png';
                    this.x -= Math.floor(Math.random()*this.height*vel);
                    this.y += Math.floor(Math.random()*this.height*vel);
                break;
                case 'SE':
                    this.image.src = './images/Enemy2.png';
                    this.x += Math.floor(Math.random()*this.height*vel);
                    this.y += Math.floor(Math.random()*this.height*vel);
                break;
            }            
        }
        ctx.drawImage(this.image, this.x-this.width/2, this.y-this.height/2, this.width, this.height);
    }
}

class Astronaut extends Item{
    constructor(){

    }
    draw(){

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
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
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