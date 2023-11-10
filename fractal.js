/*
 * Newton fractal generator, in HTML5 canvas and javascript.
 * Link to repository: https://gitlab.eecs.umich.edu/logm/fa23/newton-method-23/newton-method
 * Link to original work this is based on (Mandelbrot set visualizer): https://github.com/cslarsen/mandelbrot-js
 *
 * Copyright (C) 2023 Ryan Vig
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
function ComplexNumber (real, imag) {
  this.real = real
  this.imag = imag
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
  add: function () {
    if (arguments.length === 1) {
      return new ComplexNumber(
        this.real + arguments[0].real,
        this.imag + arguments[0].imag
      )
    } else {
      return new ComplexNumber(
        this.real + arguments[0],
        this.imag + arguments[1]
      )
    }
  },
  /**
   * The subtract operation which subtracts the real and complex parts from one another separately
   *
   * @param ==>   If there is one argument, assume it's a ComplexNumber
   *              If there are two arguments, assume the first is the real part and the second is the imaginary part
   *
   */
  sub: function () {
    if (arguments.length === 1) {
      return new ComplexNumber(
        this.real - arguments[0].real,
        this.imag - arguments[0].imag
      )
    } else {
      return new ComplexNumber(
        this.real - arguments[0],
        this.imag - arguments[1]
      )
    }
  },
  /**
   * The multiplication operation which multiplies two complex numbers
   *
   * @param ==>   If there is one argument, assume it's a ComplexNumber
   *              If there are two, assume the first is the real part and the second is the imaginary part
   *
   */
  mult: function () {
    let multiplier = arguments[0]
    if (arguments.length !== 1) {
      multiplier = new ComplexNumber(arguments[0], arguments[1])
    }
    return new ComplexNumber(
      this.real * multiplier.real - this.imag * multiplier.imag,
      this.real * multiplier.imag + this.imag * multiplier.real
    )
  },
  /**
   * The division operation which divides two complex numbers
   * (Not mentioned in the linked blog post)
   *
   * @param ==>   If there is one argument, assume it's a ComplexNumber
   *              If there are two, assume the first is the real part and the second is the imaginary part
   *
   */
  div: function () {
    let divisor = arguments[0]
    if (arguments.length !== 1) {
      divisor = new ComplexNumber(arguments[0], arguments[1])
    }
    return new ComplexNumber(
      (this.real * divisor.real + this.imag * divisor.imag) /
        (divisor.real * divisor.real + divisor.imag * divisor.imag),
      (this.imag * divisor.real - this.real * divisor.imag) /
        (divisor.real * divisor.real + divisor.imag * divisor.imag)
    )
  },
  /**
   * returns "this" exponentiated
   */
  exp: function () {
    const mod = Math.exp(this.real)
    return new ComplexNumber(
      mod * Math.cos(this.imag),
      mod * Math.sin(this.imag)
    )
  },
  /**
   * returns sin of "this"
   */
  sin: function () {
    return new ComplexNumber(
      Math.sin(this.real) * Math.cosh(this.imag),
      Math.cos(this.real) * Math.sinh(this.imag)
    )
  },
  /**
   * returns cos of "this"
   */
  cos: function () {
    return new ComplexNumber(
      Math.cos(this.real) * Math.cosh(this.imag),
      -1 * Math.sin(this.real) * Math.sinh(this.imag)
    )
  },
  /**
   * returns sinh of "this"
   */
  sinh: function () {
    return new ComplexNumber(
      Math.sinh(this.real) * Math.cos(this.imag),
      Math.cosh(this.real) * Math.sin(this.imag)
    )
  },
  /**
   * returns cosh of "this"
   */
  cosh: function () {
    return new ComplexNumber(
      Math.cosh(this.real) * Math.cos(this.imag),
      Math.sinh(this.real) * Math.sin(this.imag)
    )
  }
}

// Custom class for quaternion arithmetic

