/*jshint undef:false */
var GameScreen = AbstractScreen.extend({
    init: function (label) {
        this._super(label);
    },
    destroy: function () {
        this._super();
    },
    build: function () {
        this._super();
        this.gravity = windowHeight * 0.0001;
        this.polygonRadius = windowWidth * 0.25;
        this.sides = 7;
        this.gameContainer = new PIXI.DisplayObjectContainer();
        this.addChild(this.gameContainer);
        var assetsToLoader = ["img/assets/gameplay/dilma.png","img/assets/gameplay/cunha.png"];
        if(assetsToLoader.length > 0){
            this.loader = new PIXI.AssetLoader(assetsToLoader);
            this.initLoad();
        }else{
            this.onAssetsLoaded();
        }

        this.updateable = false;
       

    },
    showModal:function(){
    },
    hideModal:function(force){
        TweenLite.to(this.modalEnd, force?0:0.5, {alpha:0});
        TweenLite.to(this.backModal, force?0:0.5, {x:windowWidth/2 - this.backModal.width/2,
            y:windowHeight/2 - this.backModal.height/2});
    },
    createModal:function(){
        this.modalEnd = new PIXI.DisplayObjectContainer();

        this.darkBg = new PIXI.Graphics();
        this.darkBg.beginFill(0);
        this.darkBg.drawRect(0,0,windowWidth, windowHeight);
        this.modalEnd.addChild(this.darkBg);
        this.darkBg.alpha = 0.2;

        this.backModal = new PIXI.Graphics();
        this.backModal.beginFill(0x0000FF);
        this.backModal.drawRect(0,0,windowWidth/2, windowHeight*0.8);
        this.modalEnd.addChild(this.backModal);

        this.backModal.position.x = windowWidth/2 - this.backModal.width/2;
        this.backModal.position.y = windowHeight/2 - this.backModal.height/2;




        this.addChild(this.modalEnd);
    },
    onProgress:function(){

    },
    onAssetsLoaded:function()
    {
        this._super();
        this.layerManager = new LayerManager();
        this.entityLayer = new Layer("Entity");
        this.layerManager.addLayer(this.entityLayer);







         var self = this;


        function touching(target){
            target.alpha = 0.5;
            TweenLite.killTweensOf(target);
            TweenLite.to(target, 0.5, {alpha:0.1});
        }

        ///DILMAA

        this.hitTouchDilma = new PIXI.Graphics();
        this.hitTouchDilma.interactive = true;
        this.hitTouchDilma.beginFill(0xFF0000);
        this.hitTouchDilma.drawRect(0,0,windowWidth/2, windowHeight);
        this.addChild(this.hitTouchDilma);
        this.hitTouchDilma.alpha = 0.1;
        this.hitTouchDilma.hitArea = new PIXI.Rectangle(0, 0, windowWidth, windowHeight);

        this.hitTouchDilma.mousemove = this.hitTouchDilma.touchmove = function(touchData){

        };
        this.hitTouchDilma.mousedown = this.hitTouchDilma.touchstart = function(touchData){
            console.log("dilma")

            touching(self.hitTouchDilma);
            self.dilmaLife --;
            if(self.dilmaLife <= 0){
                console.log("PERDEU DILMA")
            }
        };
        this.hitTouchDilma.mouseup = this.hitTouchDilma.touchend = function(touchData){
            
        };

        this.dilma = new Dilma("img/assets/gameplay/dilma.png");
        this.entityLayer.addChild(this.dilma);
        this.dilma.minPos = this.dilma.getContent().width * 0.3;
        this.dilma.getContent().position.x = this.dilma.minPos;
        this.dilma.maxPos = this.dilma.getContent().width * 0.4;

        ///CUNHAAA

        this.hitTouchCunha = new PIXI.Graphics();
        this.hitTouchCunha.interactive = true;
        this.hitTouchCunha.beginFill(0x0000FF);
        this.hitTouchCunha.drawRect(windowWidth/2,0,windowWidth/2, windowHeight);
        this.addChild(this.hitTouchCunha);
        this.hitTouchCunha.alpha = 0.1;
        this.hitTouchCunha.hitArea = new PIXI.Rectangle(windowWidth/2, 0, windowWidth, windowHeight);

        this.hitTouchCunha.mousemove = this.hitTouchCunha.touchmove = function(touchData){

        };
        this.hitTouchCunha.mousedown = this.hitTouchCunha.touchstart = function(touchData){
            console.log("cunha")
            touching(self.hitTouchCunha);
            self.cunhaLife --;
            if(self.cunhaLife <= 0){
                console.log("PERDEU CUNHA")
            }
        };
        this.hitTouchCunha.mouseup = this.hitTouchCunha.touchend = function(touchData){
            
        };




        this.cunha = new Dilma("img/assets/gameplay/cunha.png");
        this.entityLayer.addChild(this.cunha);
        this.cunha.getContent().position.x = windowWidth - this.cunha.getContent().width;
        this.cunha.maxPos = windowWidth / 2 + this.cunha.getContent().width * 0.2;
        this.cunha.minPos = windowWidth / 2 + this.cunha.getContent().width * 1.5;






        ////////
        this.currentTime = 0;


        this.timerLabel = new PIXI.Text("00", {font:"50px Arial", fill:"black"});
        this.addChild(this.timerLabel);

        this.interval = setInterval(function(){
            self.currentTime++;

            var nextVal = "00";
            if(self.currentTime < 10){
                nextVal = "0" + self.currentTime
            }else{
                nextVal = self.currentTime
            }
            self.timerLabel.setText(nextVal);
            // console.log(self.currentTime)

        },1000);

        this.dilmaMaxLife = this.dilmaLife = 100;
        
        this.cunhaMaxLife = this.cunhaLife = 100;

        this.dilmaBarView = new BarView(windowWidth/2 * 0.8,windowHeight*0.05,this.dilmaMaxLife,this.dilmaLife);
        this.dilmaBarView.getContent().position.x = windowWidth/2 * 0.1;
        this.dilmaBarView.getContent().position.y = windowHeight*0.05 * 0.5;
        this.addChild(this.dilmaBarView)

        this.cunhaBarView = new BarView(windowWidth/2 * 0.8,windowHeight*0.05,this.cunhaMaxLife,this.cunhaLife);
        this.cunhaBarView.getContent().position.x = windowWidth/2 * 0.1 + windowWidth/2;
        this.cunhaBarView.getContent().position.y = windowHeight*0.05 * 0.5;
        this.addChild(this.cunhaBarView)



        this.gameContainer.addChild(this.layerManager.getContent());
        
        
        this.createModal();
        this.hideModal();
        








        this.updateable = true;
    },
    update:function()
    {
        if(!this.updateable){
            return;
        }
        this.dilmaBarView.updateBar(this.dilmaLife,this.dilmaMaxLife)
        this.cunhaBarView.updateBar(this.cunhaLife,this.cunhaMaxLife)

        this.timerLabel.position.x = windowWidth/2 - this.timerLabel.width /2;
        if(this.layerManager){
            this.layerManager.update();
        }
    },
});
