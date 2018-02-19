$(document).ready(function(){

    var tool_bar = $("#tool_bar");

    var pencil_tool=$('<button onclick="pencil.activate()">pencil</button>');
    var line_tool = $('<button onclick="line.activate()">line</button>');
    var rectangle_tool = $('<button onclick="rectangle.activate()">rectangle</button>');
    var ellipse_tool = $('<button onclick="ellipse.activate()">ellipse</button>');
    var brush_tool = $('<button onclick="brush.activate()">brush</button>');
    var eraser_tool = $('<button onclick="eraser.activate()">eraser</button>');
    var select_tool = $('<button onclick="select.activate()">select</button>');
    var undo_tool = $('<button onclick="undo()">undo</button>');
    var del_tool = $('<button onclick="del()">delete</button>');
    var move_tool = $('<button onclick="move.activate()">move</button>');




    tool_bar.append(pencil_tool).append(line_tool).append(rectangle_tool).append(ellipse_tool).append(brush_tool).append(eraser_tool).append(select_tool).append(undo_tool).append(del_tool).append(move_tool);


    setInterval(function () {
      $.each(project.layers, function (k, v){
        if(v.isEmpty()&& project.layers.length!=1)
        v.remove();
      });
    },3000);






});
