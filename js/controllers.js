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


    $http.get('json/work.json')
        .success(function (data, status, headers, config) {
            $scope.workItems = data;
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
        }).
        error(function (data, status, headers, config) {
        });




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