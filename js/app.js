var homeApp = angular.module('Home', [
    'ngRoute', 'Comments', 'smoothScroll', 'homeControllers']);

homeApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when("/", {templateUrl: "views/home.html", controller: ""}).
        when("/projects", {templateUrl: "views/projects.html", controller: "ProjectListCtrl"}).
        when("/blog", {templateUrl: "views/blog.html", controller: "BlogListCtrl"}).
        when("/gallery", {templateUrl: "views/gallery.html", controller: "GalleryCtrl"}).
        when("/view/:title/:swf?", {templateUrl: "views/view.html", controller: "ViewPageCtrl"}).
        otherwise({redirectTo: '/drivers'});
}]);

homeApp.filter("asDate", function () {
    return function (input) {
        return new Date(input);
    }
});


homeApp.directive('prefetch', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                    document.getElementById("splash").style.display = 'none';
            });
        }
    };
});