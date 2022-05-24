
var PipePair = cc.Sprite.extend({
    ctor:function() {
        this._super();
        this.x = 0;
        this.y = -Math.random() * cc.winSize.height / 20;
        this.top = new Pipe('top', this.y);
        this.bottom = new Pipe('bottom', this.y + pipeHeight + gapHeight);
        this.addChild(this.top);
        this.addChild(this.bottom);
        this.bottom.setRotation(180.0);
    },
    onEnter:function() {
        this._super();
        var moveAction= cc.MoveTo.create(5, cc.p(-1000, this.y));
        this.runAction(moveAction);
        this.scheduleUpdate();
    },
    update:function(dt){
        if(this.getPosition().x<-800){
            gameLayer.removePipe(this);
        }
    }
});
