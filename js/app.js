// Popovers that are "closable"
$.fn.extend({
    popoverClosable: function (options) {
        var defaults = {
            html:true, 
            placement: "auto top",
            container: "body",
            template:
                '<div class="popover">\
                <div class="arrow"></div>\
                <div class="popover-header">\
                <button type="button" class="close" data-dismiss="popover" aria-hidden="true">&times;</button>\
                <span class="popover-title"></span>\
                </div>\
                <div class="popover-content"></div>\
                </div>'
        };
        options = $.extend({}, defaults, options);
        var $popover_togglers = this;
        $popover_togglers.popover(options);
        $popover_togglers.on('click', function (e) {
            e.preventDefault();
            $popover_togglers.not(this).popover('hide');
        });
        $('html').on('click', '[data-dismiss="popover"]', function (e) {
            $popover_togglers.popover('hide');
        });
    }
});



// Main App
var App = {

  _config: {
    popoverSelector: '[data-toggle="popover"]'
  },

  run: function() {
    this._enablePopovers();
    this._enableScrollspy();
  },

  trackDownloads: function() {
    $('#pdf-download-btn').on('click', function() {
      ga('send', 'event', 'button', 'click', 'full-pdf', 1);
    });
    $('#source-download-btn').on('click', function() {
      ga('send', 'event', 'button', 'click', 'full-sources', 1);
    });
    $('#pdf-template-1-download-btn').on('click', function() {
      ga('send', 'event', 'button', 'click', 'template-1-pdf', 1);
    });
    $('#pdf-template-2-download-btn').on('click', function() {
      ga('send', 'event', 'button', 'click', 'template-2-pdf', 1);
    });
    $('#pdf-template-3-download-btn').on('click', function() {
      ga('send', 'event', 'button', 'click', 'template-3-pdf', 1);
    });
  },

  _enablePopovers: function() {
    var app = this;
    // Find items and bind behaviour
    $(app._config.popoverSelector).popoverClosable();

    // Hide all popover on click anywhere but the current popover AND clicked link
    $('html').on('mouseup', function(e) {
      var clickedElement = $(e.target);
      if(!clickedElement.closest('.popover').length) {
        if (clickedElement.data('toggle') != 'popover') {
          $('.popover').each(function(){
              $(app._config.popoverSelector).popover('hide');
           });
        }
      }
    });
  },

  _enableScrollspy: function() {
    // ScrollSpy et SmoothScroll
    $("body").scrollspy({ target: ""});
    $("#header .navigation ul li a[href^='#'], article .sommaire-article ol li a[href^='#']").on('click', function(e) {
       // prevent default anchor click behavior
       e.preventDefault();
       // store hash
       var hash = this.hash;
       // animate
       $('html, body').animate({
           scrollTop: $(hash).offset().top
         }, 300, function(){
           // when done, add hash to url
           // (default click behaviour)
           window.location.hash = hash;
         });
    });
  }
};