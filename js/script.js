
var currentSlide = 1;
var maxSlide = 4;

setInterval(function() {
  nextSlide();
}, 6000);


// ------------------------------------ SCROLLING CARROUSEL ------------------------------------ //

function nextSlide() {

  var initialSlide = document.getElementById('slide_' + currentSlide);
  var secondSlide = null;

  if(currentSlide < maxSlide) {
    secondSlide = document.getElementById('slide_' + (currentSlide+1));
  }
  else {
    secondSlide = document.getElementById('slide_1');
    currentSlide = 0;
  }

  hidePage(initialSlide);
  addClass(secondSlide, 'current');
  addClass(secondSlide, 'anim-in');

  secondSlide.addEventListener('animationend', animHelper);
  function animHelper() {
    removeClass(this, 'anim-in');
    this.removeEventListener('animationend', animHelper);
  }

  currentSlide++;
  return true;
}

function hidePage(element) {
  addClass(element, 'anim-out');
  element.addEventListener('animationend', reset);
}

function reset() {
  removeClass(this, 'current');
  removeClass(this, 'anim-in');
  removeClass(this, 'anim-out');

  this.removeEventListener('animationend', reset);
}


// ------------------------------------ GENERAL UTILITIES ------------------------------------ //

function addClass(element, className) {
  if(element.classList.contains(className)) {
    // console.log(className + ' already in classList');
  }
  else {
    element.classList.add(className);
  }
}

function removeClass(element, className) {
  if(element.classList.contains(className)) {
    element.classList.remove(className);
  }
  else {
    // console.log(className + ' not in classList');
  }
}

function toggleClass(element, className) {
  if(element.classList.contains(className)) {
    element.classList.remove(className);
  }
  else {
    element.classList.add(className);
  }
}
