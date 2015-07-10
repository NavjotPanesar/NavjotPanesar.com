var homeControllers = angular.module('homeControllers', []);

homeControllers.controller('FeaturedProjectListCtrl', function ($scope, $http) {
    $http.get("routes/route-featured-projects.php").success(
        function (response) {
            $scope.projects = response;
            console.log(response);
        }
    );
});

homeControllers.controller('ProjectListCtrl', function ($scope, $http) {
    $http.get("routes/route-projects-all.php").success(
        function (response) {
            $scope.page = {title: "Projects", description: "Here you can find my side projects, as well as some hackathon submissions I've worked on as part of a team"};
            $scope.projects = response;
        }
    );
});


homeControllers.controller('FeaturedBlogListCtrl', function ($scope, $http) {
    $http.get("routes/route-featured-blog.php").success(
        function (response) {
            $scope.blogPosts = response;
        }
    );

});

homeControllers.controller('BlogListCtrl', function ($scope, $http) {

    $http.get("routes/route-blog-all.php").success(
        function (response) {
            $scope.page = {title: "Blog", description: "I'm going to eventually start writing stuff, just you wait!"};
            $scope.blogPosts = response;
        }
    );


});

homeControllers.controller('ViewPageCtrl', ['$scope', '$sce', '$routeParams', '$http',
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


homeControllers.controller('GalleryCtrl', function ($scope, $http, $filter) {

    $http.get('routes/route-get-gallery.php')
        .success(function (data, status, headers, config) {
            $scope.page = {title: "Screenshots", description: "These screenshots are auto-uploaded from a modified version of Gyazo screen capture tool"};
            $scope.images = data;
        }).
        error(function (data, status, headers, config) {
        });
});
