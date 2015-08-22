function Sprite(spriteSrc){
    this.construct(spriteSrc);
}

Sprite.prototype.construct = function(spriteSrc){
    this.x = 50;
    this.y = 50;
    this.width = 50;
    this.height = 50;
    this.isLoaded = false;
    this.image = new Image();
    this.image.onload = function () {
        this.isLoaded = true;
    }.bind(this);

    this.image.src = spriteSrc;
};

Sprite.prototype.initPosition = function(x, y){
    this.x = x;
    this.y = y;
    this.originalX = x;
    this.originalY = y;
};

Sprite.prototype.update = function(modifier){
    if(this.isLoaded){
        context.clearRect(this.x,this.y,this.width, this.height);
    }
};

Sprite.prototype.render = function(){
    if(this.isLoaded){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
};

Sprite.prototype.getRect = function(){
    return {
        top : this.y,
        left : this.x,
        right : this.x + this.width,
        bottom : this.y + this.height,
        width: this.width,
        height: this.height
    };
};

Sprite.prototype.intersects = function(rect) {
    return !( rect.x           > (this.x + this.width) ||
    (rect.x + rect.width) <  this.x           ||
    rect.y           > (this.y + this.height) ||
    (rect.y + rect.height) <  this.y);
};

Sprite.prototype.handleCollisions = function (entity) {

}