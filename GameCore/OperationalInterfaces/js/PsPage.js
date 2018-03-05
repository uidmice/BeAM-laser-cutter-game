$(document).ready(function(){
  var sliderPower = $("#powerRange");
  var outputPower = $("#demoPower");
  var sliderSpeed = $("#speedRange");
  var outputSpeed =$("#demoSpeed");
  var PsSelected = null;
  var PsUncomplete = [];

  $(".input-color").each(function(k,v){
    if(!checkInputComplete($(v).attr('id'))){
      PsUncomplete.push($(v).attr('id'));
    };
  })

  sliderPower.on("input", function() {
      outputPower.html($(this).val());
      $("#"+PsSelected+"Power").text($(this).val());
      if($.inArray(PsSelected, PsUncomplete)>-1){
        if(checkInputComplete(PsSelected)){
          PsUncomplete.splice( $.inArray(PsSelected, PsUncomplete), 1 );
        }
      }
  })
  sliderSpeed.on("input", function() {
      outputSpeed.html($(this).val());
      $("#"+PsSelected+"Speed").text($(this).val());
      if($.inArray(PsSelected, PsUncomplete)>-1){
        if(checkInputComplete(PsSelected)){
          PsUncomplete.splice( $.inArray(PsSelected, PsUncomplete), 1 );
        }
      }
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

  function checkInputComplete(color){
    if(color)
    {var target = $("#"+color);
    var power = target.find('span[id*="Power"]').html();
    var speed = target.find('span[id*="Speed"]').html();
    if((power=='')||(speed=='')){
      target.find(".material-icons").addClass('show');
      return false;}
    else {
      target.find(".material-icons").removeClass('show');
      return true;
    }}
  }

  $('#PsButton').click(function () {
    if (PsUncomplete.length>0){
      Confirm("","Please set the power and speed for all colors!","","Alright.");
    }else{
      Confirm('Make sure before you go!', 'Did you set power and speed correctly by color?', 'Yes, I am pretty sure', 'No, I have to make changes', 2);
    }
  });

})
