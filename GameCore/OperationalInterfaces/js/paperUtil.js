function paperUtil( exports ) {
  var DEGS_TO_RADS = Math.PI / 180, UNIT_SIZE = 100;
  var DIGIT_0 = 48, DIGIT_9 = 57, COMMA = 44, SPACE = 32, PERIOD = 46, MINUS = 45;

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

  exports.transformPoly = function transformPoly ( pathStr, options, name){
    var path = new Path();
    var idx = 0, len = pathStr.length, x, y;
    function eatNum() {

      var sidx, c, isFloat = false, s;
      while ( idx < len ) {
        c = pathStr.charCodeAt( idx );
        if ( c !== COMMA && c !== SPACE ) break;
        idx ++;
      }

      if ( c === MINUS ) {
        sidx = idx ++;
      } else {
        sidx = idx;
      }

      // eat number

      while ( idx < len ) {

        c = pathStr.charCodeAt( idx );

        if ( DIGIT_0 <= c && c <= DIGIT_9 ) {

          idx ++;
          continue;

        } else if ( c === PERIOD && (!isFloat)) {

          idx ++;
          isFloat = true;
          continue;

        }

        s = pathStr.substring( sidx, idx );

        return isFloat ? parseFloat( s ) : parseInt( s );
      }

      s = pathStr.substring( sidx );
      return isFloat ? parseFloat( s ) : parseInt( s );
    }

    function nextIsNum() {

      var c;
      // do permanently eat any delims...
      while ( idx < len ) {
        c = pathStr.charCodeAt( idx );
        if ( c !== COMMA && c !== SPACE ) break;
        idx ++;
      }
      c = pathStr.charCodeAt( idx );
      return ( c === MINUS || ( DIGIT_0 <= c && c <= DIGIT_9 ) || c===PERIOD);

    }

    while ( idx <= len ){
      if(nextIsNum()){
        x = eatNum();
        y = eatNum();
        path.add(new Point(x,y));
      }else{
        path.closePath();
        break;
      }
    }

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
