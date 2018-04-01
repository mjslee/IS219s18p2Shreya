$(document).ready(function () {
    var jsonURL = "images.json";
    $.getJSON(jsonURL, function (json){
        var imgList= "";
        $.each(json.images, function () {
            imgList += '<li><img src= "' + this.imgPath + '"></li>';
        });
        $('#dvimages').append(imgList);
    });
});