function QuaternionNumber (a, b, c, d) {
  this.a = a
  this.b = b
  this.c = c
  this.d = d
}
QuaternionNumber.prototype = {
  a: 0,
  b: 0,
  c: 0,
  d: 0,
  /**
   * Addition operation - takes either 1 argument (Quaternion number), or 4 arguments (a, b, c, d)
   */
  add: function () {
    if (arguments.length === 1) {
      return new QuaternionNumber(
        this.a + arguments[0].a,
        this.b + arguments[0].b,
        this.c + arguments[0].c,
        this.d + arguments[0].d
      )
    } else {
      return new QuaternionNumber(
        this.a + arguments[0],
        this.b + arguments[1],
        this.c + arguments[2],
        this.d + arguments[3]
      )
    }
  },
  /**
   * Subtraction operation - takes either 1 argument (Quaternion number), or 4 arguments (a, b, c, d)
   */
  sub: function () {
    if (arguments.length === 1) {
      return new QuaternionNumber(
        this.a - arguments[0].a,
        this.b - arguments[0].b,
        this.c - arguments[0].c,
        this.d - arguments[0].d
      )
    } else {
      return new QuaternionNumber(
        this.a - arguments[0],
        this.b - arguments[1],
        this.c - arguments[2],
        this.d - arguments[3]
      )
    }
  },
  /**
   * Hamilton product - takes either 1 argument (Quaternion number), or 4 arguments (a, b, c, d)
   */
  mult: function () {
    let multiplier = arguments[0]
    if (arguments.length !== 1) {
      multiplier = new QuaternionNumber(
        arguments[0],
        arguments[1],
        arguments[2],
        arguments[3]
      )
    }
    return new QuaternionNumber(
      this.a * multiplier.a -
        this.b * multiplier.b -
        this.c * multiplier.c -
        this.d * multiplier.d,
      this.a * multiplier.b +
        this.b * multiplier.a +
        this.c * multiplier.d -
        this.d * multiplier.c,
      this.a * multiplier.c -
        this.b * multiplier.d +
        this.c * multiplier.a +
        this.d * multiplier.b,
      this.a * multiplier.d +
        this.b * multiplier.c -
        this.c * multiplier.b +
        this.d * multiplier.a
    )
  },
  /**
   * Division operation (Hamilton product of 'this' and reciprocal of given quaternion number) - takes either 1 argument (Quaternion number), or 4 arguments (a, b, c, d)
   */
  div: function () {
    let divisor = arguments[0]
    if (arguments.length !== 1) {
      divisor = new QuaternionNumber(
        arguments[0],
        arguments[1],
        arguments[2],
        arguments[3]
      )
    }
    const commonDivisor =
      divisor.a * divisor.a +
      divisor.b * divisor.b +
      divisor.c * divisor.c +
      divisor.d * divisor.d
    const resA =
      (divisor.a * this.a +
        divisor.b * this.b +
        divisor.c * this.c +
        divisor.d * this.d) /
      commonDivisor
    const resB =
      (divisor.a * this.b -
        divisor.b * this.a -
        divisor.c * this.d +
        divisor.d * this.c) /
      commonDivisor
    const resC =
      (divisor.a * this.c +
        divisor.b * this.d -
        divisor.c * this.a -
        divisor.d * this.b) /
      commonDivisor
    const resD =
      (divisor.a * this.d -
        divisor.b * this.c +
        divisor.c * this.b -
        divisor.d * this.a) /
      commonDivisor
    return new QuaternionNumber(resA, resB, resC, resD)
  },
  /**
   * returns "this" exponentiated
   */
  exp: function () {
    const lhs = new QuaternionNumber(Math.exp(this.a), 0, 0, 0)
    if (debugIters < 10) {
      debugIters++
    }
    const mod = Math.sqrt(this.b * this.b + this.c * this.c + this.d * this.d)
    const cosRes = Math.cos(mod)
    const sinRes = Math.sin(mod)
    let divProd = new QuaternionNumber(0, this.b, this.c, this.d).div(
      mod,
      0,
      0,
      0
    )
    divProd = divProd.mult(sinRes, 0, 0, 0, 0)
    const rhs = new QuaternionNumber(cosRes, 0, 0, 0).add(divProd)
    const res = lhs.mult(rhs)
    return res
  },
  /**
   * returns sin of "this"
   */
  sin: function () {
    return new QuaternionNumber(0, 0, 0, 0)
  },
  /**
   * returns cos of "this"
   */
  cos: function () {
    return new QuaternionNumber(0, 0, 0, 0)
  },
  /**
   * returns sinh of "this"
   */
  sinh: function () {
    return new QuaternionNumber(0, 0, 0, 0)
  },
  /**
   * returns cosh of "this"
   */
  cosh: function () {
    return new QuaternionNumber(0, 0, 0, 0)
  }
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
  Cosh: 'ch'
}

// stores operation data
function Operation (type, val) {
  this.type = type
  this.val = val
}

// performs op (of type Operation) on num, substituting in baseVal if op has value 'b'
function performOperation (num, op, baseVal) {
  switch (op.type) {
    case OperationType.Add: {
      if (op.val === 'b') {
        return num.add(baseVal)
      }
      return num.add(op.val)
    }
    case OperationType.Subtract: {
      if (op.val === 'b') {
        return num.add(baseVal)
      }
      return num.sub(op.val)
    }
    case OperationType.Multiply: {
      if (op.val === 'b') {
        return num.mult(baseVal)
      }
      return num.mult(op.val)
    }
    case OperationType.Divide: {
      if (op.val === 'b') {
        return num.div(baseVal)
      }
      return num.div(op.val)
    }
    case OperationType.Exp: {
      return baseVal.exp()
    }
    case OperationType.Sin: {
      return baseVal.sin()
    }
    case OperationType.Sinh: {
      return baseVal.sinh()
    }
    case OperationType.Cos: {
      return baseVal.cos()
    }
    case OperationType.Cosh: {
      return baseVal.cosh()
    }
  }
}

function getComplex (term) {
  let realPart = ''
  let imagPart = ''
  let partOne = ''
  let partTwo = ''
  let curInd = 0
  while (
    (curInd < term.length && term[curInd] >= '0' && term[curInd] <= '9') ||
    term[curInd] === '.'
  ) {
    partOne += term[curInd]
    curInd++
  }
  if (curInd < term.length) {
    // currently at '+' or 'i' if has two parts
    if (term[curInd] !== 'i') {
      // lets 'i' alone be '1i'
      if (partOne.length === 0) {
        partOne = '1'
      }
      curInd++
    }
    curInd++
    while (
      (term[curInd] >= '0' && term[curInd] <= '9') ||
      term[curInd] === '.'
    ) {
      partTwo += term[curInd]
      curInd++
    }
    // if not at end, must be at 'i'
    if (curInd < term.length) {
      if (partTwo.length === 0) {
        partTwo = '1'
      }
      realPart = partOne
      imagPart = partTwo
    } else {
      realPart = partTwo
      imagPart = partOne
    }
  } else {
    realPart = partOne
  }
  if (realPart.length === 0) {
    realPart = '0'
  }
  if (imagPart.length === 0) {
    imagPart = '0'
  }
  return new ComplexNumber(parseFloat(realPart), parseFloat(imagPart))
}

