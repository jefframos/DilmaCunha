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
        var assetsToLoader = [
        "img/assets/modal_buttons/button_1.png",
        "img/assets/modal_buttons/button_2.png",
        "img/assets/modal_buttons/modal.png",
        "img/assets/modal_buttons/back.png",

        "img/assets/gameplay/cunha.png",
        "img/assets/modal_buttons/timer.png",
        "img/assets/modal_buttons/timer.png",
        "img/assets/background_gameplay/raio.png",
        "img/assets/personagens/cunha/corpo.png",
        "img/assets/personagens/cunha/head1.png",
        "img/assets/personagens/cunha/head2.png",
        "img/assets/personagens/cunha/head3.png",
        "img/assets/personagens/cunha/head4.png",
        "img/assets/personagens/dilma/corpo.png",
        "img/assets/personagens/dilma/head1.png",
        "img/assets/personagens/dilma/head2.png",
        "img/assets/personagens/dilma/head3.png",
        "img/assets/personagens/dilma/head4.png",
        "img/assets/background_gameplay/cunha.png",
        "img/assets/background_gameplay/dilma.png"];
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
        this.darkBg.alpha = 0.5;


        this.backModal = new SimpleSprite("img/assets/modal_buttons/modal.png");
        this.modalEnd.addChild(this.backModal.getContent());

        scaleConverter(this.backModal.getContent().height, windowHeight, 0.7, this.backModal.getContent());
        this.backModal.getContent().position.x = windowWidth/2 - this.backModal.getContent().width/2;
        this.backModal.getContent().position.y = windowHeight/2 - this.backModal.getContent().height/2;

        this.button1 = new Button1();
        scaleConverter(this.button1.getContent().width, this.backModal.getContent().width, 0.7, this.button1.getContent());
        this.button1.getContent().position.x = windowWidth/2 - this.button1.getContent().width/2;
        this.button1.getContent().position.y = windowHeight/2 + this.button1.getContent().height/2;
        this.modalEnd.addChild(this.button1.getContent());
        this.button1.setRandomText();

        this.button2 = new Button2();
        scaleConverter(this.button2.getContent().width, this.backModal.getContent().width, 0.5, this.button2.getContent());
        this.button2.getContent().position.x = windowWidth/2 - this.button2.getContent().width/2;
        this.button2.getContent().position.y = this.button1.getContent().position.y + this.button1.getContent().height + this.button2.getContent().height/3;
        this.modalEnd.addChild(this.button2.getContent());
        this.button2.setRandomText();

        this.addChild(this.modalEnd);
    },
    onProgress:function(){

    },
    onAssetsLoaded:function()
    {
        this._super();
        this.layerManager = new LayerManager();
        this.entityLayer = new Layer("Entity");
        







        var self = this;


        function touching(target){
            target.alpha = 0.5;
            TweenLite.killTweensOf(target);
            TweenLite.to(target, 0.5, {alpha:0.1});
        }

        ///DILMAA


        this.dilmaBg = new SimpleSprite("img/assets/background_gameplay/dilma.png");
        this.dilmaBg.getContent().width = windowWidth/2;
        this.dilmaBg.getContent().height = windowHeight;
        this.gameContainer.addChild(this.dilmaBg.getContent());


        this.hitTouchDilma = new PIXI.Graphics();
        this.hitTouchDilma.interactive = true;
        this.hitTouchDilma.beginFill(0xFF0000);
        this.hitTouchDilma.drawRect(0,0,windowWidth/2, windowHeight);
        this.gameContainer.addChild(this.hitTouchDilma);
        this.hitTouchDilma.alpha = 0.1;
        this.hitTouchDilma.hitArea = new PIXI.Rectangle(0, 0, windowWidth, windowHeight);

        
        

        this.hitTouchDilma.mousemove = this.hitTouchDilma.touchmove = function(touchData){

        };
        this.hitTouchDilma.mousedown = this.hitTouchDilma.touchstart = function(touchData){
            console.log("dilma")

            touching(self.hitTouchDilma);
            self.dilmaLife --;
            self.dilma.hurt();


            self.xinga(1);


            if(self.dilmaLife <= 0){
                console.log("PERDEU DILMA")
            }
        };
        this.hitTouchDilma.mouseup = this.hitTouchDilma.touchend = function(touchData){
            
        };

        this.dilma = new Dilma("img/assets/personagens/dilma/corpo.png", ["img/assets/personagens/dilma/head1.png",
        "img/assets/personagens/dilma/head2.png",
        "img/assets/personagens/dilma/head3.png",
        "img/assets/personagens/dilma/head4.png"], {x:-150, y:200});
        this.entityLayer.addChild(this.dilma);
        this.dilma.minPos = windowWidth / 2 - windowWidth/2.5;
        this.dilma.maxPos =  windowWidth / 2 - windowWidth/3;
        this.dilma.getContent().position.x = this.dilma.maxPos + Math.random((this.dilma.maxPos - this.dilma.minPos) / 2);

        ///CUNHAAA


        this.cunhaBg = new SimpleSprite("img/assets/background_gameplay/cunha.png");
        this.gameContainer.addChild(this.cunhaBg.getContent());
        this.cunhaBg.getContent().width = windowWidth/2;
        this.cunhaBg.getContent().height = windowHeight;
        this.cunhaBg.getContent().position.x = windowWidth/2;

        this.hitTouchCunha = new PIXI.Graphics();
        this.hitTouchCunha.interactive = true;
        this.hitTouchCunha.beginFill(0x0000FF);
        this.hitTouchCunha.drawRect(windowWidth/2,0,windowWidth/2, windowHeight);
        this.gameContainer.addChild(this.hitTouchCunha);
        this.hitTouchCunha.alpha = 0.1;
        this.hitTouchCunha.hitArea = new PIXI.Rectangle(windowWidth/2, 0, windowWidth, windowHeight);

        this.hitTouchCunha.mousemove = this.hitTouchCunha.touchmove = function(touchData){

        };
        this.hitTouchCunha.mousedown = this.hitTouchCunha.touchstart = function(touchData){
            console.log("cunha")
            touching(self.hitTouchCunha);
            self.cunhaLife --;
            self.cunha.hurt();

            self.xinga(2);


            if(self.cunhaLife <= 0){
                console.log("PERDEU CUNHA")
            }
        };
        this.hitTouchCunha.mouseup = this.hitTouchCunha.touchend = function(touchData){
            
        };



        this.raio = new SimpleSprite("img/assets/background_gameplay/raio.png");
        scaleConverter(this.raio.getContent().height, windowHeight, 1, this.raio.getContent());
        this.raio.getContent().height = windowHeight;
        this.raio.getContent().anchor.x = 0.5;
        this.raio.getContent().position.x = windowWidth/2;
        this.gameContainer.addChild(this.raio.getContent());

        this.cunha = new Dilma("img/assets/personagens/cunha/corpo.png", ["img/assets/personagens/cunha/head1.png",
        "img/assets/personagens/cunha/head2.png",
        "img/assets/personagens/cunha/head3.png",
        "img/assets/personagens/cunha/head4.png"], {x:-155, y:175});
        this.entityLayer.addChild(this.cunha);
        this.cunha.maxPos = windowWidth / 2 + windowWidth / 3;
        this.cunha.minPos = windowWidth / 2 + windowWidth / 2.5;
        this.cunha.getContent().position.x = this.cunha.maxPos + Math.random((this.cunha.maxPos - this.cunha.minPos) / 2);




        ////////BARS

       

        this.dilmaMaxLife = this.dilmaLife = 100;
        
        this.cunhaMaxLife = this.cunhaLife = 100;

        this.dilmaBarView = new BarView(windowWidth/2 * 0.8,windowHeight*0.05,this.dilmaMaxLife,this.dilmaLife,true);
        this.dilmaBarView.getContent().position.x = windowWidth/2 * 0.05;
        this.dilmaBarView.getContent().position.y = windowHeight*0.05 * 0.5;
        this.addChild(this.dilmaBarView)

        this.cunhaBarView = new BarView(windowWidth/2 * 0.8,windowHeight*0.05,this.cunhaMaxLife,this.cunhaLife);
        this.cunhaBarView.getContent().position.x = windowWidth/2 * 0.15 + windowWidth/2;
        this.cunhaBarView.getContent().position.y = windowHeight*0.05 * 0.5;

        this.addChild(this.cunhaBarView)










        /////// TIMER

        this.backTimer = new SimpleSprite("img/assets/modal_buttons/timer.png");
        scaleConverter(this.backTimer.getContent().height, this.dilmaBarView.getContent().height, 2.5, this.backTimer.getContent());
        this.backTimer.getContent().anchor.x = 0.5;
        this.backTimer.getContent().position.x = windowWidth/2;
        this.gameContainer.addChild(this.backTimer.getContent());

        this.currentTime = 0;


        this.timerLabel = new PIXI.Text("00", {font:"40px barrocoregular", fill:"white", stroke:"#dbb496", strokeThickness: 10});
        scaleConverter(this.timerLabel.height, this.dilmaBarView.getContent().height, 1.5, this.timerLabel);
        this.timerLabel.position.y = this.dilmaBarView.getContent().position.y + this.dilmaBarView.getContent().height / 2 - this.timerLabel.height / 2;
        this.addChild(this.timerLabel);
        // this.timerLabel.resolution = 2;
        
        

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


        clearInterval(this.interval);







        this.gameContainer.addChild(this.layerManager.getContent());

        
        this.createModal();
        this.hideModal();
        







        this.layerManager.addLayer(this.entityLayer);


        this.updateable = true;


        this.dilmaPerolas = ["Vento!", "Estocar!", "Terra Curva", "Estradas de água", "Submarinos", "Figura oculta"]
        this.cunhaPerolas = ["Suiça", "Dinheiro!", "Contas no exterior?", "Ética", "Shopping", "Conhecidência"]
    },
    xinga:function(id){
        if(this.accumParticleXinga > 0){
            return
        }
        tempArray = [];
        if(id ==  1){
            tempArray = this.dilmaPerolas;
        }else{
            tempArray = this.cunhaPerolas;

        }
        this.accumParticleXinga = 20;


        tempStroke = id == 1?"#ff6e36":"#7481b1";
        var tempLabel = new PIXI.Text(tempArray[Math.floor(Math.random()*tempArray.length)], {font:"40px barrocoregular", fill:"white", stroke:tempStroke, strokeThickness: 8});
        // scaleConverter(tempLabel.height, windowHeight, 0.2, tempLabel);
        var rot = Math.random() * 0.004;
        var errou = new Particles({x: 0, y:0}, 80, tempLabel,rot);
        errou.initScale = scaleConverter(tempLabel.height, windowHeight, 0.1);
        // errou.maxScale = this.player.getContent().scale.x;
        errou.build();
        // errou.getContent().tint = 0xf5c30c;
        errou.gravity = 0.1;
        errou.alphadecress = 0.02;
        // errou.scaledecress = +0.05;
        errou.setPosition(windowWidth / 2 - tempLabel.width / 2, windowHeight / 2);
        this.entityLayer.addChild(errou);

    },
    update:function()
    {
        if(!this.updateable){
            return;
        }

        this.accumParticleXinga --;

        this.dilmaBarView.updateBar(this.dilmaLife,this.dilmaMaxLife)
        this.cunhaBarView.updateBar(this.cunhaLife,this.cunhaMaxLife)

        this.timerLabel.position.x = windowWidth/2 - this.timerLabel.width /2;
        if(this.layerManager){
            this.layerManager.update();
        }
    },
});
