
This is actually about two closely related plugins, that each add two special events to jQuery.

The first plugin is jquery.focusenterleave which adds the "focusenter" and "focusleave" events. These are to focusin and focusout what mouseenter and mouseleave are to mouseover and mouseout. That essentially means tabbed focussing does not bubble.

The second plugin (jquery.enterleave) combines these new events focus(enter|leave) with mouse(enter|leave) to form two new events, aptly named "enter" and "leave".

# Demos and docs
[http://enideo.com/#jquery-events-enter-leave](http://enideo.com/#jquery-events-enter-leave)

# Future work

## Timeout
The timeout isn't the best solution but it's the only one I can make work.
Any other ideas would be appreciated.

## Namespaces
I'm not 100% sure how to use the namespaces given by the user in jQuery's Special Event API.