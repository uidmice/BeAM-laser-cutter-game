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

  function delete_file(){
    var delete_file_win = $("<div></div>");
    var t1= $("<p>Are you sure you want to create a new file?</p>");
    var t2= $("<p>All your current work will be lost.</p>");
    var Yes = $("<button>Yes, I want a new file</button>");
    var No = $("<button>No</button>");
    Yes.click(function(){
      project.clear();
      close_pop_up();
      create_new_file();
    })
    No.click(function(){
      close_pop_up();
    });
    delete_file_win.append(t1).append(t2).append(Yes).append(No);
    pop_up_window("Discard File", delete_file_win, "200px","400px");
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
    save();
  }

  function remove_emptyLayer(){
      $.each(project.layers, function (k, v){
        if(v.isEmpty()&& project.layers.length!=1)
        v.remove();
  })}

  function save(pid){
     temp_save = project.exportSVG({bounds: canvas_bounds});
     console.log(temp_save);
  }

  var downloadSVG = function(svg) {
    parseStyles(svg);

     var svgDocType = document.implementation.createDocumentType('svg', "-//W3C//DTD SVG 1.1//EN", "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd");
     var svgDoc = document.implementation.createDocument('http://www.w3.org/2000/svg', 'svg', svgDocType);
  // replace the documentElement with our clone
     svgDoc.replaceChild(svg, svgDoc.documentElement);
  // get the data
     var svgData = (new XMLSerializer()).serializeToString(svgDoc);




     var a = document.createElement('a');
      a.href = 'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(svgData.replace(/></g, '>\n\r<'));
      a.download = 'myAwesomeSVG.svg';
      a.style.visibility = "hidden";
      document.body.appendChild(a);
      a.click();


};

var parseStyles = function(svg) {
  var styleSheets = [];
  var i;
  var docStyles = svg.ownerDocument.styleSheets;

  for (i = 0; i < docStyles.length; i++) {
    styleSheets.push(docStyles[i]);
  }

  if (!styleSheets.length) {
    return;
  }

  var defs = svg.querySelector('defs') || document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  if (!defs.parentNode) {
    svg.insertBefore(defs, svg.firstElementChild);
  }
  svg.matches = svg.matches || svg.webkitMatchesSelector || svg.mozMatchesSelector || svg.msMatchesSelector || svg.oMatchesSelector;

  for (i = 0; i < styleSheets.length; i++) {
    var currentStyle = styleSheets[i]

    var rules;
    try {
      rules = currentStyle.cssRules;
    } catch (e) {
      continue;
    }
    // create a new style element
    var style = document.createElement('style');
    // some stylesheets can't be accessed and will throw a security error
    var l = rules && rules.length;
    // iterate through each cssRules of this stylesheet
    for (var j = 0; j < l; j++) {
      // get the selector of this cssRules
      var selector = rules[j].selectorText;
      // probably an external stylesheet we can't access
      if (!selector) {
        continue;
      }

      if ((svg.matches && svg.matches(selector)) || svg.querySelector(selector)) {

        var cssText = rules[j].cssText;
        // append it to our <style> node
        style.innerHTML += cssText + '\n';
      }
    }
    // if we got some rules
    if (style.innerHTML) {
      // append the style node to the clone's defs
      defs.appendChild(style);
    }
  }

};
