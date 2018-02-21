paper.install(window);

    var COLOR = {
      'red' : '#FF0000',
      'blue' : '#0000FF',
      'black' : '#000000',
      'green' : '#008000',
      'white' : '#FFFFFF',
      'yellow' : '#FFFF00'
    }

    var screen_h=0;
    var screen_w = 0;
    var toolbar_w = 80;
    var taskbar_h = 40;
    var modification_h = 40;
    var hue = "#343430";

    canvas = null;

    var canvas_height=0;
    var canvas_width=0;
    var canvas_position = {x:40, y:40};

    var PPI = 1;
    var line_color = COLOR.black;
    var line_width = 3;
    var fill_color = COLOR.red;
    var brush_width = 10;
    var eraser_width = 10;
    var operations = [];

$(document).ready(function(){


      function update_windowSize(){
      // This will execute whenever the window is resized
        screen_h=$(window).height(); // New height
        screen_w=$(window).width();
      }


          update_windowSize();
          $(window).resize(function(){update_windowSize();});
          $("#taskbar").css("height", taskbar_h+"px").css("width",screen_w+"px" );
          $("#modification").css("height", modification_h+"px").css("width",screen_w+"px" );
          $("#tool_bar").css("height", (screen_h-modification_h-taskbar_h)+"px").css("width", toolbar_w+"px");
          $(".UI").css("background-color", hue);
          $("#Canvas").css("height", (screen_h-modification_h-taskbar_h)+"px").css("width", (screen_w-toolbar_w)+"px").css("left",toolbar_w+"px").css("top",(modification_h+taskbar_h)+"px");




  })
