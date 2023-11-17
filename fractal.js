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

/*
 * Global variables
 * Variables that are not "const" will be set/modified by HTML element values or while rendering
 */
const zoomStart = 15.0 // width of real axis
const lookAtDefault = [0, 0] // point to center canvas at
const rootMap = new Map()
const pointRootMap = new Map()
const interiorColor = [0, 0, 0, 255]
const colors = [[0, 0, 0, 0]]
let zoom = [zoomStart, zoomStart]
let lookAt = lookAtDefault
let xRange = [-10, 10] // real axis view range
let yRange = [-10, 10] // imginary axis view range
let tolerance = 0.00001
let precision = 5
let maxIterations = 50
let scalar = new ComplexNumber(1, 0)
let offset = new ComplexNumber(0, 0)
let gridScale = 100
let quaternionC = 0
let quaternionD = 0
let reInitCanvas = true // whether we fully reinitialize canvas on redraw
let renderId = 0 // to zoom before current render is finished
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

/*
 * fetch given element, jQuery-style (quality of life/shortcut function)
 */
function $ (id) {
  return document.getElementById(id)
}

// used in the HTML - has browser focus on submit button
function focusOnSubmit () {
  const e = $ < HTMLInputElement > ('submitButton')
  if (e) e.focus()
}

// gets the function for the selected color scheme
function getColorPicker () {
  const p = $('colorScheme').value
  if (p === 'pickColorColor') return pickColorColor
  if (p === 'pickColorBoundary') return pickColorBoundary
  return pickColorGrayscale
}

// helper function to determine the appropriate convergence condition for the Newton's method loop
// returns whether condition is met i.e. whether loop should terminate
function convergenceCondition (curTop, curIteration) {
  // looking for divergence in nova fractal case
  if (novaMode) {
    if (quaternionMode) {
      return !(curIteration < maxIterations &&
             (Math.abs(curTop.a) <= tolerance ||
              Math.abs(curTop.b) <= tolerance ||
              Math.abs(curTop.c) <= tolerance ||
              Math.abs(curTop.d) <= tolerance))
    } else {
      return !(curIteration < maxIterations &&
             (Math.abs(curTop.real) <= tolerance ||
              Math.abs(curTop.imag) <= tolerance))
    }
  } else {
    if (quaternionMode) {
      return !(curIteration < maxIterations &&
            (Math.abs(curTop.a) >= tolerance ||
              Math.abs(curTop.b) >= tolerance ||
              Math.abs(curTop.c) >= tolerance ||
              Math.abs(curTop.d) >= tolerance))
    } else {
      return !(curIteration < maxIterations &&
             (Math.abs(curTop.real) >= tolerance ||
              Math.abs(curTop.imag) >= tolerance))
    }
  }
}

// advance Newton's method to next iteration
function performIteration (curNum, curTop, curBot) {
  curTop = functionAt(curNum, expressionTermOps)
  curBot = functionAt(curNum, derivativeTermOps)
  let diff = curTop.div(curBot)
  diff = diff.mult(scalar)
  curNum = curNum.sub(diff)
  if (novaMode) {
    curNum = curNum.add(offset)
  }
  return [curNum, curTop, curBot]
}

// helper function for checking divergence condition
// primarily for when loop terminates early due to numbers becoming too large to reliably evaluate
function divergenceCondition (curTop) {
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
        return true
      }
    } else if (
      !(
        Math.abs(curTop.real) >= tolerance && Math.abs(curTop.imag) >= tolerance
      )
    ) {
      return true
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
        return true
      }
    } else if (
      !(Math.abs(curTop.real) < tolerance && Math.abs(curTop.imag) < tolerance)
    ) {
      return true
    }
  }
}

/*
 * performs Newton's method on given point in complex plane
 * returns number of iterations required to converge (or diverge if creating nova fractal) and key of resulting root
 * if number of iterations returned is the max number of iterations, we consider that point to have not converged
 */
