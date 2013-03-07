/**
 * jQuery EnterLeave
 * Special events: focusenter, focusleave, enter, leave
 * @license Copyright 2013 Enideo. Released under dual MIT and GPL licenses.
*/

$.event.special.focusenter = {
  setup: function(data, namespaces) {
    $(this).bind('focusin.focusenter', $.event.special.focusenter.handler);
  },

  teardown: function(namespaces) {
    $(this).unbind('focusin.focusenter', $.event.special.focusenter.handler);
  },

  handler: function(event){
    var $self = $(event.currentTarget);

    clearTimeout($self.data('focusleaveTimeout'));
    $self.removeData('focusleaveTimeout');

    if( !$self.data('focusentered') ){
      $self.data('focusentered',true);
      event.type = 'focusenter';
      ($.event.dispatch || $.event.handle).apply(this, [event]);
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

    var $self = $(event.currentTarget),
      elem = this,
      timeout = setTimeout(function(){

        event.type = 'focusleave';
        ($.event.dispatch || $.event.handle).apply(elem, [event]);
        $self.removeData('focusentered');

      },100);

    $self.data('focusleaveTimeout',timeout);

  }
};


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
      ($.event.dispatch || $.event.handle).apply(this, [event]);
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
      ($.event.dispatch || $.event.handle).apply(this, [event]);
    }

  }
};
