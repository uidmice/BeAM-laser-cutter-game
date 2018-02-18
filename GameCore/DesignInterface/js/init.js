$(document).ready(function(){

    var tool_bar = $("#tool_bar");

    var pencil_tool=$('<button onclick="pencil.activate()">pencil</button>');
    var line_tool = $('<button onclick="line.activate()">line</button>');
    var rectangle_tool = $('<button onclick="rectangle.activate()">rectangle</button>');
    var circle_tool = $('<button onclick="circle.activate()">circle</button>');
    var brush_tool = $('<button onclick="brush.activate()">brush</button>');
    var eraser_tool = $('<button onclick="eraser.activate()">eraser</button>');
    var select_tool = $('<button onclick="select.activate()">select</button>');
    var undo_tool = $('<button onclick="undo()">undo</button>');
    var del_tool = $('<button onclick="del()">delete</button>');




    tool_bar.append(pencil_tool).append(line_tool).append(rectangle_tool).append(circle_tool).append(brush_tool).append(eraser_tool).append(select_tool).append(undo_tool).append(del_tool);






});
