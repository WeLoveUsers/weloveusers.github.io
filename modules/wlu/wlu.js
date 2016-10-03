// Main App
var App = {

  _config: {
    
  },

  run: function() {
      this._enableStickyNav();
      this._enableStickyArticleIndex();
      this._enablePopups();
      this._enableModalDevis();
      this._enableModalIntervention();
      this._enableScrollSpy();
      this._enableSmoothScroll();
  },

  trackDownloads: function() {
    $('body.article #pdf-download-btn').on('click', function() {
      ga('send', 'event', 'button', 'click', 'full-pdf', 1);
    });
    $('body.article #source-download-btn').on('click', function() {
      ga('send', 'event', 'button', 'click', 'full-sources', 1);
    });
    $('body.article #pdf-template-1-download-btn').on('click', function() {
      ga('send', 'event', 'button', 'click', 'template-1-pdf', 1);
    });
    $('body.article #pdf-template-2-download-btn').on('click', function() {
      ga('send', 'event', 'button', 'click', 'template-2-pdf', 1);
    });
    $('body.article #pdf-template-3-download-btn').on('click', function() {
      ga('send', 'event', 'button', 'click', 'template-3-pdf', 1);
    });
    $('body .track-pdf-download').on('click', function(e) {
      ga('send', 'event', 'pdf', 'download', e.target.text, 1);
    });
  },

  _enableStickyNav: function() {
    if($(window).width() > 992) {
      $('.sticky-nav')
        .visibility({
          type:'fixed',
          zIndex: 999
        })
      ;
    }
  },

  _enableStickyArticleIndex: function() {
    var offset = 130;
    if($(window).height() <= 750) {
      offset = 120;
    }
    if($(window).width() > 992) {
      $('.sticky-article-index').sticky({
        offset       : offset
      });
    }
  },

  _enableScrollSpy: function() {
    var
      $sectionHeaders   = $('h1.spy, h2.spy, h3.spy'),
      $menu             = $('.spy-menu'),
      $offset           = 0 || $menu.data('spy-offset'),
      $activate        = {
        section: function() {
          var
            $section       = $(this),
            index          = $sectionHeaders.index($section),
            $followSection = $menu.children('a'),
            $activeSection = $followSection.eq(index),
            isActive       = $activeSection.hasClass('active')
          ;
          if(!isActive) {
          $followSection.filter('.active')
                      .removeClass('active')
                    ;
                    $activeSection
                      .addClass('active')
                    ;
          }
        },
        previous: function() {
          var
            $menuItems  = $menu.children('a'),
            $section    = $menuItems.filter('.active'),
            index       = $menuItems.index($section)
          ;
          //console.log($section);
          if($section.prev().length > 0) {
                    $section
                      .removeClass('active')
                      .prev('a')
                      .addClass('active')
                    ;
          }
        }
      };

      $sectionHeaders
        .visibility({
          observeChanges: false,
          once: false,
          offset: $offset,
          onTopPassed: $activate.section,
          onTopPassedReverse: $activate.previous
        })
      ;
  },

  _enableSmoothScroll: function() {
    var 
      $menu = $('.smooth-menu'),
      $offset = 0 || $menu.data('smooth-offset');
    $menu.find('a[href]')
          .on('click', function(event) {
            var
              id       = $(this).attr('href').replace('#', ''),
              $element = $('#' + id),
              position = $element.offset().top - $offset
            ;
            $element
              .addClass('active')
            ;
            $('html, body')
                    .animate({
                      scrollTop: position
                    }, 500)
                  ;
            location.hash = '#' + id;
            event.stopImmediatePropagation();
            event.preventDefault();
            return false;
          })
    ;
  },

  _enablePopups: function() {
    var navMobile = $('#nav-mobile').modal({
      transition: "horizontal flip"
    });

    $('#bt-nav-mobile').on( "click", function () {
      navMobile.modal('show');
    });

    $('.popup').popup({
      on: 'click'
    });

    $('#bt-contact').popup({
      on: 'click'
    });
  },

  _enableModalDevis: function() {
    var popupDevis        = $('#popup-devis'),
        popupDevisForm    = popupDevis.find('form'),
        popupDevisActions = popupDevis.find('.actions'),
        popupDevisSubmit  = popupDevis.find('.button.submit'),
        popupDevisClose   = popupDevis.find('.button.close');
    
    popupDevisForm.form({
        on: 'blur',
        fields: {
          nomPrenom: {
            identifier  : 'nom-prenom',
            rules: [
              {
                type: 'empty'
              }
            ]
          },
          email: {
            identifier  : 'email',
            rules: [
              {
                type: 'email'
              }
            ]
          }
        },
        onSuccess: function(event, fields) {
          popupDevisForm.addClass('loading');
          popupDevisSubmit.addClass('disabled');
          event.preventDefault();

          //send to formspree
          $.ajax({
              url     : popupDevisForm.attr('action'),
              method  : 'POST',
              data    : fields,
              dataType: "json",
              success:function() {
                popupDevisForm.form('reset');
                popupDevisForm.removeClass('loading');
                popupDevisActions.hide();
                popupDevisSubmit.removeClass('disabled');
                popupDevisForm.hide();
                popupDevisForm.next('.message').show();
              }   
          });
        }
      })
    ;
    popupDevisSubmit.on( "click", function () {
      popupDevisForm.submit();
    });

    popupDevisClose.on("click", function () {
      popupDevis.modal('hide');
    });

    popupDevis.modal({
      transition: "horizontal flip",
      onHide: function () {
        popupDevisActions.show();
        popupDevisForm.show();
        popupDevisForm.next('.message').hide();
      }
    });

    $('#bt-devis').on( "click", function () {
      popupDevis.modal('show');
    });
  },

  _enableModalIntervention: function() {
    var popupIntervention        = $('#popup-intervention'),
        popupInterventionForm    = popupIntervention.find('form'),
        popupInterventionActions = popupIntervention.find('.actions'),
        popupInterventionSubmit  = popupIntervention.find('.button.submit'),
        popupInterventionClose   = popupIntervention.find('.button.close');
    
    popupInterventionForm.form({
        on: 'blur',
        fields: {
          nomPrenom: {
            identifier  : 'nom-prenom',
            rules: [
              {
                type: 'empty'
              }
            ]
          },
          email: {
            identifier  : 'email',
            rules: [
              {
                type: 'email'
              }
            ]
          }
        },
        onSuccess: function(event, fields) {
          popupInterventionForm.addClass('loading');
          popupInterventionSubmit.addClass('disabled');
          event.preventDefault();

          //send to formspree
          $.ajax({
              url     : popupInterventionForm.attr('action'),
              method  : 'POST',
              data    : fields,
              dataType: "json",
              success:function() {
                popupInterventionForm.form('reset');
                popupInterventionForm.removeClass('loading');
                popupInterventionActions.hide();
                popupInterventionSubmit.removeClass('disabled');
                popupInterventionForm.hide();
                popupInterventionForm.next('.message').show();
              }   
          });
        }
      })
    ;
    popupInterventionSubmit.on( "click", function () {
      popupInterventionForm.submit();
    });

    popupInterventionClose.on("click", function () {
      popupIntervention.modal('hide');
    });

    popupIntervention.modal({
      transition: "horizontal flip",
      onHide: function () {
        popupInterventionActions.show();
        popupInterventionForm.show();
        popupInterventionForm.next('.message').hide();
      }
    });

    $('#bt-intervention').on( "click", function () {
      popupIntervention.modal('show');
    });
  }  
};

