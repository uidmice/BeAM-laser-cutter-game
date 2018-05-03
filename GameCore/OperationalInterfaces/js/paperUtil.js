function paperUtil( exports ) {

  exports.transformPath = function transformPath( pathStr, options, name ) {
    var path = new Path(pathStr);

    if(options){
      if(options.strokeColor){
        path.strokeColor = options.strokeColor
      }

      if(options.fillColor){
        path.fillColor = options.fillColor;
      }

      if(options.strokeWidth){
        path.strokeWidth = options.strokeWidth;
      }
    }

    if(name){
      path.name = name;
    }

    return path;

  }

  exports.transformCircle = function transformCircle ( cx, cy, r , options, name){
    var path = new Path.Circle(new Point(cx, cy), r);
    if(options){
      if(options.strokeColor){
        path.strokeColor = options.strokeColor
      }

      if(options.fillColor){
        path.fillColor = options.fillColor;
      }

      if(options.strokeWidth){
        path.strokeWidth = options.strokeWidth;
      }
    }
    if(name){
      path.name = name;
    }
    return  path;

  }

  exports.transformRect = function transformRect ( x, y, width , height, options, name){
    var path = new Path.Rectangle(new Point(x, y), new Point(x+width, y+height));
    if(options){
      if(options.strokeColor){
        path.strokeColor = options.strokeColor
      }

      if(options.fillColor){
        path.fillColor = options.fillColor;
      }

      if(options.strokeWidth){
        path.strokeWidth = options.strokeWidth;
      }
    }
    if(name){
      path.name = name;
    }
    return  path;

  }


}

var paperU = {};
paperUtil(paperU);
