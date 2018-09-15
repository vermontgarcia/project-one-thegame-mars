//window.onload = function() {

    //Linking main canvas
    var canvas = document.getElementById('mars');
    var ctx = canvas.getContext('2d');
        
    //Linking map canvas
    var map = document.getElementById('map');
    var mCtx = map.getContext('2d');

    //Linking main canvas
    var canvas2 = document.getElementById('mars2');
    var ctx2 = canvas2.getContext('2d');
        
    //Linking map canvas
    var map2 = document.getElementById('map2');
    var mCtx2 = map2.getContext('2d');

    //Activating full scree request
    document.addEventListener("click", function (e) {
        //console.log(e.path);

        if(!e.path) return;
        if(e.path[3].id === "expand" || e.path[2].id === "expand" || e.path[1].id === "expand" ){
            var el = document.documentElement,
            rfs = el.requestFullscreen
                    || el.webkitRequestFullScreen
                    || el.mozRequestFullScreen
                    || el.msRequestFullscreen
            ;
            rfs.call(el);
        }
    });

    //Definig variables
    var isMobile;
    var interval;
    var frames = 0;
    var velocity = 5;
    var roverVelFac = 0.05;
    var spacemanVelFac = 0.03;
    var character = {};
    var scenarioScale = 2;
    var itemScale = 0.60;
    var deepFactorChar = 1;
    var deepFactorSpaceman;
    var deepFactorEnemie;
    var enemiesQuantity = 20;
    var shoots = [];
    var keys = [];

    var language = '';
    var players = 1;
    var mode = 'mission';
    var difficulty = 'easy';

    var gameState = 'inactive';
    var charActive = 'spaceman';
    var stationInside = false;
    var scenActive = 0;
    var scenarioImages = [
        './images/MarsScenario1.png',
        './images/MarsScenario2.png',
        './images/MarsScenario3.png',
        './images/MarsScenario4.png',
        './images/MarsScenario5.png',
        './images/MarsScenario6.png'
    ]
    var spacemanE = [
        './images/SpacemanE1.png',
        './images/SpacemanE2.png',
        './images/SpacemanE3.png',
        './images/SpacemanE4.png',
        './images/SpacemanE5.png',
        './images/SpacemanE6.png',
        './images/SpacemanE7.png',
        './images/SpacemanE8.png',
        './images/SpacemanE9.png',
        './images/SpacemanE1.png'
    ]
    var spacemanW = [
        './images/SpacemanW1.png',
        './images/SpacemanW2.png',
        './images/SpacemanW3.png',
        './images/SpacemanW4.png',
        './images/SpacemanW5.png',
        './images/SpacemanW6.png',
        './images/SpacemanW7.png',
        './images/SpacemanW8.png',
        './images/SpacemanW9.png',
        './images/SpacemanW1.png'
    ]
    var spacemanN = [
        './images/SpacemanN1.png',
        './images/SpacemanN2.png',
        './images/SpacemanN3.png',
        './images/SpacemanN4.png',
        './images/SpacemanN5.png',
        './images/SpacemanN1.png'
    ]
    var spacemanS = [
        './images/SpacemanS1.png',
        './images/SpacemanS2.png',
        './images/SpacemanS3.png',
        './images/SpacemanS4.png',
        './images/SpacemanS5.png',
        './images/SpacemanS1.png'
    ]
    var audioSongs = [
        './music/ConfigGame.mp3',
        './music/Mission.mp3',
        './music/Survival.mp3',
        './music/Inside Station.mp3',
        './music/GameOver.mp3'
    ]
    var audioEffects = [
        './efects/Select.mp3',
        './efects/Shoot.mp3',
        './efects/GetItem.mp3'
    ]
    var scenarios = [];
    var stationsIntImages = [
        './images/StationInt1.png',
        './images/StationInt2.png',
        './images/StationInt3.png',
        './images/StationInt4.png',
        './images/StationInt5.png',
        './images/StationInt6.png',
        './images/StationInt7.png',
        './images/StationInt8.png'
    ]
    var spaceshipImages = [
        './images/Spaceship1.png',
        './images/Spaceship2.png',
        './images/Spaceship3.png',
        './images/Spaceship4.png',
        './images/Spaceship5.png'
    ]

    var spaceshipSpare = [];
    
    var interiors = [];
    var songs = [];
    var effects = [];

    var frame1;
    var frame2;
    var frame3;



    var spaceman;
    var spaceman2;
    var rover
    var rover2
    var score
    var statusCharacter
    var score2
    var statusCharacter2

    var fixesShip = 0;


    var borderError = "Error trying to excced the grid borders";

    var stationBoundary;

    //Defining constants
    const spacemanHeight = 200;
    const spacemanWidth = 114;
    const roverHeight = 300;
    const roverWidthFront = 300;
    const roverWidthSide = 300*1.38;
    const enemyHeight = 200;
    const enemyWidth = 160;
    const stationWidth = 200;
    const stationHeight = stationWidth * 0.4;
    const spaceshipWidth = 300;
    const spaceshipHeight = spaceshipWidth * 0.57;
    const scale = (map.width/canvas.width)/scenarioScale;

    //Creating instances

    generateAudio();
    generateEffects();

    function createInstances(){
        generateScenarios();
        generateStations();
        generateSpaceship();
        generateSpare();
        generateInteriors();
        spaceman = new Spaceman(canvas.width*0.25, canvas.height*0.75, spacemanWidth*itemScale*deepFactorChar, spacemanHeight*itemScale*deepFactorChar);
        character.spaceman = spaceman;
        spaceman2 = new Spaceman(canvas.width*0.75, canvas.height*0.75, spacemanWidth*itemScale*deepFactorChar, spacemanHeight*itemScale*deepFactorChar);
        character.spaceman2 = spaceman2;
        rover = new Rover(canvas.width*0.45, canvas.height*0.55, roverWidthSide*itemScale*deepFactorChar, roverHeight*itemScale*deepFactorChar);
        character.rover = rover;
        rover2 = new Rover(canvas.width*0.45, canvas.height*0.55, roverWidthSide*itemScale*deepFactorChar, roverHeight*itemScale*deepFactorChar);
        character.rover2 = rover2;
        score = new Score();
        statusCharacter = new Status(100, 25, 400, 25);
        score2 = new Score();
        statusCharacter2 = new Status(100, 25, 400, 25);
    }

    //Verifying the device runing the game
    isMobile = isMobile();
    //console.log('Is mobile device?', isMobile);
    ctx.font = '55px serif';
    ctx.fillText(isMobile, 100, 100);

    //Setting the keyboard Controls
    addEventListener('keydown',function(e){
        keys[e.keyCode]=true;
        //this.console.log(keys)
    });

    addEventListener('keyup', function(e){
        keys[e.keyCode]=false;
    });

    addEventListener('keydown',function(e){
        keyControls1(e);
        //keyControls2();
    });

    //Mobile controls

    //var $ = require('jquery');
    //var loadTouchEvents = require('jquery-touch-events');
    //loadTouchEvents($);


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
    $('#center').click(function(){
        //console.log('center');
        toggleMap();
    });

    $('#a').click(function(){
        //console.log('up');
        gettingInRover();
    });
    $('#d').click(function(){
        //console.log('left');
        gettingOutRover();
    });
    $('#b').click(function(){
        //console.log('rigth');
        gettingOutStation();
    });
    $('#c').click(function(){
        //console.log('down');
        gettingInStation();
    });
    $('#x').click(function(){
        //console.log('center');
        createShoots(character[charActive]);
    });


    //Excecuting the game
    intro(language);
    //startGame();

//}