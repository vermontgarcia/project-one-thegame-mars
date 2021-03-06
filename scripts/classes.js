//window.onload = function() {
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
            this.spaceship = [];
        } 
        draw (){
            //Main drawing
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            //ctx2.drawImage(this.image, this.x, this.y, this.width, this.height);
            //Map drawing
            mCtx.drawImage(this.image, 0, 0, map.width, map.height);
            //nCtx2.drawImage(this.image, 0, 0, map.width, map.height);
        }
    }

    class Spare extends Item{
        constructor(x,y,width,height,image){
            super(x,y,width,height)
            this.image = new Image();
            this.image.src = image;
        }

        draw(){
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
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
            this.saveDistanceFactor = 8;
            this.damage = 10;
            this.energy = 100;
            this.condition = 200;
            this.dust = new Image();
            this.dust.src = './images/Dust1.png';
            this.moving = false;
            }

        boundaries(){

        }

        collition(enemy){
            //Collition to enemy
            return (this.x < enemy.x + enemy.width) &&
                (this.x + this.width > enemy.x) &&
                (this.y + this.height*0.3 < enemy.y + enemy.height) &&
                (this.y + this.height*0.8 > enemy.y);
        }

        receiveDamage(enemy){
            if (this.condition > 0){
                this.condition -= enemy.damage;
            }
            ctx.drawImage(this.dischargeImage, this.x - this.width/2, this.y - this.height/2, this.width*2, this.height*2);
            mCtx.drawImage(this.dischargeImage, (this.x - this.width - scenarios[scenActive].x) * scale, (this.y - this.height - scenarios[scenActive].y)*scale, this.width*2*scale, this.height*2*scale);
        }

        draw(){
            roverDimUpdate();

            //Main drawing
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            if (charActive === 'rover' && (keys[38] || keys[40])){
                ctx.drawImage(rover.dust, rover.x-40, rover.y-35+rover.height, rover.width+80, rover.height*0.25);
            }
            //ctx2.drawImage(this.image, this.x, this.y, this.width, this.height);
            //Temporal black rectangle
            //ctx.beginPath();
            //ctx.moveTo(this.x,this.y+this.height*0.3)
            //ctx.lineTo(this.x + this.width, this.y+this.height*0.3)
            //ctx.lineTo(this.x + this.width, this.y+this.height*0.8);
            //ctx.lineTo(this.x, this.y+this.height*0.8);
            //ctx.lineTo(this.x, this.y+this.height*0.3);
            //ctx.stroke();
            //Map drawing
            mCtx.drawImage(this.image, (this.x-this.width/2-scenarios[scenActive].x)*scale, (this.y-this.height/2-scenarios[scenActive].y)*scale, this.width*scale, this.height*scale);
            //nCtx2.drawImage(this.image, (this.x-this.width/2-scenarios[scenActive].x)*scale, (this.y-this.height/2-scenarios[scenActive].y)*scale, this.width*scale, this.height*scale);
            //Green circle
            mCtx.beginPath();
            mCtx.strokeStyle = 'green';
            mCtx.arc((this.x-scenarios[scenActive].x)*scale, (this.y-scenarios[scenActive].y)*scale, Math.abs(this.width*.5*scale), 0, Math.PI*2, false)
            mCtx.stroke();
            mCtx.strokeStyle = 'black';
            
            //nCtx2.beginPath();
            //nCtx2.strokeStyle = 'green';
            //nCtx2.arc((this.x-scenarios[scenActive].x)*scale, (this.y-scenarios[scenActive].y)*scale, Math.abs(this.width*.5*scale), 0, Math.PI*2, false)
            //nCtx2.stroke();
            //nCtx2.strokeStyle = 'black';
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

        receiveDamage(item, indexEnemy, indexShoot){
            if (charActive === 'rover'){
                this.health -= item.damage*2;
            } else {
                this.health -= item.damage;
            }
            shoots.splice(indexShoot,1);
            score.update(item.damage,0);
            if (this.health <= 0){
                scenarios[scenActive].enemies.splice(indexEnemy,1);
                score.update(0,1);
            }
        }

        draw(direction, character){
            if ((frames/3 ) % 2 === 0){
                var distanceCharacter = distance(this.x + this.width * 0.5, this.y + this.height * 0.5, character.x + character.width * 0.5, character.y + character.height * 0.5);
                if(distanceCharacter < character.height * character.saveDistanceFactor){
                    let vel = 0.3;
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
                        if (this.y < (scenarios[scenActive].height*0.55)+scenarios[scenActive].y){
                            this.y+= 20;
                        }
                    }
                }            
            }
            //Main drawing
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            //ctx2.drawImage(this.image, this.x, this.y, this.width, this.height);
            //Temporal black rectangle
            //ctx.beginPath();
            //ctx.moveTo(this.x,this.y)
            //ctx.lineTo(this.x + this.width, this.y)
            //ctx.lineTo(this.x + this.width, this.y + this.height);
            //ctx.lineTo(this.x, this.y + this.height);
            //ctx.lineTo(this.x, this.y);
            //ctx.stroke();
            //Map drawing
            mCtx.drawImage(this.image, (this.x-this.width/2-scenarios[scenActive].x)*scale, (this.y-this.height/2-scenarios[scenActive].y)*scale, this.width*scale, this.height*scale);
            //nCtx2.drawImage(this.image, (this.x-this.width/2-scenarios[scenActive].x)*scale, (this.y-this.height/2-scenarios[scenActive].y)*scale, this.width*scale, this.height*scale);
            //Red circle
            mCtx.beginPath();
            mCtx.strokeStyle = '#FF0000';
            mCtx.arc((this.x-scenarios[scenActive].x)*scale, (this.y-scenarios[scenActive].y)*scale, Math.abs(this.width*scale), 0, Math.PI*2, false)
            mCtx.stroke();
            mCtx.strokeStyle = '#000000';

            //nCtx2.beginPath();
            //nCtx2.strokeStyle = '#FF0000';
            //nCtx2.arc((this.x-scenarios[scenActive].x)*scale, (this.y-scenarios[scenActive].y)*scale, Math.abs(this.width*scale), 0, Math.PI*2, false)
            //nCtx2.stroke();
            //nCtx2.strokeStyle = '#000000';
        }
    }

    class Spaceman extends Item{
        constructor(x,y,width,height){
            super(x,y,width,height);
            this.xTemp = 0;
            this.yTemp = 0;
            this.itemScaleTemp = itemScale;
            this.mapActive = false;
            this.direction = 'E';
            this.image = new Image();
            this.image.src = './images/SpacemanE1.png';
            this.dischargeImage = new Image();
            this.dischargeImage.src = './images/discharge.png';
            this.saveDistanceFactor = 5;
            this.weapons = [];
            this.shields = [];
            this.damage = 5;
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
            mCtx.drawImage(this.dischargeImage, (this.x - this.width - scenarios[scenActive].x) * scale, (this.y - this.height - scenarios[scenActive].y)*scale, this.width*2*scale, this.height*2*scale);
            //ctx2.drawImage(this.dischargeImage, this.x - this.width/2, this.y - this.height/2, this.width*2, this.height*2);
            //nCtx2.drawImage(this.dischargeImage, (this.x - this.width - scenarios[scenActive].x) * scale, (this.y - this.height - scenarios[scenActive].y)*scale, this.width*2*scale, this.height*2*scale);
            if (this.health <= 0){
                gameOver();
            }

        }

        draw(){
            spacemanDimUpdate(spaceman);
            spacemanDimUpdate(spaceman2);
            if (charActive === 'spaceman'){
                //Main drawing
                ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
                //ctx2.drawImage(this.image, this.x, this.y, this.width, this.height);
                //Temporal black rectangle
                //ctx.beginPath();
                //ctx.moveTo(this.x + this.width*0.2,this.y + this.height*0.1)
                //ctx.lineTo(this.x + this.width*0.8, this.y + this.height*0.1)
                //ctx.lineTo(this.x + this.width*0.8, this.y + this.height*0.9);
                //ctx.lineTo(this.x + this.width*0.2, this.y + this.height*0.9);
                //ctx.lineTo(this.x + this.width*0.2, this.y + this.height*0.1);
                //ctx.stroke();
                //Map drawing
                mCtx.drawImage(this.image, (this.x-this.width/2-scenarios[scenActive].x)*scale, (this.y-this.height/2-scenarios[scenActive].y)*scale, this.width*scale, this.height*scale);
                //nCtx2.drawImage(this.image, (this.x-this.width/2-scenarios[scenActive].x)*scale, (this.y-this.height/2-scenarios[scenActive].y)*scale, this.width*scale, this.height*scale);
                //Green circle    
                mCtx.beginPath();
                mCtx.strokeStyle = 'green';
                mCtx.arc((this.x-scenarios[scenActive].x)*scale, (this.y-scenarios[scenActive].y)*scale, Math.abs(this.height*.5*scale), 0, Math.PI*2, false)
                mCtx.stroke();

                //nCtx2.strokeStyle = 'black';
                //nCtx2.beginPath();
                //nCtx2.strokeStyle = 'green';
                //nCtx2.arc((this.x-scenarios[scenActive].x)*scale, (this.y-scenarios[scenActive].y)*scale, Math.abs(this.height*.5*scale), 0, Math.PI*2, false)
                //nCtx2.stroke();
                //nCtx2.strokeStyle = 'black';
            }
        }
    }

    class Spaceship extends Item{
        constructor(x,y,width,height){
            super(x,y,width,height);
            this.image = new Image();
            this.image.src = './images/Spaceship6.png';
            this.images = [];
            this.images.push(this.image);
            this.condition = 0;
        }
        draw(){
            //Main drawing
            for (i=0; i<this.images.length;i++){
                ctx.drawImage(this.images[i], this.x, this.y, this.width, this.height);
            }
            //Map drawing
            mCtx.drawImage(this.image, (this.x-scenarios[scenActive].x)*scale, (this.y-scenarios[scenActive].y)*scale, this.width*scale, this.height*scale);

        }
    }

    class Station extends Item{
        constructor(x,y,width,height){
            super(x,y,width,height);
            this.image = new Image();
            this.image.src = './images/MarsStation.png';
        }
        draw(){
            //Main drawing
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            //ctx2.drawImage(this.image, this.x, this.y, this.width, this.height);
            //Temporal drawings
            //ctx.beginPath();    
            //ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI*2, false)
            //ctx.stroke();
            //Map drawing
            mCtx.drawImage(this.image, (this.x-scenarios[scenActive].x)*scale, (this.y-scenarios[scenActive].y)*scale, this.width*scale, this.height*scale);
            ////nCtx2.drawImage(this.image, (this.x-scenarios[scenActive].x)*scale, (this.y-scenarios[scenActive].y)*scale, this.width*scale, this.height*scale);
        }
    }

    class StationInt extends Item{
        constructor(x,y,width,height,image){
            super(x,y,width,height)
            this.image = new Image();
            this.image.src = image;
            this.items = [];
        }

        draw() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            //ctx2.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }

    class Visor{
        constructor(){

        }
    }

    class Status extends Item{
        constructor(x,y,width,height){
            super(x,y,width,height)
            this.image = new Image();
            this.image.src = './images/Status.png';
        }

        draw(spaceman, rover, spaceship) {
            //Spaceman
            ctx.fillStyle = 'green';
            if (spaceman < 70 ){
                ctx.fillStyle = 'red';
            } else if ( spaceman < 140){
                ctx.fillStyle = 'yellow';
            }
            ctx.drawImage(this.image, this.x-45, this.y, this.width+90, this.height);
            ctx.fillRect(this.x, this.y+6, spaceman*2, this.height-12);
            ctx.font = '30px serif';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'start';
            ctx.fillText('Spaceman', 550, this.y+22);
            //Rover
            let space = 30;
            ctx.fillStyle = 'green';
            if (rover < 70 ){
                ctx.fillStyle = 'red';
            } else if ( rover < 140){
                ctx.fillStyle = 'yellow';
            }
            ctx.drawImage(this.image, this.x-45, this.y+space, this.width+90, this.height);
            ctx.fillRect(this.x, this.y+6+space, rover*2, this.height-12);
            ctx.font = '30px serif';
            ctx.fillStyle = 'white';
            ctx.fillText('Rover', 550, this.y+space+22);
            //Spaceship
            ctx.fillStyle = 'green';
            if (spaceship < 70 ){
                ctx.fillStyle = 'red';
            } else if ( spaceship < 140){
                ctx.fillStyle = 'yellow';
            }
            ctx.drawImage(this.image, this.x-45+canvas.width*0.7, this.y, this.width+90, this.height);
            ctx.fillRect(this.x+canvas.width*0.7, this.y+6, spaceship*2, this.height-12);
            ctx.font = '30px serif';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'end';
            ctx.fillText('Spaceship', 1380, this.y+22);
            
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
            let positionY = 80;
            ctx.font = '30px serif';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('Hi Score', 1500, positionY);
            ctx.fillText('Score', 1650, positionY);
            ctx.fillText('Enemies', 1800, positionY);
            ctx.fillText(this.hiScore, 1500, positionY+35);
            ctx.fillText(this.score, 1650, positionY+35);
            ctx.fillText(this.enemies, 1800, positionY+35);
            ctx.textAlign = 'start';


            
            //ctx2.font = '30px serif';
            //ctx2.fillStyle = 'white';
            //ctx2.textAlign = 'center';
            //ctx2.fillText('Hi Score', 1500, 30);
            //ctx2.fillText('Score', 1650, 30);
            //ctx2.fillText('Enemies', 1800, 30);
            //ctx2.fillText(this.hiScore, 1500, 65);
            //ctx2.fillText(this.score, 1650, 65);
            //ctx2.fillText(this.enemies, 1800, 65);
            //ctx2.textAlign = 'start';
        }
    }

    class Shooting extends Item{
        constructor(x,y,width,height,direction){
            super(x,y,width,height)
            this.image = new Image();
            this.image.src = './images/discharge.png';
            this.direction = direction;
            this.damage = 15;
        }

        collition(enemy){
            return (this.x+ this.width*0.2 < enemy.x + enemy.width) &&
                (this.x + this.width*0.8 > enemy.x) &&
                (this.y + this.height*0.1 < enemy.y + enemy.height) &&
                (this.y + this.height*0.9 > enemy.y);
        }

        draw(){
            let vel = 30;
            switch(this.direction){
                case 'N':
                    this.y -= vel;
                break;
                case 'E':
                    this.x += vel;
                break;
                case 'S':
                    this.y += vel;
                break;
                case 'W':
                    this.x -= vel;
                break;

            }
            //Main Drawing
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            //ctx2.drawImage(this.image, this.x, this.y, this.width, this.height);
            //Temporal black rectangle
            ctx.beginPath();
            ctx.moveTo(this.x + this.width*0.2,this.y + this.height*0.1)
            ctx.lineTo(this.x + this.width*0.8, this.y + this.height*0.1)
            ctx.lineTo(this.x + this.width*0.8, this.y + this.height*0.9);
            ctx.lineTo(this.x + this.width*0.2, this.y + this.height*0.9);
            ctx.lineTo(this.x + this.width*0.2, this.y + this.height*0.1);
            ctx.stroke();
            //Map Drawing
            mCtx.drawImage(this.image, (this.x-scenarios[scenActive].x)*scale, (this.y-scenarios[scenActive].y)*scale, this.width*scale, this.height*scale);
            //nCtx2.drawImage(this.image, (this.x-scenarios[scenActive].x)*scale, (this.y-scenarios[scenActive].y)*scale, this.width*scale, this.height*scale);
        }
    }

    //Audio resources

    class Sound {
        constructor(src){
            this.sound = document.createElement("audio");
            this.sound.src = src;
            this.sound.setAttribute("preload", "auto");
            this.sound.setAttribute("controls", "none");
            this.sound.setAttribute("loop", "true");
            this.sound.style.display = "none";
            document.body.appendChild(this.sound);
        }
        
        play (){
            this.sound.play();
        }

        stop (){
            this.sound.pause();
        }
    }

    class Effect {
        constructor(src){
            this.sound = document.createElement("audio");
            this.sound.src = src;
            this.sound.setAttribute("preload", "auto");
            this.sound.setAttribute("controls", "none");
            this.sound.loop = false;
            this.sound.style.display = "none";
            document.body.appendChild(this.sound);
        }
        
        play (){
            this.sound.play();
        }

        stop (){
            this.sound.pause();
        }
    }
//}