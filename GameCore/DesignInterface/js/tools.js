$(document).ready(function(){

    paper.setup('Canvas');
    layers.push(project.activeLayer);

    pencil = new Tool();
    line = new Tool();
    rectangle = new Tool();
    circle = new Tool();
    brush = new Tool();
    eraser = new Tool();
    select = new Tool();



    var temp;
    function onMouseDown(event) {
			temp = new Path();
			temp.strokeColor = line_color;
      temp.strokeWidth = line_width;
			temp.add(event.point);
		}

    //////////////////////////////////////
    //         pencil
    //////////////////////////////////////
    pencil.onMouseDown = onMouseDown;
    pencil.onMouseDrag = function(e){
      temp.add(e.point);
    }
    pencil.onMouseUp = function (e){
      temp.add(e.point);
      operations.push(temp);
    };


    //////////////////////////////////////
    //         line
    //////////////////////////////////////

    line.onMouseDown=onMouseDown;
    line.onMouseUp = function(e){
      temp.add(e.point);
      operations.push(temp);
    }


    //////////////////////////////////////
    //         rectangle
    //////////////////////////////////////


    rectangle.onMouseUp=function (e){
      var endPoint = e.point;
      var startPoint = e.point.add(-e.delta.x,-e.delta.y);
      var rect = new Shape.Rectangle(startPoint, endPoint);
      rect.strokeColor = line_color;
      rect.strokeWidth = line_width;
      rect.fillColor = fill_color;
      var layer = new Layer({
        children: rect,
      });

      layers.push(layer);
      operations.push(rect);
    }


    //////////////////////////////////////
    //         circle
    //////////////////////////////////////

    circle.onMouseUp = function(e){
      var endPoint = e.point;
      var center = e.point.add(-e.delta.x,-e.delta.y);
      var r = e.delta.length;
      var circle = new Shape.Circle(center, r);
      circle.strokeColor = line_color;
      circle.strokeWidth = line_width;
      circle.fillColor = fill_color;
      var layer = new Layer({
        children: circle,
      });

      layers.push(layer);
      operations.push(circle);
    }



    //////////////////////////////////////
    //         brush
    //////////////////////////////////////
    brush.onMouseDown = onMouseDown;
    brush.onMouseDrag = function(e){
      temp.add(e.point);
    }
    brush.onMouseUp = function (e){
      temp.add(e.point);
      operations.push(temp);
    };


    undo = function(){
      var lastOperation;
      if( lastOperation= operations.pop())
      lastOperation.remove();
    }


});
