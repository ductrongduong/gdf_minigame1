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
            this.ySpeed = GAME_THRUST;
            this.engineOn = false;
        }
        if(this.invulnerability>0){
            this.invulnerability --;
            this.setOpacity(255-this.getOpacity());
        }
        if (this.y > cc.winSize.height) {
            this.setPosition(this.getPosition().x,cc.winSize.height);
        }
        else
            this.setPosition(this.getPosition().x,this.getPosition().y+this.ySpeed);
        this.ySpeed += GAME_GRAVITY;
        // console.log(this.ySpeed);
        if (this.ySpeed > 0) {
            this.setRotation(-35);
        }
        // else if (this.ySpeed > -3.5 && this.ySpeed < -3.5+0.14) {
        //     audioEngine.playEffect('assests/swooshing.wav');
        // }
        else {
            this.setRotation(35);
        }
    }
});