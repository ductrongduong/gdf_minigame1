
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
        this.schedule(this.addPipe,3);
        bird = new Bird();
        this.addChild(bird);
    },
    update:function(dt){
        background.scroll();
        bird.updateY();
    },
    addPipe:function(event){
        var pipes = new PipePair();
        this.addChild(pipes, 1);
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




