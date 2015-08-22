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
    window.scrollTo(0, 0);
    window.onscroll = function(){
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

    context.canvas.width  = window.innerWidth;
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


var addPageElement = function(element){
    if(!element){
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

    yPos = document.body.scrollTop;
    if((player.state == "jumping" && player.y >= canvas.height - player.height && player.vy > 0 ) || (player.y <= 0 && yPos > 0 && player.vy < 0)){
        var yChange = player.vy * modifier;
        window.scrollTo(0, yPos +  yChange);
        syncEntities();
    }
};

var syncEntities = function(){
    fixedEntities.forEach(function(entity) {
        entity.y = -yPos + entity.originalY;
    });
};

var inheritsFrom = function (child, parent) {
    child.prototype = Object.create(parent.prototype);
};




