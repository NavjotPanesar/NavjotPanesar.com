function Player(spriteSrc) {
    this.construct(spriteSrc);
    this.vx = 0;
    this.vy = 0;
    this.gravity = 15;
    this.friction = 0.8;
    this.jumpV = -1000;
    this.x = canvas.width * 0.5;
    this.state = "jumping";
    this.frameCounter = 0;
    this.frameCounterSpacing = 10;
    this.direction = "Right";
    this.generateSprites();
}
Player.prototype = new Sprite;

Player.prototype.generateSprites = function(){
    var rightImageSet = this.genImageSet(['images/game/right_1.png']);
    var rightWalkingImageSet = this.genImageSet(['images/game/right_2.png', 'images/game/right_3.png']);
    var rightFlyingImageSet = this.genImageSet(['images/game/right_jet_1.png', 'images/game/right_jet_2.png', 'images/game/right_jet_3.png']);
    var rightJumpingImageSet = this.genImageSet(['images/game/right_2.png']);
    var leftImageSet = this.genImageSet(['images/game/left_1.png']);
    var leftWalkingImageSet = this.genImageSet(['images/game/left_2.png', 'images/game/left_3.png']);
    var leftFlyingImageSet = this.genImageSet(['images/game/left_jet_1.png', 'images/game/left_jet_2.png', 'images/game/left_jet_3.png']);
    var leftJumpingImageSet = this.genImageSet(['images/game/left_2.png']);
    this.spriteSets = {
        'normalRight' : rightImageSet,
        'normalLeft' : leftImageSet,
        'walkingRight' : rightWalkingImageSet,
        'walkingLeft' : leftWalkingImageSet,
        'flyingRight' : rightFlyingImageSet,
        'flyingLeft' : leftFlyingImageSet,
        'jumpingRight' : rightJumpingImageSet,
        'jumpingLeft' : leftJumpingImageSet
    };
};

Player.prototype.genImageSet = function(imgSrcs){
    var imgSet = [];
    imgSrcs.forEach(function(imgSrc) {
        var img = new Image();
        img.src = imgSrc;
        imgSet.push(img);
    });
    return imgSet;
}

Player.prototype.handleCollisions = function (entity) {
    if (!this.intersects(entity)) {
        return;
    }

    var A = this.getRect();
    var B = entity.getRect();
    A.centerY = (0.5*(A.bottom + A.top));
    A.centerX = (0.5*(A.left + A.right));

    B.centerY = (0.5*(B.bottom + B.top));
    B.centerX = (0.5*(B.left + B.right));

    var wy = (A.width + B.width) * (A.centerY - B.centerY);
    var hx = (A.height + B.height) * (A.centerX - B.centerX);

    var side = "";
    if (wy > hx)
        if (wy > -hx){
            //bottom
            this.y = B.bottom + 1;
            this.vy = 0;
        }
        else{
            //left
            this.x = B.left - this.width - 1;
            this.vx *= -1;
        }
    else if (wy > -hx){
        //right
        this.x = B.right + 1;
        this.vx *= -1;
    }
    else{
        //top
        this.y = B.top - this.height;
        this.vy > 0 ? this.vy*=-1 : null;
        this.vy *= 0.2;
        console.log(this.vy);
        if(Math.abs(this.vy) < 50){
            this.vy = 0;
        }
        this.state = "grounded";
    }
};

Player.prototype.update = function(modifier){
    Sprite.prototype.update.call(this);
    this.state = "jumping";

    //note handle collisions may update the state to grounded if we're on a platform
    blockingEntities.forEach(function(entity) {
        player.handleCollisions(entity);
    });

    if (UP_ARROW in keysDown) { // Player holding up
        if(this.state == "grounded"){
            this.state = "jumping";
            //this.vy = this.jumpV;
        }
    }
    if (DOWN_ARROW in keysDown) { // Player holding down
        //   this.vx = 10;
    }

    if(this.state != "jumping"){
        this.vx *= this.friction;
    }
    if (LEFT_ARROW in keysDown) { // Player holding left
        this.direction = "Left";
        this.vx = -200;
    }
    if (RIGHT_ARROW in keysDown) { // Player holding right
        this.direction = "Right";
        this.vx = 200;
    }


    if(this.state == "jumping"){
        if(UP_ARROW in keysDown){
            this.gravity = -5;
        } else {
            this.gravity = 15;
        }
        this.vy += this.gravity;
    }

    this.x += this.vx * modifier;
    this.y += this.vy * modifier;



    if(this.y >= canvas.height - this.height){
        // we're scrolled to the bottom of the canvas
        this.y = canvas.height - this.height;
    }

    if(this.y < 0){
        this.y = 0;
    }

    if(this.x < 0){
        this.x = 0;
    }

    if(this.x > canvas.width - this.width){
        this.x = canvas.width - this.width;
    }

    if(this.vy > 500){
        this.vy = 500;
    }

    if(this.vy < -500){
        this.vy = -500;
    }

    this.updateSprite();

};

Player.prototype.updateSprite = function(){
    var spriteSubName;
    switch(this.state){
        case "jumping":
            if(UP_ARROW in keysDown){
                spriteSubName = 'flying';
            } else {
                spriteSubName = 'jumping';
            }
            break;
        default:
            if(RIGHT_ARROW in keysDown || LEFT_ARROW in keysDown){
                spriteSubName = 'walking';
                break;
            }
            spriteSubName = 'normal';
            break;
    }

    var spriteSet = this.spriteSets[spriteSubName + this.direction];
    if(this.frameCounter >=  spriteSet.length * this.frameCounterSpacing){
        this.frameCounter = 0;
    }
    this.image = spriteSet[Math.floor(this.frameCounter / this.frameCounterSpacing)];
    ++this.frameCounter;
};