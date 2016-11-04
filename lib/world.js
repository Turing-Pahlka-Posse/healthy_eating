var Player = require('./player');
var Obstacle = require('./obstacle');

function World(height, width, canvas) {
  this.canvas = canvas;
  this.height = height || 500;
  this.width = width || 700;
  this.playerImage = new Image();
  this.playerImage.src = './lib/imgs/googlyfish.png';
  this.milksplatImage = new Image();
  this.milksplatImage.src = './lib/imgs/milksplat.svg';
  this.appleImage = new Image();
  this.appleImage.src = './lib/imgs/apple.jpg'
  this.rockTexture = new Image();
  this.rockTexture.src = './lib/imgs/rocktexture-sm.png';
  this.waterTexture = new Image();
  this.waterTexture.src = './lib/imgs/cafefloor.png';
  this.playerFish = new Player(this.canvas,null,null,null,null,"image", this.playerImage);//Player(canvas, x, y, height, width, type, image)
  this.playerHitBoxes = [];
  this.healthyFoodImageOptions = [];
  this.ceiling = [];
  this.floor = [];
  this.rocks = [];
  this.powerUps = [];
  this.milksplats = [];
  this.healthyFood = [];
  this.obstacleWidth = 20;
  this.numberOfWallSections = Math.floor(this.width/this.obstacleWidth + 3);

  this.init = function(speed){
    this.initHitBoxes();
    this.clearWorld();
    this.drawBackground();
    this.initObstacles(speed);
    this.playerHitBoxes.forEach(function(hitBox){
        return hitBox.draw;
    });
    this.playerFish.draw();
    this.renderStartText();
    this.initHealthyFoodImages();
  };

  this.initHitBoxes = function(){
    this.playerHitBoxes[0] = new Player(this.canvas, 185, 265, 15, 90, "box");
    this.playerHitBoxes[1] = new Player(this.canvas, 200, 255, 20, 65, "box");
    this.playerHitBoxes[2] = new Player(this.canvas, 210, 265, 20, 50, "box");
  };

  this.initObstacles = function(speed){
    for(var i = 0; i < this.numberOfWallSections; i++){
      this.ceiling.push(new Obstacle(this.canvas, this.playerHitBoxes, i*this.obstacleWidth, 0, 20, this.obstacleWidth, speed, 'walls',this.rockTexture));
      this.floor.push(new Obstacle(this.canvas, this.playerHitBoxes, i*this.obstacleWidth, this.height-80, 20, this.obstacleWidth, speed, 'walls',this.rockTexture));
    }
    this.drawObstacles();
  };

  this.initHealthyFoodImages = function(){
    this.healthyFoodImageOptions=[
      './lib/imgs/apple.png',
      './lib/imgs/artichoke.png',
      './lib/imgs/banana.png',
      './lib/imgs/beet.png',
      './lib/imgs/blueberries.png',
      './lib/imgs/broccoli.png',
      './lib/imgs/carrot.png',
      './lib/imgs/cherry.png',
      './lib/imgs/cucumber.png',
      './lib/imgs/eggplant.png',
      './lib/imgs/grape.png',
      './lib/imgs/onion.png',
      './lib/imgs/orange.png',
      './lib/imgs/peas.png',
      './lib/imgs/radish.png']
  }

  this.reset = function(){
    this.clearWorld();
    this.ceiling = [];
    this.floor = [];
    this.rocks = [];
    this.playerFish = new Player(this.canvas,null,null,null,null,"image", this.playerImage);
    this.initHitBoxes();
    this.drawBackground();
    this.initObstacles();
    this.draw();
    this.playerFish.draw();
  };

  this.moveObstacles = function(){
    for(var i = 0; i < this.numberOfWallSections; i++){
      this.ceiling[i].move();
      this.floor[i].move();
    }
    for(var j = 0; j < this.rocks.length; j++){
      this.rocks[j].move();
    }
  };

  this.checkCollisions = function(){
    var collision = false;

    for(var j = 0; j < this.rocks.length; j++){
      collision = this.rocks[j].collisionDetectAllBoxes();
      if(collision === true){
        return collision;
      }
    }
    return collision;
  };

  this.checkStatusToShiftNewWalls = function (newWallHeight, speed, viewMode){
    if(this.ceiling[this.numberOfWallSections-1].x < (this.width-this.obstacleWidth+1)){
      this.shiftWalls(newWallHeight, speed, viewMode);
    }
  };

  this.shiftWalls = function(newHeight, speed, viewMode){
      this.ceiling.shift();
      this.ceiling.push(new Obstacle(this.canvas, this.playerHitBoxes, this.width-1, 0, newHeight, this.obstacleWidth, speed, viewMode, this.rockTexture));
      this.floor.shift();
      this.floor.push(new Obstacle(this.canvas, this.playerHitBoxes, this.width-1, this.height-newHeight-60, newHeight, this.obstacleWidth, speed, viewMode, this.rockTexture));
  };

  this.loadImages = function(){
    this.playerImage.src = './lib/imgs/googlyfish.png';
    this.rockTexture.src = './lib/imgs/rocktexture-sm.png';
    this.waterTexture.src = './lib/imgs/cafefloor.png';
    this.appleImage.src = './lib/imgs/apple.jpg';
    this.milksplatImage.src = './lib/imgs/milksplat.svg';
  };

  this.renderStartText = function(){
    var startText = "Press Spacebar to Start and Play";
    this.canvas.fillStyle = 'purple';
    this.canvas.font = '35px "Trebuchet MS"';
    this.canvas.fillText(startText, 120, 180);
  };

  this.renderEndText = function(){
    var endText1 = "Sorry, you died.";
    var endText2 = "Press Spacebar to Play Again";
    this.canvas.fillStyle = 'FireBrick';
    this.canvas.font = '35px "Trebuchet MS"';
    this.canvas.fillText(endText1, 210, 200);
    this.canvas.fillText(endText2, 120, 250);
  };

  this.generateNewRockY = function(rockHeight){
    var min = this.ceiling[this.numberOfWallSections-1].height;
    var max = this.floor[this.numberOfWallSections-1].y-rockHeight;
    return Math.random()*(max-min)+min;
  };

  this.createNewRock = function(rainbowMode, newRockHeight, speed){
    if(rainbowMode === true){
      this.rocks.push(new Obstacle(this.canvas, this.playerHitBoxes, 700, this.generateNewRockY(newRockHeight), newRockHeight, 10, speed, 'rainbow'));
    }else{
      this.rocks.push(new Obstacle(this.canvas, this.playerHitBoxes, 700,this.generateNewRockY(newRockHeight), newRockHeight, 10, speed, 'rocks', this.rockTexture));
    }
  };

  this.generateNewMilksplatY = function(){
      var min = this.ceiling[20].height;
      var max = this.floor[20].y-32;//change to height of Milksplat image
      return Math.random()*(max-min)+min;
    };

  this.createNewMilksplat = function(speed){
    this.milksplats.shift();
    console.log('test');
    this.milksplats.push(new Obstacle(this.canvas, this.playerHitBoxes, 700, this.generateNewMilksplatY(), 90, 90, speed, 'obstacle', this.milksplatImage));
  };

  this.generateNewHealthyFoodX = function(){

      var topBottom = Math.floor(Math.random()*(2-0)+0);
      console.log(topBottom)
      var min;
      var max;

      if(topBottom === 1){
        min = 0;
        max = this.ceiling[20].height-50;
      } else {
        min = this.floor[20].y;
        max = this.height-50;
      }

      return Math.random()*(max-min)+min;
    };

  this.chooseRandomHealthyFood = function(){
    min = 0;
    max = this.healthyFoodImageOptions.length;
    console.log(this.healthyFoodImageOptions);

    var randomInt = Math.floor(Math.random()*(max - min)+ min)

    var foodImage = new Image()
    foodImage.src = this.healthyFoodImageOptions[randomInt]

    console.log(randomInt)
    console.log(foodImage)
    return foodImage;
  }

  this.createNewHealthyFood = function(speed){
    this.healthyFood.push(new Obstacle(this.canvas, this.playerHitBoxes, 700, this.generateNewHealthyFoodX(), 50, 50, speed, 'obstacle', this.chooseRandomHealthyFood()));
  };

  this.drawHealthyFood = function(){
    for(var i = 0; i < this.healthyFood.length; i++){
      this.healthyFood[i].draw();
    }
  };

  this.moveHealthyFood = function(){
    for(var i = 0; i < this.healthyFood.length; i++){
      this.healthyFood[i].move();
    }
  };

  this.drawMilksplats = function(){
    for(var i = 0; i < this.milksplats.length; i++){
      this.milksplats[i].draw();
    }
  };

  this.moveMilksplats = function(){
    for(var i = 0; i < this.milksplats.length; i++){
      this.milksplats[i].move();
    }
  };

  this.checkIfFishAteMilksplat = function(){
    var ateMilksplat = false;

    for(var i = 0; i < this.milksplats.length; i++){
      ateMilksplat = this.milksplats[i].collisionDetectAllBoxes();
      if(ateMilksplat === true){
        this.milksplats.splice(this.milksplats[i].indexOf);
      }
    }
    return ateMilksplat;
  };

  this.checkIfFishAteHealthyFood = function(){
    var ateHealthyFood = false;

    for(var i = 0; i < this.healthyFood.length; i++){
      ateHealthyFood = this.healthyFood[i].collisionDetectAllBoxes();
      if(ateHealthyFood === true){
        this.healthyFood.splice(this.healthyFood[i].indexOf, 1);
      }
    }
    return ateHealthyFood;
  };

  this.clearWorld = function(){
    this.canvas.clearRect(0,0,this.width, this.height);
  };

  this.drawObstacles = function(){
    for(var i = 0; i < this.numberOfWallSections; i++){
      this.ceiling[i].draw();
      this.floor[i].draw();
    }
    for(var j = 0; j < this.rocks.length; j++){
      this.rocks[j].draw();
    }
  };

  this.drawBackground = function(){
    var waterTexture = this.canvas.createPattern(this.waterTexture, 'repeat');
      this.canvas.clearRect(0,0,this.width, this.height);
      this.canvas.fillStyle = waterTexture;
      this.canvas.fillRect(0,0,this.width, this.height-80);
  };

  this.move = function(){
    //every frame move
    // this.playerHitBoxes.forEach(function(hitBox){
    //      return hitBox.moveDown();
    // });
    // this.playerFish.moveDown();
    //
    this.moveObstacles();
    this.moveMilksplats();
    this.moveHealthyFood();

  };

  this.draw = function(){
    this.playerHitBoxes.forEach(function(hitBox){
        return hitBox.draw();
    });
    this.drawBackground();
    this.drawMilksplats();
    this.drawObstacles();
    this.drawHealthyFood();
    this.playerFish.draw();
  };
}

module.exports = World;
