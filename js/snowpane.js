var startPane = function () {
    var context = {};
    var canvas = {};


    var pane;
    var getPane = function () {
        var elem = document.getElementById("heroheader");
        if(elem){
            pane = elem.getBoundingClientRect();
            elem.style.backgroundColor = "rgba(240,250,255,0.7)";
            context.canvas.width = pane.width;
            context.canvas.height = pane.height;
            elem.addEventListener("mousemove", mouseDown, false);
            elem.addEventListener("mousedown", mouseDown, false);
            drawSnow();
        }
    };

    var drawSnow = function () {
        context.rect(0,0,canvas.width,canvas.height);
        context.fillStyle = "rgba(255,255,255," + 1 + ")";
        context.fill();

    };

    var main = function () {
        if(!pane){
            getPane();
        }
        requestAnimationFrame(main);
    };


    var paneResize = function () {
        context.clearRect(0,0,canvas.width,canvas.height);
        context.canvas.width = window.innerWidth;
        context.canvas.height = window.innerHeight;
        getPane();
    };

    var pixelSize = 50;

    var getMouse = function(e, canvas) {
        var element = canvas, offsetX = 0, offsetY = 0, mx, my;

        // Compute the total offset. It's possible to cache this if you want
        if (element.offsetParent !== undefined) {
            do {
                offsetX += element.offsetLeft;
                offsetY += element.offsetTop;
            } while ((element = element.offsetParent));
        }

        // Add padding and border style widths to offset
        // Also add the <html> offsets in case there's a position:fixed bar (like the stumbleupon bar)
        // This part is not strictly necessary, it depends on your styling
        //offsetX += stylePaddingLeft + styleBorderLeft + htmlLeft;
        //offsetY += stylePaddingTop + styleBorderTop + htmlTop;

        mx = e.pageX - offsetX;
        my = e.pageY - offsetY;

        // We return a simple javascript object with x and y defined
        return {x: mx, y: my};
    };

    var mouseDown = function(event){
        var mouseLoc = getMouse(event, canvas);
        var x = mouseLoc.x;
        var y = mouseLoc.y;

        //context.clearRect(x-pixelSize/2,  y-pixelSize/2, pixelSize, pixelSize);

        context.beginPath();
        context.globalCompositeOperation = 'destination-out'
        context.arc(x, y, pixelSize/2, 0, Math.PI*2, true);
        context.fill();

    };



    canvas = document.getElementById('snowpanecanvas');
    context = canvas.getContext('2d');


    window.addEventListener('resize', paneResize, false);
    getPane();
    main();
};
