
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
var jsonString = '';

mRequest.addEventListener("load", reqListener);
mRequest.open("GET", "images.json");
mRequest.send();

function reqListener () {
  console.log(this.responseText);
  jsonString=this.responseText;

  var mJson = JSON.parse(jsonString);


  for (var key in mJson.images){
      //alert(mJson.images[key].imgPath);
      
      var gImage = new GalleryImage();
      gImage.location=mJson.images[key].imgLocation;
      gImage.description=mJson.images[key].description;
      gImage.date=mJson.images[key].date;
      gImage.img=mJson.images[key].imgPath;

      mImages.push(gImage);
  }

}

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'insert_url_here_to_image_json';


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











