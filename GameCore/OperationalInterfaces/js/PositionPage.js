function initPositionPage(){
  $("#timer_btn").click(function(){
    var total_time_sec = 4080; //68 min
    var h = Math.floor(total_time_sec/3600);
    var m = Math.floor((total_time_sec%3600)/60);
    var s = (total_time_sec%3600)%60;
    var date = new Date()

    var dateToUse = new Date(date.getYear(), date.getMonth(), date.getDay(), h, m, s, 0);

    var hours = addZero(dateToUse.getHours());
    var minutes = addZero(dateToUse.getMinutes());
    var seconds = addZero(dateToUse.getSeconds());

    $("#timer").html(hours+":" + minutes + ":" + seconds).toggleClass('show');
    if($(this).hasClass("w3-brown")){
      $(this).removeClass("w3-brown");
      $(this).addClass("w3-red");
    }else{
      $(this).removeClass("w3-red");
      $(this).addClass("w3-brown");
    }
  })

  function addZero(i) {
      if (i < 10) {
          i = "0" + i;
      }
      return i;
  }

var board_topLeft = new Point(40,40);
var board_size = new Size(board_width/2.5, board_height/2.5);
stage = new Shape.Rectangle(board_topLeft,board_size);
stage.fillColor='white';
stage.guide=false;

var ruler=new Path();
ruler.add(project.view.bounds.topLeft);
ruler.add(project.view.bounds.topRight);

ruler.add(stage.bounds.topRight);
ruler.add(stage.bounds.topLeft);
ruler.add(stage.bounds.bottomLeft);
ruler.add(project.view.bounds.bottomLeft);
ruler.closed = true;
ruler.fillColor='black';


var grader1 = new Path();
var grader2 = new Path();
var grader3 = new Path();
var grader4 = new Path();
grader1.add(new Point(0,0), new Point(0,25));
grader2.add(new Point(PPI/5, 5), new Point(PPI/5, 25));
grader3.add(new Point(0,0), new Point(25,0));
grader4.add(new Point(5, PPI/5), new Point(25, PPI/5));
var twoGrader = new Group(grader1, grader2);
var twoGrader2 = new Group(grader4, grader3);
twoGrader.strokeWidth=1;
twoGrader.strokeColor = 'white';
twoGrader2.strokeWidth=1;
twoGrader2.strokeColor = 'white';

var graders_v = new Symbol(twoGrader);
var graders_h = new Symbol(twoGrader2);


for (i = 0; i<actual_size_w; i++){
  graders_v.place(new Point(i*PPI/2.5+40+PPI/10, 40-12.5));
  var text =new PointText(new Point(i*PPI/2.5+40-2, 14));
  text.fillColor='white';
  text.content = i;
}

for (i = 0; i<actual_size_h; i++){
  graders_h.place(new Point(40-12.5,i*PPI/2.5+40+PPI/10));
  var text =new PointText(new Point( 5,i*PPI/2.5+43));
  text.fillColor='white';
  text.content = i;
  text.rotate(270);
}


var pic = project.importSVG(temp_save);
var item = pic.rasterize(PPI);
pic.remove();
item.scale(0.4);


var item_w = item.bounds.width;
var item_h = item.bounds.height;

item.position=new Point(item_w/2+80, item_h/2+80);
item.selected = true;
update_position();


var relocate = new Tool();
var zoom = new Tool();
var zoom_fac = 1;

relocate.onMouseDown=function(e){
  if(e.point.isInside(item.bounds)){
    item.selected = true;
  }else{
    item.selected = false;
  }
}
relocate.onMouseDrag=function(e){
  if(item.selected){
    item.position.x+=e.delta.x;
    item.position.y+=e.delta.y;
    limit_position();
    update_position();
  }
}

relocate.onMouseMove=function(e){
  if(e.point.isInside(item.bounds)){
    $("body").css('cursor',"move");
  }else{
    $("body").css('cursor',"default");
  }
}

zoom.onMouseDown=function(e){
  zoom_fac *=1.05;
  project.view.center =e.point;
  console.log(e.point);
  project.view.zoom=zoom_fac;
  if(project.view.bounds.topLeft.x>0){
    project.view.bounds.topLeft.x=0;
  }
  if(project.view.bounds.topLeft.y>0){
    project.view.bounds.topLeft.y=0;
  }
}


relocate.activate();

$("#up").click(function(){
  move_by_px("Up",2);
  update_position();
})

$("#down").click(function(){
  move_by_px("Down",2);
  update_position();
})

$("#left").click(function(){
  move_by_px("Left",2);
  update_position();
})

$("#right").click(function(){
  move_by_px("Right",2);
  update_position();
})

$("#homeXY").click(function(){
  item.bounds.topLeft.x=40;
  item.bounds.topLeft.y=40;
  update_position();

})

$("#relocate").click(function(){
  relocate.activate();
  $("#zoom").removeClass("w3-brown").addClass("w3-red");
  $(this).removeClass("w3-red").addClass("w3-brown");

});

$("#zoom").click(function(){
  zoom.activate();
  $("#relocate").removeClass("w3-brown").addClass("w3-red");
  $(this).removeClass("w3-red").addClass("w3-brown");

});

$("#back").click(function(){
  $("#PositionPage").css("z-index","1");
  $('#PositionTab').removeClass('w3-red');
  $('#PsTab').addClass('w3-red');

})


function move_by_px(direction, delta){
  if(direction=="Up"){
    item.position.y-=delta;
  }else if (direction=="Down"){
    item.position.y+=delta;
  }else if (direction=="Left"){
    item.position.x-=delta;
  }else if(direction=="Right"){
    item.position.x+=delta;
  }
  limit_position();

}

function limit_position(){
  if(item.bounds.topLeft.x<40){
    item.bounds.topLeft.x=40;
  }
  if(item.bounds.topLeft.y<40){
    item.bounds.topLeft.y=40;
  }
  if(item.bounds.bottomRight.x>40+board_width/2.5-item_w/2){
    item.bounds.bottomRight.x=40+board_width/2.5-item_w/2;
  }
  if(item.bounds.bottomRight.y>40+board_height/2.5-item_h/2){
    item.bounds.bottomRight.y=40+board_height/2.5-item_h/2;
  }
}

function update_position(){
  $("#xdemo").html(Number((item.bounds.topLeft.x-40)/PPI*2.5).toFixed(3));
  $("#ydemo").html(Number((item.bounds.topLeft.y-40)/PPI*2.5).toFixed(3));
}
















}