/*
 * Global variables
 */
const mod = 1e9 + 7
const divergenceLimit = 2147483648
const zoomStart = 15.0
let zoom = [zoomStart, zoomStart]
const lookAtDefault = [0, 0]
let lookAt = lookAtDefault
let xRange = [-10, 10]
let yRange = [-10, 10]
let tolerance = 0.00001
let precision = 5
let maxIterations = 50
let scalar = new ComplexNumber(1, 0)
let offset = new ComplexNumber(0, 0)
let gridScale = 100
let quaternionC = 0
let quaternionD = 0
const interiorColor = [0, 0, 0, 255]
let reInitCanvas = true // whether we fully reinitialize canvas on redraw
const dragToZoom = true
const colors = [[0, 0, 0, 0]]
let renderId = 0 // to zoom before current render is finished
let debugIters = 0 // specifies number of times we want to print log statements when debugging
const rootMap = new Map()
const pointRootMap = new Map()
let expression = 'z^3-1'
let derivative = '3z^2'
let expressionTerms = ['z^3', '-1']
let expressionTermOps = [
  [
    new Operation(OperationType.Multiply, 'b'),
    new Operation(OperationType.Multiply, 'b')
  ],
  [new Operation(OperationType.Multiply, new ComplexNumber(-1, 0))]
]
let derivativeTerms = ['3z^2']
let derivativeTermOps = [
  [
    new Operation(OperationType.Multiply, 3),
    new Operation(OperationType.Multiply, 'b')
  ]
]
let windowResized = false
const compTolerance = Number.EPSILON
let novaMode = false
let quaternionMode = false
math.config({
  number: 'BigNumber' // switches expression notation to decimal rather than fraction (for string parsing)
})

// initialize canvas
let canvas = $('canvasFractal')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let ccanvas = $('canvasControls')
ccanvas.width = window.innerWidth
ccanvas.height = window.innerHeight

let ctx = canvas.getContext('2d')
let img = ctx.createImageData(canvas.width, 1)

// box counting method to compute fractal dimension
function boxCounting (fractalPoints, gridSizeX, gridSizeY) {
  console.log(`pointRootMap size: ${pointRootMap.size}`)
  let count = 0
  let curBoxes = 0
  const totalBoxes = gridScale * gridScale
  for (let x = 0; curBoxes < totalBoxes; x += gridSizeX) {
    curImag = 0
    const curEnd = curBoxes + gridScale
    for (let y = 0; curBoxes < curEnd; y += gridSizeY, curBoxes++) {
      const box = {
        minX: x,
        minY: y,
        maxX: x + gridSizeX,
        maxY: y + gridSizeY
      }

      const boxContainsPoint = fractalPoints.some(
        (point) =>
          point[0] >= box.minX &&
          point[0] <= box.maxX &&
          point[1] >= box.minY &&
          point[1] <= box.maxY
      )

      if (boxContainsPoint) {
        count++
      }
    }
  }
  return count
}

// finds points on fractal boundary in canvas
// a point is considered on the boundary if it neighbors a point that converges to a different root under Newton's method
function findFractalPoints () {
  const boundaryPoints = []
  const imagStep = (yRange[1] - yRange[0]) / (0.5 + (canvas.height - 1))
  const realStep = (xRange[1] - xRange[0]) / (0.5 + (canvas.width - 1))
  let Ci = 0
  let Cr = 0
  for (let y = 0; y < canvas.height; y++, Ci += imagStep) {
    Cr = 0
    for (let x = 0; x < canvas.width; x++, Cr += realStep) {
      const key =
        x.toString() +
        ',' +
        y.toString()
      let mapVal
      if (pointRootMap.has(key) === false) {
        mapVal = '0'
      } else {
        mapVal = pointRootMap.get(key)
      }
      let compKey
      if (x + 1 < canvas.width) {
        compKey =
          (x + 1).toString() +
          ',' +
          y.toString()
        let compVal
        if (pointRootMap.has(compKey) === false) {
          compVal = '0'
        } else {
          compVal = pointRootMap.get(compKey)
        }
        if (mapVal !== compVal) {
          boundaryPoints.push([x, y])
          continue
        }
      }
      if (x > 0) {
        compKey =
          (x - 1).toString() +
          ',' +
          y.toString()
        let compVal
        if (pointRootMap.has(compKey) === false) {
          compVal = '0'
        } else {
          compVal = pointRootMap.get(compKey)
        }
        if (mapVal !== compVal) {
          boundaryPoints.push([x, y])
          continue
        }
      }
      if (y + 1 < canvas.height) {
        compKey =
          x.toString() +
          ',' +
          (y + 1).toString()
        let compVal
        if (pointRootMap.has(compKey) === false) {
          compVal = '0'
        } else {
          compVal = pointRootMap.get(compKey)
        }
        if (mapVal !== compVal) {
          boundaryPoints.push([x, y])
          continue
        }
      }
      if (y > 0) {
        compKey =
          x.toString() +
          ',' +
          (y - 1).toString()
        let compVal
        if (pointRootMap.has(compKey) === false) {
          compVal = '0'
        } else {
          compVal = pointRootMap.get(compKey)
        }
        if (mapVal !== compVal) {
          boundaryPoints.push([x, y])
          continue
        }
      }
    }
  }
  return boundaryPoints
}