function iterateEquation (realStart, imagStart) {
  let curNum
  let curTop
  let curBot
  if (quaternionMode) {
    curNum = new QuaternionNumber(
      realStart,
      imagStart,
      quaternionC,
      quaternionD
    )
    curTop = new QuaternionNumber(tolerance, tolerance, tolerance, tolerance)
    curBot = new QuaternionNumber(1.0, 1.0, 1.0, 1.0)
  } else {
    curNum = new ComplexNumber(realStart, imagStart)
    curTop = new ComplexNumber(tolerance, tolerance)
    curBot = new ComplexNumber(1.0, 1.0)
  }
  let curIteration = 0
  for (; !(convergenceCondition(curTop, curIteration)); ++curIteration) {
    [curNum, curTop, curBot] = performIteration(curNum, curTop, curBot)
  }

  // ensures divergence is marked as not converging (using the inverse comparison appears necessary to avoid false positives with large numbers)
  if (divergenceCondition(curTop)) {
    curIteration = maxIterations
  }

  let rootKey
  // get key value for root for insertion/lookup in map
  if (curIteration === maxIterations) {
    rootKey = 'n'
  }
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
 * return number with metric units (for calculation speed display)
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
 * primary render function
 */
function draw (pickColor) {
  if (lookAt === null) lookAt = lookAtDefault
  if (zoom === null) zoom = [zoomStart, zoomStart]

  const centerVal = math.complex($('center').value)

  // initialize nova fractal offset
  offset = getComplex($('offset').value)
  // turn nova fractal mode on/off
  if (novaMode && offset.real === 0 && offset.imag === 0) {
    novaMode = false
    reInitCanvas = true
  } else if (!novaMode && (offset.real !== 0 || offset.imag !== 0)) {
    novaMode = true
    reInitCanvas = true
  }

  // initialize quaternion projection
  quaternionC = parseFloat($('quaternionC').value)
  quaternionD = parseFloat($('quaternionD').value)
  // turn quaternion mode on/off
  if (quaternionMode && quaternionC === 0 && quaternionD === 0) {
    quaternionMode = false
    reInitCanvas = true
  } else if (!quaternionMode && (quaternionC !== 0 || quaternionD !== 0)) {
    quaternionMode = true
    reInitCanvas = true
  }
  // reinitialization conditions: box to draw as square checked, width changed, or center point changed
  if (
    ($('isSquare').checked && canvas.width !== canvas.height) ||
    Math.abs(zoom[0] - parseFloat($('width').value)) >= compTolerance ||
    Math.abs(lookAt[0] - centerVal.re) >= compTolerance ||
    Math.abs(lookAt[1] - centerVal.im) >= compTolerance
  ) {
    reInitCanvas = true
  }

  // reset point to root mappings (doesn't reset root to color mappings besides reroll button)
  pointRootMap.clear()

  // reset canvas when rendering
  if (reInitCanvas) {
    reInitCanvas = false
    lookAt = [centerVal.re, centerVal.im]
    zoom = [parseFloat($('width').value), parseFloat($('width').value)]

    xRange = [lookAt[0] - zoom[0] / 2, lookAt[0] + zoom[0] / 2]
    yRange = [lookAt[1] - zoom[1] / 2, lookAt[1] + zoom[1] / 2]

    canvas = $('canvasFractal')

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
  // flip sign for nova fractals since we are now using escape radius (rather than convergence tolerance)
  if (novaMode) {
    precision *= -1
  }
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
  if (quaternionMode) {
    // cast nova offset and iteration scalar to quaternion type when in quaternion mode
    scalar = new QuaternionNumber(scalar.real, scalar.imag, 0, 0)
    offset = new QuaternionNumber(offset.real, offset.imag, 0, 0)
  }

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

  // only enable one render at a time
  renderId += 1

  // renders a line of the Newton fractal
  function drawLine (Ci, y, off, realInit, realStep) {
    let Cr = realInit

    for (let x = 0; x < canvas.width; ++x, Cr += realStep) {
      const p = iterateEquation(Cr, Ci)
      // add mapping of point to root for box counting
      pointRootMap.set((x.toString() + ',' + y.toString()), p[1])
      const color = pickColor(p[0], p[1], x, y)
      img.data[off++] = color[0]
      img.data[off++] = color[1]
      img.data[off++] = color[2]
      img.data[off++] = 255
    }
  }

  // renders the render line itself
  function drawSolidLine (y, color) {
    let off = y * canvas.width

    for (let x = 0; x < canvas.width; ++x) {
      img.data[off++] = color[0]
      img.data[off++] = color[1]
      img.data[off++] = color[2]
      img.data[off++] = color[3]
    }
  }

  // renders the Newton fractal, alternating between computing the next line and populating the results
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

          if (metricUnits(speed).substring(0, 3) === 'NaN') {
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

// assigns colors when using colored scheme
function pickColorColor (n, rootKey, x, y) {
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

// checks if point is in boundary i.e. if it neighbors a point with different convergence
function pickColorBoundary (n, rootKey, x, y) {
  // did not converge (deciding to still color black if not converged here, do not necessarily have to)
  if (n === maxIterations) {
    return interiorColor
  }
  if (onBoundary(x, y)) {
    return interiorColor
  }
  return [255, 255, 255, 255]
}

// assigns colors when using grayscale scheme
function pickColorGrayscale (n, rootKey, x, y) {
  // did not converge
  if (n === maxIterations) {
    return interiorColor
  }
  const v = Math.floor((1 - n / maxIterations) * 255)
  return [v, v, v, 255]
}

function main () {
  // toggle options menu (Shift+Space to toggle)
  document.body.addEventListener('keydown', function (e) {
    if (e.shiftKey && (e.key === ' ' || e.code === 'Space')) {
      if ($('description').style.display === 'none') {
        $('description').style.display = 'block'
      } else {
        $('description').style.display = 'none'
      }
      e.preventDefault()
    }
    return false
  })
  // save canvas as image
  // NOTE: will save as default filename in browser (probably "download"),
  //       need to rename manually to [image_name].png
  $('savePNG').onclick = function (_) {
    window.location.href = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream')
  }

  // compute estimate of canvas's fractal dimension
  $('calcDimension').onclick = function (_) {
    gridScale = parseInt($('gridScale').value)
    $('fractalDimension').value = calculateFractalDimension(
      canvas.width / gridScale, canvas.height / gridScale
    ).toFixed(3)
  }

  // reset settings and reinitialize canvas
  $('resetButton').onclick = function (_) {
    $('settingsForm').reset()
    zoom = [zoomStart, zoomStart]
    lookAt = lookAtDefault
    reInitCanvas = true
    draw(getColorPicker())
  }

  // assign each root color to new random color
  $('rerollColors').onclick = function (_) {
    for (const key of rootMap.keys()) {
      rootMap.set(key, Math.floor(Math.random() * 255) +
                      ',' +
                      Math.floor(Math.random() * 255) +
                      ',' +
                      Math.floor(Math.random() * 255))
    }
    draw(getColorPicker())
  }

  // helper function to get mouse position relative to canvas
  const getMousePosition = function (e) {
    const rect = ccanvas.getBoundingClientRect()
    const scaleX = ccanvas.width / rect.width
    const scaleY = ccanvas.height / rect.height
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    }
  }

  let box = null

  $('canvasControls').onmousedown = function (e) {
    if (box === null) {
      // adjust for square-ness
      const position = getMousePosition(e)
      box = [position.x, position.y, -1, -1]
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
      const position = getMousePosition(e)
      box = [box[0], box[1], position.x, position.y]
      c.strokeRect(box[0], box[1], box[2] - box[0], box[3] - box[1])
    }
  }

  $('canvasControls').onmouseup = function (e) {
    // zoom out (without changing center point) if shift key is held
    if (e.shiftKey) {
      zoom[0] *= 2
      zoom[1] *= 2
      $('width').value = zoom[0].toString()
      draw(getColorPicker())
    } else {
      let x, y
      // cursor has moved after pressing down (i.e. not a click), do drag-based zooming box[3] !== -1
      if (box[3] !== -1) {
        // clear canvas
        const c = ccanvas.getContext('2d')
        c.clearRect(0, 0, ccanvas.width, ccanvas.height)

        // calculate new rectangle to render
        x = Math.min(box[0], box[2]) + Math.abs(box[0] - box[2]) / 2.0
        y = Math.min(box[1], box[3]) + Math.abs(box[1] - box[3]) / 2.0

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
      } else {
        // click-based zooming (zoom in 2x, centering at point clicked on)
        const position = getMousePosition(e)
        x = position.x
        y = position.y

        const realStep = (xRange[1] - xRange[0]) / (0.5 + (canvas.width - 1))
        const imagStep = (yRange[1] - yRange[0]) / (0.5 + (canvas.height - 1))

        x = xRange[0] + x * realStep
        y = yRange[0] + y * imagStep

        lookAt = [x, y]
        zoom[0] *= 0.5
        zoom[1] *= 0.5
      }
      $('center').value = math.complex(x, y).toString()
    }
    $('width').value = zoom[0].toString()
    // reinitialize and render
    box = null
    reInitCanvas = true
    draw(getColorPicker())
  }

  // set flag when window resized to reinitialize canvas on next render
  window.onresize = function (_) {
    reInitCanvas = true
  }

  // render on page load
  draw(getColorPicker())
}

main()
