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

dogeApp.filter("asDate", function () {
    return function (input) {
        return new Date(input);
    }
});