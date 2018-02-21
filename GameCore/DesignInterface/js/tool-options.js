$(document).ready(function(){
//Color choice
    var color_button =  $("#color");
    var black = $("<button id='black'>black</button>");
    var blue = $("<button id='blue'>blue</button>");
    var red = $("<button id='red'>red</button>");
    var color_dropdown = $('<div class="dropdown_content"></div>');
    var color_dropdown_holder = $("#color_dropdown");
    color_dropdown.append(black).append(blue).append(red);


    color_button.on("click", function(){
        $("#color_dropdown").append(color_dropdown);
        color_button.attr("class","clicked");
    })


    var colorhint = $("#colorhint");

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