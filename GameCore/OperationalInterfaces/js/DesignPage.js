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
      downloadSVG(temp_save);
    })

    $("#next").click(function(){
      save("730015648");
      $("#DesignPage").css("display","none");
      $("#PsPosition").css("display","block");
      $("#PsTab").click(function(){
        $("#PositionPage").css("z-index","1");
        $('#PositionTab').removeClass('w3-red');
        $('#PsTab').addClass('w3-red');

      })
      $("#PositionTab").click(function(){
        $("#PositionPage").css("z-index","4");
        $('#PositionTab').addClass('w3-red');
        $('#PsTab').removeClass('w3-red');
      })



      setHeight($("#PsPosition .title"),PsTitle);
      setHeight($("#PsPosition .container"),screen_h-PsTitle-$("#PsPosition .title").offset().top);

      setWidth($("#PositionCanvasContainer"), 0.8*screen_w);
      setWidth($("#PositionControl"), 0.2*screen_w);

      $("#PositionCanvasContainer").append($("<canvas id='canvas2' height='"+(board_height/2.5+40)+"px' width='"+(board_width/2.5+40)+"px'></canvas>"));
      paper.setup('canvas2');
      initPositionPage();


    })

    $("#new_file").click(function(){
      delete_file();
    })

    var fillColor_button =  $("#fill_color");
    var strokeColor_button = $("#stroke_color");
    var fillColor_dropdown = create_color_dropdown(fillColor_button,0);
    var strokeColor_dropdown = create_color_dropdown(strokeColor_button,1);

    $("#DesignPage").append(fillColor_dropdown).append(strokeColor_dropdown);

    stroke_width = $("#stroke_width").val()*PPI*10;
    brush_width = $("#brush_width").val()*PPI;

    $("#stroke_width").change(function(){
      if($(this).val()!=0){
        stroke_width = $(this).val()*PPI*10;
        $.each(project.selectedItems, function(k, v){
          v.strokeWidth=stroke_width;
        })}
    })

    $("#brush_width").change(function(){
      if($(this).val()!=0){
        brush_width = $(this).val()*PPI;}
    })


//Activate Undo
    var undo_button = $('#undo');

    undo_button.click(function(){
        undo();
    })

    create_new_file();

});
