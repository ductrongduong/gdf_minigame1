
var PipePair = cc.Sprite.extend({
    ctor:function() {
        this._super();
        this.x = 0;
        this.y = 0;
        this.bottom = new Pipe('bottom', Math.random() * cc.winSize.height / 2 - PIPE_HEIGHT/2);
        this.top = new Pipe('top', this.bottom.y + PIPE_HEIGHT + GAP_HEIGHT);
        this.addChild(this.top);
        this.addChild(this.bottom);
        this.top.setRotation(180.0);
        this.isPassed = false;
        // cc.log("test 1", JSON.stringify(Utinity.getWorldPositionOfNode(this.top)));
        // cc.log("test 2", JSON.stringify(Utinity.getWorldPositionOfNode(this.bottom)));
    },
    onEnter:function() {
        this._super();
        var moveAction= cc.MoveTo.create(5, cc.p(-1000, this.y));
        this.runAction(moveAction);
        // if (!gameLayer.isRunningGame) {
        //     this.stopAllActions();
        // }
        this.scheduleUpdate();
    },


    update:function(dt){
        var birdBoundingBox = bird.getBoundingBox();
        // cc.log("test 1", JSON.stringify(birdBoundingBox));
        var topBoundingBox = this.top.getBoundingBox();
        var bottomBoundingBox = this.bottom.getBoundingBox();
        var topConverted = Utinity.getWorldPositionOfNode(this.top);
        var bottomConverted = Utinity.getWorldPositionOfNode(this.bottom);
        // console.log(JSON.stringify(topConverted));
        // console.log(JSON.stringify(birdBoundingBox));
        birdBoundingBox.x -= birdBoundingBox.width/2; birdBoundingBox.y -= birdBoundingBox.height/2;
        topBoundingBox.x= topConverted.x; topBoundingBox.y = topConverted.y;
        topBoundingBox.x -= topBoundingBox.width/2; topBoundingBox.y -= topBoundingBox.height/2;
        bottomBoundingBox.x= bottomConverted.x; bottomBoundingBox.y = bottomConverted.y;
        bottomBoundingBox.x -= bottomBoundingBox.width/2; bottomBoundingBox.y -= bottomBoundingBox.height/2;
        bottomBoundingBox.height -= 25;
        bottomBoundingBox.width -= 20;

        if (birdBoundingBox.x > topBoundingBox.x && !this.isPassed) {
            score++;
            scoreText.setString("Score: "+ score);
            console.log(JSON.stringify(score));
            this.isPassed = true;
        }

        if ((cc.rectIntersectsRect(birdBoundingBox, bottomBoundingBox) || cc.rectIntersectsRect(birdBoundingBox, topBoundingBox)) && bird.invulnerability==0) {
            // this.stopAllActions();
            var listChild = gameLayer.getChildren();
            for (var i in listChild) {
                listChild[i].stopAllActions();
            }
            pauseGame();
            var buttonPause = ccui.Button.create();
            buttonPause.setTitleText("Restart game");
            buttonPause.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
            buttonPause.setTitleFontSize(20);
            buttonPause.addClickEventListener(restartGame);
            gameLayer.addChild(buttonPause);
        }

        if(this.getPosition().x<-800){
            // console.log("Remove Pipe");
            gameLayer.removePipe(this);
        }
    }
});

function pauseGame() {
    gameLayer.pause();
}

function restartGame() {
    // gameLayer.stopGame();
    score = 0;
    cc.director.runScene(new GameScene());

}
