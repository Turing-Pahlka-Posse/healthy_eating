var $ = require('jquery');
var Game = require('./game');

var canvas = document.getElementById('world');
var world = canvas.getContext('2d');
var $document = $(document);

var upSound = new Audio('./lib/audio/upSound.mp3');
var game = new Game(world);

  // tweezer.play();

// var timeoutMouse;
var timeoutSpacebar;
var spacebarPressed = false;
var keyUpPressed = false;
var keyDownPressed = false;

$document.ready(function(){
  game.world.loadImages();
  game.init();
  canvas.click();
});


$document.keydown(function(e){
  //if up is pressed
  if (e.keyCode === 38) {
   console.log('up was pressed')
   e.preventDefault();
     if(keyUpPressed === false){
       keyUpPressed = true;
       game.arrowUp();
       timeoutSpacebar = setInterval(function(){
          game.arrowUp();
        },8);
     }
   }

   if (e.keyCode === 40) {
    console.log('down was pressed')
    e.preventDefault();
      if(keyDownPressed === false){
        keyDownPressed = true;
        game.arrowDown();
        timeoutSpacebar = setInterval(function(){
           game.arrowDown();
         },8);
      }
    }
});

$document.keypress(function(e){
  console.log(e.keyCode)
  //if spacebar is pressed
  if (e.keyCode === 0 || e.keyCode === 32) {
   e.preventDefault();
     if(spacebarPressed === false){
       spacebarPressed = true;
       game.spacebarDown();
       gameLoop();
       timeoutSpacebar = setInterval(function(){
          game.spacebarDown();
        },8);
     }
   }
});

$document.keyup(function(e){
  if (e.keyCode === 0 || e.keyCode === 32 || e.keyCode === 38 || e.keyCode === 40) {
   e.preventDefault();
   spacebarPressed = false;
   keyUpPressed = false;
   keyDownPressed = false;
   clearInterval(timeoutSpacebar);
   game.spacebarUp();
 }
});


var gameLoop = function() {
  if(game.start === true){
    game.start = false;
    requestAnimationFrame(function loop(){
      game.gameFrame();
      if(game.running === true){
        requestAnimationFrame(loop);
      }else{
        game.world.renderEndText();
      }
    });
  }
};
