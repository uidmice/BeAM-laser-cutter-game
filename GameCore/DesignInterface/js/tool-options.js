$(document).ready(function(){
//Color choice
    var fillColor_button =  $("#fill_color");
    var black = $("<input type='color' value='#000000' disabled/>");
    var blue = $("<input type='color' value='#0000ff' disabled/>");
    var red = $("<input type='color' value='#ff0000' disabled/>");
    var tran = $("<input type='color' value='rgba(255,255,255,0)' disabled />");

    var fillColor_dropdown = $('<div class="dropdown"></div>');
    fillColor_dropdown.append(black).append(blue).append(red).append(tran);
    $("body").append(fillColor_dropdown);


    fillColor_button.on("click", function(){
        fillColor_dropdown.toggleClass("show");
    })

     black.click(function(){
        colorhint.attr('class','black');
     })

    blue.on("click",function(){
        colorhint.attr('class','blue');

    })

    red.on("click",function(){
        colorhint.attr('class','red');
    })
//Line Width Adjust
    var range = $('<input type="range" min="1" max="100" value="50" class="slider" id="lineRange">');
    var line_button = $('#line_width');
    var width_hint = $('#widthhint');

    line_button.on("click", function(){
        $("#line_dropdown").append(range);
        line_button.attr("class","clicked");
    })



        range.click(function(){
            width_hint.empty();
            width_hint.append(this.value);

    })

//Activate Undo
    var undo_button = $('#undo');

    undo_button.click(function(){
        undo();
    })


});
