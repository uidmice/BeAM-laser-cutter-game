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
  overdiv.fadeOut(500, function () {});
  overdiv.empty();
}


function create_new_file(currentProject, init_function){
  var create_new_file_win = $("<div></div>");
  create_new_file_win.html('<label for="height">Height:</label><input id="height" type="number" name="height" step="0.5" min="1" max="24" value="5" required><span class="validity"></span><select style="margin-left: 40px"><option>Inches</option><option>Points</option></select><br/><label for="width">Width:</label><input id="width" type="number" name="width" step="0.5" min="1" max="36" value="5" required><span class="validity"><br/></span><label for="mode">Color Mode:</label><select name="mode"><option>CYMK</option><option>RGB</option></select><br>');
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
    currentProject.setUpCanvas(w, h);
    close_pop_up();
    init_function();
  });

  create_new_file_win.append(sbmt);
  pop_up_window("New File", create_new_file_win,"250px","400px");

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
function parseColor(c){
  switch (c) {
    case "rgb(255,165,0)":
    return "orange";

    case "rgb(0,0,0)":
    return "black";

    case "rgb(255,0,0)":
    return "red";
    case "rgb(0,0,255)":
    return "blue";
    case "rgb(0,128,0)":
    return "green";
    case "rgb(0,255,255)":
    return "cyan";
    case "rgb(255,0,255)":
    return "magenta";
    case "rgb(255,255,0)":
    return "yellow";

  }
}

var windowObjectReference = null; // global variable

function openModel() {
  if(windowObjectReference == null || windowObjectReference.closed) {
    windowObjectReference = window.open('model.html', '_blank',
           "resizable,scrollbars,status");
  } else {
    windowObjectReference.focus();
  };
}
