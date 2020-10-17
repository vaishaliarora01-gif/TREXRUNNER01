var trex_run,ground_run;
var invGround,trex,ground;
var cloud,obstacle,cloud1;
var obs1,obs2,obs3,obs4,obs5,obs6;
var play=1;
var end=0;
var gamestate=play;
var score=0;
var gameOvr,restrt,gameOVER,reSTART;
var jumpSound,checkPointSound,dieSound;

function preload()
{
 trex_run =
    loadAnimation("trex1.png","trex3.png","trex4.png");
  ground_run=loadImage("ground2.png");
  cloud1=loadImage("cloud.png");
  obs1=loadImage("obstacle1.png");
  obs2=loadImage("obstacle2.png");
  obs3=loadImage("obstacle3.png");
  obs4=loadImage("obstacle4.png");
  obs5=loadImage("obstacle5.png");
  obs6=loadImage("obstacle6.png");
  trex_collided=loadImage("trex_collided.png");
  gameOVER=loadImage("gameOver.png");
  reSTART=loadImage("restart.png");
  jumpSound=loadSound("jump.mp3");
  checkPointSound=loadSound("checkPoint.mp3");
  dieSound=loadSound("die.mp3");
    
}


 function setup() 
 {
   createCanvas(600, 400);
  
   //trex
   trex=createSprite(20,355,10,10);
   trex.addAnimation("running",trex_run);
   trex.addAnimation("stop",trex_collided);
   trex.scale=0.5;
   trex.debug=true;
  
   //ground
   ground=createSprite(10,380,200,10);
   ground.addAnimation("ground",ground_run);
   ground.velocityX=-(2+3*score/100);
   //ground.debug=true;
  
   //invGround
   invGround=createSprite(10,390,200,10);
   invGround.visible=false;
  
   //Create Groups for obstacles and trex
   obstacleGroup=new Group();
   cloudGroup=new Group();
   
   
   //Gameover
   gameOvr=createSprite(290,180,10,10)
   gameOvr.addImage(gameOVER);
   gameOvr.scale=0.5;
   gameOvr.visible=false;
   
   //Restart
   restrt=createSprite(290,220,10,10)
   restrt.addImage(reSTART);
   restrt.scale=0.5;
   restrt.visible=false;
 }

 function draw()
 {
  background(180);
  //console.log(trex.y);
  text("Score:"+score,300,50);
  if(gamestate===play)
     {
        score=score+Math.round(getFrameRate()/60);
       
       if(score>0 && score%100===0)
         {
           checkPointSound.play();
         }
        if(keyDown("space") && trex.y>=361)
      {
      trex.velocityY=-14;
        jumpSound.play();
       }
      trex.velocityY=trex.velocityY+0.5;       
      if(ground.x<0)
    {
      ground.x=ground.width/2;
    }
  
    spawnClouds();
    spawnObstacles();
       if(trex.isTouching(obstacleGroup))
         {
           dieSound.play();
            gamestate=end;
         }
       
       
     }
  else if(gamestate===end)
    {
          ground.velocityX=0;
          trex.velocityY=0;
          obstacleGroup.setVelocityXEach(0);
          cloudGroup.setVelocityXEach(0);
          obstacleGroup.setLifetimeEach(-1);
          cloudGroup.setLifetimeEach(-1);
          trex.changeAnimation("stop",trex_collided);
          restrt.visible=true;
          gameOvr.visible=true;
          
      if(mousePressedOver(restrt))
   {
     reset();
   }
    
    }
   
   
     
     trex.collide(invGround);
    drawSprites();
 }


 function reset()
 {
   score=0;
   gamestate=play;
   gameOvr.visible=false;
   restrt.visible=false;
   obstacleGroup.destroyEach();
   cloudGroup.destroyEach();
   trex.changeAnimation("running",trex_run);
 }





 function spawnClouds()
 {
  if(frameCount%60===0)
    {
   cloud=createSprite(100,100,10,10);
   cloud.x=Math.round(random(300,600));
   cloud.y=Math.round(random(10,300));
   cloud.addImage(cloud1);
   cloud.velocityX=-2;
   cloud.lifetime=200;
   cloud.scale=0.5;
      
    //cloud and trex depth
      trex.depth=cloud.depth;
      cloud.depth=cloud.depth-5;
      
      cloudGroup.add(cloud);
  }
 }
 function spawnObstacles()
 {
  
  if(frameCount%120===0)
    {
   obstacle=createSprite(100,365,10,10);
   obstacle.x=Math.round(random(300,600));
  // obstacle.y=Math.round(random(10,300));
   obstacle.velocityX=-(3+score/100);
   obstacle.lifetime=300;
   obstacle.scale=0.5;
    
   var rand=Math.round(random(1,6));
   switch(rand)
     {
          case 1: obstacle.addImage(obs1);
                  break;
          case 2: obstacle.addImage(obs2);
                  break;
          case 3: obstacle.addImage(obs3);
                 break;
          case 4: obstacle.addImage(obs4);
                 break;
          case 5: obstacle.addImage(obs5);
                 break;
          case 6: obstacle.addImage(obs6);
                 break;
      }
    obstacle.debug=true;
    obstacleGroup.add(obstacle);

    }

}
