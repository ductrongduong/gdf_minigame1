var background;
var gameLayer;
var scrollSpeed = 2;
var backgroundLoopingPoint = 413;
var bird;
var gameGravity = -0.05;
var gameThrust = .4;


var gameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        gameLayer = new game();
        gameLayer.init();
        this.addChild(gameLayer);
    }
});
var game = cc.Layer.extend({
    init:function () {
        this._super();
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: function(event){
                bird.engineOn = true;
            },
            onMouseUp: function(event){
                bird.engineOn = false;
            }
        },this)
        background = new ScrollingBG();
        this.addChild(background);
        this.scheduleUpdate();
        this.schedule(this.addPipe(),0.5);
        bird = new Bird();
        this.addChild(bird);
    },
    update:function(dt){
        background.scroll();
        bird.updateY();
    },
    addPipe:function(event){
        var pipe = new Pipe();
        this.addChild(pipe,1);
    },
    removePipe:function(pipe){
        this.removeChild(pipe);
    }
});
var ScrollingBG = cc.Sprite.extend({
    ctor:function() {
        this._super();
        this.initWithFile("assests/background.png");
    },
    onEnter:function() {
        this.setPosition(backgroundLoopingPoint,160);
    },
    scroll:function(){
        this.setPosition(this.getPosition().
            x-scrollSpeed,this.getPosition().y);
        if(this.getPosition().x<0){
            this.setPosition(this.getPosition().x+backgroundLoopingPoint,this.getPosition().y);
        }
    }
});

var Bird = cc.Sprite.extend({
    ctor:function() {
        this._super();
        this.initWithFile("assests/bird.png");
        this.ySpeed = 0;
        this.engineOn = false;
    },
    onEnter:function() {
        this.setPosition(60,160);
    },
    updateY:function() {
        if(this.engineOn){
            this.ySpeed += gameThrust;
        }
        this.setPosition(this.getPosition().x,this.getPosition().y+this.
            ySpeed);
        this.ySpeed += gameGravity;
    }
});

var Pipe = cc.Sprite.extend({
    ctor:function() {
        this._super();
        this.initWithFile("assests/pipe.png");
    },
    onEnter:function() {
        this._super();
        this.setPosition(200,Math.random()*320);
        var moveAction= cc.MoveTo.create(0, cc.p(-100, this.getY()));
        this.runAction(moveAction);
        this.scheduleUpdate();
    },
    update:function(dt){
        if(this.getPosition().x<-50){
            gameLayer.removePipe(this)
        }
    }
});
