$(document).ready(function(){

    $("#move").click(function(){move.activate()});
    $("#pencil").click(function(){pencil.activate()});
    $("#brush").click(function(){brush.activate()});
    $("#line").click(function(){line.activate()});
    $("#rectangle").click(function(){rectangle.activate()});
    $("#ellipse").click(function(){ellipse.activate()});
    $("#eraser").click(function(){eraser.activate()});
    $("#undo").click(function(){undo()});
    $("#delete").click(function(){del()});
    $("#text").click(function(){text.activate()});




    var bg = new Path.Rectangle({
    point: [0, 0],
    size: [view.size.width, view.size.height],
    strokeColor: '#464646',
    selected: false
    });
    bg.sendToBack();
    bg.fillColor = '#464646';

    create_new_file();

});
