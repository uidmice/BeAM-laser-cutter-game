$(document).ready(function(){
//display project interface
    $('#projects').click(function(){
        $("#container0").addClass('blocked');
        $("#container1").removeClass("blocked");
    });

    $('#back').click(function(){
        $("#container0").removeClass('blocked');
        $("#container1").addClass("blocked");
    });
//display starting story page
    $('#start').click(function(){
        $("#container0").addClass('blocked');
        $("#container2").removeClass("blocked");
    });


});