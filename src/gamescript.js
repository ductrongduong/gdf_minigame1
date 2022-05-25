
var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        gameLayer = new Game();
        gameLayer.init();
        this.addChild(gameLayer);
    }
});
var Game = cc.Layer.extend({
    init:function () {
        this._super();
        this.isRunningGame = true;
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
        this.schedule(this.addPipe,1.5);
        bird = new Bird();
        this.addChild(bird);
    },
    stopGame: function () {
         this.isRunningGame = false;
    },
    update:function(dt){
        if (!this.isRunningGame)
            return;
        background.scroll();
        bird.updateY();

    },
    addPipe:function(event){
        var pipes = new PipePair();
        if (gameLayer.isRunningGame) {
            this.addChild(pipes, 1);
        }
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
        this.setPosition(BACKGROUND_LOOPING_POINT,160);
    },
    scroll:function(){
        this.setPosition(this.getPosition().
            x-SCROLL_SPEED,this.getPosition().y);
        if(this.getPosition().x<0 && gameLayer.isRunningGame){
            this.setPosition(this.getPosition().x+BACKGROUND_LOOPING_POINT,this.getPosition().y);
        }
    }
});