// finds estimate of current canvas's fractal dimension
function calculateFractalDimension (gridSizeX, gridSizeY) {
  // identify points on fractal boundary
  const fractalPoints = findFractalPoints()
  // count number of boxes with point in fractal boundary
  const boxCount = boxCounting(fractalPoints, gridSizeX, gridSizeY)
  // box-counting dimension (or Minkowski–Bouligand dimension) is defined as the limit of log(N(epsilon)) / log(1/epsilon) as epsilon approaches 0
  // where epsilon is the proportion of the total canvas height/weight each box is,
  // and where N(epsilon) is the box count of the canvas parameterized by epsilon
  // more info on this topic here: https://en.wikipedia.org/wiki/Minkowski%E2%80%93Bouligand_dimension
  // since gridScale is the number of boxes it takes to cover the width of the canvas, gridScale = (1 / epsilon) in our case
  let fractalDimension = Math.log(boxCount) / Math.log(gridScale)
  if (boxCount === 0) {
    fractalDimension = 0
  }
  console.log(`boundary points length: ${fractalPoints.length}, boxCount: ${boxCount}, epsilon val: ${1 / gridScale}, fractalDimension: ${fractalDimension}`)
  return fractalDimension
}

// parses operation chain from terms
function getOperations (terms) {
  termOperations = []
  terms.forEach(function (term, index) {
    operations = []
    curIndex = 0
    if (term[0] === '-') {
      if (quaternionMode) {
        operations.push(
          new Operation(
            OperationType.Multiply,
            new QuaternionNumber(-1, 0, 0, 0)
          )
        )
      } else {
        operations.push(
          new Operation(OperationType.Multiply, new ComplexNumber(-1, 0))
        )
      }
      curIndex++
    } else if (term[0] === '+') {
      curIndex++
    }
    let coeffReal = ''
    let coeffImag = ''
    if (term[curIndex] === '(') {
      curIndex++
      let coeffOne = ''
      let coeffTwo = ''
      while (
        (term[curIndex] >= '0' && term[curIndex] <= '9') ||
        term[curIndex] === '.'
      ) {
        coeffOne += term[curIndex]
        curIndex++
      }
      if (term[curIndex] === 'i') {
        curIndex++
      }
      curIndex++
      while (
        (term[curIndex] >= '0' && term[curIndex] <= '9') ||
        term[curIndex] === '.'
      ) {
        coeffTwo += term[curIndex]
        curIndex++
      }
      if (term[curIndex] === 'i') {
        curIndex += 2
        coeffReal = coeffOne
        coeffImag = coeffTwo
      } else {
        curIndex++
        coeffReal = coeffTwo
        coeffImag = coeffOne
      }
    } else {
      while (
        curIndex < term.length &&
        ((term[curIndex] >= '0' && term[curIndex] <= '9') || term[curIndex] === '.')
      ) {
        coeffReal += term[curIndex]
        curIndex++
      }
    }
    if (coeffReal.length !== 0 || coeffImag.length !== 0) {
      if (coeffReal.length === 0) {
        coeffReal = '0'
      } else if (coeffImag.length === 0) {
        coeffImag = '0'
      }
      if (quaternionMode) {
        operations.push(
          new Operation(
            OperationType.Multiply,
            new QuaternionNumber(
              parseFloat(coeffReal),
              parseFloat(coeffImag),
              0,
              0
            )
          )
        )
      } else {
        operations.push(
          new Operation(
            OperationType.Multiply,
            new ComplexNumber(parseFloat(coeffReal), parseFloat(coeffImag))
          )
        )
      }
    }
    // TODO: add support for symbolic constants and powers of symbols (e.g. e, sin, cos, etc.)
    // has variable
    if (curIndex < term.length) {
      switch (term[curIndex]) {
        // some power of function variable
        case 'z':
          {
            curIndex += 2
            let power = 1
            if (curIndex < term.length) {
              let powStr = ''
              while (
                curIndex < term.length &&
                term[curIndex] !== '-' &&
                term[curIndex] !== '+'
              ) {
                powStr += term[curIndex]
                curIndex++
              }
              power = parseInt(powStr)
            }
            for (let i = 0; i < power; i++) {
              operations.push(new Operation(OperationType.Multiply, 'b'))
            }
          }
          break
        // e^z
        case 'e':
          operations.push(new Operation(OperationType.Exp, 0))
          break
        // sin(z) or sinh(z)
        case 's':
          if (term[curIndex + 3] === 'h') {
            operations.push(new Operation(OperationType.Sinh, 0))
          } else {
            operations.push(new Operation(OperationType.Sin, 0))
          }
          break
        // cos(z) or cosh(z)
        case 'c':
          if (term[curIndex + 3] === 'h') {
            operations.push(new Operation(OperationType.Cosh, 0))
          } else {
            operations.push(new Operation(OperationType.Cos, 0))
          }
          break
      }
    }
    termOperations.push(operations)
  })
  return termOperations
}

/*
 * fetch given element, jQuery-style (quality of life)
 */
function $ (id) {
  return document.getElementById(id)
}

function focusOnSubmit () {
  const e = $('submitButton')
  if (e) e.focus()
}

function getColorPicker () {
  const p = $('colorScheme').value
  if (p === 'pickColorColor') return pickColorColor
  return pickColorGrayscale
}

