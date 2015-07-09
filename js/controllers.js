angular.module("Comments", [])
    .controller('CommentCtrl', function ($scope, $http) {
        $http.get('routes/route-get-comments.php', {
            params: {
                page: $scope.title
            }
        })
            .success(function (data, status, headers, config) {
                $scope.comments = data;
            }).
            error(function (data, status, headers, config) {
            });

        $scope.addComment = function (comment) {
            comment.page = $scope.title;

            $http.post('routes/route-post-comment.php', comment).
                success(function (data, status, headers, config) {
                    $scope.comments.push(angular.copy(comment));
                }).
                error(function (data, status, headers, config) {
                });
        };
    });

var homeApp = angular.module('Home', [
    'ngRoute', 'angularjs.media.directives', 'Comments', 'smoothScroll']);

var dogeApp = angular.module('Doge', ['Comments']);

dogeApp.controller('DogebotCtrl', function ($scope) {
    $scope.title = "Dogebot";
    $scope.tweets = [
        {"content":"#dogebot #parrot I hate cats!"},
        {"content":"@you I hate cats!, Woof!"},
        {"content":"#dogebot #donger"},
        {"content":"@you ヽ༼ຈل͜ຈ༽ﾉ raise your dongers ヽ༼ຈل͜ຈ༽ﾉ"},
        {"content":"#dogebot #dealwithit"},
        {"content":"@you deal with it", img:"images/dogewithit.gif"},
        {"content":"#dogebot #rekt"},
        {"content":"@you get #REKT", img: "images/rekt.gif"},
        {"content":"#dogebot #smite"},
        {"content":"@you Get smitten, scrub", img: "images/smite.jpg"},
        {"content":"#dogebot #meme #doge line 1, line 2"},
        {"content":"@you ", img: "images/dogesample.jpg"},
        {"content":"#dogebot #doge line 1, line 2"},
        {"content":"@you", img: "images/dogesample.jpg"}
    ];
});

homeApp.controller('FeaturedProjectListCtrl', function ($scope, $http) {
    $http.get("routes/route-featured-projects.php").success(
        function (response) {
            $scope.projects = response;
            console.log(response);
        }
    );
});

homeApp.controller('ProjectListCtrl', function ($scope, $http) {
    $http.get("routes/route-projects-all.php").success(
        function (response) {
            $scope.page = {title: "Projects", description: "Here you can find my side projects, as well as some hackathon submissions I've worked on as part of a team"};
            $scope.projects = response;
        }
    );
});


homeApp.controller('FeaturedBlogListCtrl', function ($scope, $http) {
    $http.get("routes/route-featured-blog.php").success(
        function (response) {
            $scope.blogPosts = response;
        }
    );

});

homeApp.controller('BlogListCtrl', function ($scope, $http) {

    $http.get("routes/route-blog-all.php").success(
        function (response) {
            $scope.page = {title: "Blog", description: "I'm going to eventually start writing stuff, just you wait!"};
            $scope.blogPosts = response;
        }
    );


});

homeApp.controller('ViewPageCtrl', ['$scope', '$sce', '$routeParams', '$http',
    function ($scope, $sce, $routeParams, $http) {
        $scope.title = $routeParams.title;
        $scope.swf = $routeParams.swf;

        $http.get('routes/route-get-page.php', {
            params: {
                page: $scope.title
            }
        })
            .success(function (data, status, headers, config) {
                $scope.post = data;
                $scope.post.content = $sce.trustAsHtml($scope.post.content);
            }).
            error(function (data, status, headers, config) {
            });

    }
]);


homeApp.controller('GalleryCtrl', function ($scope, $http, $filter) {

    $http.get('routes/route-get-gallery.php')
        .success(function (data, status, headers, config) {
            $scope.page = {title: "Screenshots", description: "These screenshots are auto-uploaded from a modified version of Gyazo screen capture tool"};
            $scope.images = data;
        }).
        error(function (data, status, headers, config) {
        });
});


//angular is cool 8)
homeApp.filter("asDate", function () {
    return function (input) {
        return new Date(input);
    }
});

dogeApp.filter("asDate", function () {
    return function (input) {
        return new Date(input);
    }
});


homeApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when("/", {templateUrl: "views/home.html", controller: ""}).
        when("/projects", {templateUrl: "views/projects.html", controller: "ProjectListCtrl"}).
        when("/blog", {templateUrl: "views/blog.html", controller: "BlogListCtrl"}).
        when("/gallery", {templateUrl: "views/gallery.html", controller: "GalleryCtrl"}).
        when("/view/:title/:swf?", {templateUrl: "views/view.html", controller: "ViewPageCtrl"}).
        otherwise({redirectTo: '/drivers'});
}]);