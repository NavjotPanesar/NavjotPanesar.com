// sprite class

function Sprite(spriteSrc) {
    this.construct(spriteSrc);
}

Sprite.prototype.construct = function (spriteSrc) {
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

Sprite.prototype.initPosition = function (x, y) {
    this.x = x;
    this.y = y;
    this.originalX = x;
    this.originalY = y;
};

Sprite.prototype.update = function (modifier) {
    if (this.isLoaded) {
        context.clearRect(this.x, this.y, this.width, this.height);
    }
};

Sprite.prototype.render = function () {
    if (this.isLoaded) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
};

Sprite.prototype.getRect = function () {
    return {
        top: this.y,
        left: this.x,
        right: this.x + this.width,
        bottom: this.y + this.height,
        width: this.width,
        height: this.height
    };
};

Sprite.prototype.intersects = function (rect) {
    return !( rect.x > (this.x + this.width) ||
    (rect.x + rect.width) < this.x ||
    rect.y > (this.y + this.height) ||
    (rect.y + rect.height) < this.y);
};

Sprite.prototype.handleCollisions = function (entity) {

};


// Player class

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

Player.prototype.generateSprites = function () {
    var rightImageSet = this.genImageSet(['images/game/right_1.png']);
    var rightWalkingImageSet = this.genImageSet(['images/game/right_2.png', 'images/game/right_3.png']);
    var rightFlyingImageSet = this.genImageSet(['images/game/right_jet_1.png', 'images/game/right_jet_2.png', 'images/game/right_jet_3.png']);
    var rightJumpingImageSet = this.genImageSet(['images/game/right_2.png']);
    var leftImageSet = this.genImageSet(['images/game/left_1.png']);
    var leftWalkingImageSet = this.genImageSet(['images/game/left_2.png', 'images/game/left_3.png']);
    var leftFlyingImageSet = this.genImageSet(['images/game/left_jet_1.png', 'images/game/left_jet_2.png', 'images/game/left_jet_3.png']);
    var leftJumpingImageSet = this.genImageSet(['images/game/left_2.png']);
    this.spriteSets = {
        'normalRight': rightImageSet,
        'normalLeft': leftImageSet,
        'walkingRight': rightWalkingImageSet,
        'walkingLeft': leftWalkingImageSet,
        'flyingRight': rightFlyingImageSet,
        'flyingLeft': leftFlyingImageSet,
        'jumpingRight': rightJumpingImageSet,
        'jumpingLeft': leftJumpingImageSet
    };
};

Player.prototype.genImageSet = function (imgSrcs) {
    var imgSet = [];
    imgSrcs.forEach(function (imgSrc) {
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
    A.centerY = (0.5 * (A.bottom + A.top));
    A.centerX = (0.5 * (A.left + A.right));

    B.centerY = (0.5 * (B.bottom + B.top));
    B.centerX = (0.5 * (B.left + B.right));

    var wy = (A.width + B.width) * (A.centerY - B.centerY);
    var hx = (A.height + B.height) * (A.centerX - B.centerX);

    var side = "";
    if (wy > hx)
        if (wy > -hx) {
            //bottom
            this.y = B.bottom;
            this.vy = 0;
        }
        else {
            //left
            this.x = B.left - this.width - 1;
            this.vx = 0;
        }
    else if (wy > -hx) {
        //right
        this.x = B.right + 1;
        this.vx = 0;
    }
    else {
        //top
        this.y = B.top - this.height;
        this.vy > 0 ? this.vy *= -1 : null;
        this.vy *= 0.2;
        console.log(this.vy);
        if (Math.abs(this.vy) < 50) {
            this.vy = 0;
        }
        this.state = "grounded";
    }
};

Player.prototype.update = function (modifier) {
    Sprite.prototype.update.call(this);
    this.state = "jumping";

    //note handle collisions may update the state to grounded if we're on a platform
    blockingEntities.forEach(function (entity) {
        player.handleCollisions(entity);
    });

    if (UP_ARROW in keysDown) { // Player holding up
        if (this.state == "grounded") {
            this.state = "jumping";
            //this.vy = this.jumpV;
        }
    }
    if (DOWN_ARROW in keysDown) { // Player holding down
        //   this.vx = 10;
    }

    if (this.state != "jumping") {
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


    if (this.state == "jumping") {
        if (UP_ARROW in keysDown) {
            this.gravity = -5;
        } else {
            this.gravity = 15;
        }
        this.vy += this.gravity;
    }

    this.x += this.vx * modifier;
    this.y += this.vy * modifier;


    if (this.y >= canvas.height - this.height) {
        // we're scrolled to the bottom of the canvas
        this.y = canvas.height - this.height;
    }

    if (this.y < 0) {
        this.y = 0;
        if (yPos <= 0) {
            this.vy = 0;
        }
    }

    if (this.x < 0) {
        this.x = 0;
    }

    if (this.x > canvas.width - this.width) {
        this.x = canvas.width - this.width;
    }

    if (this.vy > 500) {
        this.vy = 500;
    }

    if (this.vy < -500) {
        this.vy = -500;
    }

    this.updateSprite();

};

Player.prototype.updateSprite = function () {
    var spriteSubName;
    switch (this.state) {
        case "jumping":
            if (UP_ARROW in keysDown) {
                spriteSubName = 'flying';
            } else {
                spriteSubName = 'jumping';
            }
            break;
        default:
            if (RIGHT_ARROW in keysDown || LEFT_ARROW in keysDown) {
                spriteSubName = 'walking';
                break;
            }
            spriteSubName = 'normal';
            break;
    }

    var spriteSet = this.spriteSets[spriteSubName + this.direction];
    if (this.frameCounter >= spriteSet.length * this.frameCounterSpacing) {
        this.frameCounter = 0;
    }
    this.image = spriteSet[Math.floor(this.frameCounter / this.frameCounterSpacing)];
    ++this.frameCounter;
};


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


var startGame = function () {
    window.scrollTo(0, 0);
    window.onscroll = function () {
        syncEntities();
    };

    canvas = document.getElementById('canvas');
    canvas.style.display = "block";

    document.addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);

    document.addEventListener("keyup", function (e) {
        delete keysDown[e.keyCode];
    }, false);

    context = canvas.getContext('2d');

    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;

    player = new Player('images/small_link_right.png');

    entities.push(player);

    document.getElementById("bottom-element").style.display = "block";
    addPageElementById("bottom-element");
    addPageElementById("heroheader");
    addPageElementsByClass("work-item");
    addPageElementsByClass("project-item");
    addPageElementsByClass("blog-item");
    addPageElementsByClass("about-button");
    addPageElementsByClass("see-more-button");

    then = Date.now();
    main();
};


var addPageElement = function (element) {
    if (!element) {
        return;
    }
    var rect = element.getBoundingClientRect();
    var entity = new Sprite('');
    entity.initPosition(rect.left, rect.top);
    entity.width = rect.width;
    entity.height = rect.height;
    entities.push(entity);
    blockingEntities.push(entity);
    fixedEntities.push(entity);
};

var addPageElementById = function (elementId) {
    var elem = document.getElementById(elementId);
    addPageElement(elem);
};


var addPageElementsByClass = function (className) {
    var elems = document.getElementsByClassName(className)
    Array.prototype.forEach.call(elems, function (elem) {
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

var render = function () {
    entities.forEach(function (entity) {
        entity.render();
    });
};


var update = function (modifier) {
    entities.forEach(function (entity) {
        entity.update(modifier);
    });

    yPos = document.body.scrollTop;
    if ((player.state == "jumping" && player.y >= canvas.height - player.height && player.vy > 0 ) || (player.y <= 0 && yPos > 0 && player.vy < 0)) {
        var yChange = player.vy * modifier;
        window.scrollTo(0, yPos + yChange);
        syncEntities();
    }
};

var syncEntities = function () {
    fixedEntities.forEach(function (entity) {
        entity.y = -yPos + entity.originalY;
    });
};

var inheritsFrom = function (child, parent) {
    child.prototype = Object.create(parent.prototype);
};