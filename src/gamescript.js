
var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        audioEngine = cc.AudioEngine.getInstance();
        gameLayer = new Game();
        gameLayer.init();
        this.addChild(gameLayer);
    }
});
var Game = cc.Layer.extend({
    audioEngine:null,
    init:function () {
        this._super();
        isGameRunning = true;
        // this.isRunningGame = true;
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: function(event){
                bird.engineOn = true;
                audioEngine.playEffect('assests/wing.wav');
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
        bird.zIndex = 2;


        //add score
        scoreText = cc.LabelTTF.create('Score : 0',  'Times New Roman', 25, cc.size(100,100), cc.TEXT_ALIGNMENT_LEFT);
        scoreText.zIndex = 10;
        this.addChild(scoreText);
        scoreText.setPosition(cc.winSize.width / 2, cc.winSize.height * 3 / 4);
        scoreText.setGlobalZOrder(1);

    },

    // onEnter: function () {
    //     this.audioEngine = cc.AudioEngine.getInstance();
    // },
    // stopGame: function () {
    //      this.isRunningGame = false;
    // },
    update:function(dt){
        // if (!this.isRunningGame)
        //     return;
        if (isGameRunning) {
            background.scroll();
        }
        bird.updateY();
    },
    addPipe:function(event){
        if (isGameRunning) {
            var pipes = new PipePair();
            this.addChild(pipes, 1);
            pipes.setGlobalZOrder(2);
        }
    },
    removePipe:function(pipe){
        this.removeChild(pipe);
    },
    removeBird:function (bird) {
        this.removeChild(bird);
    },
    playSoundDie:function(){
        this.audioEngine.playMusic("assests/die.wav", true);
    },
    playSoundHit:function(){
        this.audioEngine.playMusic("assests/hit.wav");
    },
    playSoundPoint:function(){
        this.audioEngine.playMusic("assests/point.wav");
    },
});
//hello
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
        if(this.getPosition().x<0){
            this.setPosition(this.getPosition().x+BACKGROUND_LOOPING_POINT,this.getPosition().y);
        }
    }
});




