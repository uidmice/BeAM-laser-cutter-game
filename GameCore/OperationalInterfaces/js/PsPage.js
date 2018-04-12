$(document).ready(function(){
  var sliderPower = $("#powerRange");
  var outputPower = $("#demoPower");
  var sliderSpeed = $("#speedRange");
  var outputSpeed =$("#demoSpeed");
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

  $('#PsOKButton').click(function () {
    var OK_win = $("<div></div>");
    OK_win.html("<p>Did you set power and speed correctly by color?</p>");
    var yesB = $("<button class='w3-button w3-white w3-border w3-border w3-round-large'>Yes</button>");
    yesB.css("margin","25px").click(function(){
      $("#PositionPage").css("z-index","5");
      $('#PsTab').removeClass('w3-red');
      $('#PositionTab').addClass('w3-red');
      close_pop_up();
    })
    var NoB = $("<button class='w3-button w3-white w3-border w3-border w3-round-large'>No</button>").css("margin","25px").click(function(){
      close_pop_up();
    });

    OK_win.append(yesB).append(NoB);

    pop_up_window("Make sure before you go!", OK_win, "170px","400px");
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

})