function functionAt (num) {
  let base
  if (quaternionMode) {
    base = new QuaternionNumber(num.a, num.b, num.c, num.d)
  } else {
    base = new ComplexNumber(num.real, num.imag)
  }
  const terms = []
  expressionTermOps.forEach(function (operationSet, index) {
    let tempNum
    if (quaternionMode) {
      tempNum = new QuaternionNumber(1, 0, 0, 0)
    } else {
      tempNum = new ComplexNumber(1, 0)
    }
    operationSet.forEach(function (operation, index) {
      tempNum = performOperation(tempNum, operation, base)
    })
    terms.push(tempNum)
  })
  let res
  if (quaternionMode) {
    res = new QuaternionNumber(0, 0, 0, 0)
  } else {
    res = new ComplexNumber(0, 0)
  }
  terms.forEach(function (term, index) {
    res = res.add(term)
  })
  return res
}
function derivAt (num) {
  let base
  if (quaternionMode) {
    base = new QuaternionNumber(num.a, num.b, num.c, num.d)
  } else {
    base = new ComplexNumber(num.real, num.imag)
  }
  const terms = []
  derivativeTermOps.forEach(function (operationSet, index) {
    let tempNum
    if (quaternionMode) {
      tempNum = new QuaternionNumber(1, 0, 0, 0)
    } else {
      tempNum = new ComplexNumber(1, 0)
    }
    operationSet.forEach(function (operation, index) {
      tempNum = performOperation(tempNum, operation, base)
    })
    terms.push(tempNum)
  })
  let res
  if (quaternionMode) {
    res = new QuaternionNumber(0, 0, 0, 0)
  } else {
    res = new ComplexNumber(0, 0)
  }
  terms.forEach(function (term, index) {
    res = res.add(term)
  })
  return res
}

/*
 * returns number of iterations and values of function at the time
 * we either converged (or diverged if finding nova fractal) or reached max iterations
 * we use these to determined the color at the current pixel
 */

function iterateEquation (realStart, imagStart) {
  let curNum
  let curTop
  let curBot
  let quatScalar
  let quatOffset
  if (quaternionMode) {
    curNum = new QuaternionNumber(
      realStart,
      imagStart,
      quaternionC,
      quaternionD
    )
    curTop = new QuaternionNumber(tolerance, tolerance, tolerance, tolerance)
    curBot = new QuaternionNumber(1.0, 1.0, 1.0, 1.0)
    quatScalar = new QuaternionNumber(scalar.real, scalar.imag, 0, 0)
    quatOffset = new QuaternionNumber(offset.real, offset.imag, 0, 0)
  } else {
    curNum = new ComplexNumber(realStart, imagStart)
    curTop = new ComplexNumber(tolerance, tolerance)
    curBot = new ComplexNumber(1.0, 1.0)
  }
  let curIteration = 0
  if (novaMode) {
    if (quaternionMode) {
      for (
        ;
        curIteration < maxIterations &&
        (Math.abs(curTop.a) <= tolerance ||
          Math.abs(curTop.b) <= tolerance ||
          Math.abs(curTop.c) <= tolerance ||
          Math.abs(curTop.d) <= tolerance);
        ++curIteration
      ) {
        curTop = functionAt(curNum)
        curBot = derivAt(curNum)
        let diff = curTop.div(curBot)
        diff = diff.mult(quatScalar)
        curNum = curNum.sub(diff)
        curNum = curNum.add(quatOffset)
      }
    } else {
      for (
        ;
        curIteration < maxIterations &&
        (Math.abs(curTop.real) <= tolerance ||
          Math.abs(curTop.imag) <= tolerance);
        ++curIteration
      ) {
        curTop = functionAt(curNum)
        curBot = derivAt(curNum)
        let diff = curTop.div(curBot)
        diff = diff.mult(scalar)
        curNum = curNum.sub(diff)
        curNum = curNum.add(offset)
      }
    }
  } else {
    if (quaternionMode) {
      for (
        ;
        curIteration < maxIterations &&
        (Math.abs(curTop.a) >= tolerance ||
          Math.abs(curTop.b) >= tolerance ||
          Math.abs(curTop.c) >= tolerance ||
          Math.abs(curTop.d) >= tolerance);
        ++curIteration
      ) {
        curTop = functionAt(curNum)
        curBot = derivAt(curNum)
        let diff = curTop.div(curBot)
        diff = diff.mult(quatScalar)
        curNum = curNum.sub(diff)
      }
    } else {
      for (
        ;
        curIteration < maxIterations &&
        (Math.abs(curTop.real) >= tolerance ||
          Math.abs(curTop.imag) >= tolerance);
        ++curIteration
      ) {
        curTop = functionAt(curNum)
        curBot = derivAt(curNum)
        let diff = curTop.div(curBot)
        diff = diff.mult(scalar)
        curNum = curNum.sub(diff)
      }
    }
  }
  // ensures divergence is marked as not converging (using the inverse comparison appears necessary to avoid false positives with large numbers)
  if (novaMode) {
    if (quaternionMode) {
      if (
        !(
          Math.abs(curTop.a) >= tolerance &&
          Math.abs(curTop.b) >= tolerance &&
          Math.abs(curTop.c) >= tolerance &&
          Math.abs(curTop.d) >= tolerance
        )
      ) {
        curIteration = maxIterations
      }
    } else if (
      !(
        Math.abs(curTop.real) >= tolerance && Math.abs(curTop.imag) >= tolerance
      )
    ) {
      curIteration = maxIterations
    }
  } else {
    if (quaternionMode) {
      if (
        !(
          Math.abs(curTop.a) < tolerance &&
          Math.abs(curTop.b) < tolerance &&
          Math.abs(curTop.c) < tolerance &&
          Math.abs(curTop.d) < tolerance
        )
      ) {
        curIteration = maxIterations
      }
    } else if (
      !(Math.abs(curTop.real) < tolerance && Math.abs(curTop.imag) < tolerance)
    ) {
      curIteration = maxIterations
    }
  }

  let rootKey
  if (quaternionMode) {
    norm = Math.sqrt(curNum.b * curNum.b + curNum.c * curNum.c + curNum.d * curNum.d)
    if (curNum.b < 0) {
      norm *= -1
    }
    rootKey =
      curNum.a.toFixed(Math.max(precision - 1, 0)).replace(/^-([.0]*)$/, '$1') +
      ',' +
      norm.toFixed(Math.max(precision - 1, 0)).replace(/^-([.0]*)$/, '$1')
  } else {
    rootKey =
      curNum.real.toFixed(Math.max(precision - 1, 0)).replace(/^-([.0]*)$/, '$1') +
      ',' +
      curNum.imag.toFixed(Math.max(precision - 1, 0)).replace(/^-([.0]*)$/, '$1')
  }

  return [curIteration, rootKey]
}

