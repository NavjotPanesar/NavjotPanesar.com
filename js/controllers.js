var homeApp = angular.module('Home', [
    'ngRoute','angularjs.media.directives']);

homeApp.controller('FeaturedProjectListCtrl', function ($scope, $http) {
    $http.get("routes/route-featured-projects.php").success(
        function (response) {
            $scope.projects = response;
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

//    $http.get("routes/route-blog-all.php").success(
//        function (response) {
//            $scope.page = {title: "Blog", description: "I'm going to eventually start writing stuff, just you wait!"};
//            $scope.blogPosts = response;
//        }
//    );

    $scope.page = {title: "Blog", description: "I'm going to eventually start writing stuff, just you wait!"};
    $scope.blogPosts = [
        {"title": "How to RGBro", "description": "My general thought process throughout this project", "img": "fa-lightbulb-o", "date": "2015-05-18 01:02:42", "redirect": "", "content": "Recently I undertook a weekend project to modify my computer case with LEDs. Originally I was going to buy the [url=https:\/\/www.nzxt.com\/product\/detail\/98-hue-case-accessory.html]NZXT HUE[\/url] but decided I wanted something custom with more flexibility. \r\n[img]http:\/\/navjotpanesar.com\/images\/tiles\/rgbro.gif[\/img][i]What it kind of looks like. The crossfading is actually simulated here; I'll upload a video within a few days[\/i]\r\n[img]http:\/\/navjotpanesar.com\/images\/proto.jpg[\/img][i][url=https:\/\/learn.adafruit.com\/rgb-led-strips\/overview]Using this guide by Adafruit[\/url], I got a basic LED setup going.[\/i]\r\nAfter this, I decided to add my own spin to things to better suit my needs.\r\nFirst of all, taking power off the Arduino power supply would not do. I wanted to use the full +12v capabilities of the LED strip. I learned that the ATX PSU molex connectors found in almost any computer can deliver a +12v supply, however, this can be unstable if the PSU is not being put under load. After a quick multimeter check to ensure stable power, I wired the connector to the strip's 12v copper pad. \r\nNext was actually communicating with the Arduino. Since this was going inside my PC, USB made the most sense. It also lets me power the Ardiuno. I could have used the +5v volt pin on the molex for this, but this is simpler since the Arduino is plugged into the USB port. At this point, the whole setup turns on\/off with my computer. \r\n[img]http:\/\/navjotpanesar.com\/images\/schema.jpg[\/img][i]The overall schematic[\/i]\r\nNext up: software. This is the whole point I decided to DIY this project. After writing some interfacing code to the Arduino, I ended up two modes of operation. \r\nThe first is straight forward; send a color to the Arduino and it will display that color until further notice. This allows for a lot of flexibility without modifying any Arduino code since I can have the windows application control the timing and colors of the strip to perform any pattern I want.\r\nThe second is a little more involved, but by far my favorite. Send a list of colors to that Arduino, and the LED strips will crossfade between each color on its own. I can close the windows application and it will keep going.\r\nI wrote up a simple visual C# windows application called RGBro. Right now it's kind of ugly, and not that user friendly. It's usable though. It auto detects the Arduino COM port and makes a connection. You can send a color to the LEDs or add a color to the crossfade list. Later on, I want to write a custom control. The idea is that the application would simply be a color picker wheel. You would add or remove points on top of the color wheel, and the crossfading will occur accordingly. \r\n[img]http:\/\/navjotpanesar.com\/images\/rgbro_screen.png[\/img][i]RGBro right now[\/i]\r\nIn theory, as long as a serial connection is made to the Arduino, I can easily write up an interface in any language to control the strip. I'm tempted to do a wifi connection to that board and control it via web app, since I can make the UI pretty and powerful really fast. I feel this would be more useful for a decoration type project, like an LED lamp or outdoor lighting where you would want to control the lights remotely. An android app could be neat as well, since it's really easy to have the LEDs change color based on notifications received (LEDs go blue for facebook notification). ", "numComments": "0", "redirectType": "", "thumb": "", "url": null},
        {"title": "New Dogebot", "description": "New version of dogebot is live, and open source!", "img": "fa-twitter", "date": "2014-11-24 20:57:21", "redirect": "", "content": "So I rewrote dogebot. Check out the [url=http:\/\/navjotpanesar.com\/dogebot]awesome new landing page[\/url] with analytics (graphs), live feeds, and full usage instructions with examples.\r\n\r\nI created dogebot last co-op term, as a simply remote file grabber, and then a meme generator. Now it's a whole twitter bot structure, where you load in plugins dynamically and it just works. I'm always trynig to make it more adaptable for use in other bots, and you can check out my progress on my [url=https:\/\/github.com\/NavjotPanesar\/DogeBot]github page[\/url].\r\n\r\nI added some cool new things, like using threads to maximize how many tweets my bot reads, using the twitter streaming api for real time reading, and sending off packets to a remote google app engine server so I can run some neat analytics soon (I'm going to add tons of graphs). I'll be writing more about all this as I go.", "numComments": "2", "redirectType": "", "thumb": "\/files\/doge_icon.png", "url": null},
        {"title": "How to RGBro", "description": "My general thought process throughout this project", "img": "fa-lightbulb-o", "date": "2015-05-18 01:02:42", "redirect": "", "content": "Recently I undertook a weekend project to modify my computer case with LEDs. Originally I was going to buy the [url=https:\/\/www.nzxt.com\/product\/detail\/98-hue-case-accessory.html]NZXT HUE[\/url] but decided I wanted something custom with more flexibility. \r\n[img]http:\/\/navjotpanesar.com\/images\/tiles\/rgbro.gif[\/img][i]What it kind of looks like. The crossfading is actually simulated here; I'll upload a video within a few days[\/i]\r\n[img]http:\/\/navjotpanesar.com\/images\/proto.jpg[\/img][i][url=https:\/\/learn.adafruit.com\/rgb-led-strips\/overview]Using this guide by Adafruit[\/url], I got a basic LED setup going.[\/i]\r\nAfter this, I decided to add my own spin to things to better suit my needs.\r\nFirst of all, taking power off the Arduino power supply would not do. I wanted to use the full +12v capabilities of the LED strip. I learned that the ATX PSU molex connectors found in almost any computer can deliver a +12v supply, however, this can be unstable if the PSU is not being put under load. After a quick multimeter check to ensure stable power, I wired the connector to the strip's 12v copper pad. \r\nNext was actually communicating with the Arduino. Since this was going inside my PC, USB made the most sense. It also lets me power the Ardiuno. I could have used the +5v volt pin on the molex for this, but this is simpler since the Arduino is plugged into the USB port. At this point, the whole setup turns on\/off with my computer. \r\n[img]http:\/\/navjotpanesar.com\/images\/schema.jpg[\/img][i]The overall schematic[\/i]\r\nNext up: software. This is the whole point I decided to DIY this project. After writing some interfacing code to the Arduino, I ended up two modes of operation. \r\nThe first is straight forward; send a color to the Arduino and it will display that color until further notice. This allows for a lot of flexibility without modifying any Arduino code since I can have the windows application control the timing and colors of the strip to perform any pattern I want.\r\nThe second is a little more involved, but by far my favorite. Send a list of colors to that Arduino, and the LED strips will crossfade between each color on its own. I can close the windows application and it will keep going.\r\nI wrote up a simple visual C# windows application called RGBro. Right now it's kind of ugly, and not that user friendly. It's usable though. It auto detects the Arduino COM port and makes a connection. You can send a color to the LEDs or add a color to the crossfade list. Later on, I want to write a custom control. The idea is that the application would simply be a color picker wheel. You would add or remove points on top of the color wheel, and the crossfading will occur accordingly. \r\n[img]http:\/\/navjotpanesar.com\/images\/rgbro_screen.png[\/img][i]RGBro right now[\/i]\r\nIn theory, as long as a serial connection is made to the Arduino, I can easily write up an interface in any language to control the strip. I'm tempted to do a wifi connection to that board and control it via web app, since I can make the UI pretty and powerful really fast. I feel this would be more useful for a decoration type project, like an LED lamp or outdoor lighting where you would want to control the lights remotely. An android app could be neat as well, since it's really easy to have the LEDs change color based on notifications received (LEDs go blue for facebook notification). ", "numComments": "0", "redirectType": "", "thumb": "", "url": null},
        {"title": "New Dogebot", "description": "New version of dogebot is live, and open source!", "img": "fa-twitter", "date": "2014-11-24 20:57:21", "redirect": "", "content": "So I rewrote dogebot. Check out the [url=http:\/\/navjotpanesar.com\/dogebot]awesome new landing page[\/url] with analytics (graphs), live feeds, and full usage instructions with examples.\r\n\r\nI created dogebot last co-op term, as a simply remote file grabber, and then a meme generator. Now it's a whole twitter bot structure, where you load in plugins dynamically and it just works. I'm always trynig to make it more adaptable for use in other bots, and you can check out my progress on my [url=https:\/\/github.com\/NavjotPanesar\/DogeBot]github page[\/url].\r\n\r\nI added some cool new things, like using threads to maximize how many tweets my bot reads, using the twitter streaming api for real time reading, and sending off packets to a remote google app engine server so I can run some neat analytics soon (I'm going to add tons of graphs). I'll be writing more about all this as I go.", "numComments": "2", "redirectType": "", "thumb": "\/files\/doge_icon.png", "url": null}
    ];
});

homeApp.controller('ViewPageCtrl', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
        $scope.title = $routeParams.title;
        $scope.swf = $routeParams.swf;


        //fire api request for post info
        $scope.post = {"title": "How to RGBro", "description": "My general thought process throughout this project", "img": "fa-lightbulb-o", "date": "2015-05-18 01:02:42", "redirect": "", "content": "Recently I undertook a weekend project to modify my computer case with LEDs. Originally I was going to buy the [url=https:\/\/www.nzxt.com\/product\/detail\/98-hue-case-accessory.html]NZXT HUE[\/url] but decided I wanted something custom with more flexibility. \r\n[img]http:\/\/navjotpanesar.com\/images\/tiles\/rgbro.gif[\/img][i]What it kind of looks like. The crossfading is actually simulated here; I'll upload a video within a few days[\/i]\r\n[img]http:\/\/navjotpanesar.com\/images\/proto.jpg[\/img][i][url=https:\/\/learn.adafruit.com\/rgb-led-strips\/overview]Using this guide by Adafruit[\/url], I got a basic LED setup going.[\/i]\r\nAfter this, I decided to add my own spin to things to better suit my needs.\r\nFirst of all, taking power off the Arduino power supply would not do. I wanted to use the full +12v capabilities of the LED strip. I learned that the ATX PSU molex connectors found in almost any computer can deliver a +12v supply, however, this can be unstable if the PSU is not being put under load. After a quick multimeter check to ensure stable power, I wired the connector to the strip's 12v copper pad. \r\nNext was actually communicating with the Arduino. Since this was going inside my PC, USB made the most sense. It also lets me power the Ardiuno. I could have used the +5v volt pin on the molex for this, but this is simpler since the Arduino is plugged into the USB port. At this point, the whole setup turns on\/off with my computer. \r\n[img]http:\/\/navjotpanesar.com\/images\/schema.jpg[\/img][i]The overall schematic[\/i]\r\nNext up: software. This is the whole point I decided to DIY this project. After writing some interfacing code to the Arduino, I ended up two modes of operation. \r\nThe first is straight forward; send a color to the Arduino and it will display that color until further notice. This allows for a lot of flexibility without modifying any Arduino code since I can have the windows application control the timing and colors of the strip to perform any pattern I want.\r\nThe second is a little more involved, but by far my favorite. Send a list of colors to that Arduino, and the LED strips will crossfade between each color on its own. I can close the windows application and it will keep going.\r\nI wrote up a simple visual C# windows application called RGBro. Right now it's kind of ugly, and not that user friendly. It's usable though. It auto detects the Arduino COM port and makes a connection. You can send a color to the LEDs or add a color to the crossfade list. Later on, I want to write a custom control. The idea is that the application would simply be a color picker wheel. You would add or remove points on top of the color wheel, and the crossfading will occur accordingly. \r\n[img]http:\/\/navjotpanesar.com\/images\/rgbro_screen.png[\/img][i]RGBro right now[\/i]\r\nIn theory, as long as a serial connection is made to the Arduino, I can easily write up an interface in any language to control the strip. I'm tempted to do a wifi connection to that board and control it via web app, since I can make the UI pretty and powerful really fast. I feel this would be more useful for a decoration type project, like an LED lamp or outdoor lighting where you would want to control the lights remotely. An android app could be neat as well, since it's really easy to have the LEDs change color based on notifications received (LEDs go blue for facebook notification). ", "numComments": "0", "redirectType": "", "thumb": "", "url": null};
    }
]);

homeApp.controller('CommentCtrl', function ($scope, $http, $filter) {
    //get comments here
    $scope.comments = [{name: "Navjot", content : "Yo!", "date": "2015-05-18 01:02:42"}];
    $scope.addComment = function(comment){
        comment.page = $scope.title;
        $scope.comments.push(angular.copy(comment));
        //send to server here
        console.log($scope.comments);
    };
});

//angular is cool 8)
homeApp.filter("asDate", function () {
    return function (input) {
        return new Date(input);
    }
});


homeApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when("/", {templateUrl: "views/home.html", controller: ""}).
        when("/projects", {templateUrl: "views/projects.html", controller: "ProjectListCtrl"}).
        when("/blog/", {templateUrl: "views/blog.html", controller: "BlogListCtrl"}).
        when("/view/:title/:swf?", {templateUrl: "views/view.html", controller: "ViewPageCtrl"}).
        otherwise({redirectTo: '/drivers'});
}]);