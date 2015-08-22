var entities = [];
var blockingEntities = [];
var fixedEntities = [];
var player = {};
var context = {};
var canvas = {};
var then = {};
var keysDown = {};
var yPos = 0;

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

    addPageElementById("bottom-element");
    addPageElementById("heroheader");
    addPageElementsByClass("work-item");
    addPageElementsByClass("project-item");
    addPageElementsByClass("blog-item");


    then = Date.now();
    main(canvas);

};


var addPageElement = function(element){
    if(!element){
        return;
    }
    var rect = element.getBoundingClientRect();
    var entity = new Sprite('assets/Doge.png');
    entity.x = rect.left;
    entity.y = rect.top;
    entity.width = rect.width;
    entity.height = rect.height;
    entities.push(entity);
    blockingEntities.push(entity);
    fixedEntities.push(entity);
};

var addPageElementById = function(elementId){
    var elem = document.getElementById(elementId);
    addPageElement(elem);
};



var addPageElementsByClass = function(className){
    var elems = document.getElementsByClassName(className)
    Array.prototype.forEach.call(elems, function(elem) {
        addPageElement(elem);
    });

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

    if(player.state == "falling"){
        var yChange = player.vy * modifier;
        yPos += yChange;
        window.scrollTo(0, yPos);
        fixedEntities.forEach(function(entity) {
            entity.y -= yChange;
        });
    }
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
    this.jumpV = -1000;
    this.x = 1000;
    this.state = "jumping";
}
Player.prototype = new Sprite;

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
            this.vy = 0;
            this.state = "grounded";
        }
}

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
            this.vy = this.jumpV;
        }
    }
    if (DOWN_ARROW in keysDown) { // Player holding down
     //   this.vx = 10;
    }

    if(this.state != "jumping"){
        this.vx *= this.friction;
    }
    if (LEFT_ARROW in keysDown) { // Player holding left
        this.vx = -100;
    }
    if (RIGHT_ARROW in keysDown) { // Player holding right
        this.vx = 100;
    }

    this.x += this.vx * modifier;
    this.y += this.vy * modifier;

    if(this.state == "jumping"){
        if(this.vy > 0 && UP_ARROW in keysDown){
            this.vy = 100;
        } else {
            this.vy += this.gravity;
        }
    }



    if(this.y >= canvas.height - this.height){
        // we're scrolled to the bottom of the canvas
        this.y = canvas.height - this.height;
        this.state = "falling";
    }

    if(this.vy > 1000){
        this.vy = 1000;
    }

    console.log(this.state);


}


