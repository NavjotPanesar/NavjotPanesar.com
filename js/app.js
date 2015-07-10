var homeApp = angular.module('Home', [
    'ngRoute', 'angularjs.media.directives', 'Comments', 'smoothScroll', 'homeControllers']);

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