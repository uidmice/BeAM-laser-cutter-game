$(document).ready(function(){

    paper.setup('Canvas');

    pencil = new Tool();
    line = new Tool();


    var path=[];
    var temp;
    function onMouseDown(event) {
			temp = new Path();
      path.push(temp);
			temp.strokeColor = 'black';
			temp.add(event.point);
		}

    pencil.onMouseDown = onMouseDown;
    pencil.onMouseDrag = function(e){
      temp.add(e.point);
    }

    line.onMouseDown=onMouseDown;


});
