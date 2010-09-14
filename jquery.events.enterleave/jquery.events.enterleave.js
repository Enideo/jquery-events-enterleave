/**
 * jQuery EnterLeave
 * Special events: enter, leave
 * @license Copyright 2010 Enideo. Released under dual MIT and GPL licenses.
*/


(function($) {

  $.event.special.enter = {
    setup: function(data, namespaces) {
      $(this).bind('mouseenter.enter focusenter.enter', $.event.special.enter.handler);
    },

    teardown: function(namespaces) {
      $(this).unbind('mouseenter.enter focusenter.enter', $.event.special.enter.handler);
    },

    handler: function(event){

      var self = $(event.currentTarget),
       originalEventType = event.type;

      if( !self.data("hasmouseenter") && !self.data("hasfocusenter") ){
        event.type = 'enter';
        event.originalEventType = originalEventType;
        $.event.handle.apply(this, arguments);
      }

      if( originalEventType=='mouseenter' ){
        self.data("hasmouseenter",true);
      }else{
        self.data("hasfocusenter",true);
      }

    }
  };

  $.event.special.leave = {
    setup: function(data, namespaces) {

      $(this).bind('mouseleave.leave focusleave.leave', $.event.special.leave.handler);
    },

    teardown: function(namespaces) {
      $(this).unbind('mouseleave.leave focusleave.leave', $.event.special.leave.handler);
    },

    handler: function(event){

      var self = $(event.currentTarget);

      if( event.type=='mouseleave' ){
        self.data("hasmouseenter",false);
      }else{
        self.data("hasfocusenter",false);
      }

      if( !self.data("hasmouseenter") && !self.data("hasfocusenter") ){
        event.originalEventType = event.type;
        event.type = 'leave';
        $.event.handle.apply(this, arguments);
      }

    }
  };

})(jQuery);