var AppHelpers = {
  getHighestDensityImageSrc: function(srcSet) {
    if (!srcSet) return
    
    var srcSetArray = this.parseSrcset(srcSet),
        imgSrc = "",
        highestDensity = 0;
    $.each(srcSetArray, function (index, object){
      if (!object.density) {
        imgSrc = object.url;
        highestDensity = 1;
      } else {
        if (object.density > highestDensity) {
          imgSrc = object.url;
        }
      }
    });

    return imgSrc;
  },
  parseSrcset: function(str) {
    var numberIsNan = Number.isNaN || function (x) {
                                        return x !== x;
                                      };
    var reInt = /^\d+$/;

    return this._deepUnique(str.split(',').map(function (el) {
      var ret = {};

      el.trim().split(/\s+/).forEach(function (el, i) {
        if (i === 0) {
          return ret.url = el;
        }

        var value = el.substring(0, el.length - 1);
        var postfix = el[el.length - 1];
        var intVal = parseInt(value, 10);
        var floatVal = parseFloat(value);

        if (postfix === 'w' && reInt.test(value)) {
          ret.width = intVal;
        } else if (postfix === 'h' && reInt.test(value)) {
          ret.height = intVal;
        } else if (postfix === 'x' && !numberIsNan(floatVal)) {
          ret.density = floatVal;
        } else {
          throw new Error('Invalid srcset descriptor: ' + el + '.');
        }
      });

      return ret;
    }));
  },

  _deepUnique: function(arr) {
    return arr.sort().filter(function (el, i) {
      return JSON.stringify(el) !== JSON.stringify(arr[i - 1]);
    });
  }
};







/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);


