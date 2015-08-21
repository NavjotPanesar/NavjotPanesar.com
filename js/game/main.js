var entities = [];
var blockingEntities = [];
var player = {};
var context = {};
var canvas = {};
var then = {};
var keysDown = {};

var LEFT_ARROW = 65;
var UP_ARROW = 87;
var RIGHT_ARROW = 68;
var DOWN_ARROW = 83;



var startGame = function(){
    canvas = document.getElementById('canvas');
    canvas.style.display = "block";

    document.addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);

    document.addEventListener("keyup", function (e) {
        delete keysDown[e.keyCode];
    }, false);

    context = canvas.getContext('2d');

    context.canvas.width  = window.innerWidth;
    context.canvas.height = window.innerHeight;

    player = new Player('assets/Doge.png');

    entities.push(player);

    var heroRect = document.getElementById("heroheader").getBoundingClientRect();
    var heroEntity = new Sprite("");
    heroEntity.x = heroRect.left;
    heroEntity.y = heroRect.top;
    console.log(heroRect);
    heroEntity.width = heroRect.width;
    heroEntity.height = heroRect.height;
    entities.push(heroEntity);
    blockingEntities.push(heroEntity);

    then = Date.now();
    main(canvas);

};


// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;
    requestAnimationFrame(main);
};

var render = function(){
    entities.forEach(function(entity) {
        entity.render();
    });
};


var update = function (modifier) {
    entities.forEach(function(entity) {
        entity.update(modifier);
    });

    blockingEntities.forEach(function(entity) {
        player.handleCollisions(entity);
    })
};

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

var inheritsFrom = function (child, parent) {
    child.prototype = Object.create(parent.prototype);
};


function Player(spriteSrc) {
    this.construct(spriteSrc);
    this.vx = 0;
    this.vy = 0;
    this.gravity = 15;
    this.friction = 0.8;
    this.jumpV = -2000;
    this.state = "jumping";
}
Player.prototype = new Sprite;

Player.prototype.handleCollisions = function (entity) {
    if (!this.intersects(entity)) {
        return;
    }

    var ourRect = this.getRect();
    var theirRect = entity.getRect();

    var crossedLeft = ourRect.right > theirRect.left && ourRect.right < theirRect.right ;
    var crossedRight = ourRect.left < theirRect.right;
    var crossedTop = ourRect.bottom > theirRect.top && ourRect.bottom < theirRect.bottom;
    var crossedBottom = ourRect.top < theirRect.bottom;

    var withinVertically = crossedTop && crossedBottom;
    var withinHorizontally = crossedLeft && crossedRight;

    if (crossedLeft && withinVertically) {
     //   this.vx *= -1;
        this.x = entity.x - this.width;
    }
    else  if (crossedRight && withinVertically) {
    //    this.vx *= -1
        this.x = theirRect.right;
    }

     else if (crossedTop && withinHorizontally) {
        this.y = theirRect.top - ourRect.height;
        this.state = "grounded";
        this.vy = -100;
    }
    else  if (crossedBottom && withinHorizontally) {
       this.vy = 0;
        this.y = theirRect.bottom;
    }
}

Player.prototype.update = function(modifier){
    Sprite.prototype.update.call(this);
    if (UP_ARROW in keysDown) { // Player holding up
        if(this.state == "grounded"){
            this.state = "jumping";
            this.vy = this.jumpV;
        }
    }
    if (DOWN_ARROW in keysDown) { // Player holding down
     //   this.vx = 10;
    }

    this.vx *= this.friction;
    if (LEFT_ARROW in keysDown) { // Player holding left
        this.vx = -100;
    }
    if (RIGHT_ARROW in keysDown) { // Player holding right
        this.vx = 100;
    }

    this.x += this.vx * modifier;
    this.y += this.vy * modifier;

    this.vy += this.gravity;

    if(this.y >= canvas.height - this.height){
        this.y = canvas.height - this.height;
        this.state = "grounded";
    }
}


