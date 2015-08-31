var homeApp = angular.module('Home', [
    'ngRoute', 'Comments', 'smoothScroll', 'homeControllers','ngAnimate', 'ui.bootstrap', 'wallopSlider']);

homeApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when("/", {templateUrl: "views/home.html", controller: "HomeCtrl"}).
        when("/gallery", {templateUrl: "views/gallery.html", controller: "GalleryCtrl"}).
        when("/view/:title/:swf?", {templateUrl: "views/view.html", controller: "ViewPageCtrl"}).
        otherwise({redirectTo: '/'});
}]);

homeApp.filter("asDate", function () {
    return function (input) {
        return new Date(input);
    }
});

homeApp.run(function($rootScope) {
    $rootScope.calcDiff = function(a, b){
        var onlyInA = a.filter(function(current){
            return b.filter(function(current_b){
                return current_b.title == current.title
            }).length == 0
        });

        var onlyInB = b.filter(function(current){
            return a.filter(function(current_a){
                return current_a.title == current.title
            }).length == 0
        });

        var result = onlyInA.concat(onlyInB);
        return result;
    }

    $rootScope.calcSimilar = function(a, b){
        var itemToRemove = $rootScope.calcDiff(a, b);
        a = a.filter( function( el ) {
            return itemToRemove.indexOf( el ) < 0;
        } );
        return a;
    }
});
