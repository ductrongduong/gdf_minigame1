cc.game.onStart = function(){
    cc.view.setDesignResolutionSize(512, 288, cc.ResolutionPolicy.SHOW_ALL);
    cc.LoaderScene.preload(gameResources, function () {
        cc.director.runScene(new gameScene());
    }, this);
};
cc.game.run();