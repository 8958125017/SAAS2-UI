function setBackground(jQObject, color) {
  jQObject.css("background-color", color);
}

/* This simple blink funktion adds some feedback to what
   happens when a draggable is dropped onto a droppable. */
function blink(jQueryObject) {
  // grab the original background color of the element
  var origColor = jQueryObject.css("background-color");

	var baseDelay = 50;
    for(var i = 0; i <= 4; i+=2) {
      // change the background color to white
      setTimeout(setBackground, baseDelay*i, jQueryObject, "#FFF");

      // set a timeout of 50ms - wait for 50ms then change the
      // background color back to the original color
      setTimeout(setBackground, baseDelay*i+50, jQueryObject, origColor);
    }
}

$(document).ready(function() {

  $("#draggable").draggable({
    revert: true
  });

  $("#droppable").droppable({
    // the activeClass option specifies the class to add to
    // the droppable when it is a possible candidate for
    // a draggable element
    activeClass: "active",

    // here we specify the function to be run when the drop event
    // is triggered.
    drop: function (event, ui) {
      blink($(this));
      $(this).html(ui.draggable.text());
    }
  });
});
