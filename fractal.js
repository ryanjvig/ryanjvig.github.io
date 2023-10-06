/*
 * The Mandelbrot Set, in HTML5 canvas and javascript.
 * https://github.com/cslarsen/mandelbrot-js
 *
 * Copyright (C) 2012, 2018 Christian Stigen Larsen
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.  You may obtain
 * a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 */


// Complex number class inspired by https://web.archive.org/web/20131012072444/http://janhartigan.com/articles/creating-a-javascript-complex-number-class
// Performs better than mathjs library, which has easy-to-use support for complex numbers and operations but appears to be relatively slow
function ComplexNumber(real, imag) {
  this.real = real;
  this.imag = imag;
}
ComplexNumber.prototype = {
  real: 0, // real part
  imag: 0, // imaginary part
  /**
   * The add operation which sums the real and complex parts separately
   * 
   * @param ==>   If there is one argument, assume it's a ComplexNumber
   *              If there are two arguments, assume the first is the real part and the second is the imaginary part
   * 
   */
  add: function() {
    if(arguments.length == 1) {
      return new ComplexNumber(this.real + arguments[0].real, this.imag + arguments[0].imag);
    }
    else {
      return new ComplexNumber(this.real + arguments[0], this.imag + arguments[1]);
    }
  },
  /**
   * The subtract operation which subtracts the real and complex parts from one another separately
   * 
   * @param ==>   If there is one argument, assume it's a ComplexNumber
   *              If there are two arguments, assume the first is the real part and the second is the imaginary part
   * 
   */
  sub: function() {
    if(arguments.length == 1) {
      return new ComplexNumber(this.real - arguments[0].real, this.imag - arguments[0].imag);
    }
    else {
      return new ComplexNumber(this.real - arguments[0], this.imag - arguments[1]);
    }
  },
  /**
   * The multiplication operation which multiplies two complex numbers
   * 
   * @param ==>   If there is one argument, assume it's a ComplexNumber
   *              If there are two, assume the first is the real part and the second is the imaginary part
   * 
   */
  mult: function() {
    var multiplier = arguments[0];
    if(arguments.length != 1) {
        multiplier = new ComplexNumber(arguments[0], arguments[1]);
    }
    return new ComplexNumber((this.real * multiplier.real) - (this.imag * multiplier.imag),
                             (this.real * multiplier.imag) + (this.imag * multiplier.real));
  },
  /**
   * The division operation which divides two complex numbers
   * (Not mentioned in the linked blog post)
   * 
   * @param ==>   If there is one argument, assume it's a ComplexNumber
   *              If there are two, assume the first is the real part and the second is the imaginary part
   * 
   */
  div: function() {
    var divisor = arguments[0];
    if(arguments.length != 1) {
        divisor = new ComplexNumber(arguments[0], arguments[1]);
    }
    return new ComplexNumber(((this.real * divisor.real) + (this.imag * divisor.imag)) / ((divisor.real * divisor.real) + (divisor.imag * divisor.imag)),
                             ((this.imag * divisor.real) - (this.real * divisor.imag)) / ((divisor.real * divisor.real) + (divisor.imag * divisor.imag)));
  },
  /**
   * returns "this" exponentiated
   */
  exp: function() {
    var mod = Math.exp(this.real);
    return new ComplexNumber(mod * Math.cos(this.imag), mod * Math.sin(this.imag));
  },
  /**
   * returns sin of "this"
   */
  sin: function() {
    return new ComplexNumber(Math.sin(this.real) * Math.cosh(this.imag), Math.cos(this.real) * Math.sinh(this.imag));
  },
  /**
   * returns cos of "this"
   */
  cos: function() {
    return new ComplexNumber(Math.cos(this.real) * Math.cosh(this.imag), -1 * Math.sin(this.real) * Math.sinh(this.imag));
  },
  /**
   * returns sinh of "this"
   */
  sinh: function() {
    return new ComplexNumber(Math.sinh(this.real) * Math.cos(this.imag), Math.cosh(this.real) * Math.sin(this.imag));
  },
  /**
   * returns cosh of "this"
   */
  cosh: function() {
    return new ComplexNumber(Math.cosh(this.real) * Math.cos(this.imag), Math.sinh(this.real) * Math.sin(this.imag));
  },
}

