$(document).ready(function(){
//display project interface
    $('#projects').click(function(){
        $("#container0").hide();
        $("#container1").show();
    });

    $('#ProjectBack').click(function(){
        $("#container1").hide();
        $("#container0").show();
    });

//display starting story page
    $('#tutorial').click(function(){
        $("#container0").hide();
        $("#container2").show('fade',500);

        $("#skip").click(function(){
          sendPHP('gameMode', 'tutorial');
        })

        $("#close_review").click(function(){
          $("#review").hide();
          $("#review .reviewedLines").remove();
          $(this).hide();
          $("#container2 .skipable").show();
        })

        var count = 0;
        var lines;
        $.get('mainMenu/Lines/startLines.txt', function(data){
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
          $("#container2 .skipable").hide();
          $("#review").show();
          $("#close_review").show();
          for (var i = 0; i < count; i++){
            if(lines[i] == "Hans"){
              $('#review').append('<div class="reviewedLines">'+'[Hans]:'+'</div>');
            }else{
              $('#review').append('<div class="reviewedLines">' + ' &gt&gt ' +lines[i] + '</div>');
            }
          }
        })



    });

    $("#new_design").click(function(){
      sendPHP("gameMode", "design");
    })
    $("#project1").click(function(){
      sendPHP("gameMode", "p1");
    })
    $("#project2").click(function(){
      sendPHP("gameMode", "p2");
    })
    $("#project3").click(function(){
      sendPHP("gameMode", "p3");
    })



});
