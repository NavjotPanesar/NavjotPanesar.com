

var startSnow = function () {
    function Sprite() {
        this.construct();
    }

    Sprite.prototype.construct = function () {
        this.x = 0;
        this.y = 0;
        this.radius = 2;
        var zdist = Math.random()+0.5;
        this.zdist = zdist;
        this.vy = zdist*40 + 10;
        this.vx = zdist*20 + 5;

        this.opacity = zdist - 0.5;

        this.radius *= zdist;
        this.diameter = this.radius*2;
    };

    Sprite.prototype.update = function (modifier) {
        var oldRect = {
            top: this.y-this.radius-1,
            left:   this.x-this.radius-1,
            width : this.diameter+2,
            height: this.diameter+2
        };
        this.y += modifier*this.vy;
        this.x += modifier*this.vx;

        if((this.y - this.height) >= canvas.height/2){
            var index = entities.indexOf(this);
            if (index > -1) {
                entities.splice(index, 1);
            }
        }

        return oldRect;
    };

    Sprite.prototype.render = function () {
        context.fillStyle = "rgba(255,255,255," + this.opacity + ")";
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();

    };

    var entities = new Array(20);
    var context = {};
    var canvas = {};
    var then = {};

    var main = function () {
        var now = Date.now();
        var delta = now - then;

        update(delta / 1000);
        render();

        then = now;
        requestAnimationFrame(main);
    };

    var render = function () {
        clearRects.forEach(function (rect) {
            context.clearRect(rect.left, rect.top, rect.width, rect.height);
        });

        entities.forEach(function (entity) {
            entity.render();
        });
    };

    var updateCounter = 0;
    var clearRects = new Array(20);
    var update = function (modifier) {
        clearRects = [];
        entities.forEach(function (entity) {
            var rect = entity.update(modifier);
            clearRects.push(rect);
        });

        var entity = new Sprite();
        entity.x = (Math.random()*(canvas.width+(canvas.height))) - canvas.height;
        entities.push(entity);
    };

    var snowResize = function () {

        context.canvas.width = window.innerWidth;
        context.canvas.height = window.innerHeight;
        //entities = [];
        context.clearRect(0,0,canvas.width,canvas.height);

    };

    var inheritsFrom = function (child, parent) {
        child.prototype = Object.create(parent.prototype);
    };

    canvas = document.getElementById('introcanvas');
    context = canvas.getContext('2d');

    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;

    var entity = new Sprite();
    entities.push(entity);

    then = Date.now();
    main();

    window.addEventListener('resize', snowResize, false);

};


startSnow();