// enum for operation types
const OperationType = {
  Add: 'a',
  Subtract: 's',
  Multiply: 'm',
  Divide: 'd',
  Exp: 'e',
  Sin: 'si',
  Cos: 'c',
  Sinh: 'sh',
  Cosh: 'ch',
}

// stores operation data
function Operation(type, val) {
  this.type = type;
  this.val = val;
}

// performs op (of type Operation) on num, substituting in baseVal if op has value 'b'
function performOperation(num, op, baseVal) {
  switch(op.type) {
    case OperationType.Add : {
      if (op.val == 'b') {
        return num.add(baseVal)
      }
      return num.add(op.val);
    }
    case OperationType.Subtract : {
      if (op.val == 'b') {
        return num.add(baseVal)
      }
      return num.sub(op.val);
    }
    case OperationType.Multiply : {
      if (op.val == 'b') {
        return num.mult(baseVal)
      }
      return num.mult(op.val);
    }
    case OperationType.Divide : {
      if (op.val == 'b') {
        return num.div(baseVal)
      }
      return num.div(op.val);
    }
    case OperationType.Exp : {
      return baseVal.exp();
    }
    case OperationType.Sin : {
      return baseVal.sin();
    }
    case OperationType.Sinh : {
      return baseVal.sinh();
    }
    case OperationType.Cos : {
      return baseVal.cos();
    }
    case OperationType.Cosh : {
      return baseVal.cosh();
    }
  }
}

function getOperations(terms) {
  termOperations = [];
  terms.forEach(function(term, index) {
    operations = [];
    cur_ind = 0;
    if (term[0] == '-') {
      operations.push(new Operation(OperationType.Multiply, new ComplexNumber(-1, 0)));
      cur_ind++;
    }
    var coeff_real = '';
    var coeff_imag = '';
    if (term[cur_ind] == '(') {
        cur_ind++;
        var coeff_one = '';
        var coeff_two = '';
        while(('0' <= term[cur_ind] && term[cur_ind] <= '9') || term[cur_ind] == '.') {
          coeff_one += term[cur_ind];
          cur_ind++;
        }
        if(term[cur_ind] == 'i') {
          cur_ind++;
        }
        cur_ind++;
        while(('0' <= term[cur_ind] && term[cur_ind] <= '9') || term[cur_ind] == '.') {
          coeff_two += term[cur_ind];
          cur_ind++;
        }
        if(term[cur_ind] == 'i') {
          cur_ind += 2;
          coeff_real = coeff_one;
          coeff_imag = coeff_two;
        }
        else {
          cur_ind++;
          coeff_real = coeff_two;
          coeff_imag = coeff_one;
        }
    }
    else {
      while(cur_ind < term.length && (('0' <= term[cur_ind] && term[cur_ind] <= '9') || term[cur_ind] == '.')) {
        coeff_real += term[cur_ind];
        cur_ind++;
      }
    }
    if (coeff_real.length != 0 || coeff_imag.length != 0) {
      if(coeff_real.length == 0) {
        coeff_real = '0';
      }
      else if(coeff_imag.length == 0) {
        coeff_imag = '0';
      }
      operations.push(new Operation(OperationType.Multiply, new ComplexNumber(parseFloat(coeff_real), parseFloat(coeff_imag))));
    }
    // TODO: add support for symbolic constants and powers of symbols (e.g. e, sin, cos, etc.)
    // has variable
    if(cur_ind < term.length) {
      switch(term[cur_ind]) {
        // some power of function variable
        case 'z' : {
          cur_ind += 2;
          var power = 1;
          if(cur_ind < term.length) {
            power = parseInt(term[cur_ind]);
          }
          for(var i = 0; i < power; i++) {
            operations.push(new Operation(OperationType.Multiply, 'b'));
          }
        } break;
        // e^z
        case 'e' : {
          operations.push(new Operation(OperationType.Exp, 0));
        } break;
        // sin(z) or sinh(z)
        case 's' : {
          // sinh
          if (term[cur_ind+3] == 'h') {
            operations.push(new Operation(OperationType.Sinh, 0));
          }
          // sin
          else {
            operations.push(new Operation(OperationType.Sin, 0));
          }
        } break;
        // cos(z) or cosh(z)
        case 'c' : {
          // cosh
          if (term[cur_ind+3] == 'h') {
            operations.push(new Operation(OperationType.Cosh, 0));
          }
          // cos
          else {
            operations.push(new Operation(OperationType.Cos, 0));
          }
        } break;
      }
    }
    termOperations.push(operations);
  })
  return termOperations;
}

