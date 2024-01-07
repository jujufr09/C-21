//var MENU = 1
var PLAY = 1;
var END = 0;

var gameState = PLAY;

var text
var score
//------------------------------//
var birdo;
var jumpSound;
//------------------------------//
var path;
var g1
var g2
var g3
var obstacle
var moon;
var stars;
var wind;
var back_clouds;
var back_trees;
var back_trees_2;
var back_trees_3
var cloudsGroup, cloud1, cloud2, cloud3;
function preload() {
  //LOAD_ANIMATIONS
  birdoimg = loadAnimation(
    "bird-1.png",
    "bird-2.png",
    "bird-3.png",
    "bird-4.png"
  );
  windimg = loadAnimation("wind-1.png", "wind-2.png", "wind-3.png");
  moonimg = loadAnimation("moon-1.png", "moon-2.png", "moon-3.png");
  starsimg = loadAnimation(
    "stars-1.png",
    "stars-1.png",
    "stars-1.png",
    "stars-1.png",
    "stars-2.png",
    "stars-2.png",
    "stars-2.png",
    "stars-2.png",
    "stars-2.png",
    "stars-2.png",
    "stars-2.png",
    "stars-2.png",
    "stars-3.png"
  );
  //FREEZE (Gamestate = 0)
  moonFimg = loadAnimation("moon-1.png");
  deathimg = loadAnimation("bird-D.png");
  windFimg = loadAnimation("wind-1.png");
  starsFimg = loadAnimation("stars-3.png");
  //LOAD_IMAGES
  pathimg = loadImage("sky.png");
  //Obstacles
  obs1 = loadImage("obstacle-1.png")
  obs2 = loadImage("obstacle-2.png")
  obs3 = loadImage("obstacle-3.png")
  
  ground_L1 = loadImage("ground-L1.png")
  ground_L2 = loadImage("ground-L2.png")
  ground_L3 = loadImage("ground-L3.png")

  cloud1img = loadImage("cloud-1.png");
  cloud2img = loadImage("cloud-2.png");
  cloud3img = loadImage("cloud-3.png");

  clouds = loadImage("clouds.png");
  trees = loadImage("bg_trees.png");
  trees2 = loadImage("bg_trees2.png")
  trees3 = loadImage("bg_trees3.png")
  //LOAD_SOUNDS
  jumpSound = loadSound("jump.mp3");
  deathSound = loadSound("8bit_splat.mp3");
}

function setup() {
  createCanvas(400, 400);

  //player
  birdo = createSprite(200, 200, 20, 20);
  birdo.addAnimation("flying", birdoimg);
  birdo.scale = 0.9;
  birdo.setCollider("rectangle",0,5,60,30);
  birdo.debug=false

  //cenario
  path = createSprite(0, 120, 2, 2);
  path.addImage(pathimg);
  //chao
  g1 = createSprite(200,250,2,2)
  g1.addImage("g1",ground_L1)
  g2 = createSprite(200,250,2,2)
  g2.addImage("g2",ground_L2)
  g3 = createSprite(200,250,2,2)
  g3.addImage("g3",ground_L3)

  moon = createSprite(200, 100, 2, 2);
  moon.addAnimation("moon", moonimg);
  moon.scale = 0.75;

  stars = createSprite(200, 200, 2, 2);
  stars.addAnimation("stars", starsimg);

  //GRUPOS
  //Grupo das Nuvens
  cloudsGroup = createGroup();
  //Grupo dos Obstaculos
  obstaclesGroup = createGroup();

  back_clouds = createSprite(280, 100, 2, 2);
  back_clouds.addImage(clouds);
  back_clouds.scale = 0.8;
  back_clouds.velocityX = -5;

  back_trees = createSprite(280, 370, 2, 2);
  back_trees.addImage(trees);
  back_trees.scale = 0.56;

  back_trees_2 = createSprite(280, 370, 2, 2);
  back_trees_2.addImage(trees2);
  back_trees_2.scale = 0.45;

  back_trees_3 = createSprite(280, 340, 2, 2);
  back_trees_3.addImage(trees3);
  back_trees_3.scale = 0.3;

  wind = createSprite(200, 200, 20, 20);
  wind.addAnimation("wind", windimg);
  

  birdo.depth;
  wind.depth = birdo.depth + 1;
  path.depth = birdo.depth - 5;
  moon.depth = birdo.depth - 4
  g1.depth = path.depth + 3
  g2.depth = path.depth + 2
  g3.depth = path.depth + 0.5
  back_clouds.depth = birdo.depth - 3;
  back_trees.depth = g1.depth - 1;
  back_trees_2.depth = g3.depth + 1
  back_trees_3.depth = back_trees_2.depth - 1
  stars.depth = path.depth

  score = 0
}

