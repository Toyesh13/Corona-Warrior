var player, playerImage

var BG, BGimage

var obstacles, obstaclesImg, obstaclesGrp

var gameState = "play"

var score = 0

var particle1,particle1Img, particle1Grp
var particle2,particle2Img, particle2Grp
var particle3,particle3Img, particle3Grp


var mask, maskImg

var wood, woodImg

function preload(){
    //loading images
playerImage = loadImage("Player.png");
BGimage = loadImage("Background.png");
obstaclesImg = loadImage("Obstacle.png");
particle1Img = loadImage("Particle_1.png");
particle2Img = loadImage("Particle_2.png");
particle3Img = loadImage("Particle_3.png");
maskImg = loadImage("Mask Button.png");
woodImg = loadImage("Wooden Panel.png");

}

function setup() {
createCanvas(500,300);

//adding sprites
 player = createSprite(80, 200);
 player.addImage(playerImage);
 player.scale = 0.166;
 player.setCollider("rectangle", 50, -30, 500, 250);

 BG = createSprite(width/2 + 30,height/2);
 BG.addImage(BGimage);
 BG.scale = 0.38;

 obstaclesGrp = new Group();

 particle1Grp = new Group();
 particle2Grp = new Group();
 particle3Grp = new Group();

 mask = createSprite(width/2, height/3 *2);
 mask.addImage(maskImg);
 mask.scale = 0.2
 mask.visible = false;

 wood = createSprite(width/2, height/3);
 wood.addImage(woodImg);
 wood.scale = 0.16
 wood.visible = false;
}

function draw() {
    background(0);

    BG.velocityX = -4

    //creating infinite background
    if(BG.x === width/2 - 30) {
        BG.x = 60/100*width;
    }

    //creating boundary
    createEdgeSprites();
    //player.collide();

    
    //adding functions for playState
    if(gameState === "play") {

        //giving score
        score = score + Math.round(getFrameRate()/60);
        

        //code to make the player move
        if(keyDown("up_arrow")) {
            player.y = player.y - 5;
        }
        if(keyDown("down_arrow")) {
            player.y = player.y + 5;
        }

        spawnObstacles();
        spawnParticles1();
        spawnParticles2();
        spawnParticles3();
    }

    if(obstaclesGrp.isTouching(player)) {
        gameState = "end"
    }
    

    //adding functions for endState
   if(gameState === "end") {
       BG.velocityX = 0;

       obstaclesGrp.setVelocityXEach(0);
       obstaclesGrp.setLifetimeEach(-1);

       particle1Grp.setVelocityXEach(0);
       particle1Grp.setLifetimeEach(-1);
       
       particle2Grp.setVelocityXEach(0);
       particle2Grp.setLifetimeEach(-1);
       
       particle3Grp.setVelocityXEach(0);
       particle3Grp.setLifetimeEach(-1);


       mask.visible = true;
       wood.visible = true;

       if(mousePressedOver(mask)) {
        reset();
      }
   }



//adjusting depth
 player.depth = BG.depth;
 player.depth +=1 

 wood.depth += 2


console.log(BG.velocityX)

 drawSprites();


 if(gameState === "play") {
     //displaying score
     textSize(25)
     text("Score: "+ score, width/2 - 50 ,70);
}

if(gameState === "end") {
    //displaying score
    fill("black");
    textSize(30);
    text("Score: "+ score, width/2 - 75 ,wood.y + 5);
    textSize(28);
    text("Restart", width/2 - 45, mask.y + 5);
}
}

function spawnObstacles() {
    if(frameCount % 40 === 0) {
obstacles = createSprite(width,Math.round(random(10,height/2)));
 obstacles.addImage(obstaclesImg);
 obstacles.scale = 0.15;
 obstaclesGrp.add(obstacles);
 obstacles.setCollider("circle", 0, 0, 200);
obstacles.velocityX = -5
obstacles.lifetime = 110;
mask.depth = obstacles.depth;
mask.depth += 1

}

if(frameCount % 60 === 0) {
    obstacles = createSprite(width,Math.round(random(height/2, height - 10)));
     obstacles.addImage(obstaclesImg);
     obstacles.scale = 0.15;
     obstaclesGrp.add(obstacles);
     obstacles.setCollider("circle", 0, 0, 200);
    obstacles.velocityX = -5
    obstacles.lifetime = 110;
    mask.depth = obstacles.depth;
 mask.depth += 1
    }
}

function spawnParticles1() {
    if(frameCount % 10 === 0) {
    particle1 = createSprite(width, Math.round(random(0,height/2)));
    particle1.addImage(particle1Img);
    particle1.scale = 0.05;
    particle1.velocityX = -3
    particle1.depth = BG.depth;
    particle1.lifetime = 160;
    particle1Grp.add(particle1)
    }

    if(frameCount % 10 === 0) {
        particle1 = createSprite(width, Math.round(random(height/2, height)));
        particle1.addImage(particle1Img);
        particle1.scale = 0.05;
        particle1.velocityX = -3
        particle1.depth = BG.depth;
        particle1.lifetime = 160;
        particle1Grp.add(particle1);
        }
}

function spawnParticles2() {
    if(frameCount % 20 === 0) {
    particle2 = createSprite(width, Math.round(random(0,height/2)));
    particle2.addImage(particle2Img);
    particle2.scale = 0.05;
    particle2.velocityX = -3
    particle2.depth = BG.depth;
    particle2.lifetime = 160;
    particle2Grp.add(particle2);
    }
    if(frameCount % 20 === 0) {
        particle2 = createSprite(width, Math.round(random(height/2,height)));
        particle2.addImage(particle2Img);
        particle2.scale = 0.05;
        particle2.velocityX = -3
        particle2.depth = BG.depth;
        particle2.lifetime = 160;
        particle2Grp.add(particle2);
        }
}


function spawnParticles3() {
    if(frameCount % 30 === 0) {
    particle3 = createSprite(width, Math.round(random(0,height/2)));
    particle3.addImage(particle3Img);
    particle3.scale = 0.02;
    particle3.velocityX = -3
    particle3.depth = BG.depth;
    particle3.lifetime = 160;
    particle3Grp.add(particle3);
    }

    if(frameCount % 30 === 0) {
        particle3 = createSprite(width, Math.round(random(height/2, height)));
        particle3.addImage(particle3Img);
        particle3.scale = 0.02;
        particle3.velocityX = -3
        particle3.depth = BG.depth;
        particle3.lifetime = 160;
        particle3Grp.add(particle3);
    }
}

function reset() {
    //changing the gamestate to play
    gameState = "play";

    //setting score to 0
    score = 0;

    //destoying all items 
    obstaclesGrp.destroyEach();
    particle1Grp.destroyEach();
    particle2Grp.destroyEach();
    particle3Grp.destroyEach();

    //making restart buttons invisible
    wood.visible = false;
    mask.visible = false;

}
