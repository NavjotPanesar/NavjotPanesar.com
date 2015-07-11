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
}