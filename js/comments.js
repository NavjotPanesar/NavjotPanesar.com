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