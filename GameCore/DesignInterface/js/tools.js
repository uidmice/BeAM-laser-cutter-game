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
    var moving, p1, p2;
    function onMouseDown(event) {
			temp = new Path();
      moving = new Path();
			temp.strokeColor = line_color;
      temp.strokeWidth = line_width;
			temp.add(event.point);
      moving.add(event.point);
      moving.add(event.point)
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
      moving.remove();
      operations.push(temp);
    };


    //////////////////////////////////////
    //         line
    //////////////////////////////////////

    line.onMouseDown=onMouseDown;
    line.onMouseDrag=function(e){
      moving.removeSegments(1);
      moving.strokeColor = line_color;
      moving.strokeWidth = line_width;
      moving.add(e.point);
    }
    line.onMouseUp = function(e){
      temp.add(e.point);
      operations.push(temp);
      moving.remove();
    }


    //////////////////////////////////////
    //         rectangle
    //////////////////////////////////////
    rectangle.onMouseDown = function(e){
      p1 = e.point;

    }
    rectangle.onMouseDrag = function (e){
      p2=e.point;
      if(moving){
        moving.remove();
      }
      moving = new Shape.Rectangle(p1, p2);
      moving.strokeColor = line_color;
      moving.strokeWidth = line_width;
      moving.fillColor = fill_color;

    }

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
      moving.remove();
    }


    //////////////////////////////////////
    //         circle
    //////////////////////////////////////
    circle.onMouseDown = function(e){
      p1 = e.point;

    }
    circle.onMouseDrag = function (e){
      p2=e.point;
      if(moving){
        moving.remove();
      }

      var d = p2.add(-p1.x, -p1.y);
      var r = d.length;
      moving = new Shape.Circle(p1, r);
      moving.strokeColor = line_color;
      moving.strokeWidth = line_width;
      moving.fillColor = fill_color;

    }

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

    //////////////////////////////////////
    //         eraser
    //////////////////////////////////////
    eraser.onMouseDown = function (e){
      var Alayer = project.activeLayer;
      Alayer.activate();
      temp = new Path();
      temp.add(e.point);
      temp.strokeWidth = eraser_width;
      temp.strokeColor = 'black';
      temp.blendMode = "destination-out";
    }
    eraser.onMouseDrag= function (e){
      temp.add(e.point);
    }

    eraser.onMouseUp = function (e){
      temp.add(e.point);
      operations.push(temp);
    }

    //////////////////////////////////////
    //         select
    //////////////////////////////////////
    select.onMouseDown = function (e){
      var hit;
      project.deselectAll();

      if (hit = project.hitTest(e.point, {
        tolerance: 4,
        fill: true,
        stoke: true,
        segments: true,
        curves: true

        }))
      hit.item.selected = true;

    }


    //////////////////////////////////////
    //         undo
    //////////////////////////////////////

    undo = function(){
      var lastOperation;
      if( lastOperation= operations.pop())
      lastOperation.remove();
    }


    //////////////////////////////////////
    //         delete
    //////////////////////////////////////
    del = function(){
      var selected;
      if (selected = project.selectedItems[0])
      selected.remove();
    }

});