function getComplex(term) {
  var realPart = '';
  var imagPart = '';
  var partOne = '';
  var partTwo = '';
  var curInd = 0;
  while(curInd < term.length && ('0' <= term[curInd] && term[curInd] <= '9') || term[curInd] == '.') {
    partOne += term[curInd];
    curInd++;
  }
  if(curInd < term.length) {
    // currently at '+' or 'i' if has two parts
    if(term[curInd] == 'i') {
      // lets 'i' alone be '1i'
      if(partOne.length == 0) {
        partOne = '1';
      }
      curInd++;
    }
    curInd++;
    while(('0' <= term[curInd] && term[curInd] <= '9') || term[curInd] == '.') {
      partTwo += term[curInd];
      curInd++;
    }
    // if not at end, must be at 'i'
    if(curInd < term.length) {
      if(partTwo.length == 0) {
        partTwo = '1';
      }
      realPart = partOne;
      imagPart = partTwo;
    }
    else {
      realPart = partTwo;
      imagPart = partOne;
    }
  }
  else {
    realPart = partOne;
  }
  if(realPart.length == 0) {
    realPart = '0';
  }
  if(imagPart.length == 0) {
    imagPart = '0';
  }
  return new ComplexNumber(parseFloat(realPart), parseFloat(imagPart));
}

/*
 * Global variables:
 */
var mod = 1e9+7;
var divergenceLimit = 2147483648;
var zoomStart = 15.0;
var zoom = [zoomStart, zoomStart];
var lookAtDefault = [0, 0];
var lookAt = lookAtDefault;
var xRange = [-10, 10];
var yRange = [-10, 10];
var tolerance = 0.00001;
var precision = 5;
var max_iterations = 50;
var scalar = new ComplexNumber(1, 0);
var offset = new ComplexNumber(0, 0);
var interiorColor = [0, 0, 0, 255];
var reInitCanvas = true; // whether to reload canvas size, etc
var dragToZoom = true;
var colors = [[0,0,0,0]];
var renderId = 0; // to zoom before current render is finished
var debugIters = 0;
var rootMap = new Map();
var expression = "z^3-1";
var derivative = "3z^2";
var expressionTerms = ['z^3','-1'];
var expressionTermOps = [[new Operation(OperationType.Multiply, 'b'), new Operation(OperationType.Multiply, 'b')],[new Operation(OperationType.Multiply, new ComplexNumber(-1, 0))]];
var derivativeTerms = ['3z^2'];
var derivativeTermOps = [[new Operation(OperationType.Multiply, 3), new Operation(OperationType.Multiply, 'b')]];
var windowResized = false
math.config({
  number: 'BigNumber' // switches notation to decimal rather than fraction
})


/*
 * Initialize canvas
 */
