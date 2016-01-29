
var currentSlide = 1;
var maxSlide = 4;
var alarm;

setInterval(function() {
  nextSlide();
}, 6000);


// ------------------------------------ TIMER LOGIC -------------------------------------------- //

function validateAlarm() {
  var hourField = document.getElementById('hour_field');
  var minuteField = document.getElementById('minute_field');

  var hour;
  var minute;
  var vFlag = true;

  // validate hourField
  hour = parseInt(hourField.value);
  if(hour>=0 && hour<=23){
    removeClass(hourField, 'error');
  }
  else {
    vFlag = false;
    addClass(hourField, 'error');
  }

  // validate minuteField
  minute = parseInt(minuteField.value);
  if(minute>=0 && minute<=59){
    removeClass(minuteField, 'error');
  }
  else {
    vFlag = false;
    addClass(minuteField, 'error');
  }

  return vFlag;
}

function setAlarm() {

  if(validateAlarm() == true) {

    var hour = parseInt(document.getElementById('hour_field').value);
    var minute = parseInt(document.getElementById('minute_field').value);

    var d1 = new Date();
    var d2 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate(), hour, minute, 0, 0);

    // Diff in milliseconds
    var d3 = d2.getTime() - d1.getTime();

    // If alarm is before current time, add a day
    if (d3 <= 0) {
      d3 += 24 * 60 * 60 * 1000;
    }
    var seconds = Math.floor((d3 / 1000) % 60);
    var minutes = Math.floor((d3 / (60 * 1000)) % 60);
    var hours = Math.floor(d3 / (60 * 60 * 1000));

    console.log(hours + ':' + minutes + ':' + seconds);


    alarm = setTimeout(function() {
      alert('ALARM: it is \n' + hour +':'+ minute);
    }, d3);

    var alarmDisplay = document.getElementById('alarm_display');
    alarmDisplay.innerHTML = 'Alarm set for ' + padInt(hour,2) +':'+ padInt(minute, 2) ;

    // return time until alarm in milliseconds
    return d3;
  }
}


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

function padInt(int, len){
  var str = int + '';
  while (str.length < len) {
    str = '0' + str;
  }
  return str;
}
