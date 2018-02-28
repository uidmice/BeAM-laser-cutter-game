var width = document.getElementById('canvas').clientWidth;
var height = document.getElementById('canvas').clientHeight;

var finalX;
var finalY;
var finalWidth;
var finalHeight;

var expandFlag = false;

var cur_imgW;
var cur_imgH;

var back = $("#back");
back.click(function(){
  window.location.href="SpInterface.html";
})

function update(activeAnchor) {
    var group = activeAnchor.getParent();

    var topLeft = group.get('.topLeft')[0];
    var topRight = group.get('.topRight')[0];
    var bottomRight = group.get('.bottomRight')[0];
    var bottomLeft = group.get('.bottomLeft')[0];
    var image = group.get('Image')[0];

    var anchorX = activeAnchor.getX();
    var anchorY = activeAnchor.getY();

    // update anchor positions
    switch (activeAnchor.getName()) {
        case 'topLeft':
            topRight.setY(anchorY);
            bottomLeft.setX(anchorX);
            break;
        case 'topRight':
            topLeft.setY(anchorY);
            bottomRight.setX(anchorX);
            break;
        case 'bottomRight':
            bottomLeft.setY(anchorY);
            topRight.setX(anchorX);
            break;
        case 'bottomLeft':
            bottomRight.setY(anchorY);
            topLeft.setX(anchorX);
            break;
    }

    image.position(topLeft.position());

    var width = topRight.getX() - topLeft.getX();
    var height = bottomLeft.getY() - topLeft.getY();
    if(width && height) {
        image.width(width);
        image.height(height);
    }

    cur_imgW = width;
    cur_imgH = height;

    document.getElementById('img_width').innerHTML = "Image width:   " + cur_imgW;
    document.getElementById('img_height').innerHTML = "Image height:   " + cur_imgH;
}

function addAnchor(group, x, y, name) {
    var stage = group.getStage();
    var layer = group.getLayer();

    var anchor = new Konva.Circle({
        x: x,
        y: y,
        stroke: '#666',
        fill: '#ddd',
        strokeWidth: 2,
        radius: 5,
        name: name,
        draggable: true,
        dragOnTop: false
    });

    anchor.on('dragmove', function() {
        update(this);
        layer.draw();
    });
    anchor.on('mousedown touchstart', function() {
        group.setDraggable(false);
        this.moveToTop();
    });
    anchor.on('dragend', function() {
        group.setDraggable(true);
        layer.draw();
    });
    // add hover styling
    anchor.on('mouseover', function() {
        var layer = this.getLayer();
        document.body.style.cursor = 'pointer';
        this.setStrokeWidth(4);
        layer.draw();
    });
    anchor.on('mouseout', function() {
        var layer = this.getLayer();
        document.body.style.cursor = 'default';
        this.setStrokeWidth(2);
        layer.draw();
    });

    group.add(anchor);
    layer.draw();
}




var stage = new Konva.Stage({
    container: 'canvas',
    width: width,
    height: height
});

var layer = new Konva.Layer();
stage.add(layer);



//add grid
var STEP_SIZE = 15;
var line;

// generate lines
for (var ix = 1; ix < width; ix=ix+STEP_SIZE) {

    line = new Konva.Line({
        points: [ix, 0, ix, height],
        stroke: 'gray',
        strokeWidth: 0.5,
        opacity: 0.5
    });
    layer.add(line);
}

for (var iy = 1; iy < height; iy=iy+STEP_SIZE) {

    line = new Konva.Line({
        points: [0, iy, width, iy],
        stroke: 'gray',
        strokeWidth: 0.5,
        opacity: 0.2
    });
    layer.add(line);
}
layer.draw();


var Img = new Konva.Image({
});

var ImgGroup = new Konva.Group({
    x: 0,
    y: 0,
    draggable: true,
    listening: true
});

var imageObj = new Image();

imageObj.src = 'images/IMG_2010.svg';

imageObj.onload = function() {
    Img.image(imageObj);
    layer.draw();
    document.getElementById('img_width').innerHTML = "Image width:   " + imageObj.width;
    document.getElementById('img_height').innerHTML = "Image height:   " + imageObj.height;
};


layer.add(ImgGroup);
ImgGroup.add(Img);