var canvas = $('canvasFractal');
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
//
var ccanvas = $('canvasControls');
ccanvas.width  = window.innerWidth;
ccanvas.height = window.innerHeight;
//
var ctx = canvas.getContext('2d');
var img = ctx.createImageData(canvas.width, 1);

/*
 * Just a shorthand function: Fetch given element, jQuery-style
 */
function $(id)
{
  return document.getElementById(id);
}

function focusOnSubmit()
{
  var e = $('submitButton');
  if ( e ) e.focus();
}

function getColorPicker()
{
  var p = $("colorScheme").value;
  // consider adding more options
  if ( p == "pickColorColor" ) return pickColorColor;
  return pickColorGrayscale;
}

function functionAt(num)
{
    var base = new ComplexNumber(num.real, num.imag);
    var terms = [];
    expressionTermOps.forEach(function(operationSet, index) {
      var tempNum = new ComplexNumber(1, 0);
      operationSet.forEach(function(operation, index) {
        tempNum = performOperation(tempNum, operation, base);
      });
      terms.push(tempNum);
    });
    var res = new ComplexNumber(0, 0);
    terms.forEach(function(term, index) {
      res = res.add(term);
    });
    return res;
}
function derivAt(num) 
{
    var base = new ComplexNumber(num.real, num.imag);
    var terms = [];
    derivativeTermOps.forEach(function(operationSet, index) {
      var tempNum = new ComplexNumber(1, 0);
      operationSet.forEach(function(operation, index) {
        tempNum = performOperation(tempNum, operation, base);
      });
      terms.push(tempNum);
    });
    var res = new ComplexNumber(0, 0);
    terms.forEach(function(term, index) {
      res = res.add(term);
    });
    return res;
}

/*
 * Main renderer equation.
 *
 * Returns number of iterations and values of function at the time
 * we either converged or reached max iterations.  
 * We use these to determined the color at the current pixel.
 */

function iterateEquation(realStart, imagStart)
{
  var curNum = new ComplexNumber(realStart, imagStart);
  var curTop = new ComplexNumber(tolerance, tolerance);
  var curBot = new ComplexNumber(1.0, 1.0);
  var cur_iteration = 0;
  for ( ; cur_iteration < max_iterations && (Math.abs(curTop.real) >= tolerance || Math.abs(curTop.imag) >= tolerance); ++cur_iteration ) {
    curTop = functionAt(curNum);
    curBot = derivAt(curNum);
    var diff = curTop.div(curBot);
    diff = diff.mult(scalar);
    curNum = curNum.sub(diff);
    curNum = curNum.add(offset);
  }
  // ensures divergence is marked as not converging (using the inverse comparison appears necessary to avoid false positives with large numbers)
  if(!(Math.abs(curTop.real) < tolerance && Math.abs(curTop.imag) < tolerance)) {
    cur_iteration = max_iterations;
  }
  return [cur_iteration, curNum.real, curNum.imag];
}

/*
 * Update small info box in lower right hand side
 */
function updateInfoBox()
{
  // Update infobox
  $('infoBox').innerHTML =
    'x<sub>0</sub>=' + xRange[0] + ' y<sub>0</sub>=' + yRange[0] + ' ' +
    'x<sub>1</sub>=' + xRange[1] + ' y<sub>1</sub>=' + yRange[1] + ' ' +
    'w&#10799;h=' + canvas.width + 'x' + canvas.height + ' '
        + (canvas.width*canvas.height/1000000.0).toFixed(1) + 'MP';
}

/*
 * Return number with metric units
 */
function metric_units(number)
{
  var unit = ["", "k", "M", "G", "T", "P", "E"];
  var mag = Math.ceil((1+Math.log(number)/Math.log(10))/3);
  return "" + (number/Math.pow(10, 3*(mag-1))).toFixed(2) + unit[mag];
}

/*
 * Adjust aspect ratio based on plot ranges and canvas dimensions.
 */
