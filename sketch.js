//create sprites: dog,ground,obstacles
//spawning obstacles
//giving movement instructions to dog
//ground functionality(its movement)
//condition to win or lose game
//gameStates 


//creating variables
var dog,master,ground;
var dogImg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ObstaclesGroup;
var score = 0;

function preload() {
    dogImg = loadImage("dog running pic.png");
    obstacle1 = loadImage("mean guy 1.png");
    obstacle2 = loadImage("mean guy 2.png");
    obstacle3 = loadImage("mean guy 3.png");
    obstacle4 = loadImage("mean guy 4.png");
    obstacle5 = loadImage("mean guy 5.png");
    obstacle6 = loadImage("mean guy 6.png");
    obstacle7 = loadImage("mean guy 7.png");
}

function setup(){
    //creating canvas
    var canvas = createCanvas(1200,400);
    //creating dog and ground sprites
    dog = createSprite(100,380,30,70);
    dog.addImage("dog running",dogImg);
    dog.scale = 0.2;
    //dog.debug = true;
    dog.setCollider("circle",0,0,100);
    ground = createSprite(600,390,1200,20);
    ObstaclesGroup = new Group();
}

function draw(){
    background("black");
    textSize(20);
    fill("white");
    text("Score: "+score,1000,100);
    if(gameState === PLAY){
        setTimeout(function(){
            if(frameCount%100 === 0){
                setTimeout(function(){score = score + 1},5000)
            }   
        },3500);
        //score = score + Math.round(getFrameRate()/50);
        //score = Math.round(score + 0.5); 
        if(keyDown("space")&&dog.y>=352){
            dog.velocityY = -19;
        }
        dog.velocityY = dog.velocityY + 0.8;
        spawnObstacles();
        
        if(ObstaclesGroup.isTouching(dog)){
            gameState = END;
            score = 0;
        }
    }

    if(gameState === END){
        dog.velocityY = 0;
        ground.velocityX = 0;
        textSize(25);
        text("GAMEOVER",530,200);
        text("Press 'R' to restart",500,230);
        ObstaclesGroup.setVelocityXEach(0);
        ObstaclesGroup.setLifetimeEach(-1);

        if(keyDown("R")){
            gameState = PLAY;
            score = 0;
            ObstaclesGroup.destroyEach();
        }
    }
    dog.collide(ground);
    
    drawSprites();   
}

function spawnObstacles(){
    if(World.frameCount%90===0){
        var obstacle = createSprite(1200,320,20,40);
        obstacle.velocityX = -8;
        //obstacle.debug = true;
        var rand = Math.floor(Math.random()*7);

        switch (rand) {
            case 0:
                obstacle.addImage(obstacle1);
                obstacle.scale = 0.17;
                break;
            case 1:
                obstacle.addImage(obstacle2);
                obstacle.scale = 0.2;
                break;
            case 2:
                obstacle.addImage(obstacle3);
                obstacle.scale = 0.17;
                break;
            case 3:
                obstacle.addImage(obstacle4);
                obstacle.scale = 0.19;
                obstacle.setCollider("rectangle",0,0,200,obstacle.height);
                break;
            case 4:
                obstacle.addImage(obstacle5);
                obstacle.scale = 0.15;
                break;
            case 5:
                obstacle.addImage(obstacle6);
                obstacle.scale = 0.15;
                break;
            case 6:
                obstacle.addImage(obstacle7);
                obstacle.scale = 0.20;
                obstacle.setCollider("rectangle",0,0,200,obstacle.height);
                break;
            default:
                break;
        }
        ObstaclesGroup.add(obstacle);
    }
}