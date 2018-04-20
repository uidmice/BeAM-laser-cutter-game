<!DOCTYPE HTML>

<html>
<head>
  <meta charset="utf-8">
  <title>Laser Cutter</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" >
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

  <link rel="stylesheet" type= "text/css" href="styles/setup.css">
  <link rel="stylesheet" type= "text/css" href="styles/design.css">
  <link rel="stylesheet" type= "text/css" href="styles/ps-position.css">
  <link rel="stylesheet" type= "text/css" href="styles/dialogStyleTutorial.css">
  <link href="../../intro/introjs.css" rel="stylesheet">

<script type="text/javascript" src="../../jquery-ui/external/jquery.js"></script>
<script type="text/javascript" src="../../jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="../../paperjs/dist/paper-full.js"></script>
<script type="text/javascript" src="js/three.js"></script>

<script type="text/javascript" src="js/d3-threeD.js"></script>
<script type="text/javascript" src="js/Project.js"></script>
<script type="text/javascript" src="js/OperationalWindow.js"></script>
<script type="text/javascript" src="js/function.js"></script>
<script>
var gameMode;
(function() {
  var x = "<?php echo ( isset( $_GET['gameMode'] ) && $_GET['gameMode'] != '') ? $_GET['gameMode'] : '';?>";
  switch (x) {
    case 'tutorial':
      gameMode = Mode.tutorial;
      break;
    case 'design':
      gameMode = Mode.design;
      break;
    default:
      gameMode = Mode.design;
  }
})();
</script>
</head>
<body>
  <div id='gameContainer'>
    <div id="scenceContainer">
      <div id="lasercutter-container">
        <img src="scene_pics/icon1.png" alt="laser cutter" >
      </div>
      <div id="pc-container">
        <img src="scene_pics/icon2.png" alt="laptop">
      </div>
      <div id="character" class="skipable"></div>
      <div id="char_head" class="skipable"></div>
      <div id="dialogBox" class="skipable"></div>
      <div id="review" style="display: none">
      </div>
      <button id="close_review" style="display: none">back</button>
      <div id="menu" class="skipable">
        <button type="button" id="skip">Skip</button>
        <button type="button" id="toReview"  >Review</button>
      </div>
    </div>
    <div id='overlay'></div>
    <div id="mainContainer">
      <div id="navigationBar" class="w3-bar w3-light-gray">
        <span id="DesignTab" class="w3-bar-item w3-tab " >Design</span>
        <span id="PsTab" class="w3-bar-item w3-tab " >Manual Control</span>
        <span id="PositionTab" class="w3-bar-item w3-tab">Viewer</span>
        <button class="w3-button w3-left w3-hover-red" id="TutorialTab">Tutorial</button>
      </div>
      <div id="screenTop"></div>
      <div id="screenTopLeft"></div>
      <div id="screenTopRight"></div>
      <div id="screenLeft"></div>
      <div id="screenRight"></div>
      <div id="screenBottom"></div>
      <div id="screenBottomLeft"></div>
      <div id="screenBottomRight"></div>
      <div id="InterfaceContainer">
        <div class="w3-sidebar w3-bar-block w3-card w3-animate-fade-in" style="display:none" id="leftMenu">
          <button id="closeLeftMenu" class="w3-bar-item w3-button w3-large">Close &times;</button>
          <div class="w3-dropdown-click">
            <button class="w3-button w3-block w3-left-align w3-hover-red" id="dropdown">Design Page <i class="fa fa-caret-down"></i>
            </button>
            <div class="w3-hide w3-white w3-card" id="dropdn">
              <a href="#" class="w3-bar-item w3-button" id="general">General</a>
              <a href="#" class="w3-bar-item w3-button" id="cutting">Cutting Hints</a>
              <a href="#" class="w3-bar-item w3-button" id="etching">Etching Hints</a>
              <a href="#" class="w3-bar-item w3-button" id="rastering">Raster Hints</a>
            </div>
          </div>
          <a href="#" class="w3-bar-item w3-button" id="psGuide">Power and Speed</a>
          <a href="#" class="w3-bar-item w3-button" id="positionGuide">Position Page</a>
        </div>
        <div id="top">
          <div class="DesignPage">
            <i class="material-icons" id="logo">font_download</i>
            <div id="save" class="top_manu">
              <i class="material-icons">save</i>
              <p>Save</p>
            </div>
            <div id="new_file" class="top_manu">
              <i class="material-icons">insert_drive_file</i>
              <p>New File</p>
            </div>
            <div id="undo" class="top_manu">
              <i class="material-icons">undo</i>
              <p>Undo</p>
            </div>
            <div id="select" class="top_manu selected">
              <i class="material-icons">near_me</i>
              <p>Select</p>
            </div>
            <div>
              <button id="fill_color" class="rgba(0,0,0,0)"></button>
              <div class = 'dropdown' id='fill_color_dropdown'>
                <div style="background:url('images/Transparency500.png') no-repeat center center" id="fill_tra"></div>
                <div style='background :red' id="fill_red"></div>
                <div style='background :blue' id="fill_blue"></div>
                <div style='background :black' id="fill_black"></div>
                <div style='background :orange' id="fill_org"></div>
                <div style='background :green' id="fill_green"></div>
                <div style='background :cyan' id="fill_cyan"></div>
                <div style='background :Magenta' id="fill_mag"></div>
                <div style='background :yellow' id="fill_yel"></div>
              </div>
            </div>
            <div>
              <button id="stroke_color" class="rgb(255,0,0)"></button>
              <div class = 'dropdown' id='stroke_color_dropdown'>
                <div style="background :url('images/Transparency500.png') no-repeat center center" id="trans_stroke"></div>
                <div style='background :red' id="red_stroke"></div>
                <div style='background :blue' id="blue_stroke"></div>
                <div style='background :black' id="black_stroke"></div>
                <div style='background :orange' id="orange_stroke"></div>
                <div style='background :green' id="green_stroke"></div>
                <div style='background :cyan' id="cyan_stroke"></div>
                <div style='background :Magenta' id="mag_stroke"></div>
                <div style='background :yellow'id="yellow_stroke"></div>
              </div>
            </div>
            <div>
              <label for='stroke_width'>Stroke:</label>
              <input type="number" name="stroke_width" id="stroke_width" value=0.002 step=0.0005 max=1 min=0></input>
              <span>in</span>
            </div>
            <div style="display:none">
              <label for='font_size'>Font Size:</label>
              <input type="number" name="font_size" id="font_size" value=9 min=0.5 max=30 step=0.5></input>
              <span>pt</span>
            </div>
            <div id="print" class="top_manu">
              <i class="material-icons">navigate_next</i>
              <p>Send To Laser Cutter!</p>
            </div>
          </div>

          <div class="PsPage PositionPage">
            <h2>VLS6.60 Control Panel</h2>
          </div>
          <div id="close">
          </div>
        </div>
        <div id="main">
          <div class="DesignPage">
            <div id="toolBar"  style="display: none">
              <i class="material-icons" id="move">open_with</i>
              <i class="material-icons" id="pencil">edit</i>
              <i class="material-icons" id="line">call_made</i>
              <i class="material-icons" id="multipolygon">signal_cellular_null</i>
              <i class="material-icons" id="rectangle">crop_5_4</i>
              <i class="material-icons" id="ellipse">panorama_fish_eye</i>
              <i class="material-icons" id="delete">delete</i>
              <i class="material-icons" id="text">title</i>
            </div>
            <div id="DesignCanvasContainer">
            </div>
          </div>
          <div class="PsPage">
            <div class="colorSelection" >
              <table>
                <tr id="t_header">
                  <th style="width: 20px"></th>
                  <th>Color</th>
                  <th >Mode</th>
                  <th >Power</th>
                  <th >Speed</th>
                  <th>Estimated Depth</th>
                </tr>
                <tr class="input-color" id="red">
                  <td>
                    <div class="color-box" style="background-color: red;"></div>
                  </td>
                  <td>
                    Red
                  </td>
                  <td>Rast/Vect</td>
                  <th><span id="redPower">50</span>%</th>
                  <th><span id="redSpeed">60</span>%</th>
                  <th><span id="redDepth">0.028</span>''</th>
                </tr>
                <tr class="input-color" id="blue" >
                  <td>
                    <div class="color-box" style="background-color: blue;"></div>
                  </td>
                  <td>
                    Blue
                  </td>
                  <td>Rast/Vect</td>
                  <th><span id="bluePower">50</span>%</th>
                  <th><span id="blueSpeed">60</span>%</th>
                  <th><span id="blueDepth">0.028</span>''</th>
                </tr>
                <tr class="input-color" id="black">
                  <td>
                    <div class="color-box" style="background-color: black;"></div>
                  </td>
                  <td>
                    Black
                  </td>
                  <td>Rast/Vect</td>
                  <th><span id="blackPower">50</span>%</th>
                  <th><span id="blackSpeed">60</span>%</th>
                  <th><span id="blackDepth">0.028</span>''</th>
                </tr>
                <tr class="input-color" id="orange">
                  <td>
                    <div class="color-box" style="background-color: orange;"></div>
                  </td>
                  <td>
                    Orange
                  </td>
                  <td>Rast/Vect</td>
                  <th><span id="orangePower">50</span>%</th>
                  <th><span id="orangeSpeed">60</span>%</th>
                  <th><span id="orangeDepth">0.028</span>''</th>
                </tr>
                <tr class="input-color" id="green">
                  <td>
                    <div class="color-box" style="background-color: green;"></div>
                  </td>
                  <td>
                    Green
                  </td>
                  <td>Rast/Vect</td>
                  <th><span id="greenPower">50</span>%</th>
                  <th><span id="greenSpeed">60</span>%</th>
                  <th><span id="greenDepth">0.028</span>''</th>
                </tr>
                <tr class="input-color" id="cyan">
                  <td>
                    <div class="color-box" style="background-color: cyan;"></div>
                  </td>
                  <td>
                    Cyan
                  </td>
                  <td>Rast/Vect</td>
                  <th><span id="cyanPower">50</span>%</th>
                  <th><span id="cyanSpeed">60</span>%</th>
                  <th><span id="cyanDepth">0.028</span>''</th>
                </tr>
                <tr class="input-color" id="magenta">
                  <td>
                    <div class="color-box" style="background-color: magenta;"></div>
                  </td>
                  <td>
                    Magenta
                  </td>
                  <td>Rast/Vect</td>
                  <th><span id="magentaPower">50</span>%</th>
                  <th><span id="magentaSpeed">60</span>%</th>
                  <th><span id="magentaDepth">0.028</span>''</th>
                </tr>
                <tr class="input-color" id="yellow" >
                  <td>
                    <div class="color-box" style="background-color: yellow;"></div>
                  </td>
                  <td>
                    Yellow
                  </td>
                  <td>Rast/Vect</td>
                  <th><span id="yellowPower">50</span>%</th>
                  <th><span id="yellowSpeed">60</span>%</th>
                  <th><span id="yellowDepth">0.028</span>''</th>
                </tr>
              </table>
            </div>

            <div class="sliders">
              <p style="width:80%">You are now setting: <b><span id="currentColor"></span></b></p>
              <div class="slideContainer">
                <h3>Power</h3>
                <div class="sliderDivide">
                  <input type="range" min="0" max="100" value="0" class="slider" id="powerRange">
                  <p>Value: <span id="demoPower"></span></p>
                </div>
              </div>

              <div class="slideContainer">
                <h3>Speed</h3>
                <div class="sliderDivide">
                  <input type="range" min="0" max="100" value="0" class="slider" id="speedRange">
                  <p>Value: <span id="demoSpeed"></span></p>
                </div>
              </div>
              <div>
                <div style="display:flex; flex-direction:row; margin-top:150px; margin-left:auto">
                  <button class="w3-btn w3-red w3-small w3-round w3-ripple" id="PsDefaultsButton">Defaults</button>
                  <button class="w3-btn w3-red w3-small w3-round w3-ripple" id="PsDoneButton">Done</button>
                </div>
              </div>
            </div>
          </div>
          <div class="PositionPage">
            <div id="PositionCanvasContainer"></div>
            <div id="PositionControl">
              <div class="item1">
                <i class="material-icons" id="start_button">play_circle_filled</i>
              </div>
              <div class="item2">
                <div style="text-align:center;width:400px;">
                  <i class="material-icons direction" id="up">keyboard_arrow_up</i><br>
                  <i class="material-icons direction"id="left" style="margin-right:30px">keyboard_arrow_left</i>
                  <i class="material-icons direction"id="right">keyboard_arrow_right</i><br>
                  <i class="material-icons direction"id="down">keyboard_arrow_down</i>
                </div>
              </div>
              <div class="item3">
                <button class="w3-btn w3-red  w3-medium w3-round w3-ripple" id="homeXY"style="margin-right:30px">Home xy</button>
                <button class="w3-btn w3-red w3-medium w3-round w3-ripple" id="homeZ" disabled>Home z</button>
              </div>
              <div class="item4">
                <button  class="w3-btn w3-red  w3-round w3-ripple choose_one" id="zoom" disabled>
                  <i class="material-icons">search</i>
                </button>
                <button  class="w3-btn w3-red  w3-round w3-ripple choose_one" id="nozzle">
                  <i class="material-icons">pin_drop</i>
                </button>
                <button  class="w3-btn w3-red  w3-round w3-ripple choose_one" id="relocate">
                  <i class='material-icons'>open_with</i>
                </button>
                <button  class="w3-btn w3-red  w3-round w3-ripple choose_one" id="copy" disabled>
                  <i class='material-icons'>collections</i>
                </button>
                <button  class="w3-btn w3-red  w3-round w3-ripple" id="timer_btn">0:00</button>
              </div>
              <div class="item5">
                <div id="timer"></div>
                <div id="xcoordinate"><p>X:   <span id="x_nozzle" stype="display:none">0</span><input id="x_i" stype="display:none"/>''</p></div>
                <div id="ycoordinate"><p>Y:   <span id="y_nozzle" stype="display:none">0</span><input id="y_i"stype="display:none"/>''</p></div>

              </div>
              <div class="item6">
                <button class="w3-btn w3-red  w3-round w3-small w3-ripple" id="start_text" >Start</button>
                <button class="w3-btn w3-red  w3-round w3-small w3-ripple" id="back">Back</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script type="text/javascript" src="../../intro/intro.js"></script>
</body>
</html>
