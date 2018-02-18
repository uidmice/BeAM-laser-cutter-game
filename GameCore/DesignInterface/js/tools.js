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
    brush.maxDistance = 25;
    brush.minDistance =10;
    brush.onMouseDown = function(e){
      temp = new Path();
	    temp.fillColor = line_color;
      temp.add(e.point);
	};
    brush.onMouseDrag = function(e){
      var step = new Point(0,0);
      step = step.add(e.delta.x/2, e.delta.y/2);
      step.angle += 90;
      step.length +=brush_width;
      console.log(step);

      var top = e.middlePoint.add(step.x, step.y);
      var bottom = e.middlePoint.add(-step.x, -step.y);

      temp.add(top);
      temp.insert(0, bottom);
      temp.smooth();
    }
    brush.onMouseUp = function (e){
      temp.add(e.point);
      temp.closed = true;
      temp.smooth();

      operations.push(temp);
    };


    undo = function(){
      var lastOperation;
      if( lastOperation= operations.pop())
      lastOperation.remove();
    }


});
