var Bird = cc.Sprite.extend({
    ctor:function() {
        this._super();
        this.initWithFile("assests/bird.png");
        this.ySpeed = 0;
        this.engineOn = false;
        this.invulnerability = 0;
        // this.setRotation(-45);
    },
    onEnter:function() {
        this.setPosition(60,160);
    },
    updateY:function() {
        if(this.engineOn){
            this.ySpeed += GAME_THRUST;
        }
        if(this.invulnerability>0){
            this.invulnerability --;
            this.setOpacity(255-this.getOpacity());
        }
        this.setPosition(this.getPosition().x,this.getPosition().y+this.ySpeed);
        this.ySpeed += GAME_GRAVITY;
        if (this.ySpeed > 0) {
            this.setRotation(-45);
        }
        else if (this.ySpeed == 0) {

        }
        else {
            this.setRotation(45);
        }
    }
});