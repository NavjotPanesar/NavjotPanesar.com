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
(function(funcName, baseObj) {
    // The public function name defaults to window.docReady
    // but you can pass in your own object and own function name and those will be used
    // if you want to put them in a different namespace
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;

    // call this when the document is ready
    // this function protects itself against being called more than once
    function ready() {
        if (!readyFired) {
            // this must be set to true before we start calling callbacks
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                // if a callback here happens to add new ready handlers,
                // the docReady() function will see that it already fired
                // and will schedule the callback to run right after
                // this event loop finishes so all handlers will still execute
                // in order and no new ones will be added to the readyList
                // while we are processing the list
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            // allow any closures held by these functions to free
            readyList = [];
        }
    }

    function readyStateChange() {
        if ( document.readyState === "complete" ) {
            ready();
        }
    }

    // This is the one public interface
    // docReady(fn, context);
    // the context argument is optional - if present, it will be passed
    // as an argument to the callback
    baseObj[funcName] = function(callback, context) {
        // if ready has already fired, then just schedule the callback
        // to fire asynchronously, but right away
        if (readyFired) {
            setTimeout(function() {callback(context);}, 1);
            return;
        } else {
            // add the function and context to the list
            readyList.push({fn: callback, ctx: context});
        }
        // if document already ready to go, schedule the ready function to run
        if (document.readyState === "complete") {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            // otherwise if we don't have event handlers installed, install them
            if (document.addEventListener) {
                // first choice is DOMContentLoaded event
                document.addEventListener("DOMContentLoaded", ready, false);
                // backup is window load event
                window.addEventListener("load", ready, false);
            } else {
                // must be IE
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    }
})("docReady", window);

docReady(startPane);