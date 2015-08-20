$(document).scroll(function () {
    if ($(document).scrollTop() < 201) {
        $('#fab').css("bottom", "-20px");
    }
    if ($(document).scrollTop() > 201) {
        $('#fab').css("bottom", "40px");
    }
});