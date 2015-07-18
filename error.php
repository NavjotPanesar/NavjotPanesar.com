<?php

$status = $_SERVER['REDIRECT_STATUS'];
$codes = array(
    403 => array('403 Forbidden', 'The server has refused to fulfill your request.'),
    404 => array('404 Not Found', 'The document/file requested was not found.'),
    405 => array('405 Method Not Allowed', 'The method specified in the Request-Line is not allowed for the specified resource.'),
    408 => array('408 Request Timeout', 'Your browser failed to sent a request in the time allowed by the server.'),
    500 => array('500 Internal Server Error', 'The request was unsuccessful due to an unexpected condition encountered by the server.'),
    502 => array('502 Bad Gateway', 'The server received an invalid response from the upstream server while trying to fulfill the request.'),
    504 => array('504 Gateway Timeout', 'The upstream server failed to send a request in the time allowed by the server.')
);

$title = $codes[$status][0];
$message = $codes[$status][1];
if ($title == false || strlen($status) != 3) {
    $message = 'Please supply a valid status code.';
}

header("HTTP/1.1 ". $title);


?>
<!DOCTYPE html>
<html style="background: #e6e6e6;">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <link href="http://navjotpanesar.com/css/bootstrap.min.css" rel="stylesheet">
    <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $title; ?></title>
</head>


<body>


    <div class="jumbotron" style="background: #03a9f4;  position:absolute; float:left; left:0px; bottom:30px; z-index:1; width:100%;">
        <div class="container" style="color:#e3e3e3;">
                <?php
                echo '<p><h1>' . $title . '</h1></p>' .  '<p>' . $message . '</p>';
                echo '<p><small style="font-size: 14px;">¯\_(ツ)_/¯</small></p>'
                ?>
                <a class="btn btn-primary btn-sm" href="" onClick="window.history.back();"><i class="fa fa-chevron-left"></i></a>
                <a class="btn btn-primary btn-sm" href="\"><i class="fa fa-home"></i></a>

            <?php
            if($status == 404){
                echo '<div class="container" >
                            <img src="http://navjotpanesar.com/images/link.png" style="position:absolute; float:right; right:0px; bottom:-30px; z-index:-2;">
                        </div>';
            }
            ?>
        </div>
    </div>


<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-49840919-1', 'navjotpanesar.com');
    ga('send', 'pageview');

</script>

</body>

</html>