/*!
 * jQuery Migrate - v1.1.1 - 2013-02-16
 * https://github.com/jquery/jquery-migrate
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors; Licensed MIT
 */
(function( jQuery, window, undefined ) {
  // See http://bugs.jquery.com/ticket/13335
  // "use strict";


  var warnedAbout = {};

  // List of warnings already given; public read only
  jQuery.migrateWarnings = [];

  // Set to true to prevent console output; migrateWarnings still maintained
  // jQuery.migrateMute = false;

  // Show a message on the console so devs know we're active
  if ( !jQuery.migrateMute && window.console && console.log ) {
    console.log("JQMIGRATE: Logging is active");
  }

  // Set to false to disable traces that appear with warnings
  if ( jQuery.migrateTrace === undefined ) {
    jQuery.migrateTrace = true;
  }

  // Forget any warnings we've already given; public
  jQuery.migrateReset = function() {
    warnedAbout = {};
    jQuery.migrateWarnings.length = 0;
  };

  function migrateWarn( msg) {
    if ( !warnedAbout[ msg ] ) {
      warnedAbout[ msg ] = true;
      jQuery.migrateWarnings.push( msg );
      if ( window.console && console.warn && !jQuery.migrateMute ) {
        console.warn( "JQMIGRATE: " + msg );
        if ( jQuery.migrateTrace && console.trace ) {
          console.trace();
        }
      }
    }
  }

  function migrateWarnProp( obj, prop, value, msg ) {
    if ( Object.defineProperty ) {
      // On ES5 browsers (non-oldIE), warn if the code tries to get prop;
      // allow property to be overwritten in case some other plugin wants it
      try {
        Object.defineProperty( obj, prop, {
          configurable: true,
          enumerable: true,
          get: function() {
            migrateWarn( msg );
            return value;
          },
          set: function( newValue ) {
            migrateWarn( msg );
            value = newValue;
          }
        });
        return;
      } catch( err ) {
        // IE8 is a dope about Object.defineProperty, can't warn there
      }
    }

    // Non-ES5 (or broken) browser; just set the property
    jQuery._definePropertyBroken = true;
    obj[ prop ] = value;
  }

  if ( document.compatMode === "BackCompat" ) {
    // jQuery has never supported or tested Quirks Mode
    migrateWarn( "jQuery is not compatible with Quirks Mode" );
  }


  var attrFn = jQuery( "<input/>", { size: 1 } ).attr("size") && jQuery.attrFn,
    oldAttr = jQuery.attr,
    valueAttrGet = jQuery.attrHooks.value && jQuery.attrHooks.value.get ||
      function() { return null; },
    valueAttrSet = jQuery.attrHooks.value && jQuery.attrHooks.value.set ||
      function() { return undefined; },
    rnoType = /^(?:input|button)$/i,
    rnoAttrNodeType = /^[238]$/,
    rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
    ruseDefault = /^(?:checked|selected)$/i;

  // jQuery.attrFn
  migrateWarnProp( jQuery, "attrFn", attrFn || {}, "jQuery.attrFn is deprecated" );

  jQuery.attr = function( elem, name, value, pass ) {
    var lowerName = name.toLowerCase(),
      nType = elem && elem.nodeType;

    if ( pass ) {
      // Since pass is used internally, we only warn for new jQuery
      // versions where there isn't a pass arg in the formal params
      if ( oldAttr.length < 4 ) {
        migrateWarn("jQuery.fn.attr( props, pass ) is deprecated");
      }
      if ( elem && !rnoAttrNodeType.test( nType ) &&
        (attrFn ? name in attrFn : jQuery.isFunction(jQuery.fn[name])) ) {
        return jQuery( elem )[ name ]( value );
      }
    }

    // Warn if user tries to set `type`, since it breaks on IE 6/7/8; by checking
    // for disconnected elements we don't warn on $( "<button>", { type: "button" } ).
    if ( name === "type" && value !== undefined && rnoType.test( elem.nodeName ) && elem.parentNode ) {
      migrateWarn("Can't change the 'type' of an input or button in IE 6/7/8");
    }

    // Restore boolHook for boolean property/attribute synchronization
    if ( !jQuery.attrHooks[ lowerName ] && rboolean.test( lowerName ) ) {
      jQuery.attrHooks[ lowerName ] = {
        get: function( elem, name ) {
          // Align boolean attributes with corresponding properties
          // Fall back to attribute presence where some booleans are not supported
          var attrNode,
            property = jQuery.prop( elem, name );
          return property === true || typeof property !== "boolean" &&
            ( attrNode = elem.getAttributeNode(name) ) && attrNode.nodeValue !== false ?

            name.toLowerCase() :
            undefined;
        },
        set: function( elem, value, name ) {
          var propName;
          if ( value === false ) {
            // Remove boolean attributes when set to false
            jQuery.removeAttr( elem, name );
          } else {
            // value is true since we know at this point it's type boolean and not false
            // Set boolean attributes to the same name and set the DOM property
            propName = jQuery.propFix[ name ] || name;
            if ( propName in elem ) {
              // Only set the IDL specifically if it already exists on the element
              elem[ propName ] = true;
            }

            elem.setAttribute( name, name.toLowerCase() );
          }
          return name;
        }
      };

      // Warn only for attributes that can remain distinct from their properties post-1.9
      if ( ruseDefault.test( lowerName ) ) {
        migrateWarn( "jQuery.fn.attr('" + lowerName + "') may use property instead of attribute" );
      }
    }

    return oldAttr.call( jQuery, elem, name, value );
  };

  // attrHooks: value
  jQuery.attrHooks.value = {
    get: function( elem, name ) {
      var nodeName = ( elem.nodeName || "" ).toLowerCase();
      if ( nodeName === "button" ) {
        return valueAttrGet.apply( this, arguments );
      }
      if ( nodeName !== "input" && nodeName !== "option" ) {
        migrateWarn("jQuery.fn.attr('value') no longer gets properties");
      }
      return name in elem ?
        elem.value :
        null;
    },
    set: function( elem, value ) {
      var nodeName = ( elem.nodeName || "" ).toLowerCase();
      if ( nodeName === "button" ) {
        return valueAttrSet.apply( this, arguments );
      }
      if ( nodeName !== "input" && nodeName !== "option" ) {
        migrateWarn("jQuery.fn.attr('value', val) no longer sets properties");
      }
      // Does not return so that setAttribute is also used
      elem.value = value;
    }
  };


  var matched, browser,
    oldInit = jQuery.fn.init,
    oldParseJSON = jQuery.parseJSON,
    // Note this does NOT include the #9521 XSS fix from 1.7!
    rquickExpr = /^(?:[^<]*(<[\w\W]+>)[^>]*|#([\w\-]*))$/;

  // $(html) "looks like html" rule change
  jQuery.fn.init = function( selector, context, rootjQuery ) {
    var match;

    if ( selector && typeof selector === "string" && !jQuery.isPlainObject( context ) &&
        (match = rquickExpr.exec( selector )) && match[1] ) {
      // This is an HTML string according to the "old" rules; is it still?
      if ( selector.charAt( 0 ) !== "<" ) {
        migrateWarn("$(html) HTML strings must start with '<' character");
      }
      // Now process using loose rules; let pre-1.8 play too
      if ( context && context.context ) {
        // jQuery object as context; parseHTML expects a DOM object
        context = context.context;
      }
      if ( jQuery.parseHTML ) {
        return oldInit.call( this, jQuery.parseHTML( jQuery.trim(selector), context, true ),
            context, rootjQuery );
      }
    }
    return oldInit.apply( this, arguments );
  };
  jQuery.fn.init.prototype = jQuery.fn;

  // Let $.parseJSON(falsy_value) return null
  jQuery.parseJSON = function( json ) {
    if ( !json && json !== null ) {
      migrateWarn("jQuery.parseJSON requires a valid JSON string");
      return null;
    }
    return oldParseJSON.apply( this, arguments );
  };

  jQuery.uaMatch = function( ua ) {
    ua = ua.toLowerCase();

    var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
      /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
      /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
      /(msie) ([\w.]+)/.exec( ua ) ||
      ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
      [];

    return {
      browser: match[ 1 ] || "",
      version: match[ 2 ] || "0"
    };
  };

  // Don't clobber any existing jQuery.browser in case it's different
  if ( !jQuery.browser ) {
    matched = jQuery.uaMatch( navigator.userAgent );
    browser = {};

    if ( matched.browser ) {
      browser[ matched.browser ] = true;
      browser.version = matched.version;
    }

    // Chrome is Webkit, but Webkit is also Safari.
    if ( browser.chrome ) {
      browser.webkit = true;
    } else if ( browser.webkit ) {
      browser.safari = true;
    }

    jQuery.browser = browser;
  }

  // Warn if the code tries to get jQuery.browser
  migrateWarnProp( jQuery, "browser", jQuery.browser, "jQuery.browser is deprecated" );

  jQuery.sub = function() {
    function jQuerySub( selector, context ) {
      return new jQuerySub.fn.init( selector, context );
    }
    jQuery.extend( true, jQuerySub, this );
    jQuerySub.superclass = this;
    jQuerySub.fn = jQuerySub.prototype = this();
    jQuerySub.fn.constructor = jQuerySub;
    jQuerySub.sub = this.sub;
    jQuerySub.fn.init = function init( selector, context ) {
      if ( context && context instanceof jQuery && !(context instanceof jQuerySub) ) {
        context = jQuerySub( context );
      }

      return jQuery.fn.init.call( this, selector, context, rootjQuerySub );
    };
    jQuerySub.fn.init.prototype = jQuerySub.fn;
    var rootjQuerySub = jQuerySub(document);
    migrateWarn( "jQuery.sub() is deprecated" );
    return jQuerySub;
  };


  // Ensure that $.ajax gets the new parseJSON defined in core.js
  jQuery.ajaxSetup({
    converters: {
      "text json": jQuery.parseJSON
    }
  });


  var oldFnData = jQuery.fn.data;

  jQuery.fn.data = function( name ) {
    var ret, evt,
      elem = this[0];

    // Handles 1.7 which has this behavior and 1.8 which doesn't
    if ( elem && name === "events" && arguments.length === 1 ) {
      ret = jQuery.data( elem, name );
      evt = jQuery._data( elem, name );
      if ( ( ret === undefined || ret === evt ) && evt !== undefined ) {
        migrateWarn("Use of jQuery.fn.data('events') is deprecated");
        return evt;
      }
    }
    return oldFnData.apply( this, arguments );
  };


  var rscriptType = /\/(java|ecma)script/i,
    oldSelf = jQuery.fn.andSelf || jQuery.fn.addBack;

  jQuery.fn.andSelf = function() {
    migrateWarn("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()");
    return oldSelf.apply( this, arguments );
  };

  // Since jQuery.clean is used internally on older versions, we only shim if it's missing
  if ( !jQuery.clean ) {
    jQuery.clean = function( elems, context, fragment, scripts ) {
      // Set context per 1.8 logic
      context = context || document;
      context = !context.nodeType && context[0] || context;
      context = context.ownerDocument || context;

      migrateWarn("jQuery.clean() is deprecated");

      var i, elem, handleScript, jsTags,
        ret = [];

      jQuery.merge( ret, jQuery.buildFragment( elems, context ).childNodes );

      // Complex logic lifted directly from jQuery 1.8
      if ( fragment ) {
        // Special handling of each script element
        handleScript = function( elem ) {
          // Check if we consider it executable
          if ( !elem.type || rscriptType.test( elem.type ) ) {
            // Detach the script and store it in the scripts array (if provided) or the fragment
            // Return truthy to indicate that it has been handled
            return scripts ?
              scripts.push( elem.parentNode ? elem.parentNode.removeChild( elem ) : elem ) :
              fragment.appendChild( elem );
          }
        };

        for ( i = 0; (elem = ret[i]) != null; i++ ) {
          // Check if we're done after handling an executable script
          if ( !( jQuery.nodeName( elem, "script" ) && handleScript( elem ) ) ) {
            // Append to fragment and handle embedded scripts
            fragment.appendChild( elem );
            if ( typeof elem.getElementsByTagName !== "undefined" ) {
              // handleScript alters the DOM, so use jQuery.merge to ensure snapshot iteration
              jsTags = jQuery.grep( jQuery.merge( [], elem.getElementsByTagName("script") ), handleScript );

              // Splice the scripts into ret after their former ancestor and advance our index beyond them
              ret.splice.apply( ret, [i + 1, 0].concat( jsTags ) );
              i += jsTags.length;
            }
          }
        }
      }

      return ret;
    };
  }

  var eventAdd = jQuery.event.add,
    eventRemove = jQuery.event.remove,
    eventTrigger = jQuery.event.trigger,
    oldToggle = jQuery.fn.toggle,
    oldLive = jQuery.fn.live,
    oldDie = jQuery.fn.die,
    ajaxEvents = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",
    rajaxEvent = new RegExp( "\\b(?:" + ajaxEvents + ")\\b" ),
    rhoverHack = /(?:^|\s)hover(\.\S+|)\b/,
    hoverHack = function( events ) {
      if ( typeof( events ) !== "string" || jQuery.event.special.hover ) {
        return events;
      }
      if ( rhoverHack.test( events ) ) {
        migrateWarn("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'");
      }
      return events && events.replace( rhoverHack, "mouseenter$1 mouseleave$1" );
    };

  // Event props removed in 1.9, put them back if needed; no practical way to warn them
  if ( jQuery.event.props && jQuery.event.props[ 0 ] !== "attrChange" ) {
    jQuery.event.props.unshift( "attrChange", "attrName", "relatedNode", "srcElement" );
  }

  // Undocumented jQuery.event.handle was "deprecated" in jQuery 1.7
  if ( jQuery.event.dispatch ) {
    migrateWarnProp( jQuery.event, "handle", jQuery.event.dispatch, "jQuery.event.handle is undocumented and deprecated" );
  }

  // Support for 'hover' pseudo-event and ajax event warnings
  jQuery.event.add = function( elem, types, handler, data, selector ){
    if ( elem !== document && rajaxEvent.test( types ) ) {
      migrateWarn( "AJAX events should be attached to document: " + types );
    }
    eventAdd.call( this, elem, hoverHack( types || "" ), handler, data, selector );
  };
  jQuery.event.remove = function( elem, types, handler, selector, mappedTypes ){
    eventRemove.call( this, elem, hoverHack( types ) || "", handler, selector, mappedTypes );
  };

  jQuery.fn.error = function() {
    var args = Array.prototype.slice.call( arguments, 0);
    migrateWarn("jQuery.fn.error() is deprecated");
    args.splice( 0, 0, "error" );
    if ( arguments.length ) {
      return this.bind.apply( this, args );
    }
    // error event should not bubble to window, although it does pre-1.7
    this.triggerHandler.apply( this, args );
    return this;
  };

  jQuery.fn.toggle = function( fn, fn2 ) {

    // Don't mess with animation or css toggles
    if ( !jQuery.isFunction( fn ) || !jQuery.isFunction( fn2 ) ) {
      return oldToggle.apply( this, arguments );
    }
    migrateWarn("jQuery.fn.toggle(handler, handler...) is deprecated");

    // Save reference to arguments for access in closure
    var args = arguments,
      guid = fn.guid || jQuery.guid++,
      i = 0,
      toggler = function( event ) {
        // Figure out which function to execute
        var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
        jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );

        // Make sure that clicks stop
        event.preventDefault();

        // and execute the function
        return args[ lastToggle ].apply( this, arguments ) || false;
      };

    // link all the functions, so any of them can unbind this click handler
    toggler.guid = guid;
    while ( i < args.length ) {
      args[ i++ ].guid = guid;
    }

    return this.click( toggler );
  };

  jQuery.fn.live = function( types, data, fn ) {
    migrateWarn("jQuery.fn.live() is deprecated");
    if ( oldLive ) {
      return oldLive.apply( this, arguments );
    }
    jQuery( this.context ).on( types, this.selector, data, fn );
    return this;
  };

  jQuery.fn.die = function( types, fn ) {
    migrateWarn("jQuery.fn.die() is deprecated");
    if ( oldDie ) {
      return oldDie.apply( this, arguments );
    }
    jQuery( this.context ).off( types, this.selector || "**", fn );
    return this;
  };

  // Turn global events into document-triggered events
  jQuery.event.trigger = function( event, data, elem, onlyHandlers  ){
    if ( !elem && !rajaxEvent.test( event ) ) {
      migrateWarn( "Global events are undocumented and deprecated" );
    }
    return eventTrigger.call( this,  event, data, elem || document, onlyHandlers  );
  };
  jQuery.each( ajaxEvents.split("|"),
    function( _, name ) {
      jQuery.event.special[ name ] = {
        setup: function() {
          var elem = this;

          // The document needs no shimming; must be !== for oldIE
          if ( elem !== document ) {
            jQuery.event.add( document, name + "." + jQuery.guid, function() {
              jQuery.event.trigger( name, null, elem, true );
            });
            jQuery._data( this, name, jQuery.guid++ );
          }
          return false;
        },
        teardown: function() {
          if ( this !== document ) {
            jQuery.event.remove( document, name + "." + jQuery._data( this, name ) );
          }
          return false;
        }
      };
    }
  );


  })( jQuery, window );

  /*!
   * Bootstrap v3.3.4 (http://getbootstrap.com)
   * Copyright 2011-2015 Twitter, Inc.
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   */

  // if (typeof jQuery === 'undefined') {
  //     throw new Error('Bootstrap\'s JavaScript requires jQuery')
  // }

  // +function ($) {
  //     'use strict';
  //     var version = $.fn.jquery.split(' ')[0].split('.')
  //     if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
  //         throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')
  //     }
  // }(jQuery);

  /* ========================================================================
   * Bootstrap: transition.js v3.3.4
   * http://getbootstrap.com/javascript/#transitions
   * ========================================================================
   * Copyright 2011-2015 Twitter, Inc.
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * ======================================================================== */


  // +function ($) {
  //     'use strict';

  //     // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  //     // ============================================================

  //     function transitionEnd() {
  //         var el = document.createElement('bootstrap')

  //         var transEndEventNames = {
  //             WebkitTransition: 'webkitTransitionEnd',
  //             MozTransition: 'transitionend',
  //             OTransition: 'oTransitionEnd otransitionend',
  //             transition: 'transitionend'
  //         }

  //         for (var name in transEndEventNames) {
  //             if (el.style[name] !== undefined) {
  //                 return { end: transEndEventNames[name] }
  //             }
  //         }

  //         return false // explicit for ie8 (  ._.)
  //     }

  //     // http://blog.alexmaccaw.com/css-transitions
  //     $.fn.emulateTransitionEnd = function (duration) {
  //         var called = false
  //         var $el = this
  //         $(this).one('bsTransitionEnd', function () { called = true })
  //         var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
  //         setTimeout(callback, duration)
  //         return this
  //     }

  //     $(function () {
  //         $.support.transition = transitionEnd()

  //         if (!$.support.transition) return

  //         $.event.special.bsTransitionEnd = {
  //             bindType: $.support.transition.end,
  //             delegateType: $.support.transition.end,
  //             handle: function (e) {
  //                 if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
  //             }
  //         }
  //     })

  // }(jQuery);

  /* ========================================================================
   * Bootstrap: alert.js v3.3.4
   * http://getbootstrap.com/javascript/#alerts
   * ========================================================================
   * Copyright 2011-2015 Twitter, Inc.
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * ======================================================================== */


  // +function ($) {
  //     'use strict';

  //     // ALERT CLASS DEFINITION
  //     // ======================

  //     var dismiss = '[data-dismiss="alert"]'
  //     var Alert = function (el) {
  //         $(el).on('click', dismiss, this.close)
  //     }

  //     Alert.VERSION = '3.3.4'

  //     Alert.TRANSITION_DURATION = 150

  //     Alert.prototype.close = function (e) {
  //         var $this = $(this)
  //         var selector = $this.attr('data-target')

  //         if (!selector) {
  //             selector = $this.attr('href')
  //             selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
  //         }

  //         var $parent = $(selector)

  //         if (e) e.preventDefault()

  //         if (!$parent.length) {
  //             $parent = $this.closest('.alert')
  //         }

  //         $parent.trigger(e = $.Event('close.bs.alert'))

  //         if (e.isDefaultPrevented()) return

  //         $parent.removeClass('in')

  //         function removeElement() {
  //             // detach from parent, fire event then clean up data
  //             $parent.detach().trigger('closed.bs.alert').remove()
  //         }

  //         $.support.transition && $parent.hasClass('fade') ?
  //           $parent
  //             .one('bsTransitionEnd', removeElement)
  //             .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
  //           removeElement()
  //     }


  //     // ALERT PLUGIN DEFINITION
  //     // =======================

  //     function Plugin(option) {
  //         return this.each(function () {
  //             var $this = $(this)
  //             var data = $this.data('bs.alert')

  //             if (!data) $this.data('bs.alert', (data = new Alert(this)))
  //             if (typeof option == 'string') data[option].call($this)
  //         })
  //     }

  //     var old = $.fn.alert

  //     $.fn.alert = Plugin
  //     $.fn.alert.Constructor = Alert


  //     // ALERT NO CONFLICT
  //     // =================

  //     $.fn.alert.noConflict = function () {
  //         $.fn.alert = old
  //         return this
  //     }


  //     // ALERT DATA-API
  //     // ==============

  //     $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

  // }(jQuery);

  /* ========================================================================
   * Bootstrap: button.js v3.3.4
   * http://getbootstrap.com/javascript/#buttons
   * ========================================================================
   * Copyright 2011-2015 Twitter, Inc.
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * ======================================================================== */


  // +function ($) {
  //     'use strict';

  //     // BUTTON PUBLIC CLASS DEFINITION
  //     // ==============================

  //     var Button = function (element, options) {
  //         this.$element = $(element)
  //         this.options = $.extend({}, Button.DEFAULTS, options)
  //         this.isLoading = false
  //     }

  //     Button.VERSION = '3.3.4'

  //     Button.DEFAULTS = {
  //         loadingText: 'loading...'
  //     }

  //     Button.prototype.setState = function (state) {
  //         var d = 'disabled'
  //         var $el = this.$element
  //         var val = $el.is('input') ? 'val' : 'html'
  //         var data = $el.data()

  //         state = state + 'Text'

  //         if (data.resetText == null) $el.data('resetText', $el[val]())

  //         // push to event loop to allow forms to submit
  //         setTimeout($.proxy(function () {
  //             $el[val](data[state] == null ? this.options[state] : data[state])

  //             if (state == 'loadingText') {
  //                 this.isLoading = true
  //                 $el.addClass(d).attr(d, d)
  //             } else if (this.isLoading) {
  //                 this.isLoading = false
  //                 $el.removeClass(d).removeAttr(d)
  //             }
  //         }, this), 0)
  //     }

  //     Button.prototype.toggle = function () {
  //         var changed = true
  //         var $parent = this.$element.closest('[data-toggle="buttons"]')

  //         if ($parent.length) {
  //             var $input = this.$element.find('input')
  //             if ($input.prop('type') == 'radio') {
  //                 if ($input.prop('checked') && this.$element.hasClass('active')) changed = false
  //                 else $parent.find('.active').removeClass('active')
  //             }
  //             if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
  //         } else {
  //             this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
  //         }

  //         if (changed) this.$element.toggleClass('active')
  //     }


  //     // BUTTON PLUGIN DEFINITION
  //     // ========================

  //     function Plugin(option) {
  //         return this.each(function () {
  //             var $this = $(this)
  //             var data = $this.data('bs.button')
  //             var options = typeof option == 'object' && option

  //             if (!data) $this.data('bs.button', (data = new Button(this, options)))

  //             if (option == 'toggle') data.toggle()
  //             else if (option) data.setState(option)
  //         })
  //     }

  //     var old = $.fn.button

  //     $.fn.button = Plugin
  //     $.fn.button.Constructor = Button


  //     // BUTTON NO CONFLICT
  //     // ==================

  //     $.fn.button.noConflict = function () {
  //         $.fn.button = old
  //         return this
  //     }


  //     // BUTTON DATA-API
  //     // ===============

  //     $(document)
  //       .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
  //           var $btn = $(e.target)
  //           if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
  //           Plugin.call($btn, 'toggle')
  //           e.preventDefault()
  //       })
  //       .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
  //           $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
  //       })

  // }(jQuery);

  /* ========================================================================
   * Bootstrap: carousel.js v3.3.4
   * http://getbootstrap.com/javascript/#carousel
   * ========================================================================
   * Copyright 2011-2015 Twitter, Inc.
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * ======================================================================== */


  // +function ($) {
  //     'use strict';

  //     // CAROUSEL CLASS DEFINITION
  //     // =========================

  //     var Carousel = function (element, options) {
  //         this.$element = $(element)
  //         this.$indicators = this.$element.find('.carousel-indicators')
  //         this.options = options
  //         this.paused = null
  //         this.sliding = null
  //         this.interval = null
  //         this.$active = null
  //         this.$items = null

  //         this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

  //         this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
  //           .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
  //           .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  //     }

  //     Carousel.VERSION = '3.3.4'

  //     Carousel.TRANSITION_DURATION = 600

  //     Carousel.DEFAULTS = {
  //         interval: 5000,
  //         pause: 'hover',
  //         wrap: true,
  //         keyboard: true
  //     }

  //     Carousel.prototype.keydown = function (e) {
  //         if (/input|textarea/i.test(e.target.tagName)) return
  //         switch (e.which) {
  //             case 37: this.prev(); break
  //             case 39: this.next(); break
  //             default: return
  //         }

  //         e.preventDefault()
  //     }

  //     Carousel.prototype.cycle = function (e) {
  //         e || (this.paused = false)

  //         this.interval && clearInterval(this.interval)

  //         this.options.interval
  //           && !this.paused
  //           && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

  //         return this
  //     }

  //     Carousel.prototype.getItemIndex = function (item) {
  //         this.$items = item.parent().children('.item')
  //         return this.$items.index(item || this.$active)
  //     }

  //     Carousel.prototype.getItemForDirection = function (direction, active) {
  //         var activeIndex = this.getItemIndex(active)
  //         var willWrap = (direction == 'prev' && activeIndex === 0)
  //                     || (direction == 'next' && activeIndex == (this.$items.length - 1))
  //         if (willWrap && !this.options.wrap) return active
  //         var delta = direction == 'prev' ? -1 : 1
  //         var itemIndex = (activeIndex + delta) % this.$items.length
  //         return this.$items.eq(itemIndex)
  //     }

  //     Carousel.prototype.to = function (pos) {
  //         var that = this
  //         var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

  //         if (pos > (this.$items.length - 1) || pos < 0) return

  //         if (this.sliding) return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
  //         if (activeIndex == pos) return this.pause().cycle()

  //         return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  //     }

  //     Carousel.prototype.pause = function (e) {
  //         e || (this.paused = true)

  //         if (this.$element.find('.next, .prev').length && $.support.transition) {
  //             this.$element.trigger($.support.transition.end)
  //             this.cycle(true)
  //         }

  //         this.interval = clearInterval(this.interval)

  //         return this
  //     }

  //     Carousel.prototype.next = function () {
  //         if (this.sliding) return
  //         return this.slide('next')
  //     }

  //     Carousel.prototype.prev = function () {
  //         if (this.sliding) return
  //         return this.slide('prev')
  //     }

  //     Carousel.prototype.slide = function (type, next) {
  //         var $active = this.$element.find('.item.active')
  //         var $next = next || this.getItemForDirection(type, $active)
  //         var isCycling = this.interval
  //         var direction = type == 'next' ? 'left' : 'right'
  //         var that = this

  //         if ($next.hasClass('active')) return (this.sliding = false)

  //         var relatedTarget = $next[0]
  //         var slideEvent = $.Event('slide.bs.carousel', {
  //             relatedTarget: relatedTarget,
  //             direction: direction
  //         })
  //         this.$element.trigger(slideEvent)
  //         if (slideEvent.isDefaultPrevented()) return

  //         this.sliding = true

  //         isCycling && this.pause()

  //         if (this.$indicators.length) {
  //             this.$indicators.find('.active').removeClass('active')
  //             var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
  //             $nextIndicator && $nextIndicator.addClass('active')
  //         }

  //         var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
  //         if ($.support.transition && this.$element.hasClass('slide')) {
  //             $next.addClass(type)
  //             $next[0].offsetWidth // force reflow
  //             $active.addClass(direction)
  //             $next.addClass(direction)
  //             $active
  //               .one('bsTransitionEnd', function () {
  //                   $next.removeClass([type, direction].join(' ')).addClass('active')
  //                   $active.removeClass(['active', direction].join(' '))
  //                   that.sliding = false
  //                   setTimeout(function () {
  //                       that.$element.trigger(slidEvent)
  //                   }, 0)
  //               })
  //               .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
  //         } else {
  //             $active.removeClass('active')
  //             $next.addClass('active')
  //             this.sliding = false
  //             this.$element.trigger(slidEvent)
  //         }

  //         isCycling && this.cycle()

  //         return this
  //     }


  //     // CAROUSEL PLUGIN DEFINITION
  //     // ==========================

  //     function Plugin(option) {
  //         return this.each(function () {
  //             var $this = $(this)
  //             var data = $this.data('bs.carousel')
  //             var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
  //             var action = typeof option == 'string' ? option : options.slide

  //             if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
  //             if (typeof option == 'number') data.to(option)
  //             else if (action) data[action]()
  //             else if (options.interval) data.pause().cycle()
  //         })
  //     }

  //     var old = $.fn.carousel

  //     $.fn.carousel = Plugin
  //     $.fn.carousel.Constructor = Carousel


  //     // CAROUSEL NO CONFLICT
  //     // ====================

  //     $.fn.carousel.noConflict = function () {
  //         $.fn.carousel = old
  //         return this
  //     }


  //     // CAROUSEL DATA-API
  //     // =================

  //     var clickHandler = function (e) {
  //         var href
  //         var $this = $(this)
  //         var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
  //         if (!$target.hasClass('carousel')) return
  //         var options = $.extend({}, $target.data(), $this.data())
  //         var slideIndex = $this.attr('data-slide-to')
  //         if (slideIndex) options.interval = false

  //         Plugin.call($target, options)

  //         if (slideIndex) {
  //             $target.data('bs.carousel').to(slideIndex)
  //         }

  //         e.preventDefault()
  //     }

  //     $(document)
  //       .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
  //       .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  //     $(window).on('load', function () {
  //         $('[data-ride="carousel"]').each(function () {
  //             var $carousel = $(this)
  //             Plugin.call($carousel, $carousel.data())
  //         })
  //     })

  // }(jQuery);

  /* ========================================================================
   * Bootstrap: collapse.js v3.3.4
   * http://getbootstrap.com/javascript/#collapse
   * ========================================================================
   * Copyright 2011-2015 Twitter, Inc.
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * ======================================================================== */


  +function ($) {
      'use strict';

      // COLLAPSE PUBLIC CLASS DEFINITION
      // ================================

      var Collapse = function (element, options) {
          this.$element = $(element)
          this.options = $.extend({}, Collapse.DEFAULTS, options)
          this.$trigger = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                                 '[data-toggle="collapse"][data-target="#' + element.id + '"]')
          this.transitioning = null

          if (this.options.parent) {
              this.$parent = this.getParent()
          } else {
              this.addAriaAndCollapsedClass(this.$element, this.$trigger)
          }

          if (this.options.toggle) this.toggle()
      }

      Collapse.VERSION = '3.3.4'

      Collapse.TRANSITION_DURATION = 350

      Collapse.DEFAULTS = {
          toggle: true
      }

      Collapse.prototype.dimension = function () {
          var hasWidth = this.$element.hasClass('width')
          return hasWidth ? 'width' : 'height'
      }

      Collapse.prototype.show = function () {
          if (this.transitioning || this.$element.hasClass('in')) return

          var activesData
          var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

          if (actives && actives.length) {
              activesData = actives.data('bs.collapse')
              if (activesData && activesData.transitioning) return
          }

          var startEvent = $.Event('show.bs.collapse')
          this.$element.trigger(startEvent)
          if (startEvent.isDefaultPrevented()) return

          if (actives && actives.length) {
              Plugin.call(actives, 'hide')
              activesData || actives.data('bs.collapse', null)
          }

          var dimension = this.dimension()

          this.$element
            .removeClass('collapse')
            .addClass('collapsing')[dimension](0)
            .attr('aria-expanded', true)

          this.$trigger
            .removeClass('collapsed')
            .attr('aria-expanded', true)

          this.transitioning = 1

          var complete = function () {
              this.$element
                .removeClass('collapsing')
                .addClass('collapse in')[dimension]('')
              this.transitioning = 0
              this.$element
                .trigger('shown.bs.collapse')
          }

          if (!$.support.transition) return complete.call(this)

          var scrollSize = $.camelCase(['scroll', dimension].join('-'))

          this.$element
            .one('bsTransitionEnd', $.proxy(complete, this))
            .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
      }

      Collapse.prototype.hide = function () {
          if (this.transitioning || !this.$element.hasClass('in')) return

          var startEvent = $.Event('hide.bs.collapse')
          this.$element.trigger(startEvent)
          if (startEvent.isDefaultPrevented()) return

          var dimension = this.dimension()

          this.$element[dimension](this.$element[dimension]())[0].offsetHeight

          this.$element
            .addClass('collapsing')
            .removeClass('collapse in')
            .attr('aria-expanded', false)

          this.$trigger
            .addClass('collapsed')
            .attr('aria-expanded', false)

          this.transitioning = 1

          var complete = function () {
              this.transitioning = 0
              this.$element
                .removeClass('collapsing')
                .addClass('collapse')
                .trigger('hidden.bs.collapse')
          }

          if (!$.support.transition) return complete.call(this)

          this.$element
            [dimension](0)
            .one('bsTransitionEnd', $.proxy(complete, this))
            .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
      }

      Collapse.prototype.toggle = function () {
          this[this.$element.hasClass('in') ? 'hide' : 'show']()
      }

      Collapse.prototype.getParent = function () {
          return $(this.options.parent)
            .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
            .each($.proxy(function (i, element) {
                var $element = $(element)
                this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
            }, this))
            .end()
      }

      Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
          var isOpen = $element.hasClass('in')

          $element.attr('aria-expanded', isOpen)
          $trigger
            .toggleClass('collapsed', !isOpen)
            .attr('aria-expanded', isOpen)
      }

      function getTargetFromTrigger($trigger) {
          var href
          var target = $trigger.attr('data-target')
            || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

          return $(target)
      }


      // COLLAPSE PLUGIN DEFINITION
      // ==========================

      function Plugin(option) {
          return this.each(function () {
              var $this = $(this)
              var data = $this.data('bs.collapse')
              var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

              if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
              if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
              if (typeof option == 'string') data[option]()
          })
      }

      var old = $.fn.collapse

      $.fn.collapse = Plugin
      $.fn.collapse.Constructor = Collapse


      // COLLAPSE NO CONFLICT
      // ====================

      $.fn.collapse.noConflict = function () {
          $.fn.collapse = old
          return this
      }


      // COLLAPSE DATA-API
      // =================

      $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
          var $this = $(this)

          if (!$this.attr('data-target')) e.preventDefault()

          var $target = getTargetFromTrigger($this)
          var data = $target.data('bs.collapse')
          var option = data ? 'toggle' : $this.data()

          Plugin.call($target, option)
      })

  }(jQuery);

  /* ========================================================================
   * Bootstrap: dropdown.js v3.3.4
   * http://getbootstrap.com/javascript/#dropdowns
   * ========================================================================
   * Copyright 2011-2015 Twitter, Inc.
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * ======================================================================== */


  +function ($) {
      'use strict';

      // DROPDOWN CLASS DEFINITION
      // =========================

      var backdrop = '.dropdown-backdrop'
      var toggle = '[data-toggle="dropdown"]'
      var Dropdown = function (element) {
          $(element).on('click.bs.dropdown', this.toggle)
      }

      Dropdown.VERSION = '3.3.4'

      Dropdown.prototype.toggle = function (e) {
          var $this = $(this)

          if ($this.is('.disabled, :disabled')) return

          var $parent = getParent($this)
          var isActive = $parent.hasClass('open')

          clearMenus()

          if (!isActive) {
              if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
                  // if mobile we use a backdrop because click events don't delegate
                  $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
              }

              var relatedTarget = { relatedTarget: this }
              $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

              if (e.isDefaultPrevented()) return

              $this
                .trigger('focus')
                .attr('aria-expanded', 'true')

              $parent
                .toggleClass('open')
                .trigger('shown.bs.dropdown', relatedTarget)
          }

          return false
      }

      Dropdown.prototype.keydown = function (e) {
          if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

          var $this = $(this)

          e.preventDefault()
          e.stopPropagation()

          if ($this.is('.disabled, :disabled')) return

          var $parent = getParent($this)
          var isActive = $parent.hasClass('open')

          if ((!isActive && e.which != 27) || (isActive && e.which == 27)) {
              if (e.which == 27) $parent.find(toggle).trigger('focus')
              return $this.trigger('click')
          }

          var desc = ' li:not(.disabled):visible a'
          var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc)

          if (!$items.length) return

          var index = $items.index(e.target)

          if (e.which == 38 && index > 0) index--                        // up
          if (e.which == 40 && index < $items.length - 1) index++                        // down
          if (!~index) index = 0

          $items.eq(index).trigger('focus')
      }

      function clearMenus(e) {
          if (e && e.which === 3) return
          $(backdrop).remove()
          $(toggle).each(function () {
              var $this = $(this)
              var $parent = getParent($this)
              var relatedTarget = { relatedTarget: this }

              if (!$parent.hasClass('open')) return

              $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

              if (e.isDefaultPrevented()) return

              $this.attr('aria-expanded', 'false')
              $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
          })
      }

      function getParent($this) {
          var selector = $this.attr('data-target')

          if (!selector) {
              selector = $this.attr('href')
              selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
          }

          var $parent = selector && $(selector)

          return $parent && $parent.length ? $parent : $this.parent()
      }


      // DROPDOWN PLUGIN DEFINITION
      // ==========================

      function Plugin(option) {
          return this.each(function () {
              var $this = $(this)
              var data = $this.data('bs.dropdown')

              if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
              if (typeof option == 'string') data[option].call($this)
          })
      }

      var old = $.fn.dropdown

      $.fn.dropdown = Plugin
      $.fn.dropdown.Constructor = Dropdown


      // DROPDOWN NO CONFLICT
      // ====================

      $.fn.dropdown.noConflict = function () {
          $.fn.dropdown = old
          return this
      }


      // APPLY TO STANDARD DROPDOWN ELEMENTS
      // ===================================

      $(document)
        .on('click.bs.dropdown.data-api', clearMenus)
        .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
        .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
        .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
        .on('keydown.bs.dropdown.data-api', '[role="menu"]', Dropdown.prototype.keydown)
        .on('keydown.bs.dropdown.data-api', '[role="listbox"]', Dropdown.prototype.keydown)

  }(jQuery);

  /* ========================================================================
   * Bootstrap: modal.js v3.3.4
   * http://getbootstrap.com/javascript/#modals
   * ========================================================================
   * Copyright 2011-2015 Twitter, Inc.
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * ======================================================================== */


  +function ($) {
      'use strict';

      // MODAL CLASS DEFINITION
      // ======================

      var Modal = function (element, options) {
          this.options = options
          this.$body = $(document.body)
          this.$element = $(element)
          this.$dialog = this.$element.find('.modal-dialog')
          this.$backdrop = null
          this.isShown = null
          this.originalBodyPad = null
          this.scrollbarWidth = 0
          this.ignoreBackdropClick = false

          if (this.options.remote) {
              this.$element
                .find('.modal-content')
                .load(this.options.remote, $.proxy(function () {
                    this.$element.trigger('loaded.bs.modal')
                }, this))
          }
      }

      Modal.VERSION = '3.3.4'

      Modal.TRANSITION_DURATION = 300
      Modal.BACKDROP_TRANSITION_DURATION = 150

      Modal.DEFAULTS = {
          backdrop: true,
          keyboard: true,
          show: true
      }

      Modal.prototype.toggle = function (_relatedTarget) {
          return this.isShown ? this.hide() : this.show(_relatedTarget)
      }

      Modal.prototype.show = function (_relatedTarget) {
          var that = this
          var e = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

          this.$element.trigger(e)

          if (this.isShown || e.isDefaultPrevented()) return

          this.isShown = true

          this.checkScrollbar()
          this.setScrollbar()
          this.$body.addClass('modal-open')

          this.escape()
          this.resize()

          this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

          this.$dialog.on('mousedown.dismiss.bs.modal', function () {
              that.$element.one('mouseup.dismiss.bs.modal', function (e) {
                  if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
              })
          })

          this.backdrop(function () {
              var transition = $.support.transition && that.$element.hasClass('fade')

              if (!that.$element.parent().length) {
                  that.$element.appendTo(that.$body) // don't move modals dom position
              }

              that.$element
                .show()
                .scrollTop(0)

              that.adjustDialog()

              if (transition) {
                  that.$element[0].offsetWidth // force reflow
              }

              that.$element
                .addClass('in')
                .attr('aria-hidden', false)

              that.enforceFocus()

              var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

              transition ?
                that.$dialog // wait for modal to slide in
                  .one('bsTransitionEnd', function () {
                      that.$element.trigger('focus').trigger(e)
                  })
                  .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
                that.$element.trigger('focus').trigger(e)
          })
      }

      Modal.prototype.hide = function (e) {
          if (e) e.preventDefault()

          e = $.Event('hide.bs.modal')

          this.$element.trigger(e)

          if (!this.isShown || e.isDefaultPrevented()) return

          this.isShown = false

          this.escape()
          this.resize()

          $(document).off('focusin.bs.modal')

          this.$element
            .removeClass('in')
            .attr('aria-hidden', true)
            .off('click.dismiss.bs.modal')
            .off('mouseup.dismiss.bs.modal')

          this.$dialog.off('mousedown.dismiss.bs.modal')

          $.support.transition && this.$element.hasClass('fade') ?
            this.$element
              .one('bsTransitionEnd', $.proxy(this.hideModal, this))
              .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
            this.hideModal()
      }

      Modal.prototype.enforceFocus = function () {
          $(document)
            .off('focusin.bs.modal') // guard against infinite focus loop
            .on('focusin.bs.modal', $.proxy(function (e) {
                if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
                    this.$element.trigger('focus')
                }
            }, this))
      }

      Modal.prototype.escape = function () {
          if (this.isShown && this.options.keyboard) {
              this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
                  e.which == 27 && this.hide()
              }, this))
          } else if (!this.isShown) {
              this.$element.off('keydown.dismiss.bs.modal')
          }
      }

      Modal.prototype.resize = function () {
          if (this.isShown) {
              $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
          } else {
              $(window).off('resize.bs.modal')
          }
      }

      Modal.prototype.hideModal = function () {
          var that = this
          this.$element.hide()
          this.backdrop(function () {
              that.$body.removeClass('modal-open')
              that.resetAdjustments()
              that.resetScrollbar()
              that.$element.trigger('hidden.bs.modal')
          })
      }

      Modal.prototype.removeBackdrop = function () {
          this.$backdrop && this.$backdrop.remove()
          this.$backdrop = null
      }

      Modal.prototype.backdrop = function (callback) {
          var that = this
          var animate = this.$element.hasClass('fade') ? 'fade' : ''

          if (this.isShown && this.options.backdrop) {
              var doAnimate = $.support.transition && animate

              this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
                .appendTo(this.$body)

              this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
                  if (this.ignoreBackdropClick) {
                      this.ignoreBackdropClick = false
                      return
                  }
                  if (e.target !== e.currentTarget) return
                  this.options.backdrop == 'static'
                    ? this.$element[0].focus()
                    : this.hide()
              }, this))

              if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

              this.$backdrop.addClass('in')

              if (!callback) return

              doAnimate ?
                this.$backdrop
                  .one('bsTransitionEnd', callback)
                  .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
                callback()

          } else if (!this.isShown && this.$backdrop) {
              this.$backdrop.removeClass('in')

              var callbackRemove = function () {
                  that.removeBackdrop()
                  callback && callback()
              }
              $.support.transition && this.$element.hasClass('fade') ?
                this.$backdrop
                  .one('bsTransitionEnd', callbackRemove)
                  .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
                callbackRemove()

          } else if (callback) {
              callback()
          }
      }

      // these following methods are used to handle overflowing modals

      Modal.prototype.handleUpdate = function () {
          this.adjustDialog()
      }

      Modal.prototype.adjustDialog = function () {
          var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

          this.$element.css({
              paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
              paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
          })
      }

      Modal.prototype.resetAdjustments = function () {
          this.$element.css({
              paddingLeft: '',
              paddingRight: ''
          })
      }

      Modal.prototype.checkScrollbar = function () {
          var fullWindowWidth = window.innerWidth
          if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
              var documentElementRect = document.documentElement.getBoundingClientRect()
              fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
          }
          this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
          this.scrollbarWidth = this.measureScrollbar()
      }

      Modal.prototype.setScrollbar = function () {
          var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
          this.originalBodyPad = document.body.style.paddingRight || ''
          if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
      }

      Modal.prototype.resetScrollbar = function () {
          this.$body.css('padding-right', this.originalBodyPad)
      }

      Modal.prototype.measureScrollbar = function () { // thx walsh
          var scrollDiv = document.createElement('div')
          scrollDiv.className = 'modal-scrollbar-measure'
          this.$body.append(scrollDiv)
          var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
          this.$body[0].removeChild(scrollDiv)
          return scrollbarWidth
      }


      // MODAL PLUGIN DEFINITION
      // =======================

      function Plugin(option, _relatedTarget) {
          return this.each(function () {
              var $this = $(this)
              var data = $this.data('bs.modal')
              var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

              if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
              if (typeof option == 'string') data[option](_relatedTarget)
              else if (options.show) data.show(_relatedTarget)
          })
      }

      var old = $.fn.modal

      $.fn.modal = Plugin
      $.fn.modal.Constructor = Modal


      // MODAL NO CONFLICT
      // =================

      $.fn.modal.noConflict = function () {
          $.fn.modal = old
          return this
      }


      // MODAL DATA-API
      // ==============

      $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
          var $this = $(this)
          var href = $this.attr('href')
          var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
          var option = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

          if ($this.is('a')) e.preventDefault()

          $target.one('show.bs.modal', function (showEvent) {
              if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
              $target.one('hidden.bs.modal', function () {
                  $this.is(':visible') && $this.trigger('focus')
              })
          })
          Plugin.call($target, option, this)
      })

  }(jQuery);

  /* ========================================================================
   * Bootstrap: tooltip.js v3.3.4
   * http://getbootstrap.com/javascript/#tooltip
   * Inspired by the original jQuery.tipsy by Jason Frame
   * ========================================================================
   * Copyright 2011-2015 Twitter, Inc.
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * ======================================================================== */


  +function ($) {
      'use strict';

      // TOOLTIP PUBLIC CLASS DEFINITION
      // ===============================

      var Tooltip = function (element, options) {
          this.type = null
          this.options = null
          this.enabled = null
          this.timeout = null
          this.hoverState = null
          this.$element = null

          this.init('tooltip', element, options)
      }

      Tooltip.VERSION = '3.3.4'

      Tooltip.TRANSITION_DURATION = 150

      Tooltip.DEFAULTS = {
          animation: true,
          placement: 'top',
          selector: false,
          template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
          trigger: 'hover focus',
          title: '',
          delay: 0,
          html: false,
          container: false,
          viewport: {
              selector: 'body',
              padding: 0
          }
      }

      Tooltip.prototype.init = function (type, element, options) {
          this.enabled = true
          this.type = type
          this.$element = $(element)
          this.options = this.getOptions(options)
          this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport)

          if (this.$element[0] instanceof document.constructor && !this.options.selector) {
              throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
          }

          var triggers = this.options.trigger.split(' ')

          for (var i = triggers.length; i--;) {
              var trigger = triggers[i]

              if (trigger == 'click') {
                  this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
              } else if (trigger != 'manual') {
                  var eventIn = trigger == 'hover' ? 'mouseenter' : 'focusin'
                  var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

                  this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
                  this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
              }
          }

          this.options.selector ?
            (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
            this.fixTitle()
      }

      Tooltip.prototype.getDefaults = function () {
          return Tooltip.DEFAULTS
      }

      Tooltip.prototype.getOptions = function (options) {
          options = $.extend({}, this.getDefaults(), this.$element.data(), options)

          if (options.delay && typeof options.delay == 'number') {
              options.delay = {
                  show: options.delay,
                  hide: options.delay
              }
          }

          return options
      }

      Tooltip.prototype.getDelegateOptions = function () {
          var options = {}
          var defaults = this.getDefaults()

          this._options && $.each(this._options, function (key, value) {
              if (defaults[key] != value) options[key] = value
          })

          return options
      }

      Tooltip.prototype.enter = function (obj) {
          var self = obj instanceof this.constructor ?
              obj : $(obj.currentTarget).data('bs.' + this.type)

          if (self && self.$tip && self.$tip.is(':visible')) {
              self.hoverState = 'in'
              return
          }

          if (!self) {
              self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
              $(obj.currentTarget).data('bs.' + this.type, self)
          }

          clearTimeout(self.timeout)

          self.hoverState = 'in'

          if (!self.options.delay || !self.options.delay.show) return self.show()

          self.timeout = setTimeout(function () {
              if (self.hoverState == 'in') self.show()
          }, self.options.delay.show)
      }

      Tooltip.prototype.leave = function (obj) {
          var self = obj instanceof this.constructor ?
              obj : $(obj.currentTarget).data('bs.' + this.type)

          if (!self) {
              self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
              $(obj.currentTarget).data('bs.' + this.type, self)
          }

          clearTimeout(self.timeout)

          self.hoverState = 'out'

          if (!self.options.delay || !self.options.delay.hide) return self.hide()

          self.timeout = setTimeout(function () {
              if (self.hoverState == 'out') self.hide()
          }, self.options.delay.hide)
      }

      Tooltip.prototype.show = function () {
          var e = $.Event('show.bs.' + this.type)

          if (this.hasContent() && this.enabled) {
              this.$element.trigger(e)

              var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
              if (e.isDefaultPrevented() || !inDom) return
              var that = this

              var $tip = this.tip()

              var tipId = this.getUID(this.type)

              this.setContent()
              $tip.attr('id', tipId)
              this.$element.attr('aria-describedby', tipId)

              if (this.options.animation) $tip.addClass('fade')

              var placement = typeof this.options.placement == 'function' ?
                this.options.placement.call(this, $tip[0], this.$element[0]) :
                this.options.placement

              var autoToken = /\s?auto?\s?/i
              var autoPlace = autoToken.test(placement)
              if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

              $tip
                .detach()
                .css({ top: 0, left: 0, display: 'block' })
                .addClass(placement)
                .data('bs.' + this.type, this)

              this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

              var pos = this.getPosition()
              var actualWidth = $tip[0].offsetWidth
              var actualHeight = $tip[0].offsetHeight

              if (autoPlace) {
                  var orgPlacement = placement
                  var $container = this.options.container ? $(this.options.container) : this.$element.parent()
                  var containerDim = this.getPosition($container)

                  placement = placement == 'bottom' && pos.bottom + actualHeight > containerDim.bottom ? 'top' :
                              placement == 'top' && pos.top - actualHeight < containerDim.top ? 'bottom' :
                              placement == 'right' && pos.right + actualWidth > containerDim.width ? 'left' :
                              placement == 'left' && pos.left - actualWidth < containerDim.left ? 'right' :
                              placement

                  $tip
                    .removeClass(orgPlacement)
                    .addClass(placement)
              }

              var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

              this.applyPlacement(calculatedOffset, placement)

              var complete = function () {
                  var prevHoverState = that.hoverState
                  that.$element.trigger('shown.bs.' + that.type)
                  that.hoverState = null

                  if (prevHoverState == 'out') that.leave(that)
              }

              $.support.transition && this.$tip.hasClass('fade') ?
                $tip
                  .one('bsTransitionEnd', complete)
                  .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
                complete()
          }
      }

      Tooltip.prototype.applyPlacement = function (offset, placement) {
          var $tip = this.tip()
          var width = $tip[0].offsetWidth
          var height = $tip[0].offsetHeight

          // manually read margins because getBoundingClientRect includes difference
          var marginTop = parseInt($tip.css('margin-top'), 10)
          var marginLeft = parseInt($tip.css('margin-left'), 10)

          // we must check for NaN for ie 8/9
          if (isNaN(marginTop)) marginTop = 0
          if (isNaN(marginLeft)) marginLeft = 0

          offset.top = offset.top + marginTop
          offset.left = offset.left + marginLeft

          // $.fn.offset doesn't round pixel values
          // so we use setOffset directly with our own function B-0
          $.offset.setOffset($tip[0], $.extend({
              using: function (props) {
                  $tip.css({
                      top: Math.round(props.top),
                      left: Math.round(props.left)
                  })
              }
          }, offset), 0)

          $tip.addClass('in')

          // check to see if placing tip in new offset caused the tip to resize itself
          var actualWidth = $tip[0].offsetWidth
          var actualHeight = $tip[0].offsetHeight

          if (placement == 'top' && actualHeight != height) {
              offset.top = offset.top + height - actualHeight
          }

          var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

          if (delta.left) offset.left += delta.left
          else offset.top += delta.top

          var isVertical = /top|bottom/.test(placement)
          var arrowDelta = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
          var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

          $tip.offset(offset)
          this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
      }

      Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
          this.arrow()
            .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
            .css(isVertical ? 'top' : 'left', '')
      }

      Tooltip.prototype.setContent = function () {
          var $tip = this.tip()
          var title = this.getTitle()

          $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
          $tip.removeClass('fade in top bottom left right')
      }

      Tooltip.prototype.hide = function (callback) {
          var that = this
          var $tip = $(this.$tip)
          var e = $.Event('hide.bs.' + this.type)

          function complete() {
              if (that.hoverState != 'in') $tip.detach()
              that.$element
                .removeAttr('aria-describedby')
                .trigger('hidden.bs.' + that.type)
              callback && callback()
          }

          this.$element.trigger(e)

          if (e.isDefaultPrevented()) return

          $tip.removeClass('in')

          $.support.transition && $tip.hasClass('fade') ?
            $tip
              .one('bsTransitionEnd', complete)
              .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
            complete()

          this.hoverState = null

          return this
      }

      Tooltip.prototype.fixTitle = function () {
          var $e = this.$element
          if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string') {
              $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
          }
      }

      Tooltip.prototype.hasContent = function () {
          return this.getTitle()
      }

      Tooltip.prototype.getPosition = function ($element) {
          $element = $element || this.$element

          var el = $element[0]
          var isBody = el.tagName == 'BODY'

          var elRect = el.getBoundingClientRect()
          if (elRect.width == null) {
              // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
              elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
          }
          var elOffset = isBody ? { top: 0, left: 0 } : $element.offset()
          var scroll = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
          var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

          return $.extend({}, elRect, scroll, outerDims, elOffset)
      }

      Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
          return placement == 'bottom' ? { top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2 } :
                 placement == 'top' ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
                 placement == 'left' ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
              /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

      }

      Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
          var delta = { top: 0, left: 0 }
          if (!this.$viewport) return delta

          var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
          var viewportDimensions = this.getPosition(this.$viewport)

          if (/right|left/.test(placement)) {
              var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll
              var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
              if (topEdgeOffset < viewportDimensions.top) { // top overflow
                  delta.top = viewportDimensions.top - topEdgeOffset
              } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
                  delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
              }
          } else {
              var leftEdgeOffset = pos.left - viewportPadding
              var rightEdgeOffset = pos.left + viewportPadding + actualWidth
              if (leftEdgeOffset < viewportDimensions.left) { // left overflow
                  delta.left = viewportDimensions.left - leftEdgeOffset
              } else if (rightEdgeOffset > viewportDimensions.width) { // right overflow
                  delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
              }
          }

          return delta
      }

      Tooltip.prototype.getTitle = function () {
          var title
          var $e = this.$element
          var o = this.options

          title = $e.attr('data-original-title')
            || (typeof o.title == 'function' ? o.title.call($e[0]) : o.title)

          return title
      }

      Tooltip.prototype.getUID = function (prefix) {
          do prefix += ~~(Math.random() * 1000000)
          while (document.getElementById(prefix))
          return prefix
      }

      Tooltip.prototype.tip = function () {
          return (this.$tip = this.$tip || $(this.options.template))
      }

      Tooltip.prototype.arrow = function () {
          return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
      }

      Tooltip.prototype.enable = function () {
          this.enabled = true
      }

      Tooltip.prototype.disable = function () {
          this.enabled = false
      }

      Tooltip.prototype.toggleEnabled = function () {
          this.enabled = !this.enabled
      }

      Tooltip.prototype.toggle = function (e) {
          var self = this
          if (e) {
              self = $(e.currentTarget).data('bs.' + this.type)
              if (!self) {
                  self = new this.constructor(e.currentTarget, this.getDelegateOptions())
                  $(e.currentTarget).data('bs.' + this.type, self)
              }
          }

          self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
      }

      Tooltip.prototype.destroy = function () {
          var that = this
          clearTimeout(this.timeout)
          this.hide(function () {
              that.$element.off('.' + that.type).removeData('bs.' + that.type)
          })
      }


      // TOOLTIP PLUGIN DEFINITION
      // =========================

      function Plugin(option) {
          return this.each(function () {
              var $this = $(this)
              var data = $this.data('bs.tooltip')
              var options = typeof option == 'object' && option

              if (!data && /destroy|hide/.test(option)) return
              if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
              if (typeof option == 'string') data[option]()
          })
      }

      var old = $.fn.tooltip

      $.fn.tooltip = Plugin
      $.fn.tooltip.Constructor = Tooltip


      // TOOLTIP NO CONFLICT
      // ===================

      $.fn.tooltip.noConflict = function () {
          $.fn.tooltip = old
          return this
      }

  }(jQuery);

  /* ========================================================================
   * Bootstrap: popover.js v3.3.4
   * http://getbootstrap.com/javascript/#popovers
   * ========================================================================
   * Copyright 2011-2015 Twitter, Inc.
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * ======================================================================== */


  +function ($) {
      'use strict';

      // POPOVER PUBLIC CLASS DEFINITION
      // ===============================

      var Popover = function (element, options) {
          this.init('popover', element, options)
      }

      if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

      Popover.VERSION = '3.3.4'

      Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
          placement: 'right',
          trigger: 'click',
          content: '',
          template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
      })


      // NOTE: POPOVER EXTENDS tooltip.js
      // ================================

      Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

      Popover.prototype.constructor = Popover

      Popover.prototype.getDefaults = function () {
          return Popover.DEFAULTS
      }

      Popover.prototype.setContent = function () {
          var $tip = this.tip()
          var title = this.getTitle()
          var content = this.getContent()

          $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
          $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
            this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
          ](content)

          $tip.removeClass('fade top bottom left right in')

          // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
          // this manually by checking the contents.
          if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
      }

      Popover.prototype.hasContent = function () {
          return this.getTitle() || this.getContent()
      }

      Popover.prototype.getContent = function () {
          var $e = this.$element
          var o = this.options

          return $e.attr('data-content')
            || (typeof o.content == 'function' ?
                  o.content.call($e[0]) :
                  o.content)
      }

      Popover.prototype.arrow = function () {
          return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
      }


      // POPOVER PLUGIN DEFINITION
      // =========================

      function Plugin(option) {
          return this.each(function () {
              var $this = $(this)
              var data = $this.data('bs.popover')
              var options = typeof option == 'object' && option

              if (!data && /destroy|hide/.test(option)) return
              if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
              if (typeof option == 'string') data[option]()
          })
      }

      var old = $.fn.popover

      $.fn.popover = Plugin
      $.fn.popover.Constructor = Popover


      // POPOVER NO CONFLICT
      // ===================

      $.fn.popover.noConflict = function () {
          $.fn.popover = old
          return this
      }

  }(jQuery);

  /* ========================================================================
   * Bootstrap: scrollspy.js v3.3.4
   * http://getbootstrap.com/javascript/#scrollspy
   * ========================================================================
   * Copyright 2011-2015 Twitter, Inc.
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * ======================================================================== */


  +function ($) {
      'use strict';

      // SCROLLSPY CLASS DEFINITION
      // ==========================

      function ScrollSpy(element, options) {
          this.$body = $(document.body)
          this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
          this.options = $.extend({}, ScrollSpy.DEFAULTS, options)
          this.selector = (this.options.target || '') + ' .nav li > a'
          this.offsets = []
          this.targets = []
          this.activeTarget = null
          this.scrollHeight = 0

          this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
          this.refresh()
          this.process()
      }

      ScrollSpy.VERSION = '3.3.4'

      ScrollSpy.DEFAULTS = {
          offset: 10
      }

      ScrollSpy.prototype.getScrollHeight = function () {
          return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
      }

      ScrollSpy.prototype.refresh = function () {
          var that = this
          var offsetMethod = 'offset'
          var offsetBase = 0

          this.offsets = []
          this.targets = []
          this.scrollHeight = this.getScrollHeight()

          if (!$.isWindow(this.$scrollElement[0])) {
              offsetMethod = 'position'
              offsetBase = this.$scrollElement.scrollTop()
          }

          this.$body
            .find(this.selector)
            .map(function () {
                var $el = $(this)
                var href = $el.data('target') || $el.attr('href')
                var $href = /^#./.test(href) && $(href)

                return ($href
                  && $href.length
                  && $href.is(':visible')
                  && [[$href[offsetMethod]().top + offsetBase, href]]) || null
            })
            .sort(function (a, b) { return a[0] - b[0] })
            .each(function () {
                that.offsets.push(this[0])
                that.targets.push(this[1])
            })
      }

      ScrollSpy.prototype.process = function () {
          var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
          var scrollHeight = this.getScrollHeight()
          var maxScroll = this.options.offset + scrollHeight - this.$scrollElement.height()
          var offsets = this.offsets
          var targets = this.targets
          var activeTarget = this.activeTarget
          var i

          if (this.scrollHeight != scrollHeight) {
              this.refresh()
          }

          if (scrollTop >= maxScroll) {
              return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
          }

          if (activeTarget && scrollTop < offsets[0]) {
              this.activeTarget = null
              return this.clear()
          }

          for (i = offsets.length; i--;) {
              activeTarget != targets[i]
                && scrollTop >= offsets[i]
                && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
                && this.activate(targets[i])
          }
      }

      ScrollSpy.prototype.activate = function (target) {
          this.activeTarget = target

          this.clear()

          var selector = this.selector +
            '[data-target="' + target + '"],' +
            this.selector + '[href="' + target + '"]'

          var active = $(selector)
            .parents('li')
            .addClass('active')

          if (active.parent('.dropdown-menu').length) {
              active = active
                .closest('li.dropdown')
                .addClass('active')
          }

          active.trigger('activate.bs.scrollspy')
      }

      ScrollSpy.prototype.clear = function () {
          $(this.selector)
            .parentsUntil(this.options.target, '.active')
            .removeClass('active')
      }


      // SCROLLSPY PLUGIN DEFINITION
      // ===========================

      function Plugin(option) {
          return this.each(function () {
              var $this = $(this)
              var data = $this.data('bs.scrollspy')
              var options = typeof option == 'object' && option

              if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
              if (typeof option == 'string') data[option]()
          })
      }

      var old = $.fn.scrollspy

      $.fn.scrollspy = Plugin
      $.fn.scrollspy.Constructor = ScrollSpy


      // SCROLLSPY NO CONFLICT
      // =====================

      $.fn.scrollspy.noConflict = function () {
          $.fn.scrollspy = old
          return this
      }


      // SCROLLSPY DATA-API
      // ==================

      $(window).on('load.bs.scrollspy.data-api', function () {
          $('[data-spy="scroll"]').each(function () {
              var $spy = $(this)
              Plugin.call($spy, $spy.data())
          })
      })

  }(jQuery);

  /* ========================================================================
   * Bootstrap: tab.js v3.3.4
   * http://getbootstrap.com/javascript/#tabs
   * ========================================================================
   * Copyright 2011-2015 Twitter, Inc.
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * ======================================================================== */


  +function ($) {
      'use strict';

      // TAB CLASS DEFINITION
      // ====================

      var Tab = function (element) {
          this.element = $(element)
      }

      Tab.VERSION = '3.3.4'

      Tab.TRANSITION_DURATION = 150

      Tab.prototype.show = function () {
          var $this = this.element
          var $ul = $this.closest('ul:not(.dropdown-menu)')
          var selector = $this.data('target')

          if (!selector) {
              selector = $this.attr('href')
              selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
          }

          if ($this.parent('li').hasClass('active')) return

          var $previous = $ul.find('.active:last a')
          var hideEvent = $.Event('hide.bs.tab', {
              relatedTarget: $this[0]
          })
          var showEvent = $.Event('show.bs.tab', {
              relatedTarget: $previous[0]
          })

          $previous.trigger(hideEvent)
          $this.trigger(showEvent)

          if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

          var $target = $(selector)

          this.activate($this.closest('li'), $ul)
          this.activate($target, $target.parent(), function () {
              $previous.trigger({
                  type: 'hidden.bs.tab',
                  relatedTarget: $this[0]
              })
              $this.trigger({
                  type: 'shown.bs.tab',
                  relatedTarget: $previous[0]
              })
          })
      }

      Tab.prototype.activate = function (element, container, callback) {
          var $active = container.find('> .active')
          var transition = callback
            && $.support.transition
            && (($active.length && $active.hasClass('fade')) || !!container.find('> .fade').length)

          function next() {
              $active
                .removeClass('active')
                .find('> .dropdown-menu > .active')
                  .removeClass('active')
                .end()
                .find('[data-toggle="tab"]')
                  .attr('aria-expanded', false)

              element
                .addClass('active')
                .find('[data-toggle="tab"]')
                  .attr('aria-expanded', true)

              if (transition) {
                  element[0].offsetWidth // reflow for transition
                  element.addClass('in')
              } else {
                  element.removeClass('fade')
              }

              if (element.parent('.dropdown-menu').length) {
                  element
                    .closest('li.dropdown')
                      .addClass('active')
                    .end()
                    .find('[data-toggle="tab"]')
                      .attr('aria-expanded', true)
              }

              callback && callback()
          }

          $active.length && transition ?
            $active
              .one('bsTransitionEnd', next)
              .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
            next()

          $active.removeClass('in')
      }


      // TAB PLUGIN DEFINITION
      // =====================

      function Plugin(option) {
          return this.each(function () {
              var $this = $(this)
              var data = $this.data('bs.tab')

              if (!data) $this.data('bs.tab', (data = new Tab(this)))
              if (typeof option == 'string') data[option]()
          })
      }

      var old = $.fn.tab

      $.fn.tab = Plugin
      $.fn.tab.Constructor = Tab


      // TAB NO CONFLICT
      // ===============

      $.fn.tab.noConflict = function () {
          $.fn.tab = old
          return this
      }


      // TAB DATA-API
      // ============

      var clickHandler = function (e) {
          e.preventDefault()
          Plugin.call($(this), 'show')
      }

      $(document)
        .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
        .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

  }(jQuery);

  /* ========================================================================
   * Bootstrap: affix.js v3.3.4
   * http://getbootstrap.com/javascript/#affix
   * ========================================================================
   * Copyright 2011-2015 Twitter, Inc.
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * ======================================================================== */


  +function ($) {
      'use strict';

      // AFFIX CLASS DEFINITION
      // ======================

      var Affix = function (element, options) {
          this.options = $.extend({}, Affix.DEFAULTS, options)

          this.$target = $(this.options.target)
            .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
            .on('click.bs.affix.data-api', $.proxy(this.checkPositionWithEventLoop, this))

          this.$element = $(element)
          this.affixed = null
          this.unpin = null
          this.pinnedOffset = null

          this.checkPosition()
      }

      Affix.VERSION = '3.3.4'

      Affix.RESET = 'affix affix-top affix-bottom'

      Affix.DEFAULTS = {
          offset: 0,
          target: window
      }

      Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
          var scrollTop = this.$target.scrollTop()
          var position = this.$element.offset()
          var targetHeight = this.$target.height()

          if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

          if (this.affixed == 'bottom') {
              if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
              return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
          }

          var initializing = this.affixed == null
          var colliderTop = initializing ? scrollTop : position.top
          var colliderHeight = initializing ? targetHeight : height

          if (offsetTop != null && scrollTop <= offsetTop) return 'top'
          if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

          return false
      }

      Affix.prototype.getPinnedOffset = function () {
          if (this.pinnedOffset) return this.pinnedOffset
          this.$element.removeClass(Affix.RESET).addClass('affix')
          var scrollTop = this.$target.scrollTop()
          var position = this.$element.offset()
          return (this.pinnedOffset = position.top - scrollTop)
      }

      Affix.prototype.checkPositionWithEventLoop = function () {
          setTimeout($.proxy(this.checkPosition, this), 1)
      }

      Affix.prototype.checkPosition = function () {
          if (!this.$element.is(':visible')) return

          var height = this.$element.height()
          var offset = this.options.offset
          var offsetTop = offset.top
          var offsetBottom = offset.bottom
          var scrollHeight = $(document.body).height()

          if (typeof offset != 'object') offsetBottom = offsetTop = offset
          if (typeof offsetTop == 'function') offsetTop = offset.top(this.$element)
          if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

          var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

          if (this.affixed != affix) {
              if (this.unpin != null) this.$element.css('top', '')

              var affixType = 'affix' + (affix ? '-' + affix : '')
              var e = $.Event(affixType + '.bs.affix')

              this.$element.trigger(e)

              if (e.isDefaultPrevented()) return

              this.affixed = affix
              this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

              this.$element
                .removeClass(Affix.RESET)
                .addClass(affixType)
                .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
          }

          if (affix == 'bottom') {
              this.$element.offset({
                  top: scrollHeight - height - offsetBottom
              })
          }
      }


      // AFFIX PLUGIN DEFINITION
      // =======================

      function Plugin(option) {
          return this.each(function () {
              var $this = $(this)
              var data = $this.data('bs.affix')
              var options = typeof option == 'object' && option

              if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
              if (typeof option == 'string') data[option]()
          })
      }

      var old = $.fn.affix

      $.fn.affix = Plugin
      $.fn.affix.Constructor = Affix


      // AFFIX NO CONFLICT
      // =================

      $.fn.affix.noConflict = function () {
          $.fn.affix = old
          return this
      }


      // AFFIX DATA-API
      // ==============

      $(window).on('load', function () {
          $('[data-spy="affix"]').each(function () {
              var $spy = $(this)
              var data = $spy.data()

              data.offset = data.offset || {}

              if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
              if (data.offsetTop != null) data.offset.top = data.offsetTop

              Plugin.call($spy, data)
          })
      })

  }(jQuery);

  /*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
   * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
   * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
   *
   * Version: 1.3.0
   *
   */
  (function ($) {

      jQuery.fn.extend({
          slimScroll: function (options) {

              var defaults = {

                  // width in pixels of the visible scroll area
                  width: 'auto',

                  // height in pixels of the visible scroll area
                  height: '250px',

                  // width in pixels of the scrollbar and rail
                  size: '7px',

                  // scrollbar color, accepts any hex/color value
                  color: '#000',

                  // scrollbar position - left/right
                  position: 'right',

                  // distance in pixels between the side edge and the scrollbar
                  distance: '1px',

                  // default scroll position on load - top / bottom / $('selector')
                  start: 'top',

                  // sets scrollbar opacity
                  opacity: .4,

                  // enables always-on mode for the scrollbar
                  alwaysVisible: false,

                  // check if we should hide the scrollbar when user is hovering over
                  disableFadeOut: false,

                  // sets visibility of the rail
                  railVisible: false,

                  // sets rail color
                  railColor: '#333',

                  // sets rail opacity
                  railOpacity: .2,

                  // whether  we should use jQuery UI Draggable to enable bar dragging
                  railDraggable: true,

                  // defautlt CSS class of the slimscroll rail
                  railClass: 'slimScrollRail',

                  // defautlt CSS class of the slimscroll bar
                  barClass: 'slimScrollBar',

                  // defautlt CSS class of the slimscroll wrapper
                  wrapperClass: 'slimScrollDiv',

                  // check if mousewheel should scroll the window if we reach top/bottom
                  allowPageScroll: false,

                  // scroll amount applied to each mouse wheel step
                  wheelStep: 20,

                  // scroll amount applied when user is using gestures
                  touchScrollStep: 200,

                  // sets border radius
                  borderRadius: '7px',

                  // sets border radius of the rail
                  railBorderRadius: '7px'
              };

              var o = $.extend(defaults, options);

              // do it for every element that matches selector
              this.each(function () {

                  var isOverPanel, isOverBar, isDragg, queueHide, touchDif,
                    barHeight, percentScroll, lastScroll,
                    divS = '<div></div>',
                    minBarHeight = 30,
                    releaseScroll = false;

                  // used in event handlers and for better minification
                  var me = $(this);

                  // ensure we are not binding it again
                  if (me.parent().hasClass(o.wrapperClass)) {
                      // start from last bar position
                      var offset = me.scrollTop();

                      // find bar and rail
                      bar = me.parent().find('.' + o.barClass);
                      rail = me.parent().find('.' + o.railClass);

                      getBarHeight();

                      // check if we should scroll existing instance
                      if ($.isPlainObject(options)) {
                          // Pass height: auto to an existing slimscroll object to force a resize after contents have changed
                          if ('height' in options && options.height == 'auto') {
                              me.parent().css('height', 'auto');
                              me.css('height', 'auto');
                              var height = me.parent().parent().height();
                              me.parent().css('height', height);
                              me.css('height', height);
                          }

                          if ('scrollTo' in options) {
                              // jump to a static point
                              offset = parseInt(o.scrollTo);
                          }
                          else if ('scrollBy' in options) {
                              // jump by value pixels
                              offset += parseInt(o.scrollBy);
                          }
                          else if ('destroy' in options) {
                              // remove slimscroll elements
                              bar.remove();
                              rail.remove();
                              me.unwrap();
                              return;
                          }

                          // scroll content by the given offset
                          scrollContent(offset, false, true);
                      }

                      return;
                  }

                  // optionally set height to the parent's height
                  o.height = (o.height == 'auto') ? me.parent().height() : o.height;

                  // wrap content
                  var wrapper = $(divS)
                    .addClass(o.wrapperClass)
                    .css({
                        position: 'relative',
                        overflow: 'hidden',
                        width: o.width,
                        height: o.height
                    });

                  // update style for the div
                  me.css({
                      overflow: 'hidden',
                      width: o.width,
                      height: o.height
                  });

                  // create scrollbar rail
                  var rail = $(divS)
                    .addClass(o.railClass)
                    .css({
                        width: o.size,
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        display: (o.alwaysVisible && o.railVisible) ? 'block' : 'none',
                        'border-radius': o.railBorderRadius,
                        background: o.railColor,
                        opacity: o.railOpacity,
                        zIndex: 90
                    });

                  // create scrollbar
                  var bar = $(divS)
                    .addClass(o.barClass)
                    .css({
                        background: o.color,
                        width: o.size,
                        position: 'absolute',
                        top: 0,
                        opacity: o.opacity,
                        display: o.alwaysVisible ? 'block' : 'none',
                        'border-radius': o.borderRadius,
                        BorderRadius: o.borderRadius,
                        MozBorderRadius: o.borderRadius,
                        WebkitBorderRadius: o.borderRadius,
                        zIndex: 99
                    });

                  // set position
                  var posCss = (o.position == 'right') ? { right: o.distance } : { left: o.distance };
                  rail.css(posCss);
                  bar.css(posCss);

                  // wrap it
                  me.wrap(wrapper);

                  // append to parent div
                  me.parent().append(bar);
                  me.parent().append(rail);

                  // make it draggable and no longer dependent on the jqueryUI
                  if (o.railDraggable) {
                      bar.bind("mousedown", function (e) {
                          var $doc = $(document);
                          isDragg = true;
                          t = parseFloat(bar.css('top'));
                          pageY = e.pageY;

                          $doc.bind("mousemove.slimscroll", function (e) {
                              currTop = t + e.pageY - pageY;
                              bar.css('top', currTop);
                              scrollContent(0, bar.position().top, false);// scroll content
                          });

                          $doc.bind("mouseup.slimscroll", function (e) {
                              isDragg = false; hideBar();
                              $doc.unbind('.slimscroll');
                          });
                          return false;
                      }).bind("selectstart.slimscroll", function (e) {
                          e.stopPropagation();
                          e.preventDefault();
                          return false;
                      });
                  }

                  // on rail over
                  rail.hover(function () {
                      showBar();
                  }, function () {
                      hideBar();
                  });

                  // on bar over
                  bar.hover(function () {
                      isOverBar = true;
                  }, function () {
                      isOverBar = false;
                  });

                  // show on parent mouseover
                  me.hover(function () {
                      isOverPanel = true;
                      showBar();
                      hideBar();
                  }, function () {
                      isOverPanel = false;
                      hideBar();
                  });

                  // support for mobile
                  me.bind('touchstart', function (e, b) {
                      if (e.originalEvent.touches.length) {
                          // record where touch started
                          touchDif = e.originalEvent.touches[0].pageY;
                      }
                  });

                  me.bind('touchmove', function (e) {
                      // prevent scrolling the page if necessary
                      if (!releaseScroll) {
                          e.originalEvent.preventDefault();
                      }
                      if (e.originalEvent.touches.length) {
                          // see how far user swiped
                          var diff = (touchDif - e.originalEvent.touches[0].pageY) / o.touchScrollStep;
                          // scroll content
                          scrollContent(diff, true);
                          touchDif = e.originalEvent.touches[0].pageY;
                      }
                  });

                  // set up initial height
                  getBarHeight();

                  // check start position
                  if (o.start === 'bottom') {
                      // scroll content to bottom
                      bar.css({ top: me.outerHeight() - bar.outerHeight() });
                      scrollContent(0, true);
                  }
                  else if (o.start !== 'top') {
                      // assume jQuery selector
                      scrollContent($(o.start).position().top, null, true);

                      // make sure bar stays hidden
                      if (!o.alwaysVisible) { bar.hide(); }
                  }

                  // attach scroll events
                  attachWheel();

                  function _onWheel(e) {
                      // use mouse wheel only when mouse is over
                      if (!isOverPanel) { return; }

                      var e = e || window.event;

                      var delta = 0;
                      if (e.wheelDelta) { delta = -e.wheelDelta / 120; }
                      if (e.detail) { delta = e.detail / 3; }

                      var target = e.target || e.srcTarget || e.srcElement;
                      if ($(target).closest('.' + o.wrapperClass).is(me.parent())) {
                          // scroll content
                          scrollContent(delta, true);
                      }

                      // stop window scroll
                      if (e.preventDefault && !releaseScroll) { e.preventDefault(); }
                      if (!releaseScroll) { e.returnValue = false; }
                  }

                  function scrollContent(y, isWheel, isJump) {
                      releaseScroll = false;
                      var delta = y;
                      var maxTop = me.outerHeight() - bar.outerHeight();

                      if (isWheel) {
                          // move bar with mouse wheel
                          delta = parseInt(bar.css('top')) + y * parseInt(o.wheelStep) / 100 * bar.outerHeight();

                          // move bar, make sure it doesn't go out
                          delta = Math.min(Math.max(delta, 0), maxTop);

                          // if scrolling down, make sure a fractional change to the
                          // scroll position isn't rounded away when the scrollbar's CSS is set
                          // this flooring of delta would happened automatically when
                          // bar.css is set below, but we floor here for clarity
                          delta = (y > 0) ? Math.ceil(delta) : Math.floor(delta);

                          // scroll the scrollbar
                          bar.css({ top: delta + 'px' });
                      }

                      // calculate actual scroll amount
                      percentScroll = parseInt(bar.css('top')) / (me.outerHeight() - bar.outerHeight());
                      delta = percentScroll * (me[0].scrollHeight - me.outerHeight());

                      if (isJump) {
                          delta = y;
                          var offsetTop = delta / me[0].scrollHeight * me.outerHeight();
                          offsetTop = Math.min(Math.max(offsetTop, 0), maxTop);
                          bar.css({ top: offsetTop + 'px' });
                      }

                      // scroll content
                      me.scrollTop(delta);

                      // fire scrolling event
                      me.trigger('slimscrolling', ~~delta);

                      // ensure bar is visible
                      showBar();

                      // trigger hide when scroll is stopped
                      hideBar();
                  }

                  function attachWheel() {
                      if (window.addEventListener) {
                          this.addEventListener('DOMMouseScroll', _onWheel, false);
                          this.addEventListener('mousewheel', _onWheel, false);
                          this.addEventListener('MozMousePixelScroll', _onWheel, false);
                      }
                      else {
                          document.attachEvent("onmousewheel", _onWheel)
                      }
                  }

                  function getBarHeight() {
                      // calculate scrollbar height and make sure it is not too small
                      barHeight = Math.max((me.outerHeight() / me[0].scrollHeight) * me.outerHeight(), minBarHeight);
                      bar.css({ height: barHeight + 'px' });

                      // hide scrollbar if content is not long enough
                      var display = barHeight == me.outerHeight() ? 'none' : 'block';
                      bar.css({ display: display });
                  }

                  function showBar() {
                      // recalculate bar height
                      getBarHeight();
                      clearTimeout(queueHide);

                      // when bar reached top or bottom
                      if (percentScroll == ~~percentScroll) {
                          //release wheel
                          releaseScroll = o.allowPageScroll;

                          // publish approporiate event
                          if (lastScroll != percentScroll) {
                              var msg = (~~percentScroll == 0) ? 'top' : 'bottom';
                              me.trigger('slimscroll', msg);
                          }
                      }
                      else {
                          releaseScroll = false;
                      }
                      lastScroll = percentScroll;

                      // show only when required
                      if (barHeight >= me.outerHeight()) {
                          //allow window scroll
                          releaseScroll = true;
                          return;
                      }
                      bar.stop(true, true).fadeIn('fast');
                      if (o.railVisible) { rail.stop(true, true).fadeIn('fast'); }
                  }

                  function hideBar() {
                      // only hide when options allow it
                      if (!o.alwaysVisible) {
                          queueHide = setTimeout(function () {
                              if (!(o.disableFadeOut && isOverPanel) && !isOverBar && !isDragg) {
                                  bar.fadeOut('slow');
                                  rail.fadeOut('slow');
                              }
                          }, 1000);
                      }
                  }

              });

              // maintain chainability
              return this;
          }
      });

      jQuery.fn.extend({
          slimscroll: jQuery.fn.slimScroll
      });

  })(jQuery);

  (function ($) {
      'use strict';

      function transitionEnd() {
          var el = document.createElement('mm');

          var transEndEventNames = {
              WebkitTransition: 'webkitTransitionEnd',
              MozTransition: 'transitionend',
              OTransition: 'oTransitionEnd otransitionend',
              transition: 'transitionend'
          };

          for (var name in transEndEventNames) {
              if (el.style[name] !== undefined) {
                  return {
                      end: transEndEventNames[name]
                  };
              }
          }
          return false;
      }

      $.fn.emulateTransitionEnd = function (duration) {
          var called = false;
          var $el = this;
          $(this).one('mmTransitionEnd', function () {
              called = true;
          });
          var callback = function () {
              if (!called) {
                  $($el).trigger($transition.end);
              }
          };
          setTimeout(callback, duration);
          return this;
      };

      var $transition = transitionEnd();
      if (!!$transition) {
          $.event.special.mmTransitionEnd = {
              bindType: $transition.end,
              delegateType: $transition.end,
              handle: function (e) {
                  if ($(e.target).is(this)) {
                      return e.
                      handleObj.
                      handler.
                      apply(this, arguments);
                  }
              }
          };
      }

      var MetisMenu = function (element, options) {
          this.$element = $(element);
          this.options = $.extend({}, MetisMenu.DEFAULTS, options);
          this.transitioning = null;

          this.init();
      };

      MetisMenu.TRANSITION_DURATION = 350;

      MetisMenu.DEFAULTS = {
          toggle: true,
          doubleTapToGo: false,
          activeClass: 'active',
          collapseClass: 'collapse',
          collapseInClass: 'in',
          collapsingClass: 'collapsing',
          onTransitionStart: false,
          onTransitionEnd: false
      };

      MetisMenu.prototype.init = function () {
          var $this = this;
          var activeClass = this.options.activeClass;
          var collapseClass = this.options.collapseClass;
          var collapseInClass = this.options.collapseInClass;

          this
            .$element
            .find('li.' + activeClass)
            .has('ul')
            .children('ul')
            .attr('aria-expanded', true)
            .addClass(collapseClass + ' ' + collapseInClass);

          this
            .$element
            .find('li')
            .not('.' + activeClass)
            .has('ul')
            .children('ul')
            .attr('aria-expanded', false)
            .addClass(collapseClass);

          //add the 'doubleTapToGo' class to active items if needed
          if (this.options.doubleTapToGo) {
              this
                .$element
                .find('li.' + activeClass)
                .has('ul')
                .children('a')
                .addClass('doubleTapToGo');
          }

          this
            .$element
            .find('li')
            .has('ul')
            .children('a')
            .on('click.metisMenu', function (e) {
                var self = $(this);
                var $parent = self.parent('li');
                var $list = $parent.children('ul');
                e.preventDefault();

                if ($parent.hasClass(activeClass) && !$this.options.doubleTapToGo) {
                    $this.hide($list);
                    self.attr('aria-expanded', false);
                } else {
                    $this.show($list);
                    self.attr('aria-expanded', true);
                }

                if ($this.options.onTransitionStart) {
                    $this.options.onTransitionStart();
                }

                //Do we need to enable the double tap
                if ($this.options.doubleTapToGo) {
                    //if we hit a second time on the link and the href is valid, navigate to that url
                    if ($this.doubleTapToGo(self) && self.attr('href') !== '#' && self.attr('href') !== '') {
                        e.stopPropagation();
                        document.location = self.attr('href');
                        return;
                    }
                }
            });
      };

      MetisMenu.prototype.doubleTapToGo = function (elem) {
          var $this = this.$element;
          //if the class 'doubleTapToGo' exists, remove it and return
          if (elem.hasClass('doubleTapToGo')) {
              elem.removeClass('doubleTapToGo');
              return true;
          }
          //does not exists, add a new class and return false
          if (elem.parent().children('ul').length) {
              //first remove all other class
              $this
                .find('.doubleTapToGo')
                .removeClass('doubleTapToGo');
              //add the class on the current element
              elem.addClass('doubleTapToGo');
              return false;
          }
      };

      MetisMenu.prototype.show = function (el) {
          var activeClass = this.options.activeClass;
          var collapseClass = this.options.collapseClass;
          var collapseInClass = this.options.collapseInClass;
          var collapsingClass = this.options.collapsingClass;
          var $this = $(el);
          var $parent = $this.parent('li');
          if (this.transitioning || $this.hasClass(collapseInClass)) {
              return;
          }

          $parent.addClass(activeClass);

          if (this.options.toggle) {
              this.hide($parent.siblings().children('ul.' + collapseInClass).attr('aria-expanded', false));
          }

          $this
            .removeClass(collapseClass)
            .addClass(collapsingClass)
            .height(0);

          this.transitioning = 1;
          var complete = function () {
              if (this.transitioning && this.options.onTransitionEnd) {
                  this.options.onTransitionEnd();
              }
              $this
                .removeClass(collapsingClass)
                .addClass(collapseClass + ' ' + collapseInClass)
                .height('')
                .attr('aria-expanded', true);
              this.transitioning = 0;
          };
          if (!$transition) {
              return complete.call(this);
          }
          $this
            .one('mmTransitionEnd', $.proxy(complete, this))
            .emulateTransitionEnd(MetisMenu.TRANSITION_DURATION)
            .height($this[0].scrollHeight);
      };

      MetisMenu.prototype.hide = function (el) {
          var activeClass = this.options.activeClass;
          var collapseClass = this.options.collapseClass;
          var collapseInClass = this.options.collapseInClass;
          var collapsingClass = this.options.collapsingClass;
          var $this = $(el);

          if (this.transitioning || !$this.hasClass(collapseInClass)) {
              return;
          }

          $this.parent('li').removeClass(activeClass);
          $this.height($this.height())[0].offsetHeight;

          $this
            .addClass(collapsingClass)
            .removeClass(collapseClass)
            .removeClass(collapseInClass);

          this.transitioning = 1;

          var complete = function () {
              if (this.transitioning && this.options.onTransitionEnd) {
                  this.options.onTransitionEnd();
              }
              this.transitioning = 0;
              $this
                .removeClass(collapsingClass)
                .addClass(collapseClass)
                .attr('aria-expanded', false);
          };

          if (!$transition) {
              return complete.call(this);
          }
          $this
            .height(0)
            .one('mmTransitionEnd', $.proxy(complete, this))
            .emulateTransitionEnd(MetisMenu.TRANSITION_DURATION);
      };

      function Plugin(option) {
          return this.each(function () {
              var $this = $(this);
              var data = $this.data('mm');
              var options = $.extend({},
                MetisMenu.DEFAULTS,
                $this.data(),
                typeof option === 'object' && option
              );

              if (!data) {
                  $this.data('mm', (data = new MetisMenu(this, options)));
              }
              if (typeof option === 'string') {
                  data[option]();
              }
          });
      }

      var old = $.fn.metisMenu;

      $.fn.metisMenu = Plugin;
      $.fn.metisMenu.Constructor = MetisMenu;

      $.fn.metisMenu.noConflict = function () {
          $.fn.metisMenu = old;
          return this;
      };

  })(jQuery);

  /*! pace 0.5.1 */
  (function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W=[].slice,X={}.hasOwnProperty,Y=function(a,b){function c(){this.constructor=a}for(var d in b)X.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},Z=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};for(t={catchupTime:500,initialRate:.03,minTime:500,ghostTime:500,maxProgressPerFrame:10,easeFactor:1.25,startOnPageLoad:!0,restartOnPushState:!0,restartOnRequestAfter:500,target:"body",elements:{checkInterval:100,selectors:["body"]},eventLag:{minSamples:10,sampleCount:3,lagThreshold:3},ajax:{trackMethods:["GET"],trackWebSockets:!0,ignoreURLs:[]}},B=function(){var a;return null!=(a="undefined"!=typeof performance&&null!==performance?"function"==typeof performance.now?performance.now():void 0:void 0)?a:+new Date},D=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,s=window.cancelAnimationFrame||window.mozCancelAnimationFrame,null==D&&(D=function(a){return setTimeout(a,50)},s=function(a){return clearTimeout(a)}),F=function(a){var b,c;return b=B(),(c=function(){var d;return d=B()-b,d>=33?(b=B(),a(d,function(){return D(c)})):setTimeout(c,33-d)})()},E=function(){var a,b,c;return c=arguments[0],b=arguments[1],a=3<=arguments.length?W.call(arguments,2):[],"function"==typeof c[b]?c[b].apply(c,a):c[b]},u=function(){var a,b,c,d,e,f,g;for(b=arguments[0],d=2<=arguments.length?W.call(arguments,1):[],f=0,g=d.length;g>f;f++)if(c=d[f])for(a in c)X.call(c,a)&&(e=c[a],null!=b[a]&&"object"==typeof b[a]&&null!=e&&"object"==typeof e?u(b[a],e):b[a]=e);return b},p=function(a){var b,c,d,e,f;for(c=b=0,e=0,f=a.length;f>e;e++)d=a[e],c+=Math.abs(d),b++;return c/b},w=function(a,b){var c,d,e;if(null==a&&(a="options"),null==b&&(b=!0),e=document.querySelector("[data-pace-"+a+"]")){if(c=e.getAttribute("data-pace-"+a),!b)return c;try{return JSON.parse(c)}catch(f){return d=f,"undefined"!=typeof console&&null!==console?console.error("Error parsing inline pace options",d):void 0}}},g=function(){function a(){}return a.prototype.on=function(a,b,c,d){var e;return null==d&&(d=!1),null==this.bindings&&(this.bindings={}),null==(e=this.bindings)[a]&&(e[a]=[]),this.bindings[a].push({handler:b,ctx:c,once:d})},a.prototype.once=function(a,b,c){return this.on(a,b,c,!0)},a.prototype.off=function(a,b){var c,d,e;if(null!=(null!=(d=this.bindings)?d[a]:void 0)){if(null==b)return delete this.bindings[a];for(c=0,e=[];c<this.bindings[a].length;)this.bindings[a][c].handler===b?e.push(this.bindings[a].splice(c,1)):e.push(c++);return e}},a.prototype.trigger=function(){var a,b,c,d,e,f,g,h,i;if(c=arguments[0],a=2<=arguments.length?W.call(arguments,1):[],null!=(g=this.bindings)?g[c]:void 0){for(e=0,i=[];e<this.bindings[c].length;)h=this.bindings[c][e],d=h.handler,b=h.ctx,f=h.once,d.apply(null!=b?b:this,a),f?i.push(this.bindings[c].splice(e,1)):i.push(e++);return i}},a}(),null==window.Pace&&(window.Pace={}),u(Pace,g.prototype),C=Pace.options=u({},t,window.paceOptions,w()),T=["ajax","document","eventLag","elements"],P=0,R=T.length;R>P;P++)J=T[P],C[J]===!0&&(C[J]=t[J]);i=function(a){function b(){return U=b.__super__.constructor.apply(this,arguments)}return Y(b,a),b}(Error),b=function(){function a(){this.progress=0}return a.prototype.getElement=function(){var a;if(null==this.el){if(a=document.querySelector(C.target),!a)throw new i;this.el=document.createElement("div"),this.el.className="pace pace-active",document.body.className=document.body.className.replace(/pace-done/g,""),document.body.className+=" pace-running",this.el.innerHTML='<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>',null!=a.firstChild?a.insertBefore(this.el,a.firstChild):a.appendChild(this.el)}return this.el},a.prototype.finish=function(){var a;return a=this.getElement(),a.className=a.className.replace("pace-active",""),a.className+=" pace-inactive",document.body.className=document.body.className.replace("pace-running",""),document.body.className+=" pace-done"},a.prototype.update=function(a){return this.progress=a,this.render()},a.prototype.destroy=function(){try{this.getElement().parentNode.removeChild(this.getElement())}catch(a){i=a}return this.el=void 0},a.prototype.render=function(){var a,b;return null==document.querySelector(C.target)?!1:(a=this.getElement(),a.children[0].style.width=""+this.progress+"%",(!this.lastRenderedProgress||this.lastRenderedProgress|0!==this.progress|0)&&(a.children[0].setAttribute("data-progress-text",""+(0|this.progress)+"%"),this.progress>=100?b="99":(b=this.progress<10?"0":"",b+=0|this.progress),a.children[0].setAttribute("data-progress",""+b)),this.lastRenderedProgress=this.progress)},a.prototype.done=function(){return this.progress>=100},a}(),h=function(){function a(){this.bindings={}}return a.prototype.trigger=function(a,b){var c,d,e,f,g;if(null!=this.bindings[a]){for(f=this.bindings[a],g=[],d=0,e=f.length;e>d;d++)c=f[d],g.push(c.call(this,b));return g}},a.prototype.on=function(a,b){var c;return null==(c=this.bindings)[a]&&(c[a]=[]),this.bindings[a].push(b)},a}(),O=window.XMLHttpRequest,N=window.XDomainRequest,M=window.WebSocket,v=function(a,b){var c,d,e,f;f=[];for(d in b.prototype)try{e=b.prototype[d],null==a[d]&&"function"!=typeof e?f.push(a[d]=e):f.push(void 0)}catch(g){c=g}return f},z=[],Pace.ignore=function(){var a,b,c;return b=arguments[0],a=2<=arguments.length?W.call(arguments,1):[],z.unshift("ignore"),c=b.apply(null,a),z.shift(),c},Pace.track=function(){var a,b,c;return b=arguments[0],a=2<=arguments.length?W.call(arguments,1):[],z.unshift("track"),c=b.apply(null,a),z.shift(),c},I=function(a){var b;if(null==a&&(a="GET"),"track"===z[0])return"force";if(!z.length&&C.ajax){if("socket"===a&&C.ajax.trackWebSockets)return!0;if(b=a.toUpperCase(),Z.call(C.ajax.trackMethods,b)>=0)return!0}return!1},j=function(a){function b(){var a,c=this;b.__super__.constructor.apply(this,arguments),a=function(a){var b;return b=a.open,a.open=function(d,e){return I(d)&&c.trigger("request",{type:d,url:e,request:a}),b.apply(a,arguments)}},window.XMLHttpRequest=function(b){var c;return c=new O(b),a(c),c},v(window.XMLHttpRequest,O),null!=N&&(window.XDomainRequest=function(){var b;return b=new N,a(b),b},v(window.XDomainRequest,N)),null!=M&&C.ajax.trackWebSockets&&(window.WebSocket=function(a,b){var d;return d=null!=b?new M(a,b):new M(a),I("socket")&&c.trigger("request",{type:"socket",url:a,protocols:b,request:d}),d},v(window.WebSocket,M))}return Y(b,a),b}(h),Q=null,x=function(){return null==Q&&(Q=new j),Q},H=function(a){var b,c,d,e;for(e=C.ajax.ignoreURLs,c=0,d=e.length;d>c;c++)if(b=e[c],"string"==typeof b){if(-1!==a.indexOf(b))return!0}else if(b.test(a))return!0;return!1},x().on("request",function(b){var c,d,e,f,g;return f=b.type,e=b.request,g=b.url,H(g)?void 0:Pace.running||C.restartOnRequestAfter===!1&&"force"!==I(f)?void 0:(d=arguments,c=C.restartOnRequestAfter||0,"boolean"==typeof c&&(c=0),setTimeout(function(){var b,c,g,h,i,j;if(b="socket"===f?e.readyState<2:0<(h=e.readyState)&&4>h){for(Pace.restart(),i=Pace.sources,j=[],c=0,g=i.length;g>c;c++){if(J=i[c],J instanceof a){J.watch.apply(J,d);break}j.push(void 0)}return j}},c))}),a=function(){function a(){var a=this;this.elements=[],x().on("request",function(){return a.watch.apply(a,arguments)})}return a.prototype.watch=function(a){var b,c,d,e;return d=a.type,b=a.request,e=a.url,H(e)?void 0:(c="socket"===d?new m(b):new n(b),this.elements.push(c))},a}(),n=function(){function a(a){var b,c,d,e,f,g,h=this;if(this.progress=0,null!=window.ProgressEvent)for(c=null,a.addEventListener("progress",function(a){return h.progress=a.lengthComputable?100*a.loaded/a.total:h.progress+(100-h.progress)/2}),g=["load","abort","timeout","error"],d=0,e=g.length;e>d;d++)b=g[d],a.addEventListener(b,function(){return h.progress=100});else f=a.onreadystatechange,a.onreadystatechange=function(){var b;return 0===(b=a.readyState)||4===b?h.progress=100:3===a.readyState&&(h.progress=50),"function"==typeof f?f.apply(null,arguments):void 0}}return a}(),m=function(){function a(a){var b,c,d,e,f=this;for(this.progress=0,e=["error","open"],c=0,d=e.length;d>c;c++)b=e[c],a.addEventListener(b,function(){return f.progress=100})}return a}(),d=function(){function a(a){var b,c,d,f;for(null==a&&(a={}),this.elements=[],null==a.selectors&&(a.selectors=[]),f=a.selectors,c=0,d=f.length;d>c;c++)b=f[c],this.elements.push(new e(b))}return a}(),e=function(){function a(a){this.selector=a,this.progress=0,this.check()}return a.prototype.check=function(){var a=this;return document.querySelector(this.selector)?this.done():setTimeout(function(){return a.check()},C.elements.checkInterval)},a.prototype.done=function(){return this.progress=100},a}(),c=function(){function a(){var a,b,c=this;this.progress=null!=(b=this.states[document.readyState])?b:100,a=document.onreadystatechange,document.onreadystatechange=function(){return null!=c.states[document.readyState]&&(c.progress=c.states[document.readyState]),"function"==typeof a?a.apply(null,arguments):void 0}}return a.prototype.states={loading:0,interactive:50,complete:100},a}(),f=function(){function a(){var a,b,c,d,e,f=this;this.progress=0,a=0,e=[],d=0,c=B(),b=setInterval(function(){var g;return g=B()-c-50,c=B(),e.push(g),e.length>C.eventLag.sampleCount&&e.shift(),a=p(e),++d>=C.eventLag.minSamples&&a<C.eventLag.lagThreshold?(f.progress=100,clearInterval(b)):f.progress=100*(3/(a+3))},50)}return a}(),l=function(){function a(a){this.source=a,this.last=this.sinceLastUpdate=0,this.rate=C.initialRate,this.catchup=0,this.progress=this.lastProgress=0,null!=this.source&&(this.progress=E(this.source,"progress"))}return a.prototype.tick=function(a,b){var c;return null==b&&(b=E(this.source,"progress")),b>=100&&(this.done=!0),b===this.last?this.sinceLastUpdate+=a:(this.sinceLastUpdate&&(this.rate=(b-this.last)/this.sinceLastUpdate),this.catchup=(b-this.progress)/C.catchupTime,this.sinceLastUpdate=0,this.last=b),b>this.progress&&(this.progress+=this.catchup*a),c=1-Math.pow(this.progress/100,C.easeFactor),this.progress+=c*this.rate*a,this.progress=Math.min(this.lastProgress+C.maxProgressPerFrame,this.progress),this.progress=Math.max(0,this.progress),this.progress=Math.min(100,this.progress),this.lastProgress=this.progress,this.progress},a}(),K=null,G=null,q=null,L=null,o=null,r=null,Pace.running=!1,y=function(){return C.restartOnPushState?Pace.restart():void 0},null!=window.history.pushState&&(S=window.history.pushState,window.history.pushState=function(){return y(),S.apply(window.history,arguments)}),null!=window.history.replaceState&&(V=window.history.replaceState,window.history.replaceState=function(){return y(),V.apply(window.history,arguments)}),k={ajax:a,elements:d,document:c,eventLag:f},(A=function(){var a,c,d,e,f,g,h,i;for(Pace.sources=K=[],g=["ajax","elements","document","eventLag"],c=0,e=g.length;e>c;c++)a=g[c],C[a]!==!1&&K.push(new k[a](C[a]));for(i=null!=(h=C.extraSources)?h:[],d=0,f=i.length;f>d;d++)J=i[d],K.push(new J(C));return Pace.bar=q=new b,G=[],L=new l})(),Pace.stop=function(){return Pace.trigger("stop"),Pace.running=!1,q.destroy(),r=!0,null!=o&&("function"==typeof s&&s(o),o=null),A()},Pace.restart=function(){return Pace.trigger("restart"),Pace.stop(),Pace.start()},Pace.go=function(){var a;return Pace.running=!0,q.render(),a=B(),r=!1,o=F(function(b,c){var d,e,f,g,h,i,j,k,m,n,o,p,s,t,u,v;for(k=100-q.progress,e=o=0,f=!0,i=p=0,t=K.length;t>p;i=++p)for(J=K[i],n=null!=G[i]?G[i]:G[i]=[],h=null!=(v=J.elements)?v:[J],j=s=0,u=h.length;u>s;j=++s)g=h[j],m=null!=n[j]?n[j]:n[j]=new l(g),f&=m.done,m.done||(e++,o+=m.tick(b));return d=o/e,q.update(L.tick(b,d)),q.done()||f||r?(q.update(100),Pace.trigger("done"),setTimeout(function(){return q.finish(),Pace.running=!1,Pace.trigger("hide")},Math.max(C.ghostTime,Math.max(C.minTime-(B()-a),0)))):c()})},Pace.start=function(a){u(C,a),Pace.running=!0;try{q.render()}catch(b){i=b}return document.querySelector(".pace")?(Pace.trigger("start"),Pace.go()):setTimeout(Pace.start,50)},"function"==typeof define&&define.amd?define(function(){return Pace}):"object"==typeof exports?module.exports=Pace:C.startOnPageLoad&&Pace.start()}).call(this);
  function animationHover(n,t){n=$(n);n.hover(function(){n.addClass("animated "+t)},function(){window.setTimeout(function(){n.removeClass("animated "+t)},2e3)})}function SmoothlyMenu(){!$("div").hasClass("mini-navbar")||$("div").hasClass("body-small")?($("#side-menu").hide(),setTimeout(function(){$("#side-menu").fadeIn(500)},100)):$("div").hasClass("fixed-sidebar")?($("#side-menu").hide(),setTimeout(function(){$("#side-menu").fadeIn(500)},300)):$("#side-menu").removeAttr("style")}function WinMove(){$("[class*=col]").sortable({handle:".ibox-title",connectWith:"[class*=col]",tolerance:"pointer",forcePlaceholderSize:!0,opacity:.8}).disableSelection()}$(document).ready(function(){function n(){var n=$("div > #wrapper").height()-61;$(".sidebard-panel").css("min-height",n+"px")}$("#side-menu").metisMenu();$("div").on("click",".collapse-link",function(){var n=$(this).closest("div.ibox"),t=$(this).find("i"),i=n.find("div.ibox-content");i.slideToggle(200);t.toggleClass("fa-chevron-up").toggleClass("fa-chevron-down");n.toggleClass("").toggleClass("border-bottom");setTimeout(function(){n.resize();n.find("[id^=map-]").resize()},50)});$("div").on("click",".close-link",function(){var n=$(this).closest("div.ibox");n.remove()});$("div").on("click",".check-link",function(){var n=$(this).find("i"),t=$(this).next("span");return n.toggleClass("fa-check-square").toggleClass("fa-square-o"),t.toggleClass("todo-completed"),!1});$(".navbar-minimalize").click(function(){$("div").toggleClass("mini-navbar");SmoothlyMenu()});$(".navover").hover(function(){alert("test");$("div").toggleClass("mini-navbar");SmoothlyMenu()});$(".tooltip-demo").tooltip({selector:"[data-toggle=tooltip]",container:"div"});$(".modal").appendTo("div");n();$(window).bind("load resize click scroll",function(){$("div").hasClass("body-small")||n()});$("[data-toggle=popover]").popover()});$(function(){$(window).bind("load resize",function(){$(this).width()<769?$("div").addClass("body-small"):$("div").removeClass("body-small")})});$("#HideMenu").click(function(){var n=$(this).children("i").attr("class"),t=$(this).children("i").attr("data-sub");$(this).children("i").attr("class",t);$(this).children("i").attr("data-sub",n)});
  /*
  //# sourceMappingURL=inspinia.min.js.map
  */
  $("#fixednavbar").click(function () { $("#fixednavbar").is(":checked") ? ($(".navbar-static-top").removeClass("navbar-static-top").addClass("navbar-fixed-top"), $("body").removeClass("boxed-layout"), $("body").addClass("fixed-nav"), $("#boxedlayout").prop("checked", !1)) : ($(".navbar-fixed-top").removeClass("navbar-fixed-top").addClass("navbar-static-top"), $("body").removeClass("fixed-nav")) }), $("#fixedsidebar").click(function () { $("#fixedsidebar").is(":checked") ? ($("body").addClass("fixed-sidebar"), $(".sidebar-collapse").slimScroll({ height: "100%", railOpacity: .9 })) : ($(".sidebar-collapse").slimscroll({ destroy: !0 }), $(".sidebar-collapse").attr("style", ""), $("body").removeClass("fixed-sidebar")) }), $("#collapsemenu").click(function () { $("#collapsemenu").is(":checked") ? ($("body").addClass("mini-navbar"), SmoothlyMenu()) : ($("body").removeClass("mini-navbar"), SmoothlyMenu()) }), $("#boxedlayout").click(function () { $("#boxedlayout").is(":checked") ? ($("body").addClass("boxed-layout"), $("#fixednavbar").prop("checked", !1), $(".navbar-fixed-top").removeClass("navbar-fixed-top").addClass("navbar-static-top"), $("body").removeClass("fixed-nav"), $(".footer").removeClass("fixed"), $("#fixedfooter").prop("checked", !1)) : $("body").removeClass("boxed-layout") }), $("#fixedfooter").click(function () { $("#fixedfooter").is(":checked") ? ($("#boxedlayout").prop("checked", !1), $("body").removeClass("boxed-layout"), $(".footer").addClass("fixed")) : $(".footer").removeClass("fixed") }), $(".spin-icon").click(function () { $(".theme-config-box").toggleClass("show") }), $(".s-skin-0").click(function () { $("body").removeClass("skin-1"), $("body").removeClass("skin-2"), $("body").removeClass("skin-3") }), $(".s-skin-1").click(function () { $("body").removeClass("skin-2"), $("body").removeClass("skin-3"), $("body").addClass("skin-1") }), $(".s-skin-2").click(function () { $("body").removeClass("skin-1"), $("body").removeClass("skin-3"), $("body").addClass("skin-2") }), $(".s-skin-3").click(function () { $("body").removeClass("skin-1"), $("body").removeClass("skin-2"), $("body").addClass("skin-3") });
  /* Copyright (c) 2012 HyeonJe Jun (http://github.com/noraesae)
   * Licensed under the MIT License
   */

  ((function ($) {
      'use strict';
    // The default settings for the plugin
    var defaultSettings = {
      wheelSpeed: 10,
      wheelPropagation: false,
      minScrollbarLength: null
    };

    $.fn.perfectScrollbar = function (suppliedSettings, option) {

      return this.each(function () {
        // Use the default settings
        var settings = $.extend(true, {}, defaultSettings),
            $this = $(this);

        if (typeof suppliedSettings === "object") {
          // But over-ride any supplied
          $.extend(true, settings, suppliedSettings);
        } else {
          // If no settings were supplied, then the first param must be the option
          option = suppliedSettings;
        }

        // Catch options

        if (option === 'update') {
          if ($this.data('perfect-scrollbar-update')) {
            $this.data('perfect-scrollbar-update')();
          }
          return $this;
        }
        else if (option === 'destroy') {
          if ($this.data('perfect-scrollbar-destroy')) {
            $this.data('perfect-scrollbar-destroy')();
          }
          return $this;
        }

        if ($this.data('perfect-scrollbar')) {
          // if there's already perfect-scrollbar
          return $this.data('perfect-scrollbar');
        }


        // Or generate new perfectScrollbar

        // Set class to the container
        $this.addClass('ps-container');

        var $scrollbarX = $("<div class='ps-scrollbar-x'></div>").appendTo($this),
            $scrollbarY = $("<div class='ps-scrollbar-y'></div>").appendTo($this),
            containerWidth,
            containerHeight,
            contentWidth,
            contentHeight,
            scrollbarXWidth,
            scrollbarXLeft,
            scrollbarXBottom = parseInt($scrollbarX.css('bottom'), 10),
            scrollbarYHeight,
            scrollbarYTop,
            scrollbarYRight = parseInt($scrollbarY.css('right'), 10);

        var updateContentScrollTop = function () {
          var scrollTop = parseInt(scrollbarYTop * (contentHeight - containerHeight) / (containerHeight - scrollbarYHeight), 10);
          $this.scrollTop(scrollTop);
          $scrollbarX.css({bottom: scrollbarXBottom - scrollTop});
        };

        var updateContentScrollLeft = function () {
          var scrollLeft = parseInt(scrollbarXLeft * (contentWidth - containerWidth) / (containerWidth - scrollbarXWidth), 10);
          $this.scrollLeft(scrollLeft);
          $scrollbarY.css({right: scrollbarYRight - scrollLeft});
        };

        var getSettingsAdjustedThumbSize = function (thumbSize) {
          if (settings.minScrollbarLength) {
            thumbSize = Math.max(thumbSize, settings.minScrollbarLength);
          }
          return thumbSize;
        };

        var updateScrollbarCss = function () {
          $scrollbarX.css({left: scrollbarXLeft + $this.scrollLeft(), bottom: scrollbarXBottom - $this.scrollTop(), width: scrollbarXWidth});
          $scrollbarY.css({top: scrollbarYTop + $this.scrollTop(), right: scrollbarYRight - $this.scrollLeft(), height: scrollbarYHeight});
        };

        var updateBarSizeAndPosition = function () {
          containerWidth = $this.width();
          containerHeight = $this.height();
          contentWidth = $this.prop('scrollWidth');
          contentHeight = $this.prop('scrollHeight');

          if (containerWidth < contentWidth) {
            scrollbarXWidth = getSettingsAdjustedThumbSize(parseInt(containerWidth * containerWidth / contentWidth, 10));
            scrollbarXLeft = parseInt($this.scrollLeft() * (containerWidth - scrollbarXWidth) / (contentWidth - containerWidth), 10);
          }
          else {
            scrollbarXWidth = 0;
            scrollbarXLeft = 0;
            $this.scrollLeft(0);
          }

          if (containerHeight < contentHeight) {
            scrollbarYHeight = getSettingsAdjustedThumbSize(parseInt(containerHeight * containerHeight / contentHeight, 10));
            scrollbarYTop = parseInt($this.scrollTop() * (containerHeight - scrollbarYHeight) / (contentHeight - containerHeight), 10);
          }
          else {
            scrollbarYHeight = 0;
            scrollbarYTop = 0;
            $this.scrollTop(0);
          }

          if (scrollbarYTop >= containerHeight - scrollbarYHeight) {
            scrollbarYTop = containerHeight - scrollbarYHeight;
          }
          if (scrollbarXLeft >= containerWidth - scrollbarXWidth) {
            scrollbarXLeft = containerWidth - scrollbarXWidth;
          }

          updateScrollbarCss();
        };

        var moveBarX = function (currentLeft, deltaX) {
          var newLeft = currentLeft + deltaX,
              maxLeft = containerWidth - scrollbarXWidth;

          if (newLeft < 0) {
            scrollbarXLeft = 0;
          }
          else if (newLeft > maxLeft) {
            scrollbarXLeft = maxLeft;
          }
          else {
            scrollbarXLeft = newLeft;
          }
          $scrollbarX.css({left: scrollbarXLeft + $this.scrollLeft()});
        };

        var moveBarY = function (currentTop, deltaY) {
          var newTop = currentTop + deltaY,
              maxTop = containerHeight - scrollbarYHeight;

          if (newTop < 0) {
            scrollbarYTop = 0;
          }
          else if (newTop > maxTop) {
            scrollbarYTop = maxTop;
          }
          else {
            scrollbarYTop = newTop;
          }
          $scrollbarY.css({top: scrollbarYTop + $this.scrollTop()});
        };

        var bindMouseScrollXHandler = function () {
          var currentLeft,
              currentPageX;

          $scrollbarX.bind('mousedown.perfect-scroll', function (e) {
            currentPageX = e.pageX;
            currentLeft = $scrollbarX.position().left;
            $scrollbarX.addClass('in-scrolling');
            e.stopPropagation();
            e.preventDefault();
          });

          $(document).bind('mousemove.perfect-scroll', function (e) {
            if ($scrollbarX.hasClass('in-scrolling')) {
              updateContentScrollLeft();
              moveBarX(currentLeft, e.pageX - currentPageX);
              e.stopPropagation();
              e.preventDefault();
            }
          });

          $(document).bind('mouseup.perfect-scroll', function (e) {
            if ($scrollbarX.hasClass('in-scrolling')) {
              $scrollbarX.removeClass('in-scrolling');
            }
          });

          currentLeft =
          currentPageX = null;
        };

        var bindMouseScrollYHandler = function () {
          var currentTop,
              currentPageY;

          $scrollbarY.bind('mousedown.perfect-scroll', function (e) {
            currentPageY = e.pageY;
            currentTop = $scrollbarY.position().top;
            $scrollbarY.addClass('in-scrolling');
            e.stopPropagation();
            e.preventDefault();
          });

          $(document).bind('mousemove.perfect-scroll', function (e) {
            if ($scrollbarY.hasClass('in-scrolling')) {
              updateContentScrollTop();
              moveBarY(currentTop, e.pageY - currentPageY);
              e.stopPropagation();
              e.preventDefault();
            }
          });

          $(document).bind('mouseup.perfect-scroll', function (e) {
            if ($scrollbarY.hasClass('in-scrolling')) {
              $scrollbarY.removeClass('in-scrolling');
            }
          });

          currentTop =
          currentPageY = null;
        };

        // bind handlers
        var bindMouseWheelHandler = function () {
          var shouldPreventDefault = function (deltaX, deltaY) {
            var scrollTop = $this.scrollTop();
            if (scrollTop === 0 && deltaY > 0 && deltaX === 0) {
              return !settings.wheelPropagation;
            }
            else if (scrollTop >= contentHeight - containerHeight && deltaY < 0 && deltaX === 0) {
              return !settings.wheelPropagation;
            }

            var scrollLeft = $this.scrollLeft();
            if (scrollLeft === 0 && deltaX < 0 && deltaY === 0) {
              return !settings.wheelPropagation;
            }
            else if (scrollLeft >= contentWidth - containerWidth && deltaX > 0 && deltaY === 0) {
              return !settings.wheelPropagation;
            }
            return true;
          };

          var shouldPrevent = false;
          $this.bind('mousewheel.perfect-scroll', function (e, delta, deltaX, deltaY) {
            $this.scrollTop($this.scrollTop() - (deltaY * settings.wheelSpeed));
            $this.scrollLeft($this.scrollLeft() + (deltaX * settings.wheelSpeed));

            // update bar position
            updateBarSizeAndPosition();

            shouldPrevent = shouldPreventDefault(deltaX, deltaY);
            if (shouldPrevent) {
              e.preventDefault();
            }
          });

          // fix Firefox scroll problem
          $this.bind('MozMousePixelScroll.perfect-scroll', function (e) {
            if (shouldPrevent) {
              e.preventDefault();
            }
          });
        };

        // bind mobile touch handler
        var bindMobileTouchHandler = function () {
          var applyTouchMove = function (differenceX, differenceY) {
            $this.scrollTop($this.scrollTop() - differenceY);
            $this.scrollLeft($this.scrollLeft() - differenceX);

            // update bar position
            updateBarSizeAndPosition();
          };

          var startCoords = {},
              startTime = 0,
              speed = {},
              breakingProcess = null,
              inGlobalTouch = false;

          $(window).bind("touchstart.perfect-scroll", function (e) {
            inGlobalTouch = true;
          });
          $(window).bind("touchend.perfect-scroll", function (e) {
            inGlobalTouch = false;
          });

          $this.bind("touchstart.perfect-scroll", function (e) {
            var touch = e.originalEvent.targetTouches[0];

            startCoords.pageX = touch.pageX;
            startCoords.pageY = touch.pageY;

            startTime = (new Date()).getTime();

            if (breakingProcess !== null) {
              clearInterval(breakingProcess);
            }

            e.stopPropagation();
          });
          $this.bind("touchmove.perfect-scroll", function (e) {
            if (!inGlobalTouch && e.originalEvent.targetTouches.length === 1) {
              var touch = e.originalEvent.targetTouches[0];

              var currentCoords = {};
              currentCoords.pageX = touch.pageX;
              currentCoords.pageY = touch.pageY;

              var differenceX = currentCoords.pageX - startCoords.pageX,
                differenceY = currentCoords.pageY - startCoords.pageY;

              applyTouchMove(differenceX, differenceY);
              startCoords = currentCoords;

              var currentTime = (new Date()).getTime();
              speed.x = differenceX / (currentTime - startTime);
              speed.y = differenceY / (currentTime - startTime);
              startTime = currentTime;

              e.preventDefault();
            }
          });
          $this.bind("touchend.perfect-scroll", function (e) {
            clearInterval(breakingProcess);
            breakingProcess = setInterval(function () {
              if (Math.abs(speed.x) < 0.01 && Math.abs(speed.y) < 0.01) {
                clearInterval(breakingProcess);
                return;
              }

              applyTouchMove(speed.x * 30, speed.y * 30);

              speed.x *= 0.8;
              speed.y *= 0.8;
            }, 10);
          });
        };

        var destroy = function () {
          $this.unbind('.perfect-scroll');
          $(window).unbind('.perfect-scroll');
          $(document).unbind('.perfect-scroll');
          $this.data('perfect-scrollbar', null);
          $this.data('perfect-scrollbar-update', null);
          $this.data('perfect-scrollbar-destroy', null);
          $scrollbarX.remove();
          $scrollbarY.remove();

          // clean all variables
          $scrollbarX =
          $scrollbarY =
          containerWidth =
          containerHeight =
          contentWidth =
          contentHeight =
          scrollbarXWidth =
          scrollbarXLeft =
          scrollbarXBottom =
          scrollbarYHeight =
          scrollbarYTop =
          scrollbarYRight = null;
        };

        var ieSupport = function (version) {
          $this.addClass('ie').addClass('ie' + version);

          var bindHoverHandlers = function () {
            var mouseenter = function () {
              $(this).addClass('hover');
            };
            var mouseleave = function () {
              $(this).removeClass('hover');
            };
            $this.bind('mouseenter.perfect-scroll', mouseenter).bind('mouseleave.perfect-scroll', mouseleave);
            $scrollbarX.bind('mouseenter.perfect-scroll', mouseenter).bind('mouseleave.perfect-scroll', mouseleave);
            $scrollbarY.bind('mouseenter.perfect-scroll', mouseenter).bind('mouseleave.perfect-scroll', mouseleave);
          };

          var fixIe6ScrollbarPosition = function () {
            updateScrollbarCss = function () {
              $scrollbarX.css({left: scrollbarXLeft + $this.scrollLeft(), bottom: scrollbarXBottom, width: scrollbarXWidth});
              $scrollbarY.css({top: scrollbarYTop + $this.scrollTop(), right: scrollbarYRight, height: scrollbarYHeight});
              $scrollbarX.hide().show();
              $scrollbarY.hide().show();
            };
            updateContentScrollTop = function () {
              var scrollTop = parseInt(scrollbarYTop * contentHeight / containerHeight, 10);
              $this.scrollTop(scrollTop);
              $scrollbarX.css({bottom: scrollbarXBottom});
              $scrollbarX.hide().show();
            };
            updateContentScrollLeft = function () {
              var scrollLeft = parseInt(scrollbarXLeft * contentWidth / containerWidth, 10);
              $this.scrollLeft(scrollLeft);
              $scrollbarY.hide().show();
            };
          };

          if (version === 6) {
            bindHoverHandlers();
            fixIe6ScrollbarPosition();
          }
        };

        var supportsTouch = (('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch);

        var initialize = function () {
          var ieMatch = navigator.userAgent.toLowerCase().match(/(msie) ([\w.]+)/);
          if (ieMatch && ieMatch[1] === 'msie') {
            // must be executed at first, because 'ieSupport' may addClass to the container
            ieSupport(parseInt(ieMatch[2], 10));
          }

          updateBarSizeAndPosition();
          bindMouseScrollXHandler();
          bindMouseScrollYHandler();
          if (supportsTouch) {
            bindMobileTouchHandler();
          }
          if ($this.mousewheel) {
            bindMouseWheelHandler();
          }
          $this.data('perfect-scrollbar', $this);
          $this.data('perfect-scrollbar-update', updateBarSizeAndPosition);
          $this.data('perfect-scrollbar-destroy', destroy);
        };

        // initialize
        initialize();

        return $this;
      });
    };
  })(jQuery));

  /*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
   * Licensed under the MIT License (LICENSE.txt).
   *
   * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
   * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
   * Thanks to: Seamus Leahy for adding deltaX and deltaY
   *
   * Version: 3.0.6
   *
   * Requires: 1.2.2+
   */

  (function($) {

  var types = ['DOMMouseScroll', 'mousewheel'];

  if ($.event.fixHooks) {
      for ( var i=types.length; i; ) {
          $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
      }
  }

  $.event.special.mousewheel = {
      setup: function() {
          if ( this.addEventListener ) {
              for ( var i=types.length; i; ) {
                  this.addEventListener( types[--i], handler, false );
              }
          } else {
              this.onmousewheel = handler;
          }
      },

      teardown: function() {
          if ( this.removeEventListener ) {
              for ( var i=types.length; i; ) {
                  this.removeEventListener( types[--i], handler, false );
              }
          } else {
              this.onmousewheel = null;
          }
      }
  };

  $.fn.extend({
      mousewheel: function(fn) {
          return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
      },

      unmousewheel: function(fn) {
          return this.unbind("mousewheel", fn);
      }
  });


  function handler(event) {
      var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
      event = $.event.fix(orgEvent);
      event.type = "mousewheel";

      // Old school scrollwheel delta
      if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
      if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }

      // New school multidimensional scroll (touchpads) deltas
      deltaY = delta;

      // Gecko
      if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
          deltaY = 0;
          deltaX = -1*delta;
      }

      // Webkit
      if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
      if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }

      // Add event and delta to the front of the arguments
      args.unshift(event, delta, deltaX, deltaY);

      return ($.event.dispatch || $.event.handle).apply(this, args);
  }

  })(jQuery);

  /*!
   * ASP.NET SignalR JavaScript Library v2.2.2
   * http://signalr.net/
   *
   * Copyright (c) .NET Foundation. All rights reserved.
   * Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
   *
   */
  (function(n,t,i){function w(t,i){var u,f;if(n.isArray(t)){for(u=t.length-1;u>=0;u--)f=t[u],n.type(f)==="string"&&r.transports[f]||(i.log("Invalid transport: "+f+", removing it from the transports list."),t.splice(u,1));t.length===0&&(i.log("No transports remain within the specified transport array."),t=null)}else if(r.transports[t]||t==="auto"){if(t==="auto"&&r._.ieVersion<=8)return["longPolling"]}else i.log("Invalid transport: "+t.toString()+"."),t=null;return t}function b(n){return n==="http:"?80:n==="https:"?443:void 0}function a(n,t){return t.match(/:\d+$/)?t:t+":"+b(n)}function k(t,i){var u=this,r=[];u.tryBuffer=function(i){return t.state===n.signalR.connectionState.connecting?(r.push(i),!0):!1};u.drain=function(){if(t.state===n.signalR.connectionState.connected)while(r.length>0)i(r.shift())};u.clear=function(){r=[]}}var f={nojQuery:"jQuery was not found. Please ensure jQuery is referenced before the SignalR client JavaScript file.",noTransportOnInit:"No transport could be initialized successfully. Try specifying a different transport or none at all for auto initialization.",errorOnNegotiate:"Error during negotiation request.",stoppedWhileLoading:"The connection was stopped during page load.",stoppedWhileNegotiating:"The connection was stopped during the negotiate request.",errorParsingNegotiateResponse:"Error parsing negotiate response.",errorDuringStartRequest:"Error during start request. Stopping the connection.",stoppedDuringStartRequest:"The connection was stopped during the start request.",errorParsingStartResponse:"Error parsing start response: '{0}'. Stopping the connection.",invalidStartResponse:"Invalid start response: '{0}'. Stopping the connection.",protocolIncompatible:"You are using a version of the client that isn't compatible with the server. Client version {0}, server version {1}.",sendFailed:"Send failed.",parseFailed:"Failed at parsing response: {0}",longPollFailed:"Long polling request failed.",eventSourceFailedToConnect:"EventSource failed to connect.",eventSourceError:"Error raised by EventSource",webSocketClosed:"WebSocket closed.",pingServerFailedInvalidResponse:"Invalid ping response when pinging server: '{0}'.",pingServerFailed:"Failed to ping server.",pingServerFailedStatusCode:"Failed to ping server.  Server responded with status code {0}, stopping the connection.",pingServerFailedParse:"Failed to parse ping server response, stopping the connection.",noConnectionTransport:"Connection is in an invalid state, there is no transport active.",webSocketsInvalidState:"The Web Socket transport is in an invalid state, transitioning into reconnecting.",reconnectTimeout:"Couldn't reconnect within the configured timeout of {0} ms, disconnecting.",reconnectWindowTimeout:"The client has been inactive since {0} and it has exceeded the inactivity timeout of {1} ms. Stopping the connection."};if(typeof n!="function")throw new Error(f.nojQuery);var r,h,o=t.document.readyState==="complete",e=n(t),c="__Negotiate Aborted__",u={onStart:"onStart",onStarting:"onStarting",onReceived:"onReceived",onError:"onError",onConnectionSlow:"onConnectionSlow",onReconnecting:"onReconnecting",onReconnect:"onReconnect",onStateChanged:"onStateChanged",onDisconnect:"onDisconnect"},v=function(n,i){if(i!==!1){var r;typeof t.console!="undefined"&&(r="["+(new Date).toTimeString()+"] SignalR: "+n,t.console.debug?t.console.debug(r):t.console.log&&t.console.log(r))}},s=function(t,i,r){return i===t.state?(t.state=r,n(t).triggerHandler(u.onStateChanged,[{oldState:i,newState:r}]),!0):!1},y=function(n){return n.state===r.connectionState.disconnected},l=function(n){return n._.keepAliveData.activated&&n.transport.supportsKeepAlive(n)},p=function(i){var f,e;i._.configuredStopReconnectingTimeout||(e=function(t){var i=r._.format(r.resources.reconnectTimeout,t.disconnectTimeout);t.log(i);n(t).triggerHandler(u.onError,[r._.error(i,"TimeoutException")]);t.stop(!1,!1)},i.reconnecting(function(){var n=this;n.state===r.connectionState.reconnecting&&(f=t.setTimeout(function(){e(n)},n.disconnectTimeout))}),i.stateChanged(function(n){n.oldState===r.connectionState.reconnecting&&t.clearTimeout(f)}),i._.configuredStopReconnectingTimeout=!0)};if(r=function(n,t,i){return new r.fn.init(n,t,i)},r._={defaultContentType:"application/x-www-form-urlencoded; charset=UTF-8",ieVersion:function(){var i,n;return t.navigator.appName==="Microsoft Internet Explorer"&&(n=/MSIE ([0-9]+\.[0-9]+)/.exec(t.navigator.userAgent),n&&(i=t.parseFloat(n[1]))),i}(),error:function(n,t,i){var r=new Error(n);return r.source=t,typeof i!="undefined"&&(r.context=i),r},transportError:function(n,t,r,u){var f=this.error(n,r,u);return f.transport=t?t.name:i,f},format:function(){for(var t=arguments[0],n=0;n<arguments.length-1;n++)t=t.replace("{"+n+"}",arguments[n+1]);return t},firefoxMajorVersion:function(n){var t=n.match(/Firefox\/(\d+)/);return!t||!t.length||t.length<2?0:parseInt(t[1],10)},configurePingInterval:function(i){var f=i._.config,e=function(t){n(i).triggerHandler(u.onError,[t])};f&&!i._.pingIntervalId&&f.pingInterval&&(i._.pingIntervalId=t.setInterval(function(){r.transports._logic.pingServer(i).fail(e)},f.pingInterval))}},r.events=u,r.resources=f,r.ajaxDefaults={processData:!0,timeout:null,async:!0,global:!1,cache:!1},r.changeState=s,r.isDisconnecting=y,r.connectionState={connecting:0,connected:1,reconnecting:2,disconnected:4},r.hub={start:function(){throw new Error("SignalR: Error loading hubs. Ensure your hubs reference is correct, e.g. <script src='/signalr/js'><\/script>.");}},typeof e.on=="function")e.on("load",function(){o=!0});else e.load(function(){o=!0});r.fn=r.prototype={init:function(t,i,r){var f=n(this);this.url=t;this.qs=i;this.lastError=null;this._={keepAliveData:{},connectingMessageBuffer:new k(this,function(n){f.triggerHandler(u.onReceived,[n])}),lastMessageAt:(new Date).getTime(),lastActiveAt:(new Date).getTime(),beatInterval:5e3,beatHandle:null,totalTransportConnectTimeout:0};typeof r=="boolean"&&(this.logging=r)},_parseResponse:function(n){var t=this;return n?typeof n=="string"?t.json.parse(n):n:n},_originalJson:t.JSON,json:t.JSON,isCrossDomain:function(i,r){var u;return(i=n.trim(i),r=r||t.location,i.indexOf("http")!==0)?!1:(u=t.document.createElement("a"),u.href=i,u.protocol+a(u.protocol,u.host)!==r.protocol+a(r.protocol,r.host))},ajaxDataType:"text",contentType:"application/json; charset=UTF-8",logging:!1,state:r.connectionState.disconnected,clientProtocol:"1.5",reconnectDelay:2e3,transportConnectTimeout:0,disconnectTimeout:3e4,reconnectWindow:3e4,keepAliveWarnAt:2/3,start:function(i,h){var a=this,v={pingInterval:3e5,waitForPageLoad:!0,transport:"auto",jsonp:!1},d,y=a._deferral||n.Deferred(),b=t.document.createElement("a"),k,g;if(a.lastError=null,a._deferral=y,!a.json)throw new Error("SignalR: No JSON parser found. Please ensure json2.js is referenced before the SignalR.js file if you need to support clients without native JSON parsing support, e.g. IE<8.");if(n.type(i)==="function"?h=i:n.type(i)==="object"&&(n.extend(v,i),n.type(v.callback)==="function"&&(h=v.callback)),v.transport=w(v.transport,a),!v.transport)throw new Error("SignalR: Invalid transport(s) specified, aborting start.");return(a._.config=v,!o&&v.waitForPageLoad===!0)?(a._.deferredStartHandler=function(){a.start(i,h)},e.bind("load",a._.deferredStartHandler),y.promise()):a.state===r.connectionState.connecting?y.promise():s(a,r.connectionState.disconnected,r.connectionState.connecting)===!1?(y.resolve(a),y.promise()):(p(a),b.href=a.url,b.protocol&&b.protocol!==":"?(a.protocol=b.protocol,a.host=b.host):(a.protocol=t.document.location.protocol,a.host=b.host||t.document.location.host),a.baseUrl=a.protocol+"//"+a.host,a.wsProtocol=a.protocol==="https:"?"wss://":"ws://",v.transport==="auto"&&v.jsonp===!0&&(v.transport="longPolling"),a.url.indexOf("//")===0&&(a.url=t.location.protocol+a.url,a.log("Protocol relative URL detected, normalizing it to '"+a.url+"'.")),this.isCrossDomain(a.url)&&(a.log("Auto detected cross domain url."),v.transport==="auto"&&(v.transport=["webSockets","serverSentEvents","longPolling"]),typeof v.withCredentials=="undefined"&&(v.withCredentials=!0),v.jsonp||(v.jsonp=!n.support.cors,v.jsonp&&a.log("Using jsonp because this browser doesn't support CORS.")),a.contentType=r._.defaultContentType),a.withCredentials=v.withCredentials,a.ajaxDataType=v.jsonp?"jsonp":"text",n(a).bind(u.onStart,function(){n.type(h)==="function"&&h.call(a);y.resolve(a)}),a._.initHandler=r.transports._logic.initHandler(a),d=function(i,o){var c=r._.error(f.noTransportOnInit);if(o=o||0,o>=i.length){o===0?a.log("No transports supported by the server were selected."):o===1?a.log("No fallback transports were selected."):a.log("Fallback transports exhausted.");n(a).triggerHandler(u.onError,[c]);y.reject(c);a.stop();return}if(a.state!==r.connectionState.disconnected){var p=i[o],h=r.transports[p],v=function(){d(i,o+1)};a.transport=h;try{a._.initHandler.start(h,function(){var i=r._.firefoxMajorVersion(t.navigator.userAgent)>=11,f=!!a.withCredentials&&i;a.log("The start request succeeded. Transitioning to the connected state.");l(a)&&r.transports._logic.monitorKeepAlive(a);r.transports._logic.startHeartbeat(a);r._.configurePingInterval(a);s(a,r.connectionState.connecting,r.connectionState.connected)||a.log("WARNING! The connection was not in the connecting state.");a._.connectingMessageBuffer.drain();n(a).triggerHandler(u.onStart);e.bind("unload",function(){a.log("Window unloading, stopping the connection.");a.stop(f)});i&&e.bind("beforeunload",function(){t.setTimeout(function(){a.stop(f)},0)})},v)}catch(w){a.log(h.name+" transport threw '"+w.message+"' when attempting to start.");v()}}},k=a.url+"/negotiate",g=function(t,i){var e=r._.error(f.errorOnNegotiate,t,i._.negotiateRequest);n(i).triggerHandler(u.onError,e);y.reject(e);i.stop()},n(a).triggerHandler(u.onStarting),k=r.transports._logic.prepareQueryString(a,k),a.log("Negotiating with '"+k+"'."),a._.negotiateRequest=r.transports._logic.ajax(a,{url:k,error:function(n,t){t!==c?g(n,a):y.reject(r._.error(f.stoppedWhileNegotiating,null,a._.negotiateRequest))},success:function(t){var i,e,h,o=[],s=[];try{i=a._parseResponse(t)}catch(c){g(r._.error(f.errorParsingNegotiateResponse,c),a);return}if(e=a._.keepAliveData,a.appRelativeUrl=i.Url,a.id=i.ConnectionId,a.token=i.ConnectionToken,a.webSocketServerUrl=i.WebSocketServerUrl,a._.pollTimeout=i.ConnectionTimeout*1e3+1e4,a.disconnectTimeout=i.DisconnectTimeout*1e3,a._.totalTransportConnectTimeout=a.transportConnectTimeout+i.TransportConnectTimeout*1e3,i.KeepAliveTimeout?(e.activated=!0,e.timeout=i.KeepAliveTimeout*1e3,e.timeoutWarning=e.timeout*a.keepAliveWarnAt,a._.beatInterval=(e.timeout-e.timeoutWarning)/3):e.activated=!1,a.reconnectWindow=a.disconnectTimeout+(e.timeout||0),!i.ProtocolVersion||i.ProtocolVersion!==a.clientProtocol){h=r._.error(r._.format(f.protocolIncompatible,a.clientProtocol,i.ProtocolVersion));n(a).triggerHandler(u.onError,[h]);y.reject(h);return}n.each(r.transports,function(n){if(n.indexOf("_")===0||n==="webSockets"&&!i.TryWebSockets)return!0;s.push(n)});n.isArray(v.transport)?n.each(v.transport,function(t,i){n.inArray(i,s)>=0&&o.push(i)}):v.transport==="auto"?o=s:n.inArray(v.transport,s)>=0&&o.push(v.transport);d(o)}}),y.promise())},starting:function(t){var i=this;return n(i).bind(u.onStarting,function(){t.call(i)}),i},send:function(n){var t=this;if(t.state===r.connectionState.disconnected)throw new Error("SignalR: Connection must be started before data can be sent. Call .start() before .send()");if(t.state===r.connectionState.connecting)throw new Error("SignalR: Connection has not been fully initialized. Use .start().done() or .start().fail() to run logic after the connection has started.");return t.transport.send(t,n),t},received:function(t){var i=this;return n(i).bind(u.onReceived,function(n,r){t.call(i,r)}),i},stateChanged:function(t){var i=this;return n(i).bind(u.onStateChanged,function(n,r){t.call(i,r)}),i},error:function(t){var i=this;return n(i).bind(u.onError,function(n,r,u){i.lastError=r;t.call(i,r,u)}),i},disconnected:function(t){var i=this;return n(i).bind(u.onDisconnect,function(){t.call(i)}),i},connectionSlow:function(t){var i=this;return n(i).bind(u.onConnectionSlow,function(){t.call(i)}),i},reconnecting:function(t){var i=this;return n(i).bind(u.onReconnecting,function(){t.call(i)}),i},reconnected:function(t){var i=this;return n(i).bind(u.onReconnect,function(){t.call(i)}),i},stop:function(i,h){var a=this,v=a._deferral;if(a._.deferredStartHandler&&e.unbind("load",a._.deferredStartHandler),delete a._.config,delete a._.deferredStartHandler,!o&&(!a._.config||a._.config.waitForPageLoad===!0)){a.log("Stopping connection prior to negotiate.");v&&v.reject(r._.error(f.stoppedWhileLoading));return}if(a.state!==r.connectionState.disconnected)return a.log("Stopping connection."),t.clearTimeout(a._.beatHandle),t.clearInterval(a._.pingIntervalId),a.transport&&(a.transport.stop(a),h!==!1&&a.transport.abort(a,i),l(a)&&r.transports._logic.stopMonitoringKeepAlive(a),a.transport=null),a._.negotiateRequest&&(a._.negotiateRequest.abort(c),delete a._.negotiateRequest),a._.initHandler&&a._.initHandler.stop(),delete a._deferral,delete a.messageId,delete a.groupsToken,delete a.id,delete a._.pingIntervalId,delete a._.lastMessageAt,delete a._.lastActiveAt,a._.connectingMessageBuffer.clear(),n(a).unbind(u.onStart),s(a,a.state,r.connectionState.disconnected),n(a).triggerHandler(u.onDisconnect),a},log:function(n){v(n,this.logging)}};r.fn.init.prototype=r.fn;r.noConflict=function(){return n.connection===r&&(n.connection=h),r};n.connection&&(h=n.connection);n.connection=n.signalR=r})(window.jQuery,window),function(n,t,i){function s(n){n._.keepAliveData.monitoring&&l(n);u.markActive(n)&&(n._.beatHandle=t.setTimeout(function(){s(n)},n._.beatInterval))}function l(t){var i=t._.keepAliveData,u;t.state===r.connectionState.connected&&(u=(new Date).getTime()-t._.lastMessageAt,u>=i.timeout?(t.log("Keep alive timed out.  Notifying transport that connection has been lost."),t.transport.lostConnection(t)):u>=i.timeoutWarning?i.userNotified||(t.log("Keep alive has been missed, connection may be dead/slow."),n(t).triggerHandler(f.onConnectionSlow),i.userNotified=!0):i.userNotified=!1)}function e(n,t){var i=n.url+t;return n.transport&&(i+="?transport="+n.transport.name),u.prepareQueryString(n,i)}function h(n){this.connection=n;this.startRequested=!1;this.startCompleted=!1;this.connectionStopped=!1}var r=n.signalR,f=n.signalR.events,c=n.signalR.changeState,o="__Start Aborted__",u;r.transports={};h.prototype={start:function(n,r,u){var f=this,e=f.connection,o=!1;if(f.startRequested||f.connectionStopped){e.log("WARNING! "+n.name+" transport cannot be started. Initialization ongoing or completed.");return}e.log(n.name+" transport starting.");n.start(e,function(){o||f.initReceived(n,r)},function(t){return o||(o=!0,f.transportFailed(n,t,u)),!f.startCompleted||f.connectionStopped});f.transportTimeoutHandle=t.setTimeout(function(){o||(o=!0,e.log(n.name+" transport timed out when trying to connect."),f.transportFailed(n,i,u))},e._.totalTransportConnectTimeout)},stop:function(){this.connectionStopped=!0;t.clearTimeout(this.transportTimeoutHandle);r.transports._logic.tryAbortStartRequest(this.connection)},initReceived:function(n,i){var u=this,f=u.connection;if(u.startRequested){f.log("WARNING! The client received multiple init messages.");return}u.connectionStopped||(u.startRequested=!0,t.clearTimeout(u.transportTimeoutHandle),f.log(n.name+" transport connected. Initiating start request."),r.transports._logic.ajaxStart(f,function(){u.startCompleted=!0;i()}))},transportFailed:function(i,u,e){var o=this.connection,h=o._deferral,s;this.connectionStopped||(t.clearTimeout(this.transportTimeoutHandle),this.startRequested?this.startCompleted||(s=r._.error(r.resources.errorDuringStartRequest,u),o.log(i.name+" transport failed during the start request. Stopping the connection."),n(o).triggerHandler(f.onError,[s]),h&&h.reject(s),o.stop()):(i.stop(o),o.log(i.name+" transport failed to connect. Attempting to fall back."),e()))}};u=r.transports._logic={ajax:function(t,i){return n.ajax(n.extend(!0,{},n.signalR.ajaxDefaults,{type:"GET",data:{},xhrFields:{withCredentials:t.withCredentials},contentType:t.contentType,dataType:t.ajaxDataType},i))},pingServer:function(t){var e,f,i=n.Deferred();return t.transport?(e=t.url+"/ping",e=u.addQs(e,t.qs),f=u.ajax(t,{url:e,success:function(n){var u;try{u=t._parseResponse(n)}catch(e){i.reject(r._.transportError(r.resources.pingServerFailedParse,t.transport,e,f));t.stop();return}u.Response==="pong"?i.resolve():i.reject(r._.transportError(r._.format(r.resources.pingServerFailedInvalidResponse,n),t.transport,null,f))},error:function(n){n.status===401||n.status===403?(i.reject(r._.transportError(r._.format(r.resources.pingServerFailedStatusCode,n.status),t.transport,n,f)),t.stop()):i.reject(r._.transportError(r.resources.pingServerFailed,t.transport,n,f))}})):i.reject(r._.transportError(r.resources.noConnectionTransport,t.transport)),i.promise()},prepareQueryString:function(n,i){var r;return r=u.addQs(i,"clientProtocol="+n.clientProtocol),r=u.addQs(r,n.qs),n.token&&(r+="&connectionToken="+t.encodeURIComponent(n.token)),n.data&&(r+="&connectionData="+t.encodeURIComponent(n.data)),r},addQs:function(t,i){var r=t.indexOf("?")!==-1?"&":"?",u;if(!i)return t;if(typeof i=="object")return t+r+n.param(i);if(typeof i=="string")return u=i.charAt(0),(u==="?"||u==="&")&&(r=""),t+r+i;throw new Error("Query string property must be either a string or object.");},getUrl:function(n,i,r,f,e){var h=i==="webSockets"?"":n.baseUrl,o=h+n.appRelativeUrl,s="transport="+i;return!e&&n.groupsToken&&(s+="&groupsToken="+t.encodeURIComponent(n.groupsToken)),r?(o+=f?"/poll":"/reconnect",!e&&n.messageId&&(s+="&messageId="+t.encodeURIComponent(n.messageId))):o+="/connect",o+="?"+s,o=u.prepareQueryString(n,o),e||(o+="&tid="+Math.floor(Math.random()*11)),o},maximizePersistentResponse:function(n){return{MessageId:n.C,Messages:n.M,Initialized:typeof n.S!="undefined"?!0:!1,ShouldReconnect:typeof n.T!="undefined"?!0:!1,LongPollDelay:n.L,GroupsToken:n.G}},updateGroups:function(n,t){t&&(n.groupsToken=t)},stringifySend:function(n,t){return typeof t=="string"||typeof t=="undefined"||t===null?t:n.json.stringify(t)},ajaxSend:function(t,i){var h=u.stringifySend(t,i),c=e(t,"/send"),o,s=function(t,u){n(u).triggerHandler(f.onError,[r._.transportError(r.resources.sendFailed,u.transport,t,o),i])};return o=u.ajax(t,{url:c,type:t.ajaxDataType==="jsonp"?"GET":"POST",contentType:r._.defaultContentType,data:{data:h},success:function(n){var i;if(n){try{i=t._parseResponse(n)}catch(r){s(r,t);t.stop();return}u.triggerReceived(t,i)}},error:function(n,i){i!=="abort"&&i!=="parsererror"&&s(n,t)}})},ajaxAbort:function(n,t){if(typeof n.transport!="undefined"){t=typeof t=="undefined"?!0:t;var i=e(n,"/abort");u.ajax(n,{url:i,async:t,timeout:1e3,type:"POST"});n.log("Fired ajax abort async = "+t+".")}},ajaxStart:function(t,i){var h=function(n){var i=t._deferral;i&&i.reject(n)},s=function(i){t.log("The start request failed. Stopping the connection.");n(t).triggerHandler(f.onError,[i]);h(i);t.stop()};t._.startRequest=u.ajax(t,{url:e(t,"/start"),success:function(n,u,f){var e;try{e=t._parseResponse(n)}catch(o){s(r._.error(r._.format(r.resources.errorParsingStartResponse,n),o,f));return}e.Response==="started"?i():s(r._.error(r._.format(r.resources.invalidStartResponse,n),null,f))},error:function(n,i,u){i!==o?s(r._.error(r.resources.errorDuringStartRequest,u,n)):(t.log("The start request aborted because connection.stop() was called."),h(r._.error(r.resources.stoppedDuringStartRequest,null,n)))}})},tryAbortStartRequest:function(n){n._.startRequest&&(n._.startRequest.abort(o),delete n._.startRequest)},tryInitialize:function(n,t,i){t.Initialized&&i?i():t.Initialized&&n.log("WARNING! The client received an init message after reconnecting.")},triggerReceived:function(t,i){t._.connectingMessageBuffer.tryBuffer(i)||n(t).triggerHandler(f.onReceived,[i])},processMessages:function(t,i,r){var f;u.markLastMessage(t);i&&(f=u.maximizePersistentResponse(i),u.updateGroups(t,f.GroupsToken),f.MessageId&&(t.messageId=f.MessageId),f.Messages&&(n.each(f.Messages,function(n,i){u.triggerReceived(t,i)}),u.tryInitialize(t,f,r)))},monitorKeepAlive:function(t){var i=t._.keepAliveData;i.monitoring?t.log("Tried to monitor keep alive but it's already being monitored."):(i.monitoring=!0,u.markLastMessage(t),t._.keepAliveData.reconnectKeepAliveUpdate=function(){u.markLastMessage(t)},n(t).bind(f.onReconnect,t._.keepAliveData.reconnectKeepAliveUpdate),t.log("Now monitoring keep alive with a warning timeout of "+i.timeoutWarning+", keep alive timeout of "+i.timeout+" and disconnecting timeout of "+t.disconnectTimeout))},stopMonitoringKeepAlive:function(t){var i=t._.keepAliveData;i.monitoring&&(i.monitoring=!1,n(t).unbind(f.onReconnect,t._.keepAliveData.reconnectKeepAliveUpdate),t._.keepAliveData={},t.log("Stopping the monitoring of the keep alive."))},startHeartbeat:function(n){n._.lastActiveAt=(new Date).getTime();s(n)},markLastMessage:function(n){n._.lastMessageAt=(new Date).getTime()},markActive:function(n){return u.verifyLastActive(n)?(n._.lastActiveAt=(new Date).getTime(),!0):!1},isConnectedOrReconnecting:function(n){return n.state===r.connectionState.connected||n.state===r.connectionState.reconnecting},ensureReconnectingState:function(t){return c(t,r.connectionState.connected,r.connectionState.reconnecting)===!0&&n(t).triggerHandler(f.onReconnecting),t.state===r.connectionState.reconnecting},clearReconnectTimeout:function(n){n&&n._.reconnectTimeout&&(t.clearTimeout(n._.reconnectTimeout),delete n._.reconnectTimeout)},verifyLastActive:function(t){if((new Date).getTime()-t._.lastActiveAt>=t.reconnectWindow){var i=r._.format(r.resources.reconnectWindowTimeout,new Date(t._.lastActiveAt),t.reconnectWindow);return t.log(i),n(t).triggerHandler(f.onError,[r._.error(i,"TimeoutException")]),t.stop(!1,!1),!1}return!0},reconnect:function(n,i){var f=r.transports[i];if(u.isConnectedOrReconnecting(n)&&!n._.reconnectTimeout){if(!u.verifyLastActive(n))return;n._.reconnectTimeout=t.setTimeout(function(){u.verifyLastActive(n)&&(f.stop(n),u.ensureReconnectingState(n)&&(n.log(i+" reconnecting."),f.start(n)))},n.reconnectDelay)}},handleParseFailure:function(t,i,u,e,o){var s=r._.transportError(r._.format(r.resources.parseFailed,i),t.transport,u,o);e&&e(s)?t.log("Failed to parse server response while attempting to connect."):(n(t).triggerHandler(f.onError,[s]),t.stop())},initHandler:function(n){return new h(n)},foreverFrame:{count:0,connections:{}}}}(window.jQuery,window),function(n,t){var r=n.signalR,u=n.signalR.events,f=n.signalR.changeState,i=r.transports._logic;r.transports.webSockets={name:"webSockets",supportsKeepAlive:function(){return!0},send:function(t,f){var e=i.stringifySend(t,f);try{t.socket.send(e)}catch(o){n(t).triggerHandler(u.onError,[r._.transportError(r.resources.webSocketsInvalidState,t.transport,o,t.socket),f])}},start:function(e,o,s){var h,c=!1,l=this,a=!o,v=n(e);if(!t.WebSocket){s();return}e.socket||(h=e.webSocketServerUrl?e.webSocketServerUrl:e.wsProtocol+e.host,h+=i.getUrl(e,this.name,a),e.log("Connecting to websocket endpoint '"+h+"'."),e.socket=new t.WebSocket(h),e.socket.onopen=function(){c=!0;e.log("Websocket opened.");i.clearReconnectTimeout(e);f(e,r.connectionState.reconnecting,r.connectionState.connected)===!0&&v.triggerHandler(u.onReconnect)},e.socket.onclose=function(t){var i;this===e.socket&&(c&&typeof t.wasClean!="undefined"&&t.wasClean===!1?(i=r._.transportError(r.resources.webSocketClosed,e.transport,t),e.log("Unclean disconnect from websocket: "+(t.reason||"[no reason given]."))):e.log("Websocket closed."),s&&s(i)||(i&&n(e).triggerHandler(u.onError,[i]),l.reconnect(e)))},e.socket.onmessage=function(t){var r;try{r=e._parseResponse(t.data)}catch(u){i.handleParseFailure(e,t.data,u,s,t);return}r&&(n.isEmptyObject(r)||r.M?i.processMessages(e,r,o):i.triggerReceived(e,r))})},reconnect:function(n){i.reconnect(n,this.name)},lostConnection:function(n){this.reconnect(n)},stop:function(n){i.clearReconnectTimeout(n);n.socket&&(n.log("Closing the Websocket."),n.socket.close(),n.socket=null)},abort:function(n,t){i.ajaxAbort(n,t)}}}(window.jQuery,window),function(n,t){var i=n.signalR,u=n.signalR.events,e=n.signalR.changeState,r=i.transports._logic,f=function(n){t.clearTimeout(n._.reconnectAttemptTimeoutHandle);delete n._.reconnectAttemptTimeoutHandle};i.transports.serverSentEvents={name:"serverSentEvents",supportsKeepAlive:function(){return!0},timeOut:3e3,start:function(o,s,h){var c=this,l=!1,a=n(o),v=!s,y;if(o.eventSource&&(o.log("The connection already has an event source. Stopping it."),o.stop()),!t.EventSource){h&&(o.log("This browser doesn't support SSE."),h());return}y=r.getUrl(o,this.name,v);try{o.log("Attempting to connect to SSE endpoint '"+y+"'.");o.eventSource=new t.EventSource(y,{withCredentials:o.withCredentials})}catch(p){o.log("EventSource failed trying to connect with error "+p.Message+".");h?h():(a.triggerHandler(u.onError,[i._.transportError(i.resources.eventSourceFailedToConnect,o.transport,p)]),v&&c.reconnect(o));return}v&&(o._.reconnectAttemptTimeoutHandle=t.setTimeout(function(){l===!1&&o.eventSource.readyState!==t.EventSource.OPEN&&c.reconnect(o)},c.timeOut));o.eventSource.addEventListener("open",function(){o.log("EventSource connected.");f(o);r.clearReconnectTimeout(o);l===!1&&(l=!0,e(o,i.connectionState.reconnecting,i.connectionState.connected)===!0&&a.triggerHandler(u.onReconnect))},!1);o.eventSource.addEventListener("message",function(n){var t;if(n.data!=="initialized"){try{t=o._parseResponse(n.data)}catch(i){r.handleParseFailure(o,n.data,i,h,n);return}r.processMessages(o,t,s)}},!1);o.eventSource.addEventListener("error",function(n){var r=i._.transportError(i.resources.eventSourceError,o.transport,n);this===o.eventSource&&(h&&h(r)||(o.log("EventSource readyState: "+o.eventSource.readyState+"."),n.eventPhase===t.EventSource.CLOSED?(o.log("EventSource reconnecting due to the server connection ending."),c.reconnect(o)):(o.log("EventSource error."),a.triggerHandler(u.onError,[r]))))},!1)},reconnect:function(n){r.reconnect(n,this.name)},lostConnection:function(n){this.reconnect(n)},send:function(n,t){r.ajaxSend(n,t)},stop:function(n){f(n);r.clearReconnectTimeout(n);n&&n.eventSource&&(n.log("EventSource calling close()."),n.eventSource.close(),n.eventSource=null,delete n.eventSource)},abort:function(n,t){r.ajaxAbort(n,t)}}}(window.jQuery,window),function(n,t){var r=n.signalR,e=n.signalR.events,o=n.signalR.changeState,i=r.transports._logic,u=function(){var n=t.document.createElement("iframe");return n.setAttribute("style","position:absolute;top:0;left:0;width:0;height:0;visibility:hidden;"),n},f=function(){var i=null,f=1e3,n=0;return{prevent:function(){r._.ieVersion<=8&&(n===0&&(i=t.setInterval(function(){var n=u();t.document.body.appendChild(n);t.document.body.removeChild(n);n=null},f)),n++)},cancel:function(){n===1&&t.clearInterval(i);n>0&&n--}}}();r.transports.foreverFrame={name:"foreverFrame",supportsKeepAlive:function(){return!0},iframeClearThreshold:50,start:function(n,r,e){var l=this,s=i.foreverFrame.count+=1,h,o=u(),c=function(){n.log("Forever frame iframe finished loading and is no longer receiving messages.");e&&e()||l.reconnect(n)};if(t.EventSource){e&&(n.log("Forever Frame is not supported by SignalR on browsers with SSE support."),e());return}o.setAttribute("data-signalr-connection-id",n.id);f.prevent();h=i.getUrl(n,this.name);h+="&frameId="+s;t.document.documentElement.appendChild(o);n.log("Binding to iframe's load event.");o.addEventListener?o.addEventListener("load",c,!1):o.attachEvent&&o.attachEvent("onload",c);o.src=h;i.foreverFrame.connections[s]=n;n.frame=o;n.frameId=s;r&&(n.onSuccess=function(){n.log("Iframe transport started.");r()})},reconnect:function(n){var r=this;i.isConnectedOrReconnecting(n)&&i.verifyLastActive(n)&&t.setTimeout(function(){if(i.verifyLastActive(n)&&n.frame&&i.ensureReconnectingState(n)){var u=n.frame,t=i.getUrl(n,r.name,!0)+"&frameId="+n.frameId;n.log("Updating iframe src to '"+t+"'.");u.src=t}},n.reconnectDelay)},lostConnection:function(n){this.reconnect(n)},send:function(n,t){i.ajaxSend(n,t)},receive:function(t,u){var f,e,o;if(t.json!==t._originalJson&&(u=t._originalJson.stringify(u)),o=t._parseResponse(u),i.processMessages(t,o,t.onSuccess),t.state===n.signalR.connectionState.connected&&(t.frameMessageCount=(t.frameMessageCount||0)+1,t.frameMessageCount>r.transports.foreverFrame.iframeClearThreshold&&(t.frameMessageCount=0,f=t.frame.contentWindow||t.frame.contentDocument,f&&f.document&&f.document.body)))for(e=f.document.body;e.firstChild;)e.removeChild(e.firstChild)},stop:function(n){var r=null;if(f.cancel(),n.frame){if(n.frame.stop)n.frame.stop();else try{r=n.frame.contentWindow||n.frame.contentDocument;r.document&&r.document.execCommand&&r.document.execCommand("Stop")}catch(u){n.log("Error occurred when stopping foreverFrame transport. Message = "+u.message+".")}n.frame.parentNode===t.document.documentElement&&t.document.documentElement.removeChild(n.frame);delete i.foreverFrame.connections[n.frameId];n.frame=null;n.frameId=null;delete n.frame;delete n.frameId;delete n.onSuccess;delete n.frameMessageCount;n.log("Stopping forever frame.")}},abort:function(n,t){i.ajaxAbort(n,t)},getConnection:function(n){return i.foreverFrame.connections[n]},started:function(t){o(t,r.connectionState.reconnecting,r.connectionState.connected)===!0&&n(t).triggerHandler(e.onReconnect)}}}(window.jQuery,window),function(n,t){var r=n.signalR,u=n.signalR.events,e=n.signalR.changeState,f=n.signalR.isDisconnecting,i=r.transports._logic;r.transports.longPolling={name:"longPolling",supportsKeepAlive:function(){return!1},reconnectDelay:3e3,start:function(o,s,h){var a=this,v=function(){v=n.noop;o.log("LongPolling connected.");s?s():o.log("WARNING! The client received an init message after reconnecting.")},y=function(n){return h(n)?(o.log("LongPolling failed to connect."),!0):!1},c=o._,l=0,p=function(i){t.clearTimeout(c.reconnectTimeoutId);c.reconnectTimeoutId=null;e(i,r.connectionState.reconnecting,r.connectionState.connected)===!0&&(i.log("Raising the reconnect event"),n(i).triggerHandler(u.onReconnect))},w=36e5;o.pollXhr&&(o.log("Polling xhr requests already exists, aborting."),o.stop());o.messageId=null;c.reconnectTimeoutId=null;c.pollTimeoutId=t.setTimeout(function(){(function e(s,h){var g=s.messageId,nt=g===null,k=!nt,tt=!h,d=i.getUrl(s,a.name,k,tt,!0),b={};(s.messageId&&(b.messageId=s.messageId),s.groupsToken&&(b.groupsToken=s.groupsToken),f(s)!==!0)&&(o.log("Opening long polling request to '"+d+"'."),s.pollXhr=i.ajax(o,{xhrFields:{onprogress:function(){i.markLastMessage(o)}},url:d,type:"POST",contentType:r._.defaultContentType,data:b,timeout:o._.pollTimeout,success:function(r){var h,w=0,u,a;o.log("Long poll complete.");l=0;try{h=o._parseResponse(r)}catch(b){i.handleParseFailure(s,r,b,y,s.pollXhr);return}(c.reconnectTimeoutId!==null&&p(s),h&&(u=i.maximizePersistentResponse(h)),i.processMessages(s,h,v),u&&n.type(u.LongPollDelay)==="number"&&(w=u.LongPollDelay),f(s)!==!0)&&(a=u&&u.ShouldReconnect,!a||i.ensureReconnectingState(s))&&(w>0?c.pollTimeoutId=t.setTimeout(function(){e(s,a)},w):e(s,a))},error:function(f,h){var v=r._.transportError(r.resources.longPollFailed,o.transport,f,s.pollXhr);if(t.clearTimeout(c.reconnectTimeoutId),c.reconnectTimeoutId=null,h==="abort"){o.log("Aborted xhr request.");return}if(!y(v)){if(l++,o.state!==r.connectionState.reconnecting&&(o.log("An error occurred using longPolling. Status = "+h+".  Response = "+f.responseText+"."),n(s).triggerHandler(u.onError,[v])),(o.state===r.connectionState.connected||o.state===r.connectionState.reconnecting)&&!i.verifyLastActive(o))return;if(!i.ensureReconnectingState(s))return;c.pollTimeoutId=t.setTimeout(function(){e(s,!0)},a.reconnectDelay)}}}),k&&h===!0&&(c.reconnectTimeoutId=t.setTimeout(function(){p(s)},Math.min(1e3*(Math.pow(2,l)-1),w))))})(o)},250)},lostConnection:function(n){n.pollXhr&&n.pollXhr.abort("lostConnection")},send:function(n,t){i.ajaxSend(n,t)},stop:function(n){t.clearTimeout(n._.pollTimeoutId);t.clearTimeout(n._.reconnectTimeoutId);delete n._.pollTimeoutId;delete n._.reconnectTimeoutId;n.pollXhr&&(n.pollXhr.abort(),n.pollXhr=null,delete n.pollXhr)},abort:function(n,t){i.ajaxAbort(n,t)}}}(window.jQuery,window),function(n){function r(n){return n+e}function s(n,t,i){for(var f=n.length,u=[],r=0;r<f;r+=1)n.hasOwnProperty(r)&&(u[r]=t.call(i,n[r],r,n));return u}function h(t){return n.isFunction(t)?null:n.type(t)==="undefined"?null:t}function u(n){for(var t in n)if(n.hasOwnProperty(t))return!0;return!1}function f(n,t){var i=n._.invocationCallbacks,r,f;u(i)&&n.log("Clearing hub invocation callbacks with error: "+t+".");n._.invocationCallbackId=0;delete n._.invocationCallbacks;n._.invocationCallbacks={};for(f in i)r=i[f],r.method.call(r.scope,{E:t})}function i(n,t){return new i.fn.init(n,t)}function t(i,r){var u={qs:null,logging:!1,useDefaultPath:!0};return n.extend(u,r),(!i||u.useDefaultPath)&&(i=(i||"")+"/signalr"),new t.fn.init(i,u)}var e=".hubProxy",o=n.signalR;i.fn=i.prototype={init:function(n,t){this.state={};this.connection=n;this.hubName=t;this._={callbackMap:{}}},constructor:i,hasSubscriptions:function(){return u(this._.callbackMap)},on:function(t,i){var u=this,f=u._.callbackMap;return t=t.toLowerCase(),f[t]||(f[t]={}),f[t][i]=function(n,t){i.apply(u,t)},n(u).bind(r(t),f[t][i]),u},off:function(t,i){var e=this,o=e._.callbackMap,f;return t=t.toLowerCase(),f=o[t],f&&(f[i]?(n(e).unbind(r(t),f[i]),delete f[i],u(f)||delete o[t]):i||(n(e).unbind(r(t)),delete o[t])),e},invoke:function(t){var i=this,r=i.connection,e=n.makeArray(arguments).slice(1),c=s(e,h),f={H:i.hubName,M:t,A:c,I:r._.invocationCallbackId},u=n.Deferred(),l=function(f){var e=i._maximizeHubResponse(f),h,s;n.extend(i.state,e.State);e.Progress?u.notifyWith?u.notifyWith(i,[e.Progress.Data]):r._.progressjQueryVersionLogged||(r.log("A hub method invocation progress update was received but the version of jQuery in use ("+n.prototype.jquery+") does not support progress updates. Upgrade to jQuery 1.7+ to receive progress notifications."),r._.progressjQueryVersionLogged=!0):e.Error?(e.StackTrace&&r.log(e.Error+"\n"+e.StackTrace+"."),h=e.IsHubException?"HubException":"Exception",s=o._.error(e.Error,h),s.data=e.ErrorData,r.log(i.hubName+"."+t+" failed to execute. Error: "+s.message),u.rejectWith(i,[s])):(r.log("Invoked "+i.hubName+"."+t),u.resolveWith(i,[e.Result]))};return r._.invocationCallbacks[r._.invocationCallbackId.toString()]={scope:i,method:l},r._.invocationCallbackId+=1,n.isEmptyObject(i.state)||(f.S=i.state),r.log("Invoking "+i.hubName+"."+t),r.send(f),u.promise()},_maximizeHubResponse:function(n){return{State:n.S,Result:n.R,Progress:n.P?{Id:n.P.I,Data:n.P.D}:null,Id:n.I,IsHubException:n.H,Error:n.E,StackTrace:n.T,ErrorData:n.D}}};i.fn.init.prototype=i.fn;t.fn=t.prototype=n.connection();t.fn.init=function(t,i){var e={qs:null,logging:!1,useDefaultPath:!0},u=this;n.extend(e,i);n.signalR.fn.init.call(u,t,e.qs,e.logging);u.proxies={};u._.invocationCallbackId=0;u._.invocationCallbacks={};u.received(function(t){var f,o,e,i,s,h;t&&(typeof t.P!="undefined"?(e=t.P.I.toString(),i=u._.invocationCallbacks[e],i&&i.method.call(i.scope,t)):typeof t.I!="undefined"?(e=t.I.toString(),i=u._.invocationCallbacks[e],i&&(u._.invocationCallbacks[e]=null,delete u._.invocationCallbacks[e],i.method.call(i.scope,t))):(f=this._maximizeClientHubInvocation(t),u.log("Triggering client hub event '"+f.Method+"' on hub '"+f.Hub+"'."),s=f.Hub.toLowerCase(),h=f.Method.toLowerCase(),o=this.proxies[s],n.extend(o.state,f.State),n(o).triggerHandler(r(h),[f.Args])))});u.error(function(n,t){var i,r;t&&(i=t.I,r=u._.invocationCallbacks[i],r&&(u._.invocationCallbacks[i]=null,delete u._.invocationCallbacks[i],r.method.call(r.scope,{E:n})))});u.reconnecting(function(){u.transport&&u.transport.name==="webSockets"&&f(u,"Connection started reconnecting before invocation result was received.")});u.disconnected(function(){f(u,"Connection was disconnected before invocation result was received.")})};t.fn._maximizeClientHubInvocation=function(n){return{Hub:n.H,Method:n.M,Args:n.A,State:n.S}};t.fn._registerSubscribedHubs=function(){var t=this;t._subscribedToHubs||(t._subscribedToHubs=!0,t.starting(function(){var i=[];n.each(t.proxies,function(n){this.hasSubscriptions()&&(i.push({name:n}),t.log("Client subscribed to hub '"+n+"'."))});i.length===0&&t.log("No hubs have been subscribed to.  The client will not receive data from hubs.  To fix, declare at least one client side function prior to connection start for each hub you wish to subscribe to.");t.data=t.json.stringify(i)}))};t.fn.createHubProxy=function(n){n=n.toLowerCase();var t=this.proxies[n];return t||(t=i(this,n),this.proxies[n]=t),this._registerSubscribedHubs(),t};t.fn.init.prototype=t.fn;n.hubConnection=t}(window.jQuery,window),function(n){n.signalR.version="2.2.2"}(window.jQuery);
  /*

  Uniform v2.1.2
  Copyright � 2009 Josh Pyles / Pixelmatrix Design LLC
  http://pixelmatrixdesign.com

  Requires jQuery 1.3 or newer

  Much thanks to Thomas Reynolds and Buck Wilson for their help and advice on
  this.

  Disabling text selection is made possible by Mathias Bynens
  <http://mathiasbynens.be/> and his noSelect plugin.
  <https://github.com/mathiasbynens/jquery-noselect>, which is embedded.

  Also, thanks to David Kaneda and Eugene Bond for their contributions to the
  plugin.

  Tyler Akins has also rewritten chunks of the plugin, helped close many issues,
  and ensured version 2 got out the door.

  License:
  MIT License - http://www.opensource.org/licenses/mit-license.php

  Enjoy!

  */
  /*global jQuery, document, navigator*/

  (function (wind, $, undef) {
      "use strict";

      /**
       * Use .prop() if jQuery supports it, otherwise fall back to .attr()
       *
       * @param jQuery $el jQuery'd element on which we're calling attr/prop
       * @param ... All other parameters are passed to jQuery's function
       * @return The result from jQuery
       */
      function attrOrProp($el) {
          var args = Array.prototype.slice.call(arguments, 1);

          if ($el.prop) {
              // jQuery 1.6+
              return $el.prop.apply($el, args);
          }

          // jQuery 1.5 and below
          return $el.attr.apply($el, args);
      }

      /**
       * For backwards compatibility with older jQuery libraries, only bind
       * one thing at a time.  Also, this function adds our namespace to
       * events in one consistent location, shrinking the minified code.
       *
       * The properties on the events object are the names of the events
       * that we are supposed to add to.  It can be a space separated list.
       * The namespace will be added automatically.
       *
       * @param jQuery $el
       * @param Object options Uniform options for this element
       * @param Object events Events to bind, properties are event names
       */
      function bindMany($el, options, events) {
          var name, namespaced;

          for (name in events) {
              if (events.hasOwnProperty(name)) {
                  namespaced = name.replace(/ |$/g, options.eventNamespace);
                  $el.bind(namespaced, events[name]);
              }
          }
      }

      /**
       * Bind the hover, active, focus, and blur UI updates
       *
       * @param jQuery $el Original element
       * @param jQuery $target Target for the events (our div/span)
       * @param Object options Uniform options for the element $target
       */
      function bindUi($el, $target, options) {
          bindMany($el, options, {
              focus: function () {
                  $target.addClass(options.focusClass);
              },
              blur: function () {
                  $target.removeClass(options.focusClass);
                  $target.removeClass(options.activeClass);
              },
              mouseenter: function () {
                  $target.addClass(options.hoverClass);
              },
              mouseleave: function () {
                  $target.removeClass(options.hoverClass);
                  $target.removeClass(options.activeClass);
              },
              "mousedown touchbegin": function () {
                  if (!$el.is(":disabled")) {
                      $target.addClass(options.activeClass);
                  }
              },
              "mouseup touchend": function () {
                  $target.removeClass(options.activeClass);
              }
          });
      }

      /**
       * Remove the hover, focus, active classes.
       *
       * @param jQuery $el Element with classes
       * @param Object options Uniform options for the element
       */
      function classClearStandard($el, options) {
          $el.removeClass(options.hoverClass + " " + options.focusClass + " " + options.activeClass);
      }

      /**
       * Add or remove a class, depending on if it's "enabled"
       *
       * @param jQuery $el Element that has the class added/removed
       * @param String className Class or classes to add/remove
       * @param Boolean enabled True to add the class, false to remove
       */
      function classUpdate($el, className, enabled) {
          if (enabled) {
              $el.addClass(className);
          } else {
              $el.removeClass(className);
          }
      }

      /**
       * Updating the "checked" property can be a little tricky.  This
       * changed in jQuery 1.6 and now we can pass booleans to .prop().
       * Prior to that, one either adds an attribute ("checked=checked") or
       * removes the attribute.
       *
       * @param jQuery $tag Our Uniform span/div
       * @param jQuery $el Original form element
       * @param Object options Uniform options for this element
       */
      function classUpdateChecked($tag, $el, options) {
          var c = "checked",
              isChecked = $el.is(":" + c);

          if ($el.prop) {
              // jQuery 1.6+
              $el.prop(c, isChecked);
          } else {
              // jQuery 1.5 and below
              if (isChecked) {
                  $el.attr(c, c);
              } else {
                  $el.removeAttr(c);
              }
          }

          classUpdate($tag, options.checkedClass, isChecked);
      }

      /**
       * Set or remove the "disabled" class for disabled elements, based on
       * if the element is detected to be disabled.
       *
       * @param jQuery $tag Our Uniform span/div
       * @param jQuery $el Original form element
       * @param Object options Uniform options for this element
       */
      function classUpdateDisabled($tag, $el, options) {
          classUpdate($tag, options.disabledClass, $el.is(":disabled"));
      }

      /**
       * Wrap an element inside of a container or put the container next
       * to the element.  See the code for examples of the different methods.
       *
       * Returns the container that was added to the HTML.
       *
       * @param jQuery $el Element to wrap
       * @param jQuery $container Add this new container around/near $el
       * @param String method One of "after", "before" or "wrap"
       * @return $container after it has been cloned for adding to $el
       */
      function divSpanWrap($el, $container, method) {
          switch (method) {
              case "after":
                  // Result:  <element /> <container />
                  $el.after($container);
                  return $el.next();
              case "before":
                  // Result:  <container /> <element />
                  $el.before($container);
                  return $el.prev();
              case "wrap":
                  // Result:  <container> <element /> </container>
                  $el.wrap($container);
                  return $el.parent();
          }

          return null;
      }


      /**
       * Create a div/span combo for uniforming an element
       *
       * @param jQuery $el Element to wrap
       * @param Object options Options for the element, set by the user
       * @param Object divSpanConfig Options for how we wrap the div/span
       * @return Object Contains the div and span as properties
       */
      function divSpan($el, options, divSpanConfig) {
          var $div, $span, id;

          if (!divSpanConfig) {
              divSpanConfig = {};
          }

          divSpanConfig = $.extend({
              bind: {},
              divClass: null,
              divWrap: "wrap",
              spanClass: null,
              spanHtml: null,
              spanWrap: "wrap"
          }, divSpanConfig);

          $div = $('<div />');
          $span = $('<span />');

          // Automatically hide this div/span if the element is hidden.
          // Do not hide if the element is hidden because a parent is hidden.
          if (options.autoHide && $el.is(':hidden') && $el.css('display') === 'none') {
              $div.hide();
          }

          if (divSpanConfig.divClass) {
              $div.addClass(divSpanConfig.divClass);
          }

          if (options.wrapperClass) {
              $div.addClass(options.wrapperClass);
          }

          if (divSpanConfig.spanClass) {
              $span.addClass(divSpanConfig.spanClass);
          }

          id = attrOrProp($el, 'id');

          if (options.useID && id) {
              attrOrProp($div, 'id', options.idPrefix + '-' + id);
          }

          if (divSpanConfig.spanHtml) {
              $span.html(divSpanConfig.spanHtml);
          }

          $div = divSpanWrap($el, $div, divSpanConfig.divWrap);
          $span = divSpanWrap($el, $span, divSpanConfig.spanWrap);
          classUpdateDisabled($div, $el, options);
          return {
              div: $div,
              span: $span
          };
      }


      /**
       * Wrap an element with a span to apply a global wrapper class
       *
       * @param jQuery $el Element to wrap
       * @param object options
       * @return jQuery Wrapper element
       */
      function wrapWithWrapperClass($el, options) {
          var $span;

          if (!options.wrapperClass) {
              return null;
          }

          $span = $('<span />').addClass(options.wrapperClass);
          $span = divSpanWrap($el, $span, "wrap");
          return $span;
      }


      /**
       * Test if high contrast mode is enabled.
       *
       * In high contrast mode, background images can not be set and
       * they are always returned as 'none'.
       *
       * @return boolean True if in high contrast mode
       */
      function highContrast() {
          var c, $div, el, rgb;

          // High contrast mode deals with white and black
          rgb = 'rgb(120,2,153)';
          $div = $('<div style="width:0;height:0;color:' + rgb + '">');
          $('body').append($div);
          el = $div.get(0);

          // $div.css() will get the style definition, not
          // the actually displaying style
          if (wind.getComputedStyle) {
              c = wind.getComputedStyle(el, '').color;
          } else {
              c = (el.currentStyle || el.style || {}).color;
          }

          $div.remove();
          return c.replace(/ /g, '') !== rgb;
      }


      /**
       * Change text into safe HTML
       *
       * @param String text
       * @return String HTML version
       */
      function htmlify(text) {
          if (!text) {
              return "";
          }

          return $('<span />').text(text).html();
      }

      /**
       * If not MSIE, return false.
       * If it is, return the version number.
       *
       * @return false|number
       */
      function isMsie() {
          return navigator.cpuClass && !navigator.product;
      }

      /**
       * Return true if this version of IE allows styling
       *
       * @return boolean
       */
      function isMsieSevenOrNewer() {
          if (wind.XMLHttpRequest !== undefined) {
              return true;
          }

          return false;
      }

      /**
       * Test if the element is a multiselect
       *
       * @param jQuery $el Element
       * @return boolean true/false
       */
      function isMultiselect($el) {
          var elSize;

          if ($el[0].multiple) {
              return true;
          }

          elSize = attrOrProp($el, "size");

          if (!elSize || elSize <= 1) {
              return false;
          }

          return true;
      }

      /**
       * Meaningless utility function.  Used mostly for improving minification.
       *
       * @return false
       */
      function returnFalse() {
          return false;
      }

      /**
       * noSelect plugin, very slightly modified
       * http://mths.be/noselect v1.0.3
       *
       * @param jQuery $elem Element that we don't want to select
       * @param Object options Uniform options for the element
       */
      function noSelect($elem, options) {
          var none = 'none';
          bindMany($elem, options, {
              'selectstart dragstart mousedown': returnFalse
          });

          $elem.css({
              MozUserSelect: none,
              msUserSelect: none,
              webkitUserSelect: none,
              userSelect: none
          });
      }

      /**
       * Updates the filename tag based on the value of the real input
       * element.
       *
       * @param jQuery $el Actual form element
       * @param jQuery $filenameTag Span/div to update
       * @param Object options Uniform options for this element
       */
      function setFilename($el, $filenameTag, options) {
          var filename = $el.val();

          if (filename === "") {
              filename = options.fileDefaultHtml;
          } else {
              filename = filename.split(/[\/\\]+/);
              filename = filename[(filename.length - 1)];
          }

          $filenameTag.text(filename);
      }


      /**
       * Function from jQuery to swap some CSS values, run a callback,
       * then restore the CSS.  Modified to pass JSLint and handle undefined
       * values with 'use strict'.
       *
       * @param jQuery $el Element
       * @param object newCss CSS values to swap out
       * @param Function callback Function to run
       */
      function swap($elements, newCss, callback) {
          var restore, item;

          restore = [];

          $elements.each(function () {
              var name;

              for (name in newCss) {
                  if (Object.prototype.hasOwnProperty.call(newCss, name)) {
                      restore.push({
                          el: this,
                          name: name,
                          old: this.style[name]
                      });

                      this.style[name] = newCss[name];
                  }
              }
          });

          callback();

          while (restore.length) {
              item = restore.pop();
              item.el.style[item.name] = item.old;
          }
      }


      /**
       * The browser doesn't provide sizes of elements that are not visible.
       * This will clone an element and add it to the DOM for calculations.
       *
       * @param jQuery $el
       * @param String method
       */
      function sizingInvisible($el, callback) {
          var targets;

          // We wish to target ourselves and any parents as long as
          // they are not visible
          targets = $el.parents();
          targets.push($el[0]);
          targets = targets.not(':visible');
          swap(targets, {
              visibility: "hidden",
              display: "block",
              position: "absolute"
          }, callback);
      }


      /**
       * Standard way to unwrap the div/span combination from an element
       *
       * @param jQuery $el Element that we wish to preserve
       * @param Object options Uniform options for the element
       * @return Function This generated function will perform the given work
       */
      function unwrapUnwrapUnbindFunction($el, options) {
          return function () {
              $el.unwrap().unwrap().unbind(options.eventNamespace);
          };
      }

      var allowStyling = true,  // False if IE6 or other unsupported browsers
          highContrastTest = false,  // Was the high contrast test ran?
          uniformHandlers = [  // Objects that take care of "unification"
              {
                  // Buttons
                  match: function ($el) {
                      return $el.is("a, button, :submit, :reset, input[type='button']");
                  },
                  apply: function ($el, options) {
                      var $div, defaultSpanHtml, ds, getHtml, doingClickEvent;
                      defaultSpanHtml = options.submitDefaultHtml;

                      if ($el.is(":reset")) {
                          defaultSpanHtml = options.resetDefaultHtml;
                      }

                      if ($el.is("a, button")) {
                          // Use the HTML inside the tag
                          getHtml = function () {
                              return $el.html() || defaultSpanHtml;
                          };
                      } else {
                          // Use the value property of the element
                          getHtml = function () {
                              return htmlify(attrOrProp($el, "value")) || defaultSpanHtml;
                          };
                      }

                      ds = divSpan($el, options, {
                          divClass: options.buttonClass,
                          spanHtml: getHtml()
                      });
                      $div = ds.div;
                      bindUi($el, $div, options);
                      doingClickEvent = false;
                      bindMany($div, options, {
                          "click touchend": function () {
                              var ev, res, target, href;

                              if (doingClickEvent) {
                                  return;
                              }

                              if ($el.is(':disabled')) {
                                  return;
                              }

                              doingClickEvent = true;

                              if ($el[0].dispatchEvent) {
                                  ev = document.createEvent("MouseEvents");
                                  ev.initEvent("click", true, true);
                                  res = $el[0].dispatchEvent(ev);

                                  if ($el.is('a') && res) {
                                      target = attrOrProp($el, 'target');
                                      href = attrOrProp($el, 'href');

                                      if (!target || target === '_self') {
                                          document.location.href = href;
                                      } else {
                                          wind.open(href, target);
                                      }
                                  }
                              } else {
                                  $el.click();
                              }

                              doingClickEvent = false;
                          }
                      });
                      noSelect($div, options);
                      return {
                          remove: function () {
                              // Move $el out
                              $div.after($el);

                              // Remove div and span
                              $div.remove();

                              // Unbind events
                              $el.unbind(options.eventNamespace);
                              return $el;
                          },
                          update: function () {
                              classClearStandard($div, options);
                              classUpdateDisabled($div, $el, options);
                              $el.detach();
                              ds.span.html(getHtml()).append($el);
                          }
                      };
                  }
              },
              {
                  // Checkboxes
                  match: function ($el) {
                      return $el.is(":checkbox");
                  },
                  apply: function ($el, options) {
                      var ds, $div, $span;
                      ds = divSpan($el, options, {
                          divClass: options.checkboxClass
                      });
                      $div = ds.div;
                      $span = ds.span;

                      // Add focus classes, toggling, active, etc.
                      bindUi($el, $div, options);
                      bindMany($el, options, {
                          "click touchend": function () {
                              classUpdateChecked($span, $el, options);
                          }
                      });
                      classUpdateChecked($span, $el, options);
                      return {
                          remove: unwrapUnwrapUnbindFunction($el, options),
                          update: function () {
                              classClearStandard($div, options);
                              $span.removeClass(options.checkedClass);
                              classUpdateChecked($span, $el, options);
                              classUpdateDisabled($div, $el, options);
                          }
                      };
                  }
              },
              {
                  // File selection / uploads
                  match: function ($el) {
                      return $el.is(":file");
                  },
                  apply: function ($el, options) {
                      var ds, $div, $filename, $button;

                      // The "span" is the button
                      ds = divSpan($el, options, {
                          divClass: options.fileClass,
                          spanClass: options.fileButtonClass,
                          spanHtml: options.fileButtonHtml,
                          spanWrap: "after"
                      });
                      $div = ds.div;
                      $button = ds.span;
                      $filename = $("<span />").html(options.fileDefaultHtml);
                      $filename.addClass(options.filenameClass);
                      $filename = divSpanWrap($el, $filename, "after");

                      // Set the size
                      if (!attrOrProp($el, "size")) {
                          attrOrProp($el, "size", $div.width() / 10);
                      }

                      // Actions
                      function filenameUpdate() {
                          setFilename($el, $filename, options);
                      }

                      bindUi($el, $div, options);

                      // Account for input saved across refreshes
                      filenameUpdate();

                      // IE7 doesn't fire onChange until blur or second fire.
                      if (isMsie()) {
                          // IE considers browser chrome blocking I/O, so it
                          // suspends tiemouts until after the file has
                          // been selected.
                          bindMany($el, options, {
                              click: function () {
                                  $el.trigger("change");
                                  setTimeout(filenameUpdate, 0);
                              }
                          });
                      } else {
                          // All other browsers behave properly
                          bindMany($el, options, {
                              change: filenameUpdate
                          });
                      }

                      noSelect($filename, options);
                      noSelect($button, options);
                      return {
                          remove: function () {
                              // Remove filename and button
                              $filename.remove();
                              $button.remove();

                              // Unwrap parent div, remove events
                              return $el.unwrap().unbind(options.eventNamespace);
                          },
                          update: function () {
                              classClearStandard($div, options);
                              setFilename($el, $filename, options);
                              classUpdateDisabled($div, $el, options);
                          }
                      };
                  }
              },
              {
                  // Input fields (text)
                  match: function ($el) {
                      if ($el.is("input")) {
                          var t = (" " + attrOrProp($el, "type") + " ").toLowerCase(),
                              allowed = " color date datetime datetime-local email month number password search tel text time url week ";
                          return allowed.indexOf(t) >= 0;
                      }

                      return false;
                  },
                  apply: function ($el, options) {
                      var elType, $wrapper;

                      elType = attrOrProp($el, "type");
                      $el.addClass(options.inputClass);
                      $wrapper = wrapWithWrapperClass($el, options);
                      bindUi($el, $el, options);

                      if (options.inputAddTypeAsClass) {
                          $el.addClass(elType);
                      }

                      return {
                          remove: function () {
                              $el.removeClass(options.inputClass);

                              if (options.inputAddTypeAsClass) {
                                  $el.removeClass(elType);
                              }

                              if ($wrapper) {
                                  $el.unwrap();
                              }
                          },
                          update: returnFalse
                      };
                  }
              },
              {
                  // Radio buttons
                  match: function ($el) {
                      return $el.is(":radio");
                  },
                  apply: function ($el, options) {
                      var ds, $div, $span;
                      ds = divSpan($el, options, {
                          divClass: options.radioClass
                      });
                      $div = ds.div;
                      $span = ds.span;

                      // Add classes for focus, handle active, checked
                      bindUi($el, $div, options);
                      bindMany($el, options, {
                          "click touchend": function () {
                              // Find all radios with the same name, then update
                              // them with $.uniform.update() so the right
                              // per-element options are used
                              $.uniform.update($(':radio[name="' + attrOrProp($el, "name") + '"]'));
                          }
                      });
                      classUpdateChecked($span, $el, options);
                      return {
                          remove: unwrapUnwrapUnbindFunction($el, options),
                          update: function () {
                              classClearStandard($div, options);
                              classUpdateChecked($span, $el, options);
                              classUpdateDisabled($div, $el, options);
                          }
                      };
                  }
              },
              {
                  // Select lists, but do not style multiselects here
                  match: function ($el) {
                      if ($el.is("select") && !isMultiselect($el)) {
                          return true;
                      }

                      return false;
                  },
                  apply: function ($el, options) {
                      var ds, $div, $span, origElemWidth;

                      if (options.selectAutoWidth) {
                          sizingInvisible($el, function () {
                              origElemWidth = $el.width();
                          });
                      }

                      ds = divSpan($el, options, {
                          divClass: options.selectClass,
                          spanHtml: ($el.find(":selected:first") || $el.find("option:first")).html(),
                          spanWrap: "before"
                      });
                      $div = ds.div;
                      $span = ds.span;

                      if (options.selectAutoWidth) {
                          // Use the width of the select and adjust the
                          // span and div accordingly
                          sizingInvisible($el, function () {
                              // Force "display: block" - related to bug #287
                              swap($([$span[0], $div[0]]), {
                                  display: "block"
                              }, function () {
                                  var spanPad;
                                  spanPad = $span.outerWidth() - $span.width();
                                  $div.width(origElemWidth + spanPad);
                                  $span.width(origElemWidth);
                              });
                          });
                      } else {
                          // Force the select to fill the size of the div
                          $div.addClass('fixedWidth');
                      }

                      // Take care of events
                      bindUi($el, $div, options);
                      bindMany($el, options, {
                          change: function () {
                              $span.html($el.find(":selected").html());
                              $div.removeClass(options.activeClass);
                          },
                          "click touchend": function () {
                              // IE7 and IE8 may not update the value right
                              // until after click event - issue #238
                              var selHtml = $el.find(":selected").html();

                              if ($span.html() !== selHtml) {
                                  // Change was detected
                                  // Fire the change event on the select tag
                                  $el.trigger('change');
                              }
                          },
                          keyup: function () {
                              $span.html($el.find(":selected").html());
                          }
                      });
                      noSelect($span, options);
                      return {
                          remove: function () {
                              // Remove sibling span
                              $span.remove();

                              // Unwrap parent div
                              $el.unwrap().unbind(options.eventNamespace);
                              return $el;
                          },
                          update: function () {
                              if (options.selectAutoWidth) {
                                  // Easier to remove and reapply formatting
                                  $.uniform.restore($el);
                                  $el.uniform(options);
                              } else {
                                  classClearStandard($div, options);

                                  // Reset current selected text
                                  $span.html($el.find(":selected").html());
                                  classUpdateDisabled($div, $el, options);
                              }
                          }
                      };
                  }
              },
              {
                  // Select lists - multiselect lists only
                  match: function ($el) {
                      if ($el.is("select") && isMultiselect($el)) {
                          return true;
                      }

                      return false;
                  },
                  apply: function ($el, options) {
                      var $wrapper;

                      $el.addClass(options.selectMultiClass);
                      $wrapper = wrapWithWrapperClass($el, options);
                      bindUi($el, $el, options);

                      return {
                          remove: function () {
                              $el.removeClass(options.selectMultiClass);

                              if ($wrapper) {
                                  $el.unwrap();
                              }
                          },
                          update: returnFalse
                      };
                  }
              },
              {
                  // Textareas
                  match: function ($el) {
                      return $el.is("textarea");
                  },
                  apply: function ($el, options) {
                      var $wrapper;

                      $el.addClass(options.textareaClass);
                      $wrapper = wrapWithWrapperClass($el, options);
                      bindUi($el, $el, options);

                      return {
                          remove: function () {
                              $el.removeClass(options.textareaClass);

                              if ($wrapper) {
                                  $el.unwrap();
                              }
                          },
                          update: returnFalse
                      };
                  }
              }
          ];

      // IE6 can't be styled - can't set opacity on select
      if (isMsie() && !isMsieSevenOrNewer()) {
          allowStyling = false;
      }

      $.uniform = {
          // Default options that can be overridden globally or when uniformed
          // globally:  $.uniform.defaults.fileButtonHtml = "Pick A File";
          // on uniform:  $('input').uniform({fileButtonHtml: "Pick a File"});
          defaults: {
              activeClass: "active",
              autoHide: true,
              buttonClass: "button",
              checkboxClass: "checker",
              checkedClass: "checked",
              disabledClass: "disabled",
              eventNamespace: ".uniform",
              fileButtonClass: "action",
              fileButtonHtml: "Choose File",
              fileClass: "uploader",
              fileDefaultHtml: "No file selected",
              filenameClass: "filename",
              focusClass: "focus",
              hoverClass: "hover",
              idPrefix: "uniform",
              inputAddTypeAsClass: true,
              inputClass: "uniform-input",
              radioClass: "radio",
              resetDefaultHtml: "Reset",
              resetSelector: false,  // We'll use our own function when you don't specify one
              selectAutoWidth: true,
              selectClass: "selector",
              selectMultiClass: "uniform-multiselect",
              submitDefaultHtml: "Submit",  // Only text allowed
              textareaClass: "uniform",
              useID: true,
              wrapperClass: null
          },

          // All uniformed elements - DOM objects
          elements: []
      };

      $.fn.uniform = function (options) {
          var el = this;
          options = $.extend({}, $.uniform.defaults, options);

          // If we are in high contrast mode, do not allow styling
          if (!highContrastTest) {
              highContrastTest = true;

              if (highContrast()) {
                  allowStyling = false;
              }
          }

          // Only uniform on browsers that work
          if (!allowStyling) {
              return this;
          }

          // Code for specifying a reset button
          if (options.resetSelector) {
              $(options.resetSelector).mouseup(function () {
                  wind.setTimeout(function () {
                      $.uniform.update(el);
                  }, 10);
              });
          }

          return this.each(function () {
              var $el = $(this), i, handler, callbacks;

              // Avoid uniforming elements already uniformed - just update
              if ($el.data("uniformed")) {
                  $.uniform.update($el);
                  return;
              }

              // See if we have any handler for this type of element
              for (i = 0; i < uniformHandlers.length; i = i + 1) {
                  handler = uniformHandlers[i];

                  if (handler.match($el, options)) {
                      callbacks = handler.apply($el, options);
                      $el.data("uniformed", callbacks);

                      // Store element in our global array
                      $.uniform.elements.push($el.get(0));
                      return;
                  }
              }

              // Could not style this element
          });
      };

      $.uniform.restore = $.fn.uniform.restore = function (elem) {
          if (elem === undef) {
              elem = $.uniform.elements;
          }

          $(elem).each(function () {
              var $el = $(this), index, elementData;
              elementData = $el.data("uniformed");

              // Skip elements that are not uniformed
              if (!elementData) {
                  return;
              }

              // Unbind events, remove additional markup that was added
              elementData.remove();

              // Remove item from list of uniformed elements
              index = $.inArray(this, $.uniform.elements);

              if (index >= 0) {
                  $.uniform.elements.splice(index, 1);
              }

              $el.removeData("uniformed");
          });
      };

      $.uniform.update = $.fn.uniform.update = function (elem) {
          if (elem === undef) {
              elem = $.uniform.elements;
          }

          $(elem).each(function () {
              var $el = $(this), elementData;
              elementData = $el.data("uniformed");

              // Skip elements that are not uniformed
              if (!elementData) {
                  return;
              }

              elementData.update($el, elementData.options);
          });
      };
  }(this, jQuery));

  /**
   * bootbox.js v3.3.0
   *
   * http://bootboxjs.com/license.txt
   */
  var bootbox = window.bootbox || (function (document, $) {
      /*jshint scripturl:true sub:true */

      var _locale = 'en',
          _defaultLocale = 'en',
          _animate = true,
          _backdrop = 'static',
          _defaultHref = 'javascript:;',
          _classes = '',
          _btnClasses = {},
          _icons = {},
          /* last var should always be the public object we'll return */
          that = {};


      /**
       * public API
       */
      that.setLocale = function (locale) {
          for (var i in _locales) {
              if (i == locale) {
                  _locale = locale;
                  return;
              }
          }
          throw new Error('Invalid locale: ' + locale);
      };

      that.addLocale = function (locale, translations) {
          if (typeof _locales[locale] === 'undefined') {
              _locales[locale] = {};
          }
          for (var str in translations) {
              _locales[locale][str] = translations[str];
          }
      };

      that.setIcons = function (icons) {
          _icons = icons;
          if (typeof _icons !== 'object' || _icons === null) {
              _icons = {};
          }
      };

      that.setBtnClasses = function (btnClasses) {
          _btnClasses = btnClasses;
          if (typeof _btnClasses !== 'object' || _btnClasses === null) {
              _btnClasses = {};
          }
      };

      that.alert = function (/*str, label, cb*/) {
          var str = "",
              label = _translate('OK'),
              cb = null;

          switch (arguments.length) {
              case 1:
                  // no callback, default button label
                  str = arguments[0];
                  break;
              case 2:
                  // callback *or* custom button label dependent on type
                  str = arguments[0];
                  if (typeof arguments[1] == 'function') {
                      cb = arguments[1];
                  } else {
                      label = arguments[1];
                  }
                  break;
              case 3:
                  // callback and custom button label
                  str = arguments[0];
                  label = arguments[1];
                  cb = arguments[2];
                  break;
              default:
                  throw new Error("Incorrect number of arguments: expected 1-3");
          }

          return that.dialog(str, {
              // only button (ok)
              "label": label,
              "icon": _icons.OK,
              "class": _btnClasses.OK,
              "callback": cb
          }, {
              // ensure that the escape key works; either invoking the user's
              // callback or true to just close the dialog
              "onEscape": cb || true
          });
      };

      that.confirm = function (/*str, labelCancel, labelOk, cb*/) {
          var str = "",
              labelCancel = _translate('CANCEL'),
              labelOk = _translate('CONFIRM'),
              cb = null;

          switch (arguments.length) {
              case 1:
                  str = arguments[0];
                  break;
              case 2:
                  str = arguments[0];
                  if (typeof arguments[1] == 'function') {
                      cb = arguments[1];
                  } else {
                      labelCancel = arguments[1];
                  }
                  break;
              case 3:
                  str = arguments[0];
                  labelCancel = arguments[1];
                  if (typeof arguments[2] == 'function') {
                      cb = arguments[2];
                  } else {
                      labelOk = arguments[2];
                  }
                  break;
              case 4:
                  str = arguments[0];
                  labelCancel = arguments[1];
                  labelOk = arguments[2];
                  cb = arguments[3];
                  break;
              default:
                  throw new Error("Incorrect number of arguments: expected 1-4");
          }

          var cancelCallback = function () {
              if (typeof cb === 'function') {
                  return cb(false);
              }
          };

          var confirmCallback = function () {
              if (typeof cb === 'function') {
                  return cb(true);
              }
          };

          return that.dialog(str, [{
              // first button (cancel)
              "label": labelCancel,
              "icon": _icons.CANCEL,
              "class": _btnClasses.CANCEL,
              "callback": cancelCallback
          }, {
              // second button (confirm)
              "label": labelOk,
              "icon": _icons.CONFIRM,
              "class": _btnClasses.CONFIRM,
              "callback": confirmCallback
          }], {
              // escape key bindings
              "onEscape": cancelCallback
          });
      };

      that.prompt = function (/*str, labelCancel, labelOk, cb, defaultVal*/) {
          var str = "",
              labelCancel = _translate('CANCEL'),
              labelOk = _translate('CONFIRM'),
              cb = null,
              defaultVal = "";

          switch (arguments.length) {
              case 1:
                  str = arguments[0];
                  break;
              case 2:
                  str = arguments[0];
                  if (typeof arguments[1] == 'function') {
                      cb = arguments[1];
                  } else {
                      labelCancel = arguments[1];
                  }
                  break;
              case 3:
                  str = arguments[0];
                  labelCancel = arguments[1];
                  if (typeof arguments[2] == 'function') {
                      cb = arguments[2];
                  } else {
                      labelOk = arguments[2];
                  }
                  break;
              case 4:
                  str = arguments[0];
                  labelCancel = arguments[1];
                  labelOk = arguments[2];
                  cb = arguments[3];
                  break;
              case 5:
                  str = arguments[0];
                  labelCancel = arguments[1];
                  labelOk = arguments[2];
                  cb = arguments[3];
                  defaultVal = arguments[4];
                  break;
              default:
                  throw new Error("Incorrect number of arguments: expected 1-5");
          }

          var header = str;

          // let's keep a reference to the form object for later
          var form = $("<form></form>");
          form.append("<input class='input-block-level' autocomplete=off type=text value='" + defaultVal + "' />");

          var cancelCallback = function () {
              if (typeof cb === 'function') {
                  // yep, native prompts dismiss with null, whereas native
                  // confirms dismiss with false...
                  return cb(null);
              }
          };

          var confirmCallback = function () {
              if (typeof cb === 'function') {
                  return cb(form.find("input[type=text]").val());
              }
          };

          var div = that.dialog(form, [{
              // first button (cancel)
              "label": labelCancel,
              "icon": _icons.CANCEL,
              "class": _btnClasses.CANCEL,
              "callback": cancelCallback
          }, {
              // second button (confirm)
              "label": labelOk,
              "icon": _icons.CONFIRM,
              "class": _btnClasses.CONFIRM,
              "callback": confirmCallback
          }], {
              // prompts need a few extra options
              "header": header,
              // explicitly tell dialog NOT to show the dialog...
              "show": false,
              "onEscape": cancelCallback
          });

          // ... the reason the prompt needs to be hidden is because we need
          // to bind our own "shown" handler, after creating the modal but
          // before any show(n) events are triggered
          // @see https://github.com/makeusabrew/bootbox/issues/69

          div.on("shown", function () {
              form.find("input[type=text]").focus();

              // ensure that submitting the form (e.g. with the enter key)
              // replicates the behaviour of a normal prompt()
              form.on("submit", function (e) {
                  e.preventDefault();
                  div.find(".btn-primary").click();
              });
          });

          div.modal("show");

          return div;
      };

      that.dialog = function (str, handlers, options) {
          var buttons = "",
              callbacks = [];

          if (!options) {
              options = {};
          }

          // check for single object and convert to array if necessary
          if (typeof handlers === 'undefined') {
              handlers = [];
          } else if (typeof handlers.length == 'undefined') {
              handlers = [handlers];
          }

          var i = handlers.length;
          while (i--) {
              var label = null,
                  href = null,
                  _class = null,
                  icon = '',
                  callback = null;

              if (typeof handlers[i]['label'] == 'undefined' &&
                  typeof handlers[i]['class'] == 'undefined' &&
                  typeof handlers[i]['callback'] == 'undefined') {
                  // if we've got nothing we expect, check for condensed format

                  var propCount = 0,      // condensed will only match if this == 1
                      property = null;   // save the last property we found

                  // be nicer to count the properties without this, but don't think it's possible...
                  for (var j in handlers[i]) {
                      property = j;
                      if (++propCount > 1) {
                          // forget it, too many properties
                          break;
                      }
                  }

                  if (propCount == 1 && typeof handlers[i][j] == 'function') {
                      // matches condensed format of label -> function
                      handlers[i]['label'] = property;
                      handlers[i]['callback'] = handlers[i][j];
                  }
              }

              if (typeof handlers[i]['callback'] == 'function') {
                  callback = handlers[i]['callback'];
              }

              if (handlers[i]['class']) {
                  _class = handlers[i]['class'];
              } else if (i == handlers.length - 1 && handlers.length <= 2) {
                  // always add a primary to the main option in a two-button dialog
                  _class = 'btn-primary';
              }

              if (handlers[i]['link'] !== true) {
                  _class = 'btn ' + _class;
              }

              if (handlers[i]['label']) {
                  label = handlers[i]['label'];
              } else {
                  label = "Option " + (i + 1);
              }

              if (handlers[i]['icon']) {
                  icon = "<i class='" + handlers[i]['icon'] + "'></i> ";
              }

              if (handlers[i]['href']) {
                  href = handlers[i]['href'];
              }
              else {
                  href = _defaultHref;
              }

              buttons = "<a data-handler='" + i + "' class='" + _class + "' href='" + href + "'>" + icon + "" + label + "</a>" + buttons;

              callbacks[i] = callback;
          }

          // @see https://github.com/makeusabrew/bootbox/issues/46#issuecomment-8235302
          // and https://github.com/twitter/bootstrap/issues/4474
          // for an explanation of the inline overflow: hidden
          // @see https://github.com/twitter/bootstrap/issues/4854
          // for an explanation of tabIndex=-1

          var parts = ["<div class='bootbox modal' tabindex='-1' style='overflow:hidden;'>"];
          parts.push("<div class='modal-dialog modal-lg'>");
          parts.push("<div class='modal-content animated bounceInRight'>");

          if (options['header']) {
              var closeButton = '';
              if (typeof options['headerCloseButton'] == 'undefined' || options['headerCloseButton']) {
                  closeButton = "<a href='" + _defaultHref + "' class='close'>&times;</a>";
              }

              parts.push("<div class='modal-header'>" + closeButton + "<h3>" + options['header'] + "</h3></div>");
          }

          // push an empty body into which we'll inject the proper content later
          parts.push("<div class='modal-body'></div>");

          if (buttons) {
              parts.push("<div class='modal-footer'>" + buttons + "</div>");
          }

          parts.push("</div>");
          parts.push("</div>");
          parts.push("</div>");
          var div = $(parts.join("\n"));

          // check whether we should fade in/out
          var shouldFade = (typeof options.animate === 'undefined') ? _animate : options.animate;

          if (shouldFade) {
              div.addClass("fade");
          }

          var optionalClasses = (typeof options.classes === 'undefined') ? _classes : options.classes;
          if (optionalClasses) {
              div.addClass(optionalClasses);
          }

          // now we've built up the div properly we can inject the content whether it was a string or a jQuery object
          div.find(".modal-body").html(str);

          function onCancel(source) {
              // for now source is unused, but it will be in future
              var hideModal = null;
              if (typeof options.onEscape === 'function') {
                  // @see https://github.com/makeusabrew/bootbox/issues/91
                  hideModal = options.onEscape();
              }

              if (hideModal !== false) {
                  div.modal('hide');
              }
          }

          // hook into the modal's keyup trigger to check for the escape key
          div.on('keyup.dismiss.modal', function (e) {
              // any truthy value passed to onEscape will dismiss the dialog
              // as long as the onEscape function (if defined) doesn't prevent it
              if (e.which === 27 && options.onEscape) {
                  onCancel('escape');
              }
          });

          // handle close buttons too
          div.on('click', 'a.close', function (e) {
              e.preventDefault();
              onCancel('close');
          });

          // well, *if* we have a primary - give the first dom element focus
          div.on('shown', function () {
              div.find("a.btn-primary:first").focus();
          });

          div.on('hidden', function (e) {
              // @see https://github.com/makeusabrew/bootbox/issues/115
              // allow for the fact hidden events can propagate up from
              // child elements like tooltips
              if (e.target === this) {
                  div.remove();
              }
          });

          // wire up button handlers
          div.on('click', '.modal-footer a', function (e) {

              var handler = $(this).data("handler"),
                  cb = callbacks[handler],
                  hideModal = null;

              // sort of @see https://github.com/makeusabrew/bootbox/pull/68 - heavily adapted
              // if we've got a custom href attribute, all bets are off
              if (typeof handler !== 'undefined' &&
                  typeof handlers[handler]['href'] !== 'undefined') {

                  return;
              }

              e.preventDefault();

              if (typeof cb === 'function') {
                  hideModal = cb(e);
              }

              // the only way hideModal *will* be false is if a callback exists and
              // returns it as a value. in those situations, don't hide the dialog
              // @see https://github.com/makeusabrew/bootbox/pull/25
              if (hideModal !== false) {
                  div.modal("hide");
              }
          });

          // stick the modal right at the bottom of the main body out of the way
          $("body").append(div);

          div.modal({
              // unless explicitly overridden take whatever our default backdrop value is
              backdrop: (typeof options.backdrop === 'undefined') ? _backdrop : options.backdrop,
              // ignore bootstrap's keyboard options; we'll handle this ourselves (more fine-grained control)
              keyboard: false,
              // @ see https://github.com/makeusabrew/bootbox/issues/69
              // we *never* want the modal to be shown before we can bind stuff to it
              // this method can also take a 'show' option, but we'll only use that
              // later if we need to
              show: false
          });

          // @see https://github.com/makeusabrew/bootbox/issues/64
          // @see https://github.com/makeusabrew/bootbox/issues/60
          // ...caused by...
          // @see https://github.com/twitter/bootstrap/issues/4781
          div.on("show", function (e) {
              $(document).off("focusin.modal");
          });

          if (typeof options.show === 'undefined' || options.show === true) {
              div.modal("show");
          }

          return div;
      };

      /**
       * #modal is deprecated in v3; it can still be used but no guarantees are
       * made - have never been truly convinced of its merit but perhaps just
       * needs a tidyup and some TLC
       */
      that.modal = function (/*str, label, options*/) {
          var str;
          var label;
          var options;

          var defaultOptions = {
              "onEscape": null,
              "keyboard": true,
              "backdrop": _backdrop
          };

          switch (arguments.length) {
              case 1:
                  str = arguments[0];
                  break;
              case 2:
                  str = arguments[0];
                  if (typeof arguments[1] == 'object') {
                      options = arguments[1];
                  } else {
                      label = arguments[1];
                  }
                  break;
              case 3:
                  str = arguments[0];
                  label = arguments[1];
                  options = arguments[2];
                  break;
              default:
                  throw new Error("Incorrect number of arguments: expected 1-3");
          }

          defaultOptions['header'] = label;

          if (typeof options == 'object') {
              options = $.extend(defaultOptions, options);
          } else {
              options = defaultOptions;
          }

          return that.dialog(str, [], options);
      };


      that.hideAll = function () {
          $(".bootbox").modal("hide");
      };

      that.animate = function (animate) {
          _animate = animate;
      };

      that.backdrop = function (backdrop) {
          _backdrop = backdrop;
      };

      that.classes = function (classes) {
          _classes = classes;
      };

      /**
       * private API
       */

      /**
       * standard locales. Please add more according to ISO 639-1 standard. Multiple language variants are
       * unlikely to be required. If this gets too large it can be split out into separate JS files.
       */
      var _locales = {
          'br': {
              OK: 'OK',
              CANCEL: 'Cancelar',
              CONFIRM: 'Sim'
          },
          'da': {
              OK: 'OK',
              CANCEL: 'Annuller',
              CONFIRM: 'Accepter'
          },
          'de': {
              OK: 'OK',
              CANCEL: 'Abbrechen',
              CONFIRM: 'Akzeptieren'
          },
          'en': {
              OK: 'OK',
              CANCEL: 'Cancel',
              CONFIRM: 'OK'
          },
          'es': {
              OK: 'OK',
              CANCEL: 'Cancelar',
              CONFIRM: 'Aceptar'
          },
          'fr': {
              OK: 'OK',
              CANCEL: 'Annuler',
              CONFIRM: 'D\'accord'
          },
          'it': {
              OK: 'OK',
              CANCEL: 'Annulla',
              CONFIRM: 'Conferma'
          },
          'nl': {
              OK: 'OK',
              CANCEL: 'Annuleren',
              CONFIRM: 'Accepteren'
          },
          'pl': {
              OK: 'OK',
              CANCEL: 'Anuluj',
              CONFIRM: 'Potwierdź'
          },
          'ru': {
              OK: 'OK',
              CANCEL: 'Отмена',
              CONFIRM: 'Применить'
          },
          'zh_CN': {
              OK: 'OK',
              CANCEL: '取消',
              CONFIRM: '确认'
          },
          'zh_TW': {
              OK: 'OK',
              CANCEL: '取消',
              CONFIRM: '確認'
          }
      };

      function _translate(str, locale) {
          // we assume if no target locale is probided then we should take it from current setting
          if (typeof locale === 'undefined') {
              locale = _locale;
          }
          if (typeof _locales[locale][str] === 'string') {
              return _locales[locale][str];
          }

          // if we couldn't find a lookup then try and fallback to a default translation

          if (locale != _defaultLocale) {
              return _translate(str, _defaultLocale);
          }

          // if we can't do anything then bail out with whatever string was passed in - last resort
          return str;
      }

      return that;

  }(document, window.jQuery));

  // @see https://github.com/makeusabrew/bootbox/issues/71
  window.bootbox = bootbox;

  /*!
   * iCheck v1.0.2, http://git.io/arlzeA
   * ===================================
   * Powerful jQuery and Zepto plugin for checkboxes and radio buttons customization
   *
   * (c) 2013 Damir Sultanov, http://fronteed.com
   * MIT Licensed
   */

  // (function ($) {

  //     // Cached vars
  //     var _iCheck = 'iCheck',
  //       _iCheckHelper = _iCheck + '-helper',
  //       _checkbox = 'checkbox',
  //       _radio = 'radio',
  //       _checked = 'checked',
  //       _unchecked = 'un' + _checked,
  //       _disabled = 'disabled',
  //       _determinate = 'determinate',
  //       _indeterminate = 'in' + _determinate,
  //       _update = 'update',
  //       _type = 'type',
  //       _click = 'click',
  //       _touch = 'touchbegin.i touchend.i',
  //       _add = 'addClass',
  //       _remove = 'removeClass',
  //       _callback = 'trigger',
  //       _label = 'label',
  //       _cursor = 'cursor',
  //       _mobile = /ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);

  //     // Plugin init
  //     $.fn[_iCheck] = function (options, fire) {

  //         // Walker
  //         var handle = 'input[type="' + _checkbox + '"], input[type="' + _radio + '"]',
  //           stack = $(),
  //           walker = function (object) {
  //               object.each(function () {
  //                   var self = $(this);

  //                   if (self.is(handle)) {
  //                       stack = stack.add(self);
  //                   } else {
  //                       stack = stack.add(self.find(handle));
  //                   }
  //               });
  //           };

  //         // Check if we should operate with some method
  //         if (/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(options)) {

  //             // Normalize method's name
  //             options = options.toLowerCase();

  //             // Find checkboxes and radio buttons
  //             walker(this);

  //             return stack.each(function () {
  //                 var self = $(this);

  //                 if (options == 'destroy') {
  //                     tidy(self, 'ifDestroyed');
  //                 } else {
  //                     operate(self, true, options);
  //                 }

  //                 // Fire method's callback
  //                 if ($.isFunction(fire)) {
  //                     fire();
  //                 }
  //             });

  //             // Customization
  //         } else if (typeof options == 'object' || !options) {

  //             // Check if any options were passed
  //             var settings = $.extend({
  //                 checkedClass: _checked,
  //                 disabledClass: _disabled,
  //                 indeterminateClass: _indeterminate,
  //                 labelHover: true
  //             }, options),

  //               selector = settings.handle,
  //               hoverClass = settings.hoverClass || 'hover',
  //               focusClass = settings.focusClass || 'focus',
  //               activeClass = settings.activeClass || 'active',
  //               labelHover = !!settings.labelHover,
  //               labelHoverClass = settings.labelHoverClass || 'hover',

  //               // Setup clickable area
  //               area = ('' + settings.increaseArea).replace('%', '') | 0;

  //             // Selector limit
  //             if (selector == _checkbox || selector == _radio) {
  //                 handle = 'input[type="' + selector + '"]';
  //             }

  //             // Clickable area limit
  //             if (area < -50) {
  //                 area = -50;
  //             }

  //             // Walk around the selector
  //             walker(this);

  //             return stack.each(function () {
  //                 var self = $(this);

  //                 // If already customized
  //                 tidy(self);

  //                 var node = this,
  //                   id = node.id,

  //                   // Layer styles
  //                   offset = -area + '%',
  //                   size = 100 + (area * 2) + '%',
  //                   layer = {
  //                       position: 'absolute',
  //                       top: offset,
  //                       left: offset,
  //                       display: 'block',
  //                       width: size,
  //                       height: size,
  //                       margin: 0,
  //                       padding: 0,
  //                       background: '#fff',
  //                       border: 0,
  //                       opacity: 0
  //                   },

  //                   // Choose how to hide input
  //                   hide = _mobile ? {
  //                       position: 'absolute',
  //                       visibility: 'hidden'
  //                   } : area ? layer : {
  //                       position: 'absolute',
  //                       opacity: 0
  //                   },

  //                   // Get proper class
  //                   className = node[_type] == _checkbox ? settings.checkboxClass || 'i' + _checkbox : settings.radioClass || 'i' + _radio,

  //                   // Find assigned labels
  //                   label = $(_label + '[for="' + id + '"]').add(self.closest(_label)),

  //                   // Check ARIA option
  //                   aria = !!settings.aria,

  //                   // Set ARIA placeholder
  //                   ariaID = _iCheck + '-' + Math.random().toString(36).substr(2, 6),

  //                   // Parent & helper
  //                   parent = '<div class="' + className + '" ' + (aria ? 'role="' + node[_type] + '" ' : ''),
  //                   helper;

  //                 // Set ARIA "labelledby"
  //                 if (aria) {
  //                     label.each(function () {
  //                         parent += 'aria-labelledby="';

  //                         if (this.id) {
  //                             parent += this.id;
  //                         } else {
  //                             this.id = ariaID;
  //                             parent += ariaID;
  //                         }

  //                         parent += '"';
  //                     });
  //                 }

  //                 // Wrap input
  //                 parent = self.wrap(parent + '/>')[_callback]('ifCreated').parent().append(settings.insert);

  //                 // Layer addition
  //                 helper = $('<ins class="' + _iCheckHelper + '"/>').css(layer).appendTo(parent);

  //                 // Finalize customization
  //                 self.data(_iCheck, { o: settings, s: self.attr('style') }).css(hide);
  //                 !!settings.inheritClass && parent[_add](node.className || '');
  //                 !!settings.inheritID && id && parent.attr('id', _iCheck + '-' + id);
  //                 parent.css('position') == 'static' && parent.css('position', 'relative');
  //                 operate(self, true, _update);

  //                 // Label events
  //                 if (label.length) {
  //                     label.on(_click + '.i mouseover.i mouseout.i ' + _touch, function (event) {
  //                         var type = event[_type],
  //                           item = $(this);

  //                         // Do nothing if input is disabled
  //                         if (!node[_disabled]) {

  //                             // Click
  //                             if (type == _click) {
  //                                 if ($(event.target).is('a')) {
  //                                     return;
  //                                 }
  //                                 operate(self, false, true);

  //                                 // Hover state
  //                             } else if (labelHover) {

  //                                 // mouseout|touchend
  //                                 if (/ut|nd/.test(type)) {
  //                                     parent[_remove](hoverClass);
  //                                     item[_remove](labelHoverClass);
  //                                 } else {
  //                                     parent[_add](hoverClass);
  //                                     item[_add](labelHoverClass);
  //                                 }
  //                             }

  //                             if (_mobile) {
  //                                 event.stopPropagation();
  //                             } else {
  //                                 return false;
  //                             }
  //                         }
  //                     });
  //                 }

  //                 // Input events
  //                 self.on(_click + '.i focus.i blur.i keyup.i keydown.i keypress.i', function (event) {
  //                     var type = event[_type],
  //                       key = event.keyCode;

  //                     // Click
  //                     if (type == _click) {
  //                         return false;

  //                         // Keydown
  //                     } else if (type == 'keydown' && key == 32) {
  //                         if (!(node[_type] == _radio && node[_checked])) {
  //                             if (node[_checked]) {
  //                                 off(self, _checked);
  //                             } else {
  //                                 on(self, _checked);
  //                             }
  //                         }

  //                         return false;

  //                         // Keyup
  //                     } else if (type == 'keyup' && node[_type] == _radio) {
  //                         !node[_checked] && on(self, _checked);

  //                         // Focus/blur
  //                     } else if (/us|ur/.test(type)) {
  //                         parent[type == 'blur' ? _remove : _add](focusClass);
  //                     }
  //                 });

  //                 // Helper events
  //                 helper.on(_click + ' mousedown mouseup mouseover mouseout ' + _touch, function (event) {
  //                     var type = event[_type],

  //                       // mousedown|mouseup
  //                       toggle = /wn|up/.test(type) ? activeClass : hoverClass;

  //                     // Do nothing if input is disabled
  //                     if (!node[_disabled]) {

  //                         // Click
  //                         if (type == _click) {
  //                             operate(self, false, true);

  //                             // Active and hover states
  //                         } else {

  //                             // State is on
  //                             if (/wn|er|in/.test(type)) {

  //                                 // mousedown|mouseover|touchbegin
  //                                 parent[_add](toggle);

  //                                 // State is off
  //                             } else {
  //                                 parent[_remove](toggle + ' ' + activeClass);
  //                             }

  //                             // Label hover
  //                             if (label.length && labelHover && toggle == hoverClass) {

  //                                 // mouseout|touchend
  //                                 label[/ut|nd/.test(type) ? _remove : _add](labelHoverClass);
  //                             }
  //                         }

  //                         if (_mobile) {
  //                             event.stopPropagation();
  //                         } else {
  //                             return false;
  //                         }
  //                     }
  //                 });
  //             });
  //         } else {
  //             return this;
  //         }
  //     };

  //     // Do something with inputs
  //     function operate(input, direct, method) {
  //         var node = input[0],
  //           state = /er/.test(method) ? _indeterminate : /bl/.test(method) ? _disabled : _checked,
  //           active = method == _update ? {
  //               checked: node[_checked],
  //               disabled: node[_disabled],
  //               indeterminate: input.attr(_indeterminate) == 'true' || input.attr(_determinate) == 'false'
  //           } : node[state];

  //         // Check, disable or indeterminate
  //         if (/^(ch|di|in)/.test(method) && !active) {
  //             on(input, state);

  //             // Uncheck, enable or determinate
  //         } else if (/^(un|en|de)/.test(method) && active) {
  //             off(input, state);

  //             // Update
  //         } else if (method == _update) {

  //             // Handle states
  //             for (var each in active) {
  //                 if (active[each]) {
  //                     on(input, each, true);
  //                 } else {
  //                     off(input, each, true);
  //                 }
  //             }

  //         } else if (!direct || method == 'toggle') {

  //             // Helper or label was clicked
  //             if (!direct) {
  //                 input[_callback]('ifClicked');
  //             }

  //             // Toggle checked state
  //             if (active) {
  //                 if (node[_type] !== _radio) {
  //                     off(input, state);
  //                 }
  //             } else {
  //                 on(input, state);
  //             }
  //         }
  //     }

  //     // Add checked, disabled or indeterminate state
  //     function on(input, state, keep) {
  //         var node = input[0],
  //           parent = input.parent(),
  //           checked = state == _checked,
  //           indeterminate = state == _indeterminate,
  //           disabled = state == _disabled,
  //           callback = indeterminate ? _determinate : checked ? _unchecked : 'enabled',
  //           regular = option(input, callback + capitalize(node[_type])),
  //           specific = option(input, state + capitalize(node[_type]));

  //         // Prevent unnecessary actions
  //         if (node[state] !== true) {

  //             // Toggle assigned radio buttons
  //             if (!keep && state == _checked && node[_type] == _radio && node.name) {
  //                 var form = input.closest('form'),
  //                   inputs = 'input[name="' + node.name + '"]';

  //                 inputs = form.length ? form.find(inputs) : $(inputs);

  //                 inputs.each(function () {
  //                     if (this !== node && $(this).data(_iCheck)) {
  //                         off($(this), state);
  //                     }
  //                 });
  //             }

  //             // Indeterminate state
  //             if (indeterminate) {

  //                 // Add indeterminate state
  //                 node[state] = true;

  //                 // Remove checked state
  //                 if (node[_checked]) {
  //                     off(input, _checked, 'force');
  //                 }

  //                 // Checked or disabled state
  //             } else {

  //                 // Add checked or disabled state
  //                 if (!keep) {
  //                     node[state] = true;
  //                 }

  //                 // Remove indeterminate state
  //                 if (checked && node[_indeterminate]) {
  //                     off(input, _indeterminate, false);
  //                 }
  //             }

  //             // Trigger callbacks
  //             callbacks(input, checked, state, keep);
  //         }

  //         // Add proper cursor
  //         if (node[_disabled] && !!option(input, _cursor, true)) {
  //             parent.find('.' + _iCheckHelper).css(_cursor, 'default');
  //         }

  //         // Add state class
  //         parent[_add](specific || option(input, state) || '');

  //         // Set ARIA attribute
  //         if (!!parent.attr('role') && !indeterminate) {
  //             parent.attr('aria-' + (disabled ? _disabled : _checked), 'true');
  //         }

  //         // Remove regular state class
  //         parent[_remove](regular || option(input, callback) || '');
  //     }

  //     // Remove checked, disabled or indeterminate state
  //     function off(input, state, keep) {
  //         var node = input[0],
  //           parent = input.parent(),
  //           checked = state == _checked,
  //           indeterminate = state == _indeterminate,
  //           disabled = state == _disabled,
  //           callback = indeterminate ? _determinate : checked ? _unchecked : 'enabled',
  //           regular = option(input, callback + capitalize(node[_type])),
  //           specific = option(input, state + capitalize(node[_type]));

  //         // Prevent unnecessary actions
  //         if (node[state] !== false) {

  //             // Toggle state
  //             if (indeterminate || !keep || keep == 'force') {
  //                 node[state] = false;
  //             }

  //             // Trigger callbacks
  //             callbacks(input, checked, callback, keep);
  //         }

  //         // Add proper cursor
  //         if (!node[_disabled] && !!option(input, _cursor, true)) {
  //             parent.find('.' + _iCheckHelper).css(_cursor, 'pointer');
  //         }

  //         // Remove state class
  //         parent[_remove](specific || option(input, state) || '');

  //         // Set ARIA attribute
  //         if (!!parent.attr('role') && !indeterminate) {
  //             parent.attr('aria-' + (disabled ? _disabled : _checked), 'false');
  //         }

  //         // Add regular state class
  //         parent[_add](regular || option(input, callback) || '');
  //     }

  //     // Remove all traces
  //     function tidy(input, callback) {
  //         if (input.data(_iCheck)) {

  //             // Remove everything except input
  //             input.parent().html(input.attr('style', input.data(_iCheck).s || ''));

  //             // Callback
  //             if (callback) {
  //                 input[_callback](callback);
  //             }

  //             // Unbind events
  //             input.off('.i').unwrap();
  //             $(_label + '[for="' + input[0].id + '"]').add(input.closest(_label)).off('.i');
  //         }
  //     }

  //     // Get some option
  //     function option(input, state, regular) {
  //         if (input.data(_iCheck)) {
  //             return input.data(_iCheck).o[state + (regular ? '' : 'Class')];
  //         }
  //     }

  //     // Capitalize some string
  //     function capitalize(string) {
  //         return string.charAt(0).toUpperCase() + string.slice(1);
  //     }

  //     // Executable handlers
  //     function callbacks(input, checked, callback, keep) {
  //         if (!keep) {
  //             if (checked) {
  //                 input[_callback]('ifToggled');
  //             }

  //             input[_callback]('ifChanged')[_callback]('if' + capitalize(callback));
  //         }
  //     }
  // })(window.jQuery || window.Zepto);
  /*
   * Toastr
   * Copyright 2012-2015
   * Authors: John Papa, Hans Fj�llemark, and Tim Ferrell.
   * All Rights Reserved.
   * Use, reproduction, distribution, and modification of this code is subject to the terms and
   * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
   *
   * ARIA Support: Greta Krafsig
   *
   * Project: https://github.com/CodeSeven/toastr
   */
  /* global define */
  // (function (define) {
  //     define(['jquery'], function ($) {
  //         return (function () {
  //             var $container;
  //             var listener;
  //             var toastId = 0;
  //             var toastType = {
  //                 error: 'error',
  //                 info: 'info',
  //                 success: 'success',
  //                 warning: 'warning'
  //             };

  //             var toastr = {
  //                 clear: clear,
  //                 remove: remove,
  //                 error: error,
  //                 getContainer: getContainer,
  //                 info: info,
  //                 options: {},
  //                 subscribe: subscribe,
  //                 success: success,
  //                 version: '2.1.2',
  //                 warning: warning
  //             };

  //             var previousToast;

  //             return toastr;

  //             ////////////////

  //             function error(message, title, optionsOverride) {
  //                 return notify({
  //                     type: toastType.error,
  //                     iconClass: getOptions().iconClasses.error,
  //                     message: message,
  //                     optionsOverride: optionsOverride,
  //                     title: title
  //                 });
  //             }

  //             function getContainer(options, create) {
  //                 if (!options) { options = getOptions(); }
  //                 $container = $('#' + options.containerId);
  //                 if ($container.length) {
  //                     return $container;
  //                 }
  //                 if (create) {
  //                     $container = createContainer(options);
  //                 }
  //                 return $container;
  //             }

  //             function info(message, title, optionsOverride) {
  //                 return notify({
  //                     type: toastType.info,
  //                     iconClass: getOptions().iconClasses.info,
  //                     message: message,
  //                     optionsOverride: optionsOverride,
  //                     title: title
  //                 });
  //             }

  //             function subscribe(callback) {
  //                 listener = callback;
  //             }

  //             function success(message, title, optionsOverride) {
  //                 return notify({
  //                     type: toastType.success,
  //                     iconClass: getOptions().iconClasses.success,
  //                     message: message,
  //                     optionsOverride: optionsOverride,
  //                     title: title
  //                 });
  //             }

  //             function warning(message, title, optionsOverride) {
  //                 return notify({
  //                     type: toastType.warning,
  //                     iconClass: getOptions().iconClasses.warning,
  //                     message: message,
  //                     optionsOverride: optionsOverride,
  //                     title: title
  //                 });
  //             }

  //             function clear($toastElement, clearOptions) {
  //                 var options = getOptions();
  //                 if (!$container) { getContainer(options); }
  //                 if (!clearToast($toastElement, options, clearOptions)) {
  //                     clearContainer(options);
  //                 }
  //             }

  //             function remove($toastElement) {
  //                 var options = getOptions();
  //                 if (!$container) { getContainer(options); }
  //                 if ($toastElement && $(':focus', $toastElement).length === 0) {
  //                     removeToast($toastElement);
  //                     return;
  //                 }
  //                 if ($container.children().length) {
  //                     $container.remove();
  //                 }
  //             }

  //             // internal functions

  //             function clearContainer(options) {
  //                 var toastsToClear = $container.children();
  //                 for (var i = toastsToClear.length - 1; i >= 0; i--) {
  //                     clearToast($(toastsToClear[i]), options);
  //                 }
  //             }

  //             function clearToast($toastElement, options, clearOptions) {
  //                 var force = clearOptions && clearOptions.force ? clearOptions.force : false;
  //                 if ($toastElement && (force || $(':focus', $toastElement).length === 0)) {
  //                     $toastElement[options.hideMethod]({
  //                         duration: options.hideDuration,
  //                         easing: options.hideEasing,
  //                         complete: function () { removeToast($toastElement); }
  //                     });
  //                     return true;
  //                 }
  //                 return false;
  //             }

  //             function createContainer(options) {
  //                 $container = $('<div/>')
  //                     .attr('id', options.containerId)
  //                     .addClass(options.positionClass)
  //                     .attr('aria-live', 'polite')
  //                     .attr('role', 'alert');

  //                 $container.appendTo($(options.target));
  //                 return $container;
  //             }

  //             function getDefaults() {
  //                 return {
  //                     tapToDismiss: true,
  //                     toastClass: 'toast',
  //                     containerId: 'toast-container',
  //                     debug: false,

  //                     showMethod: 'fadeIn', //fadeIn, slideDown, and show are built into jQuery
  //                     showDuration: 300,
  //                     showEasing: 'swing', //swing and linear are built into jQuery
  //                     onShown: undefined,
  //                     hideMethod: 'fadeOut',
  //                     hideDuration: 1000,
  //                     hideEasing: 'swing',
  //                     onHidden: undefined,
  //                     closeMethod: false,
  //                     closeDuration: false,
  //                     closeEasing: false,

  //                     extendedTimeOut: 1000,
  //                     iconClasses: {
  //                         error: 'toast-error',
  //                         info: 'toast-info',
  //                         success: 'toast-success',
  //                         warning: 'toast-warning'
  //                     },
  //                     iconClass: 'toast-info',
  //                     positionClass: 'toast-top-right',
  //                     timeOut: 5000, // Set timeOut and extendedTimeOut to 0 to make it sticky
  //                     titleClass: 'toast-title',
  //                     messageClass: 'toast-message',
  //                     escapeHtml: false,
  //                     target: 'body',
  //                     closeHtml: '<button type="button">&times;</button>',
  //                     newestOnTop: true,
  //                     preventDuplicates: false,
  //                     progressBar: false
  //                 };
  //             }

  //             function publish(args) {
  //                 if (!listener) { return; }
  //                 listener(args);
  //             }

  //             function notify(map) {
  //                 var options = getOptions();
  //                 var iconClass = map.iconClass || options.iconClass;

  //                 if (typeof (map.optionsOverride) !== 'undefined') {
  //                     options = $.extend(options, map.optionsOverride);
  //                     iconClass = map.optionsOverride.iconClass || iconClass;
  //                 }

  //                 if (shouldExit(options, map)) { return; }

  //                 toastId++;

  //                 $container = getContainer(options, true);

  //                 var intervalId = null;
  //                 var $toastElement = $('<div/>');
  //                 var $titleElement = $('<div/>');
  //                 var $messageElement = $('<div/>');
  //                 var $progressElement = $('<div/>');
  //                 var $closeElement = $(options.closeHtml);
  //                 var progressBar = {
  //                     intervalId: null,
  //                     hideEta: null,
  //                     maxHideTime: null
  //                 };
  //                 var response = {
  //                     toastId: toastId,
  //                     state: 'visible',
  //                     startTime: new Date(),
  //                     options: options,
  //                     map: map
  //                 };

  //                 personalizeToast();

  //                 displayToast();

  //                 handleEvents();

  //                 publish(response);

  //                 if (options.debug && console) {
  //                     console.log(response);
  //                 }

  //                 return $toastElement;

  //                 function escapeHtml(source) {
  //                     if (source == null)
  //                         source = "";

  //                     return new String(source)
  //                         .replace(/&/g, '&amp;')
  //                         .replace(/"/g, '&quot;')
  //                         .replace(/'/g, '&#39;')
  //                         .replace(/</g, '&lt;')
  //                         .replace(/>/g, '&gt;');
  //                 }

  //                 function personalizeToast() {
  //                     setIcon();
  //                     setTitle();
  //                     setMessage();
  //                     setCloseButton();
  //                     setProgressBar();
  //                     setSequence();
  //                 }

  //                 function handleEvents() {
  //                     $toastElement.hover(stickAround, delayedHideToast);
  //                     if (!options.onclick && options.tapToDismiss) {
  //                         $toastElement.click(hideToast);
  //                     }

  //                     if (options.closeButton && $closeElement) {
  //                         $closeElement.click(function (event) {
  //                             if (event.stopPropagation) {
  //                                 event.stopPropagation();
  //                             } else if (event.cancelBubble !== undefined && event.cancelBubble !== true) {
  //                                 event.cancelBubble = true;
  //                             }
  //                             hideToast(true);
  //                         });
  //                     }

  //                     if (options.onclick) {
  //                         $toastElement.click(function (event) {
  //                             options.onclick(event);
  //                             hideToast();
  //                         });
  //                     }
  //                 }

  //                 function displayToast() {
  //                     $toastElement.hide();

  //                     $toastElement[options.showMethod](
  //                         { duration: options.showDuration, easing: options.showEasing, complete: options.onShown }
  //                     );

  //                     if (options.timeOut > 0) {
  //                         intervalId = setTimeout(hideToast, options.timeOut);
  //                         progressBar.maxHideTime = parseFloat(options.timeOut);
  //                         progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
  //                         if (options.progressBar) {
  //                             progressBar.intervalId = setInterval(updateProgress, 10);
  //                         }
  //                     }
  //                 }

  //                 function setIcon() {
  //                     if (map.iconClass) {
  //                         $toastElement.addClass(options.toastClass).addClass(iconClass);
  //                     }
  //                 }

  //                 function setSequence() {
  //                     if (options.newestOnTop) {
  //                         $container.prepend($toastElement);
  //                     } else {
  //                         $container.append($toastElement);
  //                     }
  //                 }

  //                 function setTitle() {
  //                     if (map.title) {
  //                         $titleElement.append(!options.escapeHtml ? map.title : escapeHtml(map.title)).addClass(options.titleClass);
  //                         $toastElement.append($titleElement);
  //                     }
  //                 }

  //                 function setMessage() {
  //                     if (map.message) {
  //                         $messageElement.append(!options.escapeHtml ? map.message : escapeHtml(map.message)).addClass(options.messageClass);
  //                         $toastElement.append($messageElement);
  //                     }
  //                 }

  //                 function setCloseButton() {
  //                     if (options.closeButton) {
  //                         $closeElement.addClass('toast-close-button').attr('role', 'button');
  //                         $toastElement.prepend($closeElement);
  //                     }
  //                 }

  //                 function setProgressBar() {
  //                     if (options.progressBar) {
  //                         $progressElement.addClass('toast-progress');
  //                         $toastElement.prepend($progressElement);
  //                     }
  //                 }

  //                 function shouldExit(options, map) {
  //                     if (options.preventDuplicates) {
  //                         if (map.message === previousToast) {
  //                             return true;
  //                         } else {
  //                             previousToast = map.message;
  //                         }
  //                     }
  //                     return false;
  //                 }

  //                 function hideToast(override) {
  //                     var method = override && options.closeMethod !== false ? options.closeMethod : options.hideMethod;
  //                     var duration = override && options.closeDuration !== false ?
  //                         options.closeDuration : options.hideDuration;
  //                     var easing = override && options.closeEasing !== false ? options.closeEasing : options.hideEasing;
  //                     if ($(':focus', $toastElement).length && !override) {
  //                         return;
  //                     }
  //                     clearTimeout(progressBar.intervalId);
  //                     return $toastElement[method]({
  //                         duration: duration,
  //                         easing: easing,
  //                         complete: function () {
  //                             removeToast($toastElement);
  //                             if (options.onHidden && response.state !== 'hidden') {
  //                                 options.onHidden();
  //                             }
  //                             response.state = 'hidden';
  //                             response.endTime = new Date();
  //                             publish(response);
  //                         }
  //                     });
  //                 }

  //                 function delayedHideToast() {
  //                     if (options.timeOut > 0 || options.extendedTimeOut > 0) {
  //                         intervalId = setTimeout(hideToast, options.extendedTimeOut);
  //                         progressBar.maxHideTime = parseFloat(options.extendedTimeOut);
  //                         progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
  //                     }
  //                 }

  //                 function stickAround() {
  //                     clearTimeout(intervalId);
  //                     progressBar.hideEta = 0;
  //                     $toastElement.stop(true, true)[options.showMethod](
  //                         { duration: options.showDuration, easing: options.showEasing }
  //                     );
  //                 }

  //                 function updateProgress() {
  //                     var percentage = ((progressBar.hideEta - (new Date().getTime())) / progressBar.maxHideTime) * 100;
  //                     $progressElement.width(percentage + '%');
  //                 }
  //             }

  //             function getOptions() {
  //                 return $.extend({}, getDefaults(), toastr.options);
  //             }

  //             function removeToast($toastElement) {
  //                 if (!$container) { $container = getContainer(); }
  //                 if ($toastElement.is(':visible')) {
  //                     return;
  //                 }
  //                 $toastElement.remove();
  //                 $toastElement = null;
  //                 if ($container.children().length === 0) {
  //                     $container.remove();
  //                     previousToast = undefined;
  //                 }
  //             }

  //         })();
  //     });
  // }(typeof define === 'function' && define.amd ? define : function (deps, factory) {
  //     if (typeof module !== 'undefined' && module.exports) { //Node
  //         module.exports = factory(require('jquery'));
  //     } else {
  //         window.toastr = factory(window.jQuery);
  //     }
  // }));
  // var JSON;JSON||(JSON={}),function(){function str(a,b){var c,d,e,f,g=gap,h,i=b[a];i&&typeof i=="object"&&typeof i.toJSON=="function"&&(i=i.toJSON(a)),typeof rep=="function"&&(i=rep.call(b,a,i));switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";gap+=indent,h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1)h[c]=str(c,i)||"null";e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g;return e}if(rep&&typeof rep=="object"){f=rep.length;for(c=0;c<f;c+=1)d=rep[c],typeof d=="string"&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e))}else for(d in i)Object.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g;return e}}function quote(a){escapable.lastIndex=0;return escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b=="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function f(a){return a<10?"0"+a:a}"use strict",typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(a,b,c){var d;gap="",indent="";if(typeof c=="number")for(d=0;d<c;d+=1)indent+=" ";else typeof c=="string"&&(indent=c);rep=b;if(b&&typeof b!="function"&&(typeof b!="object"||typeof b.length!="number"))throw new Error("JSON.stringify");return str("",{"":a})}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e=="object")for(c in e)Object.hasOwnProperty.call(e,c)&&(d=walk(e,c),d!==undefined?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver=="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")})}()
  /*
      json2.js
      2012-10-08

      Public Domain.

      NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

      See http://www.JSON.org/js.html


      This code should be minified before deployment.
      See http://javascript.crockford.com/jsmin.html

      USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
      NOT CONTROL.


      This file creates a global JSON object containing two methods: stringify
      and parse.

          JSON.stringify(value, replacer, space)
              value       any JavaScript value, usually an object or array.

              replacer    an optional parameter that determines how object
                          values are stringified for objects. It can be a
                          function or an array of strings.

              space       an optional parameter that specifies the indentation
                          of nested structures. If it is omitted, the text will
                          be packed without extra whitespace. If it is a number,
                          it will specify the number of spaces to indent at each
                          level. If it is a string (such as '\t' or '&nbsp;'),
                          it contains the characters used to indent at each level.

              This method produces a JSON text from a JavaScript value.

              When an object value is found, if the object contains a toJSON
              method, its toJSON method will be called and the result will be
              stringified. A toJSON method does not serialize: it returns the
              value represented by the name/value pair that should be serialized,
              or undefined if nothing should be serialized. The toJSON method
              will be passed the key associated with the value, and this will be
              bound to the value

              For example, this would serialize Dates as ISO strings.

                  Date.prototype.toJSON = function (key) {
                      function f(n) {
                          // Format integers to have at least two digits.
                          return n < 10 ? '0' + n : n;
                      }

                      return this.getUTCFullYear()   + '-' +
                           f(this.getUTCMonth() + 1) + '-' +
                           f(this.getUTCDate())      + 'T' +
                           f(this.getUTCHours())     + ':' +
                           f(this.getUTCMinutes())   + ':' +
                           f(this.getUTCSeconds())   + 'Z';
                  };

              You can provide an optional replacer method. It will be passed the
              key and value of each member, with this bound to the containing
              object. The value that is returned from your method will be
              serialized. If your method returns undefined, then the member will
              be excluded from the serialization.

              If the replacer parameter is an array of strings, then it will be
              used to select the members to be serialized. It filters the results
              such that only members with keys listed in the replacer array are
              stringified.

              Values that do not have JSON representations, such as undefined or
              functions, will not be serialized. Such values in objects will be
              dropped; in arrays they will be replaced with null. You can use
              a replacer function to replace those with JSON values.
              JSON.stringify(undefined) returns undefined.

              The optional space parameter produces a stringification of the
              value that is filled with line breaks and indentation to make it
              easier to read.

              If the space parameter is a non-empty string, then that string will
              be used for indentation. If the space parameter is a number, then
              the indentation will be that many spaces.

              Example:

              text = JSON.stringify(['e', {pluribus: 'unum'}]);
              // text is '["e",{"pluribus":"unum"}]'


              text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
              // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

              text = JSON.stringify([new Date()], function (key, value) {
                  return this[key] instanceof Date ?
                      'Date(' + this[key] + ')' : value;
              });
              // text is '["Date(---current time---)"]'


          JSON.parse(text, reviver)
              This method parses a JSON text to produce an object or array.
              It can throw a SyntaxError exception.

              The optional reviver parameter is a function that can filter and
              transform the results. It receives each of the keys and values,
              and its return value is used instead of the original value.
              If it returns what it received, then the structure is not modified.
              If it returns undefined then the member is deleted.

              Example:

              // Parse the text. Values that look like ISO date strings will
              // be converted to Date objects.

              myData = JSON.parse(text, function (key, value) {
                  var a;
                  if (typeof value === 'string') {
                      a =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                      if (a) {
                          return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                              +a[5], +a[6]));
                      }
                  }
                  return value;
              });

              myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                  var d;
                  if (typeof value === 'string' &&
                          value.slice(0, 5) === 'Date(' &&
                          value.slice(-1) === ')') {
                      d = new Date(value.slice(5, -1));
                      if (d) {
                          return d;
                      }
                  }
                  return value;
              });


      This is a reference implementation. You are free to copy, modify, or
      redistribute.
  */

  /*jslint evil: true, regexp: true */

  /*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
      call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
      getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
      lastIndex, length, parse, prototype, push, replace, slice, stringify,
      test, toJSON, toString, valueOf
  */


  // Create a JSON object only if one does not already exist. We create the
  // methods in a closure to avoid creating global variables.

  if (typeof JSON !== 'object') {
      JSON = {};
  }

  // (function () {
  //     'use strict';

  //     function f(n) {
  //         // Format integers to have at least two digits.
  //         return n < 10 ? '0' + n : n;
  //     }

  //     if (typeof Date.prototype.toJSON !== 'function') {

  //         Date.prototype.toJSON = function (key) {

  //             return isFinite(this.valueOf())
  //                 ? this.getUTCFullYear() + '-' +
  //                     f(this.getUTCMonth() + 1) + '-' +
  //                     f(this.getUTCDate()) + 'T' +
  //                     f(this.getUTCHours()) + ':' +
  //                     f(this.getUTCMinutes()) + ':' +
  //                     f(this.getUTCSeconds()) + 'Z'
  //                 : null;
  //         };

  //         String.prototype.toJSON =
  //             Number.prototype.toJSON =
  //             Boolean.prototype.toJSON = function (key) {
  //                 return this.valueOf();
  //             };
  //     }

  //     var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
  //         escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
  //         gap,
  //         indent,
  //         meta = {    // table of character substitutions
  //             '\b': '\\b',
  //             '\t': '\\t',
  //             '\n': '\\n',
  //             '\f': '\\f',
  //             '\r': '\\r',
  //             '"': '\\"',
  //             '\\': '\\\\'
  //         },
  //         rep;


  //     function quote(string) {

  //         // If the string contains no control characters, no quote characters, and no
  //         // backslash characters, then we can safely slap some quotes around it.
  //         // Otherwise we must also replace the offending characters with safe escape
  //         // sequences.

  //         escapable.lastIndex = 0;
  //         return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
  //             var c = meta[a];
  //             return typeof c === 'string'
  //                 ? c
  //                 : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
  //         }) + '"' : '"' + string + '"';
  //     }


  //     function str(key, holder) {

  //         // Produce a string from holder[key].

  //         var i,          // The loop counter.
  //             k,          // The member key.
  //             v,          // The member value.
  //             length,
  //             mind = gap,
  //             partial,
  //             value = holder[key];

  //         // If the value has a toJSON method, call it to obtain a replacement value.

  //         if (value && typeof value === 'object' &&
  //                 typeof value.toJSON === 'function') {
  //             value = value.toJSON(key);
  //         }

  //         // If we were called with a replacer function, then call the replacer to
  //         // obtain a replacement value.

  //         if (typeof rep === 'function') {
  //             value = rep.call(holder, key, value);
  //         }

  //         // What happens next depends on the value's type.

  //         switch (typeof value) {
  //             case 'string':
  //                 return quote(value);

  //             case 'number':

  //                 // JSON numbers must be finite. Encode non-finite numbers as null.

  //                 return isFinite(value) ? String(value) : 'null';

  //             case 'boolean':
  //             case 'null':

  //                 // If the value is a boolean or null, convert it to a string. Note:
  //                 // typeof null does not produce 'null'. The case is included here in
  //                 // the remote chance that this gets fixed someday.

  //                 return String(value);

  //                 // If the type is 'object', we might be dealing with an object or an array or
  //                 // null.

  //             case 'object':

  //                 // Due to a specification blunder in ECMAScript, typeof null is 'object',
  //                 // so watch out for that case.

  //                 if (!value) {
  //                     return 'null';
  //                 }

  //                 // Make an array to hold the partial results of stringifying this object value.

  //                 gap += indent;
  //                 partial = [];

  //                 // Is the value an array?

  //                 if (Object.prototype.toString.apply(value) === '[object Array]') {

  //                     // The value is an array. Stringify every element. Use null as a placeholder
  //                     // for non-JSON values.

  //                     length = value.length;
  //                     for (i = 0; i < length; i += 1) {
  //                         partial[i] = str(i, value) || 'null';
  //                     }

  //                     // Join all of the elements together, separated with commas, and wrap them in
  //                     // brackets.

  //                     v = partial.length === 0
  //                         ? '[]'
  //                         : gap
  //                         ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
  //                         : '[' + partial.join(',') + ']';
  //                     gap = mind;
  //                     return v;
  //                 }

  //                 // If the replacer is an array, use it to select the members to be stringified.

  //                 if (rep && typeof rep === 'object') {
  //                     length = rep.length;
  //                     for (i = 0; i < length; i += 1) {
  //                         if (typeof rep[i] === 'string') {
  //                             k = rep[i];
  //                             v = str(k, value);
  //                             if (v) {
  //                                 partial.push(quote(k) + (gap ? ': ' : ':') + v);
  //                             }
  //                         }
  //                     }
  //                 } else {

  //                     // Otherwise, iterate through all of the keys in the object.

  //                     for (k in value) {
  //                         if (Object.prototype.hasOwnProperty.call(value, k)) {
  //                             v = str(k, value);
  //                             if (v) {
  //                                 partial.push(quote(k) + (gap ? ': ' : ':') + v);
  //                             }
  //                         }
  //                     }
  //                 }

  //                 // Join all of the member texts together, separated with commas,
  //                 // and wrap them in braces.

  //                 v = partial.length === 0
  //                     ? '{}'
  //                     : gap
  //                     ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
  //                     : '{' + partial.join(',') + '}';
  //                 gap = mind;
  //                 return v;
  //         }
  //     }

  //     // If the JSON object does not yet have a stringify method, give it one.

  //     if (typeof JSON.stringify !== 'function') {
  //         JSON.stringify = function (value, replacer, space) {

  //             // The stringify method takes a value and an optional replacer, and an optional
  //             // space parameter, and returns a JSON text. The replacer can be a function
  //             // that can replace values, or an array of strings that will select the keys.
  //             // A default replacer method can be provided. Use of the space parameter can
  //             // produce text that is more easily readable.

  //             var i;
  //             gap = '';
  //             indent = '';

  //             // If the space parameter is a number, make an indent string containing that
  //             // many spaces.

  //             if (typeof space === 'number') {
  //                 for (i = 0; i < space; i += 1) {
  //                     indent += ' ';
  //                 }

  //                 // If the space parameter is a string, it will be used as the indent string.

  //             } else if (typeof space === 'string') {
  //                 indent = space;
  //             }

  //             // If there is a replacer, it must be a function or an array.
  //             // Otherwise, throw an error.

  //             rep = replacer;
  //             if (replacer && typeof replacer !== 'function' &&
  //                     (typeof replacer !== 'object' ||
  //                     typeof replacer.length !== 'number')) {
  //                 throw new Error('JSON.stringify');
  //             }

  //             // Make a fake root object containing our value under the key of ''.
  //             // Return the result of stringifying the value.

  //             return str('', { '': value });
  //         };
  //     }


  //     // If the JSON object does not yet have a parse method, give it one.

  //     if (typeof JSON.parse !== 'function') {
  //         JSON.parse = function (text, reviver) {

  //             // The parse method takes a text and an optional reviver function, and returns
  //             // a JavaScript value if the text is a valid JSON text.

  //             var j;

  //             function walk(holder, key) {

  //                 // The walk method is used to recursively walk the resulting structure so
  //                 // that modifications can be made.

  //                 var k, v, value = holder[key];
  //                 if (value && typeof value === 'object') {
  //                     for (k in value) {
  //                         if (Object.prototype.hasOwnProperty.call(value, k)) {
  //                             v = walk(value, k);
  //                             if (v !== undefined) {
  //                                 value[k] = v;
  //                             } else {
  //                                 delete value[k];
  //                             }
  //                         }
  //                     }
  //                 }
  //                 return reviver.call(holder, key, value);
  //             }


  //             // Parsing happens in four stages. In the first stage, we replace certain
  //             // Unicode characters with escape sequences. JavaScript handles many characters
  //             // incorrectly, either silently deleting them, or treating them as line endings.

  //             text = String(text);
  //             cx.lastIndex = 0;
  //             if (cx.test(text)) {
  //                 text = text.replace(cx, function (a) {
  //                     return '\\u' +
  //                         ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
  //                 });
  //             }

  //             // In the second stage, we run the text against regular expressions that look
  //             // for non-JSON patterns. We are especially concerned with '()' and 'new'
  //             // because they can cause invocation, and '=' because it can cause mutation.
  //             // But just to be safe, we want to reject all unexpected forms.

  //             // We split the second stage into 4 regexp operations in order to work around
  //             // crippling inefficiencies in IE's and Safari's regexp engines. First we
  //             // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
  //             // replace all simple value tokens with ']' characters. Third, we delete all
  //             // open brackets that follow a colon or comma or that begin the text. Finally,
  //             // we look to see that the remaining characters are only whitespace or ']' or
  //             // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

  //             if (/^[\],:{}\s]*$/
  //                     .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
  //                         .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
  //                         .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

  //                 // In the third stage we use the eval function to compile the text into a
  //                 // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
  //                 // in JavaScript: it can begin a block or an object literal. We wrap the text
  //                 // in parens to eliminate the ambiguity.

  //                 j = eval('(' + text + ')');

  //                 // In the optional fourth stage, we recursively walk the new structure, passing
  //                 // each name/value pair to a reviver function for possible transformation.

  //                 return typeof reviver === 'function'
  //                     ? walk({ '': j }, '')
  //                     : j;
  //             }

  //             // If the text is not JSON parseable, then a SyntaxError is thrown.

  //             throw new SyntaxError('JSON.parse');
  //         };
  //     }
  // }());
  /**
   * History.js jQuery Adapter
   * @author Benjamin Arthur Lupton <contact@balupton.com>
   * @copyright 2010-2011 Benjamin Arthur Lupton <contact@balupton.com>
   * @license New BSD License <http://creativecommons.org/licenses/BSD/>
   */

  // Closure
  // (function (window, undefined) {
  //     "use strict";

  //     // Localise Globals
  //     var
  //     History = window.History = window.History || {},
  //     jQuery = window.jQuery;

  //     // Check Existence
  //     if (typeof History.Adapter !== 'undefined') {
  //         throw new Error('History.js Adapter has already been loaded...');
  //     }

  //     // Add the Adapter
  //     History.Adapter = {
  //         /**
  //      * History.Adapter.bind(el,event,callback)
  //      * @param {Element|string} el
  //      * @param {string} event - custom and standard events
  //      * @param {function} callback
  //      * @return {void}
  //      */
  //         bind: function (el, event, callback) {
  //             jQuery(el).bind(event, callback);
  //         },

  //         /**
  //      * History.Adapter.trigger(el,event)
  //      * @param {Element|string} el
  //      * @param {string} event - custom and standard events
  //      * @param {Object=} extra - a object of extra event data (optional)
  //      * @return {void}
  //      */
  //         trigger: function (el, event, extra) {
  //             jQuery(el).trigger(event, extra);
  //         },

  //         /**
  //      * History.Adapter.extractEventData(key,event,extra)
  //      * @param {string} key - key for the event data to extract
  //      * @param {string} event - custom and standard events
  //      * @param {Object=} extra - a object of extra event data (optional)
  //      * @return {mixed}
  //      */
  //         extractEventData: function (key, event, extra) {
  //             // jQuery Native then jQuery Custom
  //             var result = (event && event.originalEvent && event.originalEvent[key]) || (extra && extra[key]) || undefined;

  //             // Return
  //             return result;
  //         },

  //         /**
  //      * History.Adapter.onDomLoad(callback)
  //      * @param {function} callback
  //      * @return {void}
  //      */
  //         onDomLoad: function (callback) {
  //             jQuery(callback);
  //         }
  //     };

  //     // Try and Initialise History
  //     if (typeof History.init !== 'undefined') {
  //         History.init();
  //     }

  // })(window);

  /**
   * History.js HTML4 Support
   * Depends on the HTML5 Support
   * @author Benjamin Arthur Lupton <contact@balupton.com>
   * @copyright 2010-2011 Benjamin Arthur Lupton <contact@balupton.com>
   * @license New BSD License <http://creativecommons.org/licenses/BSD/>
   */

  // (function (window, undefined) {
  //     "use strict";

  //     // ========================================================================
  //     // Initialise

  //     // Localise Globals
  //     var
  //     document = window.document, // Make sure we are using the correct document
  //     setTimeout = window.setTimeout || setTimeout,
  //     clearTimeout = window.clearTimeout || clearTimeout,
  //     setInterval = window.setInterval || setInterval,
  //     History = window.History = window.History || {}; // Public History Object

  //     // Check Existence
  //     if (typeof History.initHtml4 !== 'undefined') {
  //         throw new Error('History.js HTML4 Support has already been loaded...');
  //     }


  //     // ========================================================================
  //     // Initialise HTML4 Support

  //     // Initialise HTML4 Support
  //     History.initHtml4 = function () {
  //         // Initialise
  //         if (typeof History.initHtml4.initialized !== 'undefined') {
  //             // Already Loaded
  //             return false;
  //         }
  //         else {
  //             History.initHtml4.initialized = true;
  //         }


  //         // ====================================================================
  //         // Properties

  //         /**
  //      * History.enabled
  //      * Is History enabled?
  //      */
  //         History.enabled = true;


  //         // ====================================================================
  //         // Hash Storage

  //         /**
  //      * History.savedHashes
  //      * Store the hashes in an array
  //      */
  //         History.savedHashes = [];

  //         /**
  //      * History.isLastHash(newHash)
  //      * Checks if the hash is the last hash
  //      * @param {string} newHash
  //      * @return {boolean} true
  //      */
  //         History.isLastHash = function (newHash) {
  //             // Prepare
  //             var oldHash = History.getHashByIndex(),
  //         isLast;

  //             // Check
  //             isLast = newHash === oldHash;

  //             // Return isLast
  //             return isLast;
  //         };

  //         /**
  //      * History.isHashEqual(newHash, oldHash)
  //      * Checks to see if two hashes are functionally equal
  //      * @param {string} newHash
  //      * @param {string} oldHash
  //      * @return {boolean} true
  //      */
  //         History.isHashEqual = function (newHash, oldHash) {
  //             newHash = encodeURIComponent(newHash).replace(/%25/g, "%");
  //             oldHash = encodeURIComponent(oldHash).replace(/%25/g, "%");
  //             return newHash === oldHash;
  //         };

  //         /**
  //      * History.saveHash(newHash)
  //      * Push a Hash
  //      * @param {string} newHash
  //      * @return {boolean} true
  //      */
  //         History.saveHash = function (newHash) {
  //             // Check Hash
  //             if (History.isLastHash(newHash)) {
  //                 return false;
  //             }

  //             // Push the Hash
  //             History.savedHashes.push(newHash);

  //             // Return true
  //             return true;
  //         };

  //         /**
  //      * History.getHashByIndex()
  //      * Gets a hash by the index
  //      * @param {integer} index
  //      * @return {string}
  //      */
  //         History.getHashByIndex = function (index) {
  //             // Prepare
  //             var hash = null;

  //             // Handle
  //             if (typeof index === 'undefined') {
  //                 // Get the last inserted
  //                 hash = History.savedHashes[History.savedHashes.length - 1];
  //             }
  //             else if (index < 0) {
  //                 // Get from the end
  //                 hash = History.savedHashes[History.savedHashes.length + index];
  //             }
  //             else {
  //                 // Get from the beginning
  //                 hash = History.savedHashes[index];
  //             }

  //             // Return hash
  //             return hash;
  //         };


  //         // ====================================================================
  //         // Discarded States

  //         /**
  //      * History.discardedHashes
  //      * A hashed array of discarded hashes
  //      */
  //         History.discardedHashes = {};

  //         /**
  //      * History.discardedStates
  //      * A hashed array of discarded states
  //      */
  //         History.discardedStates = {};

  //         /**
  //      * History.discardState(State)
  //      * Discards the state by ignoring it through History
  //      * @param {object} State
  //      * @return {true}
  //      */
  //         History.discardState = function (discardedState, forwardState, backState) {
  //             //History.debug('History.discardState', arguments);
  //             // Prepare
  //             var discardedStateHash = History.getHashByState(discardedState),
  //         discardObject;

  //             // Create Discard Object
  //             discardObject = {
  //                 'discardedState': discardedState,
  //                 'backState': backState,
  //                 'forwardState': forwardState
  //             };

  //             // Add to DiscardedStates
  //             History.discardedStates[discardedStateHash] = discardObject;

  //             // Return true
  //             return true;
  //         };

  //         /**
  //      * History.discardHash(hash)
  //      * Discards the hash by ignoring it through History
  //      * @param {string} hash
  //      * @return {true}
  //      */
  //         History.discardHash = function (discardedHash, forwardState, backState) {
  //             //History.debug('History.discardState', arguments);
  //             // Create Discard Object
  //             var discardObject = {
  //                 'discardedHash': discardedHash,
  //                 'backState': backState,
  //                 'forwardState': forwardState
  //             };

  //             // Add to discardedHash
  //             History.discardedHashes[discardedHash] = discardObject;

  //             // Return true
  //             return true;
  //         };

  //         /**
  //      * History.discardedState(State)
  //      * Checks to see if the state is discarded
  //      * @param {object} State
  //      * @return {bool}
  //      */
  //         History.discardedState = function (State) {
  //             // Prepare
  //             var StateHash = History.getHashByState(State),
  //         discarded;

  //             // Check
  //             discarded = History.discardedStates[StateHash] || false;

  //             // Return true
  //             return discarded;
  //         };

  //         /**
  //      * History.discardedHash(hash)
  //      * Checks to see if the state is discarded
  //      * @param {string} State
  //      * @return {bool}
  //      */
  //         History.discardedHash = function (hash) {
  //             // Check
  //             var discarded = History.discardedHashes[hash] || false;

  //             // Return true
  //             return discarded;
  //         };

  //         /**
  //      * History.recycleState(State)
  //      * Allows a discarded state to be used again
  //      * @param {object} data
  //      * @param {string} title
  //      * @param {string} url
  //      * @return {true}
  //      */
  //         History.recycleState = function (State) {
  //             //History.debug('History.recycleState', arguments);
  //             // Prepare
  //             var StateHash = History.getHashByState(State);

  //             // Remove from DiscardedStates
  //             if (History.discardedState(State)) {
  //                 delete History.discardedStates[StateHash];
  //             }

  //             // Return true
  //             return true;
  //         };


  //         // ====================================================================
  //         // HTML4 HashChange Support

  //         if (History.emulated.hashChange) {
  //             /*
  //        * We must emulate the HTML4 HashChange Support by manually checking for hash changes
  //        */

  //             /**
  //        * History.hashChangeInit()
  //        * Init the HashChange Emulation
  //        */
  //             History.hashChangeInit = function () {
  //                 // Define our Checker Function
  //                 History.checkerFunction = null;

  //                 // Define some variables that will help in our checker function
  //                 var lastDocumentHash = '',
  //           iframeId, iframe,
  //           lastIframeHash, checkerRunning,
  //           startedWithHash = Boolean(History.getHash());

  //                 // Handle depending on the browser
  //                 if (History.isInternetExplorer()) {
  //                     // IE6 and IE7
  //                     // We need to use an iframe to emulate the back and forward buttons

  //                     // Create iFrame
  //                     iframeId = 'historyjs-iframe';
  //                     iframe = document.createElement('iframe');

  //                     // Adjust iFarme
  //                     // IE 6 requires iframe to have a src on HTTPS pages, otherwise it will throw a
  //                     // "This page contains both secure and nonsecure items" warning.
  //                     iframe.setAttribute('id', iframeId);
  //                     iframe.setAttribute('src', '#');
  //                     iframe.style.display = 'none';

  //                     // Append iFrame
  //                     document.body.appendChild(iframe);

  //                     // Create initial history entry
  //                     iframe.contentWindow.document.open();
  //                     iframe.contentWindow.document.close();

  //                     // Define some variables that will help in our checker function
  //                     lastIframeHash = '';
  //                     checkerRunning = false;

  //                     // Define the checker function
  //                     History.checkerFunction = function () {
  //                         // Check Running
  //                         if (checkerRunning) {
  //                             return false;
  //                         }

  //                         // Update Running
  //                         checkerRunning = true;

  //                         // Fetch
  //                         var
  //               documentHash = History.getHash(),
  //               iframeHash = History.getHash(iframe.contentWindow.document);

  //                         // The Document Hash has changed (application caused)
  //                         if (documentHash !== lastDocumentHash) {
  //                             // Equalise
  //                             lastDocumentHash = documentHash;

  //                             // Create a history entry in the iframe
  //                             if (iframeHash !== documentHash) {
  //                                 //History.debug('hashchange.checker: iframe hash change', 'documentHash (new):', documentHash, 'iframeHash (old):', iframeHash);

  //                                 // Equalise
  //                                 lastIframeHash = iframeHash = documentHash;

  //                                 // Create History Entry
  //                                 iframe.contentWindow.document.open();
  //                                 iframe.contentWindow.document.close();

  //                                 // Update the iframe's hash
  //                                 iframe.contentWindow.document.location.hash = History.escapeHash(documentHash);
  //                             }

  //                             // Trigger Hashchange Event
  //                             History.Adapter.trigger(window, 'hashchange');
  //                         }

  //                             // The iFrame Hash has changed (back button caused)
  //                         else if (iframeHash !== lastIframeHash) {
  //                             //History.debug('hashchange.checker: iframe hash out of sync', 'iframeHash (new):', iframeHash, 'documentHash (old):', documentHash);

  //                             // Equalise
  //                             lastIframeHash = iframeHash;

  //                             // If there is no iframe hash that means we're at the original
  //                             // iframe state.
  //                             // And if there was a hash on the original request, the original
  //                             // iframe state was replaced instantly, so skip this state and take
  //                             // the user back to where they came from.
  //                             if (startedWithHash && iframeHash === '') {
  //                                 History.back();
  //                             }
  //                             else {
  //                                 // Update the Hash
  //                                 History.setHash(iframeHash, false);
  //                             }
  //                         }

  //                         // Reset Running
  //                         checkerRunning = false;

  //                         // Return true
  //                         return true;
  //                     };
  //                 }
  //                 else {
  //                     // We are not IE
  //                     // Firefox 1 or 2, Opera

  //                     // Define the checker function
  //                     History.checkerFunction = function () {
  //                         // Prepare
  //                         var documentHash = History.getHash() || '';

  //                         // The Document Hash has changed (application caused)
  //                         if (documentHash !== lastDocumentHash) {
  //                             // Equalise
  //                             lastDocumentHash = documentHash;

  //                             // Trigger Hashchange Event
  //                             History.Adapter.trigger(window, 'hashchange');
  //                         }

  //                         // Return true
  //                         return true;
  //                     };
  //                 }

  //                 // Apply the checker function
  //                 History.intervalList.push(setInterval(History.checkerFunction, History.options.hashChangeInterval));

  //                 // Done
  //                 return true;
  //             }; // History.hashChangeInit

  //             // Bind hashChangeInit
  //             History.Adapter.onDomLoad(History.hashChangeInit);

  //         } // History.emulated.hashChange


  //         // ====================================================================
  //         // HTML5 State Support

  //         // Non-Native pushState Implementation
  //         if (History.emulated.pushState) {
  //             /*
  //        * We must emulate the HTML5 State Management by using HTML4 HashChange
  //        */

  //             /**
  //        * History.onHashChange(event)
  //        * Trigger HTML5's window.onpopstate via HTML4 HashChange Support
  //        */
  //             History.onHashChange = function (event) {
  //                 //History.debug('History.onHashChange', arguments);

  //                 // Prepare
  //                 var currentUrl = ((event && event.newURL) || History.getLocationHref()),
  //           currentHash = History.getHashByUrl(currentUrl),
  //           currentState = null,
  //           currentStateHash = null,
  //           currentStateHashExits = null,
  //           discardObject;

  //                 // Check if we are the same state
  //                 if (History.isLastHash(currentHash)) {
  //                     // There has been no change (just the page's hash has finally propagated)
  //                     //History.debug('History.onHashChange: no change');
  //                     History.busy(false);
  //                     return false;
  //                 }

  //                 // Reset the double check
  //                 History.doubleCheckComplete();

  //                 // Store our location for use in detecting back/forward direction
  //                 History.saveHash(currentHash);

  //                 // Expand Hash
  //                 if (currentHash && History.isTraditionalAnchor(currentHash)) {
  //                     //History.debug('History.onHashChange: traditional anchor', currentHash);
  //                     // Traditional Anchor Hash
  //                     History.Adapter.trigger(window, 'anchorchange');
  //                     History.busy(false);
  //                     return false;
  //                 }

  //                 // Create State
  //                 currentState = History.extractState(History.getFullUrl(currentHash || History.getLocationHref()), true);

  //                 // Check if we are the same state
  //                 if (History.isLastSavedState(currentState)) {
  //                     //History.debug('History.onHashChange: no change');
  //                     // There has been no change (just the page's hash has finally propagated)
  //                     History.busy(false);
  //                     return false;
  //                 }

  //                 // Create the state Hash
  //                 currentStateHash = History.getHashByState(currentState);

  //                 // Check if we are DiscardedState
  //                 discardObject = History.discardedState(currentState);
  //                 if (discardObject) {
  //                     // Ignore this state as it has been discarded and go back to the state before it
  //                     if (History.getHashByIndex(-2) === History.getHashByState(discardObject.forwardState)) {
  //                         // We are going backwards
  //                         //History.debug('History.onHashChange: go backwards');
  //                         History.back(false);
  //                     } else {
  //                         // We are going forwards
  //                         //History.debug('History.onHashChange: go forwards');
  //                         History.forward(false);
  //                     }
  //                     return false;
  //                 }

  //                 // Push the new HTML5 State
  //                 //History.debug('History.onHashChange: success hashchange');
  //                 History.pushState(currentState.data, currentState.title, encodeURI(currentState.url), false);

  //                 // End onHashChange closure
  //                 return true;
  //             };
  //             History.Adapter.bind(window, 'hashchange', History.onHashChange);

  //             /**
  //        * History.pushState(data,title,url)
  //        * Add a new State to the history object, become it, and trigger onpopstate
  //        * We have to trigger for HTML4 compatibility
  //        * @param {object} data
  //        * @param {string} title
  //        * @param {string} url
  //        * @return {true}
  //        */
  //             History.pushState = function (data, title, url, queue) {
  //                 //History.debug('History.pushState: called', arguments);

  //                 // We assume that the URL passed in is URI-encoded, but this makes
  //                 // sure that it's fully URI encoded; any '%'s that are encoded are
  //                 // converted back into '%'s
  //                 url = encodeURI(url).replace(/%25/g, "%");

  //                 // Check the State
  //                 if (History.getHashByUrl(url)) {
  //                     throw new Error('History.js does not support states with fragment-identifiers (hashes/anchors).');
  //                 }

  //                 // Handle Queueing
  //                 if (queue !== false && History.busy()) {
  //                     // Wait + Push to Queue
  //                     //History.debug('History.pushState: we must wait', arguments);
  //                     History.pushQueue({
  //                         scope: History,
  //                         callback: History.pushState,
  //                         args: arguments,
  //                         queue: queue
  //                     });
  //                     return false;
  //                 }

  //                 // Make Busy
  //                 History.busy(true);

  //                 // Fetch the State Object
  //                 var newState = History.createStateObject(data, title, url),
  //           newStateHash = History.getHashByState(newState),
  //           oldState = History.getState(false),
  //           oldStateHash = History.getHashByState(oldState),
  //           html4Hash = History.getHash(),
  //           wasExpected = History.expectedStateId == newState.id;

  //                 // Store the newState
  //                 History.storeState(newState);
  //                 History.expectedStateId = newState.id;

  //                 // Recycle the State
  //                 History.recycleState(newState);

  //                 // Force update of the title
  //                 History.setTitle(newState);

  //                 // Check if we are the same State
  //                 if (newStateHash === oldStateHash) {
  //                     //History.debug('History.pushState: no change', newStateHash);
  //                     History.busy(false);
  //                     return false;
  //                 }

  //                 // Update HTML5 State
  //                 History.saveState(newState);

  //                 // Fire HTML5 Event
  //                 if (!wasExpected)
  //                     History.Adapter.trigger(window, 'statechange');

  //                 // Update HTML4 Hash
  //                 if (!History.isHashEqual(newStateHash, html4Hash) && !History.isHashEqual(newStateHash, History.getShortUrl(History.getLocationHref()))) {
  //                     History.setHash(newStateHash, false);
  //                 }

  //                 History.busy(false);

  //                 // End pushState closure
  //                 return true;
  //             };

  //             /**
  //        * History.replaceState(data,title,url)
  //        * Replace the State and trigger onpopstate
  //        * We have to trigger for HTML4 compatibility
  //        * @param {object} data
  //        * @param {string} title
  //        * @param {string} url
  //        * @return {true}
  //        */
  //             History.replaceState = function (data, title, url, queue) {
  //                 //History.debug('History.replaceState: called', arguments);

  //                 // We assume that the URL passed in is URI-encoded, but this makes
  //                 // sure that it's fully URI encoded; any '%'s that are encoded are
  //                 // converted back into '%'s
  //                 url = encodeURI(url).replace(/%25/g, "%");

  //                 // Check the State
  //                 if (History.getHashByUrl(url)) {
  //                     throw new Error('History.js does not support states with fragment-identifiers (hashes/anchors).');
  //                 }

  //                 // Handle Queueing
  //                 if (queue !== false && History.busy()) {
  //                     // Wait + Push to Queue
  //                     //History.debug('History.replaceState: we must wait', arguments);
  //                     History.pushQueue({
  //                         scope: History,
  //                         callback: History.replaceState,
  //                         args: arguments,
  //                         queue: queue
  //                     });
  //                     return false;
  //                 }

  //                 // Make Busy
  //                 History.busy(true);

  //                 // Fetch the State Objects
  //                 var newState = History.createStateObject(data, title, url),
  //           newStateHash = History.getHashByState(newState),
  //           oldState = History.getState(false),
  //           oldStateHash = History.getHashByState(oldState),
  //           previousState = History.getStateByIndex(-2);

  //                 // Discard Old State
  //                 History.discardState(oldState, newState, previousState);

  //                 // If the url hasn't changed, just store and save the state
  //                 // and fire a statechange event to be consistent with the
  //                 // html 5 api
  //                 if (newStateHash === oldStateHash) {
  //                     // Store the newState
  //                     History.storeState(newState);
  //                     History.expectedStateId = newState.id;

  //                     // Recycle the State
  //                     History.recycleState(newState);

  //                     // Force update of the title
  //                     History.setTitle(newState);

  //                     // Update HTML5 State
  //                     History.saveState(newState);

  //                     // Fire HTML5 Event
  //                     //History.debug('History.pushState: trigger popstate');
  //                     History.Adapter.trigger(window, 'statechange');
  //                     History.busy(false);
  //                 }
  //                 else {
  //                     // Alias to PushState
  //                     History.pushState(newState.data, newState.title, newState.url, false);
  //                 }

  //                 // End replaceState closure
  //                 return true;
  //             };

  //         } // History.emulated.pushState



  //         // ====================================================================
  //         // Initialise

  //         // Non-Native pushState Implementation
  //         if (History.emulated.pushState) {
  //             /**
  //        * Ensure initial state is handled correctly
  //        */
  //             if (History.getHash() && !History.emulated.hashChange) {
  //                 History.Adapter.onDomLoad(function () {
  //                     History.Adapter.trigger(window, 'hashchange');
  //                 });
  //             }

  //         } // History.emulated.pushState

  //     }; // History.initHtml4

  //     // Try to Initialise History
  //     if (typeof History.init !== 'undefined') {
  //         History.init();
  //     }

  // })(window);
  // /**
  //  * History.js Core
  //  * @author Benjamin Arthur Lupton <contact@balupton.com>
  //  * @copyright 2010-2011 Benjamin Arthur Lupton <contact@balupton.com>
  //  * @license New BSD License <http://creativecommons.org/licenses/BSD/>
  //  */

  // (function (window, undefined) {
  //     "use strict";

  //     // ========================================================================
  //     // Initialise

  //     // Localise Globals
  //     var
  //     console = window.console || undefined, // Prevent a JSLint complain
  //     document = window.document, // Make sure we are using the correct document
  //     navigator = window.navigator, // Make sure we are using the correct navigator
  //     sessionStorage = false, // sessionStorage
  //     setTimeout = window.setTimeout,
  //     clearTimeout = window.clearTimeout,
  //     setInterval = window.setInterval,
  //     clearInterval = window.clearInterval,
  //     JSON = window.JSON,
  //     alert = window.alert,
  //     History = window.History = window.History || {}, // Public History Object
  //     history = window.history; // Old History Object

  //     try {
  //         sessionStorage = window.sessionStorage; // This will throw an exception in some browsers when cookies/localStorage are explicitly disabled (i.e. Chrome)
  //         sessionStorage.setItem('TEST', '1');
  //         sessionStorage.removeItem('TEST');
  //     } catch (e) {
  //         sessionStorage = false;
  //     }

  //     // MooTools Compatibility
  //     JSON.stringify = JSON.stringify || JSON.encode;
  //     JSON.parse = JSON.parse || JSON.decode;

  //     // Check Existence
  //     if (typeof History.init !== 'undefined') {
  //         throw new Error('History.js Core has already been loaded...');
  //     }

  //     // Initialise History
  //     History.init = function (options) {
  //         // Check Load Status of Adapter
  //         if (typeof History.Adapter === 'undefined') {
  //             return false;
  //         }

  //         // Check Load Status of Core
  //         if (typeof History.initCore !== 'undefined') {
  //             History.initCore();
  //         }

  //         // Check Load Status of HTML4 Support
  //         if (typeof History.initHtml4 !== 'undefined') {
  //             History.initHtml4();
  //         }

  //         // Return true
  //         return true;
  //     };


  //     // ========================================================================
  //     // Initialise Core

  //     // Initialise Core
  //     History.initCore = function (options) {
  //         // Initialise
  //         if (typeof History.initCore.initialized !== 'undefined') {
  //             // Already Loaded
  //             return false;
  //         }
  //         else {
  //             History.initCore.initialized = true;
  //         }


  //         // ====================================================================
  //         // Options

  //         /**
  //      * History.options
  //      * Configurable options
  //      */
  //         History.options = History.options || {};

  //         /**
  //      * History.options.hashChangeInterval
  //      * How long should the interval be before hashchange checks
  //      */
  //         History.options.hashChangeInterval = History.options.hashChangeInterval || 100;

  //         /**
  //      * History.options.safariPollInterval
  //      * How long should the interval be before safari poll checks
  //      */
  //         History.options.safariPollInterval = History.options.safariPollInterval || 500;

  //         /**
  //      * History.options.doubleCheckInterval
  //      * How long should the interval be before we perform a double check
  //      */
  //         History.options.doubleCheckInterval = History.options.doubleCheckInterval || 500;

  //         /**
  //      * History.options.disableSuid
  //      * Force History not to append suid
  //      */
  //         History.options.disableSuid = History.options.disableSuid || false;

  //         /**
  //      * History.options.storeInterval
  //      * How long should we wait between store calls
  //      */
  //         History.options.storeInterval = History.options.storeInterval || 1000;

  //         /**
  //      * History.options.busyDelay
  //      * How long should we wait between busy events
  //      */
  //         History.options.busyDelay = History.options.busyDelay || 250;

  //         /**
  //      * History.options.debug
  //      * If true will enable debug messages to be logged
  //      */
  //         History.options.debug = History.options.debug || false;

  //         /**
  //      * History.options.initialTitle
  //      * What is the title of the initial state
  //      */
  //         History.options.initialTitle = History.options.initialTitle || document.title;

  //         /**
  //      * History.options.html4Mode
  //      * If true, will force HTMl4 mode (hashtags)
  //      */
  //         History.options.html4Mode = History.options.html4Mode || false;

  //         /**
  //      * History.options.delayInit
  //      * Want to override default options and call init manually.
  //      */
  //         History.options.delayInit = History.options.delayInit || false;


  //         // ====================================================================
  //         // Interval record

  //         /**
  //      * History.intervalList
  //      * List of intervals set, to be cleared when document is unloaded.
  //      */
  //         History.intervalList = [];

  //         /**
  //      * History.clearAllIntervals
  //      * Clears all setInterval instances.
  //      */
  //         History.clearAllIntervals = function () {
  //             var i, il = History.intervalList;
  //             if (typeof il !== "undefined" && il !== null) {
  //                 for (i = 0; i < il.length; i++) {
  //                     clearInterval(il[i]);
  //                 }
  //                 History.intervalList = null;
  //             }
  //         };


  //         // ====================================================================
  //         // Debug

  //         /**
  //      * History.debug(message,...)
  //      * Logs the passed arguments if debug enabled
  //      */
  //         History.debug = function () {
  //             if ((History.options.debug || false)) {
  //                 History.log.apply(History, arguments);
  //             }
  //         };

  //         /**
  //      * History.log(message,...)
  //      * Logs the passed arguments
  //      */
  //         History.log = function () {
  //             // Prepare
  //             var
  //         consoleExists = !(typeof console === 'undefined' || typeof console.log === 'undefined' || typeof console.log.apply === 'undefined'),
  //         textarea = document.getElementById('log'),
  //         message,
  //         i, n,
  //         args, arg
  //             ;

  //             // Write to Console
  //             if (consoleExists) {
  //                 args = Array.prototype.slice.call(arguments);
  //                 message = args.shift();
  //                 if (typeof console.debug !== 'undefined') {
  //                     console.debug.apply(console, [message, args]);
  //                 }
  //                 else {
  //                     console.log.apply(console, [message, args]);
  //                 }
  //             }
  //             else {
  //                 message = ("\n" + arguments[0] + "\n");
  //             }

  //             // Write to log
  //             for (i = 1, n = arguments.length; i < n; ++i) {
  //                 arg = arguments[i];
  //                 if (typeof arg === 'object' && typeof JSON !== 'undefined') {
  //                     try {
  //                         arg = JSON.stringify(arg);
  //                     }
  //                     catch (Exception) {
  //                         // Recursive Object
  //                     }
  //                 }
  //                 message += "\n" + arg + "\n";
  //             }

  //             // Textarea
  //             if (textarea) {
  //                 textarea.value += message + "\n-----\n";
  //                 textarea.scrollTop = textarea.scrollHeight - textarea.clientHeight;
  //             }
  //                 // No Textarea, No Console
  //             else if (!consoleExists) {
  //                 alert(message);
  //             }

  //             // Return true
  //             return true;
  //         };


  //         // ====================================================================
  //         // Emulated Status

  //         /**
  //      * History.getInternetExplorerMajorVersion()
  //      * Get's the major version of Internet Explorer
  //      * @return {integer}
  //      * @license Public Domain
  //      * @author Benjamin Arthur Lupton <contact@balupton.com>
  //      * @author James Padolsey <https://gist.github.com/527683>
  //      */
  //         History.getInternetExplorerMajorVersion = function () {
  //             var result = History.getInternetExplorerMajorVersion.cached =
  //           (typeof History.getInternetExplorerMajorVersion.cached !== 'undefined')
  //         ? History.getInternetExplorerMajorVersion.cached
  //         : (function () {
  //             var v = 3,
  //                             div = document.createElement('div'),
  //                             all = div.getElementsByTagName('i');
  //             while ((div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->') && all[0]) { }
  //             return (v > 4) ? v : false;
  //         })()
  //             ;
  //             return result;
  //         };

  //         /**
  //      * History.isInternetExplorer()
  //      * Are we using Internet Explorer?
  //      * @return {boolean}
  //      * @license Public Domain
  //      * @author Benjamin Arthur Lupton <contact@balupton.com>
  //      */
  //         History.isInternetExplorer = function () {
  //             var result =
  //         History.isInternetExplorer.cached =
  //         (typeof History.isInternetExplorer.cached !== 'undefined')
  //           ? History.isInternetExplorer.cached
  //           : Boolean(History.getInternetExplorerMajorVersion())
  //             ;
  //             return result;
  //         };

  //         /**
  //      * History.emulated
  //      * Which features require emulating?
  //      */

  //         if (History.options.html4Mode) {
  //             History.emulated = {
  //                 pushState: true,
  //                 hashChange: true
  //             };
  //         }

  //         else {

  //             History.emulated = {
  //                 pushState: !Boolean(
  //           window.history && window.history.pushState && window.history.replaceState
  //           && !(
  //             (/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i).test(navigator.userAgent) /* disable for versions of iOS before version 4.3 (8F190) */
  //             || (/AppleWebKit\/5([0-2]|3[0-2])/i).test(navigator.userAgent) /* disable for the mercury iOS browser, or at least older versions of the webkit engine */
  //           )
  //         ),
  //                 hashChange: Boolean(
  //           !(('onhashchange' in window) || ('onhashchange' in document))
  //           ||
  //           (History.isInternetExplorer() && History.getInternetExplorerMajorVersion() < 8)
  //         )
  //             };
  //         }

  //         /**
  //      * History.enabled
  //      * Is History enabled?
  //      */
  //         History.enabled = !History.emulated.pushState;

  //         /**
  //      * History.bugs
  //      * Which bugs are present
  //      */
  //         History.bugs = {
  //             /**
  //        * Safari 5 and Safari iOS 4 fail to return to the correct state once a hash is replaced by a `replaceState` call
  //        * https://bugs.webkit.org/show_bug.cgi?id=56249
  //        */
  //             setHash: Boolean(!History.emulated.pushState && navigator.vendor === 'Apple Computer, Inc.' && /AppleWebKit\/5([0-2]|3[0-3])/.test(navigator.userAgent)),

  //             /**
  //        * Safari 5 and Safari iOS 4 sometimes fail to apply the state change under busy conditions
  //        * https://bugs.webkit.org/show_bug.cgi?id=42940
  //        */
  //             safariPoll: Boolean(!History.emulated.pushState && navigator.vendor === 'Apple Computer, Inc.' && /AppleWebKit\/5([0-2]|3[0-3])/.test(navigator.userAgent)),

  //             /**
  //        * MSIE 6 and 7 sometimes do not apply a hash even it was told to (requiring a second call to the apply function)
  //        */
  //             ieDoubleCheck: Boolean(History.isInternetExplorer() && History.getInternetExplorerMajorVersion() < 8),

  //             /**
  //        * MSIE 6 requires the entire hash to be encoded for the hashes to trigger the onHashChange event
  //        */
  //             hashEscape: Boolean(History.isInternetExplorer() && History.getInternetExplorerMajorVersion() < 7)
  //         };

  //         /**
  //      * History.isEmptyObject(obj)
  //      * Checks to see if the Object is Empty
  //      * @param {Object} obj
  //      * @return {boolean}
  //      */
  //         History.isEmptyObject = function (obj) {
  //             for (var name in obj) {
  //                 if (obj.hasOwnProperty(name)) {
  //                     return false;
  //                 }
  //             }
  //             return true;
  //         };

  //         /**
  //      * History.cloneObject(obj)
  //      * Clones a object and eliminate all references to the original contexts
  //      * @param {Object} obj
  //      * @return {Object}
  //      */
  //         History.cloneObject = function (obj) {
  //             var hash, newObj;
  //             if (obj) {
  //                 hash = JSON.stringify(obj);
  //                 newObj = JSON.parse(hash);
  //             }
  //             else {
  //                 newObj = {};
  //             }
  //             return newObj;
  //         };


  //         // ====================================================================
  //         // URL Helpers

  //         /**
  //      * History.getRootUrl()
  //      * Turns "http://mysite.com/dir/page.html?asd" into "http://mysite.com"
  //      * @return {String} rootUrl
  //      */
  //         History.getRootUrl = function () {
  //             // Create
  //             var rootUrl = document.location.protocol + '//' + (document.location.hostname || document.location.host);
  //             if (document.location.port || false) {
  //                 rootUrl += ':' + document.location.port;
  //             }
  //             rootUrl += '/';

  //             // Return
  //             return rootUrl;
  //         };

  //         /**
  //      * History.getBaseHref()
  //      * Fetches the `href` attribute of the `<base href="...">` element if it exists
  //      * @return {String} baseHref
  //      */
  //         History.getBaseHref = function () {
  //             // Create
  //             var
  //         baseElements = document.getElementsByTagName('base'),
  //         baseElement = null,
  //         baseHref = '';

  //             // Test for Base Element
  //             if (baseElements.length === 1) {
  //                 // Prepare for Base Element
  //                 baseElement = baseElements[0];
  //                 baseHref = baseElement.href.replace(/[^\/]+$/, '');
  //             }

  //             // Adjust trailing slash
  //             baseHref = baseHref.replace(/\/+$/, '');
  //             if (baseHref) baseHref += '/';

  //             // Return
  //             return baseHref;
  //         };

  //         /**
  //      * History.getBaseUrl()
  //      * Fetches the baseHref or basePageUrl or rootUrl (whichever one exists first)
  //      * @return {String} baseUrl
  //      */
  //         History.getBaseUrl = function () {
  //             // Create
  //             var baseUrl = History.getBaseHref() || History.getBasePageUrl() || History.getRootUrl();

  //             // Return
  //             return baseUrl;
  //         };

  //         /**
  //      * History.getPageUrl()
  //      * Fetches the URL of the current page
  //      * @return {String} pageUrl
  //      */
  //         History.getPageUrl = function () {
  //             // Fetch
  //             var
  //         State = History.getState(false, false),
  //         stateUrl = (State || {}).url || History.getLocationHref(),
  //         pageUrl;

  //             // Create
  //             pageUrl = stateUrl.replace(/\/+$/, '').replace(/[^\/]+$/, function (part, index, string) {
  //                 return (/\./).test(part) ? part : part + '/';
  //             });

  //             // Return
  //             return pageUrl;
  //         };

  //         /**
  //      * History.getBasePageUrl()
  //      * Fetches the Url of the directory of the current page
  //      * @return {String} basePageUrl
  //      */
  //         History.getBasePageUrl = function () {
  //             // Create
  //             var basePageUrl = (History.getLocationHref()).replace(/[#\?].*/, '').replace(/[^\/]+$/, function (part, index, string) {
  //                 return (/[^\/]$/).test(part) ? '' : part;
  //             }).replace(/\/+$/, '') + '/';

  //             // Return
  //             return basePageUrl;
  //         };

  //         /**
  //      * History.getFullUrl(url)
  //      * Ensures that we have an absolute URL and not a relative URL
  //      * @param {string} url
  //      * @param {Boolean} allowBaseHref
  //      * @return {string} fullUrl
  //      */
  //         History.getFullUrl = function (url, allowBaseHref) {
  //             // Prepare
  //             var fullUrl = url, firstChar = url.substring(0, 1);
  //             allowBaseHref = (typeof allowBaseHref === 'undefined') ? true : allowBaseHref;

  //             // Check
  //             if (/[a-z]+\:\/\//.test(url)) {
  //                 // Full URL
  //             }
  //             else if (firstChar === '/') {
  //                 // Root URL
  //                 fullUrl = History.getRootUrl() + url.replace(/^\/+/, '');
  //             }
  //             else if (firstChar === '#') {
  //                 // Anchor URL
  //                 fullUrl = History.getPageUrl().replace(/#.*/, '') + url;
  //             }
  //             else if (firstChar === '?') {
  //                 // Query URL
  //                 fullUrl = History.getPageUrl().replace(/[\?#].*/, '') + url;
  //             }
  //             else {
  //                 // Relative URL
  //                 if (allowBaseHref) {
  //                     fullUrl = History.getBaseUrl() + url.replace(/^(\.\/)+/, '');
  //                 } else {
  //                     fullUrl = History.getBasePageUrl() + url.replace(/^(\.\/)+/, '');
  //                 }
  //                 // We have an if condition above as we do not want hashes
  //                 // which are relative to the baseHref in our URLs
  //                 // as if the baseHref changes, then all our bookmarks
  //                 // would now point to different locations
  //                 // whereas the basePageUrl will always stay the same
  //             }

  //             // Return
  //             return fullUrl.replace(/\#$/, '');
  //         };

  //         /**
  //      * History.getShortUrl(url)
  //      * Ensures that we have a relative URL and not a absolute URL
  //      * @param {string} url
  //      * @return {string} url
  //      */
  //         History.getShortUrl = function (url) {
  //             // Prepare
  //             var shortUrl = url, baseUrl = History.getBaseUrl(), rootUrl = History.getRootUrl();

  //             // Trim baseUrl
  //             if (History.emulated.pushState) {
  //                 // We are in a if statement as when pushState is not emulated
  //                 // The actual url these short urls are relative to can change
  //                 // So within the same session, we the url may end up somewhere different
  //                 shortUrl = shortUrl.replace(baseUrl, '');
  //             }

  //             // Trim rootUrl
  //             shortUrl = shortUrl.replace(rootUrl, '/');

  //             // Ensure we can still detect it as a state
  //             if (History.isTraditionalAnchor(shortUrl)) {
  //                 shortUrl = './' + shortUrl;
  //             }

  //             // Clean It
  //             shortUrl = shortUrl.replace(/^(\.\/)+/g, './').replace(/\#$/, '');

  //             // Return
  //             return shortUrl;
  //         };

  //         /**
  //      * History.getLocationHref(document)
  //      * Returns a normalized version of document.location.href
  //      * accounting for browser inconsistencies, etc.
  //      *
  //      * This URL will be URI-encoded and will include the hash
  //      *
  //      * @param {object} document
  //      * @return {string} url
  //      */
  //         History.getLocationHref = function (doc) {
  //             doc = doc || document;

  //             // most of the time, this will be true
  //             if (doc.URL === doc.location.href)
  //                 return doc.location.href;

  //             // some versions of webkit URI-decode document.location.href
  //             // but they leave document.URL in an encoded state
  //             if (doc.location.href === decodeURIComponent(doc.URL))
  //                 return doc.URL;

  //             // FF 3.6 only updates document.URL when a page is reloaded
  //             // document.location.href is updated correctly
  //             if (doc.location.hash && decodeURIComponent(doc.location.href.replace(/^[^#]+/, "")) === doc.location.hash)
  //                 return doc.location.href;

  //             if (doc.URL.indexOf('#') == -1 && doc.location.href.indexOf('#') != -1)
  //                 return doc.location.href;

  //             return doc.URL || doc.location.href;
  //         };


  //         // ====================================================================
  //         // State Storage

  //         /**
  //      * History.store
  //      * The store for all session specific data
  //      */
  //         History.store = {};

  //         /**
  //      * History.idToState
  //      * 1-1: State ID to State Object
  //      */
  //         History.idToState = History.idToState || {};

  //         /**
  //      * History.stateToId
  //      * 1-1: State String to State ID
  //      */
  //         History.stateToId = History.stateToId || {};

  //         /**
  //      * History.urlToId
  //      * 1-1: State URL to State ID
  //      */
  //         History.urlToId = History.urlToId || {};

  //         /**
  //      * History.storedStates
  //      * Store the states in an array
  //      */
  //         History.storedStates = History.storedStates || [];

  //         /**
  //      * History.savedStates
  //      * Saved the states in an array
  //      */
  //         History.savedStates = History.savedStates || [];

  //         /**
  //      * History.noramlizeStore()
  //      * Noramlize the store by adding necessary values
  //      */
  //         History.normalizeStore = function () {
  //             History.store.idToState = History.store.idToState || {};
  //             History.store.urlToId = History.store.urlToId || {};
  //             History.store.stateToId = History.store.stateToId || {};
  //         };

  //         /**
  //      * History.getState()
  //      * Get an object containing the data, title and url of the current state
  //      * @param {Boolean} friendly
  //      * @param {Boolean} create
  //      * @return {Object} State
  //      */
  //         History.getState = function (friendly, create) {
  //             // Prepare
  //             if (typeof friendly === 'undefined') { friendly = true; }
  //             if (typeof create === 'undefined') { create = true; }

  //             // Fetch
  //             var State = History.getLastSavedState();

  //             // Create
  //             if (!State && create) {
  //                 State = History.createStateObject();
  //             }

  //             // Adjust
  //             if (friendly) {
  //                 State = History.cloneObject(State);
  //                 State.url = State.cleanUrl || State.url;
  //             }

  //             // Return
  //             return State;
  //         };

  //         /**
  //      * History.getIdByState(State)
  //      * Gets a ID for a State
  //      * @param {State} newState
  //      * @return {String} id
  //      */
  //         History.getIdByState = function (newState) {

  //             // Fetch ID
  //             var id = History.extractId(newState.url),
  //         str;

  //             if (!id) {
  //                 // Find ID via State String
  //                 str = History.getStateString(newState);
  //                 if (typeof History.stateToId[str] !== 'undefined') {
  //                     id = History.stateToId[str];
  //                 }
  //                 else if (typeof History.store.stateToId[str] !== 'undefined') {
  //                     id = History.store.stateToId[str];
  //                 }
  //                 else {
  //                     // Generate a new ID
  //                     while (true) {
  //                         id = (new Date()).getTime() + String(Math.random()).replace(/\D/g, '');
  //                         if (typeof History.idToState[id] === 'undefined' && typeof History.store.idToState[id] === 'undefined') {
  //                             break;
  //                         }
  //                     }

  //                     // Apply the new State to the ID
  //                     History.stateToId[str] = id;
  //                     History.idToState[id] = newState;
  //                 }
  //             }

  //             // Return ID
  //             return id;
  //         };

  //         /**
  //      * History.normalizeState(State)
  //      * Expands a State Object
  //      * @param {object} State
  //      * @return {object}
  //      */
  //         History.normalizeState = function (oldState) {
  //             // Variables
  //             var newState, dataNotEmpty;

  //             // Prepare
  //             if (!oldState || (typeof oldState !== 'object')) {
  //                 oldState = {};
  //             }

  //             // Check
  //             if (typeof oldState.normalized !== 'undefined') {
  //                 return oldState;
  //             }

  //             // Adjust
  //             if (!oldState.data || (typeof oldState.data !== 'object')) {
  //                 oldState.data = {};
  //             }

  //             // ----------------------------------------------------------------

  //             // Create
  //             newState = {};
  //             newState.normalized = true;
  //             newState.title = oldState.title || '';
  //             newState.url = History.getFullUrl(oldState.url ? oldState.url : (History.getLocationHref()));
  //             newState.hash = History.getShortUrl(newState.url);
  //             newState.data = History.cloneObject(oldState.data);

  //             // Fetch ID
  //             newState.id = History.getIdByState(newState);

  //             // ----------------------------------------------------------------

  //             // Clean the URL
  //             newState.cleanUrl = newState.url.replace(/\??\&_suid.*/, '');
  //             newState.url = newState.cleanUrl;

  //             // Check to see if we have more than just a url
  //             dataNotEmpty = !History.isEmptyObject(newState.data);

  //             // Apply
  //             if ((newState.title || dataNotEmpty) && History.options.disableSuid !== true) {
  //                 // Add ID to Hash
  //                 newState.hash = History.getShortUrl(newState.url).replace(/\??\&_suid.*/, '');
  //                 if (!/\?/.test(newState.hash)) {
  //                     newState.hash += '?';
  //                 }
  //                 newState.hash += '&_suid=' + newState.id;
  //             }

  //             // Create the Hashed URL
  //             newState.hashedUrl = History.getFullUrl(newState.hash);

  //             // ----------------------------------------------------------------

  //             // Update the URL if we have a duplicate
  //             if ((History.emulated.pushState || History.bugs.safariPoll) && History.hasUrlDuplicate(newState)) {
  //                 newState.url = newState.hashedUrl;
  //             }

  //             // ----------------------------------------------------------------

  //             // Return
  //             return newState;
  //         };

  //         /**
  //      * History.createStateObject(data,title,url)
  //      * Creates a object based on the data, title and url state params
  //      * @param {object} data
  //      * @param {string} title
  //      * @param {string} url
  //      * @return {object}
  //      */
  //         History.createStateObject = function (data, title, url) {
  //             // Hashify
  //             var State = {
  //                 'data': data,
  //                 'title': title,
  //                 'url': url
  //             };

  //             // Expand the State
  //             State = History.normalizeState(State);

  //             // Return object
  //             return State;
  //         };

  //         /**
  //      * History.getStateById(id)
  //      * Get a state by it's UID
  //      * @param {String} id
  //      */
  //         History.getStateById = function (id) {
  //             // Prepare
  //             id = String(id);

  //             // Retrieve
  //             var State = History.idToState[id] || History.store.idToState[id] || undefined;

  //             // Return State
  //             return State;
  //         };

  //         /**
  //      * Get a State's String
  //      * @param {State} passedState
  //      */
  //         History.getStateString = function (passedState) {
  //             // Prepare
  //             var State, cleanedState, str;

  //             // Fetch
  //             State = History.normalizeState(passedState);

  //             // Clean
  //             cleanedState = {
  //                 data: State.data,
  //                 title: passedState.title,
  //                 url: passedState.url
  //             };

  //             // Fetch
  //             str = JSON.stringify(cleanedState);

  //             // Return
  //             return str;
  //         };

  //         /**
  //      * Get a State's ID
  //      * @param {State} passedState
  //      * @return {String} id
  //      */
  //         History.getStateId = function (passedState) {
  //             // Prepare
  //             var State, id;

  //             // Fetch
  //             State = History.normalizeState(passedState);

  //             // Fetch
  //             id = State.id;

  //             // Return
  //             return id;
  //         };

  //         /**
  //      * History.getHashByState(State)
  //      * Creates a Hash for the State Object
  //      * @param {State} passedState
  //      * @return {String} hash
  //      */
  //         History.getHashByState = function (passedState) {
  //             // Prepare
  //             var State, hash;

  //             // Fetch
  //             State = History.normalizeState(passedState);

  //             // Hash
  //             hash = State.hash;

  //             // Return
  //             return hash;
  //         };

  //         /**
  //      * History.extractId(url_or_hash)
  //      * Get a State ID by it's URL or Hash
  //      * @param {string} url_or_hash
  //      * @return {string} id
  //      */
  //         History.extractId = function (url_or_hash) {
  //             // Prepare
  //             var id, parts, url, tmp;

  //             // Extract

  //             // If the URL has a #, use the id from before the #
  //             if (url_or_hash.indexOf('#') != -1) {
  //                 tmp = url_or_hash.split("#")[0];
  //             }
  //             else {
  //                 tmp = url_or_hash;
  //             }

  //             parts = /(.*)\&_suid=([0-9]+)$/.exec(tmp);
  //             url = parts ? (parts[1] || url_or_hash) : url_or_hash;
  //             id = parts ? String(parts[2] || '') : '';

  //             // Return
  //             return id || false;
  //         };

  //         /**
  //      * History.isTraditionalAnchor
  //      * Checks to see if the url is a traditional anchor or not
  //      * @param {String} url_or_hash
  //      * @return {Boolean}
  //      */
  //         History.isTraditionalAnchor = function (url_or_hash) {
  //             // Check
  //             var isTraditional = !(/[\/\?\.]/.test(url_or_hash));

  //             // Return
  //             return isTraditional;
  //         };

  //         /**
  //      * History.extractState
  //      * Get a State by it's URL or Hash
  //      * @param {String} url_or_hash
  //      * @return {State|null}
  //      */
  //         History.extractState = function (url_or_hash, create) {
  //             // Prepare
  //             var State = null, id, url;
  //             create = create || false;

  //             // Fetch SUID
  //             id = History.extractId(url_or_hash);
  //             if (id) {
  //                 State = History.getStateById(id);
  //             }

  //             // Fetch SUID returned no State
  //             if (!State) {
  //                 // Fetch URL
  //                 url = History.getFullUrl(url_or_hash);

  //                 // Check URL
  //                 id = History.getIdByUrl(url) || false;
  //                 if (id) {
  //                     State = History.getStateById(id);
  //                 }

  //                 // Create State
  //                 if (!State && create && !History.isTraditionalAnchor(url_or_hash)) {
  //                     State = History.createStateObject(null, null, url);
  //                 }
  //             }

  //             // Return
  //             return State;
  //         };

  //         /**
  //      * History.getIdByUrl()
  //      * Get a State ID by a State URL
  //      */
  //         History.getIdByUrl = function (url) {
  //             // Fetch
  //             var id = History.urlToId[url] || History.store.urlToId[url] || undefined;

  //             // Return
  //             return id;
  //         };

  //         /**
  //      * History.getLastSavedState()
  //      * Get an object containing the data, title and url of the current state
  //      * @return {Object} State
  //      */
  //         History.getLastSavedState = function () {
  //             return History.savedStates[History.savedStates.length - 1] || undefined;
  //         };

  //         /**
  //      * History.getLastStoredState()
  //      * Get an object containing the data, title and url of the current state
  //      * @return {Object} State
  //      */
  //         History.getLastStoredState = function () {
  //             return History.storedStates[History.storedStates.length - 1] || undefined;
  //         };

  //         /**
  //      * History.hasUrlDuplicate
  //      * Checks if a Url will have a url conflict
  //      * @param {Object} newState
  //      * @return {Boolean} hasDuplicate
  //      */
  //         History.hasUrlDuplicate = function (newState) {
  //             // Prepare
  //             var hasDuplicate = false,
  //         oldState;

  //             // Fetch
  //             oldState = History.extractState(newState.url);

  //             // Check
  //             hasDuplicate = oldState && oldState.id !== newState.id;

  //             // Return
  //             return hasDuplicate;
  //         };

  //         /**
  //      * History.storeState
  //      * Store a State
  //      * @param {Object} newState
  //      * @return {Object} newState
  //      */
  //         History.storeState = function (newState) {
  //             // Store the State
  //             History.urlToId[newState.url] = newState.id;

  //             // Push the State
  //             History.storedStates.push(History.cloneObject(newState));

  //             // Return newState
  //             return newState;
  //         };

  //         /**
  //      * History.isLastSavedState(newState)
  //      * Tests to see if the state is the last state
  //      * @param {Object} newState
  //      * @return {boolean} isLast
  //      */
  //         History.isLastSavedState = function (newState) {
  //             // Prepare
  //             var isLast = false,
  //         newId, oldState, oldId;

  //             // Check
  //             if (History.savedStates.length) {
  //                 newId = newState.id;
  //                 oldState = History.getLastSavedState();
  //                 oldId = oldState.id;

  //                 // Check
  //                 isLast = (newId === oldId);
  //             }

  //             // Return
  //             return isLast;
  //         };

  //         /**
  //      * History.saveState
  //      * Push a State
  //      * @param {Object} newState
  //      * @return {boolean} changed
  //      */
  //         History.saveState = function (newState) {
  //             // Check Hash
  //             if (History.isLastSavedState(newState)) {
  //                 return false;
  //             }

  //             // Push the State
  //             History.savedStates.push(History.cloneObject(newState));

  //             // Return true
  //             return true;
  //         };

  //         /**
  //      * History.getStateByIndex()
  //      * Gets a state by the index
  //      * @param {integer} index
  //      * @return {Object}
  //      */
  //         History.getStateByIndex = function (index) {
  //             // Prepare
  //             var State = null;

  //             // Handle
  //             if (typeof index === 'undefined') {
  //                 // Get the last inserted
  //                 State = History.savedStates[History.savedStates.length - 1];
  //             }
  //             else if (index < 0) {
  //                 // Get from the end
  //                 State = History.savedStates[History.savedStates.length + index];
  //             }
  //             else {
  //                 // Get from the beginning
  //                 State = History.savedStates[index];
  //             }

  //             // Return State
  //             return State;
  //         };

  //         /**
  //      * History.getCurrentIndex()
  //      * Gets the current index
  //      * @return (integer)
  //     */
  //         History.getCurrentIndex = function () {
  //             // Prepare
  //             var index = null;

  //             // No states saved
  //             if (History.savedStates.length < 1) {
  //                 index = 0;
  //             }
  //             else {
  //                 index = History.savedStates.length - 1;
  //             }
  //             return index;
  //         };

  //         // ====================================================================
  //         // Hash Helpers

  //         /**
  //      * History.getHash()
  //      * @param {Location=} location
  //      * Gets the current document hash
  //      * Note: unlike location.hash, this is guaranteed to return the escaped hash in all browsers
  //      * @return {string}
  //      */
  //         History.getHash = function (doc) {
  //             var url = History.getLocationHref(doc),
  //         hash;
  //             hash = History.getHashByUrl(url);
  //             return hash;
  //         };

  //         /**
  //      * History.unescapeHash()
  //      * normalize and Unescape a Hash
  //      * @param {String} hash
  //      * @return {string}
  //      */
  //         History.unescapeHash = function (hash) {
  //             // Prepare
  //             var result = History.normalizeHash(hash);

  //             // Unescape hash
  //             result = decodeURIComponent(result);

  //             // Return result
  //             return result;
  //         };

  //         /**
  //      * History.normalizeHash()
  //      * normalize a hash across browsers
  //      * @return {string}
  //      */
  //         History.normalizeHash = function (hash) {
  //             // Prepare
  //             var result = hash.replace(/[^#]*#/, '').replace(/#.*/, '');

  //             // Return result
  //             return result;
  //         };

  //         /**
  //      * History.setHash(hash)
  //      * Sets the document hash
  //      * @param {string} hash
  //      * @return {History}
  //      */
  //         History.setHash = function (hash, queue) {
  //             // Prepare
  //             var State, pageUrl;

  //             // Handle Queueing
  //             if (queue !== false && History.busy()) {
  //                 // Wait + Push to Queue
  //                 //History.debug('History.setHash: we must wait', arguments);
  //                 History.pushQueue({
  //                     scope: History,
  //                     callback: History.setHash,
  //                     args: arguments,
  //                     queue: queue
  //                 });
  //                 return false;
  //             }

  //             // Log
  //             //History.debug('History.setHash: called',hash);

  //             // Make Busy + Continue
  //             History.busy(true);

  //             // Check if hash is a state
  //             State = History.extractState(hash, true);
  //             if (State && !History.emulated.pushState) {
  //                 // Hash is a state so skip the setHash
  //                 //History.debug('History.setHash: Hash is a state so skipping the hash set with a direct pushState call',arguments);

  //                 // PushState
  //                 History.pushState(State.data, State.title, State.url, false);
  //             }
  //             else if (History.getHash() !== hash) {
  //                 // Hash is a proper hash, so apply it

  //                 // Handle browser bugs
  //                 if (History.bugs.setHash) {
  //                     // Fix Safari Bug https://bugs.webkit.org/show_bug.cgi?id=56249

  //                     // Fetch the base page
  //                     pageUrl = History.getPageUrl();

  //                     // Safari hash apply
  //                     History.pushState(null, null, pageUrl + '#' + hash, false);
  //                 }
  //                 else {
  //                     // Normal hash apply
  //                     document.location.hash = hash;
  //                 }
  //             }

  //             // Chain
  //             return History;
  //         };

  //         /**
  //      * History.escape()
  //      * normalize and Escape a Hash
  //      * @return {string}
  //      */
  //         History.escapeHash = function (hash) {
  //             // Prepare
  //             var result = History.normalizeHash(hash);

  //             // Escape hash
  //             result = window.encodeURIComponent(result);

  //             // IE6 Escape Bug
  //             if (!History.bugs.hashEscape) {
  //                 // Restore common parts
  //                 result = result
  //           .replace(/\%21/g, '!')
  //           .replace(/\%26/g, '&')
  //           .replace(/\%3D/g, '=')
  //           .replace(/\%3F/g, '?');
  //             }

  //             // Return result
  //             return result;
  //         };

  //         /**
  //      * History.getHashByUrl(url)
  //      * Extracts the Hash from a URL
  //      * @param {string} url
  //      * @return {string} url
  //      */
  //         History.getHashByUrl = function (url) {
  //             // Extract the hash
  //             var hash = String(url)
  //         .replace(/([^#]*)#?([^#]*)#?(.*)/, '$2')
  //             ;

  //             // Unescape hash
  //             hash = History.unescapeHash(hash);

  //             // Return hash
  //             return hash;
  //         };

  //         /**
  //      * History.setTitle(title)
  //      * Applies the title to the document
  //      * @param {State} newState
  //      * @return {Boolean}
  //      */
  //         History.setTitle = function (newState) {
  //             // Prepare
  //             var title = newState.title,
  //         firstState;

  //             // Initial
  //             if (!title) {
  //                 firstState = History.getStateByIndex(0);
  //                 if (firstState && firstState.url === newState.url) {
  //                     title = firstState.title || History.options.initialTitle;
  //                 }
  //             }

  //             // Apply
  //             try {
  //                 document.getElementsByTagName('title')[0].innerHTML = title.replace('<', '&lt;').replace('>', '&gt;').replace(' & ', ' &amp; ');
  //             }
  //             catch (Exception) { }
  //             document.title = title;

  //             // Chain
  //             return History;
  //         };


  //         // ====================================================================
  //         // Queueing

  //         /**
  //      * History.queues
  //      * The list of queues to use
  //      * First In, First Out
  //      */
  //         History.queues = [];

  //         /**
  //      * History.busy(value)
  //      * @param {boolean} value [optional]
  //      * @return {boolean} busy
  //      */
  //         History.busy = function (value) {
  //             // Apply
  //             if (typeof value !== 'undefined') {
  //                 //History.debug('History.busy: changing ['+(History.busy.flag||false)+'] to ['+(value||false)+']', History.queues.length);
  //                 History.busy.flag = value;
  //             }
  //                 // Default
  //             else if (typeof History.busy.flag === 'undefined') {
  //                 History.busy.flag = false;
  //             }

  //             // Queue
  //             if (!History.busy.flag) {
  //                 // Execute the next item in the queue
  //                 clearTimeout(History.busy.timeout);
  //                 var fireNext = function () {
  //                     var i, queue, item;
  //                     if (History.busy.flag) return;
  //                     for (i = History.queues.length - 1; i >= 0; --i) {
  //                         queue = History.queues[i];
  //                         if (queue.length === 0) continue;
  //                         item = queue.shift();
  //                         History.fireQueueItem(item);
  //                         History.busy.timeout = setTimeout(fireNext, History.options.busyDelay);
  //                     }
  //                 };
  //                 History.busy.timeout = setTimeout(fireNext, History.options.busyDelay);
  //             }

  //             // Return
  //             return History.busy.flag;
  //         };

  //         /**
  //      * History.busy.flag
  //      */
  //         History.busy.flag = false;

  //         /**
  //      * History.fireQueueItem(item)
  //      * Fire a Queue Item
  //      * @param {Object} item
  //      * @return {Mixed} result
  //      */
  //         History.fireQueueItem = function (item) {
  //             return item.callback.apply(item.scope || History, item.args || []);
  //         };

  //         /**
  //      * History.pushQueue(callback,args)
  //      * Add an item to the queue
  //      * @param {Object} item [scope,callback,args,queue]
  //      */
  //         History.pushQueue = function (item) {
  //             // Prepare the queue
  //             History.queues[item.queue || 0] = History.queues[item.queue || 0] || [];

  //             // Add to the queue
  //             History.queues[item.queue || 0].push(item);

  //             // Chain
  //             return History;
  //         };

  //         /**
  //      * History.queue (item,queue), (func,queue), (func), (item)
  //      * Either firs the item now if not busy, or adds it to the queue
  //      */
  //         History.queue = function (item, queue) {
  //             // Prepare
  //             if (typeof item === 'function') {
  //                 item = {
  //                     callback: item
  //                 };
  //             }
  //             if (typeof queue !== 'undefined') {
  //                 item.queue = queue;
  //             }

  //             // Handle
  //             if (History.busy()) {
  //                 History.pushQueue(item);
  //             } else {
  //                 History.fireQueueItem(item);
  //             }

  //             // Chain
  //             return History;
  //         };

  //         /**
  //      * History.clearQueue()
  //      * Clears the Queue
  //      */
  //         History.clearQueue = function () {
  //             History.busy.flag = false;
  //             History.queues = [];
  //             return History;
  //         };


  //         // ====================================================================
  //         // IE Bug Fix

  //         /**
  //      * History.stateChanged
  //      * States whether or not the state has changed since the last double check was initialised
  //      */
  //         History.stateChanged = false;

  //         /**
  //      * History.doubleChecker
  //      * Contains the timeout used for the double checks
  //      */
  //         History.doubleChecker = false;

  //         /**
  //      * History.doubleCheckComplete()
  //      * Complete a double check
  //      * @return {History}
  //      */
  //         History.doubleCheckComplete = function () {
  //             // Update
  //             History.stateChanged = true;

  //             // Clear
  //             History.doubleCheckClear();

  //             // Chain
  //             return History;
  //         };

  //         /**
  //      * History.doubleCheckClear()
  //      * Clear a double check
  //      * @return {History}
  //      */
  //         History.doubleCheckClear = function () {
  //             // Clear
  //             if (History.doubleChecker) {
  //                 clearTimeout(History.doubleChecker);
  //                 History.doubleChecker = false;
  //             }

  //             // Chain
  //             return History;
  //         };

  //         /**
  //      * History.doubleCheck()
  //      * Create a double check
  //      * @return {History}
  //      */
  //         History.doubleCheck = function (tryAgain) {
  //             // Reset
  //             History.stateChanged = false;
  //             History.doubleCheckClear();

  //             // Fix IE6,IE7 bug where calling history.back or history.forward does not actually change the hash (whereas doing it manually does)
  //             // Fix Safari 5 bug where sometimes the state does not change: https://bugs.webkit.org/show_bug.cgi?id=42940
  //             if (History.bugs.ieDoubleCheck) {
  //                 // Apply Check
  //                 History.doubleChecker = setTimeout(
  //           function () {
  //               History.doubleCheckClear();
  //               if (!History.stateChanged) {
  //                   //History.debug('History.doubleCheck: State has not yet changed, trying again', arguments);
  //                   // Re-Attempt
  //                   tryAgain();
  //               }
  //               return true;
  //           },
  //           History.options.doubleCheckInterval
  //         );
  //             }

  //             // Chain
  //             return History;
  //         };


  //         // ====================================================================
  //         // Safari Bug Fix

  //         /**
  //      * History.safariStatePoll()
  //      * Poll the current state
  //      * @return {History}
  //      */
  //         History.safariStatePoll = function () {
  //             // Poll the URL

  //             // Get the Last State which has the new URL
  //             var
  //         urlState = History.extractState(History.getLocationHref()),
  //         newState;

  //             // Check for a difference
  //             if (!History.isLastSavedState(urlState)) {
  //                 newState = urlState;
  //             }
  //             else {
  //                 return;
  //             }

  //             // Check if we have a state with that url
  //             // If not create it
  //             if (!newState) {
  //                 //History.debug('History.safariStatePoll: new');
  //                 newState = History.createStateObject();
  //             }

  //             // Apply the New State
  //             //History.debug('History.safariStatePoll: trigger');
  //             History.Adapter.trigger(window, 'popstate');

  //             // Chain
  //             return History;
  //         };


  //         // ====================================================================
  //         // State Aliases

  //         /**
  //      * History.back(queue)
  //      * Send the browser history back one item
  //      * @param {Integer} queue [optional]
  //      */
  //         History.back = function (queue) {
  //             //History.debug('History.back: called', arguments);

  //             // Handle Queueing
  //             if (queue !== false && History.busy()) {
  //                 // Wait + Push to Queue
  //                 //History.debug('History.back: we must wait', arguments);
  //                 History.pushQueue({
  //                     scope: History,
  //                     callback: History.back,
  //                     args: arguments,
  //                     queue: queue
  //                 });
  //                 return false;
  //             }

  //             // Make Busy + Continue
  //             History.busy(true);

  //             // Fix certain browser bugs that prevent the state from changing
  //             History.doubleCheck(function () {
  //                 History.back(false);
  //             });

  //             // Go back
  //             history.go(-1);

  //             // End back closure
  //             return true;
  //         };

  //         /**
  //      * History.forward(queue)
  //      * Send the browser history forward one item
  //      * @param {Integer} queue [optional]
  //      */
  //         History.forward = function (queue) {
  //             //History.debug('History.forward: called', arguments);

  //             // Handle Queueing
  //             if (queue !== false && History.busy()) {
  //                 // Wait + Push to Queue
  //                 //History.debug('History.forward: we must wait', arguments);
  //                 History.pushQueue({
  //                     scope: History,
  //                     callback: History.forward,
  //                     args: arguments,
  //                     queue: queue
  //                 });
  //                 return false;
  //             }

  //             // Make Busy + Continue
  //             History.busy(true);

  //             // Fix certain browser bugs that prevent the state from changing
  //             History.doubleCheck(function () {
  //                 History.forward(false);
  //             });

  //             // Go forward
  //             history.go(1);

  //             // End forward closure
  //             return true;
  //         };

  //         /**
  //      * History.go(index,queue)
  //      * Send the browser history back or forward index times
  //      * @param {Integer} queue [optional]
  //      */
  //         History.go = function (index, queue) {
  //             //History.debug('History.go: called', arguments);

  //             // Prepare
  //             var i;

  //             // Handle
  //             if (index > 0) {
  //                 // Forward
  //                 for (i = 1; i <= index; ++i) {
  //                     History.forward(queue);
  //                 }
  //             }
  //             else if (index < 0) {
  //                 // Backward
  //                 for (i = -1; i >= index; --i) {
  //                     History.back(queue);
  //                 }
  //             }
  //             else {
  //                 throw new Error('History.go: History.go requires a positive or negative integer passed.');
  //             }

  //             // Chain
  //             return History;
  //         };


  //         // ====================================================================
  //         // HTML5 State Support

  //         // Non-Native pushState Implementation
  //         if (History.emulated.pushState) {
  //             /*
  //        * Provide Skeleton for HTML4 Browsers
  //        */

  //             // Prepare
  //             var emptyFunction = function () { };
  //             History.pushState = History.pushState || emptyFunction;
  //             History.replaceState = History.replaceState || emptyFunction;
  //         } // History.emulated.pushState

  //             // Native pushState Implementation
  //         else {
  //             /*
  //        * Use native HTML5 History API Implementation
  //        */

  //             /**
  //        * History.onPopState(event,extra)
  //        * Refresh the Current State
  //        */
  //             History.onPopState = function (event, extra) {
  //                 // Prepare
  //                 var stateId = false, newState = false, currentHash, currentState;

  //                 // Reset the double check
  //                 History.doubleCheckComplete();

  //                 // Check for a Hash, and handle apporiatly
  //                 currentHash = History.getHash();
  //                 if (currentHash) {
  //                     // Expand Hash
  //                     currentState = History.extractState(currentHash || History.getLocationHref(), true);
  //                     if (currentState) {
  //                         // We were able to parse it, it must be a State!
  //                         // Let's forward to replaceState
  //                         //History.debug('History.onPopState: state anchor', currentHash, currentState);
  //                         History.replaceState(currentState.data, currentState.title, currentState.url, false);
  //                     }
  //                     else {
  //                         // Traditional Anchor
  //                         //History.debug('History.onPopState: traditional anchor', currentHash);
  //                         History.Adapter.trigger(window, 'anchorchange');
  //                         History.busy(false);
  //                     }

  //                     // We don't care for hashes
  //                     History.expectedStateId = false;
  //                     return false;
  //                 }

  //                 // Ensure
  //                 stateId = History.Adapter.extractEventData('state', event, extra) || false;

  //                 // Fetch State
  //                 if (stateId) {
  //                     // Vanilla: Back/forward button was used
  //                     newState = History.getStateById(stateId);
  //                 }
  //                 else if (History.expectedStateId) {
  //                     // Vanilla: A new state was pushed, and popstate was called manually
  //                     newState = History.getStateById(History.expectedStateId);
  //                 }
  //                 else {
  //                     // Initial State
  //                     newState = History.extractState(History.getLocationHref());
  //                 }

  //                 // The State did not exist in our store
  //                 if (!newState) {
  //                     // Regenerate the State
  //                     newState = History.createStateObject(null, null, History.getLocationHref());
  //                 }

  //                 // Clean
  //                 History.expectedStateId = false;

  //                 // Check if we are the same state
  //                 if (History.isLastSavedState(newState)) {
  //                     // There has been no change (just the page's hash has finally propagated)
  //                     //History.debug('History.onPopState: no change', newState, History.savedStates);
  //                     History.busy(false);
  //                     return false;
  //                 }

  //                 // Store the State
  //                 History.storeState(newState);
  //                 History.saveState(newState);

  //                 // Force update of the title
  //                 History.setTitle(newState);

  //                 // Fire Our Event
  //                 History.Adapter.trigger(window, 'statechange');
  //                 History.busy(false);

  //                 // Return true
  //                 return true;
  //             };
  //             History.Adapter.bind(window, 'popstate', History.onPopState);

  //             /**
  //        * History.pushState(data,title,url)
  //        * Add a new State to the history object, become it, and trigger onpopstate
  //        * We have to trigger for HTML4 compatibility
  //        * @param {object} data
  //        * @param {string} title
  //        * @param {string} url
  //        * @return {true}
  //        */
  //             History.pushState = function (data, title, url, queue) {
  //                 //History.debug('History.pushState: called', arguments);

  //                 // Check the State
  //                 if (History.getHashByUrl(url) && History.emulated.pushState) {
  //                     throw new Error('History.js does not support states with fragement-identifiers (hashes/anchors).');
  //                 }

  //                 // Handle Queueing
  //                 if (queue !== false && History.busy()) {
  //                     // Wait + Push to Queue
  //                     //History.debug('History.pushState: we must wait', arguments);
  //                     History.pushQueue({
  //                         scope: History,
  //                         callback: History.pushState,
  //                         args: arguments,
  //                         queue: queue
  //                     });
  //                     return false;
  //                 }

  //                 // Make Busy + Continue
  //                 History.busy(true);

  //                 // Create the newState
  //                 var newState = History.createStateObject(data, title, url);

  //                 // Check it
  //                 if (History.isLastSavedState(newState)) {
  //                     // Won't be a change
  //                     History.busy(false);
  //                 }
  //                 else {
  //                     // Store the newState
  //                     History.storeState(newState);
  //                     History.expectedStateId = newState.id;

  //                     // Push the newState
  //                     history.pushState(newState.id, newState.title, newState.url);

  //                     // Fire HTML5 Event
  //                     History.Adapter.trigger(window, 'popstate');
  //                 }

  //                 // End pushState closure
  //                 return true;
  //             };

  //             /**
  //        * History.replaceState(data,title,url)
  //        * Replace the State and trigger onpopstate
  //        * We have to trigger for HTML4 compatibility
  //        * @param {object} data
  //        * @param {string} title
  //        * @param {string} url
  //        * @return {true}
  //        */
  //             History.replaceState = function (data, title, url, queue) {
  //                 //History.debug('History.replaceState: called', arguments);

  //                 // Check the State
  //                 if (History.getHashByUrl(url) && History.emulated.pushState) {
  //                     throw new Error('History.js does not support states with fragement-identifiers (hashes/anchors).');
  //                 }

  //                 // Handle Queueing
  //                 if (queue !== false && History.busy()) {
  //                     // Wait + Push to Queue
  //                     //History.debug('History.replaceState: we must wait', arguments);
  //                     History.pushQueue({
  //                         scope: History,
  //                         callback: History.replaceState,
  //                         args: arguments,
  //                         queue: queue
  //                     });
  //                     return false;
  //                 }

  //                 // Make Busy + Continue
  //                 History.busy(true);

  //                 // Create the newState
  //                 var newState = History.createStateObject(data, title, url);

  //                 // Check it
  //                 if (History.isLastSavedState(newState)) {
  //                     // Won't be a change
  //                     History.busy(false);
  //                 }
  //                 else {
  //                     // Store the newState
  //                     History.storeState(newState);
  //                     History.expectedStateId = newState.id;

  //                     // Push the newState
  //                     history.replaceState(newState.id, newState.title, newState.url);

  //                     // Fire HTML5 Event
  //                     History.Adapter.trigger(window, 'popstate');
  //                 }

  //                 // End replaceState closure
  //                 return true;
  //             };

  //         } // !History.emulated.pushState


  //         // ====================================================================
  //         // Initialise

  //         /**
  //      * Load the Store
  //      */
  //         if (sessionStorage) {
  //             // Fetch
  //             try {
  //                 History.store = JSON.parse(sessionStorage.getItem('History.store')) || {};
  //             }
  //             catch (err) {
  //                 History.store = {};
  //             }

  //             // Normalize
  //             History.normalizeStore();
  //         }
  //         else {
  //             // Default Load
  //             History.store = {};
  //             History.normalizeStore();
  //         }

  //         /**
  //      * Clear Intervals on exit to prevent memory leaks
  //      */
  //         History.Adapter.bind(window, "unload", History.clearAllIntervals);

  //         /**
  //      * Create the initial State
  //      */
  //         History.saveState(History.storeState(History.extractState(History.getLocationHref(), true)));

  //         /**
  //      * Bind for Saving Store
  //      */
  //         if (sessionStorage) {
  //             // When the page is closed
  //             History.onUnload = function () {
  //                 // Prepare
  //                 var currentStore, item, currentStoreString;

  //                 // Fetch
  //                 try {
  //                     currentStore = JSON.parse(sessionStorage.getItem('History.store')) || {};
  //                 }
  //                 catch (err) {
  //                     currentStore = {};
  //                 }

  //                 // Ensure
  //                 currentStore.idToState = currentStore.idToState || {};
  //                 currentStore.urlToId = currentStore.urlToId || {};
  //                 currentStore.stateToId = currentStore.stateToId || {};

  //                 // Sync
  //                 for (item in History.idToState) {
  //                     if (!History.idToState.hasOwnProperty(item)) {
  //                         continue;
  //                     }
  //                     currentStore.idToState[item] = History.idToState[item];
  //                 }
  //                 for (item in History.urlToId) {
  //                     if (!History.urlToId.hasOwnProperty(item)) {
  //                         continue;
  //                     }
  //                     currentStore.urlToId[item] = History.urlToId[item];
  //                 }
  //                 for (item in History.stateToId) {
  //                     if (!History.stateToId.hasOwnProperty(item)) {
  //                         continue;
  //                     }
  //                     currentStore.stateToId[item] = History.stateToId[item];
  //                 }

  //                 // Update
  //                 History.store = currentStore;
  //                 History.normalizeStore();

  //                 // In Safari, going into Private Browsing mode causes the
  //                 // Session Storage object to still exist but if you try and use
  //                 // or set any property/function of it it throws the exception
  //                 // "QUOTA_EXCEEDED_ERR: DOM Exception 22: An attempt was made to
  //                 // add something to storage that exceeded the quota." infinitely
  //                 // every second.
  //                 currentStoreString = JSON.stringify(currentStore);
  //                 try {
  //                     // Store
  //                     sessionStorage.setItem('History.store', currentStoreString);
  //                 }
  //                 catch (e) {
  //                     if (e.code === DOMException.QUOTA_EXCEEDED_ERR) {
  //                         if (sessionStorage.length) {
  //                             // Workaround for a bug seen on iPads. Sometimes the quota exceeded error comes up and simply
  //                             // removing/resetting the storage can work.
  //                             sessionStorage.removeItem('History.store');
  //                             sessionStorage.setItem('History.store', currentStoreString);
  //                         } else {
  //                             // Otherwise, we're probably private browsing in Safari, so we'll ignore the exception.
  //                         }
  //                     } else {
  //                         throw e;
  //                     }
  //                 }
  //             };

  //             // For Internet Explorer
  //             History.intervalList.push(setInterval(History.onUnload, History.options.storeInterval));

  //             // For Other Browsers
  //             History.Adapter.bind(window, 'beforeunload', History.onUnload);
  //             History.Adapter.bind(window, 'unload', History.onUnload);

  //             // Both are enabled for consistency
  //         }

  //         // Non-Native pushState Implementation
  //         if (!History.emulated.pushState) {
  //             // Be aware, the following is only for native pushState implementations
  //             // If you are wanting to include something for all browsers
  //             // Then include it above this if block

  //             /**
  //        * Setup Safari Fix
  //        */
  //             if (History.bugs.safariPoll) {
  //                 History.intervalList.push(setInterval(History.safariStatePoll, History.options.safariPollInterval));
  //             }

  //             /**
  //        * Ensure Cross Browser Compatibility
  //        */
  //             if (navigator.vendor === 'Apple Computer, Inc.' || (navigator.appCodeName || '') === 'Mozilla') {
  //                 /**
  //          * Fix Safari HashChange Issue
  //          */

  //                 // Setup Alias
  //                 History.Adapter.bind(window, 'hashchange', function () {
  //                     History.Adapter.trigger(window, 'popstate');
  //                 });

  //                 // Initialise Alias
  //                 if (History.getHash()) {
  //                     History.Adapter.onDomLoad(function () {
  //                         History.Adapter.trigger(window, 'hashchange');
  //                     });
  //                 }
  //             }

  //         } // !History.emulated.pushState


  //     }; // History.initCore

  //     // Try to Initialise History
  //     if (!History.options || !History.options.delayInit) {
  //         History.init();
  //     }

  // })(window);

  // /*!
  //  * jQuery Cookie Plugin v1.3.1
  //  * https://github.com/carhartl/jquery-cookie
  //  *
  //  * Copyright 2013 Klaus Hartl
  //  * Released under the MIT license
  //  */
  // (function ($, document, undefined) {

  //   var pluses = /\+/g;

  //   function raw(s) {
  //     return s;
  //   }

  //   function decoded(s) {
  //     return unRfc2068(decodeURIComponent(s.replace(pluses, ' ')));
  //   }

  //   function unRfc2068(value) {
  //     if (value.indexOf('"') === 0) {
  //       // This is a quoted cookie as according to RFC2068, unescape
  //       value = value.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  //     }
  //     return value;
  //   }

  //   function fromJSON(value) {
  //     return config.json ? JSON.parse(value) : value;
  //   }

  //   var config = $.cookie = function (key, value, options) {

  //     // write
  //     if (value !== undefined) {
  //       options = $.extend({}, config.defaults, options);

  //       if (value === null) {
  //         options.expires = -1;
  //       }

  //       if (typeof options.expires === 'number') {
  //         var days = options.expires, t = options.expires = new Date();
  //         t.setDate(t.getDate() + days);
  //       }

  //       value = config.json ? JSON.stringify(value) : String(value);

  //       return (document.cookie = [
  //         encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
  //         options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
  //         options.path    ? '; path=' + options.path : '',
  //         options.domain  ? '; domain=' + options.domain : '',
  //         options.secure  ? '; secure' : ''
  //       ].join(''));
  //     }

  //     // read
  //     var decode = config.raw ? raw : decoded;
  //     var cookies = document.cookie.split('; ');
  //     var result = key ? null : {};
  //     for (var i = 0, l = cookies.length; i < l; i++) {
  //       var parts = cookies[i].split('=');
  //       var name = decode(parts.shift());
  //       var cookie = decode(parts.join('='));

  //       if (key && key === name) {
  //         result = fromJSON(cookie);
  //         break;
  //       }

  //       if (!key) {
  //         result[name] = fromJSON(cookie);
  //       }
  //     }

  //     return result;
  //   };

  //   config.defaults = {};

  //   $.removeCookie = function (key, options) {
  //     if ($.cookie(key) !== null) {
  //       $.cookie(key, null, options);
  //       return true;
  //     }
  //     return false;
  //   };

  // })(jQuery, document);

  // // Proxy created on the fly
  // //var chat = $.connection.chatHub;

  // var hubConnection;
  // var isAppointmentHubConnected = 0;
  // function RegisterSignalRConnection()
  // {
  // hubConnection = $.hubConnection();
  // hubConnection.url = $('#txtSignalRURL').val();
  // hubConnection.qs = { 'memberId': $('#hdnUserId').val(), 'memberName': $('#hdnUserName').val(), 'memberLoginName': $('#hdnUserLoginName').val() };

  // }

//   RegisterSignalRConnection();
  /*

  Copyright (c) 2009 Anant Garg (anantgarg.com | inscripts.com)

  This script may be used for non-commercial purposes only. For any
  commercial purposes, please contact the author at
  anant.garg@inscripts.com

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  OTHER DEALINGS IN THE SOFTWARE.

  */

//   var windowFocus = true;
//   var username;
//   var chatHeartbeatCount = 0;
//   var minChatHeartbeat = 1000;
//   var maxChatHeartbeat = 33000;
//   var chatHeartbeatTime = minChatHeartbeat;
//   var originalTitle;
//   var blinkOrder = 0;

//   var chatboxFocus = new Array();
//   var newMessages = new Array();
//   var newMessagesWin = new Array();
//   var chatBoxes = new Array();
//   var chatHistory = [];
//   var ischathistory = false;
//   var ChatIds = " ";
//   var vcapik = vcsid = vctkid = "";

//   $(document).ready(function () {

//       var currentVideoSessionId = null;

//       $('.chatUserScroll').perfectScrollbar();

//       var chatHubProxy = hubConnection.createHubProxy('chatHub');

//       chatHubProxy.on('OnlineStatus', function (userList) {
//           chatHubProxy.updateOnlineStatus(userList);
//       });

//       chatHubProxy.on('joined', function (userList) {
//           chatHubProxy.updateOnlineStatus(userList);
//       });

//       chatHubProxy.updateOnlineStatus = function (userList) {
//           var cnt = 1;
//           $('a.UserItem').removeClass("online");
//           $('a.UserItem > i').removeClass("online");
//           $('a.UserItem').parents('li').data('onln', 0);
//           $(userList).each(function (index, obj) {
//               $('a.UserItem').each(function (aIndex, aObj) {
//                   if ($(this).attr("data-userid") == obj.userId) {
//                       $(this).addClass('online');
//                       $(this).children(":first").addClass('online');
//                       $(this).parents('li').data('onln', 1);
//                       cnt++;
//                   }
//               });
//           });
//           var mylist = $('ul.chatusrlst');
//           var listitems = mylist.children('li').get();
//           //listitems.sort(function (a, b) {
//           //    return $(b).data('onln').toString().localeCompare($(a).data('onln').toString());
//           //})
//           $.each(listitems, function (idx, itm) { mylist.append(itm); });
//           $('#lblcnt').html(cnt);
//       };

//       chatHubProxy.on('StartVideoChat', function (videoChatSessionInfo) {
//           currentVideoSessionId = videoChatSessionInfo.SessionId;
//           $('#spnVideoChatMessage').html(videoChatSessionInfo.FromName);
//           $('#videoChatConfirmationDialog').modal('show');
//       });

//       chatHubProxy.on('JoinVideoChat', function (videoChatInfo) {
//           //initializeVideoChatSession(videoChatAPIKey, videoChatSessionId, videoChatToken)
//           vcapik = videoChatInfo.AppId;
//           vcsid = videoChatInfo.SessionId;
//           vctkid = videoChatInfo.TokenId;
//           window.open('../chat/VideoChat', '_blank');
//       });

//       chatHubProxy.on('VideoChatError', function () {
//           alert('Error while starting video chat.');
//       });

//       $('body').on('click', '#imVideoChat', function () {

//          var chtBox = $(this).parents('#divChatWindow');
//           var memId = $("#hdnUserId").val();
//           var toId = chtBox.attr('chattoid');
//           var isgrpChat = chtBox.attr('isgroupchat');
//           var chtName = chtBox.find('.chatboxtitle').text();
//           chatHubProxy.invoke("initiateVideo", memId, toId, isgrpChat, chtName);
//           //chatHubProxy.invoke("startVideoChat", memId, toId, isgrpChat, chtName);
//           //chatHubProxy.invoke("testmt");
//       });

//       $('body').on('click', '#imAppVideoChat', function () {

//           var memId = $("#hdnUserId").val();
//           chatHubProxy.invoke("StartAppointmentVideoChat", memId, "1_MX40NjExNzQyMn5-MTUzNzg5MDAzNzY5M344L2NsVktZa056TFMwU3UvUm1pbmZLcm1-QX4");

//           //var chtBox = $(this).parents('#divChatWindow');
//           //var memId = $("#hdnUserId").val();
//           //var toId = chtBox.attr('chattoid');
//           //var isgrpChat = chtBox.attr('isgroupchat');
//           //var chtName = chtBox.find('.chatboxtitle').text();
//           //chatHubProxy.invoke("initiateVideo", memId, toId, isgrpChat, chtName);
//           ////chatHubProxy.invoke("startVideoChat", memId, toId, isgrpChat, chtName);
//           ////chatHubProxy.invoke("testmt");
//       });

//       chatHubProxy.on('StartAppointmentVideoChat', function (videoChatInfo) {
//           //initializeVideoChatSession(videoChatAPIKey, videoChatSessionId, videoChatToken)
//           vcapik = videoChatInfo.AppId;
//           vcsid = videoChatInfo.SessionId;
//           vctkid = videoChatInfo.TokenId;
//           window.open('../chat/VideoChat', '_blank');
//       });


//       $('body').on('click', '#btnJoinVideoChat', function () {
//           $('#videoChatConfirmationDialog').modal('hide');
//           chatHubProxy.invoke("joinvideochat", $("#hdnUserId").val(), currentVideoSessionId);
//       });

//       $('body').on('click', '#btnCancelVideoChat', function () {
//           $('#videoChatConfirmationDialog').modal('hide');
//       });

//       // Declare a function on the chat hub so the server can invoke it
//       chatHubProxy.on('addMessage', function (messageInfo) {
//           var msgDate = new Date(new Date(messageInfo.MessageDate).setTime(new Date(messageInfo.MessageDate).getTime() + ((-1 * parseInt($.cookie("timezoneoffset"), 10)) * 60 * 1000)));
//           msgDate = msgDate.toLocaleDateString() + " " + msgDate.toLocaleTimeString();
//           var chatBoxTitle = messageInfo.Displayname;
//           if (messageInfo.IsGroupChat == true) {
//               chatBoxTitle = $("a.UserItem[data-chatgroupid='" + messageInfo.ChatGroupId + "']").data('displayname');
//           }
//           //var msgDate = dateFormat(new Date(new Date(messageInfo.MessageDate).setTime(new Date(messageInfo.MessageDate).getTime() + ((-1 * parseInt($.cookie("timezoneoffset"), 10)) * 60 * 1000))), "yyyy-mm-dd h:MM TT");
//           //var msgDate = new Date(messageInfo.MessageDate).format('isoDateTime', false);
//           var chatWindow = $('div[groupname=' + messageInfo.GroupName + ']');
//           if (chatWindow.length == 0) {
//               ischathistory = true;
//               createChatBox(messageInfo.IsGroupChat == true ? messageInfo.ChatGroupId : messageInfo.FromId, chatBoxTitle, messageInfo.GroupName, ischathistory, messageInfo.IsGroupChat);

//           }
//           else {
//               //// chatWindow = $('div[groupname=' + groupName + ']');
//               ////$('div[groupname=' + groupName + ']').find('ul').append('<LI>' + message + '');
//               //var chtCnt = $(chatWindow).find('.chatboxcontent');
//               //chtCnt.append('<div class="chatboxmessage"><span class="chatboxmessagefrom">' + messageInfo.Displayname + '&nbsp;&nbsp;<span style="float:right;"><i>' + msgDate + '<i></span></span><br/><br/><span class="chatboxmessagecontent">' + messageInfo.Message + '</span><br/></div>');
//               //chtCnt.scrollTop(chtCnt.prop('scrollHeight'));
//               //$(chatWindow).css('bottom', '0px');
//               //$(chatWindow).find('.chatboxtextarea').focus();
//               UpdateChatboxMessages(chatWindow, messageInfo.Displayname, messageInfo.Message, msgDate);
//           }
//           openChatBox(messageInfo.GroupName);
//           restructureChatBoxes();
//           playNewchatSound();
//       });

//       function UpdateChatboxMessages(messagebox, displayname, message, messagedate) {
//           var chtCnt = $(messagebox).find('.chatboxcontent');
//           chtCnt.append('<div class="chatboxmessage"><span class="chatboxmessagefrom">' + displayname + '&nbsp;&nbsp;<span style="float:right;"><i>' + messagedate + '<i></span></span><br/><br/><span class="chatboxmessagecontent">' + message + '</span><br/></div>');
//           chtCnt.scrollTop(chtCnt.prop('scrollHeight'));
//           $(messagebox).css('bottom', '0px');
//           $(messagebox).find('.chatboxtextarea').focus();
//       }

//       chatHubProxy.on('heartbeat', function () {
//           chatHubProxy.invoke("heartbeat", $('#hdnUserId').val());
//       });

//       $("#broadcast").click(function () {
//           // Call the chat method on the server
//           chatHubProxy.invoke("send", $('#msg').val());
//           //chatHubProxy.server.send($('#msg').val());
//       });

//       //// Start the connection
//       //$.connection.hub.start(function () {
//       //    getOnlineStatus();
//       //    chatHubProxy.server.loadActiveUsers($('#hdnUserId').val());
//       //});
//       hubConnection.start()
//           .done(function () {
//               getOnlineStatus();
//               chatHubProxy.invoke("loadActiveUsers", $('#hdnUserId').val());
//           })
//           .fail(function () { console.log('Could not connect'); });


//       function getOnlineStatus() {
//           chatHubProxy.invoke("getAllOnlineStatus");
//           //chatHubProxy.server.getAllOnlineStatus();
//           //setTimeout(getOnlineStatus, 30000);
//       };

//       $('body').on('click', '.UserItem', function () {
//           ischathistory = true;
//           //if ($(this).hasClass('online')) {
//           var chtGrpId = $(this).data('chatgroupid');
//           var isGroupChat = (chtGrpId == null || chtGrpId == '' || chtGrpId == undefined) ? false : true;
//           var chtToContactId = isGroupChat == true ? chtGrpId : $(this).attr('data-userid');
//           createChatBox(chtToContactId, $(this).data('displayname'), null, ischathistory, isGroupChat);
//           //}
//           return false;
//       });

//       function createChatBox(chatToId, displayname, groupName, ischathistory, isGroupChat) {
//           var chtBox = $('div[groupname="' + groupName + '"]');
//           var fromUserId = $('#hdnUserId').val();
//           var loadUrl = $('.UserItem').data('load-url');
//           var result;

//           //chatHubProxy.server.insertActiveUsers(fromUserId, chatToId);
//           if (chtBox.length == 0) {
//               if (typeof groupName == 'undefined' || $.trim(groupName) == '' || groupName == null) {
//                   chatHubProxy.invoke("createGroup", $('#hdnUserId').val(), chatToId, isGroupChat, displayname);
//                   //chatHubProxy.server.createGroup($('#hdnUserId').val(), chatToId);
//               }
//               else {
//                   createAndRegisterChatboxEvents(chatToId, displayname, groupName, isGroupChat);
//               }
//           }
//           else {
//               chtBox.css('display', 'block');
//               chtBox.find('.chatboxcontent').css('display', 'block');
//               chtBox.find('.chatboxinput').css('display', 'block');
//               chtBox.find('.chatboxcontent').scrollTop(chtBox.prop('scrollHeight'));
//               chtBox.find('a#showPreviousMessage').css('display', 'block');
//               chtBox.find('.chatboxtextarea').focus();
//               restructureChatBoxes();
//           }

//       }

//       function createAndRegisterChatboxEvents(chatToId, displayname, groupName, isGroupChat)
//       {
//           var chtBox = $('div[groupname="' + groupName + '"]');
//           if (chtBox.length == 0) {
//               chtBox = $("#divChatWindow").clone(true);
//               chtBox.appendTo($('body'));

//               chtBox.attr('chatToId', chatToId);
//               chtBox.attr('groupname', groupName);
//               chtBox.attr('isgroupchat', isGroupChat);
//               chtBox.find('.chatboxtitle').html(displayname);

//               chtBox.css('bottom', '0px');
//               chatBoxes.push(groupName);

//           }
//           chtBox.css('display', 'block')
//           chatboxFocus[groupName] = false;
//           chtBox.show(500);
//           chtBox.find('.chatboxtextarea').focus();


//           if (!chatHistory.contains(groupName)) {
//               chatHubProxy.invoke("loadHistory", $('#hdnUserId').val(), chatToId, null, groupName, isGroupChat);
//               //chatHubProxy.server.loadHistory(fromUserId, chatToId, null);
//               chatHistory.push(groupName);
//           }

//           restructureChatBoxes();

//           $(chtBox.find('.chatboxhead')).off('click');
//           chtBox.find('.chatboxhead').click(function () {
//               toggleChatBoxGrowth(groupName);
//           });


//           chtBox.find('.closeChat').click(function () {
//               var chatToId = chtBox.attr('chatToId');
//               chatHubProxy.invoke("deleteChatWindow", $("#hdnUserId").val(), chatToId)
//               //chatHubProxy.server.deleteChatWindow($("#hdnUserId").val(), chatToId);
//               closeChatBox(groupName);
//           });

//           chtBox.find('.chatboxtextarea').blur(function () {
//               chatboxFocus[groupName] = false;
//               chtBox.find('.chatboxtextarea').removeClass('chatboxtextareaselected');
//           }).focus(function () {
//               chatboxFocus[groupName] = true;
//               newMessages[groupName] = false;
//               chtBox.find('.chatboxhead').removeClass('chatboxblink');
//               chtBox.find('.chatboxtextarea').addClass('chatboxtextareaselected');

//           });

//           chtBox.click(function () {
//               if (chtBox.find('.chatboxcontent').css('display') != 'none') {
//                   chtBox.find('.chatboxtextarea').focus();
//               }
//           });
//       }

//       chatHubProxy.on('setChatWindow', function (groupName, strChatTo, displayname, isGroupChat) {
//           createAndRegisterChatboxEvents(strChatTo, displayname, groupName, isGroupChat);
//       });

//       $('body').on('keydown', '.chatboxtextarea', function (e) {
//           //$('.chatboxtextarea').keydown(function () {
//           var code = (e.keyCode ? e.keyCode : e.which);
//           var requrl = $(this).data('req-url');
//           if (code == 13 && e.shiftKey == 0) {
//               message = $(this).val();
//               message = message.replace(/^\s+|\s+$/g, "");

//               $(this).val('');
//               $(this).focus();
//               $(this).css('height', '44px');
//               if (message != '') {
//                   message = message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;");
//                   var chtWindow = $(this).parent().parent();
//                   var strGroupName = chtWindow.attr('groupname');
//                   var chattoid = $(chtWindow).attr('chatToId');
//                   var isgroupchat = $(chtWindow).attr('isgroupchat');
//                   var chatGrpName = $(chtWindow).find('.chatboxtitle').text();
//                   if (typeof strGroupName !== 'undefined' && strGroupName !== false) {
//                       chatHubProxy.invoke("send", $("#hdnUserId").val(), $("#hdnUserName").val(), message, strGroupName, chattoid, isgroupchat, chatGrpName);
//                       //chatHubProxy.server.send($("#hdnUserId").val(), $("#hdnUserName").val(), message, strGroupName, chattoid);
//                       var msgDate = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
//                       UpdateChatboxMessages(chtWindow, $("#hdnUserName").val(), message, msgDate);
//                   }
//               }

//               return false;


//           }

//           var adjustedHeight = $(this).height;
//           var maxHeight = 94;

//           if (maxHeight > adjustedHeight) {
//               adjustedHeight = Math.max($(this).prop('scrollHeight'), adjustedHeight);
//               if (maxHeight)
//                   adjustedHeight = Math.min(maxHeight, adjustedHeight);
//               if (adjustedHeight > $(this).prop('clientHeight'))
//                   $(this).css('height', adjustedHeight + 8 + 'px');
//           } else {
//               $(this).css('overflow', 'auto');
//           }
//       });


//       originalTitle = document.title;
//       //startChatSession();

//       $([window, document]).blur(function () {
//           windowFocus = false;
//       }).focus(function () {
//           windowFocus = true;
//           document.title = originalTitle;
//       });

//       Array.prototype.contains = function (k) {
//           for (var i = 0; i < this.length; i++) {
//               if (this[i] === k) {
//                   return true;
//               }
//           }
//           return false;
//       }


//       chatHubProxy.on('LoadHistory', function (viewModel, ToUserId, groupName) {
//           var chtBox = $('div[groupname="' + groupName + '"]');
//           var chatId;
//           var chtList = $(viewModel).get().reverse();
//           $.map(chtList, function (item) {
//               var msgDate = new Date(new Date(item.MessageDate).setTime(new Date(item.MessageDate).getTime() + ((-1 * parseInt($.cookie("timezoneoffset"), 10)) * 60 * 1000)));
//               msgDate = msgDate.toLocaleDateString() + " " + msgDate.toLocaleTimeString();
//               //var msgDate = dateFormat(new Date(new Date(item.MessageDate).setTime(new Date(item.MessageDate).getTime() + ((-1 * parseInt($.cookie("timezoneoffset"), 10)) * 60 * 1000))), "yyyy-mm-dd h:MM TT");
//               //var msgDate = new Date(item.MessageDate).format('isoDateTime', false);
//               chtBox.find('.chatboxcontent').prepend('<div class="chatboxmessage"><span class="chatboxmessagefrom">' + item.Displayname + "&nbsp;&nbsp;" + '</span><span style="float:right"><i>' + msgDate + '<i></span></span><br/><br/><span class="chatboxmessagecontent">' + item.Message + '</span><br/></div>');
//               chatId = item.ChatId;
//           });
//           chtBox.find('a#showPreviousMessage').attr('data-chatid', chatId);
//           chtBox.find('a#showPreviousMessage').attr('data-ChatToId', ToUserId);
//           if (chtBox.find('a#showPreviousMessage').attr('data-chatid') == "0") {
//               chtBox.find('a#showPreviousMessage').text("No Previous Messages ");
//           }
//           chtBox.find('.chatboxcontent').animate({ scrollTop: chtBox.find('.chatboxcontent').prop('scrollHeight') }, 1000);
//       });

//       chatHubProxy.on('LoadActiveUsers', function (activeusers) {
//           $.map(activeusers, function (item) {

//               $('a.UserItem').parent().find("[data-userid='" + item.ChatToUserId + "']").trigger('click');

//           });
//       });



//       $('body').on('click', '#showPreviousMessage', function () {
//           var chatToId = $(this).attr('data-ChatToId');
//           var fromUserId = $('#hdnUserId').val();
//           var ChatId = $(this).attr('data-chatid');
//           chatHubProxy.invoke("loadHistory", fromUserId, chatToId, ChatId);
//           //chatHubProxy.server.loadHistory(fromUserId, chatToId, ChatId);



//       });
//   });


//   function chatWith(chatuser) {
//       createChatBox(chatuser);
//       $("#chatbox_" + chatuser + " .chatboxtextarea").focus();
//   }

//   function restructureChatBoxes() {
//       align = 0;
//       for (var x = 0; x < chatBoxes.length; x++) {
//           chatboxgroup = chatBoxes[x];
//           var chatWindow = $('div[groupname=' + chatboxgroup + ']');
//           if (chatWindow.css('display') != 'none') {
//               if (align == 0) {
//                   chatWindow.css('right', '20px');
//               } else {
//                   width = (align) * (470 + 7) + 20;
//                   chatWindow.css('right', width + 'px');
//               }
//               align++;
//           }
//       }
//   }


//   function createChatBox1(chatboxtitle, minimizeChatBox) {
//       if ($("#chatbox_" + chatboxtitle).length > 0) {
//           if ($("#chatbox_" + chatboxtitle).css('display') == 'none') {
//               $("#chatbox_" + chatboxtitle).css('display', 'block');
//               restructureChatBoxes();
//           }
//           $("#chatbox_" + chatboxtitle + " .chatboxtextarea").focus();
//           return;
//       }

//       $(" <div />").attr("id", "chatbox_" + chatboxtitle)
//     .addClass("chatbox")
//     .html('<div class="chatboxhead"><div class="chatboxtitle">' + chatboxtitle + '</div><div class="chatboxoptions"><a href="javascript:void(0)" onclick="javascript:toggleChatBoxGrowth(\'' + chatboxtitle + '\')">-</a> <a href="javascript:void(0)" onclick="javascript:closeChatBox(\'' + chatboxtitle + '\')">X</a></div><br clear="all"/></div><div class="chatboxcontent"></div><div class="chatboxinput"><textarea class="chatboxtextarea" onkeydown="javascript:return checkChatBoxInputKey(event,this,\'' + chatboxtitle + '\');"></textarea></div>')
//     .appendTo($("body"));

//       $("#chatbox_" + chatboxtitle).css('bottom', '0px');

//       chatBoxeslength = 0;

//       for (x in chatBoxes) {
//           if ($("#chatbox_" + chatBoxes[x]).css('display') != 'none') {
//               chatBoxeslength++;
//           }
//       }

//       if (chatBoxeslength == 0) {
//           $("#chatbox_" + chatboxtitle).css('right', '20px');
//       } else {
//           width = (chatBoxeslength) * (225 + 7) + 20;
//           $("#chatbox_" + chatboxtitle).css('right', width + 'px');
//       }

//       chatBoxes.push(chatboxtitle);

//       if (minimizeChatBox == 1) {
//           minimizedChatBoxes = new Array();

//           if ($.cookie('chatbox_minimized')) {
//               minimizedChatBoxes = $.cookie('chatbox_minimized').split(/\|/);
//           }
//           minimize = 0;
//           for (j = 0; j < minimizedChatBoxes.length; j++) {
//               if (minimizedChatBoxes[j] == chatboxtitle) {
//                   minimize = 1;
//               }
//           }

//           if (minimize == 1) {
//               $('#chatbox_' + chatboxtitle + ' .chatboxcontent').css('display', 'none');
//               $('#chatbox_' + chatboxtitle + ' .chatboxinput').css('display', 'none');
//           }
//       }

//       chatboxFocus[chatboxtitle] = false;

//       $("#chatbox_" + chatboxtitle + " .chatboxtextarea").blur(function () {
//           chatboxFocus[chatboxtitle] = false;
//           $("#chatbox_" + chatboxtitle + " .chatboxtextarea").removeClass('chatboxtextareaselected');
//       }).focus(function () {
//           chatboxFocus[chatboxtitle] = true;
//           newMessages[chatboxtitle] = false;
//           $('#chatbox_' + chatboxtitle + ' .chatboxhead').removeClass('chatboxblink');
//           $("#chatbox_" + chatboxtitle + " .chatboxtextarea").addClass('chatboxtextareaselected');
//       });

//       $("#chatbox_" + chatboxtitle).click(function () {
//           if ($('#chatbox_' + chatboxtitle + ' .chatboxcontent').css('display') != 'none') {
//               $("#chatbox_" + chatboxtitle + " .chatboxtextarea").focus();
//           }
//       });

//       $("#chatbox_" + chatboxtitle).show();
//   }




//   function chatHeartbeat() {

//       var itemsfound = 0;

//       if (windowFocus == false) {

//           var blinkNumber = 0;
//           var titleChanged = 0;
//           for (x in newMessagesWin) {
//               if (newMessagesWin[x] == true) {
//                   ++blinkNumber;
//                   if (blinkNumber >= blinkOrder) {
//                       document.title = x + ' says...';
//                       titleChanged = 1;
//                       break;
//                   }
//               }
//           }

//           if (titleChanged == 0) {
//               document.title = originalTitle;
//               blinkOrder = 0;
//           } else {
//               ++blinkOrder;
//           }

//       } else {
//           for (x in newMessagesWin) {
//               newMessagesWin[x] = false;
//           }
//       }

//       for (x in newMessages) {
//           if (newMessages[x] == true) {
//               if (chatboxFocus[x] == false) {
//                   //FIXME: add toggle all or none policy, otherwise it looks funny
//                   $('#chatbox_' + x + ' .chatboxhead').toggleClass('chatboxblink');
//               }
//           }
//       }

//       $.ajax({
//           url: "chatHubProxy.php?action=chatheartbeat",
//           cache: false,
//           dataType: "json",
//           success: function (data) {

//               $.each(data.items, function (i, item) {
//                   if (item) { // fix strange ie bug

//                       chatboxtitle = item.f;

//                       if ($("#chatbox_" + chatboxtitle).length <= 0) {
//                           createChatBox(chatboxtitle);
//                       }
//                       if ($("#chatbox_" + chatboxtitle).css('display') == 'none') {
//                           $("#chatbox_" + chatboxtitle).css('display', 'block');
//                           restructureChatBoxes();
//                       }

//                       if (item.s == 1) {
//                           item.f = username;
//                       }

//                       if (item.s == 2) {
//                           $("#chatbox_" + chatboxtitle + " .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxinfo">' + item.m + '</span></div>');
//                       } else {
//                           newMessages[chatboxtitle] = true;
//                           newMessagesWin[chatboxtitle] = true;
//                           $("#chatbox_" + chatboxtitle + " .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessagefrom">' + item.f + ':&nbsp;&nbsp;</span><br/><br/><span class="chatboxmessagecontent">' + item.m + '</span><br/></div>');
//                       }

//                       $("#chatbox_" + chatboxtitle + " .chatboxcontent").scrollTop($("#chatbox_" + chatboxtitle + " .chatboxcontent")[0].scrollHeight);
//                       itemsfound += 1;
//                   }
//               });

//               chatHeartbeatCount++;

//               if (itemsfound > 0) {
//                   chatHeartbeatTime = minChatHeartbeat;
//                   chatHeartbeatCount = 1;
//               } else if (chatHeartbeatCount >= 10) {
//                   chatHeartbeatTime *= 2;
//                   chatHeartbeatCount = 1;
//                   if (chatHeartbeatTime > maxChatHeartbeat) {
//                       chatHeartbeatTime = maxChatHeartbeat;
//                   }
//               }

//               setTimeout('chatHeartbeat();', chatHeartbeatTime);
//           }
//       });
//   }

//   function closeChatBox(groupName) {

//       $('div[groupname=' + groupName + ']').css('display', 'none');
//       restructureChatBoxes();


//   }

//   function toggleChatBoxGrowth(groupName) {
//       var chtBox = $('div[groupname=' + groupName + ']');
//       if (chtBox.find('.chatboxcontent').css('display') == 'none') {
//           chtBox.find('.chatboxhead').css("background-color", "#399bf9");
//           var minimizedChatBoxes = new Array();

//           if ($.cookie('chatbox_minimized')) {
//               minimizedChatBoxes = $.cookie('chatbox_minimized').split(/\|/);
//           }

//           var newCookie = '';

//           for (i = 0; i < minimizedChatBoxes.length; i++) {
//               if (minimizedChatBoxes[i] != groupName) {
//                   newCookie += groupName + '|';
//               }
//           }

//           newCookie = newCookie.slice(0, -1)


//           $.cookie('chatbox_minimized', newCookie);
//           chtBox.find('.chatboxcontent').show(300);
//           chtBox.find('.chatboxinput').css('display', 'block');
//           chtBox.find('a#showPreviousMessage').css('display', 'block');
//           chtBox.find('.chatboxcontent').scrollTop(chtBox.prop('scrollHeight'));
//       } else {

//           var newCookie = groupName;

//           if ($.cookie('chatbox_minimized')) {
//               newCookie += '|' + $.cookie('chatbox_minimized');
//           }


//           $.cookie('chatbox_minimized', newCookie);
//           chtBox.find('.chatboxcontent').hide(300);
//           chtBox.find('.chatboxinput').css('display', 'none');
//           chtBox.find('a#showPreviousMessage').css('display', 'none');

//       }

//   }

//   function openChatBox(groupName) {
//       var chtBox = $('div[groupname=' + groupName + ']');
//       chtBox.css('display', 'block');
//       if (chtBox.find('.chatboxcontent').css('display') == 'none') {

//           chtBox.find('.chatboxhead').css("background-color", "#EF705B");


//           /*var minimizedChatBoxes = new Array();

//           if ($.cookie('chatbox_minimized')) {
//               minimizedChatBoxes = $.cookie('chatbox_minimized').split(/\|/);
//           }

//           var newCookie = '';

//           for (i = 0; i < minimizedChatBoxes.length; i++) {
//               if (minimizedChatBoxes[i] != groupName) {
//                   newCookie += groupName + '|';
//               }
//           }

//           newCookie = newCookie.slice(0, -1)


//           $.cookie('chatbox_minimized', newCookie);
//           chtBox.find('.chatboxcontent').show(300);
//           chtBox.find('.chatboxinput').css('display', 'block');
//           chtBox.find('.chatboxcontent').scrollTop(chtBox.prop('scrollHeight'));*/
//       }
//   }

//   function checkChatBoxInputKey(event, chatboxtextarea, chatboxtitle) {

//       if (event.keyCode == 13 && event.shiftKey == 0) {
//           message = $(chatboxtextarea).val();
//           message = message.replace(/^\s+|\s+$/g, "");

//           $(chatboxtextarea).val('');
//           $(chatboxtextarea).focus();
//           $(chatboxtextarea).css('height', '44px');
//           if (message != '') {
//               $.post("chatHubProxy.php?action=sendchat", { to: chatboxtitle, message: message }, function (data) {
//                   message = message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;");
//                   $("#chatbox_" + chatboxtitle + " .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessagefrom">' + username + ':&nbsp;&nbsp;</span><br/><br/><span class="chatboxmessagecontent">' + message + '</span><br/></div>');
//                   $("#chatbox_" + chatboxtitle + " .chatboxcontent").scrollTop($("#chatbox_" + chatboxtitle + " .chatboxcontent")[0].scrollHeight);
//               });
//           }
//           chatHeartbeatTime = minChatHeartbeat;
//           chatHeartbeatCount = 1;

//           return false;
//       }

//       var adjustedHeight = chatboxtextarea.clientHeight;
//       var maxHeight = 94;

//       if (maxHeight > adjustedHeight) {
//           adjustedHeight = Math.max(chatboxtextarea.scrollHeight, adjustedHeight);
//           if (maxHeight)
//               adjustedHeight = Math.min(maxHeight, adjustedHeight);
//           if (adjustedHeight > chatboxtextarea.clientHeight)
//               $(chatboxtextarea).css('height', adjustedHeight + 8 + 'px');
//       } else {
//           $(chatboxtextarea).css('overflow', 'auto');
//       }

//   }

//   function startChatSession() {
//       $.ajax({
//           url: "chatHubProxy.php?action=startchatsession",
//           cache: false,
//           dataType: "json",
//           success: function (data) {

//               username = data.username;

//               $.each(data.items, function (i, item) {
//                   if (item) { // fix strange ie bug

//                       chatboxtitle = item.f;

//                       if ($("#chatbox_" + chatboxtitle).length <= 0) {
//                           createChatBox(chatboxtitle, 1);
//                       }

//                       if (item.s == 1) {
//                           item.f = username;
//                       }

//                       if (item.s == 2) {
//                           $("#chatbox_" + chatboxtitle + " .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxinfo">' + item.m + '</span></div>');
//                       } else {
//                           $("#chatbox_" + chatboxtitle + " .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessagefrom">' + item.f + ':&nbsp;&nbsp;</span><br/><br/><span class="chatboxmessagecontent">' + item.m + '</span><br/></div>');
//                       }
//                   }
//               });

//               for (i = 0; i < chatBoxes.length; i++) {
//                   chatboxtitle = chatBoxes[i];
//                   $("#chatbox_" + chatboxtitle + " .chatboxcontent").scrollTop($("#chatbox_" + chatboxtitle + " .chatboxcontent")[0].scrollHeight);
//                   setTimeout('$("#chatbox_"+chatboxtitle+" .chatboxcontent").scrollTop($("#chatbox_"+chatboxtitle+" .chatboxcontent")[0].scrollHeight);', 100); // yet another strange ie bug
//               }

//               setTimeout('chatHeartbeat();', chatHeartbeatTime);

//           }
//       });
//   }

//   function playNewchatSound() {
//       var snd = $('#auNewChat')[0];
//       snd.play();
//   }


//   var HideShow = "Hide";
//   //show hide pswd on Mouseover
//   function ShowPSW(o) {
//       o.type = "text";
//   }
//   function HidePSW(o) {
//       o.type = "password";
//   }

//   // Hide additional parameters
//   function ShowHideTR(id) {
//       if (document.getElementsByTagName) {
//           var rows = document.getElementsByTagName("tr");
//           for (i = 0; i < rows.length; i++) {
//               if (rows[i].id != 'dont touch') {
//                   if (rows[i].style.display == '') {
//                       rows[i].style.display = 'none';
//                       document.getElementById('ShowHide').value = "Show Addional SSO Options";
//                       HideShow = "Hide";
//                   } else {
//                       rows[i].style.display = '';
//                       document.getElementById('ShowHide').value = "Hide Addional SSO Options";
//                       HideShow = "Shown"
//                   }
//               }
//           }
//       }

//   }

//   //NOT USE FOR NOW: function clearing a text box when focused
//   function clearDefault(el) {
//       if (el.defaultValue == el.value) el.value = ""
//   }

//   //Set Time parameter
//   function fTime() {

//       var GMTTime = new Date();
//       var month = GMTTime.getUTCMonth() + 1;
//       var day = GMTTime.getUTCDate();
//       var year = GMTTime.getUTCFullYear() - 2000;
//       var hour = GMTTime.getUTCHours();
//       var min = GMTTime.getUTCMinutes();
//       var sec = GMTTime.getUTCSeconds();

//       if (month < 10) { month = "0" + month; }
//       if (day < 10) { day = "0" + day; }
//       if (hour < 10) { hour = "0" + hour; }
//       if (hour < 1) { hour = "00"; }
//       if (min < 10) { min = "0" + min; }
//       if (min < 1) { min = "00"; }
//       if (sec < 10) { sec = "0" + sec; }
//       if (sec < 1) { sec = "00"; }

//       GMTime = month.toString() + day.toString() + year.toString() + hour.toString() + min.toString() + sec.toString();

//       return GMTime;

//   }

//   //Crete the necessary MAC string
//   function generateMAC() {
//       // Push all SSO variable names into an array.

//       var x = ['rcopia_portal_system_name',
//       'rcopia_practice_user_name',
//       'rcopia_user_id',
//       'rcopia_user_external_id',
//       'service',
//       'action',
//       'startup_screen',
//       'rcopia_patient_id',
//       'rcopia_patient_system_name',
//       'rcopia_patient_external_id',
//       'close_window',
//       'logout_url',
//       'allow_popup_screens',
//       'override_single_patient',
//       'limp_mode',
//       'contact_email',
//       'timeout_url',
//       'encounter_id',
//       'location_external_id',
//       'rcopia_id_access_list',
//       'external_id_access_list',
//       'navigation_privilege',
//       'skip_auth',
//       'time'
//       ]; // fTime() returns the current GMT timestamp and pushes it into the  array as the last element

//       var param_url = generateURL(x); //Call function to generate the initial SSO URL
//       var append_key = param_url + document.getElementById('secret_key').value; //Append the secret key to the URL
//       //alert(document.getElementById('secret_key').value);
//       var MAC = calcMD5(append_key).toUpperCase();
//       var final_param_url = param_url + '&MAC=' + MAC; // Final string to use for SSO POST

//       return final_param_url;
//   }

//   function loginERX(parametersObj) {
//       var parameter_url;
//       parameter_url = 'rcopia_portal_system_name=' + parametersObj.SystemName;
//       parameter_url = parameter_url + '&rcopia_practice_user_name=' + parametersObj.Username;
//       parameter_url = parameter_url + '&rcopia_user_id=' + parametersObj.ERXId;
//       parameter_url = parameter_url + '&service=' + parametersObj.Service;
//       if (parametersObj.LocationErxId != null && parametersObj.LocationErxId != '')
//           parameter_url = parameter_url + '&location_external_id=' + parametersObj.LocationErxId;
//       parameter_url = parameter_url + '&action=login&startup_screen=patient&skip_auth=n&time=' + fTime();
//       var append_key = parameter_url + parametersObj.Password;
//       var MAC = calcMD5(append_key).toUpperCase();
//       var final_param_url = parameter_url + '&MAC=' + MAC; // Final string to use for SSO POST
//       var oURL = parametersObj.ServiceURL; // Append final string to URL specified in function call
//       oURL = oURL + final_param_url;

//       var leftpos = (screen.width - 800) / 2;
//       var toppos = (screen.height - 600) / 2;

//       window.open(oURL, 'ERX', 'toolbar,status,resizable,scrollbars,width=800,height=600, top=' + toppos + ', left=' + leftpos);
//   }

//   //Generate the string necessary to create the MAC
//   function generateURL(params) {
//       var parameter_url;
//       for (i = 0; i < params.length; i++) {
//           // Enter loop for all SSO parameters in the array
//           if (document.getElementById(params[i]) != null && document.getElementById(params[i]).value != '') {
//               // Check if parameter is set. If not, do not include in SSO request
//               if (!parameter_url) {
//                   // If URL string is empty
//                   parameter_url = params[i] + "=" + document.getElementById(params[i]).value;

//               } else if (document.getElementById(params[i]).type == 'radio') { // If SSO parameter is a radio button
//                   var radioButtons = document.getElementsByName(params[i]);
//                   for (var x = 0; x < radioButtons.length; x++) { // Loop through all the radio buttons to find which one is checked
//                       if (radioButtons[x].checked) { // For checked radio button append value to the URL
//                           parameter_url = parameter_url + "&" + params[i] + "=" + radioButtons[x].value;
//                       }
//                   }

//               } else if (params[i] == 'time') { // If SSO parameter is the time variable
//                   parameter_url = parameter_url + "&" + params[i] + "=" + fTime(); //Call function fTime() to generate current GMT
//               }
//               else { // For all regular textboxes and dropdowns
//                   parameter_url = parameter_url + "&" + params[i] + "=" + document.getElementById(params[i]).value;
//               }
//           }

//       }

//       return parameter_url;
//   }


//   // Function for Launch Rcopia button
//   function launchRcopia(url) {
//       final_param_url = generateMAC(); // Capture final URL string by calling the generateMAC() function
//       var oURL = url; // Append final string to URL specified in function call
//       oURL = oURL + final_param_url;

//       var leftpos = (screen.width - 800) / 2;
//       var toppos = (screen.height - 600) / 2;

//       window.open(oURL, 'myWin', 'toolbar,status,resizable,scrollbars,width=800,height=600, top=' + toppos + ', left=' + leftpos);
//   }

  //********************************* MD5 HASHING ************************************************//
  /*
   * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
   * Digest Algorithm, as defined in RFC 1321.
   * Copyright (C) Paul Johnston 1999 - 2000.
   * Updated by Greg Holt 2000 - 2001.
   * See http://pajhome.org.uk/site/legal.html for details.
   */

  /*
   * Convert a 32-bit number to a hex string with ls-byte first
   */
  var hex_chr = "0123456789abcdef";
  function rhex(num) {
      str = "";
      for (j = 0; j <= 3; j++)
          str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) +
                 hex_chr.charAt((num >> (j * 8)) & 0x0F);
      return str;
  }

  /*
   * Convert a string to a sequence of 16-word blocks, stored as an array.
   * Append padding bits and the length, as described in the MD5 standard.
   */
//   function str2blks_MD5(str) {
//       nblk = ((str.length + 8) >> 6) + 1;
//       blks = new Array(nblk * 16);
//       for (i = 0; i < nblk * 16; i++) blks[i] = 0;
//       for (i = 0; i < str.length; i++)
//           blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
//       blks[i >> 2] |= 0x80 << ((i % 4) * 8);
//       blks[nblk * 16 - 2] = str.length * 8;
//       return blks;
//   }

  /*
   * Add integers, wrapping at 2^32. This uses 16-bit operations internally
   * to work around bugs in some JS interpreters.
   */
//   function add(x, y) {
//       var lsw = (x & 0xFFFF) + (y & 0xFFFF);
//       var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
//       return (msw << 16) | (lsw & 0xFFFF);
//   }

  /*
   * Bitwise rotate a 32-bit number to the left
   */
//   function rol(num, cnt) {
//       return (num << cnt) | (num >>> (32 - cnt));
//   }

  /*
   * These functions implement the basic operation for each round of the
   * algorithm.
   */
//   function cmn(q, a, b, x, s, t) {
//       return add(rol(add(add(a, q), add(x, t)), s), b);
//   }
//   function ff(a, b, c, d, x, s, t) {
//       return cmn((b & c) | ((~b) & d), a, b, x, s, t);
//   }
//   function gg(a, b, c, d, x, s, t) {
//       return cmn((b & d) | (c & (~d)), a, b, x, s, t);
//   }
//   function hh(a, b, c, d, x, s, t) {
//       return cmn(b ^ c ^ d, a, b, x, s, t);
//   }
//   function ii(a, b, c, d, x, s, t) {
//       return cmn(c ^ (b | (~d)), a, b, x, s, t);
//   }

  /*
   * Take a string and return the hex representation of its MD5.
   */
//   function calcMD5(str) {
//       x = str2blks_MD5(str);
//       a = 1732584193;
//       b = -271733879;
//       c = -1732584194;
//       d = 271733878;

//       for (i = 0; i < x.length; i += 16) {
//           olda = a;
//           oldb = b;
//           oldc = c;
//           oldd = d;

//           a = ff(a, b, c, d, x[i + 0], 7, -680876936);
//           d = ff(d, a, b, c, x[i + 1], 12, -389564586);
//           c = ff(c, d, a, b, x[i + 2], 17, 606105819);
//           b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
//           a = ff(a, b, c, d, x[i + 4], 7, -176418897);
//           d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
//           c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
//           b = ff(b, c, d, a, x[i + 7], 22, -45705983);
//           a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
//           d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
//           c = ff(c, d, a, b, x[i + 10], 17, -42063);
//           b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
//           a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
//           d = ff(d, a, b, c, x[i + 13], 12, -40341101);
//           c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
//           b = ff(b, c, d, a, x[i + 15], 22, 1236535329);

//           a = gg(a, b, c, d, x[i + 1], 5, -165796510);
//           d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
//           c = gg(c, d, a, b, x[i + 11], 14, 643717713);
//           b = gg(b, c, d, a, x[i + 0], 20, -373897302);
//           a = gg(a, b, c, d, x[i + 5], 5, -701558691);
//           d = gg(d, a, b, c, x[i + 10], 9, 38016083);
//           c = gg(c, d, a, b, x[i + 15], 14, -660478335);
//           b = gg(b, c, d, a, x[i + 4], 20, -405537848);
//           a = gg(a, b, c, d, x[i + 9], 5, 568446438);
//           d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
//           c = gg(c, d, a, b, x[i + 3], 14, -187363961);
//           b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
//           a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
//           d = gg(d, a, b, c, x[i + 2], 9, -51403784);
//           c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
//           b = gg(b, c, d, a, x[i + 12], 20, -1926607734);

//           a = hh(a, b, c, d, x[i + 5], 4, -378558);
//           d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
//           c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
//           b = hh(b, c, d, a, x[i + 14], 23, -35309556);
//           a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
//           d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
//           c = hh(c, d, a, b, x[i + 7], 16, -155497632);
//           b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
//           a = hh(a, b, c, d, x[i + 13], 4, 681279174);
//           d = hh(d, a, b, c, x[i + 0], 11, -358537222);
//           c = hh(c, d, a, b, x[i + 3], 16, -722521979);
//           b = hh(b, c, d, a, x[i + 6], 23, 76029189);
//           a = hh(a, b, c, d, x[i + 9], 4, -640364487);
//           d = hh(d, a, b, c, x[i + 12], 11, -421815835);
//           c = hh(c, d, a, b, x[i + 15], 16, 530742520);
//           b = hh(b, c, d, a, x[i + 2], 23, -995338651);

//           a = ii(a, b, c, d, x[i + 0], 6, -198630844);
//           d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
//           c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
//           b = ii(b, c, d, a, x[i + 5], 21, -57434055);
//           a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
//           d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
//           c = ii(c, d, a, b, x[i + 10], 15, -1051523);
//           b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
//           a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
//           d = ii(d, a, b, c, x[i + 15], 10, -30611744);
//           c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
//           b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
//           a = ii(a, b, c, d, x[i + 4], 6, -145523070);
//           d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
//           c = ii(c, d, a, b, x[i + 2], 15, 718787259);
//           b = ii(b, c, d, a, x[i + 9], 21, -343485551);

//           a = add(a, olda);
//           b = add(b, oldb);
//           c = add(c, oldc);
//           d = add(d, oldd);
//       }
//       return rhex(a) + rhex(b) + rhex(c) + rhex(d);
//   }
  //****************************** MD5 HASHING END **************************************************//


//   var btnopstext = "";
//   var btnprocessing;
//   var gblOpenAlerts = new Array();
//   var gblOpenAlertsRead = new Array();
//   var isreadReleaseNote =false;
//   String.prototype.trim = function () {
//       return this.replace(/^\s+|\s+$/g, '');
//   }


//   var timerinterval = null;
//   $(document).ready(function () {
//       startSessionTimer();
//      // isreadReleaseNote = readCookie('doc');
//       setReleaseNotes();

//   });

//   function resetSessionTimer() {
//       clearInterval(timerinterval);
//       timerinterval = null;
//       $('#dvPopUpSessionExpire').addClass('hide');
//       $('#dvPopUpSessionExpire').hide();
//       startSessionTimer();
//   }

  // function startSessionTimer() {
  //     var startdate = new Date();
  //     var sessionduration = parseInt($('#hddSessionDuration').attr('data-duration'));
  //     var countDownDate = new Date(moment(startdate).add(sessionduration, 'minutes')).getTime();

  //     // Update the count down every 1 second
  //     timerinterval = setInterval(function () {

  //         // Get today's date and time
  //         var now = new Date().getTime();

  //         // Find the distance between now and the count down date
  //         var distance = countDownDate - now;

  //         // Time calculations for days, hours, minutes and seconds
  //         //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  //         var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //         var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //         var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  //         if (hours <= 0 && minutes <= 4 && $('#dvPopUpSessionExpire').hasClass('hide') == true) {
  //             $('#dvPopUpSessionExpire').removeClass('hide');
  //             $('#dvPopUpSessionExpire').show();
  //         }

  //         if (distance > 0) {
  //             $('.dvPopUpSessionExpireContentMessage').html('Your session is about to expire in ' + hours + "h " + minutes + "m " + seconds + "s ");
  //         }
  //         // If the count down is finished, write some text
  //         if (distance < 0) {
  //             clearInterval(timerinterval);
  //             $('.dvPopUpSessionExpireContentMessage').html('Your session has expired!');
  //             $('.lnkKeepSessionAlive').addClass('hide');
  //             $('.lnkKeepSessionAlive').hide();
  //             //$('.lnkRedirectLoginPage').removeClass('hide');
  //             //$('.lnkRedirectLoginPage').show();
  //             $('.lnkRedirectLoginPage').trigger('click');
  //         }
  //     }, 1000);
  // }



//   $('body').on('click', '.lnkKeepSessionAlive', function () {
//       var geturl = $('#hddSessionDuration').attr('data-SessionAliveURL');
//       $.get(geturl, {}, function (r) {
//           resetSessionTimer();
//       });
//   });

//   $('body').on('click', '.lnkRedirectLoginPage', function () {
//       var geturl = $('#hddSessionDuration').attr('data-HomePageURL');
//       window.location = geturl;
//   });

//   window.addEventListener("offline", function () {
//       $('#spnInternetStatus').removeClass('badge-primary').addClass('badge-danger').html("Offline");
//   });


//   window.addEventListener("online", function () {
//       $('#spnInternetStatus').removeClass('badge-danger').addClass('badge-primary').html("Online");
//   });

  jQuery(document).ready(function () {
      var offset = 200;
      var duration = 500;
      jQuery(window).scroll(function () {
          if (jQuery(this).scrollTop() > offset) {
              jQuery('.scroll-to-top').fadeIn(duration);
          } else {
              jQuery('.scroll-to-top').fadeOut(duration);
          }
      });
      jQuery('.scroll-to-top').click(function (event) {
          event.preventDefault();
          jQuery('html, body').animate({ scrollTop: 0 }, duration);
          return false;
      })
  });


  jQuery.fn.justtext = function () {

      return $(this).clone()
          .children()
          .remove()
          .end()
          .text();

  };
  var SearchPatientsVC = function (tag) {

      var url = '../Search/Index?id=' + tag;
      location.href = url;
  };
  var executeVCCommands = function (cmds) {
      switch (cmds) {
          case 'book appointments':
          case 'book appointment':
              location.href = '../Patient/ScheduleAppointment';
              break;
          case 'office dashboard':
              location.href = '../Patient/EpisodeTreatmentDashboard';
              break;
          case 'show me messages':
          case 'my messages':
          case 'show messages':
          case 'messages':
              location.href = '../Message/inbox';
              break;

      };

  };
  function LoadVC() {


      var commands1 = {
          'chucky search patient *tag': SearchPatientsVC

      };

      var commands2 = {
          'chucky *cmds': executeVCCommands

      };


      // Add our commands to annyang

      annyang.addCommands(commands1);
      annyang.addCommands(commands2);

      // Start listening. You can call this here, or attach this call to an event, button, etc.
      annyang.start({ autoRestart: true, continuous: false });

  }
  function getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(location.search);
      return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  function setTimezoneCookie() {

      var timezone_cookie = "timezoneoffset";

      // if the timezone cookie not exists create one.
      if (!$.cookie(timezone_cookie)) {

          // check if the browser supports cookie
          var test_cookie = 'test cookie';
          $.cookie(test_cookie, true, { path: '/' });

          // browser supports cookie
          if ($.cookie(test_cookie)) {

              // delete the test cookie
              $.cookie(test_cookie, null, { path: '/' });

              // create a new cookie
              $.cookie(timezone_cookie, new Date().getTimezoneOffset(), { expires: 1, path: '/' });

              //$.cookie(timezone_cookie, new Date().getTimezoneOffset());

              // re-load the page
              location.reload();
          }
      }
      // if the current timezone and the one stored in cookie are different
      // then store the new timezone in the cookie and refresh the page.
      else {

          var storedOffset = parseInt($.cookie(timezone_cookie));
          var currentOffset = new Date().getTimezoneOffset();

          // user may have changed the timezone
          if (storedOffset !== currentOffset) {
              $.cookie(timezone_cookie, new Date().getTimezoneOffset());
              location.reload();
          }
      }
  }

//   $(function () {
//       //$('div#dvloading').hide();
//       var NotificationInfo;
//       window.onerror = function errorHandler(msg, url, line) {
//           ////alert(msg);
//           // Just let default handler run.
//           return false;
//       };

//       $(document).ajaxError(function (event, jqXHR, ajaxSettings, thrownError) {
//           if (event.status == "401" || event.status == "403") {
//               window.location.replace('../Account/Login?ReturnUrl=' + window.location.pathname);
//           }
//           //alert(event);
//           //alert(jqXHR);
//           toastrerror('Oops! problem occured while performing the operation. Please try again or contact customer support');
//           $('.modal').each(function (index, obj) {
//               $(obj).modal('hide');
//           });
//       });

//       $.ajaxSetup({
//           timeout: 600000,
//           cache: false
//       });
//       //$(document).ajaxStart(function (e) {
//       //    //NotificationInfo = toastrinfo('Processing...', '');
//       //    $('#spngblajaxstatus').removeClass('hide');
//       //    $('#spngblajaxstatus').text('Processing...');
//       //    $('#spngblajaxstatus').show();

//       //    var $btn = $(e.target.activeElement);

//       //    if ($btn.hasClass('btnprocessing')) {
//       //        btnopstext = $btn.text();
//       //        btnprocessing = $btn;
//       //        $btn.addClass('hide');
//       //        $btn.hide();
//       //        $("<a href='javascript:void(0)' class='btn btn-disabled btnProcessingDiabled' disabled='disabled'>Processing...</a>").insertAfter($btn);
//       //    }

//       //    //toastr.remove();
//       //});
//       // $(document).ajaxComplete(function (e) {
//       //     //toastr.clear(NotificationInfo)
//       //     $('#spngblajaxstatus').text('Procesing Completed!');
//       //     setTimeout(ClearAjaxProgressMessage, 2000);
//       //     $('.datepicker').datepicker({ changeMonth: true, changeYear: true });

//       //     if (btnprocessing != null && btnprocessing != undefined) {
//       //         if (btnprocessing.hasClass('btnprocessing')) {
//       //             btnprocessing.removeClass('hide');
//       //             btnprocessing.show();
//       //             $('.btnProcessingDiabled').addClass('hide');
//       //             $('.btnProcessingDiabled').hide();
//       //         }
//       //     }
//       //     RegisterTwilio();
//       //     //if ($('#toast-container').hasClass('toast-bottom-right'))
//       //     //{
//       //     //    $('#toast-container').removeClass('toast-bottom-right');
//       //     //    $('#toast-container').addClass('toast-top-right');
//       //     //}
//       // });
//       function ClearAjaxProgressMessage() {
//           $('#spngblajaxstatus').hide();
//       }
//       $(document).ajaxSuccess(function (e) {
//           //$.uniform.restore('select');
//           RegisterPluginControls();

//           if (btnprocessing != null && btnprocessing != undefined) {
//               if (btnprocessing.hasClass('btnprocessing')) {
//                   btnprocessing.removeClass('hide');
//                   btnprocessing.show();
//                   $('.btnProcessingDiabled').addClass('hide');
//                   $('.btnProcessingDiabled').hide();
//               }
//           }

//       });

//       $(document).ajaxStop(function (e) {
//           if (btnprocessing != null && btnprocessing != undefined) {
//               if (btnprocessing.hasClass('btnprocessing')) {
//                   btnprocessing.removeClass('hide');
//                   btnprocessing.show();
//                   $('.btnProcessingDiabled').addClass('hide');
//                   $('.btnProcessingDiabled').hide();
//               }
//           }
//       });

//       $(document).ajaxError(function (e) {
//           if (btnprocessing != null && btnprocessing != undefined) {
//               if (btnprocessing.hasClass('btnprocessing')) {
//                   btnprocessing.removeClass('hide');
//                   btnprocessing.show();
//                   $('.btnProcessingDiabled').addClass('hide');
//                   $('.btnProcessingDiabled').hide();
//               }
//           }
//       });

//       var height = $('#happenings').height() + 200;
//       if (height < $(window).height()) {
//           $("#content").css('height', $(window).height() + 200);
//       }
//       else {

//           $("#content").css('height', height);

//       }

//       //$.widget.bridge('uitooltip', $.ui.tooltip);

//       //$('.focustip').tooltip({ 'trigger': 'focus', 'html': true });

//       $(".ui-datepicker-month, .styled, .dataTables_length select.styled").uniform({ selectAutoWidth: false, radioClass: 'choice' });

//       $('#txtTopSearch').keydown(function (e) {
//           var code = (e.keyCode ? e.keyCode : e.which);

//           if (code == 13 && !e.shiftKey && $.trim($(this).val()).length > 0) {
//               var reqUrl = $(this).data('req-url');
//               window.location.href = reqUrl + "?id=" + $.trim($(this).val());
//               return false;
//           }

//       });

//       $('#resendVLink').click(function () {
//           var reqUrl = $(this).data('post-url');
//           var sender = $(this);
//           $.ajax({
//               url: reqUrl,
//               type: 'POST',
//               dataType: 'json',
//               data: {
//                   "__RequestVerificationToken": $("input[name=__RequestVerificationToken]").val(),
//                   id: '123'
//               }
//               ,  // JSON.stringify(searchTerm),
//               success: function (result) {
//                   var res = result;
//                   if (res.success) {
//                       sender.parent().html('<b>A Email has been successfully sent to your registered email address!</b>');
//                   }
//                   else {
//                       sender.parent().html('<b>Oops! some problem while sending email. Please try again or contact custromer support.</b>');
//                   }
//               }
//           });

//       });


//       $('body').on('click', '.erxPractice,.erxPracticeSingle', function () {
//           //$('.erxPractice,.erxPracticeSingle').click(function () {
//           ProcessERXLogin($(this));
//       });

//       function ProcessERXLogin(sender) {
//           var reqUrl = $(sender).data('req-url');
//           var practiceId = $(sender).data('practice-id');
//           var locId = $(sender).data('loc-id');
//           $.ajax({
//               url: reqUrl,
//               type: 'GET',
//               dataType: 'json',
//               data: { PracticeId: practiceId },
//               success: function (result) {
//                   var res = result;
//                   if (res.ERXId == '' || res.Username == '') {
//                       toastrerror('You does not have necessary permission to login.', 'ERX Login')
//                   }
//                   else {
//                       res.LocationErxId = locId;
//                       loginERX(res);
//                   }
//               }
//           });
//       }


//       $(document)
//           .on('show.bs.modal', '.modal', function (event) {
//               $(this).appendTo($('body'));
//           })
//           .on('shown.bs.modal', '.modal.in', function (event) {
//               setModalsAndBackdropsOrder();
//           })
//           .on('hidden.bs.modal', '.modal', function (event) {
//               setModalsAndBackdropsOrder();
//               var modalPopupdivId = $(this).attr('id');
//               if (modalPopupdivId == 'dvPopupTopNode' || modalPopupdivId == 'dvPopupTopNode1' || modalPopupdivId == 'dvPopupTopNode2')
//                   $(this).empty();
//           });

//       $('body').on('click', 'button.cancel.filedel', function () {
//           var uploadtmp = $(this).parents('.template-download');
//           if (uploadtmp.length > 0)
//               uploadtmp.hide();
//       });

//       function setModalsAndBackdropsOrder() {
//           var modalZIndex = 1040;
//           $('.modal.in').each(function (index) {
//               var $modal = $(this);
//               modalZIndex++;
//               $modal.css('zIndex', modalZIndex);
//               $modal.next('.modal-backdrop.in').addClass('hidden').css('zIndex', modalZIndex - 1);
//           });
//           $('.modal.in:visible:last').focus().next('.modal-backdrop.in').removeClass('hidden');
//       }

//       setTimezoneCookie();
//       RegisterPluginControls();

//       $('.spin-iconReminder').click(function () {
//           //var url = $(this).attr('data-geturl');
//           //$.get(reqUrl, function (r) {
//           //    $(updateContainer).html(r);

//           //});
//           $(".theme-config-boxReminder").toggleClass("show")
//       })

//       $('.spin-iconRecentPatient').click(function () {
//           //var url = $(this).attr('data-geturl');
//           //$.get(reqUrl, function (r) {
//           //    $(updateContainer).html(r);

//           //});
//           $(".theme-config-boxRecentPatient").toggleClass("show")
//       })

//       //$('body').on('click', '.spin-iconRecentPatient', function () {
//       //    $(".theme-config-boxRecentPatient").toggleClass("show")
//       //});

//       //time interval for alerts
//       $.get($('#hddGetAlertsTodayTimeList').val(), function (result) {

//           $(result).map(function () {
//               gblOpenAlerts.push(this.RemindOnTime);
//           });

//       }).success(function () {
//           if (gblOpenAlerts.length > 0) {
//               setInterval(function () { alertremainder() }, 60000);  //1min
//           }
//       });

//       function alertremainder() {
//           var nowdate = new Date();
//           var convertednowtime = nowdate.getHours() * 3600 + nowdate.getMinutes() * 60;
//           var thirtyminutes = 30 * 60;  // ms

//           $.each(gblOpenAlerts, function (index, val) {
//               var time = (!cfn(val) ? val.split(/:/) : "");
//               var convertedtime = (time[0] * 3600) + (time[1] * 60);

//               if (((convertedtime - convertednowtime) < thirtyminutes) && ((convertedtime - convertednowtime) > 0)) {
//                   var index = gblOpenAlertsRead.indexOf(val);
//                   if (index < 0) {
//                       //$('.spin-iconReminder').trigger('click');
//                       $('#lnkReminderIconMenu').trigger('click');
//                       gblOpenAlertsRead.push(val);
//                       return false;
//                   }
//               }

//           });
//       }

//       $('body').on('click', '.officedbrecentpat', function () {
//           //var casenumber = $(this).attr('data-casenum');
//           var geturl = $(this).attr('data-get-url');
//           var reqofficeurl = $(this).attr('data-getoffice-url');
//           var episodeid = $(this).attr('data-episodeid');
//           var patientid = $(this).attr('data-patientid');
//           var patientname = $(this).attr('data-patientname');
//           var encrypteddata = null;

//           $.get(geturl, { EpisodeId: episodeid, PatientId: patientid, PatientName: patientname }, function (r) {
//               encrypteddata = encodeURIComponent(r.EncryptedData);
//           }).success(function () {
//               //window.location.href = reqofficeurl + '?enc=' + encrypteddata;
//               window.open(reqofficeurl + '?enc=' + encrypteddata, '_blank');
//           });
//       });

//       $('body').on('click', '.presurgicalrecentpat', function () {
//           var geturl = $(this).attr('data-get-url');
//           var reqpresurgicalurl = $(this).attr('data-presurgicalurl-url');
//           var episodeid = $(this).attr('data-episodeid');
//           var patientid = $(this).attr('data-patientid');
//           var surgerydetailsid = $(this).attr('data-episodesurgerydetailsid');
//           var patientname = $(this).attr('data-patientname');
//           var encrypteddata = null;

//           $.get(geturl, { EpisodeId: episodeid, PatientId: patientid, PatientName: patientname, EpisodeSurgeryDetailsId: surgerydetailsid }, function (r) {
//               encrypteddata = encodeURIComponent(r.EncryptedData);
//           }).success(function () {
//               //window.location.href = reqpresurgicalurl + '?enc=' + encrypteddata;
//               window.open(reqpresurgicalurl + '?enc=' + encrypteddata, '_blank');
//           });
//       });

//       $('body').on('click', '.recentSearchResult', function () {
//           //var casenumber = $(this).attr('data-casenum');
//           var geturl = $(this).attr('data-get-url');
//           //var reqofficeurl = $(this).attr('data-getoffice-url');
//           var filterid = $(this).attr('data-filterid');

//           var encrypteddata = null;
//           window.open(geturl + '?FilterId=' + filterid, '_blank');
//           //$.get(geturl, { FilterId: filterid }, function (r) {
//           //    //encrypteddata = encodeURIComponent(r.EncryptedData);
//           //}).success(function () {
//           //    //window.location.href = reqofficeurl + '?enc=' + encrypteddata;
//           //    window.open(geturl + '?FilterId=' + filterid, '_blank');
//           //});
//       });

//       $(document).ajaxSend(function (e) {
//           $('#spngblajaxstatus').removeClass('hide');
//           $('#spngblajaxstatus').text('Processing...');
//           $('#spngblajaxstatus').show();
//           var $btn = $(e.target.activeElement);
//           if ($btn.hasClass('btnprocessing')) {
//               btnopstext = $btn.text();
//               btnprocessing = $btn;
//               $btn.addClass('hide');
//               $btn.hide();
//               $("<a href='javascript:void(0)' class='btn btn-disabled btnProcessingDiabled' disabled='disabled'>Processing...</a>").insertAfter($btn);
//           }
//           resetSessionTimer();
//           //toastr.remove();
//       });
//   });
//   function getQueryStringParameterByName(name) {
//       var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
//       return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
//   }
//   // function RegisterPluginControls() {
//   //     $('.datepicker').datepicker({ changeMonth: true, changeYear: true });
//   //     $('.disablefuturedates').datepicker('option', { maxDate: 0 });
//   //     applychoosenselect();
//   //     $('select.styled').uniform();
//   //     $('.hovertip').popover({
//   //         container: 'body',
//   //         html: true
//   //     });
//   //     $('.i-checks input').on('ifChanged', function (event) {
//   //         if (event.type === "ifChanged") {
//   //             $(this).trigger('change');
//   //             $('.i-checks').iCheck('update');
//   //         }
//   //         if (event.type === "ifChecked") {
//   //             $(this).trigger('change');
//   //             $('.i-checks').iCheck('update');
//   //         }
//   //         if (event.type === "ifUnchecked") {
//   //             $(this).trigger('change');
//   //             $('.i-checks').iCheck('update');
//   //         }
//   //         if (event.type === "ifDisabled") {
//   //             console.log($(this).attr('id') + 'dis');
//   //             $('.i-checks').iCheck('update');
//   //         }
//   //     }).iCheck({
//   //         checkboxClass: 'icheckbox_square-green',
//   //         radioClass: 'iradio_square-green'
//   //     });
//   // }

//   function RegisterFileUpload(controlcssorid, size, dropzone) {
//       //$(controlcssorid).fileupload();

//       //$(controlcssorid).fileupload('option', {
//       //    maxFileSize: (size == null || size == undefined) ? 100000000 : size,
//       //    resizeMaxWidth: 1920,
//       //    resizeMaxHeight: 1200,
//       //    dropZone: (dropzone == null || dropzone == undefined) ? $('.fileupload-buttonbar') : $(dropzone)
//       //});
//   }

  function RegisterFileUploadForPatientPhoto(controlcssorid, size, dropzone) {
      $(controlcssorid).fileupload();

      $(controlcssorid).fileupload('option', {
          maxFileSize: (size == null || size == undefined) ? 100000000 : size,
          resizeMaxWidth: 1920,
          resizeMaxHeight: 1200,
          dropZone: (dropzone == null || dropzone == undefined) ? $('.fileupload-buttonbar') : $(dropzone)
      });
  }


  function isValidEmailAddress(emailAddress) {
      var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
      // alert( pattern.test(emailAddress) );
      return pattern.test(emailAddress);
  };

  function isValidDate(testDate) {
      var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(17|18|19|20|21)\d{2}$/;
      return date_regex.test(testDate);
  }

  function InitialLetterCapital(str) {
      if (!cfn(str)) {
          str = str.toLowerCase().replace(/\b[a-z]/g, function (letter) {
              return letter.toUpperCase();
          });
      }
      return str;
  }

  function isValidIntegerSeperatedByComma(integer) {
      var pattern = new RegExp(/^(\d{1,2},)*\d{1,2}$/);
      return pattern.test(integer);
  };


//   function toastrerror(message, title, options) {
//       toastr.error(message, ((title == null || title == undefined) ? 'Error' : title),
//           ($.trim(options) == '' ? {
//               "closeButton": true,
//               "debug": false,
//               "newestOnTop": false,
//               "progressBar": true,
//               "positionClass": "toast-top-right",
//               "preventDuplicates": false,
//               "onclick": null,
//               "timeOut": "0",
//               "extendedTimeOut": "0",
//               "showEasing": "swing",
//               "hideEasing": "linear",
//               "showMethod": "fadeIn",
//               "hideMethod": "fadeOut"
//           } : options));
//       $('#loadingmessage').hide();
//   };

//   function toastrwarning(message, title, options) {
//       toastr.warning(message, ((title == null || title == undefined) ? 'Message' : title),
//           ($.trim(options) == '' ? {
//               "closeButton": true,
//               "debug": false,
//               "newestOnTop": false,
//               "progressBar": true,
//               "positionClass": "toast-bottom-right",
//               "preventDuplicates": false,
//               "onclick": null,
//               "timeOut": "0",
//               "extendedTimeOut": "0",
//               "showEasing": "swing",
//               "hideEasing": "linear",
//               "showMethod": "fadeIn",
//               "hideMethod": "fadeOut"
//           } : options));
//       $('#loadingmessage').hide();
//   };
//   function toastrinfo(message, title, options) {
//       return toastr.info(message, ((title == null || title == undefined) ? 'Info' : title),
//           ($.trim(options) == '' ? {
//               "closeButton": true,
//               "debug": false,
//               "newestOnTop": false,
//               "progressBar": true,
//               "positionClass": "toast-bottom-right",
//               "preventDuplicates": false,
//               "onclick": null,
//               "timeOut": "0",
//               "extendedTimeOut": "0",
//               "showEasing": "swing",
//               "hideEasing": "linear",
//               "showMethod": "fadeIn",
//               "hideMethod": "fadeOut"
//           } : options));
//       $('#loadingmessage').hide();
//   };

//   function toastrsuccess(message, title, options) {
//       toastr.success(message, ((title == null || title == undefined) ? 'Success' : title),
//           ($.trim(options) == '' ? {
//               "closeButton": true,
//               "debug": false,
//               "newestOnTop": false,
//               "progressBar": true,
//               "positionClass": "toast-bottom-right",
//               "preventDuplicates": false,
//               "onclick": null,
//               "showDuration": "300",
//               "hideDuration": "1000",
//               "timeOut": "5000",
//               "extendedTimeOut": "1000",
//               "showEasing": "swing",
//               "hideEasing": "linear",
//               "showMethod": "fadeIn",
//               "hideMethod": "fadeOut"
//           } : options)
//       );
//       $('#loadingmessage').hide();
//   };

  function GetInputControlValue(objId) {
      var obj = $('#' + objId);
      return obj.val() == '' ? null : obj.val();
  }

  (function ($) {
      $.QueryString = (function (a) {
          if (a == "") return {};
          var b = {};
          for (var i = 0; i < a.length; ++i) {
              var p = a[i].split('=');
              if (p.length != 2) continue;
              b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
          }
          return b;
      })(window.location.search.substr(1).split('&'))




  })(jQuery);


  $(document).on('hidden.bs.modal', '.modal', function (event) {
      $.each($('.modal'), function () {
          if ($(this).hasClass('in')) {
              $('body').addClass('modal-open');
          }

      });
  });

  $(document).on('hidden.bs.modal', '.bootbox', function (event) {
      $(this).remove();

  });

  $('body').on('click', '.Contactsupport', function () {
      // Retrieve the filter url from the data-filter-url attribute

      var reqUrl = $(this).attr('data-req-url');
      // alert(reqUrl);
      // Grab the container that should be updated
      var updateContainer = $(this).attr('data-update-container');
      //$(updateContainer).html("<span style='float:right; font-size:18pt;'>Loading... <img src='../Images/elements/loaders/1.gif' /></span>");
      var completeUrl = reqUrl;

      $.get(completeUrl, function (r) {
          // Load Partial View using the URL from the data-filter-url attribute
          $(updateContainer).html(r);
          $(updateContainer).modal({ keyboard: false, backdrop: 'static' });

      }).error(function (e, a, b) {
          //alert(e + ', ' + a + ', ' + b);
      });


  });

//   $('body').on('click', '#btnCreateTicket', function () {
//       toastr.clear();
//       var reqUrl = $(this).data('post-url');
//       //alert(reqUrl);
//       $.ajax({
//           url: reqUrl,
//           type: 'POST',
//           dataType: 'html',
//           data: {
//               "__RequestVerificationToken": $("input[name=__RequestVerificationToken]").val(),
//               //fromName: $('#fromName').val(),
//               //fromEmail: $('#fromEmail').val(),
//               subject: $('#subject').val(),
//               supportContent: $('#supportContent').val()
//           }
//           ,  // JSON.stringify(searchTerm),
//           success: function (result) {
//               var res = $.parseJSON(result);
//               if (res.success) {
//                   $('#Contactsupport').modal('hide');
//                   // alert("A support ticket is created for you, we will get back to you within 8 working hours.");
//                   toastrsuccess("A support ticket is created for you, we will get back to you within 8 working hours.");
//                   //bootbox.alert("A support ticket is created for you, we will get back to you within 8 working hours.");
//                   SaveSupportTicket(1);
//               }
//               else {
//                   var errorList = '<ul>';
//                   $.each(res.errors, function (indx, obj) {
//                       errorList = errorList + '<li>' + obj + '</li>';
//                   });
//                   errorList = errorList + '</ul>';
//                   //$('#dvContactSupport').html(errorList).show();
//                   toastrerror(errorList, 'Mandatory Fields');
//                   //$('#Contactsupport').modal('hide');
//                   //alert("An error occured, please try after sometime.");
//               }
//           },
//           error: function (result) {

//           }

//       });
//       toastr.clear();
//   });

  //this function is common to all search screen & enter key pressed.
  $('body').on('keypress', '.textbox-search-onenterkey', function (e) {
      if (e.which == 13) {
          var buttonId = $(this).attr('data-enterkey-pressed');
          $(buttonId).click();
      }
  });

  $('body').on('keypress', '.txtOnlyNumber', function (e) {
      toastr.clear();

      if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {

          return false;

      }
  });

  ////$('body').on('keypress', '.txtOnlyDecimal', function (evt) {
  ////    toastr.clear();

  ////    var charCode = (evt.which) ? evt.which : event.keyCode
  ////    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {
  ////        return false;

  ////    }
  ////});

  $('body').on('keypress', '.txtOnlyDecimal', function (evt) {
      toastr.clear();

      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if (charCode == 8 || charCode == 37) {
          return true;
      } else if (charCode == 46 && $(this).val().indexOf('.') != -1) {
          return false;
      } else if (charCode > 31 && charCode != 46 && (charCode < 48 || charCode > 57)) {
          return false;
      }
      return true;
  });

  $('body').on('keypress', '.txtNotAllowSpecialCharcters', function (e) {
      toastr.clear();

      if (e.which < 48 ||
          (e.which > 57 && e.which < 65) ||
          (e.which > 90 && e.which < 97) ||
          e.which > 122) {
          return false;
      }
  });

  $('body').on('keypress', '.txtNotAllowSpecialCharctersAllowSpace', function (e) {
      toastr.clear();

      if (e.which != 32 && e.which < 48 ||
          (e.which > 57 && e.which < 65) ||
          (e.which > 90 && e.which < 97) ||
          e.which > 122) {
          return false;
      }
  });

  function applychoosenselect() {
      var config = {
          '.chosen-select': {},
          '.chosen-select-deselect': { allow_single_deselect: true },
          '.chosen-select-no-single': { disable_search_threshold: 10 },
          '.chosen-select-no-results': { no_results_text: 'Oops, nothing found!' },
          '.chosen-select-width': { width: "95%" }
      }

      for (var selector in config) {
          $(selector).chosen(config[selector]);
          $(selector).each(function (e) {
              if ($(this).hasClass('mandatoryFieldBorder')) {
                  $(this).parent().find('.chosen-single').addClass('mandatoryFieldBorder');
              }
          });

      }
  }
  //this function is common to all Zipcode for city n state
  $('body').on('blur', '.ZipCodeChange', function () {
      var reqUrl = $(this).data('req-url');
      var zip = $(this).val();
      var CityField = $(this).attr('data-CityField');
      var StateField = $(this).attr('data-StateField');
      $.get(reqUrl, { Zip: zip }, function (r) {
          if (r.InsuredStateId == null) {
              $(StateField).prop('disabled', false);
              $(StateField).prop('selectedIndex', 0);
              $(StateField).trigger("chosen:updated");
          } else
              if (r.InsuredStateId != "") {
                  $(StateField).val(r.InsuredStateId);
                  $(StateField).attr('disabled', 'disabled');
                  $(StateField).trigger("chosen:updated");
              }

          if (r.InsuredCity == null) {
              $(CityField).prop('disabled', false);
              $(CityField).val("");
          } else
              if (r.InsuredCity != "") {
                  $(CityField).val(r.InsuredCity);
                  $(CityField).prop("disabled", true);
              }
      })
  });

  function RegisterTagsinputRenderItems(tagsdivclassname) {
      $('div.' + tagsdivclassname + ' input').each(function (index, obj) {

          $('#' + $(obj).attr('id')).data('ui-autocomplete')._renderItem = function (ul, item) {
              return $("<li>")
                  .data("item.autocomplete", item)
                  .append($("<a href='#'>" + item.label + "</a>"))
                  .appendTo(ul);

          };


      });
  }

  // function DatevalidationDisableenddate(stdate, enddate) {

  //     var effdate = new Date();
  //     //var parentdv = $(this).parents();
  //     effdate = $(stdate).val();

  //     if (effdate == '' || effdate == null) {
  //         $(enddate).prop("disabled", true);
  //         $(enddate).val('');
  //     }
  //     else {
  //         $(enddate).removeAttr('disabled');
  //         $(enddate).datepicker('option', { minDate: effdate });

  //     }

  // }


//   function checkFieldForNull(value) {
//       if (value != null && (value != "" || value !== "") && value != undefined) {
//           return false;
//       }
//       return true;
//   }


//   function cfn(invalue) {
//       return checkFieldForNull(invalue);
//   }

//   function getDDLValues(element) {
//       if ($(element).hasClass('chosen-select') == true) {
//           return (cfn($(element).val()) ? null : $(element).val());
//       } else if ($(element).parent().hasClass('multiselect-native-select') == true) {
//           if (!cfn($(element).val())) {
//               if (Array.isArray($(element).val()) == true) {
//                   if ($(element).val()[0] == "") {
//                       return null;
//                   } else {
//                       return $(element).val().join();
//                   }
//               } else {
//                   return $(element).val();
//               }
//           } else {
//               return null;
//           }
//       } else {
//           return (cfn($(element).val()) ? null : $(element).val());
//       }
//   }


//   $('body').on('keyup', '.txtChangeToDecimal', function () {
//       var number = $(this).val().split(".").join("")

//       if (number.length <= 2 && number.length > 0) {
//           newone = "." + number;
//       } else if (number.length <= 0) {
//           newone = "";
//       }
//       else {
//           leftside = number.substr(0, number.length - 2);
//           rigthside = number.substr(number.length - 2, number.length);
//           newone = leftside + "." + rigthside;
//       }
//       if (newone[0] == "0") {
//           newone = newone.substr(1, number.length);
//       }
//       if (newone[0] == ".") {
//           newone = "0" + newone;
//       }
//       $(this).val(newone);
//   })

//   var dateFormat = function () {
//       var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
//           timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
//           timezoneClip = /[^-+\dA-Z]/g,
//           pad = function (val, len) {
//               val = String(val);
//               len = len || 2;
//               while (val.length < len) val = "0" + val;
//               return val;
//           };

//       // Regexes and supporting functions are cached through closure
//       return function (date, mask, utc) {
//           var dF = dateFormat;

//           // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
//           if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
//               mask = date;
//               date = undefined;
//           }

//           // Passing date through Date applies Date.parse, if necessary
//           date = date ? new Date(date) : new Date;
//           if (isNaN(date)) throw SyntaxError("invalid date");

//           mask = String(dF.masks[mask] || mask || dF.masks["default"]);

//           // Allow setting the utc argument via the mask
//           if (mask.slice(0, 4) == "UTC:") {
//               mask = mask.slice(4);
//               utc = true;
//           }

//           var _ = utc ? "getUTC" : "get",
//               d = date[_ + "Date"](),
//               D = date[_ + "Day"](),
//               m = date[_ + "Month"](),
//               y = date[_ + "FullYear"](),
//               H = date[_ + "Hours"](),
//               M = date[_ + "Minutes"](),
//               s = date[_ + "Seconds"](),
//               L = date[_ + "Milliseconds"](),
//               o = utc ? 0 : date.getTimezoneOffset(),
//               flags = {
//                   d: d,
//                   dd: pad(d),
//                   ddd: dF.i18n.dayNames[D],
//                   dddd: dF.i18n.dayNames[D + 7],
//                   m: m + 1,
//                   mm: pad(m + 1),
//                   mmm: dF.i18n.monthNames[m],
//                   mmmm: dF.i18n.monthNames[m + 12],
//                   yy: String(y).slice(2),
//                   yyyy: y,
//                   h: H % 12 || 12,
//                   hh: pad(H % 12 || 12),
//                   H: H,
//                   HH: pad(H),
//                   M: M,
//                   MM: pad(M),
//                   s: s,
//                   ss: pad(s),
//                   l: pad(L, 3),
//                   L: pad(L > 99 ? Math.round(L / 10) : L),
//                   t: H < 12 ? "a" : "p",
//                   tt: H < 12 ? "am" : "pm",
//                   T: H < 12 ? "A" : "P",
//                   TT: H < 12 ? "AM" : "PM",
//                   Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
//                   o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
//                   S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
//               };

//           return mask.replace(token, function ($0) {
//               return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
//           });
//       };
//   }();

//   // Some common format strings
//   dateFormat.masks = {
//       "default": "ddd mmm dd yyyy HH:MM:ss",
//       shortDate: "m/d/yy",
//       mediumDate: "mmm d, yyyy",
//       longDate: "mmmm d, yyyy",
//       fullDate: "dddd, mmmm d, yyyy",
//       shortTime: "h:MM TT",
//       mediumTime: "h:MM:ss TT",
//       longTime: "h:MM:ss TT Z",
//       isoDate: "yyyy-mm-dd",
//       isoTime: "HH:MM:ss",
//       isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
//       isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
//   };

//   // Internationalization strings
//   dateFormat.i18n = {
//       dayNames: [
//           "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
//           "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
//       ],
//       monthNames: [
//           "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
//           "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
//       ]
//   };

//   // For convenience...
//   Date.prototype.format = function (mask, utc) {
//       return dateFormat(this, mask, utc);
//   };


//   function GetCardIndexByAppID(appointmentlist, AppID) {
//       cardidx = 0;
//       $.each(appointmentlist, function (i, v) {
//           if (v.ApId == AppID) {
//               return false;
//           }
//           cardidx++;
//       });
//       return cardidx;
//   }

  /* This function is used to convert json date i.e., "/Date(1533493800000)/" to "mm/dd/yyyy" date format */
  function parseJsonDate(jsonDateString) {
      if (!cfn(jsonDateString)) {
          return new Date(parseInt(jsonDateString.replace('/Date(', ''))).format("mm/dd/yyyy");
      } else {
          return "";
      }

  }

  function CheckSpecialCharactersInName(name) {
      var pattern = new RegExp(/\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\<|\,|\.|\>|\?|\/|\"|\;|\:/g); //new RegExp(/([a-zA-Z\s])"/);
      return pattern.test(name);
  };

  //$(document).ajaxSend(function () {
  //    $('#loadingmessage').show();
  //});

  //$(document).ajaxComplete(function () {
  //    $('#loadingmessage').hide();
  //});

  function formatMoneyToUSFormat(n, c, d, t) {
      var c = isNaN(c = Math.abs(c)) ? 2 : c,
          d = d == undefined ? "." : d,
          t = t == undefined ? "," : t,
          s = n < 0 ? "-" : "",
          i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
          j = (j = i.length) > 3 ? j % 3 : 0;

      return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
  };

  function ReplaceSpecialCharactersWithSpace(str) {
      if (!cfn(str)) {
          str = str.replace(/[0-9`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
      }
      return str;
  };

  function getComparisionPercentage(totalamt, comparingamt) {
      if (cfn(totalamt) || totalamt == 0) {
          return "0%";
      } else if (!cfn(totalamt) && totalamt > 0 && (cfn(comparingamt) || comparingamt == 0)) {
          return "0%";
      } else if (!cfn(totalamt) && totalamt > 0 && !cfn(comparingamt) && comparingamt > 0) {
          return Math.abs(((parseFloat(comparingamt) * 100) / parseFloat(totalamt))).toFixed(2).toString() + "%";
      }
  };

  function LoadPlaceOfServicePractices(dropdown, methodname, ismultiselect, selectedids) {
      if (!cfn(methodname) && methodname != "undefined") {
          $.get(methodname, function (results) {
              var practices = JSON.parse(results);

              $(dropdown).empty();
              $(dropdown).append($('<option></option>').text('Any').val(''));
              $.each(practices, function (index, item) {
                  $(dropdown).append($('<option></option>').text(item.Name).val(item.Id));
              });
              if (ismultiselect == "true") {
                  $(dropdown).multiselect({
                      enableFiltering: true,
                      maxHeight: 250,
                      enableCaseInsensitiveFiltering: true
                  });
              } else {
                  $(dropdown).trigger("chosen:updated");
              }

          }).complete(function (r) {

              $(dropdown).val(selectedids).trigger('chosen:updated');
          });
      }
  };


  function LoadPlaceOfServiceLocations(dropdown, methodname, parameters, ismultiselect, selectedids) {
      if (!cfn(methodname) && methodname != "undefined") {
          $.get(methodname, { PracticeIds: parameters }, function (results) {
              locations = JSON.parse(results);

              $(dropdown).empty();
              $(dropdown).append($('<option></option>').text('Any').val(''));
              $.each(locations, function (index, item) {
                  $(dropdown).append($('<option></option>').text(item.Name).val(item.Id));
              });
              if (ismultiselect == "true") {
                  $(dropdown).multiselect({
                      enableFiltering: true,
                      maxHeight: 250,
                      enableCaseInsensitiveFiltering: true
                  });
              } else {
                  $(dropdown).trigger("chosen:updated");
              }
          }).complete(function (r) {

              $(dropdown).val(selectedids).trigger('chosen:updated');
          });
      }
  };

  function LoadDropDownOptions(dropdown, methodname, ismultiselect, selectedids) {
      if (!cfn(methodname) && methodname != "undefined") {
          $.get(methodname, function (results) {
              var optionvalues = JSON.parse(results);

              $(dropdown).empty();
              $(dropdown).append($('<option></option>').text('Any').val(''));
              $.each(optionvalues, function (index, item) {
                  $(dropdown).append($('<option></option>').text(item.Name).val(item.Id));
              });
              if (ismultiselect == "true") {
                  $(dropdown).multiselect({
                      enableFiltering: true,
                      maxHeight: 250,
                      enableCaseInsensitiveFiltering: true
                  });
              } else {
                  $(dropdown).trigger("chosen:updated");
              }

          }).complete(function (r) {

              $(dropdown).val(selectedids).trigger('chosen:updated');
          });
      }
  }

  function setReleaseNotes() {

      if (!cfn($('#hddMenuReleaseNotes').val())) {
          var menulist = JSON.parse($('#hddMenuReleaseNotes').val());

          var methodname = window.location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
          var item = menulist.filter(h => h.Method == methodname);

          $('#spnCurrentRelease').addClass('hide');
          $('#spnCurrentRelease').hide();
          $('#spnNextRelease').addClass('hide');
          $('#spnNextRelease').hide();
          $('#spnConsolidatedRelease').addClass('hide');
          $('#spnConsolidatedRelease').hide();




          if (!cfn(item) && item.length > 0) {
              $('.spnPageName').html(item[0].Name);

              if (!cfn(item[0].ConsoliDateFileName)) {
                  $('#spnConsolidatedRelease').removeClass('hide');
                  $('#spnConsolidatedRelease').show();
                  $('#spnConsolidatedRelease').find('.lnkViewS3Document').attr('data-fileName', item[0].ConsoliDateFileName);
                  $('.lnkCurrentDBReleaseNotes').attr('data-fileName', item[0].ConsoliDateFileName);
              }

              if (!cfn(item[0].CurrentReleaseFileName)) {
                  $('#spnCurrentRelease').removeClass('hide');
                  $('#spnCurrentRelease').show();
                  $('#spnCurrentRelease').find('.lnkViewS3Document').attr('data-fileName', item[0].CurrentReleaseFileName);
                  $('.clsCurrentdropup').addClass('blink_me');
                  $('.clsCurrentdropup').show();
              }

              if (!cfn(item[0].UpComingReleaseFileName)) {
                  $('#spnNextRelease').removeClass('hide');
                  $('#spnNextRelease').show();
                  $('#spnNextRelease').find('.lnkViewS3Document').attr('data-fileName', item[0].UpComingReleaseFileName);
                  $('.lnkUpcmngDBReleaseNotes').attr('data-fileName', item[0].UpComingReleaseFileName);
                  $('.clsFuturedropup').addClass('blink_me');
                  $('.clsFuturedropup').show();

              } else {
                  $('.lnkUpcmngDBReleaseNotes').addClass('hide');
                  $('.lnkUpcmngDBReleaseNotes').hide();
              }
              if (!cfn(item[0].CurrentReleaseVersionCurrentDoc)) {
                  $('.lnkCurrentGeneralReleaseNotes').attr('data-fileName', item[0].CurrentReleaseVersionCurrentDoc);
              }
              if (!cfn(item[0].CurrentReleaseVersionUpcomingDoc)) {
                  $('.lnkUpcmngGeneralReleaseNotes').attr('data-fileName', item[0].CurrentReleaseVersionUpcomingDoc);
              }
          }
      }

      if (cfn(window.localStorage.getItem('releasenotesread')) || window.localStorage.getItem('releasenotesread') == "false") {
         // NewReleaseNotesNotification(item);

      }
  }

  function InitiateMultiSelectDropDown(element) {
      if (!cfn(element)) {
          $(element).multiselect({
              enableFiltering: true,
              maxHeight: 250,
              enableCaseInsensitiveFiltering: true
          });

      }
  }

//   $('body').on('click', '.lnkViewReleaseS3Document', function () {
//       toastr.clear();
//       var fiename = $(this).attr('data-fileName');
//       var filesrc = $(this).attr('data-urlsrc');
//       if (cfn(fiename)) {
//           toastrerror('Release note document not uploaded please check back', 'Mandatory fields');
//           return false;
//       } else {
//           $('.inmodal.in').last().modal('hide');
//           window.localStorage.setItem('releasenotesread', 'true');
//           window.open(filesrc + encodeURIComponent(fiename), "_blank");
//       }
//   });


  $('body').on('click', '.closeNewUpdatePopup', function () {
      $('.inmodal.in').last().modal('hide');
      window.localStorage.setItem('releasenotesread', 'true');
  });


  function NewReleaseNotesNotification(item) {
      $('#NewReleaseNotesNotification').html();
      $('#NewReleaseNotesNotification').modal({ keyboard: false, backdrop: 'static' });
      if (item.length > 0 && !cfn(item[0].CurrentReleaseVersionCurrentDoc)) {
          $('.ViewCurrentReleaseNotes').attr('data-fileName', item[0].CurrentReleaseVersionCurrentDoc);
      }
  }



  var twilioCallingPhoneObj;
  var twilioTokenReceived = false;
  $(function () {

      $('body').on('click', '#btnTwilio', function () {
          $('#dvTwilio').modal({ keyboard: false, backdrop: 'static' });
      });
  });

//   function RegisterTwilio() {
//       if ($('.twiliocall').length > 0 && !twilioTokenReceived) {
//           log('Requesting Capability Token...');
//           var geturl = $('#twiliotokenurl').data('gurl');
//           if (geturl == null || geturl == undefined) {
//               console.log('Invalid twilio token url');
//               twilioTokenReceived = true;
//               return true;
//           }
//           $.getJSON(geturl)
//             .done(function (data) {
//                 //log('Got a token.');
//                 //console.log('Token: ' + data.token);
//                 twilioTokenReceived = true;
//                 if (data != null && data != undefined && data.token != null && $.trim(data.token) != "") {


//                     // Setup Twilio.Device
//                     Twilio.Device.setup(data.token);

//                     Twilio.Device.ready(function (device) {
//                         log('Twilio.Device Ready!');
//                         //document.getElementById('call-controls').style.display = 'block';
//                     });

//                     Twilio.Device.error(function (error) {
//                         log('Twilio.Device Error: ' + error.message);
//                     });

//                     Twilio.Device.connect(function (conn) {
//                         log('Successfully established call!');

//                         //document.getElementById('button-call').style.display = 'none';
//                         //document.getElementById('button-hangup').style.display = 'inline';
//                     });

//                     Twilio.Device.disconnect(function (conn) {
//                         $(twilioCallingPhoneObj).css('background-color', 'lightgreen');
//                         $(twilioCallingPhoneObj).removeClass('twiliocallhang');
//                         log('Call ended.');
//                         //document.getElementById('button-call').style.display = 'inline';
//                         //document.getElementById('button-hangup').style.display = 'none';
//                     });

//                     Twilio.Device.incoming(function (conn) {
//                         log('Incoming connection from ' + conn.parameters.From);
//                         var archEnemyPhoneNumber = '+12099517118';

//                         if (conn.parameters.From === archEnemyPhoneNumber) {
//                             conn.reject();
//                             log('It\'s your nemesis. Rejected call.');
//                         } else {
//                             // accept the incoming connection and start two-way audio
//                             conn.accept();
//                         }
//                     });

//                     setClientNameUI(data.identity);
//                 }
//             })
//             .fail(function () {
//                 log('Could not get a token from server!');
//             });

//       }
//       // Bind button to make call
//       //document.getElementById('button-call').onclick = function () {
//       $(document.body).off('click', '.twiliocall');
//       $(document.body).on('click', '.twiliocall', function (e) {
//           // get the phone number to connect the call to
//           e.stopPropagation();
//           twilioCallingPhoneObj = $(this);
//           $(twilioCallingPhoneObj).css('background-color', 'red');
//           $(this).addClass('twiliocallhang');
//           var params = {
//               To: $(this).data('phnumber')
//           };

//           try {
//               //console.log('Calling ' + params.To + '...');
//               Twilio.Device.connect(params);
//           } catch (e) {
//               $(twilioCallingPhoneObj).css('background-color', 'lightgreen'); toastr.clear(); toastrwarning('Twilio service is unavailable. Please contact the support team.', 'Info', {
//                   "showDuration": "1000",
//                   "hideDuration": "1000",
//                   "timeOut": "5000",
//                   "extendedTimeOut": "1000", "progressBar": true,
//                   "positionClass": "toast-bottom-right"
//               });
//           }
//       });

//       // Bind button to hangup call
//       //document.getElementById('button-hangup').onclick = function () {
//       $(document.body).off('click', '.twiliocallhang');
//       $(document.body).on('click', '.twiliocallhang', function () {
//           log('Hanging up...');
//           Twilio.Device.disconnectAll();
//       });


//       /************ SMS Registration ********************/
//       $(document.body).off('click', '.twiliosms');
//       $(document.body).on('click', '.twiliosms', function () {
//           var btnSmssend = $('#btnSendTwilioSMS');
//           btnSmssend.data('phnumber', '');
//           btnSmssend.data('episodeid', '');
//           btnSmssend.data('patientid', '');
//           btnSmssend.data('surgerydetailsid', '');


//           btnSmssend.data('phnumber', $(this).data('phnumber'));
//           btnSmssend.data('episodeid', $(this).data('episodeid'));
//           btnSmssend.data('patientid', $(this).data('patientid'));
//           $('#mdlTwilioSMS').modal({ keyboard: false, backdrop: 'static' });
//       });

//       $(document.body).off('click', '#btnTwilioSMSCancel');
//       $(document.body).on('click', '#btnTwilioSMSCancel', function () {
//           $('#mdlTwilioSMS').modal('hide');
//           $('#txtTwilioSMS').val("");
//       });

//       if ($('#btnSendTwilioSMS').length > 0) {
//           $(document.body).off('click', '#btnSendTwilioSMS');
//           $(document.body).on('click', '#btnSendTwilioSMS', function () {

//               var phnumber = $(this).data('phnumber');
//               var episodeid = $(this).data('episodeid');
//               var patientid = $(this).data('patientid');
//               var smstext = $('#txtTwilioSMS').val();
//               var surgerydetailsid = $(this).data('surgerydetailsid');
//               $.ajax({
//                   url: $(this).data('posturl'),
//                   type: 'POST',
//                   dataType: 'html',
//                   data: {
//                       ToNumber: phnumber,
//                       SmsText: smstext,
//                       PatientId: patientid,
//                       EpisodeId: episodeid,
//                       SurgeryId: surgerydetailsid
//                   }
//                          ,
//                   success: function (result) {
//                       var res = res = $.parseJSON(result);
//                       if (!res.success) {
//                           var errorList = '<ul>';
//                           $.each(res.errors, function (indx, obj) {
//                               errorList = errorList + '<li>' + obj + '</li>';
//                           });
//                           errorList = errorList + '</ul>';
//                           toastrerror(errorList, 'Mandatory Fields');
//                       }
//                       else {
//                           $('#mdlTwilioSMS').modal('hide');
//                           $('#txtTwilioSMS').val("");
//                           toastrsuccess("Message sent successfully");
//                       }
//                   }
//               });
//           });
//       }

//       if ($('#btnSendTwilioFax').length > 0) {
//           $(document.body).off('click', '#btnSendTwilioFax');
//           $(document.body).on('click', '#btnSendTwilioFax', function () {

//               $.ajax({
//                   url: $(this).data('posturl'),
//                   type: 'POST',
//                   dataType: 'html',
//                   success: function (result) {
//                       var res = res = $.parseJSON(result);
//                       if (!res.success) {
//                           var errorList = '<ul>';
//                           $.each(res.errors, function (indx, obj) {
//                               errorList = errorList + '<li>' + obj + '</li>';
//                           });
//                           errorList = errorList + '</ul>';
//                           toastrerror(errorList, 'Mandatory Fields');

//                       }
//                       else {
//                           toastrsuccess("Message sent successfully");

//                       }
//                   }
//               });
//           });
//       }
//   }

  // Activity log
  function log(message) {
      //var logDiv = document.getElementById('log');
      //logDiv.innerHTML += '<p>&gt;&nbsp;' + message + '</p>';
      //logDiv.scrollTop = logDiv.scrollHeight;
  }

  // Set the client name in the UI
  function setClientNameUI(clientName) {
      //var div = document.getElementById('client-name');
      //div.innerHTML = 'Your client name: <strong>' + clientName +
      //  '</strong>';
  }
  /*!
  Chosen, a Select Box Enhancer for jQuery and Prototype
  by Patrick Filler for Harvest, http://getharvest.com

  Version 1.6.1
  Full source at https://github.com/harvesthq/chosen
  Copyright (c) 2011-2016 Harvest http://getharvest.com

  MIT License, https://github.com/harvesthq/chosen/blob/master/LICENSE.md
  This file is generated by `grunt build`, do not edit it by hand.
  */

//   (function() {
//     var $, AbstractChosen, Chosen, SelectParser, _ref,
//       __hasProp = {}.hasOwnProperty,
//       __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

//     SelectParser = (function() {
//       function SelectParser() {
//         this.options_index = 0;
//         this.parsed = [];
//       }

//       SelectParser.prototype.add_node = function(child) {
//         if (child.nodeName.toUpperCase() === "OPTGROUP") {
//           return this.add_group(child);
//         } else {
//           return this.add_option(child);
//         }
//       };

//       SelectParser.prototype.add_group = function(group) {
//         var group_position, option, _i, _len, _ref, _results;
//         group_position = this.parsed.length;
//         this.parsed.push({
//           array_index: group_position,
//           group: true,
//           label: this.escapeExpression(group.label),
//           title: group.title ? group.title : void 0,
//           children: 0,
//           disabled: group.disabled,
//           classes: group.className
//         });
//         _ref = group.childNodes;
//         _results = [];
//         for (_i = 0, _len = _ref.length; _i < _len; _i++) {
//           option = _ref[_i];
//           _results.push(this.add_option(option, group_position, group.disabled));
//         }
//         return _results;
//       };

//       SelectParser.prototype.add_option = function(option, group_position, group_disabled) {
//         if (option.nodeName.toUpperCase() === "OPTION") {
//           if (option.text !== "") {
//             if (group_position != null) {
//               this.parsed[group_position].children += 1;
//             }
//             this.parsed.push({
//               array_index: this.parsed.length,
//               options_index: this.options_index,
//               value: option.value,
//               text: option.text,
//               html: option.innerHTML,
//               title: option.title ? option.title : void 0,
//               selected: option.selected,
//               disabled: group_disabled === true ? group_disabled : option.disabled,
//               group_array_index: group_position,
//               group_label: group_position != null ? this.parsed[group_position].label : null,
//               classes: option.className,
//               style: option.style.cssText
//             });
//           } else {
//             this.parsed.push({
//               array_index: this.parsed.length,
//               options_index: this.options_index,
//               empty: true
//             });
//           }
//           return this.options_index += 1;
//         }
//       };

//       SelectParser.prototype.escapeExpression = function(text) {
//         var map, unsafe_chars;
//         if ((text == null) || text === false) {
//           return "";
//         }
//         if (!/[\&\<\>\"\'\`]/.test(text)) {
//           return text;
//         }
//         map = {
//           "<": "&lt;",
//           ">": "&gt;",
//           '"': "&quot;",
//           "'": "&#x27;",
//           "`": "&#x60;"
//         };
//         unsafe_chars = /&(?!\w+;)|[\<\>\"\'\`]/g;
//         return text.replace(unsafe_chars, function(chr) {
//           return map[chr] || "&amp;";
//         });
//       };

//       return SelectParser;

//     })();

//     SelectParser.select_to_array = function(select) {
//       var child, parser, _i, _len, _ref;
//       parser = new SelectParser();
//       _ref = select.childNodes;
//       for (_i = 0, _len = _ref.length; _i < _len; _i++) {
//         child = _ref[_i];
//         parser.add_node(child);
//       }
//       return parser.parsed;
//     };

//     AbstractChosen = (function() {
//       function AbstractChosen(form_field, options) {
//         this.form_field = form_field;
//         this.options = options != null ? options : {};
//         if (!AbstractChosen.browser_is_supported()) {
//           return;
//         }
//         this.is_multiple = this.form_field.multiple;
//         this.set_default_text();
//         this.set_default_values();
//         this.setup();
//         this.set_up_html();
//         this.register_observers();
//         this.on_ready();
//       }

//       AbstractChosen.prototype.set_default_values = function() {
//         var _this = this;
//         this.click_test_action = function(evt) {
//           return _this.test_active_click(evt);
//         };
//         this.activate_action = function(evt) {
//           return _this.activate_field(evt);
//         };
//         this.active_field = false;
//         this.mouse_on_container = false;
//         this.results_showing = false;
//         this.result_highlighted = null;
//         this.allow_single_deselect = (this.options.allow_single_deselect != null) && (this.form_field.options[0] != null) && this.form_field.options[0].text === "" ? this.options.allow_single_deselect : false;
//         this.disable_search_threshold = this.options.disable_search_threshold || 0;
//         this.disable_search = this.options.disable_search || false;
//         this.enable_split_word_search = this.options.enable_split_word_search != null ? this.options.enable_split_word_search : true;
//         this.group_search = this.options.group_search != null ? this.options.group_search : true;
//         this.search_contains = this.options.search_contains || false;
//         this.single_backstroke_delete = this.options.single_backstroke_delete != null ? this.options.single_backstroke_delete : true;
//         this.max_selected_options = this.options.max_selected_options || Infinity;
//         this.inherit_select_classes = this.options.inherit_select_classes || false;
//         this.display_selected_options = this.options.display_selected_options != null ? this.options.display_selected_options : true;
//         this.display_disabled_options = this.options.display_disabled_options != null ? this.options.display_disabled_options : true;
//         this.include_group_label_in_selected = this.options.include_group_label_in_selected || false;
//         this.max_shown_results = this.options.max_shown_results || Number.POSITIVE_INFINITY;
//         return this.case_sensitive_search = this.options.case_sensitive_search || false;
//       };

//       AbstractChosen.prototype.set_default_text = function() {
//         if (this.form_field.getAttribute("data-placeholder")) {
//           this.default_text = this.form_field.getAttribute("data-placeholder");
//         } else if (this.is_multiple) {
//           this.default_text = this.options.placeholder_text_multiple || this.options.placeholder_text || AbstractChosen.default_multiple_text;
//         } else {
//           this.default_text = this.options.placeholder_text_single || this.options.placeholder_text || AbstractChosen.default_single_text;
//         }
//         return this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || AbstractChosen.default_no_result_text;
//       };

//       AbstractChosen.prototype.choice_label = function(item) {
//         if (this.include_group_label_in_selected && (item.group_label != null)) {
//           return "<b class='group-name'>" + item.group_label + "</b>" + item.html;
//         } else {
//           return item.html;
//         }
//       };

//       AbstractChosen.prototype.mouse_enter = function() {
//         return this.mouse_on_container = true;
//       };

//       AbstractChosen.prototype.mouse_leave = function() {
//         return this.mouse_on_container = false;
//       };

//       AbstractChosen.prototype.input_focus = function(evt) {
//         var _this = this;
//         if (this.is_multiple) {
//           if (!this.active_field) {
//             return setTimeout((function() {
//               return _this.container_mousedown();
//             }), 50);
//           }
//         } else {
//           if (!this.active_field) {
//             return this.activate_field();
//           }
//         }
//       };

//       AbstractChosen.prototype.input_blur = function(evt) {
//         var _this = this;
//         if (!this.mouse_on_container) {
//           this.active_field = false;
//           return setTimeout((function() {
//             return _this.blur_test();
//           }), 100);
//         }
//       };

//       AbstractChosen.prototype.results_option_build = function(options) {
//         var content, data, data_content, shown_results, _i, _len, _ref;
//         content = '';
//         shown_results = 0;
//         _ref = this.results_data;
//         for (_i = 0, _len = _ref.length; _i < _len; _i++) {
//           data = _ref[_i];
//           data_content = '';
//           if (data.group) {
//             data_content = this.result_add_group(data);
//           } else {
//             data_content = this.result_add_option(data);
//           }
//           if (data_content !== '') {
//             shown_results++;
//             content += data_content;
//           }
//           if (options != null ? options.first : void 0) {
//             if (data.selected && this.is_multiple) {
//               this.choice_build(data);
//             } else if (data.selected && !this.is_multiple) {
//               this.single_set_selected_text(this.choice_label(data));
//             }
//           }
//           if (shown_results >= this.max_shown_results) {
//             break;
//           }
//         }
//         return content;
//       };

//       AbstractChosen.prototype.result_add_option = function(option) {
//         var classes, option_el;
//         if (!option.search_match) {
//           return '';
//         }
//         if (!this.include_option_in_results(option)) {
//           return '';
//         }
//         classes = [];
//         if (!option.disabled && !(option.selected && this.is_multiple)) {
//           classes.push("active-result");
//         }
//         if (option.disabled && !(option.selected && this.is_multiple)) {
//           classes.push("disabled-result");
//         }
//         if (option.selected) {
//           classes.push("result-selected");
//         }
//         if (option.group_array_index != null) {
//           classes.push("group-option");
//         }
//         if (option.classes !== "") {
//           classes.push(option.classes);
//         }
//         option_el = document.createElement("li");
//         option_el.className = classes.join(" ");
//         option_el.style.cssText = option.style;
//         option_el.setAttribute("data-option-array-index", option.array_index);
//         option_el.innerHTML = option.search_text;
//         if (option.title) {
//           option_el.title = option.title;
//         }
//         return this.outerHTML(option_el);
//       };

//       AbstractChosen.prototype.result_add_group = function(group) {
//         var classes, group_el;
//         if (!(group.search_match || group.group_match)) {
//           return '';
//         }
//         if (!(group.active_options > 0)) {
//           return '';
//         }
//         classes = [];
//         classes.push("group-result");
//         if (group.classes) {
//           classes.push(group.classes);
//         }
//         group_el = document.createElement("li");
//         group_el.className = classes.join(" ");
//         group_el.innerHTML = group.search_text;
//         if (group.title) {
//           group_el.title = group.title;
//         }
//         return this.outerHTML(group_el);
//       };

//       AbstractChosen.prototype.results_update_field = function() {
//         this.set_default_text();
//         if (!this.is_multiple) {
//           this.results_reset_cleanup();
//         }
//         this.result_clear_highlight();
//         this.results_build();
//         if (this.results_showing) {
//           return this.winnow_results();
//         }
//       };

//       AbstractChosen.prototype.reset_single_select_options = function() {
//         var result, _i, _len, _ref, _results;
//         _ref = this.results_data;
//         _results = [];
//         for (_i = 0, _len = _ref.length; _i < _len; _i++) {
//           result = _ref[_i];
//           if (result.selected) {
//             _results.push(result.selected = false);
//           } else {
//             _results.push(void 0);
//           }
//         }
//         return _results;
//       };

//       AbstractChosen.prototype.results_toggle = function() {
//         if (this.results_showing) {
//           return this.results_hide();
//         } else {
//           return this.results_show();
//         }
//       };

//       AbstractChosen.prototype.results_search = function(evt) {
//         if (this.results_showing) {
//           return this.winnow_results();
//         } else {
//           return this.results_show();
//         }
//       };

//       AbstractChosen.prototype.winnow_results = function() {
//         var escapedSearchText, option, regex, results, results_group, searchText, startpos, text, zregex, _i, _len, _ref;
//         this.no_results_clear();
//         results = 0;
//         searchText = this.get_search_text();
//         escapedSearchText = searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
//         zregex = new RegExp(escapedSearchText, 'i');
//         regex = this.get_search_regex(escapedSearchText);
//         _ref = this.results_data;
//         for (_i = 0, _len = _ref.length; _i < _len; _i++) {
//           option = _ref[_i];
//           option.search_match = false;
//           results_group = null;
//           if (this.include_option_in_results(option)) {
//             if (option.group) {
//               option.group_match = false;
//               option.active_options = 0;
//             }
//             if ((option.group_array_index != null) && this.results_data[option.group_array_index]) {
//               results_group = this.results_data[option.group_array_index];
//               if (results_group.active_options === 0 && results_group.search_match) {
//                 results += 1;
//               }
//               results_group.active_options += 1;
//             }
//             option.search_text = option.group ? option.label : option.html;
//             if (!(option.group && !this.group_search)) {
//               option.search_match = this.search_string_match(option.search_text, regex);
//               if (option.search_match && !option.group) {
//                 results += 1;
//               }
//               if (option.search_match) {
//                 if (searchText.length) {
//                   startpos = option.search_text.search(zregex);
//                   text = option.search_text.substr(0, startpos + searchText.length) + '</em>' + option.search_text.substr(startpos + searchText.length);
//                   option.search_text = text.substr(0, startpos) + '<em>' + text.substr(startpos);
//                 }
//                 if (results_group != null) {
//                   results_group.group_match = true;
//                 }
//               } else if ((option.group_array_index != null) && this.results_data[option.group_array_index].search_match) {
//                 option.search_match = true;
//               }
//             }
//           }
//         }
//         this.result_clear_highlight();
//         if (results < 1 && searchText.length) {
//           this.update_results_content("");
//           return this.no_results(searchText);
//         } else {
//           this.update_results_content(this.results_option_build());
//           return this.winnow_results_set_highlight();
//         }
//       };

//       AbstractChosen.prototype.get_search_regex = function(escaped_search_string) {
//         var regex_anchor, regex_flag;
//         regex_anchor = this.search_contains ? "" : "^";
//         regex_flag = this.case_sensitive_search ? "" : "i";
//         return new RegExp(regex_anchor + escaped_search_string, regex_flag);
//       };

//       AbstractChosen.prototype.search_string_match = function(search_string, regex) {
//         var part, parts, _i, _len;
//         if (regex.test(search_string)) {
//           return true;
//         } else if (this.enable_split_word_search && (search_string.indexOf(" ") >= 0 || search_string.indexOf("[") === 0)) {
//           parts = search_string.replace(/\[|\]/g, "").split(" ");
//           if (parts.length) {
//             for (_i = 0, _len = parts.length; _i < _len; _i++) {
//               part = parts[_i];
//               if (regex.test(part)) {
//                 return true;
//               }
//             }
//           }
//         }
//       };

//       AbstractChosen.prototype.choices_count = function() {
//         var option, _i, _len, _ref;
//         if (this.selected_option_count != null) {
//           return this.selected_option_count;
//         }
//         this.selected_option_count = 0;
//         _ref = this.form_field.options;
//         for (_i = 0, _len = _ref.length; _i < _len; _i++) {
//           option = _ref[_i];
//           if (option.selected) {
//             this.selected_option_count += 1;
//           }
//         }
//         return this.selected_option_count;
//       };

//       AbstractChosen.prototype.choices_click = function(evt) {
//         evt.preventDefault();
//         if (!(this.results_showing || this.is_disabled)) {
//           return this.results_show();
//         }
//       };

//       AbstractChosen.prototype.keyup_checker = function(evt) {
//         var stroke, _ref;
//         stroke = (_ref = evt.which) != null ? _ref : evt.keyCode;
//         this.search_field_scale();
//         switch (stroke) {
//           case 8:
//             if (this.is_multiple && this.backstroke_length < 1 && this.choices_count() > 0) {
//               return this.keydown_backstroke();
//             } else if (!this.pending_backstroke) {
//               this.result_clear_highlight();
//               return this.results_search();
//             }
//             break;
//           case 13:
//             evt.preventDefault();
//             if (this.results_showing) {
//               return this.result_select(evt);
//             }
//             break;
//           case 27:
//             if (this.results_showing) {
//               this.results_hide();
//             }
//             return true;
//           case 9:
//           case 38:
//           case 40:
//           case 16:
//           case 91:
//           case 17:
//           case 18:
//             break;
//           default:
//             return this.results_search();
//         }
//       };

//       AbstractChosen.prototype.clipboard_event_checker = function(evt) {
//         var _this = this;
//         return setTimeout((function() {
//           return _this.results_search();
//         }), 50);
//       };

//       AbstractChosen.prototype.container_width = function() {
//         if (this.options.width != null) {
//           return this.options.width;
//         } else {
//           return "" + this.form_field.offsetWidth + "px";
//         }
//       };

//       AbstractChosen.prototype.include_option_in_results = function(option) {
//         if (this.is_multiple && (!this.display_selected_options && option.selected)) {
//           return false;
//         }
//         if (!this.display_disabled_options && option.disabled) {
//           return false;
//         }
//         if (option.empty) {
//           return false;
//         }
//         return true;
//       };

//       AbstractChosen.prototype.search_results_touchstart = function(evt) {
//         this.touch_started = true;
//         return this.search_results_mouseover(evt);
//       };

//       AbstractChosen.prototype.search_results_touchmove = function(evt) {
//         this.touch_started = false;
//         return this.search_results_mouseout(evt);
//       };

//       AbstractChosen.prototype.search_results_touchend = function(evt) {
//         if (this.touch_started) {
//           return this.search_results_mouseup(evt);
//         }
//       };

//       AbstractChosen.prototype.outerHTML = function(element) {
//         var tmp;
//         if (element.outerHTML) {
//           return element.outerHTML;
//         }
//         tmp = document.createElement("div");
//         tmp.appendChild(element);
//         return tmp.innerHTML;
//       };

//       AbstractChosen.browser_is_supported = function() {
//         if ("Microsoft Internet Explorer" === window.navigator.appName) {
//           return document.documentMode >= 8;
//         }
//         if (/iP(od|hone)/i.test(window.navigator.userAgent) || /IEMobile/i.test(window.navigator.userAgent) || /Windows Phone/i.test(window.navigator.userAgent) || /BlackBerry/i.test(window.navigator.userAgent) || /BB10/i.test(window.navigator.userAgent) || /Android.*Mobile/i.test(window.navigator.userAgent)) {
//           return false;
//         }
//         return true;
//       };

//       AbstractChosen.default_multiple_text = "Select Some Options";

//       AbstractChosen.default_single_text = "Select an Option";

//       AbstractChosen.default_no_result_text = "No results match";

//       return AbstractChosen;

//     })();

//     $ = jQuery;

//     $.fn.extend({
//       chosen: function(options) {
//         if (!AbstractChosen.browser_is_supported()) {
//           return this;
//         }
//         return this.each(function(input_field) {
//           var $this, chosen;
//           $this = $(this);
//           chosen = $this.data('chosen');
//           if (options === 'destroy') {
//             if (chosen instanceof Chosen) {
//               chosen.destroy();
//             }
//             return;
//           }
//           if (!(chosen instanceof Chosen)) {
//             $this.data('chosen', new Chosen(this, options));
//           }
//         });
//       }
//     });

//     Chosen = (function(_super) {
//       __extends(Chosen, _super);

//       function Chosen() {
//         _ref = Chosen.__super__.constructor.apply(this, arguments);
//         return _ref;
//       }

//       Chosen.prototype.setup = function() {
//         this.form_field_jq = $(this.form_field);
//         this.current_selectedIndex = this.form_field.selectedIndex;
//         return this.is_rtl = this.form_field_jq.hasClass("chosen-rtl");
//       };

//       Chosen.prototype.set_up_html = function() {
//         var container_classes, container_props;
//         container_classes = ["chosen-container"];
//         container_classes.push("chosen-container-" + (this.is_multiple ? "multi" : "single"));
//         if (this.inherit_select_classes && this.form_field.className) {
//           container_classes.push(this.form_field.className);
//         }
//         if (this.is_rtl) {
//           container_classes.push("chosen-rtl");
//         }
//         container_props = {
//           'class': container_classes.join(' '),
//           'style': "width: 100%",
//           'title': this.form_field.title
//         };
//         if (this.form_field.id.length) {
//           container_props.id = this.form_field.id.replace(/[^\w]/g, '_') + "_chosen";
//         }
//         this.container = $("<div />", container_props);
//         if (this.is_multiple) {
//           this.container.html('<ul class="chosen-choices"><li class="search-field"><input type="text" value="' + this.default_text + '" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>');
//         } else {
//           this.container.html('<a class="chosen-single chosen-default"><span>' + this.default_text + '</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" /></div><ul class="chosen-results"></ul></div>');
//         }
//         this.form_field_jq.hide().after(this.container);
//         this.dropdown = this.container.find('div.chosen-drop').first();
//         this.search_field = this.container.find('input').first();
//         this.search_results = this.container.find('ul.chosen-results').first();
//         this.search_field_scale();
//         this.search_no_results = this.container.find('li.no-results').first();
//         if (this.is_multiple) {
//           this.search_choices = this.container.find('ul.chosen-choices').first();
//           this.search_container = this.container.find('li.search-field').first();
//         } else {
//           this.search_container = this.container.find('div.chosen-search').first();
//           this.selected_item = this.container.find('.chosen-single').first();
//         }
//         this.results_build();
//         this.set_tab_index();
//         return this.set_label_behavior();
//       };

//       Chosen.prototype.on_ready = function() {
//         return this.form_field_jq.trigger("chosen:ready", {
//           chosen: this
//         });
//       };

//       Chosen.prototype.register_observers = function() {
//         var _this = this;
//         this.container.bind('touchstart.chosen', function(evt) {
//           _this.container_mousedown(evt);
//           return evt.preventDefault();
//         });
//         this.container.bind('touchend.chosen', function(evt) {
//           _this.container_mouseup(evt);
//           return evt.preventDefault();
//         });
//         this.container.bind('mousedown.chosen', function(evt) {
//           _this.container_mousedown(evt);
//         });
//         this.container.bind('mouseup.chosen', function(evt) {
//           _this.container_mouseup(evt);
//         });
//         this.container.bind('mouseenter.chosen', function(evt) {
//           _this.mouse_enter(evt);
//         });
//         this.container.bind('mouseleave.chosen', function(evt) {
//           _this.mouse_leave(evt);
//         });
//         this.search_results.bind('mouseup.chosen', function(evt) {
//           _this.search_results_mouseup(evt);
//         });
//         this.search_results.bind('mouseover.chosen', function(evt) {
//           _this.search_results_mouseover(evt);
//         });
//         this.search_results.bind('mouseout.chosen', function(evt) {
//           _this.search_results_mouseout(evt);
//         });
//         this.search_results.bind('mousewheel.chosen DOMMouseScroll.chosen', function(evt) {
//           _this.search_results_mousewheel(evt);
//         });
//         this.search_results.bind('touchstart.chosen', function(evt) {
//           _this.search_results_touchstart(evt);
//         });
//         this.search_results.bind('touchmove.chosen', function(evt) {
//           _this.search_results_touchmove(evt);
//         });
//         this.search_results.bind('touchend.chosen', function(evt) {
//           _this.search_results_touchend(evt);
//         });
//         this.form_field_jq.bind("chosen:updated.chosen", function(evt) {
//           _this.results_update_field(evt);
//         });
//         this.form_field_jq.bind("chosen:activate.chosen", function(evt) {
//           _this.activate_field(evt);
//         });
//         this.form_field_jq.bind("chosen:open.chosen", function(evt) {
//           _this.container_mousedown(evt);
//         });
//         this.form_field_jq.bind("chosen:close.chosen", function(evt) {
//           _this.input_blur(evt);
//         });
//         this.search_field.bind('blur.chosen', function(evt) {
//           _this.input_blur(evt);
//         });
//         this.search_field.bind('keyup.chosen', function(evt) {
//           _this.keyup_checker(evt);
//         });
//         this.search_field.bind('keydown.chosen', function(evt) {
//           _this.keydown_checker(evt);
//         });
//         this.search_field.bind('focus.chosen', function(evt) {
//           _this.input_focus(evt);
//         });
//         this.search_field.bind('cut.chosen', function(evt) {
//           _this.clipboard_event_checker(evt);
//         });
//         this.search_field.bind('paste.chosen', function(evt) {
//           _this.clipboard_event_checker(evt);
//         });
//         if (this.is_multiple) {
//           return this.search_choices.bind('click.chosen', function(evt) {
//             _this.choices_click(evt);
//           });
//         } else {
//           return this.container.bind('click.chosen', function(evt) {
//             evt.preventDefault();
//           });
//         }
//       };

//       Chosen.prototype.destroy = function() {
//         $(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action);
//         if (this.search_field[0].tabIndex) {
//           this.form_field_jq[0].tabIndex = this.search_field[0].tabIndex;
//         }
//         this.container.remove();
//         this.form_field_jq.removeData('chosen');
//         return this.form_field_jq.show();
//       };

//       Chosen.prototype.search_field_disabled = function() {
//         this.is_disabled = this.form_field_jq[0].disabled;
//         if (this.is_disabled) {
//           this.container.addClass('chosen-disabled');
//           this.search_field[0].disabled = true;
//           if (!this.is_multiple) {
//             this.selected_item.unbind("focus.chosen", this.activate_action);
//           }
//           return this.close_field();
//         } else {
//           this.container.removeClass('chosen-disabled');
//           this.search_field[0].disabled = false;
//           if (!this.is_multiple) {
//             return this.selected_item.bind("focus.chosen", this.activate_action);
//           }
//         }
//       };

//       Chosen.prototype.container_mousedown = function(evt) {
//         if (!this.is_disabled) {
//           if (evt && evt.type === "mousedown" && !this.results_showing) {
//             evt.preventDefault();
//           }
//           if (!((evt != null) && ($(evt.target)).hasClass("search-choice-close"))) {
//             if (!this.active_field) {
//               if (this.is_multiple) {
//                 this.search_field.val("");
//               }
//               $(this.container[0].ownerDocument).bind('click.chosen', this.click_test_action);
//               this.results_show();
//             } else if (!this.is_multiple && evt && (($(evt.target)[0] === this.selected_item[0]) || $(evt.target).parents("a.chosen-single").length)) {
//               evt.preventDefault();
//               this.results_toggle();
//             }
//             return this.activate_field();
//           }
//         }
//       };

//       Chosen.prototype.container_mouseup = function(evt) {
//         if (evt.target.nodeName === "ABBR" && !this.is_disabled) {
//           return this.results_reset(evt);
//         }
//       };

//       Chosen.prototype.search_results_mousewheel = function(evt) {
//         var delta;
//         if (evt.originalEvent) {
//           delta = evt.originalEvent.deltaY || -evt.originalEvent.wheelDelta || evt.originalEvent.detail;
//         }
//         if (delta != null) {
//           evt.preventDefault();
//           if (evt.type === 'DOMMouseScroll') {
//             delta = delta * 40;
//           }
//           return this.search_results.scrollTop(delta + this.search_results.scrollTop());
//         }
//       };

//       Chosen.prototype.blur_test = function(evt) {
//         if (!this.active_field && this.container.hasClass("chosen-container-active")) {
//           return this.close_field();
//         }
//       };

//       Chosen.prototype.close_field = function() {
//         $(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action);
//         this.active_field = false;
//         this.results_hide();
//         this.container.removeClass("chosen-container-active");
//         this.clear_backstroke();
//         this.show_search_field_default();
//         return this.search_field_scale();
//       };

//       Chosen.prototype.activate_field = function() {
//         this.container.addClass("chosen-container-active");
//         this.active_field = true;
//         this.search_field.val(this.search_field.val());
//         return this.search_field.focus();
//       };

//       Chosen.prototype.test_active_click = function(evt) {
//         var active_container;
//         active_container = $(evt.target).closest('.chosen-container');
//         if (active_container.length && this.container[0] === active_container[0]) {
//           return this.active_field = true;
//         } else {
//           return this.close_field();
//         }
//       };

//       Chosen.prototype.results_build = function() {
//         this.parsing = true;
//         this.selected_option_count = null;
//         this.results_data = SelectParser.select_to_array(this.form_field);
//         if (this.is_multiple) {
//           this.search_choices.find("li.search-choice").remove();
//         } else if (!this.is_multiple) {
//           this.single_set_selected_text();
//           if (this.disable_search || this.form_field.options.length <= this.disable_search_threshold) {
//             this.search_field[0].readOnly = true;
//             this.container.addClass("chosen-container-single-nosearch");
//           } else {
//             this.search_field[0].readOnly = false;
//             this.container.removeClass("chosen-container-single-nosearch");
//           }
//         }
//         this.update_results_content(this.results_option_build({
//           first: true
//         }));
//         this.search_field_disabled();
//         this.show_search_field_default();
//         this.search_field_scale();
//         return this.parsing = false;
//       };

//       Chosen.prototype.result_do_highlight = function(el) {
//         var high_bottom, high_top, maxHeight, visible_bottom, visible_top;
//         if (el.length) {
//           this.result_clear_highlight();
//           this.result_highlight = el;
//           this.result_highlight.addClass("highlighted");
//           maxHeight = parseInt(this.search_results.css("maxHeight"), 10);
//           visible_top = this.search_results.scrollTop();
//           visible_bottom = maxHeight + visible_top;
//           high_top = this.result_highlight.position().top + this.search_results.scrollTop();
//           high_bottom = high_top + this.result_highlight.outerHeight();
//           if (high_bottom >= visible_bottom) {
//             return this.search_results.scrollTop((high_bottom - maxHeight) > 0 ? high_bottom - maxHeight : 0);
//           } else if (high_top < visible_top) {
//             return this.search_results.scrollTop(high_top);
//           }
//         }
//       };

//       Chosen.prototype.result_clear_highlight = function() {
//         if (this.result_highlight) {
//           this.result_highlight.removeClass("highlighted");
//         }
//         return this.result_highlight = null;
//       };

//       Chosen.prototype.results_show = function() {
//         if (this.is_multiple && this.max_selected_options <= this.choices_count()) {
//           this.form_field_jq.trigger("chosen:maxselected", {
//             chosen: this
//           });
//           return false;
//         }
//         this.container.addClass("chosen-with-drop");
//         this.results_showing = true;
//         this.search_field.focus();
//         this.search_field.val(this.search_field.val());
//         this.winnow_results();
//         return this.form_field_jq.trigger("chosen:showing_dropdown", {
//           chosen: this
//         });
//       };

//       Chosen.prototype.update_results_content = function(content) {
//         return this.search_results.html(content);
//       };

//       Chosen.prototype.results_hide = function() {
//         if (this.results_showing) {
//           this.result_clear_highlight();
//           this.container.removeClass("chosen-with-drop");
//           this.form_field_jq.trigger("chosen:hiding_dropdown", {
//             chosen: this
//           });
//         }
//         return this.results_showing = false;
//       };

//       Chosen.prototype.set_tab_index = function(el) {
//         var ti;
//         if (this.form_field.tabIndex) {
//           ti = this.form_field.tabIndex;
//           this.form_field.tabIndex = -1;
//           return this.search_field[0].tabIndex = ti;
//         }
//       };

//       Chosen.prototype.set_label_behavior = function() {
//         var _this = this;
//         this.form_field_label = this.form_field_jq.parents("label");
//         if (!this.form_field_label.length && this.form_field.id.length) {
//           this.form_field_label = $("label[for='" + this.form_field.id + "']");
//         }
//         if (this.form_field_label.length > 0) {
//           return this.form_field_label.bind('click.chosen', function(evt) {
//             if (_this.is_multiple) {
//               return _this.container_mousedown(evt);
//             } else {
//               return _this.activate_field();
//             }
//           });
//         }
//       };

//       Chosen.prototype.show_search_field_default = function() {
//         if (this.is_multiple && this.choices_count() < 1 && !this.active_field) {
//           this.search_field.val(this.default_text);
//           return this.search_field.addClass("default");
//         } else {
//           this.search_field.val("");
//           return this.search_field.removeClass("default");
//         }
//       };

//       Chosen.prototype.search_results_mouseup = function(evt) {
//         var target;
//         target = $(evt.target).hasClass("active-result") ? $(evt.target) : $(evt.target).parents(".active-result").first();
//         if (target.length) {
//           this.result_highlight = target;
//           this.result_select(evt);
//           return this.search_field.focus();
//         }
//       };

//       Chosen.prototype.search_results_mouseover = function(evt) {
//         var target;
//         target = $(evt.target).hasClass("active-result") ? $(evt.target) : $(evt.target).parents(".active-result").first();
//         if (target) {
//           return this.result_do_highlight(target);
//         }
//       };

//       Chosen.prototype.search_results_mouseout = function(evt) {
//         if ($(evt.target).hasClass("active-result" || $(evt.target).parents('.active-result').first())) {
//           return this.result_clear_highlight();
//         }
//       };

//       Chosen.prototype.choice_build = function(item) {
//         var choice, close_link,
//           _this = this;
//         choice = $('<li />', {
//           "class": "search-choice"
//         }).html("<span>" + (this.choice_label(item)) + "</span>");
//         if (item.disabled) {
//           choice.addClass('search-choice-disabled');
//         } else {
//           close_link = $('<a />', {
//             "class": 'search-choice-close',
//             'data-option-array-index': item.array_index
//           });
//           close_link.bind('click.chosen', function(evt) {
//             return _this.choice_destroy_link_click(evt);
//           });
//           choice.append(close_link);
//         }
//         return this.search_container.before(choice);
//       };

//       Chosen.prototype.choice_destroy_link_click = function(evt) {
//         evt.preventDefault();
//         evt.stopPropagation();
//         if (!this.is_disabled) {
//           return this.choice_destroy($(evt.target));
//         }
//       };

//       Chosen.prototype.choice_destroy = function(link) {
//         if (this.result_deselect(link[0].getAttribute("data-option-array-index"))) {
//           this.show_search_field_default();
//           if (this.is_multiple && this.choices_count() > 0 && this.search_field.val().length < 1) {
//             this.results_hide();
//           }
//           link.parents('li').first().remove();
//           return this.search_field_scale();
//         }
//       };

//       Chosen.prototype.results_reset = function() {
//         this.reset_single_select_options();
//         this.form_field.options[0].selected = true;
//         this.single_set_selected_text();
//         this.show_search_field_default();
//         this.results_reset_cleanup();
//         this.form_field_jq.trigger("change");
//         if (this.active_field) {
//           return this.results_hide();
//         }
//       };

//       Chosen.prototype.results_reset_cleanup = function() {
//         this.current_selectedIndex = this.form_field.selectedIndex;
//         return this.selected_item.find("abbr").remove();
//       };

//       Chosen.prototype.result_select = function(evt) {
//         var high, item;
//         if (this.result_highlight) {
//           high = this.result_highlight;
//           this.result_clear_highlight();
//           if (this.is_multiple && this.max_selected_options <= this.choices_count()) {
//             this.form_field_jq.trigger("chosen:maxselected", {
//               chosen: this
//             });
//             return false;
//           }
//           if (this.is_multiple) {
//             high.removeClass("active-result");
//           } else {
//             this.reset_single_select_options();
//           }
//           high.addClass("result-selected");
//           item = this.results_data[high[0].getAttribute("data-option-array-index")];
//           item.selected = true;
//           this.form_field.options[item.options_index].selected = true;
//           this.selected_option_count = null;
//           if (this.is_multiple) {
//             this.choice_build(item);
//           } else {
//             this.single_set_selected_text(this.choice_label(item));
//           }
//           if (!((evt.metaKey || evt.ctrlKey) && this.is_multiple)) {
//             this.results_hide();
//           }
//           this.show_search_field_default();
//           if (this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) {
//             this.form_field_jq.trigger("change", {
//               'selected': this.form_field.options[item.options_index].value
//             });
//           }
//           this.current_selectedIndex = this.form_field.selectedIndex;
//           evt.preventDefault();
//           return this.search_field_scale();
//         }
//       };

//       Chosen.prototype.single_set_selected_text = function(text) {
//         if (text == null) {
//           text = this.default_text;
//         }
//         if (text === this.default_text) {
//           this.selected_item.addClass("chosen-default");
//         } else {
//           this.single_deselect_control_build();
//           this.selected_item.removeClass("chosen-default");
//         }
//         return this.selected_item.find("span").html(text);
//       };

//       Chosen.prototype.result_deselect = function(pos) {
//         var result_data;
//         result_data = this.results_data[pos];
//         if (!this.form_field.options[result_data.options_index].disabled) {
//           result_data.selected = false;
//           this.form_field.options[result_data.options_index].selected = false;
//           this.selected_option_count = null;
//           this.result_clear_highlight();
//           if (this.results_showing) {
//             this.winnow_results();
//           }
//           this.form_field_jq.trigger("change", {
//             deselected: this.form_field.options[result_data.options_index].value
//           });
//           this.search_field_scale();
//           return true;
//         } else {
//           return false;
//         }
//       };

//       Chosen.prototype.single_deselect_control_build = function() {
//         if (!this.allow_single_deselect) {
//           return;
//         }
//         if (!this.selected_item.find("abbr").length) {
//           this.selected_item.find("span").first().after("<abbr class=\"search-choice-close\"></abbr>");
//         }
//         return this.selected_item.addClass("chosen-single-with-deselect");
//       };

//       Chosen.prototype.get_search_text = function() {
//         return $('<div/>').text($.trim(this.search_field.val())).html();
//       };

//       Chosen.prototype.winnow_results_set_highlight = function() {
//         var do_high, selected_results;
//         selected_results = !this.is_multiple ? this.search_results.find(".result-selected.active-result") : [];
//         do_high = selected_results.length ? selected_results.first() : this.search_results.find(".active-result").first();
//         if (do_high != null) {
//           return this.result_do_highlight(do_high);
//         }
//       };

//       Chosen.prototype.no_results = function(terms) {
//         var no_results_html;
//         no_results_html = $('<li class="no-results">' + this.results_none_found + ' "<span></span>"</li>');
//         no_results_html.find("span").first().html(terms);
//         this.search_results.append(no_results_html);
//         return this.form_field_jq.trigger("chosen:no_results", {
//           chosen: this
//         });
//       };

//       Chosen.prototype.no_results_clear = function() {
//         return this.search_results.find(".no-results").remove();
//       };

//       Chosen.prototype.keydown_arrow = function() {
//         var next_sib;
//         if (this.results_showing && this.result_highlight) {
//           next_sib = this.result_highlight.nextAll("li.active-result").first();
//           if (next_sib) {
//             return this.result_do_highlight(next_sib);
//           }
//         } else {
//           return this.results_show();
//         }
//       };

//       Chosen.prototype.keyup_arrow = function() {
//         var prev_sibs;
//         if (!this.results_showing && !this.is_multiple) {
//           return this.results_show();
//         } else if (this.result_highlight) {
//           prev_sibs = this.result_highlight.prevAll("li.active-result");
//           if (prev_sibs.length) {
//             return this.result_do_highlight(prev_sibs.first());
//           } else {
//             if (this.choices_count() > 0) {
//               this.results_hide();
//             }
//             return this.result_clear_highlight();
//           }
//         }
//       };

//       Chosen.prototype.keydown_backstroke = function() {
//         var next_available_destroy;
//         if (this.pending_backstroke) {
//           this.choice_destroy(this.pending_backstroke.find("a").first());
//           return this.clear_backstroke();
//         } else {
//           next_available_destroy = this.search_container.siblings("li.search-choice").last();
//           if (next_available_destroy.length && !next_available_destroy.hasClass("search-choice-disabled")) {
//             this.pending_backstroke = next_available_destroy;
//             if (this.single_backstroke_delete) {
//               return this.keydown_backstroke();
//             } else {
//               return this.pending_backstroke.addClass("search-choice-focus");
//             }
//           }
//         }
//       };

//       Chosen.prototype.clear_backstroke = function() {
//         if (this.pending_backstroke) {
//           this.pending_backstroke.removeClass("search-choice-focus");
//         }
//         return this.pending_backstroke = null;
//       };

//       Chosen.prototype.keydown_checker = function(evt) {
//         var stroke, _ref1;
//         stroke = (_ref1 = evt.which) != null ? _ref1 : evt.keyCode;
//         this.search_field_scale();
//         if (stroke !== 8 && this.pending_backstroke) {
//           this.clear_backstroke();
//         }
//         switch (stroke) {
//           case 8:
//             this.backstroke_length = this.search_field.val().length;
//             break;
//           case 9:
//             if (this.results_showing && !this.is_multiple) {
//               this.result_select(evt);
//             }
//             this.mouse_on_container = false;
//             break;
//           case 13:
//             if (this.results_showing) {
//               evt.preventDefault();
//             }
//             break;
//           case 32:
//             if (this.disable_search) {
//               evt.preventDefault();
//             }
//             break;
//           case 38:
//             evt.preventDefault();
//             this.keyup_arrow();
//             break;
//           case 40:
//             evt.preventDefault();
//             this.keydown_arrow();
//             break;
//         }
//       };

//       Chosen.prototype.search_field_scale = function() {
//         var div, f_width, h, style, style_block, styles, w, _i, _len;
//         if (this.is_multiple) {
//           h = 0;
//           w = 0;
//           style_block = "position:absolute; left: -1000px; top: -1000px; display:none;";
//           styles = ['font-size', 'font-style', 'font-weight', 'font-family', 'line-height', 'text-transform', 'letter-spacing'];
//           for (_i = 0, _len = styles.length; _i < _len; _i++) {
//             style = styles[_i];
//             style_block += style + ":" + this.search_field.css(style) + ";";
//           }
//           div = $('<div />', {
//             'style': style_block
//           });
//           div.text(this.search_field.val());
//           $('body').append(div);
//           w = div.width() + 25;
//           div.remove();
//           f_width = this.container.outerWidth();
//           if (w > f_width - 10) {
//             w = f_width - 10;
//           }
//           return this.search_field.css({
//             'width': w + 'px'
//           });
//         }
//       };

//       return Chosen;

//     })(AbstractChosen);

//   }).call(this);

  /**
   * Prism: Lightweight, robust, elegant syntax highlighting
   * MIT license http://www.opensource.org/licenses/mit-license.php/
   * @author Lea Verou http://lea.verou.me
   */(function(){var e=/\blang(?:uage)?-(?!\*)(\w+)\b/i,t=self.Prism={util:{type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},clone:function(e){var n=t.util.type(e);switch(n){case"Object":var r={};for(var i in e)e.hasOwnProperty(i)&&(r[i]=t.util.clone(e[i]));return r;case"Array":return e.slice()}return e}},languages:{extend:function(e,n){var r=t.util.clone(t.languages[e]);for(var i in n)r[i]=n[i];return r},insertBefore:function(e,n,r,i){i=i||t.languages;var s=i[e],o={};for(var u in s)if(s.hasOwnProperty(u)){if(u==n)for(var a in r)r.hasOwnProperty(a)&&(o[a]=r[a]);o[u]=s[u]}return i[e]=o},DFS:function(e,n){for(var r in e){n.call(e,r,e[r]);t.util.type(e)==="Object"&&t.languages.DFS(e[r],n)}}},highlightAll:function(e,n){var r=document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code');for(var i=0,s;s=r[i++];)t.highlightElement(s,e===!0,n)},highlightElement:function(r,i,s){var o,u,a=r;while(a&&!e.test(a.className))a=a.parentNode;if(a){o=(a.className.match(e)||[,""])[1];u=t.languages[o]}if(!u)return;r.className=r.className.replace(e,"").replace(/\s+/g," ")+" language-"+o;a=r.parentNode;/pre/i.test(a.nodeName)&&(a.className=a.className.replace(e,"").replace(/\s+/g," ")+" language-"+o);var f=r.textContent;if(!f)return;f=f.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ");var l={element:r,language:o,grammar:u,code:f};t.hooks.run("before-highlight",l);if(i&&self.Worker){var c=new Worker(t.filename);c.onmessage=function(e){l.highlightedCode=n.stringify(JSON.parse(e.data),o);t.hooks.run("before-insert",l);l.element.innerHTML=l.highlightedCode;s&&s.call(l.element);t.hooks.run("after-highlight",l)};c.postMessage(JSON.stringify({language:l.language,code:l.code}))}else{l.highlightedCode=t.highlight(l.code,l.grammar,l.language);t.hooks.run("before-insert",l);l.element.innerHTML=l.highlightedCode;s&&s.call(r);t.hooks.run("after-highlight",l)}},highlight:function(e,r,i){return n.stringify(t.tokenize(e,r),i)},tokenize:function(e,n,r){var i=t.Token,s=[e],o=n.rest;if(o){for(var u in o)n[u]=o[u];delete n.rest}e:for(var u in n){if(!n.hasOwnProperty(u)||!n[u])continue;var a=n[u],f=a.inside,l=!!a.lookbehind,c=0;a=a.pattern||a;for(var h=0;h<s.length;h++){var p=s[h];if(s.length>e.length)break e;if(p instanceof i)continue;a.lastIndex=0;var d=a.exec(p);if(d){l&&(c=d[1].length);var v=d.index-1+c,d=d[0].slice(c),m=d.length,g=v+m,y=p.slice(0,v+1),b=p.slice(g+1),w=[h,1];y&&w.push(y);var E=new i(u,f?t.tokenize(d,f):d);w.push(E);b&&w.push(b);Array.prototype.splice.apply(s,w)}}}return s},hooks:{all:{},add:function(e,n){var r=t.hooks.all;r[e]=r[e]||[];r[e].push(n)},run:function(e,n){var r=t.hooks.all[e];if(!r||!r.length)return;for(var i=0,s;s=r[i++];)s(n)}}},n=t.Token=function(e,t){this.type=e;this.content=t};n.stringify=function(e,r,i){if(typeof e=="string")return e;if(Object.prototype.toString.call(e)=="[object Array]")return e.map(function(t){return n.stringify(t,r,e)}).join("");var s={type:e.type,content:n.stringify(e.content,r,i),tag:"span",classes:["token",e.type],attributes:{},language:r,parent:i};s.type=="comment"&&(s.attributes.spellcheck="true");t.hooks.run("wrap",s);var o="";for(var u in s.attributes)o+=u+'="'+(s.attributes[u]||"")+'"';return"<"+s.tag+' class="'+s.classes.join(" ")+'" '+o+">"+s.content+"</"+s.tag+">"};if(!self.document){self.addEventListener("message",function(e){var n=JSON.parse(e.data),r=n.language,i=n.code;self.postMessage(JSON.stringify(t.tokenize(i,t.languages[r])));self.close()},!1);return}var r=document.getElementsByTagName("script");r=r[r.length-1];if(r){t.filename=r.src;document.addEventListener&&!r.hasAttribute("data-manual")&&document.addEventListener("DOMContentLoaded",t.highlightAll)}})();;
  Prism.languages.markup={comment:/&lt;!--[\w\W]*?-->/g,prolog:/&lt;\?.+?\?>/,doctype:/&lt;!DOCTYPE.+?>/,cdata:/&lt;!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/&lt;\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|\w+))?\s*)*\/?>/gi,inside:{tag:{pattern:/^&lt;\/?[\w:-]+/i,inside:{punctuation:/^&lt;\/?/,namespace:/^[\w-]+?:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,inside:{punctuation:/=|>|"/g}},punctuation:/\/?>/g,"attr-name":{pattern:/[\w:-]+/g,inside:{namespace:/^[\w-]+?:/}}}},entity:/&amp;#?[\da-z]{1,8};/gi};Prism.hooks.add("wrap",function(e){e.type==="entity"&&(e.attributes.title=e.content.replace(/&amp;/,"&"))});;
  Prism.languages.css={comment:/\/\*[\w\W]*?\*\//g,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*{))/gi,inside:{punctuation:/[;:]/g}},url:/url\((["']?).*?\1\)/gi,selector:/[^\{\}\s][^\{\};]*(?=\s*\{)/g,property:/(\b|\B)[\w-]+(?=\s*:)/ig,string:/("|')(\\?.)*?\1/g,important:/\B!important\b/gi,ignore:/&(lt|gt|amp);/gi,punctuation:/[\{\};:]/g};Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{style:{pattern:/(&lt;|<)style[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/style(>|&gt;)/ig,inside:{tag:{pattern:/(&lt;|<)style[\w\W]*?(>|&gt;)|(&lt;|<)\/style(>|&gt;)/ig,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.css}}});;
  Prism.languages.clike={comment:{pattern:/(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])\/\/.*?(\r?\n|$))/g,lookbehind:!0},string:/("|')(\\?.)*?\1/g,"class-name":{pattern:/((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/ig,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|catch|finally|null|break|continue)\b/g,"boolean":/\b(true|false)\b/g,"function":{pattern:/[a-z0-9_]+\(/ig,inside:{punctuation:/\(/}}, number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,operator:/[-+]{1,2}|!|&lt;=?|>=?|={1,3}|(&amp;){1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,ignore:/&(lt|gt|amp);/gi,punctuation:/[{}[\];(),.:]/g};;
  Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(var|let|if|else|while|do|for|return|in|instanceof|function|new|with|typeof|try|catch|finally|null|break|continue)\b/g,number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/g});Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,lookbehind:!0}});Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/(&lt;|<)script[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/script(>|&gt;)/ig,inside:{tag:{pattern:/(&lt;|<)script[\w\W]*?(>|&gt;)|(&lt;|<)\/script(>|&gt;)/ig,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.javascript}}});;

  /*
   * Date Format 1.2.3
   * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
   * MIT license
   *
   * Includes enhancements by Scott Trenda <scott.trenda.net>
   * and Kris Kowal <cixar.com/~kris.kowal/>
   *
   * Accepts a date, a mask, or a date and a mask.
   * Returns a formatted version of the given date.
   * The date defaults to the current date/time.
   * The mask defaults to dateFormat.masks.default.
   */

  var dateFormat = function () {
      var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
      timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
      timezoneClip = /[^-+\dA-Z]/g,
      pad = function (val, len) {
          val = String(val);
          len = len || 2;
          while (val.length < len) val = "0" + val;
          return val;
      };

      // Regexes and supporting functions are cached through closure
      return function (date, mask, utc) {
          var dF = dateFormat;

          // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
          if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
              mask = date;
              date = undefined;
          }

          // Passing date through Date applies Date.parse, if necessary
          date = date ? new Date(date) : new Date;
          if (isNaN(date)) throw SyntaxError("invalid date");

          mask = String(dF.masks[mask] || mask || dF.masks["default"]);

          // Allow setting the utc argument via the mask
          if (mask.slice(0, 4) == "UTC:") {
              mask = mask.slice(4);
              utc = true;
          }

          var _ = utc ? "getUTC" : "get",
        d = date[_ + "Date"](),
        D = date[_ + "Day"](),
        m = date[_ + "Month"](),
        y = date[_ + "FullYear"](),
        H = date[_ + "Hours"](),
        M = date[_ + "Minutes"](),
        s = date[_ + "Seconds"](),
        L = date[_ + "Milliseconds"](),
        o = utc ? 0 : date.getTimezoneOffset(),
        flags = {
            d: d,
            dd: pad(d),
            ddd: dF.i18n.dayNames[D],
            dddd: dF.i18n.dayNames[D + 7],
            m: m + 1,
            mm: pad(m + 1),
            mmm: dF.i18n.monthNames[m],
            mmmm: dF.i18n.monthNames[m + 12],
            yy: String(y).slice(2),
            yyyy: y,
            h: H % 12 || 12,
            hh: pad(H % 12 || 12),
            H: H,
            HH: pad(H),
            M: M,
            MM: pad(M),
            s: s,
            ss: pad(s),
            l: pad(L, 3),
            L: pad(L > 99 ? Math.round(L / 10) : L),
            t: H < 12 ? "a" : "p",
            tt: H < 12 ? "am" : "pm",
            T: H < 12 ? "A" : "P",
            TT: H < 12 ? "AM" : "PM",
            Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
            o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
            S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
        };

          return mask.replace(token, function ($0) {
              return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
          });
      };
  }();

  // Some common format strings
  dateFormat.masks = {
      "default": "ddd mmm dd yyyy HH:MM:ss",
      shortDate: "m/d/yy",
      mediumDate: "mmm d, yyyy",
      longDate: "mmmm d, yyyy",
      fullDate: "dddd, mmmm d, yyyy",
      shortTime: "h:MM TT",
      mediumTime: "h:MM:ss TT",
      longTime: "h:MM:ss TT Z",
      isoDate: "yyyy-mm-dd",
      isoTime: "HH:MM:ss",
      isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
      isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
  };

  // Internationalization strings
  dateFormat.i18n = {
      dayNames: [
      "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
      ],
      monthNames: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
      ]
  };

  // For convenience...
  Date.prototype.format = function (mask, utc) {
      return dateFormat(this, mask, utc);
  };

  /*global webkitSpeechRecognition */
  function enableSpeechRecognition() {
    //'use strict';

    // check for support (webkit only)
    if (! ('webkitSpeechRecognition' in window) ) return;

    var talkMsg = 'Speak now';

    // seconds to wait for more input after last
    var patience = 6;

    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    var inputEls = document.getElementsByClassName('speech-input');

    [].forEach.call(inputEls, function(inputEl) {
      var micBtn, micIcon, holderIcon, newWrapper;
      var shouldCapitalize = true;

      // gather inputEl data
      var nextNode = inputEl.nextSibling;
      var parent = inputEl.parentNode;
      var inputHeight = inputEl.offsetHeight;
      var inputRightBorder = parseInt(getComputedStyle(inputEl).borderRightWidth, 10);
      var buttonSize = 0.8 * inputHeight;
      var buttonTop = 0.1 * inputHeight;

      // max size for textareas
      if (inputEl.tagName === 'TEXTAREA') {
        if (buttonTop > 6.5) buttonTop = 6.5;
        if (buttonSize > 26) buttonSize = 26;
      }

      // create wrapper if not present
      var wrapper = inputEl.parentNode;
      if (!wrapper.classList.contains('si-wrapper')) {
        wrapper = document.createElement('div');
        wrapper.classList.add('si-wrapper');
        wrapper.appendChild(parent.removeChild(inputEl));
        newWrapper = true;
      }

      // create mic button if not present
      var micBtn = wrapper.querySelector('.si-btn');
      if (!micBtn) {
        micBtn = document.createElement('button');
        micBtn.classList.add('si-btn');
          //micBtn.textContent = 'speech input';
        var icn = document.createElement('span');
        icn.classList.add('fa');
        icn.classList.add('fa-microphone');
        icn.classList.add('speechmic');
        //var micIcon = document.createElement('span');
        //var holderIcon = document.createElement('span');
        //micIcon.classList.add('si-mic');
          //holderIcon.classList.add('si-holder');
        micBtn.appendChild(icn);
        //micBtn.appendChild(micIcon);
        //micBtn.appendChild(holderIcon);
        wrapper.appendChild(micBtn);

        // size and position mic and input
        micBtn.style.cursor = 'pointer';
        micBtn.style.top = buttonTop + 'px';
        micBtn.style.height = micBtn.style.width = buttonSize + 'px';
        inputEl.style.paddingRight = buttonSize - inputRightBorder + 'px';
      }

      // append wrapper where input was
      if (newWrapper) parent.insertBefore(wrapper, nextNode);

      // setup recognition
      var prefix = '';
      var isSentence;
      var recognizing = false;
      var timeout;
      var oldPlaceholder = null;
      var recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      // if lang attribute is set on field use that
      // (defaults to use the lang of the root element)
      if (inputEl.lang) recognition.lang = inputEl.lang;

      function restartTimer() {
        timeout = setTimeout(function() {
          recognition.stop();
        }, patience * 1000);
      }

      recognition.onstart = function() {
        oldPlaceholder = inputEl.placeholder;
        inputEl.placeholder = inputEl.dataset.ready || talkMsg;
        recognizing = true;
        micBtn.classList.add('listening');
        restartTimer();
      };

      recognition.onend = function() {
        recognizing = false;
        clearTimeout(timeout);
        micBtn.classList.remove('listening');
        if (oldPlaceholder !== null) inputEl.placeholder = oldPlaceholder;
      };

      var finalTranscript = '';
      recognition.onresult = function(event) {
        clearTimeout(timeout);

        // get SpeechRecognitionResultList object
        var resultList = event.results;

        // go through each SpeechRecognitionResult object in the list
        var interimTranscript = '';
        for (var i = event.resultIndex; i < resultList.length; ++i) {
          var result = resultList[i];

          // get this result's first SpeechRecognitionAlternative object
          var firstAlternative = result[0];

          if (result.isFinal) {
            finalTranscript += firstAlternative.transcript;
          } else {
            interimTranscript += firstAlternative.transcript;
          }
        }

        // capitalize transcript if start of new sentence
        var transcript = finalTranscript || interimTranscript;
        transcript = !prefix || isSentence ? capitalize(transcript) : transcript;

        // append transcript to cached input value
        inputEl.value = prefix + transcript;

        // set cursur and scroll to end
        inputEl.focus();
        if (inputEl.tagName === 'INPUT') {
          inputEl.scrollLeft = inputEl.scrollWidth;
        } else {
          inputEl.scrollTop = inputEl.scrollHeight;
        }

        restartTimer();
      };

      micBtn.addEventListener('click', function(event) {
        event.preventDefault();

        // stop and exit if already going
        if (recognizing) {
          recognition.stop();
          return;
        }

        // Cache current input value which the new transcript will be appended to
        var endsWithWhitespace = inputEl.value.slice(-1).match(/\s/);
        prefix = !inputEl.value || endsWithWhitespace ? inputEl.value : inputEl.value + ' ';

        // check if value ends with a sentence
        isSentence = prefix.trim().slice(-1).match(/[\.\?\!]/);

        // restart recognition
        finalTranscript = '';
        recognition.start();
      }, false);
    });
  };

  var updatetaskpage = false;
  $(function () {

      $('#btnSave').click(function () {

          var subject = $('#txtSubject').val();
          //    //var description = $('#txtDescription').val();
          //    //var datepicker= $('#txtdatepicker').val();
          //    SetTask(obj);
          if (subject = ' ')
              alert('Invalid Data');

          var txtVal = $('#txtdatepicker').val();
          if (isDate(txtVal) != true)
              alert('Invalid Date');
      });

      $('body').on('click', '#btnSend', function () {

          toastr.clear();
          $('#loadingmessage').show();
          var reqUrl = $(this).data('post-url');
          var errorContainer = $(this).data('error-container');
          var typeid = $('#ddlTaskType').val();
          typeid = (typeid == 'undefined' || typeid == null || typeid == 'Task Type') ? null : typeid;
          var memIds = GetMemberIds();
          //var patientId = GetPatientId();
          var episodeid = $('#txtEpisodeId').attr('data-episodeid');
          var patientid = $('#txtEpisodeId').attr('data-patientid');
          var Documentcategory = $('#ddlcreatedocument').val();
          var Documenttype = $('#ddlcreatedoctypes').val();
          var providerid = $('#ddlcreateProviders').val();
          var treatmentdate = $('#createTreatmentdate').val();
          var description= $('#txtDescription').val();

        //   if (typeid == null || typeid == 0 || typeid == "") {
        //       toastrerror('Please select Task type', 'Mandatory Fields');
        //       return false;
        //   }
        //   if (memIds == null || memIds == "") {
        //       toastrerror('Please select Assign To Members', 'Mandatory Fields');
        //       return false;
        //   }
        //   if (description == "" || description == null) {
        //       toastrerror('Please fill the description', 'Mandatory Fields');
        //       return false;
        //   }



        //   if (!cfn(Documentcategory) || !cfn(Documenttype)) {

        //       if (!cfn(Documentcategory) && cfn(Documenttype)) {
        //           toastrerror('Please select the Documenttype', 'Mandatory Fields');

        //           return false;
        //       }

        //       if (!cfn(Documenttype) && cfn(Documentcategory)) {

        //           toastrerror('Please select the Documentcategory', 'Mandatory Fields');

        //           return false;
        //       }
        //   }



        //   $.ajax({
        //       url: reqUrl,
        //       type: 'post',
        //       dataType: 'json',
        //       data: {
        //           Subject: $('#txtsubject').val(),
        //           Description: description,
        //           DueDate: $('#txtdatepicker').val(),
        //           // PatientId: patientId,
        //           //PatientId: $('.patientId').val(),
        //           AssignedTo: $('.providerId').val(),

        //           //ProviderIds: $('.ProviderIds').val(),

        //           ProviderIds: memIds,
        //           TypeId: typeid,
        //           StatusId: $('#ddlTaskStatus').val(),
        //           EpisodeId: episodeid,
        //           DocumentCategoryId: Documentcategory,
        //           DocumentTypeId: Documenttype,
        //           ProviderId: providerid,
        //           TreatmentDate: treatmentdate,
        //           PatientId: patientid

        //       },
        //       success: function (result) {
        //           //var res = res = $.parseJSON(result);
        //           if (!result.success) {
        //               $('#loadingmessage').hide();
        //               var errorList = '<ul>';
        //               $.each(result.errors, function (indx, obj) {
        //                   errorList = errorList + '<li>' + obj + '</li>';
        //               });
        //               errorList = errorList + '</ul>';
        //               //$(errorContainer).html(errorList).show();
        //               //$(errorContainer).html(errorList).show();
        //               //$(errorContainer).html(errorList).removeClass('hide');
        //               //setTimeout(function () { $(errorContainer).hide('slow'); }, 5000);
        //             //   toastrerror(errorList, 'Mandatory Fields');
        //           }
        //           else {
        //               $('.inmodal.in').last().modal('hide');
        //               if ($('#hddIsMyTaskPage').val() == "1") {
        //                   if (updatetaskpage == undefined || updatetaskpage == false)
        //                       window.location.href = result.returnURL;
        //               } else {
        //                   $('#loadingmessage').hide();
        //               }

        //           }

        //       },
        //       error: function (a, b, c) {
        //           //alert(c);
        //       }
        //   });
      });

      /* Initiating controls */
      if ($('#AttachmentTemplate').val() != "")
          $('div.files').html($('#AttachmentTemplate').val());

      //$('body').on('click', '#btnAdvancedUserSearch', function () {

      //    // Retrieve the filter url from the data-filter-url attribute
      //    var reqUrl = $(this).attr('data-req-url');
      //    // Grab the container that should be updated
      //    var updateContainer = $(this).attr('data-update-container');
      //    $(updateContainer).html("<span style='float:right; font-size:18pt;'>Loading... <img src='../Images/elements/loaders/1.gif' /></span>");
      //    var completeUrl = reqUrl;
      //    $.get(completeUrl, function (r) {
      //        // Load Partial View using the URL from the data-filter-url attribute
      //        $(updateContainer).html(r);
      //        $(updateContainer).modal({ keyboard: false, backdrop: 'static' });
      //        $('.focustip').tooltip({ 'trigger': 'focus', 'html': true });
      //    });

      //});

      //$('body').on('click', '#btnSearch', function () {

      //    doSearch();
      //    return false;
      //});

      $('body').on('click', '#btnClear', function () {

          $('#txtAdvancedSearch').val(' ');
          $('#ddlAdvancedSearchState').prop('selectedIndex', 0);
          $.uniform.update($($('#ddlAdvancedSearchState')[0]).prop('selectedIndex', 0));

          $('#ddlSpeciality').prop('selectedIndex', 0);
          $.uniform.update($($('#ddlSpeciality')[0]).prop('selectedIndex', 0));
          var listItems = "<option value=''>Any City</option>";
          $('#ddlAdvancedSearchCity').html(listItems);
          $('#ddlSpeciality').prop('selectedIndex', 0);
          $.uniform.update($($('#ddlSpeciality')[0]).prop('selectedIndex', 0));
          $('#ddlInsurance').prop('selectedIndex', 0);
          $.uniform.update($($('#ddlInsurance')[0]).prop('selectedIndex', 0));

          $('#dvUserSearchResultContainer').html('');
      });

      //$('body').on('click', '.slMember', function (e) {
      //    var tht = $(this);
      //    var selItem = $(tht.data('item'));

      //    updateProviderSearchField(selItem);
      //});

      //$('body').on('change', '#ddlAdvancedSearchState', function () {
      //    var reqUrl = $(this).data('req-url');
      //    var stateCode = $(this).val();
      //    var updateContainer = $($(this).attr('data-update-container'));
      //    updateContainer.html("<option value=''>Loading...</option>");

      //    $.get(reqUrl, { StateCode: stateCode }, function (r) {
      //        var listItems = "<option value=''>Any City</option>";
      //        $(r).map(function () {
      //            listItems += "<option value='" + this.Name + "'>" + this.Name + "</option>";
      //        });
      //        updateContainer.html(listItems);
      //    })
      //});

      $('#btnAdvancedSearchPatient').click(function () {

          var updateContainer = $(this).attr('data-update-container');
          //$(updateContainer).html("<span style='float:right; font-size:18pt;'>Loading... <img src='../Images/elements/loaders/1.gif' /></span>");
          //$(updateContainer).modal('show');
          $(updateContainer).modal({ keyboard: false, backdrop: 'static' });
      });

      $('body').on('click', '#btnSearchPatient', function () {

          // Retrieve the filter url from the data-filter-url attribute
          var updateContainer = $('#dvPatientSearchResultContainer');
          var reqUrl = updateContainer.data('post-url');
          var SearchString = $('#txtAdvancedSearchPatient').val();
          var FirstName = $('#txtFirstName').val();
          var LastName = $('#txtLastName').val();

          $(updateContainer).html("<span style='float:right; font-size:18pt;'>Loading... <img src='../Images/elements/loaders/1.gif' /></span>");

          $.get(reqUrl, {
              FirstName: FirstName,
              LastName: LastName,
              SearchString: SearchString,
              IsMultiSelect: false,
              IsAdvancedSearch: true

          }, function (r) {
              // Load Partial View using the URL from the data-filter-url attribute
              $(updateContainer).html(r);
          });
      });

      $('body').on('click', '#btnSelectPatient', function () {

          var PatientId, PatientFirstName, PatientLastName;
          var selectedRadioParent = $('.rdoSelectPatient:Checked').parent();

          if ($('.rdoSelectPatient').is(':Checked')) {
              var Patientname = selectedRadioParent.data('patientname');
              PatientId = $('.rdoSelectPatient:Checked').attr('data-patientid')
              PatientFirstName = $('.rdoSelectPatient:Checked').attr('data-patientFirstName')
              PatientLastName = $('.rdoSelectPatient:Checked').attr('data-patientLastName')
              PatietDOB = $('.rdoSelectPatient:Checked').attr('data-patientDOB')

              var patientFullname = PatientFirstName + " " + PatientLastName;
              var contents = "";
              contents += $("<span><span>" + patientFullname + "</span><br><span class='patientInfo'>" + "(" + (PatietDOB == null ? "" : PatietDOB) + ")</span><input name='patient[]' class='patientId' type='hidden' value='" + PatientId + "'>&nbsp;&nbsp;</span>").html()
              ClearPatientSelection();
              $('.msgpatient').addTag(contents, { unique: true });
              $('#txtAdvancedSearchPatient').val('');
              $('#dvPatientSearchResultContainer').html('');
              $('#AdvanceSearchPatient').modal('hide');
          }
          else {
              bootbox.alert("No patients selected");
          }
          //updatePatientSearchField(selItem);
      });

      $('body').on('click', '.btnClosePatientSearch', function () {
          $('#txtAdvancedSearchPatient').val('');
          $('#dvPatientSearchResultContainer').html('');
          $('#AdvanceSearchPatient').modal('hide');
      });
      function isDate(txtdatepicker) {
          var currVal = txtdatepicker;
          if (currVal == '')
              return false;

          var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/; //Declare Regex
          var dtArray = currVal.match(rxDatePattern); // is format OK?

          if (dtArray == null)
              return false;

          //Checks for mm/dd/yyyy format.
          dtMonth = dtArray[1];
          dtDay = dtArray[3];
          dtYear = dtArray[5];

          if (dtMonth < 1 || dtMonth > 12)
              return false;
          else if (dtDay < 1 || dtDay > 31)
              return false;
          else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
              return false;
          else if (dtMonth == 2) {
              var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
              if (dtDay > 29 || (dtDay == 29 && !isleap))
                  return false;
          }
          return true;
      }




      //function doSearch() {
      //    // Retrieve the filter url from the data-filter-url attribute
      //    var updateContainer = $('#dvUserSearchResultContainer');
      //    var reqUrl = updateContainer.data('post-url');
      //    var searchString = $.trim($('#txtAdvancedSearch').val());
      //    var state = $('#ddlAdvancedSearchState').val();
      //    var city = $('#ddlAdvancedSearchCity').val();
      //    var specialityId = $('#ddlSpeciality').val();
      //    var insuranceId = $('#ddlInsurance').val();

      //    $(updateContainer).html("<span style='float:right; font-size:18pt;'>Loading... <img src='../Images/elements/loaders/1.gif' /></span>");

      //    $.get(reqUrl, {
      //        SearchString: searchString,
      //        State: state == '' ? null : state,
      //        City: city == '' ? null : city,
      //        SpecialityId: specialityId == '' ? null : specialityId,
      //        InsuranceId: insuranceId == '' ? null : insuranceId,
      //        IsAdvancedSearch: true
      //        //RequestorId: $('#hddMemberId').val()
      //    }, function (r) {
      //        // Load Partial View using the URL from the data-filter-url attribute
      //        $(updateContainer).html(r);
      //    })
      //}

      //function updateProviderSearchField(selItem) {
      //    ClearProviderSelection();
      //    $('.msgto').addTag(selItem.html());
      //    $('#AdvancedUserSearch').modal('hide');
      //}

      //function ClearProviderSelection() {
      //    if ($('.msgto').val() != undefined) {
      //        $.each($('.msgto').val().split('::'), function (indx, obj) {
      //            $('.msgto').removeTag($(obj).text());
      //        });
      //    }
      //}

      function ClearPatientSelection() {
          $.each($('.msgpatient').val().split('::'), function (indx, obj) {
              $('.msgpatient').removeTag($(obj).text());
          });
      }

      function GetPatientId() {
          var patientId;
          $.each($('.tag  input[name="patient\[\]"]'), function () {
              patientId = $(this).val();
          });
          return patientId;
      }

      $('body').on('click', '#lnkSelectAffiliatesView', function () {
          //$('#lnkSelectAffiliatesView').click(function () {
          var reqUrlForAffiliate = $('.msgto').data('req-url-affiliate');
          var memberid = $('.providerId').val();
          if (!isNaN(memberid)) {
              // Grab the container that should be updated
              var updateContainer = $('.msgto').data('update-affiliate-container');
              $(updateContainer).html("<span style='float:right; font-size:18pt;'>Loading... <img src='../Images/elements/loaders/1.gif' /></span>");
              var completeUrl = reqUrlForAffiliate;
              $.get(completeUrl, {
                  memberId: memberid
              },
                  function (r) {
                      // Load Partial View using the URL from the data-filter-url attribute
                      $(updateContainer).html(r);
                      $(updateContainer).modal('show');

                  });
          }
          else
              bootbox.alert('No affiliates found');
      });

      $('body').on('click', '#btnSelectAffiliates', function (e) {


          var dispName = $(this).attr('data-affiliateName');
          var city = $(this).attr('data-affiliateCity');
          var state = $(this).attr('data-affiliateState');
          var speciality = $(this).attr('data-affiliateSpeciality');
          var providerid = $(this).attr('data-affiliateMemberId');

          var selectedMembers = "<span><span>";
          selectedMembers += "<span class=\"providerName clg\">" + dispName + "</span><br>"
          selectedMembers += "<span class=\"providerInfo\">" + speciality + "(" + city + "-" + state + "</span>"
          selectedMembers += "<input name=\"mem[]\" class=\"providerId\" type=\"hidden\" value=\"" + providerid + "\">"
          selectedMembers += "<input name=\"memName[]\" class=\"hddProviderName\" type=\"hidden\" value=\"" + dispName + "\">"

          selectedMembers += "</span></span>"

          $('.msgto').importTags($(selectedMembers).html());
          var memIdCtrl = $('.tag  input[name="mem\[\]"]');
          var selMemId = memIdCtrl.length > 0 ? $(memIdCtrl[0]).val() : null;

          $('#divSelectAffiliate').modal('hide');
      });

      $('#txtdatepicker').keypress(function () {
          return false;
      });


      $('body').on('click', '#btnCreateTask,.btnCreateTask', function () {
          //$('#lnkSelectAffiliatesView').click(function () {
          var reqUrl = $(this).attr('data-post-url');
          var updateContainer = $(this).attr('data-update-container');
          var episodeid = $(this).attr('data-episodeid');
          var patientname = $(this).attr('data-patientname');
          var description = $(this).attr('data-description');
          updatetaskpage = $(this).attr('data-updatetaskpage');
          $.get(reqUrl, { EpisodeId: episodeid }, function (r) {
              // Load Partial View using the URL from the data-filter-url attribute
              $(updateContainer).html(r);
              $(updateContainer).modal({ keyboard: false, backdrop: 'static' });
              CreateTaskMemberTagsInput();
              ConfigureMyTaskFileUpload();
              $('#txtEpisodeId').val(patientname);
              $('#txtEpisodeId').attr('data-episodeid', episodeid);
              $('#txtDescription').val(description);
          });


      });

      $('body').on('click', '#btnSearchEpisodes', function (e) {
          var reqUrl = $(this).attr('data-reqUrl');
          var updateContainer = $(this).attr('data-UpdateContainer');
          EpisodeTextContainer = $(this).data('search-updatecontainer');
          $(updateContainer).html("<span style='float:right; font-size:18pt;'>Loading... <img src='../Images/elements/loaders/1.gif' /></span>");
          var completeUrl = reqUrl;

          $.get(completeUrl, function (r) {
              // Load Partial View using the URL from the data-filter-url attribute
              $(updateContainer).html(r);
              $(updateContainer).modal({ keyboard: false, backdrop: 'static' });

          });

      });


      $('body').on('click', '#btnSearchEpisodesForMessage', function (e) {
          SearchEpisodes(1);

      });

      function SearchEpisodes(page) {
          var reqUrl = $('#btnSearchEpisodesForMessage').attr('data-reqUrl');
          var updateContainer = $('#btnSearchEpisodesForMessage').attr('data-UpdateConatiner');
          var searchstring = $('#txtSearchEpisode').val();
          $(updateContainer).html("<span style='float:right; font-size:18pt;'>Loading... <img src='../Images/elements/loaders/1.gif' /></span>");
          var completeUrl = reqUrl;
          $.get(completeUrl, { SearchString: searchstring, page: page }, function (r) {
              // Load Partial View using the URL from the data-filter-url attribute
              $(updateContainer).html(r);
          });
      }

      $('body').on('click', 'div.episodePag .pagerItem', function () {
          var page = $(this).data("val");
          SearchEpisodes(page);
      });

      $('body').on('change', 'div.episodePag .pagerSelect', function () {
          var page = $(this).val();
          SearchEpisodes(page);
      });

      //$('body').on('click', '.selPatientEpisode', function (e) {
      //    $(EpisodeTextContainer).attr('data-episodeid', $(this).attr('data-EpisodeId'));
      //    $(EpisodeTextContainer).val($(this).data('patientname'));
      //    $('#dvPopupTopNode1').modal('hide');
      //});

      $('body').on('click', '.selPatientEpisode', function (e) {
          $(EpisodeTextContainer).attr('data-episodeid', $(this).attr('data-EpisodeId'));
          $(EpisodeTextContainer).attr('data-patientId', $(this).attr('data-patientId'));
          $(EpisodeTextContainer).val($(this).data('patientname'));
          $('#dvPopupTopNode1').modal('hide');
          var requrl = $(this).attr('data-req-url');
          var updatecontainer = $(this).attr('data-update-container');
          var episodeid = $(this).attr('data-EpisodeId');

          $.get(requrl, { EpisodeId: episodeid }, function (r) {
              var res = res = $.parseJSON(r);
              var listItems = "<option value=''>Select</option>";
              $(res).map(function () {
                  listItems += "<option value='" + this.MemberId + "'>" + this.DisplayName + "</option>";
              });
              $(updatecontainer).html(listItems);
              $(updatecontainer).trigger("chosen:updated");
          });
      });

      $('body').on('change', '#ddlcreatedocument', function () {

          var reqUrl = $(this).data('req-url');
          var updateContainer = $($(this).attr('data-update-container'));
          var catid = $(this).val();
          $(updateContainer).html("<span style='float:right; font-size:18pt;'>Loading... <img src='../Images/elements/loaders/1.gif' /></span>");
          $.get(reqUrl, { FolderId: catid }, function (r) {

              var listItems = "<option value=''>Select</option>";
              $(r).map(function () {
                  listItems += "<option value='" + this.Id + "'>" + this.Name + "</option>";
              });
              updateContainer.html(listItems);
              $(updateContainer).trigger("chosen:updated");

          }).success(function () {

          });
      });

  });

  function GetMemberIds() {
      var memIds = new Array();
      $.each($('.tag #spnTaskMemberTag'), function () {
          memIds.push($(this).attr('data-mem-id'));
      });
      return memIds.join(",");
  }

  function CreateTaskMemberTagsInput() {
      $('.createTaskMembers').tagsInput({
          autocomplete_url: function (request, response) {
              $.ajax({
                  url: $('.createTaskMembers').attr("data-req-url"),
                  type: "GET",
                  dataType: "json",

                  data: {
                      SearchString: request.term
                  },
                  success: function (data) {
                      response($.map(data, function (item) {
                          return {
                              label: $("<span><span id='spnTaskMemberTag' data-mem-id='" + item.MemberId + "~" + item.IsTeam + "' data-isTeam='" + item.IsTeam + "'>" + item.DisplayName + "</span></span>").html(),
                              value: item.DisplayName
                          };
                      }))

                  },
                  error: function (request, status, error) {
                      //alert(request);
                  }

              })
          },
          autocomplete: { autoFocus: false },
          multivalues: true,
          defaultText: 'Search Member',
          'unique': true,
          width: '100%',
          'delimiter': '::',
          className: 'createTaskMembersTagsInput',
          acceptInvalidAutoCompleteSelection: false,
          onAddTag: function (e, obj) {

          },
          onRemoveTag: function (e, obj) {

          }
      });

      RegisterTagsinputRenderItems('createTaskMembersTagsInput');
  }

  function ConfigureMyTaskFileUpload() {
      // Initialize the jQuery File Upload widget:
      RegisterFileUpload('.fileupload');
  }

  jQuery.extend(jQuery.easing, {
    easeOutBack:function(x, t, b, c, d, s){
      if (s == undefined) s = 1.70158;
      return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    easeInQuad: function (x, t, b, c, d) {
      return c*(t/=d)*t + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
      if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
      return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
    },
    easeInOutSine: function (x, t, b, c, d) {
      return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    }
  })

  var ddiconmenu={
    startzindex:100,
    wrapperoffset:[2,20],
    ismobile:navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i) != null,
    submenuids : [],
    transform: typeof jQuery(document.documentElement).css('transform') != "undefined",

    init:function(setting){
      var $=jQuery
      var s=$.extend({fx:'slide', easing:'easeInOutSine', dur:'normal', hidedelay:200, trigger:'click'}, setting)
      if (s.fx=="none") //if fx is disabled, bypass animation
        s.dur=0
      var $mainmenu=$('#'+s.menuid)
      $anchors=($mainmenu.attr('rel'))? $mainmenu : $mainmenu.find('*[rel]')
      function buildmenu($anchors){
        $anchors.each(function(){ //loop through anchor links
          var $anchor=$(this)
          var relvalue=$anchor.attr('rel')
          if (/\[title\]/i.test(relvalue)){ // if rel's value is [title], meaning its contents should just be title attribute
            if ($anchor.attr('title')!=''){ // if title attribute is defined
              var $submenu=$('<div class="iconsubmenu icontooltip" style="position:absolute; visibility:hidden">' + $anchor.attr('title') + '</div>').appendTo(document.body)
            }
            else{
              return
            }
          }
          else{
            var $submenu=$('#'+relvalue) //extract "submenuid" to reference submenu
                .css({position:'absolute'})
            if ($.inArray(relvalue, ddiconmenu.submenuids) != -1){ // if this sub menu has already been initialized and added to a previous anchor
              $submenu=$submenu.clone().attr('id', '').appendTo(document.body)
            }
          }
          $submenu.wrap('<div class="subwrapper" style="z-index:'+ddiconmenu.startzindex+';position:absolute;top:0;right:0px;visibility:hidden"><div style="position:absolute;overflow:hidden;right:0;top:0;width:100%;height:100%;"></div></div>')
            .css({visibility:'inherit', right:-$submenu.outerWidth()}) //set submenu's right pos so it's out of view intially
            .data('timer', {}) //add timer data object to submenu object
          var $arrow=$('<div class="arrow" />').appendTo($submenu)
          var submenugutter=$arrow.outerWidth() // gap between $submenu and main wrapper to position arrow inside
          $arrow.css({right: -submenugutter-($submenu.outerWidth()-$submenu.innerWidth())/2})
          if ($submenu.outerHeight()-15 < ($anchor.outerHeight())) // if height of submenu is less than its corresponding icon anchor (most likely a tooltip)
            $submenu.css({top: 8})
          var $wrapper=$submenu.closest('div.subwrapper').css({width:$submenu.outerWidth()+ddiconmenu.wrapperoffset[0] + submenugutter + 40, height:$submenu.outerHeight()+ddiconmenu.wrapperoffset[1]}) //reference outermost wrapper of submenu and set its dimensions
          var $wrapperparent=$anchor.closest('div.subwrapper') //check if this anchor link is defined inside a submenu wrapper (nested menu)
          if ($wrapperparent.length>0){ //if so
            $wrapper.appendTo($wrapperparent) //move corresponding submenu wrapper to within its parent submenu wrapper
          }
          else{ //else if this submenu wrapper is topmost
            $wrapper.appendTo(document.body) //move it so it's a child of document.body
            $submenu.data('istopmenu', true) //indicate this is top level wrapper
          }
          $anchor.bind((setting.trigger=="click")? "click" : "click", function(e){ //when mouse clicks on or mouses over anchor
            clearTimeout($submenu.data('timer').hide)
            var offset=($submenu.data('istopmenu'))? $anchor.offset() : $anchor.position()
            $anchors.removeClass('selected')
            $anchor.addClass('selected')
            $wrapper.css({visibility:'visible', right:offset.right+$anchor.outerWidth()+ddiconmenu.wrapperoffset[0], top:offset.top, zIndex:++ddiconmenu.startzindex})
            $submenu.css({opacity:0}).stop().animate({right:submenugutter, opacity:1}, s.dur, s.easing) //animate submenu into view
            if (setting.trigger=="click" && !ddiconmenu.ismobile) //returning false in mobile browsers seem to lead to strange behavior
              return false
          })
          $anchor.mouseleave(function(){ //when mouse moves OUT anchor
            $submenu.data('timer').hide=setTimeout(function(){
              $submenu.stop().animate({right:-$submenu.outerWidth()-submenugutter, opacity:0}, s.dur, function(){$wrapper.css({visibility:'hidden'})}) //animate submenu out of view and hide wrapper DIV
              $anchor.removeClass('selected')
            }, s.hidedelay)
          })
          $anchor.click(function(e){
            if (relvalue!="[title]" || (setting.trigger=='click' && !ddiconmenu.ismobile)) //on ipad/iphone, disable anchor link (those with a drop down menu) when clicked on (triggered by mouseover event on desktop), so menu is given a chance to appear
              return false
          })
          $wrapper.mouseenter(function(){ //when mouse moves OVER submenu wrapper
              clearTimeout($submenu.data('timer').hide)
          })
          $wrapper.bind('mouseleave click', function(e){ //when mouse moves OUT or CLICKs on submenu wrapper
            $submenu.data('timer').hide=setTimeout(function(){
              $submenu.stop().animate({right:-$submenu.outerWidth()-submenugutter, opacity:0}, (e.type=="click")? 0 : s.dur, function(){$wrapper.css({visibility:'hidden'})}) //animate submenu out of view and hide wrapper DIV
              $anchor.removeClass('selected')
            }, s.hidedelay)
          })
          if (relvalue!="[title]"){
            ddiconmenu.submenuids.push(relvalue)
          }
          buildmenu($submenu.find('*[rel]')) //build next level sub menus
        })
      }
      buildmenu($anchors)
    },

    docinit:function(setting){
      jQuery(function($){ //on document.ready
        ddiconmenu.init(setting)
      })
    }

  }




  /**
   * Bootstrap Multiselect (https://github.com/davidstutz/bootstrap-multiselect)
   *
   * Apache License, Version 2.0:
   * Copyright (c) 2012 - 2015 David Stutz
   *
   * Licensed under the Apache License, Version 2.0 (the "License"); you may not
   * use this file except in compliance with the License. You may obtain a
   * copy of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
   * License for the specific language governing permissions and limitations
   * under the License.
   *
   * BSD 3-Clause License:
   * Copyright (c) 2012 - 2015 David Stutz
   * All rights reserved.
   *
   * Redistribution and use in source and binary forms, with or without
   * modification, are permitted provided that the following conditions are met:
   *    - Redistributions of source code must retain the above copyright notice,
   *      this list of conditions and the following disclaimer.
   *    - Redistributions in binary form must reproduce the above copyright notice,
   *      this list of conditions and the following disclaimer in the documentation
   *      and/or other materials provided with the distribution.
   *    - Neither the name of David Stutz nor the names of its contributors may be
   *      used to endorse or promote products derived from this software without
   *      specific prior written permission.
   *
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
   * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
   * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
   * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
   * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
   * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
   * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
   * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
   * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
   * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   */
  // !function ($) {
  //     "use strict";// jshint ;_;

  //     if (typeof ko !== 'undefined' && ko.bindingHandlers && !ko.bindingHandlers.multiselect) {
  //         ko.bindingHandlers.multiselect = {
  //             after: ['options', 'value', 'selectedOptions', 'enable', 'disable'],

  //             init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
  //                 var $element = $(element);
  //                 var config = ko.toJS(valueAccessor());

  //                 $element.multiselect(config);

  //                 if (allBindings.has('options')) {
  //                     var options = allBindings.get('options');
  //                     if (ko.isObservable(options)) {
  //                         ko.computed({
  //                             read: function() {
  //                                 options();
  //                                 setTimeout(function() {
  //                                     var ms = $element.data('multiselect');
  //                                     if (ms)
  //                                         ms.updateOriginalOptions();//Not sure how beneficial this is.
  //                                     $element.multiselect('rebuild');
  //                                 }, 1);
  //                             },
  //                             disposeWhenNodeIsRemoved: element
  //                         });
  //                     }
  //                 }

  //                 //value and selectedOptions are two-way, so these will be triggered even by our own actions.
  //                 //It needs some way to tell if they are triggered because of us or because of outside change.
  //                 //It doesn't loop but it's a waste of processing.
  //                 if (allBindings.has('value')) {
  //                     var value = allBindings.get('value');
  //                     if (ko.isObservable(value)) {
  //                         ko.computed({
  //                             read: function() {
  //                                 value();
  //                                 setTimeout(function() {
  //                                     $element.multiselect('refresh');
  //                                 }, 1);
  //                             },
  //                             disposeWhenNodeIsRemoved: element
  //                         }).extend({ rateLimit: 100, notifyWhenChangesStop: true });
  //                     }
  //                 }

  //                 //Switched from arrayChange subscription to general subscription using 'refresh'.
  //                 //Not sure performance is any better using 'select' and 'deselect'.
  //                 if (allBindings.has('selectedOptions')) {
  //                     var selectedOptions = allBindings.get('selectedOptions');
  //                     if (ko.isObservable(selectedOptions)) {
  //                         ko.computed({
  //                             read: function() {
  //                                 selectedOptions();
  //                                 setTimeout(function() {
  //                                     $element.multiselect('refresh');
  //                                 }, 1);
  //                             },
  //                             disposeWhenNodeIsRemoved: element
  //                         }).extend({ rateLimit: 100, notifyWhenChangesStop: true });
  //                     }
  //                 }

  //                 var setEnabled = function (enable) {
  //                     setTimeout(function () {
  //                         if (enable)
  //                             $element.multiselect('enable');
  //                         else
  //                             $element.multiselect('disable');
  //                     });
  //                 };

  //                 if (allBindings.has('enable')) {
  //                     var enable = allBindings.get('enable');
  //                     if (ko.isObservable(enable)) {
  //                         ko.computed({
  //                             read: function () {
  //                                 setEnabled(enable());
  //                             },
  //                             disposeWhenNodeIsRemoved: element
  //                         }).extend({ rateLimit: 100, notifyWhenChangesStop: true });
  //                     } else {
  //                         setEnabled(enable);
  //                     }
  //                 }

  //                 if (allBindings.has('disable')) {
  //                     var disable = allBindings.get('disable');
  //                     if (ko.isObservable(disable)) {
  //                         ko.computed({
  //                             read: function () {
  //                                 setEnabled(!disable());
  //                             },
  //                             disposeWhenNodeIsRemoved: element
  //                         }).extend({ rateLimit: 100, notifyWhenChangesStop: true });
  //                     } else {
  //                         setEnabled(!disable);
  //                     }
  //                 }

  //                 ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
  //                     $element.multiselect('destroy');
  //                 });
  //             },

  //             update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
  //                 var $element = $(element);
  //                 var config = ko.toJS(valueAccessor());

  //                 $element.multiselect('setOptions', config);
  //                 $element.multiselect('rebuild');
  //             }
  //         };
  //     }

  //     function forEach(array, callback) {
  //         for (var index = 0; index < array.length; ++index) {
  //             callback(array[index], index);
  //         }
  //     }

  //     /**
  //      * Constructor to create a new multiselect using the given select.
  //      *
  //      * @param {jQuery} select
  //      * @param {Object} options
  //      * @returns {Multiselect}
  //      */
  //     function Multiselect(select, options) {

  //         this.$select = $(select);
  //         this.options = this.mergeOptions($.extend({}, options, this.$select.data()));

  //         // Placeholder via data attributes
  //         if (this.$select.attr("data-placeholder")) {
  //             this.options.nonSelectedText = this.$select.data("placeholder");
  //         }

  //         // Initialization.
  //         // We have to clone to create a new reference.
  //         this.originalOptions = this.$select.clone()[0].options;
  //         this.query = '';
  //         this.searchTimeout = null;
  //         this.lastToggledInput = null;

  //         this.options.multiple = this.$select.attr('multiple') === "multiple";
  //         this.options.onChange = $.proxy(this.options.onChange, this);
  //         this.options.onSelectAll = $.proxy(this.options.onSelectAll, this);
  //         this.options.onDeselectAll = $.proxy(this.options.onDeselectAll, this);
  //         this.options.onDropdownShow = $.proxy(this.options.onDropdownShow, this);
  //         this.options.onDropdownHide = $.proxy(this.options.onDropdownHide, this);
  //         this.options.onDropdownShown = $.proxy(this.options.onDropdownShown, this);
  //         this.options.onDropdownHidden = $.proxy(this.options.onDropdownHidden, this);
  //         this.options.onInitialized = $.proxy(this.options.onInitialized, this);
  //         this.options.onFiltering = $.proxy(this.options.onFiltering, this);

  //         // Build select all if enabled.
  //         this.buildContainer();
  //         this.buildButton();
  //         this.buildDropdown();
  //         this.buildSelectAll();
  //         this.buildDropdownOptions();
  //         this.buildFilter();

  //         this.updateButtonText();
  //         this.updateSelectAll(true);

  //         if (this.options.enableClickableOptGroups && this.options.multiple) {
  //             this.updateOptGroups();
  //         }

  //         this.options.wasDisabled = this.$select.prop('disabled');
  //         if (this.options.disableIfEmpty && $('option', this.$select).length <= 0) {
  //             this.disable();
  //         }

  //         this.$select.wrap('<span class="multiselect-native-select" />').after(this.$container);
  //         this.options.onInitialized(this.$select, this.$container);
  //     }

  //     Multiselect.prototype = {

  //         defaults: {
  //             /**
  //              * Default text function will either print 'None selected' in case no
  //              * option is selected or a list of the selected options up to a length
  //              * of 3 selected options.
  //              *
  //              * @param {jQuery} options
  //              * @param {jQuery} select
  //              * @returns {String}
  //              */
  //             buttonText: function(options, select) {
  //                 if (this.disabledText.length > 0
  //                         && (select.prop('disabled') || (options.length == 0 && this.disableIfEmpty)))  {

  //                     return this.disabledText;
  //                 }
  //                 else if (options.length === 0) {
  //                     return this.nonSelectedText;
  //                 }
  //                 else if (this.allSelectedText
  //                         && options.length === $('option', $(select)).length
  //                         && $('option', $(select)).length !== 1
  //                         && this.multiple) {

  //                     if (this.selectAllNumber) {
  //                         return this.allSelectedText + ' (' + options.length + ')';
  //                     }
  //                     else {
  //                         return this.allSelectedText;
  //                     }
  //                 }
  //                 else if (options.length > this.numberDisplayed) {
  //                     return options.length + ' ' + this.nSelectedText;
  //                 }
  //                 else {
  //                     var selected = '';
  //                     var delimiter = this.delimiterText;

  //                     options.each(function() {
  //                         var label = ($(this).attr('label') !== undefined) ? $(this).attr('label') : $(this).text();
  //                         selected += label + delimiter;
  //                     });

  //                     return selected.substr(0, selected.length - this.delimiterText.length);
  //                 }
  //             },
  //             /**
  //              * Updates the title of the button similar to the buttonText function.
  //              *
  //              * @param {jQuery} options
  //              * @param {jQuery} select
  //              * @returns {@exp;selected@call;substr}
  //              */
  //             buttonTitle: function(options, select) {
  //                 if (options.length === 0) {
  //                     return this.nonSelectedText;
  //                 }
  //                 else {
  //                     var selected = '';
  //                     var delimiter = this.delimiterText;

  //                     options.each(function () {
  //                         var label = ($(this).attr('label') !== undefined) ? $(this).attr('label') : $(this).text();
  //                         selected += label + delimiter;
  //                     });
  //                     return selected.substr(0, selected.length - this.delimiterText.length);
  //                 }
  //             },
  //             checkboxName: function(option) {
  //                 return false; // no checkbox name
  //             },
  //             /**
  //              * Create a label.
  //              *
  //              * @param {jQuery} element
  //              * @returns {String}
  //              */
  //             optionLabel: function(element){
  //                 return $(element).attr('label') || $(element).text();
  //             },
  //             /**
  //              * Create a class.
  //              *
  //              * @param {jQuery} element
  //              * @returns {String}
  //              */
  //             optionClass: function(element) {
  //                 return $(element).attr('class') || '';
  //             },
  //             /**
  //              * Triggered on change of the multiselect.
  //              *
  //              * Not triggered when selecting/deselecting options manually.
  //              *
  //              * @param {jQuery} option
  //              * @param {Boolean} checked
  //              */
  //             onChange : function(option, checked) {

  //             },
  //             /**
  //              * Triggered when the dropdown is shown.
  //              *
  //              * @param {jQuery} event
  //              */
  //             onDropdownShow: function(event) {

  //             },
  //             /**
  //              * Triggered when the dropdown is hidden.
  //              *
  //              * @param {jQuery} event
  //              */
  //             onDropdownHide: function(event) {

  //             },
  //             /**
  //              * Triggered after the dropdown is shown.
  //              *
  //              * @param {jQuery} event
  //              */
  //             onDropdownShown: function(event) {

  //             },
  //             /**
  //              * Triggered after the dropdown is hidden.
  //              *
  //              * @param {jQuery} event
  //              */
  //             onDropdownHidden: function(event) {

  //             },
  //             /**
  //              * Triggered on select all.
  //              */
  //             onSelectAll: function() {

  //             },
  //             /**
  //              * Triggered on deselect all.
  //              */
  //             onDeselectAll: function() {

  //             },
  //             /**
  //              * Triggered after initializing.
  //              *
  //              * @param {jQuery} $select
  //              * @param {jQuery} $container
  //              */
  //             onInitialized: function($select, $container) {

  //             },
  //             /**
  //              * Triggered on filtering.
  //              *
  //              * @param {jQuery} $filter
  //              */
  //             onFiltering: function($filter) {

  //             },
  //             enableHTML: false,
  //             buttonClass: 'btn btn-default',
  //             inheritClass: false,
  //             buttonWidth: 'auto',
  //             buttonContainer: '<div class="btn-group" />',
  //             dropRight: false,
  //             dropUp: false,
  //             selectedClass: 'active',
  //             // Maximum height of the dropdown menu.
  //             // If maximum height is exceeded a scrollbar will be displayed.
  //             maxHeight: false,
  //             includeSelectAllOption: false,
  //             includeSelectAllIfMoreThan: 0,
  //             selectAllText: ' Select all',
  //             selectAllValue: 'multiselect-all',
  //             selectAllName: false,
  //             selectAllNumber: true,
  //             selectAllJustVisible: true,
  //             enableFiltering: false,
  //             enableCaseInsensitiveFiltering: false,
  //             enableFullValueFiltering: false,
  //             enableClickableOptGroups: false,
  //             enableCollapsibleOptGroups: false,
  //             filterPlaceholder: 'Search',
  //             // possible options: 'text', 'value', 'both'
  //             filterBehavior: 'text',
  //             includeFilterClearBtn: true,
  //             preventInputChangeEvent: false,
  //             nonSelectedText: 'None selected',
  //             nSelectedText: 'selected',
  //             allSelectedText: 'All selected',
  //             numberDisplayed: 0,
  //             disableIfEmpty: false,
  //             disabledText: '',
  //             delimiterText: ', ',
  //             templates: {
  //                 button: '<button type="button" class="multiselect dropdown-toggle" data-toggle="dropdown"><span class="multiselect-selected-text"></span> <b class="caret"></b></button>',
  //                 ul: '<ul class="multiselect-container dropdown-menu"></ul>',
  //                 filter: '<li class="multiselect-item multiselect-filter"><div class="input-group"><span class="input-group-addon"><i class="fa fa-search"></i></span><input class="form-control multiselect-search" type="text"></div></li>',
  //                 filterClearBtn: '<span class="input-group-btn"><button class="btn btn-default multiselect-clear-filter" type="button"><i class="fa fa-times"></i></button></span>',
  //                 li: '<li><a tabindex="0"><label></label></a></li>',
  //                 divider: '<li class="multiselect-item divider"></li>',
  //                 liGroup: '<li class="multiselect-item multiselect-group"><label></label></li>'
  //             }
  //         },

  //         constructor: Multiselect,

  //         /**
  //          * Builds the container of the multiselect.
  //          */
  //         buildContainer: function() {
  //             this.$container = $(this.options.buttonContainer);
  //             this.$container.on('show.bs.dropdown', this.options.onDropdownShow);
  //             this.$container.on('hide.bs.dropdown', this.options.onDropdownHide);
  //             this.$container.on('shown.bs.dropdown', this.options.onDropdownShown);
  //             this.$container.on('hidden.bs.dropdown', this.options.onDropdownHidden);
  //         },

  //         /**
  //          * Builds the button of the multiselect.
  //          */
  //         buildButton: function() {
  //             this.$button = $(this.options.templates.button).addClass(this.options.buttonClass);
  //             if (this.$select.attr('class') && this.options.inheritClass) {
  //                 this.$button.addClass(this.$select.attr('class'));
  //             }
  //             // Adopt active state.
  //             if (this.$select.prop('disabled')) {
  //                 this.disable();
  //             }
  //             else {
  //                 this.enable();
  //             }

  //             // Manually add button width if set.
  //             if (this.options.buttonWidth && this.options.buttonWidth !== 'auto') {
  //                 this.$button.css({
  //                     'width' : '100%', //this.options.buttonWidth,
  //                     'overflow' : 'hidden',
  //                     'text-overflow' : 'ellipsis'
  //                 });
  //                 this.$container.css({
  //                     'width': this.options.buttonWidth
  //                 });
  //             }

  //             // Keep the tab index from the select.
  //             var tabindex = this.$select.attr('tabindex');
  //             if (tabindex) {
  //                 this.$button.attr('tabindex', tabindex);
  //             }

  //             this.$container.prepend(this.$button);
  //         },

  //         /**
  //          * Builds the ul representing the dropdown menu.
  //          */
  //         buildDropdown: function() {

  //             // Build ul.
  //             this.$ul = $(this.options.templates.ul);

  //             if (this.options.dropRight) {
  //                 this.$ul.addClass('pull-right');
  //             }

  //             // Set max height of dropdown menu to activate auto scrollbar.
  //             if (this.options.maxHeight) {
  //                 // TODO: Add a class for this option to move the css declarations.
  //                 this.$ul.css({
  //                     'max-height': this.options.maxHeight + 'px',
  //                     'overflow-y': 'auto',
  //                     'overflow-x': 'hidden'
  //                 });
  //             }

  //             if (this.options.dropUp) {

  //                 var height = Math.min(this.options.maxHeight, $('option[data-role!="divider"]', this.$select).length*26 + $('option[data-role="divider"]', this.$select).length*19 + (this.options.includeSelectAllOption ? 26 : 0) + (this.options.enableFiltering || this.options.enableCaseInsensitiveFiltering ? 44 : 0));
  //                 var moveCalc = height + 34;

  //                 this.$ul.css({
  //                     'max-height': height + 'px',
  //                     'overflow-y': 'auto',
  //                     'overflow-x': 'hidden',
  //                     'margin-top': "-" + moveCalc + 'px'
  //                 });
  //             }

  //             this.$container.append(this.$ul);
  //         },

  //         /**
  //          * Build the dropdown options and binds all necessary events.
  //          *
  //          * Uses createDivider and createOptionValue to create the necessary options.
  //          */
  //         buildDropdownOptions: function() {

  //             this.$select.children().each($.proxy(function(index, element) {

  //                 var $element = $(element);
  //                 // Support optgroups and options without a group simultaneously.
  //                 var tag = $element.prop('tagName')
  //                     .toLowerCase();

  //                 if ($element.prop('value') === this.options.selectAllValue) {
  //                     return;
  //                 }

  //                 if (tag === 'optgroup') {
  //                     this.createOptgroup(element);
  //                 }
  //                 else if (tag === 'option') {

  //                     if ($element.data('role') === 'divider') {
  //                         this.createDivider();
  //                     }
  //                     else {
  //                         this.createOptionValue(element);
  //                     }

  //                 }

  //                 // Other illegal tags will be ignored.
  //             }, this));

  //             // Bind the change event on the dropdown elements.
  //             $('li:not(.multiselect-group) input', this.$ul).on('change', $.proxy(function(event) {
  //                 var $target = $(event.target);

  //                 var checked = $target.prop('checked') || false;
  //                 var isSelectAllOption = $target.val() === this.options.selectAllValue;

  //                 // Apply or unapply the configured selected class.
  //                 if (this.options.selectedClass) {
  //                     if (checked) {
  //                         $target.closest('li')
  //                             .addClass(this.options.selectedClass);
  //                     }
  //                     else {
  //                         $target.closest('li')
  //                             .removeClass(this.options.selectedClass);
  //                     }
  //                 }

  //                 // Get the corresponding option.
  //                 var value = $target.val();
  //                 var $option = this.getOptionByValue(value);

  //                 var $optionsNotThis = $('option', this.$select).not($option);
  //                 var $checkboxesNotThis = $('input', this.$container).not($target);

  //                 if (isSelectAllOption) {

  //                     if (checked) {
  //                         this.selectAll(this.options.selectAllJustVisible, true);
  //                     }
  //                     else {
  //                         this.deselectAll(this.options.selectAllJustVisible, true);
  //                     }
  //                 }
  //                 else {
  //                     if (checked) {
  //                         $option.prop('selected', true);

  //                         if (this.options.multiple) {
  //                             // Simply select additional option.
  //                             $option.prop('selected', true);
  //                         }
  //                         else {
  //                             // Unselect all other options and corresponding checkboxes.
  //                             if (this.options.selectedClass) {
  //                                 $($checkboxesNotThis).closest('li').removeClass(this.options.selectedClass);
  //                             }

  //                             $($checkboxesNotThis).prop('checked', false);
  //                             $optionsNotThis.prop('selected', false);

  //                             // It's a single selection, so close.
  //                             this.$button.click();
  //                         }

  //                         if (this.options.selectedClass === "active") {
  //                             $optionsNotThis.closest("a").css("outline", "");
  //                         }
  //                     }
  //                     else {
  //                         // Unselect option.
  //                         $option.prop('selected', false);
  //                     }

  //                     // To prevent select all from firing onChange: #575
  //                     this.options.onChange($option, checked);

  //                     // Do not update select all or optgroups on select all change!
  //                     this.updateSelectAll();

  //                     if (this.options.enableClickableOptGroups && this.options.multiple) {
  //                         this.updateOptGroups();
  //                     }
  //                 }

  //                 this.$select.change();
  //                 this.updateButtonText();

  //                 if(this.options.preventInputChangeEvent) {
  //                     return false;
  //                 }
  //             }, this));

  //             $('li a', this.$ul).on('mousedown', function(e) {
  //                 if (e.shiftKey) {
  //                     // Prevent selecting text by Shift+click
  //                     return false;
  //                 }
  //             });

  //             $('li a', this.$ul).on('touchstart click', $.proxy(function(event) {
  //                 event.stopPropagation();

  //                 var $target = $(event.target);

  //                 if (event.shiftKey && this.options.multiple) {
  //                     if($target.is("label")){ // Handles checkbox selection manually (see https://github.com/davidstutz/bootstrap-multiselect/issues/431)
  //                         event.preventDefault();
  //                         $target = $target.find("input");
  //                         $target.prop("checked", !$target.prop("checked"));
  //                     }
  //                     var checked = $target.prop('checked') || false;

  //                     if (this.lastToggledInput !== null && this.lastToggledInput !== $target) { // Make sure we actually have a range
  //                         var from = $target.closest("li").index();
  //                         var to = this.lastToggledInput.closest("li").index();

  //                         if (from > to) { // Swap the indices
  //                             var tmp = to;
  //                             to = from;
  //                             from = tmp;
  //                         }

  //                         // Make sure we grab all elements since slice excludes the last index
  //                         ++to;

  //                         // Change the checkboxes and underlying options
  //                         var range = this.$ul.find("li").slice(from, to).find("input");

  //                         range.prop('checked', checked);

  //                         if (this.options.selectedClass) {
  //                             range.closest('li')
  //                                 .toggleClass(this.options.selectedClass, checked);
  //                         }

  //                         for (var i = 0, j = range.length; i < j; i++) {
  //                             var $checkbox = $(range[i]);

  //                             var $option = this.getOptionByValue($checkbox.val());

  //                             $option.prop('selected', checked);
  //                         }
  //                     }

  //                     // Trigger the select "change" event
  //                     $target.trigger("change");
  //                 }

  //                 // Remembers last clicked option
  //                 if($target.is("input") && !$target.closest("li").is(".multiselect-item")){
  //                     this.lastToggledInput = $target;
  //                 }

  //                 $target.blur();
  //             }, this));

  //             // Keyboard support.
  //             this.$container.off('keydown.multiselect').on('keydown.multiselect', $.proxy(function(event) {
  //                 if ($('input[type="text"]', this.$container).is(':focus')) {
  //                     return;
  //                 }

  //                 if (event.keyCode === 9 && this.$container.hasClass('open')) {
  //                     this.$button.click();
  //                 }
  //                 else {
  //                     var $items = $(this.$container).find("li:not(.divider):not(.disabled) a").filter(":visible");

  //                     if (!$items.length) {
  //                         return;
  //                     }

  //                     var index = $items.index($items.filter(':focus'));

  //                     // Navigation up.
  //                     if (event.keyCode === 38 && index > 0) {
  //                         index--;
  //                     }
  //                     // Navigate down.
  //                     else if (event.keyCode === 40 && index < $items.length - 1) {
  //                         index++;
  //                     }
  //                     else if (!~index) {
  //                         index = 0;
  //                     }

  //                     var $current = $items.eq(index);
  //                     $current.focus();

  //                     if (event.keyCode === 32 || event.keyCode === 13) {
  //                         var $checkbox = $current.find('input');

  //                         $checkbox.prop("checked", !$checkbox.prop("checked"));
  //                         $checkbox.change();
  //                     }

  //                     event.stopPropagation();
  //                     event.preventDefault();
  //                 }
  //             }, this));

  //             if (this.options.enableClickableOptGroups && this.options.multiple) {
  //                 $("li.multiselect-group input", this.$ul).on("change", $.proxy(function(event) {
  //                     event.stopPropagation();

  //                     var $target = $(event.target);
  //                     var checked = $target.prop('checked') || false;

  //                     var $li = $(event.target).closest('li');
  //                     var $group = $li.nextUntil("li.multiselect-group")
  //                         .not('.multiselect-filter-hidden')
  //                         .not('.disabled');

  //                     var $inputs = $group.find("input");

  //                     var values = [];
  //                     var $options = [];

  //                     if (this.options.selectedClass) {
  //                         if (checked) {
  //                             $li.addClass(this.options.selectedClass);
  //                         }
  //                         else {
  //                             $li.removeClass(this.options.selectedClass);
  //                         }
  //                     }

  //                     $.each($inputs, $.proxy(function(index, input) {
  //                         var value = $(input).val();
  //                         var $option = this.getOptionByValue(value);

  //                         if (checked) {
  //                             $(input).prop('checked', true);
  //                             $(input).closest('li')
  //                                 .addClass(this.options.selectedClass);

  //                             $option.prop('selected', true);
  //                         }
  //                         else {
  //                             $(input).prop('checked', false);
  //                             $(input).closest('li')
  //                                 .removeClass(this.options.selectedClass);

  //                             $option.prop('selected', false);
  //                         }

  //                         $options.push(this.getOptionByValue(value));
  //                     }, this))

  //                     // Cannot use select or deselect here because it would call updateOptGroups again.

  //                     this.options.onChange($options, checked);

  //                     this.updateButtonText();
  //                     this.updateSelectAll();
  //                 }, this));
  //             }

  //             if (this.options.enableCollapsibleOptGroups && this.options.multiple) {
  //                 $("li.multiselect-group .caret-container", this.$ul).on("click", $.proxy(function(event) {
  //                     var $li = $(event.target).closest('li');
  //                     var $inputs = $li.nextUntil("li.multiselect-group")
  //                             .not('.multiselect-filter-hidden');

  //                     var visible = true;
  //                     $inputs.each(function() {
  //                         visible = visible && $(this).is(':visible');
  //                     });

  //                     if (visible) {
  //                         $inputs.hide()
  //                             .addClass('multiselect-collapsible-hidden');
  //                     }
  //                     else {
  //                         $inputs.show()
  //                             .removeClass('multiselect-collapsible-hidden');
  //                     }
  //                 }, this));

  //                 $("li.multiselect-all", this.$ul).css('background', '#f3f3f3').css('border-bottom', '1px solid #eaeaea');
  //                 $("li.multiselect-all > a > label.checkbox", this.$ul).css('padding', '3px 20px 3px 35px');
  //                 $("li.multiselect-group > a > input", this.$ul).css('margin', '4px 0px 5px -20px');
  //             }
  //         },

  //         /**
  //          * Create an option using the given select option.
  //          *
  //          * @param {jQuery} element
  //          */
  //         createOptionValue: function(element) {
  //             var $element = $(element);
  //             if ($element.is(':selected')) {
  //                 $element.prop('selected', true);
  //             }

  //             // Support the label attribute on options.
  //             var label = this.options.optionLabel(element);
  //             var classes = this.options.optionClass(element);
  //             var value = $element.val();
  //             var inputType = this.options.multiple ? "checkbox" : "radio";

  //             var $li = $(this.options.templates.li);
  //             var $label = $('label', $li);
  //             $label.addClass(inputType);
  //             $li.addClass(classes);

  //             if (this.options.enableHTML) {
  //                 $label.html(" " + label);
  //             }
  //             else {
  //                 $label.text(" " + label);
  //             }

  //             var $checkbox = $('<input/>').attr('type', inputType);

  //             var name = this.options.checkboxName($element);
  //             if (name) {
  //                 $checkbox.attr('name', name);
  //             }

  //             $label.prepend($checkbox);

  //             var selected = $element.prop('selected') || false;
  //             $checkbox.val(value);

  //             if (value === this.options.selectAllValue) {
  //                 $li.addClass("multiselect-item multiselect-all");
  //                 $checkbox.parent().parent()
  //                     .addClass('multiselect-all');
  //             }

  //             $label.attr('title', $element.attr('title'));

  //             this.$ul.append($li);

  //             if ($element.is(':disabled')) {
  //                 $checkbox.attr('disabled', 'disabled')
  //                     .prop('disabled', true)
  //                     .closest('a')
  //                     .attr("tabindex", "-1")
  //                     .closest('li')
  //                     .addClass('disabled');
  //             }

  //             $checkbox.prop('checked', selected);

  //             if (selected && this.options.selectedClass) {
  //                 $checkbox.closest('li')
  //                     .addClass(this.options.selectedClass);
  //             }
  //         },

  //         /**
  //          * Creates a divider using the given select option.
  //          *
  //          * @param {jQuery} element
  //          */
  //         createDivider: function(element) {
  //             var $divider = $(this.options.templates.divider);
  //             this.$ul.append($divider);
  //         },

  //         /**
  //          * Creates an optgroup.
  //          *
  //          * @param {jQuery} group
  //          */
  //         createOptgroup: function(group) {
  //             var label = $(group).attr("label");
  //             var value = $(group).attr("value");
  //             var $li = $('<li class="multiselect-item multiselect-group"><a href="javascript:void(0);"><label><b></b></label></a></li>');

  //             var classes = this.options.optionClass(group);
  //             $li.addClass(classes);

  //             if (this.options.enableHTML) {
  //                 $('label b', $li).html(" " + label);
  //             }
  //             else {
  //                 $('label b', $li).text(" " + label);
  //             }

  //             if (this.options.enableCollapsibleOptGroups && this.options.multiple) {
  //                 $('a', $li).append('<span class="caret-container"><b class="caret"></b></span>');
  //             }

  //             if (this.options.enableClickableOptGroups && this.options.multiple) {
  //                 $('a label', $li).prepend('<input type="checkbox" value="' + value + '"/>');
  //             }

  //             if ($(group).is(':disabled')) {
  //                 $li.addClass('disabled');
  //             }

  //             this.$ul.append($li);

  //             $("option", group).each($.proxy(function($, group) {
  //                 this.createOptionValue(group);
  //             }, this))
  //         },

  //         /**
  //          * Build the select all.
  //          *
  //          * Checks if a select all has already been created.
  //          */
  //         buildSelectAll: function() {
  //             if (typeof this.options.selectAllValue === 'number') {
  //                 this.options.selectAllValue = this.options.selectAllValue.toString();
  //             }

  //             var alreadyHasSelectAll = this.hasSelectAll();

  //             if (!alreadyHasSelectAll && this.options.includeSelectAllOption && this.options.multiple
  //                     && $('option', this.$select).length > this.options.includeSelectAllIfMoreThan) {

  //                 // Check whether to add a divider after the select all.
  //                 if (this.options.includeSelectAllDivider) {
  //                     this.$ul.prepend($(this.options.templates.divider));
  //                 }

  //                 var $li = $(this.options.templates.li);
  //                 $('label', $li).addClass("checkbox");

  //                 if (this.options.enableHTML) {
  //                     $('label', $li).html(" " + this.options.selectAllText);
  //                 }
  //                 else {
  //                     $('label', $li).text(" " + this.options.selectAllText);
  //                 }

  //                 if (this.options.selectAllName) {
  //                     $('label', $li).prepend('<input type="checkbox" name="' + this.options.selectAllName + '" />');
  //                 }
  //                 else {
  //                     $('label', $li).prepend('<input type="checkbox" />');
  //                 }

  //                 var $checkbox = $('input', $li);
  //                 $checkbox.val(this.options.selectAllValue);

  //                 $li.addClass("multiselect-item multiselect-all");
  //                 $checkbox.parent().parent()
  //                     .addClass('multiselect-all');

  //                 this.$ul.prepend($li);

  //                 $checkbox.prop('checked', false);
  //             }
  //         },

  //         /**
  //          * Builds the filter.
  //          */
  //         buildFilter: function() {

  //             // Build filter if filtering OR case insensitive filtering is enabled and the number of options exceeds (or equals) enableFilterLength.
  //             if (this.options.enableFiltering || this.options.enableCaseInsensitiveFiltering) {
  //                 var enableFilterLength = Math.max(this.options.enableFiltering, this.options.enableCaseInsensitiveFiltering);

  //                 if (this.$select.find('option').length >= enableFilterLength) {

  //                     this.$filter = $(this.options.templates.filter);
  //                     $('input', this.$filter).attr('placeholder', this.options.filterPlaceholder);

  //                     // Adds optional filter clear button
  //                     if(this.options.includeFilterClearBtn) {
  //                         var clearBtn = $(this.options.templates.filterClearBtn);
  //                         clearBtn.on('click', $.proxy(function(event){
  //                             clearTimeout(this.searchTimeout);

  //                             this.$filter.find('.multiselect-search').val('');
  //                             $('li', this.$ul).show().removeClass('multiselect-filter-hidden');

  //                             this.updateSelectAll();

  //                             if (this.options.enableClickableOptGroups && this.options.multiple) {
  //                                 this.updateOptGroups();
  //                             }

  //                         }, this));
  //                         this.$filter.find('.input-group').append(clearBtn);
  //                     }

  //                     this.$ul.prepend(this.$filter);

  //                     this.$filter.val(this.query).on('click', function(event) {
  //                         event.stopPropagation();
  //                     }).on('input keydown', $.proxy(function(event) {
  //                         // Cancel enter key default behaviour
  //                         if (event.which === 13) {
  //                           event.preventDefault();
  //                       }

  //                         // This is useful to catch "keydown" events after the browser has updated the control.
  //                         clearTimeout(this.searchTimeout);

  //                         this.searchTimeout = this.asyncFunction($.proxy(function() {

  //                             if (this.query !== event.target.value) {
  //                                 this.query = event.target.value;

  //                                 var currentGroup, currentGroupVisible;
  //                                 $.each($('li', this.$ul), $.proxy(function(index, element) {
  //                                     var value = $('input', element).length > 0 ? $('input', element).val() : "";
  //                                     var text = $('label', element).text();

  //                                     var filterCandidate = '';
  //                                     if ((this.options.filterBehavior === 'text')) {
  //                                         filterCandidate = text;
  //                                     }
  //                                     else if ((this.options.filterBehavior === 'value')) {
  //                                         filterCandidate = value;
  //                                     }
  //                                     else if (this.options.filterBehavior === 'both') {
  //                                         filterCandidate = text + '\n' + value;
  //                                     }

  //                                     if (value !== this.options.selectAllValue && text) {

  //                                         // By default lets assume that element is not
  //                                         // interesting for this search.
  //                                         var showElement = false;

  //                                         if (this.options.enableCaseInsensitiveFiltering) {
  //                                             filterCandidate = filterCandidate.toLowerCase();
  //                                             this.query = this.query.toLowerCase();
  //                                         }

  //                                         if (this.options.enableFullValueFiltering && this.options.filterBehavior !== 'both') {
  //                                             var valueToMatch = filterCandidate.trim().substring(0, this.query.length);
  //                                             if (this.query.indexOf(valueToMatch) > -1) {
  //                                                 showElement = true;
  //                                             }
  //                                         }
  //                                         else if (filterCandidate.indexOf(this.query) > -1) {
  //                                             showElement = true;
  //                                         }

  //                                         // Toggle current element (group or group item) according to showElement boolean.
  //                                         $(element).toggle(showElement)
  //                                             .toggleClass('multiselect-filter-hidden', !showElement);

  //                                         // Differentiate groups and group items.
  //                                         if ($(element).hasClass('multiselect-group')) {
  //                                             // Remember group status.
  //                                             currentGroup = element;
  //                                             currentGroupVisible = showElement;
  //                                         }
  //                                         else {
  //                                             // Show group name when at least one of its items is visible.
  //                                             if (showElement) {
  //                                                 $(currentGroup).show()
  //                                                     .removeClass('multiselect-filter-hidden');
  //                                             }

  //                                             // Show all group items when group name satisfies filter.
  //                                             if (!showElement && currentGroupVisible) {
  //                                                 $(element).show()
  //                                                     .removeClass('multiselect-filter-hidden');
  //                                             }
  //                                         }
  //                                     }
  //                                 }, this));
  //                             }

  //                             this.updateSelectAll();

  //                             if (this.options.enableClickableOptGroups && this.options.multiple) {
  //                                 this.updateOptGroups();
  //                             }

  //                             this.options.onFiltering(event.target);

  //                         }, this), 300, this);
  //                     }, this));
  //                 }
  //             }
  //         },

  //         /**
  //          * Unbinds the whole plugin.
  //          */
  //         destroy: function() {
  //             this.$container.remove();
  //             this.$select.show();

  //             // reset original state
  //             this.$select.prop('disabled', this.options.wasDisabled);

  //             this.$select.data('multiselect', null);
  //         },

  //         /**
  //          * Refreshs the multiselect based on the selected options of the select.
  //          */
  //         refresh: function () {
  //             var inputs = $.map($('li input', this.$ul), $);

  //             $('option', this.$select).each($.proxy(function (index, element) {
  //                 var $elem = $(element);
  //                 var value = $elem.val();
  //                 var $input;
  //                 for (var i = inputs.length; 0 < i--; /**/) {
  //                     if (value !== ($input = inputs[i]).val())
  //                         continue; // wrong li

  //                     if ($elem.is(':selected')) {
  //                         $input.prop('checked', true);

  //                         if (this.options.selectedClass) {
  //                             $input.closest('li')
  //                                 .addClass(this.options.selectedClass);
  //                         }
  //                     }
  //                     else {
  //                         $input.prop('checked', false);

  //                         if (this.options.selectedClass) {
  //                             $input.closest('li')
  //                                 .removeClass(this.options.selectedClass);
  //                         }
  //                     }

  //                     if ($elem.is(":disabled")) {
  //                         $input.attr('disabled', 'disabled')
  //                             .prop('disabled', true)
  //                             .closest('li')
  //                             .addClass('disabled');
  //                     }
  //                     else {
  //                         $input.prop('disabled', false)
  //                             .closest('li')
  //                             .removeClass('disabled');
  //                     }
  //                     break; // assumes unique values
  //                 }
  //             }, this));

  //             this.updateButtonText();
  //             this.updateSelectAll();

  //             if (this.options.enableClickableOptGroups && this.options.multiple) {
  //                 this.updateOptGroups();
  //             }
  //         },

  //         /**
  //          * Select all options of the given values.
  //          *
  //          * If triggerOnChange is set to true, the on change event is triggered if
  //          * and only if one value is passed.
  //          *
  //          * @param {Array} selectValues
  //          * @param {Boolean} triggerOnChange
  //          */
  //         select: function(selectValues, triggerOnChange) {
  //             if(!$.isArray(selectValues)) {
  //                 selectValues = [selectValues];
  //             }

  //             for (var i = 0; i < selectValues.length; i++) {
  //                 var value = selectValues[i];

  //                 if (value === null || value === undefined) {
  //                     continue;
  //                 }

  //                 var $option = this.getOptionByValue(value);
  //                 var $checkbox = this.getInputByValue(value);

  //                 if($option === undefined || $checkbox === undefined) {
  //                     continue;
  //                 }

  //                 if (!this.options.multiple) {
  //                     this.deselectAll(false);
  //                 }

  //                 if (this.options.selectedClass) {
  //                     $checkbox.closest('li')
  //                         .addClass(this.options.selectedClass);
  //                 }

  //                 $checkbox.prop('checked', true);
  //                 $option.prop('selected', true);

  //                 if (triggerOnChange) {
  //                     this.options.onChange($option, true);
  //                 }
  //             }

  //             this.updateButtonText();
  //             this.updateSelectAll();

  //             if (this.options.enableClickableOptGroups && this.options.multiple) {
  //                 this.updateOptGroups();
  //             }
  //         },

  //         /**
  //          * Clears all selected items.
  //          */
  //         clearSelection: function () {
  //             this.deselectAll(false);
  //             this.updateButtonText();
  //             this.updateSelectAll();

  //             if (this.options.enableClickableOptGroups && this.options.multiple) {
  //                 this.updateOptGroups();
  //             }
  //         },

  //         /**
  //          * Deselects all options of the given values.
  //          *
  //          * If triggerOnChange is set to true, the on change event is triggered, if
  //          * and only if one value is passed.
  //          *
  //          * @param {Array} deselectValues
  //          * @param {Boolean} triggerOnChange
  //          */
  //         deselect: function(deselectValues, triggerOnChange) {
  //             if(!$.isArray(deselectValues)) {
  //                 deselectValues = [deselectValues];
  //             }

  //             for (var i = 0; i < deselectValues.length; i++) {
  //                 var value = deselectValues[i];

  //                 if (value === null || value === undefined) {
  //                     continue;
  //                 }

  //                 var $option = this.getOptionByValue(value);
  //                 var $checkbox = this.getInputByValue(value);

  //                 if($option === undefined || $checkbox === undefined) {
  //                     continue;
  //                 }

  //                 if (this.options.selectedClass) {
  //                     $checkbox.closest('li')
  //                         .removeClass(this.options.selectedClass);
  //                 }

  //                 $checkbox.prop('checked', false);
  //                 $option.prop('selected', false);

  //                 if (triggerOnChange) {
  //                     this.options.onChange($option, false);
  //                 }
  //             }

  //             this.updateButtonText();
  //             this.updateSelectAll();

  //             if (this.options.enableClickableOptGroups && this.options.multiple) {
  //                 this.updateOptGroups();
  //             }
  //         },

  //         /**
  //          * Selects all enabled & visible options.
  //          *
  //          * If justVisible is true or not specified, only visible options are selected.
  //          *
  //          * @param {Boolean} justVisible
  //          * @param {Boolean} triggerOnSelectAll
  //          */
  //         selectAll: function (justVisible, triggerOnSelectAll) {

  //             var justVisible = typeof justVisible === 'undefined' ? true : justVisible;
  //             var allLis = $("li:not(.divider):not(.disabled):not(.multiselect-group)", this.$ul);
  //             var visibleLis = $("li:not(.divider):not(.disabled):not(.multiselect-group):not(.multiselect-filter-hidden):not(.multiselect-collapisble-hidden)", this.$ul).filter(':visible');

  //             if(justVisible) {
  //                 $('input:enabled' , visibleLis).prop('checked', true);
  //                 visibleLis.addClass(this.options.selectedClass);

  //                 $('input:enabled' , visibleLis).each($.proxy(function(index, element) {
  //                     var value = $(element).val();
  //                     var option = this.getOptionByValue(value);
  //                     $(option).prop('selected', true);
  //                 }, this));
  //             }
  //             else {
  //                 $('input:enabled' , allLis).prop('checked', true);
  //                 allLis.addClass(this.options.selectedClass);

  //                 $('input:enabled' , allLis).each($.proxy(function(index, element) {
  //                     var value = $(element).val();
  //                     var option = this.getOptionByValue(value);
  //                     $(option).prop('selected', true);
  //                 }, this));
  //             }

  //             $('li input[value="' + this.options.selectAllValue + '"]', this.$ul).prop('checked', true);

  //             if (this.options.enableClickableOptGroups && this.options.multiple) {
  //                 this.updateOptGroups();
  //             }

  //             if (triggerOnSelectAll) {
  //                 this.options.onSelectAll();
  //             }
  //         },

  //         /**
  //          * Deselects all options.
  //          *
  //          * If justVisible is true or not specified, only visible options are deselected.
  //          *
  //          * @param {Boolean} justVisible
  //          */
  //         deselectAll: function (justVisible, triggerOnDeselectAll) {

  //             var justVisible = typeof justVisible === 'undefined' ? true : justVisible;
  //             var allLis = $("li:not(.divider):not(.disabled):not(.multiselect-group)", this.$ul);
  //             var visibleLis = $("li:not(.divider):not(.disabled):not(.multiselect-group):not(.multiselect-filter-hidden):not(.multiselect-collapisble-hidden)", this.$ul).filter(':visible');

  //             if(justVisible) {
  //                 $('input[type="checkbox"]:enabled' , visibleLis).prop('checked', false);
  //                 visibleLis.removeClass(this.options.selectedClass);

  //                 $('input[type="checkbox"]:enabled' , visibleLis).each($.proxy(function(index, element) {
  //                     var value = $(element).val();
  //                     var option = this.getOptionByValue(value);
  //                     $(option).prop('selected', false);
  //                 }, this));
  //             }
  //             else {
  //                 $('input[type="checkbox"]:enabled' , allLis).prop('checked', false);
  //                 allLis.removeClass(this.options.selectedClass);

  //                 $('input[type="checkbox"]:enabled' , allLis).each($.proxy(function(index, element) {
  //                     var value = $(element).val();
  //                     var option = this.getOptionByValue(value);
  //                     $(option).prop('selected', false);
  //                 }, this));
  //             }

  //             $('li input[value="' + this.options.selectAllValue + '"]', this.$ul).prop('checked', false);

  //             if (this.options.enableClickableOptGroups && this.options.multiple) {
  //                 this.updateOptGroups();
  //             }

  //             if (triggerOnDeselectAll) {
  //                 this.options.onDeselectAll();
  //             }
  //         },

  //         /**
  //          * Rebuild the plugin.
  //          *
  //          * Rebuilds the dropdown, the filter and the select all option.
  //          */
  //         rebuild: function() {
  //             this.$ul.html('');

  //             // Important to distinguish between radios and checkboxes.
  //             this.options.multiple = this.$select.attr('multiple') === "multiple";

  //             this.buildSelectAll();
  //             this.buildDropdownOptions();
  //             this.buildFilter();

  //             this.updateButtonText();
  //             this.updateSelectAll(true);

  //             if (this.options.enableClickableOptGroups && this.options.multiple) {
  //                 this.updateOptGroups();
  //             }

  //             if (this.options.disableIfEmpty && $('option', this.$select).length <= 0) {
  //                 this.disable();
  //             }
  //             else {
  //                 this.enable();
  //             }

  //             if (this.options.dropRight) {
  //                 this.$ul.addClass('pull-right');
  //             }
  //         },

  //         /**
  //          * The provided data will be used to build the dropdown.
  //          */
  //         dataprovider: function(dataprovider) {

  //             var groupCounter = 0;
  //             var $select = this.$select.empty();

  //             $.each(dataprovider, function (index, option) {
  //                 var $tag;

  //                 if ($.isArray(option.children)) { // create optiongroup tag
  //                     groupCounter++;

  //                     $tag = $('<optgroup/>').attr({
  //                         label: option.label || 'Group ' + groupCounter,
  //                         disabled: !!option.disabled
  //                     });

  //                     forEach(option.children, function(subOption) { // add children option tags
  //                         var attributes = {
  //                             value: subOption.value,
  //                             label: subOption.label || subOption.value,
  //                             title: subOption.title,
  //                             selected: !!subOption.selected,
  //                             disabled: !!subOption.disabled
  //                         };

  //                         //Loop through attributes object and add key-value for each attribute
  //                        for (var key in subOption.attributes) {
  //                             attributes['data-' + key] = subOption.attributes[key];
  //                        }
  //                          //Append original attributes + new data attributes to option
  //                         $tag.append($('<option/>').attr(attributes));
  //                     });
  //                 }
  //                 else {

  //                     var attributes = {
  //                         'value': option.value,
  //                         'label': option.label || option.value,
  //                         'title': option.title,
  //                         'class': option.class,
  //                         'selected': !!option.selected,
  //                         'disabled': !!option.disabled
  //                     };
  //                     //Loop through attributes object and add key-value for each attribute
  //                     for (var key in option.attributes) {
  //                       attributes['data-' + key] = option.attributes[key];
  //                     }
  //                     //Append original attributes + new data attributes to option
  //                     $tag = $('<option/>').attr(attributes);

  //                     $tag.text(option.label || option.value);
  //                 }

  //                 $select.append($tag);
  //             });

  //             this.rebuild();
  //         },

  //         /**
  //          * Enable the multiselect.
  //          */
  //         enable: function() {
  //             this.$select.prop('disabled', false);
  //             this.$button.prop('disabled', false)
  //                 .removeClass('disabled');
  //         },

  //         /**
  //          * Disable the multiselect.
  //          */
  //         disable: function() {
  //             this.$select.prop('disabled', true);
  //             this.$button.prop('disabled', true)
  //                 .addClass('disabled');
  //         },

  //         /**
  //          * Set the options.
  //          *
  //          * @param {Array} options
  //          */
  //         setOptions: function(options) {
  //             this.options = this.mergeOptions(options);
  //         },

  //         /**
  //          * Merges the given options with the default options.
  //          *
  //          * @param {Array} options
  //          * @returns {Array}
  //          */
  //         mergeOptions: function(options) {
  //             return $.extend(true, {}, this.defaults, this.options, options);
  //         },

  //         /**
  //          * Checks whether a select all checkbox is present.
  //          *
  //          * @returns {Boolean}
  //          */
  //         hasSelectAll: function() {
  //             return $('li.multiselect-all', this.$ul).length > 0;
  //         },

  //         /**
  //          * Update opt groups.
  //          */
  //         updateOptGroups: function() {
  //             var $groups = $('li.multiselect-group', this.$ul)
  //             var selectedClass = this.options.selectedClass;

  //             $groups.each(function() {
  //                 var $options = $(this).nextUntil('li.multiselect-group')
  //                     .not('.multiselect-filter-hidden')
  //                     .not('.disabled');

  //                 var checked = true;
  //                 $options.each(function() {
  //                     var $input = $('input', this);

  //                     if (!$input.prop('checked')) {
  //                         checked = false;
  //                     }
  //                 });

  //                 if (selectedClass) {
  //                     if (checked) {
  //                         $(this).addClass(selectedClass);
  //                     }
  //                     else {
  //                         $(this).removeClass(selectedClass);
  //                     }
  //                 }

  //                 $('input', this).prop('checked', checked);
  //             });
  //         },

  //         /**
  //          * Updates the select all checkbox based on the currently displayed and selected checkboxes.
  //          */
  //         updateSelectAll: function(notTriggerOnSelectAll) {
  //             if (this.hasSelectAll()) {
  //                 var allBoxes = $("li:not(.multiselect-item):not(.multiselect-filter-hidden):not(.multiselect-group):not(.disabled) input:enabled", this.$ul);
  //                 var allBoxesLength = allBoxes.length;
  //                 var checkedBoxesLength = allBoxes.filter(":checked").length;
  //                 var selectAllLi  = $("li.multiselect-all", this.$ul);
  //                 var selectAllInput = selectAllLi.find("input");

  //                 if (checkedBoxesLength > 0 && checkedBoxesLength === allBoxesLength) {
  //                     selectAllInput.prop("checked", true);
  //                     selectAllLi.addClass(this.options.selectedClass);
  //                 }
  //                 else {
  //                     selectAllInput.prop("checked", false);
  //                     selectAllLi.removeClass(this.options.selectedClass);
  //                 }
  //             }
  //         },

  //         /**
  //          * Update the button text and its title based on the currently selected options.
  //          */
  //         updateButtonText: function() {
  //             var options = this.getSelected();

  //             // First update the displayed button text.
  //             if (this.options.enableHTML) {
  //                 $('.multiselect .multiselect-selected-text', this.$container).html(this.options.buttonText(options, this.$select));
  //             }
  //             else {
  //                 $('.multiselect .multiselect-selected-text', this.$container).text(this.options.buttonText(options, this.$select));
  //             }

  //             // Now update the title attribute of the button.
  //             $('.multiselect', this.$container).attr('title', this.options.buttonTitle(options, this.$select));
  //         },

  //         /**
  //          * Get all selected options.
  //          *
  //          * @returns {jQUery}
  //          */
  //         getSelected: function() {
  //             return $('option', this.$select).filter(":selected");
  //         },

  //         /**
  //          * Gets a select option by its value.
  //          *
  //          * @param {String} value
  //          * @returns {jQuery}
  //          */
  //         getOptionByValue: function (value) {

  //             var options = $('option', this.$select);
  //             var valueToCompare = value.toString();

  //             for (var i = 0; i < options.length; i = i + 1) {
  //                 var option = options[i];
  //                 if (option.value === valueToCompare) {
  //                     return $(option);
  //                 }
  //             }
  //         },

  //         /**
  //          * Get the input (radio/checkbox) by its value.
  //          *
  //          * @param {String} value
  //          * @returns {jQuery}
  //          */
  //         getInputByValue: function (value) {

  //             var checkboxes = $('li input:not(.multiselect-search)', this.$ul);
  //             var valueToCompare = value.toString();

  //             for (var i = 0; i < checkboxes.length; i = i + 1) {
  //                 var checkbox = checkboxes[i];
  //                 if (checkbox.value === valueToCompare) {
  //                     return $(checkbox);
  //                 }
  //             }
  //         },

  //         /**
  //          * Used for knockout integration.
  //          */
  //         updateOriginalOptions: function() {
  //             this.originalOptions = this.$select.clone()[0].options;
  //         },

  //         asyncFunction: function(callback, timeout, self) {
  //             var args = Array.prototype.slice.call(arguments, 3);
  //             return setTimeout(function() {
  //                 callback.apply(self || window, args);
  //             }, timeout);
  //         },

  //         setAllSelectedText: function(allSelectedText) {
  //             this.options.allSelectedText = allSelectedText;
  //             this.updateButtonText();
  //         }
  //     };

  //     $.fn.multiselect = function(option, parameter, extraOptions) {
  //         return this.each(function() {
  //             var data = $(this).data('multiselect');
  //             var options = typeof option === 'object' && option;

  //             // Initialize the multiselect.
  //             if (!data) {
  //                 data = new Multiselect(this, options);
  //                 $(this).data('multiselect', data);
  //             }

  //             // Call multiselect method.
  //             if (typeof option === 'string') {
  //                 data[option](parameter, extraOptions);

  //                 if (option === 'destroy') {
  //                     $(this).data('multiselect', false);
  //                 }
  //             }
  //         });
  //     };

  //     $.fn.multiselect.Constructor = Multiselect;

  //     $(function() {
  //         $("select[data-role=multiselect]").multiselect();
  //     });

  // }(window.jQuery);
