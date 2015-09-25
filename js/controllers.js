var homeControllers = angular.module('homeControllers', []);

homeControllers.controller('HomeCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
}]);



homeControllers.controller('FeaturedProjectListCtrl', ['$scope', '$http', '$location', '$modal', function ($scope, $http, $location, $modal) {

    var showAllProjects = function(){
        $scope.toggleText = "See Less";
        $scope.toggleFunction = showFeaturedProjects;
        $http.get("routes/route-projects-all.php").success(
            function (response) {
                var newProject = $scope.calcDiff($scope.projects, response);
                $scope.projects.push.apply($scope.projects, newProject);
            }
        );
    };

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
    };

    $scope.animationsEnabled = true;
    $scope.openProject = function(project){
        $scope.selectedProject = project;
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/project-modal.html',
            controller: 'ProjectModalCtrl',
            resolve: {
                selectedProject: function () {
                    return $scope.selectedProject;
                }
            }
        });
    };

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

homeControllers.controller('WorkListCtrl', ['$scope', '$http', '$filter', '$modal', function ($scope, $http, $filter, $modal) {
    // should pull this into my DB someday.
    $scope.workItems = [
        {
            company: "Blackberry",
            position: "Software Tools Developer Co-op",
            date: "2014",
            description: [
                "Wrote and maintained web tools using ASP.NET with JQuery and SQL",
                "Created libraries for automated battery life testing in python",
                "Implemented scripts to setup lab equipment for broadcasting of cellular signals",
                "Investigated and resolved tickets for bug fixes and feature requests using Git, Perforce, and SourceSafe for source control"
            ],
            tags: [
                "C#",
                "ASP.NET",
                "JQuery",
                "SQL",
                "Python",
                "Robot Framework",
                "Perforce",
                "SourceSafe"
            ],
            image: "images/work/bb_logo.png"
        },
        {
            company: "Pivotal Labs",
            position: "Agile Engineering Co-op",
            date: "2014",
            description: [
                "Created Android apps using agile and pair programming methodologies",
                "Dealt with asynchronous data loading and concurrency issues",
                "Employed troubleshooting techniques such as analyzing open source code and pair programming"
            ],
            tags: [
                "Java",
                "Android",
                "Git",
                "Eclipse",
                "Android Studio",
                "ANT",
                "Gradle",
                "Travis CI"
            ],
            image: "images/work/pvtl_logo.png"
        },
        {
            company: "Zynga",
            position: "Software Engineering (Games) Co-op",
            date: "2015",
            description: [
                "Added new features to Chess with Friends Android",
                "Dealt with situations that required efficient code and network data caching",
                "Worked with Cocos2d-JS game engine in C++ using Android NDK",
                "Successfully created and pitched game prototype outside of work hours"
            ],
            tags: [
                "Android",
                "NDK",
                "C++",
                "Cocos2D-JS",
                "JavaScript",
                "Java",
                "Git",
                "Jenkins"
            ],
            image: "images/work/zynga_logo.jpg"
        }
    ];


    $scope.animationsEnabled = true;
    $scope.openWorkItem = function(workItem){
        $scope.selectedWorkItem = workItem;
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/work-modal.html',
            controller: 'WorkModalCtrl',
            resolve: {
                selectedWorkItem: function () {
                    return $scope.selectedWorkItem;
                }
            }
        });
    };


}]);


homeControllers.controller('WorkModalCtrl', function ($scope, $modalInstance, selectedWorkItem) {

    $scope.work = selectedWorkItem;

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

homeControllers.controller('ProjectModalCtrl', function ($scope, $modalInstance, selectedProject) {

    $scope.project = selectedProject;
    $scope.currentSliderIndex = 0;

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});