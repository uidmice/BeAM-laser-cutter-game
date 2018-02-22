  function pop_up_window(stitle, content, height, width){
    var overdiv = $("#overlay");
    overdiv.css("display", "block");
    var pop_win=$("<div></div>");
    var tit = $("<div>"+stitle+"</div>");
    pop_win.css({
      "height":height,
      "width":width,
      "position":"flex",
      "flex-direction": "column",
      "position": "absolute",
      "top": "0",
      "bottom": "0",
      "left":"0",
      "right":"0",
      "margin": "auto",
      "background": "#FFFFFF",
      "border-radius": "5px",
      "box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
      "text-align": "center"
    });
    tit.css({
      "height": "30px",
      "background":"rgba(0, 0, 0, 0.1)",
      "padding":"0",
      "margin":"0",
      "border":"0"
    });

    pop_win.append(tit).append(content);
    overdiv.append(pop_win);

  }

  function close_pop_up(){
    var overdiv = $("#overlay");
    overdiv.css("display", "none");
    overdiv.empty();
  }

  function create_new_file(){
    var create_new_file_win = $("<div></div>");
    var t1 = $("<span>Height:</span>");
    var t2 = $("<span>Width:</span>");
    var t3 = $("<span>Color Mode:</span>");
    var height_input = $("<input type='number'></input>");
    var width_input = $("<input type='number'></input><br>");
    var sel_units = $("<select><option>Inches</option><option>Points</option></select><br>");
    var sel_color_mode = $("<select><option>CYMK</option><option>RGB</option></select><br>");
    var sbmt = $("<button>create</button>");
    sbmt.click(function(){
      canvas_height = height_input.val();
      canvas_width = width_input.val();
      close_pop_up();
      new_canvas();
    });
    create_new_file_win.append(t1).append(height_input).append(sel_units).append(t2).append(width_input).append(t3).append(sel_color_mode).append(sbmt);

    pop_up_window("New File", create_new_file_win,"200px","400px");
  }

  function new_canvas(){
    var p = new Point(0,0);
    var s = new Size(600*canvas_width/canvas_height, 600);
    c = new Shape.Rectangle(p,s);
    c.fillColor = "white";
    c.position=new Point(view.size.width/2, view.size.height/2);
    c.guide = false;

    canvas_bounds = new Rectangle(c.bounds);

    var mask = new Path.Rectangle(canvas_bounds);
    canvas = new Group(mask,c);
    canvas.clipped = true;
    var layer = new Layer();
    layer.activate();
    move.activate();
  }

  function remove_emptyLayer(){
      $.each(project.layers, function (k, v){
        if(v.isEmpty()&& project.layers.length!=1)
        v.remove();
  })}
