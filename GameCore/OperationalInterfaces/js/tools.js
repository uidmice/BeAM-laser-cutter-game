$(document).ready(function(){

    paper.setup('designCanvas');

    pencil = new Tool();
    line = new Tool();
    rectangle = new Tool();
    ellipse = new Tool();
    brush = new Tool();
    eraser = new Tool();
    move = new Tool();
    text = new Tool();
    multipolygon = new Tool();
    select = new Tool();

    var mouseX, mouseY;

    $( document ).on( "mousemove", function( event ) {
    mouseX=event.pageX ;
    mouseY=event.pageY ;
  });


    var temp;
    var moving, p1, p2;
    var move_tool_flag = false;
    function onMouseDown(event) {
        event.preventDefault();
        temp = new Path();
        moving = new Path();
  			temp.strokeColor = stroke_color;
        temp.strokeWidth = stroke_width;
  			temp.add(event.point);
        canvas.addChild(temp);
        moving.add(event.point);

		}


    function select_by_click(e){
      e.preventDefault();
      var hit = project.hitTest(e.point, {
        tolerance: 4,
        fill: true,
        bounds:true,
        stoke: true,
        segments: true,
        curves: true,
        guides: true,
        matches: function(item){
          return ((item.clipMask ==false))}
      });
      if(!e.modifiers.shift){
        project.deselectAll();
        if (hit){
          hit.item.selected = true;
          c.selected = false;
        }
      }else{
        if (hit){
          hit.item.selected = true;
          c.selected = false;
        }
      }
    }


    function onKeyDown(e){
      e.preventDefault();
      if((e.key=="delete")||(e.key=="backspace")){
        if(project.selectedItems.length>0){
          var selected = project.selectedItems;
          var l = selected.length;
          for (var i = l-1; i>=0; i--){
            selected[i].remove();
          }
        }
      }
    }

    select.onMouseDown = select_by_click;

    //////////////////////////////////////
    //         pencil
    //////////////////////////////////////
    pencil.onMouseDown = onMouseDown;
    pencil.onMouseDrag = function(e){
      e.preventDefault();
      if(temp)
      temp.add(e.point);
    }
    pencil.onMouseUp = function (e){
      e.preventDefault();
      if(temp){
        temp.add(e.point);
        temp.guide = true;
        operations.push(temp);
        moving.remove();
      }

    };

    //////////////////////////////////////
    //         line
    //////////////////////////////////////

    line.onMouseDown=onMouseDown;
    line.onMouseDrag=function(e){
      e.preventDefault();
      moving.removeSegments(1);
      moving.strokeColor = stroke_color;
      moving.strokeWidth = stroke_width;
      moving.add(e.point);
    }
    line.onMouseUp = function(e){
      e.preventDefault();
      temp.add(e.point);
      temp.guide = true;
      operations.push(temp);
      moving.remove();
    }
    //////////////////////////////////////
    //         multipolygon
    //////////////////////////////////////
    var multi_temp = null;
    var multi = false;
    multipolygon.onMouseDown = function (e){
      e.preventDefault();
      if (!multi){
        if(multi_temp){
          multi_temp.remove();
        }
        multi_temp = new Path();
        multi_temp.guide=true;
        multi_temp.strokeColor = stroke_color;
        multi_temp.strokeWidth = stroke_width;
        multi = true;
      }
      if(moving){
        moving.remove();
      }
      multi_temp.add(e.point);
      p1=e.point;

      if(e.modifiers.shift){
        this.deactivate();
      }
    }
    multipolygon.onMouseMove = function(e){
      e.preventDefault();
      if(moving){
        moving.remove();
      }
      if(multi){
        moving = new Path();
        moving.strokeColor = stroke_color;
        moving.strokeWidth = stroke_width;
        moving.add(p1);
        moving.add(e.point);

      }
    }
    multipolygon.deactivate = function(){
      if(multi){
        canvas.addChild(multi_temp.clone());
        multi_temp.remove();
        multi = false;
        if(moving){
          moving.remove();
        }
      }

    }
    //////////////////////////////////////
    //         rectangle
    //////////////////////////////////////
    rectangle.onMouseDown = function(e){
      e.preventDefault();
      p1 = e.point;
    }
    rectangle.onMouseDrag = function (e){
      e.preventDefault();
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
      moving.strokeColor = stroke_color;
      moving.strokeWidth = stroke_width;
      if(fill_color){
        moving.fillColor = fill_color;
      }
    }
    rectangle.onMouseUp=function (e){
      e.preventDefault();
      var layer = new Layer();
      layer.activate();
      var rect = new Shape.Rectangle(p1, p2);
      rect.strokeColor = stroke_color;
      rect.strokeWidth = stroke_width;
      if(fill_color){
        rect.fillColor = fill_color
      }else{
        rect.fillColor = "black";
        rect.fillColor.alpha=0.001;
      }
      rect.guide = true;
      canvas.addChild(rect);
      operations.push(rect);
      moving.remove();
    }


    //////////////////////////////////////
    //         ellipse
    //////////////////////////////////////
    ellipse.onMouseDown = function(e){
      e.preventDefault();
      p1 = e.point;
    }
    ellipse.onMouseDrag = function (e){
      e.preventDefault();
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
      moving.strokeColor = stroke_color;
      moving.strokeWidth = stroke_width;
      if(fill_color){
        moving.fillColor=fill_color;
      }else{
        moving.fillColor = new Color(0,0,0,0.001);
      }

    }
    ellipse.onMouseUp = function(e){
      e.preventDefault();
      var layer = new Layer();
      layer.activate();
      var ellipse = moving.clone();

      ellipse.guide = true;
      canvas.addChild(ellipse);
      operations.push(ellipse);
      moving.remove();
    }



    //////////////////////////////////////
    //         brush
    //////////////////////////////////////
    brush.maxDistance = 4;
    brush.minDistance =1;
    brush.onMouseDown = function(e){
      e.preventDefault();
      temp = new Path();
	    temp.fillColor = stroke_color;
      temp.guide = true;
      temp.add(e.point);
      canvas.addChild(temp);
    };
    brush.onMouseDrag = function(e){
      e.preventDefault();
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
      e.preventDefault();
      temp.add(e.point);
      temp.closed = true;
      temp.smooth();
      operations.push(temp);
    };

    //////////////////////////////////////
    //         eraser
    //////////////////////////////////////
    eraser.onMouseDown = function (e){
      e.preventDefault();
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
    //         move
    //////////////////////////////////////
    move.minDistance = 5;
    move.onMouseDown = function (e){
      e.preventDefault();
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
      e.preventDefault();
      if(move_tool_flag){
        $.each(project.selectedItems, function(k, v){
          v.position.x = v.position.x + e.delta.x;
          v.position.y = v.position.y + e.delta.y;
        })

      }
    }
    move.onMouseUp = function (e){
      e.preventDefault();
      if(move_tool_flag){
        move_tool_flag=false;
      }
    }
    move.onKeyDown = onKeyDown;

    //////////////////////////////////////
    //         text
    //////////////////////////////////////
    hasInput = false;
    var text_p;
    text.onMouseDown = function(e){
      e.preventDefault();
        if(!hasInput){
          text_p = e.point;
          var input = document.createElement('input');
          input.type = 'text';
          input.style.position = 'fixed';

          input.style.left = mouseX+"px";
          input.style.top = mouseY+"px";
          input.style.zIndex=99;
          hasInput = true;
          input.onkeydown = Enter;
          document.body.appendChild(input);
          input.focus();
        }

        function Enter(a){
            var keyCode = a.keyCode;
            if (keyCode === 13) {
                var content = this.value.toString();
                var text = new PointText(text_p);
                text.fillColor = stroke_color;
                text.content = content;
                text.bounds.topLeft = text_p;
                text.guide = true;
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
      move.activate();
    }






});
