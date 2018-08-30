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
        this.image.src = '../images/MarsLandsCape.png';
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
        this.direction = 'N';
        this.image = new Image();
        this.image.src = '../images/RoverEast.png';
    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

class Enemy extends Item{
    constructor(x,y,width,height){
        super(x,y,width,height);
        this.direction = 'N';
        this.image = new Image();
        this.image.src = '../images/Enemy.png';
        this.direction = 'S';
    }
    draw(){
        if ((frames / 100) % 2 === 0){
            let direction = Math.pow(-1, Math.floor(Math.random()*10));
            this.x += Math.floor(Math.random()*this.width*0.5);
            this.y += Math.floor(Math.random()*this.height*0.3) * direction;
        }
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

class Astronaut{
    constructor(){

    }
    draw(){

    }
}

class Transbordador{
    constructor(){

    }
    draw(){

    }
}


class Station extends Item{
    constructor(x,y,width,height){
        super(x,y,width,height);
        this.image = new Image();
        this.image.src = '../images/MarsStation.png'
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


