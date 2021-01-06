var dog,happydDog,washroom,Living,milk,Milk;
var database,foodStock,foodS;


function preload(){
  dogimg = loadImage("images/dogImg.png");
  dogimg2 = loadImage("images/dogImg1.png");
  washroom = loadImage("images/Wash Room.png");
  Living = loadImage("images/Living Room.png");
  milk = loadImage("images/milk.png");
}

function setup() {
  var canvas = createCanvas(1000,800);
  
  database = firebase.database();
  foodStock = database.ref('food');
  foodStock.on("value",readStock)
  foodStock.set(20)
  dog = createSprite(700,400,10,100);
  dog.addImage(dogimg);
  dog.scale = 1.1;
  
    
  
}
 
function draw() {  
background("pink");

  
  if(foodS !== undefined){
  fill("black");
  textSize(22);
  stroke(100);
  text("PRESS UP ARROW KEY TO FEED  MILK ",10,100);
  text("food remaining :"+foodS,10,150)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogimg2);
  }
  
     
  if(keyWentUp(UP_ARROW)){
    
    dog.addImage(dogimg);
    
  
  }
  
    
  }
  if(foodS === 0){
  dog.addImage(washroom);
  dog.scale =1.2;
  textSize(25);
  fill("green")
  text("now i want to go to the washroom ..",20,190)
  text("okay bye i am going..",20,230)
  text (" and thank you for feeding me !!",20,280)
  }
  
if(foodS === 20){
  dog.addImage(Living);
  textSize(20);
  fill("red");
  text("Hi I am scoobie..",10,190)
  text("I am  hungry .Can u feed me :(",10,230)
}

  if(foodS === 19){
     textSize(15)
     fill("red")
     text("milk is yummy . ty :)..",220,200)
  }
  if(foodS === 19 ){
    push();
    Milk = createSprite(300,500,10,10);
    Milk.addImage(milk)
    Milk.scale = 0.5;
  }
  
 
  
  drawSprites();
}

function writeStock(x){
 if(x<=0){
  x = 0
 }else{
   x = x-1
 }
 database.ref("/").update({
   food:x
 })

 
  }
function readStock(data){
  foodS=data.val();
}



