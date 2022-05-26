var RestartSprite = cc.Sprite.extend({
    ctor:function() {
        this._super();
        this.initWithFile("assests/bird.png");
        cc.eventManager.addListener(listener.clone(), this);
    },
});

var listener = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();
        var location = target.convertToNodeSpace(touch.getLocation());
        var targetSize = target.getContentSize();
        var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
        if (cc.rectContainsPoint(targetRectangle, location)) {
            // console.log("Picked bird");
            cc.director.runScene(new GameScene());
        }
        return true;
    }
})