+function ($) { "use strict";

  /**
   * The zoom service
   */
  function ZoomService () {
    this._activeZoom            =
    this._initialScrollPosition =
    this._initialTouchPosition  =
    this._touchMoveListener     = null

    this._$document = $(document)
    this._$window   = $(window)
    this._$body     = $(document.body)

    this._boundClick = $.proxy(this._clickHandler, this)
  }

  ZoomService.prototype.listen = function () {
    this._$body.on('click', '[data-action="zoom"]', $.proxy(this._zoom, this))
  }

  ZoomService.prototype._zoom = function (e) {
    var target = e.target

    if (!target || target.tagName != 'IMG') return

    if (this._$body.hasClass('zoom-overlay-open')) return

    if (e.metaKey || e.ctrlKey) {
      return window.open((e.target.getAttribute('data-original') || e.target.src), '_blank')
    }

    if (target.width >= ($(window).width() - Zoom.OFFSET)) return

    this._activeZoomClose(true)

    // Saving original info
    var originalSrc     = target.src,
        originalSrcset  = target.getAttribute('srcset'),
        originalWidth   = target.width,
        originalHeight   = target.height
    target.org = {
      src     : originalSrc,
      srcset  : originalSrcset,
      width   : originalWidth,
      height  : originalHeight
    };
    // Show a loading indicator
    var loader = document.createElement('div'),
        loaderContainer = document.createElement('div')
    loaderContainer.className = 'ui active inverted dimmer'
    loaderContainer.style.height = target.org.height + 'px'
    loaderContainer.style.width = target.org.width + 'px'
    loader.className = 'ui loader'
    loaderContainer.appendChild(loader)
    target.parentNode.appendChild(loaderContainer)
    
    // Replace image with highest resolution
    var tmpImg = document.createElement('img')
    
    tmpImg.onload = $.proxy(function () {
      target.removeAttribute('srcset')
      target.src    = tmpImg.src
      target.width  = target.org.width
      target.height = target.org.height
      target.parentNode.removeChild(loaderContainer)
      this._activeZoom = new Zoom(target)
      this._activeZoom.zoomImage()
    }, this)

    tmpImg.src = AppHelpers.getHighestDensityImageSrc(target.org.srcset) || target.org.src

    // todo(fat): probably worth throttling this
    this._$window.on('scroll.zoom', $.proxy(this._scrollHandler, this))

    this._$document.on('keyup.zoom', $.proxy(this._keyHandler, this))
    this._$document.on('touchstart.zoom', $.proxy(this._touchStart, this))

    // we use a capturing phase here to prevent unintended js events
    // sadly no useCapture in jquery api (http://bugs.jquery.com/ticket/14953)
    if (document.addEventListener) {
      document.addEventListener('click', this._boundClick, true)
    } else {
      document.attachEvent('onclick', this._boundClick, true)
    }

    if ('bubbles' in e) {
      if (e.bubbles) e.stopPropagation()
    } else {
      // Internet Explorer before version 9
      e.cancelBubble = true
    }
  }

  ZoomService.prototype._activeZoomClose = function (forceDispose) {
    if (!this._activeZoom) return

    if (forceDispose) {
      this._activeZoom.dispose()
    } else {
      this._activeZoom.close()
    }

    this._$window.off('.zoom')
    this._$document.off('.zoom')

    document.removeEventListener('click', this._boundClick, true)

    this._activeZoom = null
  }

  ZoomService.prototype._scrollHandler = function (e) {
    if (this._initialScrollPosition === null) this._initialScrollPosition = $(window).scrollTop()
    var deltaY = this._initialScrollPosition - $(window).scrollTop()
    if (Math.abs(deltaY) >= 40) this._activeZoomClose()
  }

  ZoomService.prototype._keyHandler = function (e) {
    if (e.keyCode == 27) this._activeZoomClose()
  }

  ZoomService.prototype._clickHandler = function (e) {
    if (e.preventDefault) e.preventDefault()
    else event.returnValue = false

    if ('bubbles' in e) {
      if (e.bubbles) e.stopPropagation()
    } else {
      // Internet Explorer before version 9
      e.cancelBubble = true
    }

    this._activeZoomClose()
  }

  ZoomService.prototype._touchStart = function (e) {
    this._initialTouchPosition = e.touches[0].pageY
    $(e.target).on('touchmove.zoom', $.proxy(this._touchMove, this))
  }

  ZoomService.prototype._touchMove = function (e) {
    if (Math.abs(e.touches[0].pageY - this._initialTouchPosition) > 10) {
      this._activeZoomClose()
      $(e.target).off('touchmove.zoom')
    }
  }


  /**
   * The zoom object
   */
  function Zoom (img) {
    this._fullHeight      =
    this._fullWidth       =
    this._overlay         =
    this._targetImageWrap = null

    this._targetImage = img

    this._$body = $(document.body)
  }

  Zoom.OFFSET = 80
  Zoom._MAX_WIDTH = 2560
  Zoom._MAX_HEIGHT = 4096

  Zoom.prototype.zoomImage = function () {
    var img = document.createElement('img')
    img.onload = $.proxy(function () {
      this._targetImage.src = img.src
      this._fullHeight = Number(img.height)
      this._fullWidth = Number(img.width)
      this._zoomOriginal()
    }, this)
    img.src = this._targetImage.src
  }

  Zoom.prototype._zoomOriginal = function () {
    this._targetImageWrap           = document.createElement('div')
    this._targetImageWrap.className = 'zoom-img-wrap'

    this._targetImage.parentNode.insertBefore(this._targetImageWrap, this._targetImage)
    this._targetImageWrap.appendChild(this._targetImage)

    $(this._targetImage)
      .addClass('zoom-img')
      .attr('data-action', 'zoom-out')

    this._overlay           = document.createElement('div')
    this._overlay.className = 'zoom-overlay'

    document.body.appendChild(this._overlay)

    this._calculateZoom()
    this._triggerAnimation()
  }

  Zoom.prototype._calculateZoom = function () {
    this._targetImage.offsetWidth // repaint before animating

    var originalFullImageWidth  = this._fullWidth
    var originalFullImageHeight = this._fullHeight

    var scrollTop = $(window).scrollTop()

    var maxScaleFactor = originalFullImageWidth / this._targetImage.width

    var viewportHeight = ($(window).height() - Zoom.OFFSET)
    var viewportWidth  = ($(window).width() - Zoom.OFFSET)

    var imageAspectRatio    = originalFullImageWidth / originalFullImageHeight
    var viewportAspectRatio = viewportWidth / viewportHeight

    if (originalFullImageWidth < viewportWidth && originalFullImageHeight < viewportHeight) {
      this._imgScaleFactor = maxScaleFactor

    } else if (imageAspectRatio < viewportAspectRatio) {
      this._imgScaleFactor = (viewportHeight / originalFullImageHeight) * maxScaleFactor

    } else {
      this._imgScaleFactor = (viewportWidth / originalFullImageWidth) * maxScaleFactor
    }
  }

  Zoom.prototype._triggerAnimation = function () {
    this._targetImage.offsetWidth // repaint before animating

    var imageOffset = $(this._targetImage).offset()
    var scrollTop   = $(window).scrollTop()

    var viewportY = scrollTop + ($(window).height() / 2)
    var viewportX = ($(window).width() / 2)

    var imageCenterY = imageOffset.top + (this._targetImage.height / 2)
    var imageCenterX = imageOffset.left + (this._targetImage.width / 2)

    this._translateY = viewportY - imageCenterY
    this._translateX = viewportX - imageCenterX

    var targetTransform = 'scale(' + this._imgScaleFactor + ')'
    var imageWrapTransform = 'translate(' + this._translateX + 'px, ' + this._translateY + 'px)'

    if ($.support.transition) {
      imageWrapTransform += ' translateZ(0)'
    }

    $(this._targetImage)
      .css({
        '-webkit-transform': targetTransform,
            '-ms-transform': targetTransform,
                'transform': targetTransform
      })

    $(this._targetImageWrap)
      .css({
        '-webkit-transform': imageWrapTransform,
            '-ms-transform': imageWrapTransform,
                'transform': imageWrapTransform
      })

    this._$body.addClass('zoom-overlay-open')
  }

  Zoom.prototype.close = function () {
    this._$body
      .removeClass('zoom-overlay-open')
      .addClass('zoom-overlay-transitioning')

    // Revert to original image
    this._targetImage.src = this._targetImage.org.src
    if (this._targetImage.org.srcset)
      this._targetImage.setAttribute('srcset', this._targetImage.org.srcset)

    // we use setStyle here so that the correct vender prefix for transform is used
    $(this._targetImage)
      .css({
        '-webkit-transform': '',
            '-ms-transform': '',
                'transform': ''
      })

    $(this._targetImageWrap)
      .css({
        '-webkit-transform': '',
            '-ms-transform': '',
                'transform': ''
      })

    if (!$.support.transition) {
      return this.dispose()
    }

    $(this._targetImage)
      .one($.support.transition.end, $.proxy(this.dispose, this))
      .emulateTransitionEnd(300)
  }

  Zoom.prototype.dispose = function () {
    if (this._targetImageWrap && this._targetImageWrap.parentNode) {
      $(this._targetImage)
        .removeClass('zoom-img')
        .attr('data-action', 'zoom')

      this._targetImageWrap.parentNode.replaceChild(this._targetImage, this._targetImageWrap)
      this._overlay.parentNode.removeChild(this._overlay)

      this._$body.removeClass('zoom-overlay-transitioning')
    }
  }

  // wait for dom ready (incase script included before body)
  $(function () {
    new ZoomService().listen()
  })

}(jQuery)