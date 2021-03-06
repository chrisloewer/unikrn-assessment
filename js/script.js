// Chris Loewer
// Unikrn Application
// January 29 2016

// Initialize variables
var currentSlide = 1;
var maxSlide = 3;
var alarm;


window.onload = function() {
  // Initialize page
  loadAlarmWidget();
  loadProfileWidget();
  updateButton();
  updateAlarm();

  // Start carrousel widget
  setInterval(function() {
    nextSlide();
  }, 6000);

};


// ------------------------------------ TIMER LOGIC -------------------------------------------- //

// Ensures time picker selected a valid time
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

    // Time until alarm will sound
    var time = calculateAlarm(hour, minute);

    clearTimeout(alarm);
    alarm = setTimeout(function() {
      alert('Alarm Triggered \n' + padInt(hour,2) +':'+ padInt(minute, 2));
      document.getElementById('alarm_display').innerHTML = '';
      localStorage.removeItem('hour');
      localStorage.removeItem('minute');
    }, time);

    var alarmDisplay = document.getElementById('alarm_display');
    alarmDisplay.innerHTML = 'Alarm set for ' + padInt(hour,2) +':'+ padInt(minute, 2) ;

    // Persistently store alarm time
    api_setAlarm(hour, minute);

    return true;
  }
  else {
    return false;
  }
}

// sets alarm according to user's saved alarms
function updateAlarm() {
  var a = api_getAlarm();
  if (a) {
    clearTimeout(alarm);
    alarm = setTimeout(function() {
      alert('Alarm Triggered \n' + padInt(a.hour,2) +':'+ padInt(a.minute, 2));
      document.getElementById('alarm_display').innerHTML = '';
      localStorage.removeItem('hour');
      localStorage.removeItem('minute');
    }, a.ms);

    var alarmDisplay = document.getElementById('alarm_display');
    alarmDisplay.innerHTML = 'Alarm set for ' + padInt(a.hour,2) +':'+ padInt(a.minute, 2) ;
  }

}

// gets time in milliseconds until alarm sounds
function calculateAlarm(hour, minute) {
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
  console.log('alarm in: ' + hours + ':' + minutes + ':' + seconds);

  return d3;
}


// ------------------------------------ LOGIN FUNCTIONALITY ------------------------------------- //

function login() {
  var user = api_getUser();

  // Persist info locally for user who logged in
  localStorage.setItem("user", JSON.stringify(user));

  // Reload widgets that change on login
  loadAlarmWidget();
  loadProfileWidget();
  updateButton();
  updateAlarm();

  return true;
}

// Gets user information if already logged in
function getUser() {
  var user = localStorage.getItem("user");
  if(user != null) {
    return JSON.parse(user);
  }
  else {
    return false;
  }
}

function logout() {
  // disable alarm
  clearTimeout(alarm);

  // Clear user data
  // Normally would include clearing locally saved alarm time, but since there is no database
  // I chose to keep alarm saved for future login
  // Instead of: localStorage.clear();
  localStorage.removeItem('user');

  // Reload widgets that change on login
  loadAlarmWidget();
  loadProfileWidget();
  updateButton();
}

function updateButton() {
  if (getUser()) {
    removeClass(document.getElementById('login_button'), 'current');
    addClass(document.getElementById('logout_button'), 'current');
  }
  else {
    removeClass(document.getElementById('logout_button'), 'current');
    addClass(document.getElementById('login_button'), 'current');
  }
}


// ------------------------------------ HANDLEBARS UTILITIES ------------------------------------ //

function loadAlarmWidget() {
  var user = getUser();
  if (user) {
    // logged in: alarms for user
    insertJsonTemplate('w_2', 'time_widget', user);
  }
  else {
    // logged out: request they login
    insertJsonTemplate('w_2', 'time_loggedOut', {});
  }
}

function loadProfileWidget() {
  var user = getUser();
  if (user) {
    // logged in: display user profile
    insertJsonTemplate('w_3', 'profile_widget', user);
  }
  else {
    // logged out: request they login
    insertJsonTemplate('w_3', 'profile_loggedOut', {});
  }
}

// Inserts into elementName, a template populated by json
function insertJsonTemplate(elementId, templateName, json) {
  var element = document.getElementById(elementId);
  var template = Handlebars.templates[templateName];
  element.innerHTML = template(json);
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

  // Handle animating slide in and out
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

// Adds leading zeros if necessary
function padInt(int, len){
  var str = int + '';
  while (str.length < len) {
    str = '0' + str;
  }
  return str;
}


// ------------------------------------ API FUNCTIONALITY ------------------------------------ //

function api_getUser() {
  // This is where the api would check the user database to ensure that user credentials are correct
  // and returns the appropriate user
  // var usr = api.getUser();
  // Instead, return an example user

  return {
    "name": "Christopher Loewer",
    "img": "resources/profile.jpg",
    "website": "http://chrisloewer.com",
    "blog": "http://blog.chrisloewer.com",
    "linkedin": "https://www.linkedin.com/in/chrisloewer",
    "github": "https://github.com/chrisloewer",
    "bio": "Full-stack web developer | Amateur coffee aficionado | Longboarder | Film addict | Unikrn hopeful"
  };
}

// checks if user has created an alarm previously
function api_getAlarm() {
  // This is where the logic would go checking if the user had an alarm saved
  // var a = api.getAlarm();
  // Instead, check localStorage

  var hour = localStorage.getItem('hour');
  var minute = localStorage.getItem('minute');

  if (hour != null && minute != null) {
    return {
      "ms": calculateAlarm(hour, minute),
      "hour": hour,
      "minute": minute
    };
  }
  else {
    return false;
  }
}

function api_setAlarm(hour, minute) {
  // This would update the database, storing the alarm for the logged-in user
  // Instead, use localStorage
  localStorage.setItem('hour', hour);
  localStorage.setItem('minute', minute);
}