function adjustAspectRatio(xRange, yRange, canvas)
{
  var rangeRatio = Math.abs(xRange[1]-xRange[0]) / Math.abs(yRange[1]-yRange[0]);
  var sratio = canvas.width / canvas.height;
  if ( sratio > rangeRatio ) {
    var xf = sratio / rangeRatio;
    xRange[0] *= xf;
    xRange[1] *= xf;
      zoom[0] *= xf;
  } else {
    var yf = rangeRatio / sratio;
    yRange[0] *= yf;
    yRange[1] *= yf;
      zoom[1] *= yf;
  }
}

/*
 * Render the Mandelbrot set
 */
function draw(pickColor)
{

  if ( lookAt === null ) lookAt = lookAtDefault;
  if ( zoom === null ) zoom = [zoomStart, zoomStart];
  var centerVal = math.complex($('center').value);
  lookAt = [centerVal.re, centerVal.im];

  zoom = [parseFloat($('width').value), parseFloat($('height').value)];

  xRange = [lookAt[0]-zoom[0]/2, lookAt[0]+zoom[0]/2];
  yRange = [lookAt[1]-zoom[1]/2, lookAt[1]+zoom[1]/2];

  if(($('isSquare').checked && canvas.width != canvas.height) || windowResized) {
    windowResized = false;
    reInitCanvas = true;
  }

  if ( reInitCanvas ) {
    reInitCanvas = false;

    canvas = $('canvasFractal');
    if ($('isSquare').checked) {
      canvas.width = Math.min(window.innerWidth, window.innerHeight);
      canvas.height = Math.min(window.innerWidth, window.innerHeight);
    } else {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    ccanvas = $('canvasControls');
    ccanvas.width  = window.innerWidth;
    ccanvas.height = window.innerHeight;

    ctx = canvas.getContext('2d');
    img = ctx.createImageData(canvas.width, 1);

    adjustAspectRatio(xRange, yRange, canvas);
  }

  max_iterations = parseInt($('steps').value, 10);
  precision = parseInt($('precision').value, 10);
  if(precision <= 0) {
    tolerance = '1';
    for(var i = 0; i > precision; i--) {
      tolerance += '0';
    }
  }
  else {
    tolerance = '0.'
    for(var i = 0; i < precision; i++) {
      tolerance += '0';
    }
    tolerance += '1';
  }
  tolerance = parseFloat(tolerance);
  scalar = getComplex($('scalar').value);
  offset = getComplex($('offset').value);

  // parse function expression
  expression = $('function').value;
  expression = math.parse(expression);
  derivative = math.derivative(expression, 'z'); // set derivative here to best ensure proper evaluation
  expression = math.format(expression, {'notation': 'fixed'}).replace(/[\s\*]/g,'');
  expressionTerms = expression.match(/(\+|\-)?[a-z0-9.^]+/gi);
  expressionTermOps = getOperations(expressionTerms);
  // parse function derivative
  derivative = math.format(derivative, {'notation': 'fixed'}).replace(/[\s\*]/g,'');
  derivativeTerms = derivative.match(/(\+|\-)?[a-z0-9.^]+/gi);
  derivativeTermOps = getOperations(derivativeTerms);

  var dx = (xRange[1] - xRange[0]) / (0.5 + (canvas.width-1));
  var Ci_step = (yRange[1] - yRange[0]) / (0.5 + (canvas.height-1));

  updateInfoBox();

  // Only enable one render at a time
  renderId += 1;

  function drawLine(Ci, off, Cr_init, Cr_step)
  {
    var Cr = Cr_init;

    for ( var x=0; x<canvas.width; ++x, Cr += Cr_step ) {
      var p = iterateEquation(Cr, Ci);
      var color = pickColor(p[0], p[1], p[2]);
      img.data[off++] = color[0];
      img.data[off++] = color[1];
      img.data[off++] = color[2];
      img.data[off++] = 255;
    }
  }

  function drawSolidLine(y, color)
  {
    var off = y*canvas.width;

    for ( var x=0; x<canvas.width; ++x ) {
      img.data[off++] = color[0];
      img.data[off++] = color[1];
      img.data[off++] = color[2];
      img.data[off++] = color[3];
    }
  }

  function render()
  {
    var start  = (new Date).getTime();
    var startHeight = canvas.height;
    var startWidth = canvas.width;
    var lastUpdate = start;
    var updateTimeout = parseFloat($('updateTimeout').value);
    var pixels = 0;
    var Ci = yRange[0];
    var sy = 0;
    var ourRenderId = renderId;

    var scanline = function()
    {
      if (    renderId != ourRenderId ||
           startHeight != canvas.height ||
            startWidth != canvas.width )
      {
        // Stop drawing
        return;
      }

      drawLine(Ci, 0, xRange[0], dx);
      Ci += Ci_step;
      pixels += canvas.width;
      ctx.putImageData(img, 0, sy);

      var now = (new Date).getTime();

      /*
       * Javascript is inherently single-threaded, and the way
       * you yield thread control back to the browser is MYSTERIOUS.
       *
       * People seem to use setTimeout() to yield, which lets us
       * make sure the canvas is updated, so that we can do animations.
       *
       * But if we do that for every scanline, it will take 100x longer
       * to render everything, because of overhead.  So therefore, we'll
       * do something in between.
       */
      if ( sy++ < canvas.height ) {
        if ( (now - lastUpdate) >= updateTimeout ) {
          // show the user where we're rendering
          drawSolidLine(0, [255,59,3,255]);
          ctx.putImageData(img, 0, sy);

          // update speed and time taken
          var elapsedMS = now - start;
          $('renderTime').innerHTML = (elapsedMS/1000.0).toFixed(1); // 1 comma

          var speed = Math.floor(pixels / elapsedMS);

          if ( metric_units(speed).substr(0,3)=="NaN" ) {
            speed = Math.floor(60.0*pixels / elapsedMS);
            $('renderSpeedUnit').innerHTML = 'minute';
          } else
            $('renderSpeedUnit').innerHTML = 'second';

          $('renderSpeed').innerHTML = metric_units(speed);

          // yield control back to browser, so that canvas is updated
          lastUpdate = now;
          setTimeout(scanline, 0);
        } else
          scanline();
      }
    };

    // disallow redrawing while rendering
    scanline();
  }

  render();
}

function pickColorColor(n, realPart, imagPart)
{
  if ( n == max_iterations ) // did not converge
    return interiorColor;

  var key = realPart.toFixed(Math.max(precision-1, 0)).replace(/^-([.0]*)$/, '$1') + ',' + imagPart.toFixed(Math.max(precision-1, 0)).replace(/^-([.0]*)$/, '$1');
  if (rootMap.has(key) == false) {  
    rootMap.set(key, Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255));
    console.log(`root val not found, setting new key val. realPart=${realPart}, imagPart=${imagPart}, key=${key}. color=${rootMap.get(key)}, iterations=${n}`);
  }
  var c = rootMap.get(key).split(',');
  c[0] = Math.floor((0.5 + (0.5 - (n / max_iterations))) * c[0]);
  c[1] = Math.floor((0.5 + (0.5 - (n / max_iterations))) * c[1]);
  c[2] = Math.floor((0.5 + (0.5 - (n / max_iterations))) * c[2]);
  return c;
}

