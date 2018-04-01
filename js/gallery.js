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

// Counter for the mImages array
var mCurrentIndex = -1;

function swapPhoto() {
//Add code here to access the #slideShow element.
//Access the img element and replace its source
//with a new image from your images array which is loaded 
//from the JSON string
console.log('swap photo');

if (mCurrentIndex < mImages.length-1) {
    mCurrentIndex++;
} else {
    mCurrentIndex = 0;
}

//update image path
//document.getElementById("photo").src = mImages[mCurrentIndex].img;

//update image details
//document.getElementById("location").innerHTML = mImages[mCurrentIndex].location;
//document.getElementById("description").innerHTML = mImages[mCurrentIndex].description;
//document.getElementById("date").innerHTML = mImages[mCurrentIndex].date;


}


// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = '';


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
$('.details').eq(0).hide();

$("#moreIndicator").click(function() {
    if($("#moreIndicator").hasClass("rot90")) {
        $("#moreIndicator").removeClass("rot90");
        $(".img-details").fadeToggle("slow");
        $("#moreIndicator").addClass("rot270");
    } else {
        $("#moreIndicator").removeClass("rot270");
        $(".img-details").fadeToggle("slow");
        $("#moreIndicator").addClass("rot90");
    }   
})

$("#prevPhoto").click(function() {
    prevPhoto();
});
                  
$("#nextPhoto").click(function() {
    nextPhoto();
});    



});


function prevPhoto() {
if(mCurrentIndex != 0) {
    //next photo
    mCurrentIndex--;
} else {
    mCurrentIndex = mImages.length-1;
}

//update image path
document.getElementById("photo").src = mImages[mCurrentIndex].img;

//update image details
document.getElementById("location").innerHTML = mImages[mCurrentIndex].location;
document.getElementById("description").innerHTML = mImages[mCurrentIndex].description;
document.getElementById("date").innerHTML = mImages[mCurrentIndex].date;
}
function nextPhoto() {
if(mCurrentIndex != mImages.length-1) {
    //next photo
    mCurrentIndex++;
} else {
    mCurrentIndex = 0;
}

//update image path
document.getElementById("photo").src = mImages[mCurrentIndex].img;

//update image details
document.getElementById("location").innerHTML = mImages[mCurrentIndex].location;
document.getElementById("description").innerHTML = mImages[mCurrentIndex].description;
document.getElementById("date").innerHTML = mImages[mCurrentIndex].date;
}



function createObjects(data) {
for(i=0;i<data.images.length;i++) {
    //print out every item from array
    //console.log(data.images[i]);
    
    var imgPath = data.images[i].imgPath;
    var imgLocation = data.images[i].imgLocation;
    var description = data.images[i].description;
    var date = data.images[i].date;
    
    //create GalleryImage object and store into array
    mImages[i] = new GalleryImage(imgPath, imgLocation, description, date);
    
}

//print array
//console.log(mImages);

}

window.addEventListener('load', function() {
console.log('window loaded');

mRequest.open('GET', "http://is219s18p2shreya.herokuapp.com/images.json", true);
mRequest.responseType = 'json';
mRequest.send();
mRequest.onload = function() {
    var jsonDataArray = mRequest.response;
    createObjects(jsonDataArray);
}
    

}, false);

function GalleryImage(path, location, description, date) {
//implement me as an object to hold the following data about an image:
//1. location where photo was taken
//2. description of photo
//3. the date when the photo was taken
//4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)

this.location = location;
this.description = description;
this.date = date;
this.img = path;


}













