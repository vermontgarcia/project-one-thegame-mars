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
        mCtx.drawImage(this.image, 0, 0, map.width, map.height);
    }
}

class Rover extends Item{
    constructor(x,y,width,height){
        super(x,y,width,height);
        this.direction = 'E';
        this.image = new Image();
        this.image.src = './images/RoverEast.png';
        this.damage = 10;
        this.energy = 100;
        this.condition = 100;
        }

    boundaries(){






        /*
        //Scenario North
        if (rover.y - scenario.y < scenario.y + scenario.height*0.53){  ///rover.y - rover.height/2 - velocity*2 < northBoundary
            rover.y +=1;
            console.log('Scenario Restriction')
            return true;            
        } 
        //Station
        //if (distance(this.x + this.width/2 ,this.y + this.height/2, station1.x + station1.width/2, station1.y+station1.height/2 )< station1.width/2){
        //    console.log('Station Restriction')
        //    return true;            
        //} 
        //Obstacles
        
        
        //No restrictions
        return false;
        */
    }

    draw(){
        //deepFactorRover = (rover.y - scenario.y)/scenario.height;
        roverDimUpdate();
        ctx.drawImage(this.image, this.x-this.width/2, this.y-this.height/2, this.width, this.height);
        
        //Map drawing
        
        mCtx.drawImage(this.image, (this.x-this.width/2-scenario.x)*scale, (this.y-this.height/2-scenario.y)*scale, this.width*scale, this.height*scale);

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
            var distanceCharacter = distance(this.x, this.y, rover.x, rover.y);
            
            if(distanceCharacter < rover.height * roverSDFactor){
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
                    //console.log('No dierection')
                    let direction = Math.pow(-1, Math.floor(Math.random()*3));
                    //console.log('direction', direction)
                    this.x -= Math.floor(Math.random()*this.width*vel)*direction;
                    direction = Math.pow(-1, Math.floor(Math.random()*3));
                    this.y -= Math.floor(Math.random()*this.width*vel)*direction;
                }
            }            
        }
        ctx.drawImage(this.image, this.x-this.width/2, this.y-this.height/2, this.width, this.height);
        mCtx.drawImage(this.image, (this.x-this.width/2-scenario.x)*scale, (this.y-this.height/2-scenario.y)*scale, this.width*scale, this.height*scale);
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
        mCtx.drawImage(this.image, (this.x-scenario.x)*scale, (this.y-scenario.y)*scale, this.width*scale, this.height*scale);
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