function pickColorGrayscale(n, realPart, imagPart)
{
  if ( n == max_iterations ) // did not converge
    return interiorColor;

  var v = Math.floor((1 - (n / max_iterations)) * 255);
  return [v, v, v, 255];
}

function main()
{
  $('savePNG').onclick = function(event)
  {
    window.location.href = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
  };

  $('resetButton').onclick = function(event)
  {
    $('settingsForm').reset();
    zoom = [zoomStart, zoomStart];
    lookAt = lookAtDefault;
    reInitCanvas = true;
    draw(getColorPicker());
  };

  if ( dragToZoom == true ) {
    var box = null;

    $('canvasControls').onmousedown = function(e)
    {
      if ( box == null )
        box = [e.clientX, e.clientY, 0, 0];
    }

    $('canvasControls').onmousemove = function(e)
    {
      if ( box != null ) {
        var c = ccanvas.getContext('2d');
        c.lineWidth = 1;

        // clear out old box first
        c.clearRect(0, 0, ccanvas.width, ccanvas.height);

        // draw new box
        c.strokeStyle = '#FF3B03';
        box[2] = e.clientX;
        box[3] = e.clientY;
        c.strokeRect(box[0], box[1], box[2]-box[0], box[3]-box[1]);
      }
    }

    var zoomOut = function(event) {
      var x = event.clientX;
      var y = event.clientY;

      var dx = (xRange[1] - xRange[0]) / (0.5 + (canvas.width-1));
      var dy = (yRange[1] - yRange[0]) / (0.5 + (canvas.height-1));

      x = xRange[0] + x*dx;
      y = yRange[0] + y*dy;

      lookAt = [x, y];

      if ( event.shiftKey ) {
        zoom[0] /= 0.5;
        zoom[1] /= 0.5;
      }

      draw(getColorPicker());
    };

    $('canvasControls').onmouseup = function(e)
    {
      if ( box != null ) {
        // zoom out?
        if ( e.shiftKey ) {
          box = null;
          zoomOut(e);
          return;
        }

        /*
         * Clear entire canvas
         */

        var c = ccanvas.getContext('2d');
        c.clearRect(0, 0, ccanvas.width, ccanvas.height);

        /*
         * Calculate new rectangle to render
         */

        var x = Math.min(box[0], box[2]) + Math.abs(box[0] - box[2]) / 2.0;
        var y = Math.min(box[1], box[3]) + Math.abs(box[1] - box[3]) / 2.0;

        var dx = (xRange[1] - xRange[0]) / (0.5 + (canvas.width-1));
        var dy = (yRange[1] - yRange[0]) / (0.5 + (canvas.height-1));

        x = xRange[0] + x*dx;
        y = yRange[0] + y*dy;

        lookAt = [x, y];

        /*
         * This whole code is such a mess ...
         */

        var xf = Math.abs((box[0]-box[2]) / canvas.width);
        var yf = Math.abs((box[1]-box[3]) / canvas.height);

        // retain aspect ratio (this is why initial zoom is not zoomStart on first render)
        zoom[0] *= Math.max(xf, yf); 
        zoom[1] *= Math.max(xf, yf);

        box = null;

        // update client-facing values, 
        $('center').value = math.complex(x, y).toString();
        $('width').value = zoom[0].toString();
        $('height').value = zoom[1].toString();
        draw(getColorPicker());
      }
    }
  }

  /*
   * Enable zooming (currently, the zooming is inexact!) Click to zoom;
   * perfect to mobile phones, etc.
   */
  if ( dragToZoom == false ) {
    $('canvasFractal').onclick = function(event)
    {
      var x = event.clientX;
      var y = event.clientY;

      var dx = (xRange[1] - xRange[0]) / (0.5 + (canvas.width-1));
      var dy = (yRange[1] - yRange[0]) / (0.5 + (canvas.height-1));

      x = xRange[0] + x*dx;
      y = yRange[0] + y*dy;

      lookAt = [x, y];

      if ( event.shiftKey ) {
        zoom[0] *= 2.0;
        zoom[1] *= 2.0;
      } else {
        zoom[0] *= 0.5;
        zoom[1] *= 0.5;
      }

      draw(getColorPicker());
    };
  }

  /*
   * When resizing the window, be sure to update all the canvas stuff.
   */

  window.onresize = function(event)
  {
    windowResized = true;
  };

  /*
   * Render at page load.
   */

  draw(getColorPicker());
}

main();