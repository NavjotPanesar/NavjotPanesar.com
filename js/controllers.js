var homeControllers = angular.module('homeControllers', []);

homeControllers.controller('HomeCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.showMoreBlogPosts = function(){
        $scope.$apply();
        $location.path('blog');
    }
}]);



homeControllers.controller('FeaturedProjectListCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {

    var showAllProjects = function(){
        $scope.toggleText = "See Less";
        $scope.toggleFunction = showFeaturedProjects;
        $http.get("routes/route-projects-all.php").success(
            function (response) {
                var newProject = $scope.calcDiff($scope.projects, response);
                $scope.projects.push.apply($scope.projects, newProject);
            }
        );
    }

    var showFeaturedProjects = function(){
        $scope.toggleText = "See More";
        $scope.toggleFunction = showAllProjects;
        $http.get("routes/route-featured-projects.php").success(
            function (response) {
                if($scope.projects){
                    $scope.projects = $scope.calcSimilar($scope.projects, response);
                } else {
                    $scope.projects = response;
                }
            }
        );
    }

    showFeaturedProjects();
}]);

homeControllers.controller('FeaturedBlogListCtrl', function ($scope, $http) {

    var showAllBlogPosts = function(){
        $scope.toggleText = "See Less";
        $scope.toggleFunction = showFeaturedBlogPosts;
        $http.get("routes/route-blog-all.php").success(
            function (response) {
                var newBlogPosts = $scope.calcDiff($scope.blogPosts, response);
                $scope.blogPosts.push.apply($scope.blogPosts, newBlogPosts);
            }
        );
    }

    var showFeaturedBlogPosts = function(){
        $scope.toggleText = "See More";
        $scope.toggleFunction = showAllBlogPosts;
        $http.get("routes/route-featured-blog.php").success(
            function (response) {
                if($scope.blogPosts){
                    $scope.blogPosts = $scope.calcSimilar($scope.blogPosts, response);
                } else {
                    $scope.blogPosts = response;
                }
            }
        );
    }

    showFeaturedBlogPosts();

});

homeControllers.controller('BlogListCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.page = {title: "Blog", description: "I'm going to eventually start writing stuff, just you wait!"};
    $scope.blogPosts = [];
    $http.get("routes/route-blog-all.php").success(
        function (response) {
            $scope.blogPosts = response;
        }
    );


}]);

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

homeControllers.controller('WorkListCtrl', function ($scope, $http, $filter) {
    $scope.workItems = [
        {
            company: "Blackberry",
            position: "Software Tools Developer Co-op",
            date: "2014",
            description: "pull this from resume or something",
            image: "http://www.userlogos.org/files/logos/macleod.mac/blackberry_logo_black_u.png"
        },
        {
            company: "Pivotal Labs",
            position: "Agile Engineering Co-op",
            date: "2014",
            description: "pull this from resume or something",
            image: "https://pbs.twimg.com/profile_images/585166735092936704/AngWhIjh.png"
        },
        {
            company: "Zynga",
            position: "Software Engineering (Games) Co-op",
            date: "2015",
            description: "pull this from resume or something",
            image: "https://pbs.twimg.com/profile_images/2247033532/New_Zynga_Logo.jpg"
        }
    ];
});