/*
 * update small info box in lower right-hand side
 */
function updateInfoBox () {
  $('infoBox').innerHTML =
    'x<sub>0</sub>=' +
    xRange[0] +
    ' y<sub>0</sub>=' +
    yRange[0] +
    ' ' +
    'x<sub>1</sub>=' +
    xRange[1] +
    ' y<sub>1</sub>=' +
    yRange[1] +
    ' ' +
    'w&#10799;h=' +
    canvas.width +
    'x' +
    canvas.height +
    ' ' +
    ((canvas.width * canvas.height) / 1000000.0).toFixed(1) +
    'MP'
}

/*
 * aeturn number with metric units
 */
function metricUnits (number) {
  const unit = ['', 'k', 'M', 'G', 'T', 'P', 'E']
  const mag = Math.ceil((1 + Math.log(number) / Math.log(10)) / 3)
  return '' + (number / Math.pow(10, 3 * (mag - 1))).toFixed(2) + unit[mag]
}

/*
 * adjust aspect ratio based on plot ranges and canvas dimensions.
 */
function adjustAspectRatio (yRange, canvas) {
  const sratio = canvas.width / canvas.height
  if (sratio > 1) {
    const scale = 1 / sratio
    yRange[0] *= scale
    yRange[1] *= scale
    zoom[1] *= scale
  }
}

/*
 * render Newton fractal
 */
