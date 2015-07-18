var homeControllers = angular.module('homeControllers', []);

homeControllers.controller('HomeCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.showMoreBlogPosts = function(){
        $scope.$apply();
        $location.path('blog');
    }
}]);


homeControllers.controller('FeaturedProjectListCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $http.get("routes/route-featured-projects.php").success(
        function (response) {
            $scope.projects = response;
        }
    );
    $scope.showMoreProjects = function(){
        $http.get("routes/route-projects-all.php").success(
            function (response) {
                $scope.projects.push(response[4]);
            }
        );
    }
}]);

homeControllers.controller('ProjectListCtrl', ['$scope', '$http', '$location',function ($scope, $http, $location) {
    $scope.page = {title: "Projects", description: "Here you can find my side projects, as well as some hackathon submissions I've worked on as part of a team"};
    $scope.projects = [];
   $http.get("routes/route-projects-all.php").success(
        function (response) {
            $scope.projects = response;
        }
    );
}]);


homeControllers.controller('FeaturedBlogListCtrl', function ($scope, $http) {
    $http.get("routes/route-featured-blog.php").success(
        function (response) {
            $scope.blogPosts = response;
        }
    );

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


