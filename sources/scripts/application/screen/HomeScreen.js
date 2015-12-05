/*jshint undef:false */
var HomeScreen = AbstractScreen.extend({
    init: function (label) {
        this._super(label);

    },
    destroy: function () {
        this._super();
    },
    build: function () {
        this._super();
        

        var self = this;

        

        var assetsToLoader = [
        "img/assets/home/background.png","img/assets/modal_buttons/button_2.png"];
        if(assetsToLoader.length > 0){
            this.loader = new PIXI.AssetLoader(assetsToLoader);
            this.initLoad();
        }else{
            this.onAssetsLoaded();
        }
    },
    onProgress:function(){

    },
    onAssetsLoaded:function()
    {
        this._super();



        this.bg = new SimpleSprite("img/assets/home/background.png");
        this.addChild(this.bg.getContent());
        this.bg.getContent().width = windowWidth;
        this.bg.getContent().height = windowHeight;

        this.screenContainer = new PIXI.DisplayObjectContainer();
        this.addChild(this.screenContainer);


        this.imgScr = new SimpleSprite("img/assets/modal_buttons/button_2.png");
        this.screenContainer.addChild(this.imgScr.getContent());

        var self = this;
        this.imgScr.getContent().interactive = true;
        this.imgScr.getContent().buttonMode = true;
        this.imgScr.getContent().touchstart = this.imgScr.getContent().mousedown = function(mouseData){
            self.screenManager.change('Game');
        };

        this.cas = new PIXI.Text("JOGAR", {font:"40px barrocoregular", fill:"white", stroke:"#ff6e36", strokeThickness: 0});
        this.screenContainer.addChild(this.cas);
        this.cas.position.x = this.imgScr.getContent().width / 2 - this.cas.width / 2;
        this.cas.position.y = this.imgScr.getContent().height / 2 - this.cas.height / 2;
        this.screenContainer.position.x = windowWidth - this.screenContainer.width * 1.2;
        this.screenContainer.position.y = windowHeight - this.screenContainer.height * 1.3;

    },
    update:function()
    {
    }
});
