(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['profile_loggedOut'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "\r\n<div class=\"content\">\r\n  <h2>Profile</h2>\r\n\r\n  <p class=\"bio\">You must log in to view your profile.</p>\r\n\r\n</div>\r\n";
},"useData":true});
templates['profile_widget'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=container.escapeExpression;

  return "\r\n<div class=\"content\">\r\n  <h2>Profile</h2>\r\n\r\n  <img class=\"profile-pic\" src=\""
    + alias3(((helper = (helper = helpers.img || (depth0 != null ? depth0.img : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"img","hash":{},"data":data}) : helper)))
    + "\">\r\n  <div class=\"user-name\">"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\r\n\r\n  <div class=\"links\">\r\n    <div class=\"left\">\r\n      <a href=\""
    + alias3(((helper = (helper = helpers.website || (depth0 != null ? depth0.website : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"website","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">Website</a><br/>\r\n      <a href=\""
    + alias3(((helper = (helper = helpers.blog || (depth0 != null ? depth0.blog : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"blog","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">Blog</a><br/>\r\n    </div>\r\n    <div class=\"right\">\r\n      <a href=\""
    + alias3(((helper = (helper = helpers.linkedin || (depth0 != null ? depth0.linkedin : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"linkedin","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">LinkedIn</a><br/>\r\n      <a href=\""
    + alias3(((helper = (helper = helpers.github || (depth0 != null ? depth0.github : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"github","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">Github</a><br/>\r\n    </div>\r\n  </div>\r\n\r\n  <p class=\"bio\">"
    + ((stack1 = ((helper = (helper = helpers.bio || (depth0 != null ? depth0.bio : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"bio","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</p>\r\n\r\n</div>\r\n";
},"useData":true});
templates['time_loggedOut'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"content\">\r\n  <h2>Alarm</h2>\r\n\r\n  <p class=\"bio\">You must log in to set alarms.</p>\r\n</div>";
},"useData":true});
templates['time_widget'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"content\">\r\n  <h2>Alarm</h2>\r\n\r\n  Hour (0-23) : Mins (0-59)<br/>\r\n  <input id=\"hour_field\" title=\"hour\" type=\"number\" min=\"0\" max=\"23\" placeholder=\"14\"> :\r\n  <input id=\"minute_field\" title=\"minute\" type=\"number\" min=\"0\" max=\"59\" placeholder=\"30\">\r\n\r\n  <br/>\r\n  <button class=\"button-mini\" onclick=\"setAlarm()\">Set</button>\r\n\r\n  <div class=\"alarm-display\" id=\"alarm_display\"></div>\r\n</div>\r\n";
},"useData":true});
})();
