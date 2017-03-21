(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Set Footer Copyright Year to this Year
var date = new Date().getFullYear();
var copyright = document.querySelector('[data-copyright="true"]');
copyright.innerHTML = date;

// Modal and semi-opaque background screen
var modal = document.querySelector('[data-modal="true"]');
var frame = document.querySelector('[data-frame="true"]');
var screen = document.querySelector('[data-screen="true"]');

// Watch Video Button
var watchBtn = document.querySelector('[data-modal_launch="true"]');

// Modal Close Button
var closeBtn = document.querySelector('[data-closeBtn="true"]');

// Gallery Thumbnails
var thumbnails = document.querySelectorAll('[data-thumbnail="true"]');
var frame = document.querySelector('[data-frame="true"]');

// Video
/* Timer interval is used to calculate the start time of the video
so the video player always starts where the viewer left off  */
var video = document.querySelector('[data-video="true"]');
var videoLength = 190;
var currentTime = 0;
var timer;

var showModal = function(){
  screen.style.opacity = 0.3;
  modal.style.display = "block";
  modal.style.visibility = "visible";
  modal.style.opacity = "1";
  document.body.style.overflow = "hidden";
};

var hideModal = function(){
  screen.style.opacity = 1;
  modal.style.visibility = "hidden";
  modal.style.opacity = 0;
  document.body.style.overflow = "visible";
};

var getGalleryImg = function(thumbnail_url){
  return thumbnail_url.split('tn_')[1];
}

var clickFocusedElement = function(focusedElement){
  if (event.keyCode == 13){
    focusedElement.click();
  }
}

var loadVideo = function(){
  video.src += "&autoplay=1&end="+videoLength;
    timer = setInterval( function(){
      if (currentTime >= videoLength){
        clearInterval(timer);
        currentTime = 0;
        hideModal();
      };
      currentTime++;
    }, 1000);
}

// Watch Video Button Event Listener - launches modal onClick
if (watchBtn != null){
  watchBtn.addEventListener("keyup", function(){
    if (event.keyCode == 13){
      loadVideo();
      showModal();
    };
  });

  watchBtn.addEventListener("click", function(){
    // Show Modal
    loadVideo();
    showModal();
  });
}

// Esc key listener for closing modal
document.addEventListener("keyup", function(event){
  event.preventDefault();
  if (event.keyCode == 27){
    closeBtn.click();
  }
});

// Modal Close Button Event Listener - closes modal onClick
if (closeBtn != null){
  closeBtn.addEventListener("keyup", function(event){
    event.preventDefault();
    clickFocusedElement(this);
  });

  closeBtn.addEventListener("click", function(){
    if (document.getElementsByTagName("body")[0].className.match('gallery')){
      hideModal();
    } else {
    // Hide Modal
    clearInterval(timer);
      if (currentTime >= videoLength){ currentTime = 0 };
      video.src = "http://www.youtube.com/embed/E59JQmHqou4?&controls=0&end="+videoLength+"&start="+currentTime;
      hideModal();
    }
  });
}

// Gallery Thumnail Event Listener - launches modal onClick
// populates modal frame with appropriate gallery photo
if (thumbnails != null && frame!= null){
  // Show interactive gallery if media query matches > 680px wide
  // make gallery thumbnails clickable or accessible via tab focus + enter key
    for(i=0; i<thumbnails.length; i++) {
      thumbnails[i].addEventListener("keyup", function(event){
        event.preventDefault();
        clickFocusedElement(this);
      });

      thumbnails[i].addEventListener('click', function(event){
        event.preventDefault();
        if (window.matchMedia("(min-width: 681px)").matches){
          var imgToLoad = getGalleryImg(this.src);
          var imgAltText = this.getAttribute("alt");
          var newImg = document.createElement("img");
          frame.style.backgroundImage = "url('/images/gallery/" + imgToLoad + "')";
          frame.style.backgroundPosition = " center center";
          frame.style.backgroundRepeat = "no-repeat";
          frame.style.backgroundSize = "contain";
          frame.style.height = "90%";
          showModal();
        };
      });
    }
}

},{}]},{},[1])