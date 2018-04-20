var g_design = [];
$(document).ready(function(){
  var windowControl = (function(gameMode){
    var gameProject = new Project(gameMode);
    var designW_f = false;
    var psW_f = false;
    var positionW_f = false;
    var move_to_next_task = true;
    var new_file = false;
    var pp_f = true;  //true: psWindow, false: positionWindow
    // Yingnan Wu Editing
    var fct = 0;
    var openFlag = false;
    // Yingnan Wu Editing
    var designWindow =  {
      show : function (gameMode) {
        $("#scenceContainer").hide();
        $("#gameContainer").show();
        $("#top .DesignPage").css('display', 'flex');
        $("#main .DesignPage").show();
        $(".PsPage").hide();
        $(".PositionPage").hide();
        $("#navigationBar .w3-red").removeClass("w3-red");
        $("#DesignTab").addClass("w3-red");
        $("#select").click();

        // Yingnan Wu Editing starts
        introJs().removeHints();
        $("#dropdown").show();
        $("#psGuide").hide();
        $("#positionGuide").hide();
        // Yingnan Wu Editing ends

        if(gameMode==Mode.design){
          $("#toolBar").css("display", "flex");
          $("#font_size").parent().css("display", "inline-block");
        }else{
          $("#toolBar").hide();
          $("#font_size").parent().hide();

          if(gameMode==Mode.tutorial){
            //-----------------------------------------------------------------
            $("#TutorialTab").click(function(){
              if(!openFlag){
                $("#leftMenu").show("slide");
                openFlag=true;
              }else{
                closeLeftMenu();
              }
              //-----------------------------------------------------------------
            });

            function closeLeftMenu() {
              $("#leftMenu").hide("slide");
              openFlag=false;
            }

            $("#closeLeftMenu").click(closeLeftMenu);
            $("#dropdown").click(function(){
              var x = document.getElementById("dropdn");
              if (x.className.indexOf("w3-show") === -1) {
                x.className += " w3-show";
                x.previousElementSibling.className += " w3-red";
              } else {
                x.className = x.className.replace(" w3-show", "");
                x.previousElementSibling.className =
                x.previousElementSibling.className.replace(" w3-red", "");
              }
            })
            // fct 1: cutting; fct 2: etching; fct 3: raster; else:

            document.getElementById("cutting").onclick = function() {
              fct = 1;
              closeLeftMenu();

              intro = introJs();
              intro.removeHints();
              intro.setOptions({
                hints: [
                  { hint: '1. Use Select to choose specific lines.',
                  element: '#select',
                  hintPosition: 'top-left'},
                  { hint: '2. Recall what color cutting corresponds to and then change its color here.',
                  element: '#stroke_color'},
                  { hint: '3. All vectorized lines should be a Stroke of .001 in.', element: '#stroke_width'}
                ]
              });

              intro.addHints();

              document.getElementById("trans_stroke").style.cursor = "not-allowed";
              document.getElementById("red_stroke").style.cursor = "default";
              document.getElementById("blue_stroke").style.cursor = "not-allowed";
              document.getElementById("black_stroke").style.cursor = "not-allowed";
              document.getElementById("orange_stroke").style.cursor = "not-allowed";
              document.getElementById("green_stroke").style.cursor = "not-allowed";
              document.getElementById("cyan_stroke").style.cursor = "not-allowed";
              document.getElementById("mag_stroke").style.cursor = "not-allowed";
              document.getElementById("yellow_stroke").style.cursor = "not-allowed";
            };


            document.getElementById("etching").onclick = function() {
              fct = 2;
              closeLeftMenu();

              intro = introJs();
              intro.removeHints();
              intro.setOptions({
                hints: [
                  { hint: '1. Use Select to choose specific lines.', element: '#select', hintPosition: 'top-left'},
                  { hint: '2. Recall what color etching corresponds to and then change its color here.', element: '#stroke_color'},
                  { hint: '3. All vectorized lines should be a Stroke of .001 in.', element: '#stroke_width'}
                ]
              });

              intro.addHints();

              document.getElementById("trans_stroke").style.cursor = "not-allowed";
              document.getElementById("red_stroke").style.cursor = "not-allowed";
              document.getElementById("blue_stroke").style.cursor = "default";
              document.getElementById("black_stroke").style.cursor = "not-allowed";
              document.getElementById("orange_stroke").style.cursor = "not-allowed";
              document.getElementById("green_stroke").style.cursor = "not-allowed";
              document.getElementById("cyan_stroke").style.cursor = "not-allowed";
              document.getElementById("mag_stroke").style.cursor = "not-allowed";
              document.getElementById("yellow_stroke").style.cursor = "not-allowed";
            };

            document.getElementById("rastering").onclick = function() {
              fct = 3;
              closeLeftMenu();
              intro = introJs();
              intro.removeHints();
              intro.setOptions({
                hints: [
                  { hint: '1. Use Select to choose specific areas.', element: '#select', hintPosition: 'top-left'},
                  { hint: '2. Recall what color raster corresponds to and then change its color here.', element: '#fill_color'},
                ]
              });

              intro.addHints();

              document.getElementById("fill_tra").style.cursor = "not-allowed";
              document.getElementById("fill_red").style.cursor = "not-allowed";
              document.getElementById("fill_blue").style.cursor = "not-allowed";
              document.getElementById("fill_black").style.cursor = "default";
              document.getElementById("fill_org").style.cursor = "not-allowed";
              document.getElementById("fill_green").style.cursor = "not-allowed";
              document.getElementById("fill_cyan").style.cursor = "not-allowed";
              document.getElementById("fill_mag").style.cursor = "not-allowed";
              document.getElementById("fill_yel").style.cursor = "not-allowed";
            };

            document.getElementById("general").onclick = function() {
              fct = 0;
              closeLeftMenu();
              intro = introJs();
              intro.removeHints();
              intro.setOptions({
                steps: [
                  {
                    element: '#DesignTab',
                    intro: "Click here, <i>design</i> our own!",
                    // position: 'right'
                  },
                  {
                    element: '#PsTab',
                    intro: 'Set power and speed here, more <span style="color: red;">f</span><span style="color: green;">u</span><span style="color: blue;">n</span>.',
                    position: 'left'
                  },
                  {
                    element: '#PositionTab',
                    intro: "<span style='font-family: Tahoma'>Another step with to set final position!</span>",
                    position: 'bottom'
                  },
                  {
                    element: '#TutorialTab',
                    intro: '<strong>Get</strong> some basic ideas, <strong>use</strong> it.'
                  },
                  {
                    element: '#save',
                    intro: '<strong>Save</strong> your desingn here'
                  },{
                    element: '#new_file',
                    intro: '<strong>Creat</strong> a new file, <strong>use</strong> it.'
                  },{
                    element: '#undo',
                    intro: '<strong>Back</strong> to precious step'
                  },{
                    element: '#select',
                    intro: '<strong>Click</strong> to select specific lines, <strong>IMPORTANT</strong>.'
                  },{
                    element: '#fill_color',
                    intro: '<strong>Set</strong> fill colors here, <strong>IMPORTANT</strong>.'
                  },{
                    element: '#stroke_color',
                    intro: '<strong>Set</strong> line color here, <strong>IMPORTANT</strong>.'
                  },{
                    element: '#stroke_thick',
                    intro: '<strong>Set</strong> line width according to instructions, <strong>IMPORTANT</strong>.'
                  }
                ]
              });

              intro.start();

            };
            document.getElementById("psGuide").onclick = function() {
              fct = 0;
              closeLeftMenu();

              intro = introJs();
              intro.removeHints();

              intro.setOptions({
                steps: [
                  {
                    element: '#DesignTab',
                    intro: "Click here, if you want to <i>go</i> back",
                    position: 'right'
                  },
                  {
                    element: '#PsTab',
                    intro: 'Set power and speed here, it is <span style="color: red;">f</span><span style="color: green;">u</span><span style="color: blue;">n</span>.',
                    position: 'left'
                  },
                  {
                    element: '#pSlide',
                    intro: "Click here, set power!",
                  },{
                    element: '#sSlide',
                    intro: "Click here, set speed!",
                  }
                ]
              });

              intro.start();

            };
            document.getElementById("positionGuide").onclick = function() {
              console.log("clicked!");
              fct = 0;
              closeLeftMenu();

              intro = introJs();
              intro.removeHints();

              intro.setOptions({
                steps: [
                  {
                    element: '#nozzle',
                    intro: '<strong>Get</strong> it, <strong>use</strong> it.'
                  },{
                    element: '#relocate',
                    intro: '<strong>Get</strong> it, <strong>use</strong> it.'
                  },{
                    element: '#timer_btn',
                    intro: '<strong>Get</strong> it, <strong>use</strong> it.'
                  }
                ]
              });

              intro.start();
            };
          }else{
            $("#TutorialTab").css('display', "none");
          }
        }
      },

      canvasSetUp: function(gameMode, progress){
        if(move_to_next_task){
          switch (gameMode) {
            case Mode.design:
            $("#new_file").click(function(){
              create_new_file(gameProject);
            });
            $("#new_file").click();
            break;

            default:
            var cur = gameProject.designGraphs[progress];
            gameProject.setUpCanvas(cur.size.w, cur.size.h);
            gameProject.designInit();
            break;
          }
          move_to_next_task = false;
        }else {
          paper.projects[0].activate();
        }

      },

      init: function(gameMode){
        var Operation = function(type, copys){
          this.type = type;
          this.copys = copys;
        }
        var operations = [];
        var operation_i = 0;
        var operation_l = 0;
        function addOp (op){
          if(operation_l==20 && operations[operation_i].type==-1){
            $.each(operations[operation_i].copys, function(k,copy){
              var t = project.getItem({id: copy.id});
              t.remove();
            });
          }
          operations[operation_i]=op;
          operation_l = (operation_l==20)? 20 : operation_l+1;
          operation_i+=1;
        }
        function select_by_click(e){
          e.preventDefault();
          var hit = paper.project.hitTest(e.point, {
            tolerance: 4,
            fill: true,
            bounds:true,
            stoke: true,
            segments: true,
            curves: true,
            guides: false,
            matches: function(item){
              return ((item.clipMask ==false))
            }
          });
          if(!e.modifiers.shift){
            paper.project.deselectAll();
            if (hit){
              hit.item.selected = true;
            }
          }else{
            if (hit){
              hit.item.selected = true;
            }
          }
          if (hit){
            console.log(hit.item.id);
            if(hit.item.hasFill()){
              $("#fill_color").css('background', hit.item.fillColor.toCSS());
            }else {
              $("#fill_color").css({
                "background": "url('images/Transparency500.png') no-repeat center center",
              });
            }
            if(!hit.item.hasStroke()){
              $("#stroke_color").css({
                "background": "url('images/Transparency500_1.png') no-repeat left top",
                "background-size": "250px",
                "border": "1px solid rgba(255,255,255, 0.65)"
              });
            }else {
              $("#stroke_color").css("border","6px solid "+hit.item.strokeColor.toCSS()).css("background","white");
            }
            $("#stroke_width").val(hit.item.strokeWidth/1000);

            if(hit.item.className=="PointText" && gameMode==Mode.design){
              $("#font_size").val(hit.item.fontSize);
            }
          }
        }
        select = new paper.Tool();
        select.onMouseDown = select_by_click;
        $("#select").click(function(){
          paper.project.deselectAll();
          $(".selected").removeClass('selected');
          $("#select").addClass('selected');
          select.activate();
        }).click();
        $("#undo").click(function(){
          if(operation_l>0){
            operation_l-=1;
            operation_i = (operation_i-1)>-1?operation_i-1:19;
            var ops = operations[operation_i];
            $.each(ops.copys, function(k, copy){
              var t = project.getItem({
                id: copy.id
              });
              if(ops.type==0){
                $.each(operations, function(k,op){
                  if(op){
                    $.each(op.copys, function(key, occur){
                      if(occur.id==t.id){
                        occur.id=copy.copy.id;
                      }
                    })
                  }
                })
                t.replaceWith(copy.copy);
              }else if(ops.type==-1){
                t.visible = true;
              }else{
                t.remove();
              }
            })
            operations[operation_i]=null;
          }
        })
        $("#fill_color").click(function(){
          $("#fill_color_dropdown").toggleClass('show');
          $("#fill_color_dropdown").offset({
            top: $("#fill_color").offset().top + $("#fill_color").height()+10,
            left: $("#fill_color").offset().left
          });
        })
        // Yingnan Wu Editing starts
        $("#fill_color_dropdown div").click(function(){
          var c = $(this).css('background-color');
          if(fct === 0){
            change_menu_fill_color();
          }
          if(fct === 1 && c === "rgb(255, 0, 0)"){
            change_menu_fill_color();
          }
          if(fct === 2 && c === "rgb(0, 0, 255)"){
            change_menu_fill_color();
          }
          if(fct === 3 && c === "rgb(0, 0, 0)"){
            change_menu_fill_color();
          }

          function change_menu_fill_color(){
            if(project.selectedItems.length!=0){
              var op = [];
              $.each(project.selectedItems, function(k,v){
                op.push({
                  id: v.id,
                  copy: v.clone({insert: false})
                })
              })
              addOp(new Operation(0, op));
            }
            if (c=="rgba(0, 0, 0, 0)"){
              $("#fill_color").css({
                "background": "url('images/Transparency500.png') no-repeat center center",
              });
              $.each(project.selectedItems, function(k, v){
                if(v.fillColor){
                  v.fillColor.alpha = 0;
                }
              })
            }else{
              $("#fill_color").css("background",c);
              $.each(project.selectedItems, function(k, v){
                v.fillColor = new Color(c);
                v.fillColor.alpha = 1;
              })
            }
            $("#fill_color_dropdown").removeClass('show');
          }

        })
        // Yingnan Wu Editing ends
        $("#stroke_color").click(function(){
          $("#stroke_color_dropdown").toggleClass('show');
          $("#stroke_color_dropdown").offset({
            top: $("#stroke_color").offset().top + $("#fill_color").height()+10,
            left: $("#stroke_color").offset().left
          });
        })
        // Yingnan Wu Editing starts
        $("#stroke_color_dropdown div").click(function(){
          var c = $(this).css('background-color');
          //console.log(c);
          if(fct === 0){
            change_menu_stroke_color();
          }
          if(fct === 1 && c === "rgb(255, 0, 0)"){
            change_menu_stroke_color();
          }
          if(fct === 2 && c === "rgb(0, 0, 255)"){
            change_menu_stroke_color();
          }
          if(fct === 3 && c === "rgb(0, 0, 0)"){
            change_menu_stroke_color();
          }


          function change_menu_stroke_color() {
            if(project.selectedItems.length!=0){
              var op = [];
              $.each(project.selectedItems, function(k,v){
                op.push({
                  id: v.id,
                  copy: v.clone({insert: false})
                })
              })
              addOp(new Operation(0, op));
            }
            if (c==="rgba(0, 0, 0, 0)"){
              $("#stroke_color").css({
                "background": "url('images/Transparency500_1.png') no-repeat left top",
                "background-size": "250px",
                "border": "1px solid rgba(255,255,255, 0.65)"
              });
              $.each(project.selectedItems, function(k, v){
                v.strokeColor.alpha = 0;
              })
              $("#stroke_color").removeClass();
              $("#stroke_color").addClass(c);
            }else{
              $("#stroke_color").css("border","6px solid "+c).css("background","white");
              $.each(project.selectedItems, function(k, v){
                v.strokeColor = new Color(c);
                v.strokeColor.alpha = 1;
              })
            }
            $("#stroke_color_dropdown").removeClass('show');
          }
        })
        // Yingnan Wu Editing ends
        $("#stroke_width").change(function(){
          if(project.selectedItems.length!=0){
            var op = [];
            $.each(project.selectedItems, function(k,v){
              op.push({
                id: v.id,
                copy: v.clone({insert: false})
              })
            })
            addOp(new Operation(0, op));
          }
          if($(this).val()!=0){
            var w = $(this).val();
            $.each(project.selectedItems, function(k, v){
              v.strokeWidth=w*1000;
            })
          }
        })
        $("#print").click(function(){
          gameProject.saveDesign(paper.project);
          sceneWindow.show();
          sceneWindow.init();
          new_file = true;
          // -----------------------------Yingnan Wu Editing starts-----------------------------
          introJs().removeHints();
          // -----------------------------Yingnan Wu Editing ends-----------------------------
        })
        $("#close").click(function(){
          sceneWindow.show();
        })
        if(gameMode==Mode.design){
          pencil = new Tool();
          line = new Tool();
          rectangle = new Tool();
          ellipse = new Tool();
          brush = new Tool();
          eraser = new Tool();
          move = new Tool();
          text = new Tool();
          multipolygon = new Tool();

          var mouseX, mouseY;
          $( document ).on("mousemove",function(event){
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
            temp.strokeColor = new Color($("#stroke_color").attr('class'));
            temp.strokeWidth = $("#stroke_width").val()*1000;
            temp.add(event.point);
            gameProject.workingCanvas.addChild(temp);
            moving.add(event.point);
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
              temp.guide = false;
              moving.remove();
            }

          };

          line.onMouseDown=onMouseDown;
          line.onMouseDrag=function(e){
            e.preventDefault();
            moving.removeSegments(1);
            moving.strokeColor = new Color($("#stroke_color").attr('class'));
            moving.strokeWidth = $("#stroke_width").val()*1000;
            moving.add(e.point);
          }
          line.onMouseUp = function(e){
            e.preventDefault();
            temp.add(e.point);
            temp.guide = false;
            moving.remove();
          }

          var multi_temp = null;
          var multi = false;
          multipolygon.onMouseDown = function (e){
            e.preventDefault();
            if (!multi){
              if(multi_temp){
                multi_temp.remove();
              }
              multi_temp = new Path();
              multi_temp.guide=false;
              multi_temp.strokeColor = new Color($("#stroke_color").attr('class'));
              multi_temp.strokeWidth = $("#stroke_width").val()*1000;
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
              moving.strokeColor =new Color($("#stroke_color").attr('class'));
              moving.strokeWidth = $("#stroke_width").val()*1000;
              moving.add(p1);
              moving.add(e.point);

            }
          }
          multipolygon.deactivate = function(){
            if(multi){
              gameProject.workingCanvas.addChild(multi_temp.clone());
              multi_temp.remove();
              multi = false;
              if(moving){
                moving.remove();
              }
            }

          }

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

          $("#pencil").click(function(){
            project.deselectAll();
            multipolygon.deactivate();
            pencil.activate();
            $(".selected").removeClass("selected");
            $("#pencil").addClass("selected");
          })
          $("#line").click(function(){
            project.deselectAll();
            multipolygon.deactivate();
            line.activate();
            $(".selected").removeClass("selected");
            $("#line").addClass("selected");
          })
          $("#multipolygon").click(function(){
            project.deselectAll();
            multipolygon.deactivate();
            multipolygon.activate();
            $(".selected").removeClass("selected");
            $("#multipolygon").addClass("selected");
          });
          $("#delete").click(function(){
            multipolygon.deactivate();
            del();
            $(".selected").removeClass("selected");
            $("#move").addClass("selected");
          });
          $("#text").click(function(){
            multipolygon.deactivate();
            project.deselectAll();
            text.activate();
            $(".selected").removeClass("selected");
            $("#text").addClass("selected");
          });




        }

        designW_f = true;


      }
    };
    var psWindow = {
      show : function(){
        $(".PositionPage").hide();
        $(".DesignPage").hide();
        $(".PsPage").show("fade");
        $("#navigationBar .w3-red").removeClass("w3-red");
        $("#PsTab").addClass("w3-red");
        pp_f = true;

        // Yingnan Wu Editing starts
        introJs().removeHints();
        $("#dropdown").css('display', 'none');
        $("#general").css('display', 'none');
        $("#cutting").css('display', 'none');
        $("#etching").css('display', 'none');
        $("#rastering").css('display', 'none');
        $("#psGuide").css('display', 'block');
        $("#positionGuide").css('display', 'none');
        // Yingnan Wu Editing ends

      },
      init : function(){
        var sliderPower = $("#powerRange");
        var outputPower = $("#demoPower");
        var sliderSpeed = $("#speedRange");
        var outputSpeed =$("#demoSpeed");
        var cutting_coef = 0.033;
        var PsSelected = null;

        sliderPower.on("input", function() {
          updateColor();
        })
        sliderSpeed.on("input", function() {
          updateColor();

        })

        $(".input-color").click(function(){
          var color = $(this).attr('id');
          var power = $(this).find('span[id*="Power"]').html();
          var speed = $(this).find('span[id*="Speed"]').html();

          if(PsSelected!=color){
            PsSelected=color;
            $(".PsSelect").removeClass('PsSelect');
            $(this).toggleClass('PsSelect');
            changeColor(color,power,speed);
          }else{
            PsSelected = null;
            $(this).toggleClass('PsSelect');
          }
        })


        function changeColor(color, power,speed){
          $("#currentColor").text(color.toUpperCase()).css('color',color);
          sliderPower.val(power);
          sliderSpeed.val(speed);
          outputPower.html(power);
          outputSpeed.html(speed);
        }

        function updateColor(){
          outputPower.html($(sliderPower).val());
          outputSpeed.html($(sliderSpeed).val());
          if(PsSelected){
            $("#"+PsSelected+"Power").text($(sliderPower).val());
            $("#"+PsSelected+"Speed").text($(sliderSpeed).val());
            $("#"+PsSelected+"Depth").text(Number(cutting_coef*$(sliderPower).val()/$(sliderSpeed).val()).toFixed(3));
          }
        }

        $('#PsDoneButton').click(function () {
          positionWindow.show();
          positionWindow.setUpCanvas();
          if(!positionW_f){
            positionWindow.init();
            positionW_f = true;
          }

          updateDepthInfo();

        });

        $('#PsDefaultsButton').click(function(){
          var Default_win = $("<div></div>");
          Default_win.html("<p>Reset to Defaults?</p>");
          var yesB = $("<button class='w3-button w3-white w3-border w3-border w3-round-large'>Yes</button>");
          yesB.css("margin","25px").click(function(){
            reset();
            close_pop_up();
          })
          var NoB = $("<button class='w3-button w3-white w3-border w3-border w3-round-large'>No</button>").css("margin","25px").click(function(){
            close_pop_up();
          });
          Default_win.append(yesB).append(NoB);
          pop_up_window("", Default_win, "170px","400px");

        })

        function reset(){
          $(".input-color").find('span[id*="Power"]').html("50");
          $(".input-color").find('span[id*="Speed"]').html("60");
          $(".input-color").find('span[id*="Depth"]').html("0.028");
        }

        function updateDepthInfo(){
          $.each(gameProject.workingCanvas.children, function(k, v){
            v.data.edge = {};
            v.data.fill = {};
            if(!v.hasFill()){
              v.data.fill.depth=0;
              v.data.fill.darkness = 0;
            }else{
              var c = parseColor(v.fillColor.toCSS());
              var d = 0.4*Number($("#"+c+"Power").text())/(Number($("#"+c+"Speed").text())-20.1);
              v.data.fill.depth = Number($("#"+c+"Depth").text())>0.225 ? 0.225 : Number($("#"+c+"Depth").text());
              v.data.fill.darkness = (d>0 && d<2)? d: 2;
            }

            if(!v.hasStroke()){
              v.data.edge.type='etching';
              v.data.edge.depth = 0;
              v.data.edge.darkness = 0;
            }else if(v.strokeWidth>1  ){
              v.data.edge.type='rastering';
              var c = parseColor(v.strokeColor.toCSS());
              var d = 0.4*Number($("#"+c+"Power").text())/(Number($("#"+c+"Speed").text())-20.1);
              v.data.edge.depth = Number($("#"+c+"Depth").text())>0.225 ? 0.225 : Number($("#"+c+"Depth").text());
              v.data.edge.darkness = (d>0 && d<2)? d: 2;
            }else{
              var c = parseColor(v.strokeColor.toCSS());
              var d = Number($("#"+c+"Depth").text());
              v.data.edge.type = (d>0.255) ? "cutting": "etching";
              v.data.edge.depth = d>0.225 ? 0.225 : d;
              v.data.edge.darkness = 0;
            }
          })
        }

        function checkSetting(){
          $.each(gameProject.cutting, function(k, v){
            if (v.data.edge.type!='cutting'){
              console.log("Your setting cannot cut through where you should cut!");
              return false;
            }
          })
          $.each(gameProject.etching, function(k, v){
            if (v.data.edge.type!='etching'){
              console.log("Your setting cannot etch as expected!");
              return false;
            }
          })
          $.each(gameProject.rastering, function(k, v){
            if (v.data.fill.depth==0 || v.data.fill.depth>=0.225){
              console.log("Your setting cannot raster as expected!");
              return false;
            }
          })

          return true;
        }

        psW_f = true;
      }
    }
    var positionWindow = {
      show : function(){
        $(".PsPage").hide();
        $(".DesignPage").hide();
        $(".PositionPage").show("fade");
        $("#navigationBar .w3-red").removeClass("w3-red");
        $("#PositionTab").addClass("w3-red");
        pp_f = false;
        $("#nozzle").click();

        // Yingnan Wu Editing starts
        introJs().removeHints();
        $("#dropdown").css('display', 'none');
        $("#general").css('display', 'none');
        $("#cutting").css('display', 'none');
        $("#etching").css('display', 'none');
        $("#rastering").css('display', 'none');
        $("#psGuide").css('display', 'none');
        $("#positionGuide").css('display', 'block');
        // Yingnan Wu Editing ends
      },
      setUpCanvas: function(){
        $("#PositionCanvasContainer").append($("<canvas id='positionCanvas' height='"+(2400/2.5+40)+"px' width='"+(3600/2.5+40)+"px'></canvas>"));

        if(paper.projects.length<2*(gameProject.progress+1)){
          paper.setup('positionCanvas');

          var board_topLeft = new Point(40,40);
          var board_size = new Size(3600/2.5, 2400/2.5);
          var stage = new Shape.Rectangle(board_topLeft,board_size);
          stage.fillColor='white';
          stage.guide=true;

          var ruler=new Path();
          ruler.add(project.view.bounds.topLeft);
          ruler.add(project.view.bounds.topRight);

          ruler.add(stage.bounds.topRight);
          ruler.add(stage.bounds.topLeft);
          ruler.add(stage.bounds.bottomLeft);
          ruler.add(project.view.bounds.bottomLeft);
          ruler.closed = true;
          ruler.fillColor='black';
          ruler.guide = true;

          var grader1 = new Path();
          var grader2 = new Path();
          var grader3 = new Path();
          var grader4 = new Path();
          grader1.add(new Point(0,0), new Point(0,25));
          grader2.add(new Point(20, 5), new Point(20, 25));
          grader3.add(new Point(0,0), new Point(25,0));
          grader4.add(new Point(5, 20), new Point(25, 20));
          var twoGrader = new Group(grader1, grader2);
          var twoGrader2 = new Group(grader4, grader3);
          twoGrader.strokeWidth=1;
          twoGrader.strokeColor = 'white';
          twoGrader2.strokeWidth=1;
          twoGrader2.strokeColor = 'white';

          var graders_v = new Symbol(twoGrader);
          var graders_h = new Symbol(twoGrader2);


          for (i = 0; i<36; i++){
            graders_v.place(new Point(i*100/2.5+40+100/10, 40-12.5));
            var text =new PointText(new Point(i*100/2.5+40-2, 14));
            text.fillColor='white';
            text.content = i;
          }

          for (i = 0; i<24; i++){
            graders_h.place(new Point(40-12.5,i*100/2.5+40+100/10));
            var text =new PointText(new Point( 5,i*100/2.5+43));
            text.fillColor='white';
            text.content = i;
            text.rotate(270);
          }

        }else {
          paper.projects[2*gameProject.progress+1].activate();
        }

        if(new_file){
          $.each(project.getItems({class: Raster}), function(k,v){
            v.remove();
          });
          var pic = project.importSVG(gameProject.saved);
          var item = pic.rasterize(100);
          pic.remove();
          item.scale(0.4);
          new_file = false;

        }
      },
      init : function(){
        $("#timer_btn").click(function(){
          var total_time_sec = 4080; //68 min
          var h = Math.floor(total_time_sec/3600);
          var m = Math.floor((total_time_sec%3600)/60);
          var s = (total_time_sec%3600)%60;
          var date = new Date()

          var dateToUse = new Date(date.getYear(), date.getMonth(), date.getDay(), h, m, s, 0);

          var hours = addZero(dateToUse.getHours());
          var minutes = addZero(dateToUse.getMinutes());
          var seconds = addZero(dateToUse.getSeconds());

          function addZero(i) {
            if (i < 10) {
              i = "0" + i;
            }
            return i;
          }

          $("#timer").html(hours+":" + minutes + ":" + seconds).toggleClass('show');
          if($(this).hasClass("w3-brown")){
            $(this).removeClass("w3-brown");
            $(this).addClass("w3-red");
          }else{
            $(this).removeClass("w3-red");
            $(this).addClass("w3-brown");
          }
        })
        $("#nozzle").click(function(){
          $(".choose_one").removeClass('w3-brown').addClass('w3-red');
          $(this).removeClass('w3-red').addClass('w3-brown');
          $("#x_nozzle").show().text(((noz.position.x-40)*0.025).toFixed(3));
          $("#y_nozzle").show().text(((noz.position.y-40)*0.025).toFixed(3));
          $("#x_i").hide();
          $("#y_i").hide();
          nozzle.activate();
          noz.visible = true;
          noz.opacity = 1;
          blk.start();
        });
        $("#zoom").click(function(){
          $(".choose_one").removeClass('w3-brown').addClass('w3-red');
          $(this).removeClass('w3-red').addClass('w3-brown');
          zoom.activate();
        });
        $("#relocate").click(function(){
          $(".choose_one").removeClass('w3-brown').addClass('w3-red');
          $(this).removeClass('w3-red').addClass('w3-brown');
          $("#x_nozzle").hide();
          $("#y_nozzle").hide();
          $("#x_i").show();
          $("#y_i").show();
          relocate.activate();
          noz.opacity = 0.7;
        });
        $("#copy").click(function(){
          $(".choose_one").removeClass('w3-brown').addClass('w3-red');
          $(this).removeClass('w3-red').addClass('w3-brown');
          copy.activate();
        });
        $("#back").click(function(){
          psWindow.show();
        })
        $("#start_text").click(function(){
          g_design.length = 0;
          $.each(gameProject.workingCanvas.children, function(ind, shape){
            if(shape.data.edge.type=='cutting'){
              g_design.push(shape);
              var t = etchShape(shape);
              t.guide = true;
              t.data.fill = {};
              t.data.fill.depth = 0.255;
              g_design.push(t);
            }else{
              if(shape.data.fill.depth>0){
                g_design.push(shape);
              }
              if(shape.data.edge.depth>0){
                var t = etchShape(shape);
                t.guide = false;
                t.data.fill = {};
                t.data.fill.depth = shape.data.edge.depth;
                t.data.fill.darkness = shape.data.edge.darkness;
                g_design.push(t);
              }
            }
          });
          openModel();
          $("#overlay").show();
          var timer = setInterval(function(){
            if(!windowObjectReference==null|| windowObjectReference.closed){
              $("#overlay").hide();
              clearInterval(timer);
            }
          }, 1500);
        })
        var ten = new CompoundPath({
          children: [
            new Path.Line(new Point(70,90), new Point(110,90)),
            new Path.Line(new Point(90,70), new Point(90,110)),
          ],
          strokeColor: "black",
          guide: true
        });
        var cir = new Path.Circle({
          center: ten.position,
          radius:10,
          strokeColor: 'black',
          guide: true
        });
        var noz = new Group(ten, cir);
        var blk = new Blink();
        var mv = new Move();
        var nozzle_moving = false;
        function Blink(){
          this.counter = 0;
          var that = this;
          this.onFrame = function(event)
          { cir.remove();
            cir = new  Path.Circle({
              center: ten.position,
              radius:30-that.counter/4,
              strokeColor: 'black',
              guide: true
            });
            noz.addChild(cir);

            if(that.counter <= 80){
              that.counter += 1;
            }else{
              that.counter = 0;
              that.stop();
            }
          };
        }
        Blink.prototype.start = function(){
          view.attach('frame', this.onFrame);
        };
        Blink.prototype.stop = function(){
          view.detach('frame', this.onFrame);
        };
        function Move(){
          this.counter = 0;
          this.disx = 0;
          this.disy = 0;
          var that = this;
          this.onFrame = function(event){
            if(that.disx!=0){
              noz.position.x= that.disx>0?noz.position.x+1 :noz.position.x-1;
              that.disx=that.disx>0?that.disx-1:that.disx+1;
              $("#x_nozzle").text(((noz.position.x-40)*0.025).toFixed(3));
            }else if (that.disy!=0){
              noz.position.y= that.disy>0?noz.position.y+1 :noz.position.y-1;
              that.disy=that.disy>0?that.disy-1:that.disy+1;
              $("#y_nozzle").text(((noz.position.y-40)*0.025).toFixed(3));
            }else{

              that.stop();
            }
          };
        }
        Move.prototype.start = function(){
          view.attach('frame', this.onFrame);
          nozzle_moving = true;
        };
        Move.prototype.stop = function(){
          view.detach('frame', this.onFrame);
          nozzle_moving = false;
        };


        view.draw();

        function select_by_click(e){
          e.preventDefault();
          var hit = paper.project.hitTest(e.point, {
            tolerance: 4,
            guides: false,
            matches: function(item){
              return ((item.clipMask ==false))
            }
          });
          if(!e.modifiers.shift){
            paper.project.deselectAll();
            if (hit){
              hit.item.selected = true;
            }
          }else{
            if (hit){
              hit.item.selected = true;
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
        function limit_position(item){
          if(item.bounds.topLeft.x<40){
            item.bounds.topLeft.x=40;
          }
          if(item.bounds.topLeft.y<40){
            item.bounds.topLeft.y=40;
          }
          if(item.bounds.bottomRight.x>40+3600/2.5){
            item.bounds.bottomRight.x=40+3600/2.5;
          }
          if(item.bounds.bottomRight.y>40+2400/2.5){
            item.bounds.bottomRight.y=40+2400/2.5;
          }
        }

        relocate = new Tool();
        nozzle = new Tool();
        zoom = new Tool();
        copy = new Tool();

        var move_tool_flag;
        relocate.minDistance = 5;
        relocate.onMouseDown = function (e){
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
        relocate.onMouseDrag = function (e){
          e.preventDefault();
          if(move_tool_flag){
            $.each(project.selectedItems, function(k, v){
              v.position.x = v.position.x + e.delta.x;
              v.position.y = v.position.y + e.delta.y;
            })
            limit_position(new Group(project.selectedItems));

          }
        }
        relocate.onMouseUp = function (e){
          e.preventDefault();
          if(move_tool_flag){
            move_tool_flag=false;
          }
        }
        relocate.onKeyDown = onKeyDown;

        nozzle.onMouseDown = function(e){
          if(!nozzle_moving && e.point.x>40 && e.point.y>40){
            mv.disx = e.point.x-noz.position.x;
            mv.disy = e.point.y-noz.position.y;
            mv.start();
          }
        }
        function etchShape (v){
          var et = new Path();
          var nor, seg, temP;
          function getOutsidePoint(p){
            nor = v.getNormalAt(v.getOffsetOf(p));
            temP = p.add(nor);
            if (v.contains(temP)){
              return p.subtract(nor);
            }else{
              return temP.clone();
            }
          }
          var iter = v.firstSegment;
          var seg = new Segment({
            point: getOutsidePoint(iter.point)
          });
          et.add(seg);
          while(!iter.isLast()){
            iter = iter.next;
            seg = new Segment({
              point: getOutsidePoint(iter.point),
              handleIn: iter.handleIn,
              handleOut: iter.handleOut
            });
            et.add(seg);
          }
          iter = v.firstSegment;
          seg = new Segment({
            point: getOutsidePoint(iter.point)
          });
          et.add(seg);
          seg = new Segment({
            point: iter.point.clone()
          });
          et.add(seg);
          iter = v.lastSegment;
          seg = new Segment({
            point: iter.point.clone(),
            handleIn: iter.handleOut,
            handleOut: iter.handleIn
          });
          et.add(seg);
          while(!iter.isFirst()){
            iter = iter.previous;
            seg = new Segment({
              point: iter.point.clone(),
              handleIn: iter.handleOut,
              handleOut: iter.handleIn
            });
            et.add(seg);
          }
          seg.clearHandles();
          et.closePath();
          et.clockwise = false;
          return et;
        }

        $("#nozzle").click();

        positionW_f = true;
      }
    }
    var sceneWindow = {
      show: function(){
        $("#mainContainer").hide();
        $("#scenceContainer").show("fold", 1000);
      },
      init: function(){
        if(!gameProject.saved){
          switch (gameMode) {
            case Mode.tutorial:
            $("#skip").click(function(){
              $("#scenceContainer .skipable").hide();
              $("#pc-container img").css("animation", "wiggle 2.5s infinite").click(function(){
                $("#pc-container img").css("animation",'');
                $("#scenceContainer").hide("fade", 1000,function(){
                  $("#mainContainer").show("fade");
                  designWindow.show(gameMode);
                  designWindow.canvasSetUp(gameMode, gameProject.progress);
                  if(!designW_f){
                    designWindow.init(gameMode);
                    move_to_next_task = false;
                  }

                });

              })
            })
            $("#close_review").click(function(){
              $("#review").css("display", "none");
              $("#review .reviewedLines").remove();
              $(this).css("display", "none");
              $("#scenceContainer .skipable").css("display", "initial");
            })
            var count = 0;
            var lines;
            $.get('Lines/tutorialLines.txt', function(data){
              lines = data.split("\n");
              $("#dialogBox").click(function () {
                if(count < lines.length) {
                  if (count == 0) {
                    $("#char_head").empty();
                    $("#char_head").append('<div class="name">Hans</div>');
                  }else{
                    $("#dialogBox").empty();
                    $("#dialogBox").append('<div id="lines">' + lines[count] + '</div>');
                  }
                  count++;
                }else{
                  $("#skip").click();
                }
              }).click().click();
            });
            $('#toReview').click(function(){
              $("#scenceContainer .skipable").css("display", "none");
              $("#review").css("display", "block");
              $("#close_review").css("display", "initial");
              for (var i = 0; i < count; i++){
                console.log(lines[i]);
                if(lines[i] == "Hans"){
                  $('#review').append('<div class="reviewedLines">'+'[Hans]:'+'</div>');
                }else{
                  $('#review').append('<div class="reviewedLines">' + ' &gt&gt ' +lines[i] + '</div>');
                }
              }
            })
            break;
            default:

          }
        }else {
          $("#scenceContainer .skipable").css("display", "none");
          $("#lasercutter-container img").css("animation", "wiggle 2.5s infinite").click(function(){
            $("#lasercutter-container img").css("animation",'');
            $("#scenceContainer").hide("fade", 1000, function(){
              $("#mainContainer").show("puff");
              if(pp_f){
                psWindow.show();
                if(!psW_f)
                psWindow.init();
              }else{
                positionWindow.show();
                positionWindow.setUpCanvas();
              }
            });
          });
        }
      }
    }
    var windowControl = {
      designWindow: designWindow,
      psWindown: psWindow,
      positionWindow : positionWindow,
      sceneWindow: sceneWindow,
      gameProject: gameProject
    };

    return windowControl;
  }(gameMode))

  gameInit();

  function gameInit(){
    resizeInterf();

    switch (gameMode) {
      case Mode.design:
      windowControl.designWindow.show(Mode.design);
      windowControl.designWindow.canvasSetUp(Mode.design, 0);
      windowControl.designWindow.init(Mode.design);
      break;
      case Mode.tutorial:
      windowControl.sceneWindow.show();
      windowControl.sceneWindow.init();
      break;
      default:

      break
    }

    window.onresize = function(event) {resizeInterf();}
    function resizeInterf(){
      var vpw = $(window).width();
      var vph = $(window).height();
      var w = vph*1280/800;
      if(vpw>w){
        vpw=w;
      }else{
        vph = vpw*800/1280;
      }

      if (vph<400){
        vph = 400;
        vpw=640;
      }
      $("#gameContainer").css({
        "height": vph + "px",
        "width" : vpw + "px"
      });

      var infw = vpw - 50;
      var infh = vph - 100;
      var topH = $("#top").height();

      $("#screenTop").width(infw);
      $("#screenBottom").width(infw);
      $("#screenRight").height( infh);
      $("#screenLeft").height( infh);
      $("#InterfaceContainer").css({
        "width": infw+"px",
        "height": infh + "px"
      });
      $("#main").css({
        "top": topH +"px" ,
        "height": (infh-topH )+ "px"
      })
    }

  }






});
