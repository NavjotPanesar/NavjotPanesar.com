var homeApp = angular.module('Home', [
    'ngRoute', 'Comments', 'smoothScroll', 'homeControllers','ngAnimate']);

homeApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when("/", {templateUrl: "views/home.html", controller: "HomeCtrl"}).
        when("/blog", {templateUrl: "views/blog.html", controller: "BlogListCtrl"}).
        when("/gallery", {templateUrl: "views/gallery.html", controller: "GalleryCtrl"}).
        when("/view/:title/:swf?", {templateUrl: "views/view.html", controller: "ViewPageCtrl"}).
        otherwise({redirectTo: '/'});
}]);

homeApp.filter("asDate", function () {
    return function (input) {
        return new Date(input);
    }
});