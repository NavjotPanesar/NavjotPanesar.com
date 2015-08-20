var timeMachineEnabled = false;
var toggleTimeMachine = function(){
    timeMachineEnabled = !timeMachineEnabled;

    var selectCss = function(linkId, timeMachineCss, regularCss){
        var href = timeMachineEnabled ? timeMachineCss : regularCss;
        var css = document.getElementById(linkId);
        css.setAttribute('href', href);
    }

    selectCss('bootstrapCss', 'css/bootstrap-geo.min.css', 'css/bootstrap.min.css')
    selectCss('styleCss', '', 'css/style.css')

    var cursorChangeHtml = '<style type="text/css">body{cursor: url(http://www.fillster.com/myspace-cursors/1.cur), url(http://www.fillster.com/myspace-cursors/1.gif), pointer !important;}</style><center> <div style="position: absolute; top: 10px; right: 10px;"><a style="border: 0px;" href="http://www.fillster.com/myspace-cursors/1/" target="_blank"><img style="border: 0px;" src="http://www.fillster.com/myspace-cursors/1.gif" alt="Cursors for Myspace @ Fillster.com"></a><br /><a style="color: #FF8C00; font-size: 10px;" href="http://www.fillster.com/myspace-cursors/1/" target="_blank">Myspace Cursors</a></div></center>';
    var backgroundMusicHtml = '<audio id="audio1" controls="controls" loop="loop" autoplay="autoplay" > <source src="files/timemachine.mp3" type="audio/mpeg" /></audio>';
    if(timeMachineEnabled){
        $('#timemachine').html(cursorChangeHtml + " " + backgroundMusicHtml);
    } else {
        $('#timemachine').html("");
    }
}