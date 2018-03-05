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

  function setHeight(element, height){
    $(element).css("height", height+"px");
  }

  function setWidth(element, w){
    $(element).css("width", w+"px");
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
    create_new_file_win.html('<label for="height">Height:</label><input id="height" type="number" name="height" step="0.5" min="1" max="'+actual_size_h+'" value="5" required><span class="validity"></span><select style="margin-left: 40px"><option>Inches</option><option>Points</option></select><br/><label for="width">Width:</label><input id="width" type="number" name="width" step="0.5" min="1" max="'+actual_size_w+'" value="5" required><span class="validity"><br/></span><label for="mode">Color Mode:</label><select name="mode"><option>CYMK</option><option>RGB</option></select><br>');
    var txtCSS = {
      "margin-left": "40px",
      "width": "90px",
      "display":"inline-block",
      "font-size":"15px"
    };

    var inputCSS = {
      "margin-top":"10px",
      "width": "80px",
      "margin-bottom": "20px"
    };
    var butmCSS = {
        "align": "right",
        "margin-top": "20px"

    }
    create_new_file_win.css("text-align","left");
    create_new_file_win.find("label").css(txtCSS);
    create_new_file_win.find("input").css(inputCSS);
    var sbmt = $("<button class='w3-button w3-white w3-border w3-round-large'>Create</button>");
    sbmt.css('position',"absolute").css("right","20px");

    create_new_file_win.find("select").change(function(){
      var h = create_new_file_win.find("input").val();
      var w = create_new_file_win.find("input:nth-of-type(2)").val();
      $(this).find(":selected").each(function () {
            if($(this).val()=='Inches' ){
              create_new_file_win.find("input").val(h/72).attr('max',actual_size_h);
              create_new_file_win.find("input:nth-of-type(2)").val(w/72).attr('max',actual_size_w);
            };

            if($(this).val()=='Points' ){
              create_new_file_win.find("input").val(h*72).attr('max',actual_size_h*72);
              create_new_file_win.find("input:nth-of-type(2)").val(w*72).attr('max',actual_size_w*72);;
            };
    });

    })
    sbmt.click(function(){
      var h = create_new_file_win.find("input").val();
      var w = create_new_file_win.find("input:nth-of-type(2)").val();
      if (create_new_file_win.find("select:nth-of-type(1)").find(":selected").val()=="Points"){
          h/=72;
          w/=72;

      }
      canvas_height = h;
      canvas_width = w;
      close_pop_up();
      new_canvas();
    });

    create_new_file_win.append(sbmt);


    pop_up_window("New File", create_new_file_win,"250px","400px");
  }

  function new_canvas(){
    var p = new Point(0,0);
    var s = new Size(canvas_width*PPI, canvas_height*PPI);
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



  function Confirm(title, msg, $true, $false, target) { /*change*/
        var $content =  "<div class='dialog-ovelay'>" +
            "<div class='dialog'><header>" +
            " <h3> " + title + " </h3> " +
            "<i class='fa fa-close'></i>" +
            "</header>" +
            "<div class='dialog-msg'>" +
            " <p> " + msg + " </p> " +
            "</div>" +
            "<footer>" +
            "<div class='controls'>" +
            " <button class='button button-danger doAction'>" + $true + "</button> " +
            " <button class='button button-default cancelAction'>" + $false + "</button> " +
            "</div>" +
            "</footer>" +
            "</div>" +
            "</div>";
        $('body').prepend($content);
        if(target==1){
          $('.doAction').click(function () {
              $("#PositionPage").css("display","none");
              $("#PsPage").css("display","block");
              $(this).parents('.dialog-ovelay').fadeOut(500, function () {
                  $(this).remove();
              });
          });
        }else if (target==2){
          $('.doAction').click(function () {
              $("#PositionPage").css("display","block");
              $("#PsPage").css("display","none");
              $(this).parents('.dialog-ovelay').fadeOut(500, function () {
                  $(this).remove();
              });
          });
        }else{
          $('.doAction').remove();
        }

        $('.cancelAction, .fa-close').click(function () {
            $(this).parents('.dialog-ovelay').fadeOut(500, function () {
                $(this).remove();
            });
        });

    }

  function save(pid){
     temp_save = project.exportSVG({bounds: canvas_bounds});
     console.log(temp_save);
  }

  var downloadSVG = function(svg) {
    parseStyles(svg);

     var svgDocType = document.implementation.createDocumentType('svg', "-//W3C//DTD SVG 1.1//EN", "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd");
     var svgDoc = document.implementation.createDocument('http://www.w3.org/2000/svg', 'svg', svgDocType);
     svgDoc.replaceChild(svg, svgDoc.documentElement);
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

function change_color(button, color,flag){
  button.removeClass("red").removeClass("black").removeClass("transparent").removeClass("blue");
  button.addClass(color.attr("name"));
  if(flag){
    stroke_color = color.attr("color");
    $.each(project.selectedItems, function(k, v){
      if(stroke_color!="false"){
        v.strokeColor = stroke_color;
      }else{
        v.strokeColor = new Color(0,0,0,0.001);
      }
    })
  }else{
    fill_color = color.attr("color");
    $.each(project.selectedItems, function(k, v){
      if(fill_color!="false"){
        v.fillColor = fill_color;
      }else{
        v.fillColor = new Color(0,0,0,0.001);
      }
    })
  }



}

function create_color_dropdown(button, flag){
  var black = $("<div style='background-color:black'></div>");
  var blue =  $("<div style='background-color:blue'></div>");
  var red =  $("<div style='background-color:red'></div>");
  var tran =  $("<div ></div>");
  tran.css("background","url('images/Transparency500.png') no-repeat center center");
  var colCSS = {
    "height": "20px",
    "width": "20px",
    "margin":"5px",
    "border":"1px solid rgba(255,255,255,0.7)"
  };

  black.css(colCSS).attr("color", COLOR.black).attr("name","black");
  red.css(colCSS).attr("color", COLOR.red).attr("name","red");
  blue.css(colCSS).attr("color", COLOR.blue).attr("name","blue");
  tran.css(colCSS).attr("color", COLOR.transparent).attr("name","transparent");

  var dropdown = $('<div class="dropdown"></div>');
  dropdown.append(red).append(blue).append(black).append(tran);
  red.click(function(){
    change_color(button, red,flag);
    dropdown.removeClass("show");
  })

  blue.click(function(){
    change_color(button, blue,flag);
    dropdown.removeClass("show");
  })

  black.click(function(){
    change_color(button, black,flag);
    dropdown.removeClass("show");
  })

  tran.click(function(){
    change_color(button, tran,flag);
    dropdown.removeClass("show");
  })

  if(flag){
    dropdown.css("top",button.offset().top+button.height()+12+"px").css("left",button.offset().left-2+"px");
  }else{
    dropdown.css("top", button.offset().top+button.height()+3+"px").css("left",button.offset().left-2+"px");

  }
  button.click(function(){
    dropdown.toggleClass("show");
  })


  return dropdown;
}
