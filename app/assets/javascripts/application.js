// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap
//= require turbolinks
//= require_tree .

function remove_fields(link) {
  $(link).prev("input[type=hidden]").val("1");
  $(link).closest(".fields").hide();
}

function add_fields(link, association, content) {
  var new_id = new Date().getTime();
  var regexp = new RegExp("new_" + association, "g")
  $(link).parent().before(content.replace(regexp, new_id));
}

function show_questions() {
  var current_question = $('div.current');
  current_question.removeClass("current");
  current_question.next().addClass("current");
}

var loading = false;
var scrollListener = function () {
  $link = $('a.load-more');
  $(window).on("scroll", function () {
    if ($(window).scrollTop() >= $(document).height() - $(window).height() - 100) {
      if (loading || !$link.length) return;
      loading = true;
      $.ajax({
        type: "GET",
        url: $link.attr('href'),
        dataType: "script",
        success: function () {
          loading = false;
          $link = $('a.load-more');
        }
      });
    }
  });
};
$(document).ready(scrollListener);
$(document).on('page:load', scrollListener);
