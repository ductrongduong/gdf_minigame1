var background;
var gameLayer;
var SCROLL_SPEED = 2;
var BACKGROUND_LOOPING_POINT = 413;
var bird;
var GAME_GRAVITY = -0.11;
var GAME_THRUST = 2.5;
var size = cc.director.getWinSize();
var GAP_HEIGHT = 90;
var PIPE_HEIGHT = 288;
var pipeWidth = 70;
var score = 0;
var scoreText;
var restartSprite = new RestartSprite();

