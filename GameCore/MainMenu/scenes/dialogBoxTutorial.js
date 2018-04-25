$(document).ready(function(){
    var dialog_box = $('#dialogBox');
    var body = $('body');
    var char_head = $('#char_head');
    var menu = $('#menu');
    var container = $('#container');

    var count = 0;
    var lines;

//Read Lines

$.get('Lines/tutorialLines.txt', function(data){
    lines = data.split("\n");
        dialog_box.click(function () {
            if(count < lines.length) {
                if (count == 0) {
                    char_head.empty();
                    char_head.append('<div class="name">Hans</div>');
                }else{
                    dialog_box.empty();
                    dialog_box.append('<div id="lines">' + lines[count] + '</div>');

                }
                count++;
                //console.log(count);
            }else{
                container.empty();

            }
        });



});

        menu.append('<button type="button" class="button" id="skip">Skip</button>');
        menu.append('<button type="button" id="toReview" class="button" >Review</button>');
        menu.append('<a href="interface.html" id="continue" class="blocked" >Continue</a>')
        body.append('<button type="button" class="blocked" id="back">back</button>');

//Skip
    var skip_button = $('#skip');
    skip_button.click(function(){
        container.empty();
    })

//Review
    body.append('<div id="review" class="blocked"></div>');

    var back_button = $('#toReview');
        back_button.click(function(){
            container.addClass('blocked');
            $('#review').removeClass('blocked');
            $('#back').removeClass('blocked');
            for (var i = 0; i < count; i++){
                if(lines[i] == "Hans"){
                    $('#review').append('<div class="reviewedLines">'+'[Hans]:'+'</div>');
                }else{
                    $('#review').append('<div class="reviewedLines">' + ' &gt&gt ' +lines[i] + '</div>');
                }
            }
        })
//Back
        $('#back').click(function(){
            $('#review').addClass('blocked');
            container.removeClass('blocked');
            $('#back').addClass('blocked');
            $('#review').empty();
        })
    }
);