function draw() {
  background("black");

  
  
  if (gameState === PLAY) {
    if (path.x < 4) {
      path.x = path.width / 2;
    }
    if (g1.x < 4) {
      g1.x = g1.width / 2;
    }
    if (g2.x < 4) {
      g2.x = g2.width / 2;
    }
    if (g3.x < -6) {
      g3.x = g3.width / 2;
    }
    if (back_trees.x < -50) {
      back_trees.x = back_trees.width/4;
    }
    if (back_trees_2.x < -55) {
      back_trees_2.x = back_trees_2.width/4;
    }
    if (back_trees_3.x < -60) {
      back_trees_3.x = back_trees_3.width/6;
    }
    if (back_clouds.x < 78) {
      back_clouds.x = back_clouds.width / 4;
    }

    score = score + Math.round(getFrameRate()/60);

    clouds.velocityX = -(7 + 3*score/100);
    g1.velocityX = -(7 + 3*score/100);
    g2.velocityX = -(5 + 3*score/100);
    g3.velocityX = -(3 + 3*score/100);
    back_trees.velocityX = -(5.5 + 3*score/100);
    back_trees_2.velocityX = -(4 + 3*score/100);
    back_trees_3.velocityX = -(3.5 + 3*score/100);

    //Gravidade
    birdo.velocityY = birdo.velocityY + 0.8;

    if (
      mousePressedOver(path) ||
      mousePressedOver(g1) ||
      mousePressedOver(g2) ||
      mousePressedOver(g3) ||
      keyWentDown("up") ||
      keyWentDown("W") ||
      keyWentDown("space")
    ) {
      birdo.velocityY = -6;
      jumpSound.play();
    }
    
    //---Spawnar as Nuvens---//
    spawnClouds();
    //---Spawnar os Obstaculos---//
    spawnObstacles();


    
    if (birdo.y > 366||(birdo.isTouching(obstaclesGroup))||birdo.y < -5) {
      console.log("birdo died");
      gameState = END;
      birdo.velocityY = 0;
      path.velocityX = 0;
      cloudsGroup.setVelocityXEach(0);
      cloudsGroup.setLifetimeEach(-1);
      deathSound.play()
    }
  }
  if (gameState === END) {
    path.velocityX = 0;
    birdo.velocityY = 0;
    birdo.addAnimation("flying", deathimg);
    cloudsGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    back_clouds.velocityX = 0;
    back_trees.velocityX = 0;
    back_trees_2.velocityX = 0;
    back_trees_3.velocityX = 0;
    moon.addAnimation("moon", moonFimg);
    wind.addAnimation("wind", windFimg);
    stars.addAnimation("stars",starsFimg)
    g1.velocityX=0
    g2.velocityX=0
    g3.velocityX=0
  }


  drawSprites();
}


function spawnObstacles() {
  if (frameCount % 80 === 0) {
    var obstacle = createSprite(400, 260, 10, 40);
    obstacle.y = Math.round(random(200, 300));
    obstacle.velocityX = -(6 + 3*score/100);

    var rand = Math.round(random(1, 3));
    switch (rand) {
      case 1:
        obstacle.addImage("obstacle",obs1);
        break;
      case 2:
        obstacle.addImage("obstacle",obs2);
        break;
      case 3:
        obstacle.addImage("obstacle",obs3);
        break;
      default:
        break;
    }

    obstacle.scale = 0.75;

    obstacle.lifetime = 300;
    obstacle.setCollider("rectangle",0,10,125,380);
    obstacle.debug=false
    obstaclesGroup.add(obstacle);
  }
}



function spawnClouds() {
  if (frameCount % 15 === 0) {
    var cloud = createSprite(400, 83, 1, 1);
    cloud.y = Math.round(random(10, 120));
    cloud.velocityX = -(6 + 3*score/100);

    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        cloud.addImage("cloud", cloud1img);
        break;

      case 2:
        cloud.addImage("cloud", cloud2img);
        break;

      case 3:
        cloud.addImage("cloud", cloud3img);
        break;

      default:
        break;
    }

    cloud.scale = 0.6;

    cloud.lifetime = 300;
    cloud.depth = moon.depth + 1;

    cloudsGroup.add(cloud);
  }
}
