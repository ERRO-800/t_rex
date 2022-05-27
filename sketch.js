var PLAY = 1;
var END = 0;
var gameState = PLAY;



var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var gameOverIMAGE;
var restartIMAGE;
var gameOver;
var restart;
var score;
var checkSound;
var jumpSound;
var dieSound;

function preload(){
 checkSound=loadSound("checkPoint.mp3");
 jumpSound=loadSound("jump.mp3");  
 dieSound=loadSound("die.mp3"); 
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  
  
  
  groundImage = loadImage("ground2.png");
  gameOverIMAGE=loadImage("gameOver.png");
  restartIMAGE=loadImage("restart.png");
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  trex = createSprite(50,windowHeight-70,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  trex.debug=false;
  trex.setCollider("circle",0,-15,70);
  
  
  
  gameOver=createSprite(windowWidth/2,windowHeight/2-100,10,50);
  gameOver.addImage("game0ver",gameOverIMAGE);
  gameOver.scale=1
  gameOver.visible=false;
  
  restart=createSprite(windowWidth/2,windowHeight/2,10,20);
  restart.addImage("restart",restartIMAGE);
  restart.scale=0.6
  restart.visible=false;
  
  ground = createSprite(windowWidth-400,windowHeight-20,300,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(windowWidth/2,windowHeight-10,windowWidth,10);
  invisibleGround.visible = false;
  
  //crie Grupos de Obstáculos e Nuvens
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  
  
  
  score = 0;
}

function draw() {
  background(180);
  text("Score: "+ score, windowWidth-100,50);
  console.log(trex.y)
  
  if(gameState === PLAY){
    //mover o solo
    ground.velocityX = -(4 + score/100)
    
    if(touches.length>0 ||keyDown("space")&& trex.y >= windowHeight-42.7&&flag) {
      trex.velocityY = -13;
      jumpSound.play()
    touches=[]
    }
  //incrementação dos pontos  
  score=score+Math.round(frameRate()/60);
    
  //gravidade
    trex.velocityY = trex.velocityY + 0.8
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    spawnClouds();
  
  
    spawnObstacles();
    if (obstaclesGroup.isTouching(trex)) {
     
     //dieSound.play()
     // 
    if (flag) {
      gameState=END
    }
  }   
  }
  else if(gameState === END){
    //parar o solo
    ground.velocityX = 0;
   obstaclesGroup.setVelocityXEach(0);
   cloudsGroup.setVelocityXEach(0);
  cloudsGroup.setLifetimeEach(-5);
  obstaclesGroup.setLifetimeEach(-5);
  trex.changeAnimation("collided" , trex_collided)
   gameOver.visible=true
   restart.visible=true 
   if (mousePressedOver(restart)) {
    reset();
    
    
    }

  }
  
  
  trex.collide(invisibleGround);
  
  //gere as nuvens
 
   drawSprites();
   
  
  


}

function spawnObstacles(){
 if (frameCount % 60 === 0){
  //W=600,H=200 windowWidth, windowHeight
  var obstacle = createSprite(windowWidth+100,windowHeight-35,10,40);
   obstacle.velocityX = -(6 + score/100)
   

    // //gerar obstáculos aleatórios
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //atribuir escala e vida útil ao obstáculo          
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    
   //adicione cada obstáculo ao grupo
   obstaclesGroup.add(obstacle)
   }
}




function spawnClouds() {
  //escreva o código aqui para gerar as nuvens
  if (frameCount % 60 === 0) {
     cloud = createSprite(windowWidth-0,100,40,10);
    cloud.y = Math.round(random(10,windowHeight-140));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //atribuir vida útil à variável
    cloud.lifetime = 1200;
    
    //ajustar a profundidade
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adicionando nuvem ao grupo
   cloudsGroup.add(cloud);
  }
  
}
function reset(){


  trex.changeAnimation("running", trex_running);
  score=0
 gameOver.visible=false 
 restart.visible=false
obstaclesGroup.destroyEach();
cloudsGroup.destroyEach();
gameState=PLAY



}








