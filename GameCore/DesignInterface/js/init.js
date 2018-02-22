$(document).ready(function(){

    $("#move").click(function(){
      move.activate();
      $(".selected").removeClass("selected");
      $("#move").addClass("selected");
    });
    $("#pencil").click(function(){
      project.deselectAll();
      pencil.activate();
      $(".selected").removeClass("selected");
      $("#pencil").addClass("selected");
    });
    $("#brush").click(function(){
      project.deselectAll();
      brush.activate();
      $(".selected").removeClass("selected");
      $("#brush").addClass("selected");
    });
    $("#line").click(function(){
      project.deselectAll();
      line.activate();
      $(".selected").removeClass("selected");
      $("#line").addClass("selected");
    });
    $("#rectangle").click(function(){
      project.deselectAll();
      rectangle.activate();
      $(".selected").removeClass("selected");
      $("#rectangle").addClass("selected");
    });
    $("#ellipse").click(function(){
      project.deselectAll();
      ellipse.activate();
      $(".selected").removeClass("selected");
      $("#ellipse").addClass("selected");
    });
    $("#eraser").click(function(){
      project.deselectAll();
      eraser.activate();
      $(".selected").removeClass("selected");
      $("#eraser").addClass("selected");
    });
    $("#delete").click(function(){
      del();
      $(".selected").removeClass("selected");
      $("#move").addClass("selected");
    });
    $("#text").click(function(){
      project.deselectAll();
      text.activate();
      $(".selected").removeClass("selected");
      $("#text").addClass("selected");
    });




    create_new_file();

});
