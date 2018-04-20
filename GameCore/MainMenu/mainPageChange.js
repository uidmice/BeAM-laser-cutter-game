$(document).ready(function(){
//display project interface
    $('#projects').click(function(){
        $("#container0").addClass('blocked');
        $("#container1").removeClass("blocked");
    });

    $('#ProjectBack').click(function(){
        $("#container1").addClass('blocked');
        $("#container0").removeClass("blocked");
    });

//display starting story page
    $('#tutorial').click(function(){
        $("#container0").addClass('blocked');
        $("#container2").removeClass("blocked");
    });


});