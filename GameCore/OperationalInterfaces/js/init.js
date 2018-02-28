$(document).ready(function(){

    $("#move").click(function(){
      multipolygon.deactivate();
      move.activate();
      $(".selected").removeClass("selected");
      $("#move").addClass("selected");
    });
    $("#pencil").click(function(){
      project.deselectAll();
      multipolygon.deactivate();
      pencil.activate();
      $(".selected").removeClass("selected");
      $("#pencil").addClass("selected");
    });
    $("#brush").click(function(){
      project.deselectAll();
      multipolygon.deactivate();
      brush.activate();
      $(".selected").removeClass("selected");
      $("#brush").addClass("selected");
    });
    $("#line").click(function(){
      project.deselectAll();
      multipolygon.deactivate();
      line.activate();
      $(".selected").removeClass("selected");
      $("#line").addClass("selected");
    });
    $("#rectangle").click(function(){
      project.deselectAll();
      multipolygon.deactivate();
      rectangle.activate();
      $(".selected").removeClass("selected");
      $("#rectangle").addClass("selected");
    });
    $("#ellipse").click(function(){
      project.deselectAll();
      multipolygon.deactivate();
      ellipse.activate();
      $(".selected").removeClass("selected");
      $("#ellipse").addClass("selected");
    });
    $("#multipolygon").click(function(){
      project.deselectAll();
      multipolygon.deactivate();
      multipolygon.activate();
      $(".selected").removeClass("selected");
      $("#multipolygon").addClass("selected");
    });
    $("#eraser").click(function(){
      project.deselectAll();
      multipolygon.deactivate();
      eraser.activate();
      $(".selected").removeClass("selected");
      $("#eraser").addClass("selected");
    });
    $("#delete").click(function(){
      multipolygon.deactivate();
      del();
      $(".selected").removeClass("selected");
      $("#move").addClass("selected");
    });
    $("#text").click(function(){
      multipolygon.deactivate();
      project.deselectAll();
      text.activate();
      $(".selected").removeClass("selected");
      $("#text").addClass("selected");
    });

    $("#save").click(function(){
      save("730015648");
    })

    $("#next").click(function(){
      save("730015648");
      downloadSVG(temp_save);
      window.location.href="SpInterface.html";
    })

    $("#new_file").click(function(){
      delete_file();
    })

    var fillColor_button =  $("#fill_color");
    var strokeColor_button = $("#stroke_color");
    var fillColor_dropdown = create_color_dropdown(fillColor_button,0);
    var strokeColor_dropdown = create_color_dropdown(strokeColor_button,1);

    $("body").append(fillColor_dropdown).append(strokeColor_dropdown);


//Activate Undo
    var undo_button = $('#undo');

    undo_button.click(function(){
        undo();
    })



    create_new_file();

});
