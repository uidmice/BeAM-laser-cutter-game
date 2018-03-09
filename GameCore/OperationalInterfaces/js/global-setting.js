paper.install(window);

    var COLOR = {
      'red' : '#FF0000',
      'blue' : '#0000FF',
      'black' : '#000000',
      'orange': '#FFA500',
      'green' : '#008000',
      'cyan':'#00FFFF',
      'magenta': '#FF00FF',
      'yellow' : '#FFFF00',
      "transparent": false
    };

    var actual_size_w = 36;
    var actual_size_h = 24;

    var screen_h=750;
    var screen_w = 1300;
    var toolbar_w = 80;
    var taskbar_h = 40;
    var modification_h = 40;
    var PsTitle = 40;
    var hue = "#343430";

    c = null;       //white rectangle shape
    canvas = null;  //group of everything on canvas

    var canvas_height=0;
    var canvas_width=0;
    var canvas_bounds = null;  //Rectangle of the region of Canvas

    var PPI = 100;
    var stroke_color = COLOR.red;
    var stroke_width = 2;
    var fill_color = COLOR.transparent;
    var brush_width = 10;
    var temp_save = null;
    var operations = [];


    var cutting_coef = 0.033;



//positionPage
    var board_width = actual_size_w*PPI;
    var board_height = actual_size_h*PPI;
    var stage =  null;



$(document).ready(function(){
          setWidth($('#InterfaceContainer'), screen_w);
          setHeight($('#InterfaceContainer'), screen_h);


          setWidth($("#taskbar"),screen_w);
          setHeight($("#taskbar"),taskbar_h);
          setWidth($("#modification"),screen_w);
          setHeight($("#modification"),modification_h);
          setHeight($("#tool_bar"),screen_h-modification_h-taskbar_h);
          setWidth($("#tool_bar"),toolbar_w);

          $(".UI").css("background-color", hue);
          setWidth($("#DesignCanvasContainer"),screen_w-toolbar_w);
          setHeight($("#DesignCanvasContainer"),screen_h-modification_h-taskbar_h);
          $("#DesignCanvasContainer").append($("<canvas id='canvas1' width='" + (board_width)+ "' height='" + (board_height) + "'></canvas>"));
          $("#DesignCanvasContainer").scrollTop((board_height-(screen_h-modification_h-taskbar_h))/2);
          $("#DesignCanvasContainer").scrollLeft((board_width-(screen_w-toolbar_w))/2);

  })
