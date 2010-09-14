/**
 * jQuery EnterLeave
 * Special events: focusenter, focusleave
 * @license Copyright 2010 Enideo. Released under dual MIT and GPL licenses.
*/


(function($) {

  $.event.special.focusenter = {
    setup: function(data, namespaces) {
      $(this).bind('focusin.focusenter', $.event.special.focusenter.handler);
    },

    teardown: function(namespaces) {
      $(this).unbind('focusin.focusenter', $.event.special.focusenter.handler);
    },

    handler: function(event){
      var self = $(event.currentTarget);

      clearTimeout(self.data('focusleaveTimeout'));
      self.removeData('focusleaveTimeout');

      if( !self.data('focusentered') ){
        self.data('focusentered',true);
        event.type = 'focusenter';
        $.event.handle.apply(this, arguments);
      }
    }
  };

  $.event.special.focusleave = {
    setup: function(data, namespaces) {
      $(this).bind('focusout.focusleave', $.event.special.focusleave.handler);
    },

    teardown: function(namespaces) {
      $(this).unbind('focusout.focusleave', $.event.special.focusleave.handler);
    },

    handler: function(event){

      var self = event.currentTarget,
        elem = this,
        args = arguments,
        timeout = setTimeout(function(){

          event.type = 'focusleave';
          $.event.handle.apply(elem, args);
          $(self).removeData('focusentered');

        },100);

      $(self).data('focusleaveTimeout',timeout);
    }
  };

})(jQuery);