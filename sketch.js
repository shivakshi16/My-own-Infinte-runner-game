  var END = 0;
  var gameState = PLAY;
  var PLAY = 1;

  var boy, boy_running,boy1
  var ground,  groundImage;
  var birdGroup, birdImage;
  var thornGroup, thorn1, thorn2, thorn3, 
    
  var score
  var gameOverImg
  var jumpSound ,gameoverSound


function preload(){
  boy_running = loadAnimation("boy image.jpg","boy 1 image.jpg");
  groundImage = loadImage("ground.png");
  birdImage = loadImage("bird.png");
  thorn1 = loadImage("thorn1.jpg");
  thorn2= loadImage("thorn2.jpg");
  thorn3 = loadImage("thorn3.jpg");
  gameOverImg = loadImage("gameover.jpg")
  jumpSound = loadSound("jump sound.wav")
  gameoverSound = loadSound("Game over sound.wav")
  
}

function setup() {
 createCanvas(600, 200);
  
 boy= createSprite(50,180,20,50);
 boy.addAnimation("running", boy_running);
 
 boy.scale = 0.5;
 ground = createSprite(200,200,400,20);
 ground.addImage("ground",groundImage);
 ground.x = ground.width /2;
 gameOver = createSprite(300,100);
 gameOver.addImage(gameOverImg);
 gameOver.scale = 0.5;
 
 thornGroup = createGroup();
 
 
  
}

function draw() {
  background("hotpink");
  text("Score: "+ score, 100,10);
  console.log("game ",gameState)
  
  
  if(gameState === PLAY){
    gameOver.visible = false
    ground.velocityX = -4;
    score = score + Math.round(frameCount/80);
   if (ground.x < 0){
   ground.x = ground.width/3;
    }
    if(keyDown("space")&& boy.y >= 300) {
        boy.velocityY = -10;
    }
    boy.velocityY = boy.velocityY + 1
  
    spawnthorn();
    if(thornGroup.isTouching(boy)){
    gameState = END;
    }
  }
  else if (gameState === END) {
    console.log("over")
    gameOver.visible = true;
    ground.velocityX = 0;
    boy.velocityY = 0
    boy.changeAnimation("boy dead.png");
    thornGroup.setLifetimeEach(-1);
    thornGroup.setVelocityXEach(0);
    }
    
 
 
  
  
  
  
  drawSprites();
}

function spawnthorn(){
 if (frameCount % 100 === 0){
   var thorn = createSprite(450,150,20,40);
   thorn.velocityX = -6;
   
    var rand = Math.round(random(1,10));
    switch(rand) {
      case 1: thorn.addImage(thorn1);
              break;
      case 2: thorn.addImage(thorn2);
              break;
      case 3: thorn.addImage(thorn3);
              break;
     
      default: break;
    }
              
    thorn.scale = 0.5;
    thorn.lifetime = 300;
   
   
    thornGroup.add(thorn);
 }
}