function draw (pickColor) {
  if (lookAt === null) lookAt = lookAtDefault
  if (zoom === null) zoom = [zoomStart, zoomStart]

  const centerVal = math.complex($('center').value)
  if (
    getComplex($('offset').value).real !== offset.real ||
    getComplex($('offset').value).imag !== offset.imag
  ) {
    if (offset.real === 0 && offset.imag === 0) {
      novaMode = true
      reInitCanvas = true
    } else if (
      getComplex($('offset').value).real === 0 &&
      getComplex($('offset').value).imag === 0
    ) {
      novaMode = false
      reInitCanvas = true
    }
    offset = getComplex($('offset').value)
  }
  if (
    parseFloat($('quaternionC').value) !== quaternionC ||
    parseFloat($('quaternionD').value) !== quaternionD
  ) {
    if (quaternionC === 0 && quaternionD === 0) {
      quaternionMode = true
      reInitCanvas = true
    } else if (
      parseFloat($('quaternionC').value) === 0 &&
      parseFloat($('quaternionD').value) === 0
    ) {
      quaternionMode = false
      reInitCanvas = true
    }
    quaternionC = parseFloat($('quaternionC').value)
    quaternionD = parseFloat($('quaternionD').value)
  }
  if (
    ($('isSquare').checked && canvas.width !== canvas.height) ||
    windowResized ||
    Math.abs(zoom[0] - parseFloat($('width').value)) >= compTolerance ||
    Math.abs(lookAt[0] - centerVal.re) >= compTolerance ||
    Math.abs(lookAt[1] - centerVal.im) >= compTolerance
  ) {
    windowResized = false
    reInitCanvas = true
  }

  if (reInitCanvas) {
    reInitCanvas = false
    lookAt = [centerVal.re, centerVal.im]
    zoom = [parseFloat($('width').value), parseFloat($('width').value)]

    xRange = [lookAt[0] - zoom[0] / 2, lookAt[0] + zoom[0] / 2]
    yRange = [lookAt[1] - zoom[1] / 2, lookAt[1] + zoom[1] / 2]

    canvas = $('canvasFractal')

    // reset root mappings
    rootMap.clear()
    pointRootMap.clear()

    if ($('isSquare').checked) {
      canvas.width = Math.min(window.innerWidth, window.innerHeight)
      canvas.height = Math.min(window.innerWidth, window.innerHeight)
    } else {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    ccanvas = $('canvasControls')
    ccanvas.width = canvas.width
    ccanvas.height = canvas.height

    ctx = canvas.getContext('2d')
    img = ctx.createImageData(canvas.width, 1)

    adjustAspectRatio(yRange, canvas)
  }

  maxIterations = parseInt($('steps').value, 10)
  precision = parseInt($('precision').value, 10)
  if (precision <= 0) {
    tolerance = '1'
    for (let i = 0; i > precision; i--) {
      tolerance += '0'
    }
  } else {
    tolerance = '0.'
    for (let i = 0; i < precision; i++) {
      tolerance += '0'
    }
    tolerance += '1'
  }
  tolerance = parseFloat(tolerance)
  scalar = getComplex($('scalar').value)

  expression = $('function').value
  expression = math.parse(expression)
  expression = math.simplify(expression, {}, { exactFractions: false })
  derivative = math.derivative(expression, 'z') // set derivative here to best ensure proper evaluation
  derivative = math.simplify(derivative, {}, { exactFractions: false })
  // parse function expression
  expression = math
    .format(expression, { notation: 'fixed' })
    .replace(/[\s*]/g, '')
  expressionTerms = expression.match(/(\+|-)?[a-z0-9.^]+/gi)
  expressionTermOps = getOperations(expressionTerms)
  // parse function derivative
  derivative = math
    .format(derivative, { notation: 'fixed' })
    .replace(/[\s*]/g, '')
  derivativeTerms = derivative.match(/(\+|-)?[a-z0-9.^]+/gi)
  derivativeTermOps = getOperations(derivativeTerms)

  const realStep = (xRange[1] - xRange[0]) / (0.5 + (canvas.width - 1))
  const imagStep = (yRange[1] - yRange[0]) / (0.5 + (canvas.height - 1))

  updateInfoBox()

  // only enable one render at a time
  renderId += 1

  function drawLine (Ci, y, off, realInit, realStep) {
    let Cr = realInit

    for (let x = 0; x < canvas.width; ++x, Cr += realStep) {
      const p = iterateEquation(Cr, Ci)
      // add mapping of point to root for box counting
      pointRootMap.set((x.toString() + ',' + y.toString()), p[1])
      const color = pickColor(Cr, Ci, p[0], p[1])
      img.data[off++] = color[0]
      img.data[off++] = color[1]
      img.data[off++] = color[2]
      img.data[off++] = 255
    }
  }

  function drawSolidLine (y, color) {
    let off = y * canvas.width

    for (let x = 0; x < canvas.width; ++x) {
      img.data[off++] = color[0]
      img.data[off++] = color[1]
      img.data[off++] = color[2]
      img.data[off++] = color[3]
    }
  }

  function render () {
    const start = new Date().getTime()
    const startHeight = canvas.height
    const startWidth = canvas.width
    let lastUpdate = start
    const updateTimeout = 200
    let pixels = 0
    let Ci = yRange[0]
    let y = 0
    let sy = 0
    const ourRenderId = renderId

    const scanline = function () {
      if (
        renderId !== ourRenderId ||
        startHeight !== canvas.height ||
        startWidth !== canvas.width
      ) {
        // stop drawing
        return
      }

      drawLine(Ci, y, 0, xRange[0], realStep)
      Ci += imagStep
      y += 1
      pixels += canvas.width
      ctx.putImageData(img, 0, sy)

      const now = new Date().getTime()

      if (sy++ < canvas.height) {
        if (now - lastUpdate >= updateTimeout) {
          // show the user where we're rendering
          drawSolidLine(0, [255, 59, 3, 255])
          ctx.putImageData(img, 0, sy)

          // update speed and time taken
          const elapsedMS = now - start
          $('renderTime').innerHTML = (elapsedMS / 1000.0).toFixed(1) // 1 comma

          let speed = Math.floor(pixels / elapsedMS)

          if (metricUnits(speed).substr(0, 3) === 'NaN') {
            speed = Math.floor((60.0 * pixels) / elapsedMS)
            $('renderSpeedUnit').innerHTML = 'minute'
          } else $('renderSpeedUnit').innerHTML = 'second'

          $('renderSpeed').innerHTML = metricUnits(speed)

          // yield control back to browser, so that canvas is updated
          lastUpdate = now
          setTimeout(scanline, 0)
        } else scanline()
      }
    }

    // disallow redrawing while rendering
    scanline()
  }

  render()
}

function pickColorColor (startReal, startImag, n, rootKey) {
  // did not converge
  if (n === maxIterations) {
    return interiorColor
  }

  if (rootMap.has(rootKey) === false) {
    rootMap.set(
      rootKey,
      Math.floor(Math.random() * 255) +
        ',' +
        Math.floor(Math.random() * 255) +
        ',' +
        Math.floor(Math.random() * 255)
    )
    // for debugging
    // console.log(
    //   `root val not found, setting new key val. num=${num}, key=${key}. color=${rootMap.get(
    //     key
    //   )}, iterations=${n}`
    // )
  }
  const c = rootMap.get(rootKey).split(',')
  c[0] = Math.floor((0.5 + (0.5 - n / maxIterations)) * c[0])
  c[1] = Math.floor((0.5 + (0.5 - n / maxIterations)) * c[1])
  c[2] = Math.floor((0.5 + (0.5 - n / maxIterations)) * c[2])
  return c
}

// 'a' and 'b' are just to prevent name clash with '_': all are unused
function pickColorGrayscale (_, a, n, b) {
  // did not converge
  if (n === maxIterations) {
    return interiorColor
  }
  const v = Math.floor((1 - n / maxIterations) * 255)
  return [v, v, v, 255]
}

function main () {
  $('savePNG').onclick = function (_) {
    window.location.href = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream')
  }

  $('calcDimension').onclick = function (_) {
    gridScale = parseInt($('gridScale').value)
    $('fractalDimension').value = calculateFractalDimension(
      canvas.width / gridScale, canvas.height / gridScale
    ).toFixed(3)
  }

  $('resetButton').onclick = function (_) {
    $('settingsForm').reset()
    zoom = [zoomStart, zoomStart]
    lookAt = lookAtDefault
    reInitCanvas = true
    draw(getColorPicker())
  }

  $('rerollColors').onclick = function (_) {
    for (const key of rootMap.keys()) {
      // assign to new random color
      rootMap.set(key, Math.floor(Math.random() * 255) +
                      ',' +
                      Math.floor(Math.random() * 255) +
                      ',' +
                      Math.floor(Math.random() * 255))
    }
    draw(getColorPicker())
  }

  if (dragToZoom === true) {
    let box = null

    // TODO: decide if we want to add scrolling coordinate view here
    // $('canvasControls').onmouseover = function(e)
    // {
    //   cur_x = e.pageX - $('canvasControls').;
    //   cur_y
    // }
    // TODO: figure out issue for square case (seem to be using right approach, but result is slightly off)
    $('canvasControls').onmousedown = function (e) {
      if (box === null) {
        // adjust for square-ness
        if ($('isSquare').checked) {
          const diff = screen.width - screen.height
          if (diff > 0) {
            box = [e.clientX - (diff / 2), e.clientY, 0, 0]
          } else {
            box = [e.clientX, e.clientY - (diff / 2), 0, 0]
          }
        } else {
          box = [e.clientX, e.clientY, 0, 0]
        }
      }
    }

    $('canvasControls').onmousemove = function (e) {
      if (box !== null) {
        const c = ccanvas.getContext('2d')
        c.lineWidth = 1

        // clear out old box first
        c.clearRect(0, 0, ccanvas.width, ccanvas.height)

        // draw new box
        c.strokeStyle = '#FF3B03'
        if ($('isSquare').checked) {
          const diff = screen.width - screen.height
          if (diff > 0) {
            box = [box[0], box[1], e.clientX - (diff / 2), e.clientY]
          } else {
            box = [box[0], box[1], e.clientX, e.clientY - (diff / 2)]
          }
        } else {
          box = [box[0], box[1], e.clientX, e.clientY]
        }
        c.strokeRect(box[0], box[1], box[2] - box[0], box[3] - box[1])
      }
    }

    const zoomOut = function (event) {
      let x = event.clientX
      let y = event.clientY

      const realStep = (xRange[1] - xRange[0]) / (0.5 + (canvas.width - 1))
      const imagStep = (yRange[1] - yRange[0]) / (0.5 + (canvas.height - 1))

      x = xRange[0] + x * realStep
      y = yRange[0] + y * imagStep

      lookAt = [x, y]

      if (event.shiftKey) {
        zoom[0] /= 0.5
        zoom[1] /= 0.5
      }

      draw(getColorPicker())
    }

    $('canvasControls').onmouseup = function (e) {
      if (box !== null) {
        // zoom out if shift key is held
        if (e.shiftKey) {
          box = null
          zoomOut(e)
          return
        }

        // clear canvas
        const c = ccanvas.getContext('2d')
        c.clearRect(0, 0, ccanvas.width, ccanvas.height)

        // calculate new rectangle to render
        let x = Math.min(box[0], box[2]) + Math.abs(box[0] - box[2]) / 2.0
        let y = Math.min(box[1], box[3]) + Math.abs(box[1] - box[3]) / 2.0

        const realStep = (xRange[1] - xRange[0]) / (0.5 + (canvas.width - 1))
        const imagStep = (yRange[1] - yRange[0]) / (0.5 + (canvas.height - 1))

        x = xRange[0] + x * realStep
        y = yRange[0] + y * imagStep

        lookAt = [x, y]

        const xf = Math.abs((box[0] - box[2]) / canvas.width)
        const yf = Math.abs((box[1] - box[3]) / canvas.height)

        // retain aspect ratio (this is why initial zoom is not zoomStart on first render)
        zoom[0] *= Math.max(xf, yf)
        zoom[1] *= Math.max(xf, yf)

        box = null

        // update user-facing values
        $('center').value = math.complex(x, y).toString()
        $('width').value = zoom[0].toString()
        windowResized = true
        draw(getColorPicker())
      }
    }
  }

  /*
   * click-based zooming
   * TODO: debug reinitialize/accuracy issues
   */
  if (dragToZoom === false) {
    $('canvasFractal').onclick = function (event) {
      let x = event.clientX
      let y = event.clientY

      const realStep = (xRange[1] - xRange[0]) / (0.5 + (canvas.width - 1))
      const imagStep = (yRange[1] - yRange[0]) / (0.5 + (canvas.height - 1))

      x = xRange[0] + x * realStep
      y = yRange[0] + y * imagStep

      lookAt = [x, y]

      if (event.shiftKey) {
        zoom[0] *= 2.0
        zoom[1] *= 2.0
      } else {
        zoom[0] *= 0.5
        zoom[1] *= 0.5
      }

      draw(getColorPicker())
    }
  }

  // set flag when window resized to reinitialize canvas on next draw
  window.onresize = function (event) {
    windowResized = true
  }

  // render on page load
  draw(getColorPicker())
}

main()
