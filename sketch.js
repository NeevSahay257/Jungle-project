var hunter,hunterimage;
var restart,restartimage;
var bulletGroup,animalGroup,treasureGroup;
var bullet,bulletimage;
var gunsound;
var ig;
var yay;
var treasure,timg;
var sad;
var score = 0;
var bg,bgimage; 
var PLAY = 0;
var END = 1;
var WIN = 2;
var gameState = PLAY;
var animals,animal1,animal2,animal3;
function setup() {
  createCanvas(displayWidth,displayHeight);
  bg = createSprite(width/2,height/2,width,height);
  bg.addImage(bgimage);
  bg.scale = 2.5;
  hunter = createSprite(200,550,50,50);
  hunter.addAnimation("hunter",hunterimage);
  hunter.scale = 0.4;
  restart = createSprite(width/2,height/2);
    restart.addImage(restartimage);
    restart.scale=0.5;
    ig = createSprite(200,660,width/2,10);
    ig.visible = false;
  gameState = PLAY;
  
  bulletGroup = new Group();
  animalGroup = new Group();
  treasureGroup = new Group();

}
function preload(){
  hunterimage = loadAnimation("soldier1.png","soldier2.png","soldier3.png","soldier4.png","soldier5.png","soldier6.png");
  bgimage = loadImage("bg2.png");
  restartimage = loadImage("restart.png");
  bulletimage = loadImage("bullet.png")
  animal1 = loadImage("animals1.png");
  animal2 = loadImage("animals2.png");
  animals3 = loadImage("animals3.png");
  gunsound = loadSound("gunfire.mp4");
  yay = loadSound("yay.mp4")
  sad = loadSound("sad.mp4");
  timg = loadImage("treasure.png");
}

function draw() {
  background(255,255,255);  

 if(gameState === PLAY){
  bg.velocityX= -3;
  if(bg.x <0 ){
    bg.x = width/2;
  }
  if(score >= 10){
    bg.velocityX = -5;
    animals.velocityX = -10;
  }
  if(score >= 20){
    bg.velocityX = -10;
    animals.velocityX = -15;
  }
  

   if(keyDown("space")){
     spawnBullet();
   }
   if(bulletGroup.isTouching(animalGroup)){
     score=score+5;
     animalGroup.destroyEach();
     bulletGroup.destroyEach();
   }
   restart.visible  = false;
  spawnAnimals();
  if(score === 25){
    gameState = WIN;
   
  }
  if(animalGroup.isTouching(hunter)){
   gameState = END;
   sad.play();
  }
  
  }
  if(gameState === END){
    hunter.visible = false;
    bg.visible = false;
    restart.visible  = true;
    animalGroup.destroyEach();
  
    if(mousePressedOver(restart)){
      reset();
      
    }
  }
  if(gameState === WIN){
    hunter.visible = false;
    bg.visible = false  
   yay.play();
    animalGroup.destroyEach(); 
  }
 
  drawSprites();
  
  fill("white");
  textSize(25);
  text("Score:"+score,width-200,100);
  if(gameState === END){
    fill("black");
    textSize(25);
    text("You lost",width/2,height/2-300);
    
  }
  if(gameState === WIN){
    fill("black");
    textSize(25);
    text("Congratualtions," + " You are the winner",width/2,height/2-100);
  }

}
function spawnAnimals(){
  if(frameCount % 300 ===0){
    animals = createSprite(width+20,550,50,50);
    animals.velocityX = -5;
    var rand = Math.round(random(1,3));
    if(rand === 1){
      animals.addImage(animal1);
    }
    if(rand === 2){
      animals.addImage(animal2);
    }
    if(rand === 3 ){
      animals.addImage(animals3);
    }
    animals.scale=0.7;
    animals.lifetime = width/5
    animalGroup.add(animals);
    
  }
  
}
function spawnBullet(){
  
  bullet = createSprite(250,530,10,10);
  bullet.addImage(bulletimage);
  bullet.velocityX = 9;
  bullet.scale = 0.3;
  bullet.lifetime = width/6;
  bulletGroup.add(bullet);
  gunsound.play();
}
function reset(){
  gameState = PLAY;
  hunter.visible = true;
  bg.visible = true;
 
}