document.getElementById('resize').addEventListener('click', function() {
    if(!expandFlag){
        addAnchor(ImgGroup, 0, 0, 'topLeft');
        addAnchor(ImgGroup, imageObj.width, 0, 'topRight');
        addAnchor(ImgGroup, imageObj.width, imageObj.height, 'bottomRight');
        addAnchor(ImgGroup, 0, imageObj.height, 'bottomLeft');
        expandFlag = true;
    }
}, false);



ImgGroup.on('dragmove', function updateText() {
    if(expandFlag){
        document.getElementById('xcoordinate').innerHTML = "X:   " + (ImgGroup.x() + ImgGroup.get('.topLeft')[0].x());
        document.getElementById('ycoordinate').innerHTML = "Y:   " + (ImgGroup.y() + ImgGroup.get('.topLeft')[0].y());
    }else{
        document.getElementById('xcoordinate').innerHTML = "X:   " + ImgGroup.x();
        document.getElementById('ycoordinate').innerHTML = "Y:   " + ImgGroup.y();
    }

});


// add cursor styling
Img.on('mouseover', function() {
    document.body.style.cursor = 'move';
});
Img.on('mouseout', function() {
    document.body.style.cursor = 'default';
});


document.getElementById('homeXY').addEventListener('click', function() {
    ImgGroup.x(0);
    ImgGroup.y(0);

    layer.draw();

    document.getElementById('xcoordinate').innerHTML = "X:   " + (ImgGroup.x());
    document.getElementById('ycoordinate').innerHTML = "Y:   " + (ImgGroup.y());
}, false);


document.getElementById('up').addEventListener('click', function() {
    ImgGroup.x(ImgGroup.x());
    ImgGroup.y(ImgGroup.y()-1);

    layer.draw();

    if(expandFlag){
        document.getElementById('xcoordinate').innerHTML = "X:   " + (ImgGroup.x() + ImgGroup.get('.topLeft')[0].x());
        document.getElementById('ycoordinate').innerHTML = "Y:   " + (ImgGroup.y() + ImgGroup.get('.topLeft')[0].y());
    }else{
        document.getElementById('xcoordinate').innerHTML = "X:   " + ImgGroup.x();
        document.getElementById('ycoordinate').innerHTML = "Y:   " + ImgGroup.y();
    }
}, false);

document.getElementById('down').addEventListener('click', function() {
    ImgGroup.x(ImgGroup.x());
    ImgGroup.y(ImgGroup.y()+1);

    layer.draw();

    if(expandFlag){
        document.getElementById('xcoordinate').innerHTML = "X:   " + (ImgGroup.x() + ImgGroup.get('.topLeft')[0].x());
        document.getElementById('ycoordinate').innerHTML = "Y:   " + (ImgGroup.y() + ImgGroup.get('.topLeft')[0].y());
    }else{
        document.getElementById('xcoordinate').innerHTML = "X:   " + ImgGroup.x();
        document.getElementById('ycoordinate').innerHTML = "Y:   " + ImgGroup.y();
    }
}, false);

document.getElementById('left').addEventListener('click', function() {
    ImgGroup.x(ImgGroup.x()-1);
    ImgGroup.y(ImgGroup.y());

    layer.draw();

    if(expandFlag){
        document.getElementById('xcoordinate').innerHTML = "X:   " + (ImgGroup.x() + ImgGroup.get('.topLeft')[0].x());
        document.getElementById('ycoordinate').innerHTML = "Y:   " + (ImgGroup.y() + ImgGroup.get('.topLeft')[0].y());
    }else{
        document.getElementById('xcoordinate').innerHTML = "X:   " + ImgGroup.x();
        document.getElementById('ycoordinate').innerHTML = "Y:   " + ImgGroup.y();
    }
}, false);

document.getElementById('right').addEventListener('click', function() {
    ImgGroup.x(ImgGroup.x()+1);
    ImgGroup.y(ImgGroup.y());

    layer.draw();

    if(expandFlag){
        document.getElementById('xcoordinate').innerHTML = "X:   " + (ImgGroup.x() + ImgGroup.get('.topLeft')[0].x());
        document.getElementById('ycoordinate').innerHTML = "Y:   " + (ImgGroup.y() + ImgGroup.get('.topLeft')[0].y());
    }else{
        document.getElementById('xcoordinate').innerHTML = "X:   " + ImgGroup.x();
        document.getElementById('ycoordinate').innerHTML = "Y:   " + ImgGroup.y();
    }
}, false);



