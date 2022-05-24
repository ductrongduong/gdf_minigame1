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