var Pipe = cc.Sprite.extend({
    ctor:function(orientation, y) {
        this._super();
        this.initWithFile("assests/pipe.png");
        this.x = cc.winSize.width;
        this.y = y;
        this.orientation = orientation;
    },
    onEnter:function() {
        // this._super();
        // var moveAction= cc.MoveTo.create(5, cc.p(-100, this.y));
        // this.runAction(moveAction);
        // this.scheduleUpdate();
    },
    update:function(dt){
        if(this.getPosition().x<-50){
            gameLayer.removePipe(this);
        }
    }
});