document.getElementById('start_button').addEventListener('click', function() {
    var r;
    if(expandFlag){
        if(cur_imgH !== undefined && cur_imgW !== undefined){
            r = confirm("Your image's topleft position is\nX:   " + (ImgGroup.x() + ImgGroup.get('.topLeft')[0].x()) +
                "\nY:   " + (ImgGroup.y() + ImgGroup.get('.topLeft')[0].y()) + ";\nYour image's size is\nwidth:   "
                + cur_imgW + "\nheight:   " + cur_imgH +
                ".\nYou cannot change these parameters after you click OK.")
            if(r){
                finalX = (ImgGroup.x() + ImgGroup.get('.topLeft')[0].x());
                finalY = (ImgGroup.y() + ImgGroup.get('.topLeft')[0].y());
                finalWidth = cur_imgW;
                finalHeight = cur_imgH;
            }
        }else{
            r = confirm("Your image's topleft position is\nX:   " + (ImgGroup.x()) +
                "\nY:   " + (ImgGroup.y()) + ";\nYour image's size is\nwidth:   "
                + imageObj.width + "\nheight:   " + imageObj.height +
                ".\nYou cannot change these parameters after you click OK.")
            if(r){
                finalX = (ImgGroup.x());
                finalY = (ImgGroup.y());
                finalWidth = imageObj.width;
                finalHeight = imageObj.height;
            }
        }
    }else{
        r = confirm("Your image's topleft position is\nX:   " + (ImgGroup.x()) +
            "\nY:   " + (ImgGroup.y()) + ";\nYour image's size is\nwidth:   "
            + imageObj.width + "\nheight:   " + imageObj.height +
            ".\nYou cannot change these parameters after you click OK.")
        if(r){
            finalX = (ImgGroup.x());
            finalY = (ImgGroup.y());
            finalWidth = imageObj.width;
            finalHeight = imageObj.height;
        }
    }

    console.log(finalX);
    console.log(finalY);
    console.log(finalWidth);
    console.log(finalHeight);
}, false);




document.getElementById('start_text').addEventListener('click', function() {
    var r;
    if(expandFlag){
        if(cur_imgH !== undefined && cur_imgW !== undefined){
            r = confirm("Your image's topleft position is\nX:   " + (ImgGroup.x() + ImgGroup.get('.topLeft')[0].x()) +
                "\nY:   " + (ImgGroup.y() + ImgGroup.get('.topLeft')[0].y()) + ";\nYour image's size is\nwidth:   "
                + cur_imgW + "\nheight:   " + cur_imgH +
                ".\nYou cannot change these parameters after you click OK.")
            if(r){
                finalX = (ImgGroup.x() + ImgGroup.get('.topLeft')[0].x());
                finalY = (ImgGroup.y() + ImgGroup.get('.topLeft')[0].y());
                finalWidth = cur_imgW;
                finalHeight = cur_imgH;
            }
        }else{
            r = confirm("Your image's topleft position is\nX:   " + (ImgGroup.x()) +
                "\nY:   " + (ImgGroup.y()) + ";\nYour image's size is\nwidth:   "
                + imageObj.width + "\nheight:   " + imageObj.height +
                ".\nYou cannot change these parameters after you click OK.")
            if(r){
                finalX = (ImgGroup.x());
                finalY = (ImgGroup.y());
                finalWidth = imageObj.width;
                finalHeight = imageObj.height;
            }
        }
    }else{
        r = confirm("Your image's topleft position is\nX:   " + (ImgGroup.x()) +
            "\nY:   " + (ImgGroup.y()) + ";\nYour image's size is\nwidth:   "
            + imageObj.width + "\nheight:   " + imageObj.height +
            ".\nYou cannot change these parameters after you click OK.")
        if(r){
            finalX = (ImgGroup.x());
            finalY = (ImgGroup.y());
            finalWidth = imageObj.width;
            finalHeight = imageObj.height;
        }
    }

    console.log(finalX);
    console.log(finalY);
    console.log(finalWidth);
    console.log(finalHeight);
}, false);
