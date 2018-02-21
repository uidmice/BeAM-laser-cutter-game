$(document).ready(function(){
    paper.setup('Canvas');

    pencil = new Tool();
    line = new Tool();
    rectangle = new Tool();
    ellipse = new Tool();
    brush = new Tool();
    eraser = new Tool();
    select = new Tool();
    move = new Tool();
    text = new Tool();



    var temp;
    var moving, p1, p2;
    var move_tool_flag = false;
    function onMouseDown(event) {
			temp = new Path();
      moving = new Path();
			temp.strokeColor = line_color;
      temp.strokeWidth = line_width;
			temp.add(event.point);
      moving.add(event.point);
      moving.add(event.point)
		}

    function onMouseUp(e){
      console.log("Mouse Up");
    }

    function select_by_click(e){
      var hit = project.hitTest(e.point, {
        tolerance: 4,
        fill: true,
        stoke: true,
        segments: true,
        curves: true
      });
      if(!e.modifiers.shift){
        project.deselectAll();
        if (hit)
        hit.item.selected = true;
      }else{
        if (hit)
        hit.item.selected = true;
      }
    }

    //////////////////////////////////////
    //         pencil
    //////////////////////////////////////
    pencil.onMouseDown = onMouseDown;
    pencil.onMouseDrag = function(e){
      temp.add(e.point);
      console.log("pencil drag");
    }
    pencil.onMouseUp = function (e){
      temp.add(e.point);
      moving.remove();
      operations.push(temp);
      console.log("pencil up");
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
      if(e.modifiers.shift){
        var width = p2.x-p1.x;
        var height = p2.y-p1.y;

        if(Math.abs(width)<Math.abs(height)){
          height = height * Math.abs(width)/Math.abs(height);
        }else{
          width = width *Math.abs(height)/Math.abs(width);
        }

        p2 = new Point(p1.x+width, p1.y+height);
      }


      if(moving){
        moving.remove();
      }
      moving = new Shape.Rectangle(p1, p2);
      moving.strokeColor = line_color;
      moving.strokeWidth = line_width;
      moving.fillColor = fill_color;

    }
    rectangle.onMouseUp=function (e){
      var layer = new Layer();
      layer.activate();
      var rect = new Shape.Rectangle(p1, p2);
      rect.strokeColor = line_color;
      rect.strokeWidth = line_width;
      rect.fillColor = fill_color;

      operations.push(rect);
      moving.remove();
    }


    //////////////////////////////////////
    //         ellipse
    //////////////////////////////////////
    ellipse.onMouseDown = function(e){
      p1 = e.point;
    }
    ellipse.onMouseDrag = function (e){
      p2=e.point;
      var width = p2.x-p1.x;
      var height = p2.y-p1.y;
      if(e.modifiers.shift){
        if(Math.abs(width)<Math.abs(height)){
          height = width;
        }else{
          width = height;
        }
      }

      var rect = new Rectangle(new Point(p1.x+width, p1.y+height), new Point(p1.x-width, p1.y-height));


      if(moving){
        moving.remove();
      }

      moving = new Shape.Ellipse(rect);
      moving.strokeColor = line_color;
      moving.strokeWidth = line_width;
      moving.fillColor = fill_color;

    }
    ellipse.onMouseUp = function(e){
      var layer = new Layer();
      layer.activate();
      var ellipse = moving.clone();

      operations.push(ellipse);
      moving.remove();
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
      select_by_click(e);
    }

    //////////////////////////////////////
    //         move
    //////////////////////////////////////
    move.minDistance = 5;
    move.onMouseDown = function (e){
        select_by_click(e);
        var hit = project.hitTest(e.point, {
          tolerance: 4,
          fill: true,
          stoke: true,
          segments: true,
          curves: true
        });
        if(hit)
          move_tool_flag = true;
    }
    move.onMouseDrag = function (e){
      if(move_tool_flag){
        $.each(project.selectedItems, function(k, v){
          v.position.x = v.position.x + e.delta.x;
          v.position.y = v.position.y + e.delta.y;
        })

      }
    }
    move.onMouseUp = function (e){
      if(move_tool_flag){
        move_tool_flag=false;
      }
    }

    //////////////////////////////////////
    //         text
    //////////////////////////////////////
    hasInput = false;
    text.onMouseDown = function(e){
        if(hasInput) return;
        addInput(e.point.x, e.point.y);



        function addInput(x,y){
            var input = document.createElement('input');
            input.type = 'text';
            input.style.position = 'fixed';
            input.style.left = (x+80) + 'px' ;
            input.style.top = (y+80) + 'px';

            input.onkeydown = Enter;

            document.body.appendChild(input);
            input.focus();
            hasInput = true;

        }


        function Enter(a){
            var keyCode = a.keyCode;
            if (keyCode === 13) {
                var content = this.value.toString();
                var text = new PointText(e.point);
                text.justification = 'center';
                text.fillColor = line_color;
                text.content = content;
                document.body.removeChild(this);
                hasInput = false;

            }
        }

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
      if (selected = project.selectedItems){
        var l = selected.length;
        for (var i = l-1; i>=0; i--){
          selected[i].remove();
        }
      }

    }

});
