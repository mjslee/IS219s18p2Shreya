
// requestAnim shim layer by Paul Irish
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function(/* function */ callback, /* DOMElement */ element){
              window.setTimeout(callback, 1000 / 60);
            };
  })();


// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
  requestAnimFrame( animate );
  var currentTime = new Date().getTime();
  if (mLastFrameTime === 0) {
      mLastFrameTime = currentTime;
  }

  if ((currentTime - mLastFrameTime) > mWaitTime) {
      swapPhoto();
      mLastFrameTime = currentTime;
  }
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function getQueryParams(qs) {
    qs = qs.split("+").join(" ");
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;
    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
}
    return params;
}
var $_GET = getQueryParams(document.location.search);

var mUrl = "images.json";
if ($_GET["json"] != ""){
    mUrl = $_GET["json"]
}
console.log($_GET["json"]); // would output "John"

var mImages = [];
var current = 0;

function swapPhoto() {
  //Add code here to access the #slideShow element.
  //Access the img element and replace its source
  //with a new image from your images array which is loaded 
  //from the JSON string
  console.log('swap photo');

  swapImage();
}


function swapImage(){

  if (current < mImages.length - 1) {
      console.log(mImages[current].img);
      document.getElementById("photo").src = mImages[current].img;
      document.getElementsByClassName("location")[0].innerHTML = "Location : " + mImages[current].location;
      document.getElementsByClassName("description")[0].innerHTML = "Description : " + mImages[current].description;
      document.getElementsByClassName("date")[0].innerHTML = "Date : " + mImages[current].date;
      current++;
  }else {
      current = 0;
  }
}





function GalleryImage() {
  //implement me as an object to holdhttp://127.0.0.1/project2/img/places/thailand.jpg the following data about an image:
  this.location = "";
  this.description = "";
  this.date = "";
  this.img = "" ;
}

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = [];

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = '';

//url: local vs heroku -----------------------------------------------------------
//var json_url = "http://localhost/is219s18Candelaria-p2/" //local server
var json_url = "http://is219s18p2Shreya.herokuapp.com/" //heroku


var json = json_url + "images.json";


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
  // This initially hides the photos' metadata information
  //$('.details').eq(0).hide();

  $("#prevPhoto").click(function () {
      console.log(current);
      if(current > 1) 
          current--;
          current--;
      swapImage();
  });

  $("#nextPhoto").click(function () {
      console.log(current);
      if(current < mImages.length) 
          current++;
      swapImage();
  });

});

window.addEventListener('load', function() {
  
  console.log('window loaded');
  //click handler to the img.moreIndicator to toggle css classes
  $(".moreIndicator").click(function () {
      $(".moreIndicator").toggleClass("rot90 rot270");
      $("div.details").fadeToggle("slow", function () { });
  });

}, false);

