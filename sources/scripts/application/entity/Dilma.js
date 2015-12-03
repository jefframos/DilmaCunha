var Dilma = Entity.extend({
	init:function(imgSrc){
		this.entityContainer = new PIXI.DisplayObjectContainer();
		this.imageDilma = new SimpleSprite(imgSrc);
        this.entityContainer.addChild(this.imageDilma.getContent());
        console.log(this.imageDilma.getContent().anchor)
        this.imageDilma.getContent().anchor.x = 0.5;
        scaleConverter(this.imageDilma.getContent().height, windowHeight, 0.7, this.imageDilma.getContent());

        this.imageDilma.getContent().position.y = windowHeight - this.imageDilma.getContent().height * 0.9;
        this.velocity = {x:0,y:0};
        this.updateable = true;

        // this.minPos = this.imageDilma.getContent().width * 0.2;
        // this.maxPos = windowWidth / 2 - this.imageDilma.getContent().width * 1.5;
        this.side = 1;
        this.sin = Math.random();

        this.standardVel = {x:3, y:2};
        this.virtualVel = {x:0, y:0};

        this.acc = 0.1;


	},
	update:function(){

		this.velocity.x = this.virtualVel.x * this.side;

		tempSin = Math.sin(this.sin += 0.2);
		// console.log(tempSin)
		this.velocity.y = this.virtualVel.y *tempSin;

		accelerating = true;

		if(this.getPosition().x > this.maxPos && this.side > 0){
			this.virtualVel.x -= this.acc;

			accelerating = false;

			// this.side = -1;
		}else if(this.getPosition().x < this.minPos && this.side < 0){
			this.virtualVel.x -= this.acc;

			accelerating = false;
			// this.side = 1;
		}
		if(accelerating && this.virtualVel.x < this.standardVel.x){
			this.virtualVel.x +=  this.acc;
		}

		if(this.virtualVel.y < this.standardVel.y){
			this.virtualVel.y +=  this.acc;
		}

		this._super();
	},
	getContent:function(){
		return this.entityContainer;
	}
});
