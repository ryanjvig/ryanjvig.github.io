/* Suite of functions to allow fractal dimension of canvas object to be estimated using box counting */

// box counting method to compute fractal dimension
function boxCounting (fractalPoints, gridSizeX, gridSizeY) {
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

// helper function to determine if point is on the fractal boundary
// we consider a point on the boundary here if it neighbors a point that converges to a different root under Newton's method
// (or if one point does not converge at all while its neighbor does)
function onBoundary (x, y) {
  const key = x.toString() +
              ',' +
              y.toString()
  let mapVal
  if (pointRootMap.has(key) === false) {
    return false
  } else {
    mapVal = pointRootMap.get(key)
  }
  let compKey
  // check each directly adjacent point, adding this point to boundary set if a neighbor converges to a different root
  if (x + 1 < canvas.width) {
    compKey =
      (x + 1).toString() +
      ',' +
      y.toString()
    if (pointRootMap.has(compKey) && mapVal !== pointRootMap.get(compKey)) {
      return true
    }
  }
  if (x > 0) {
    compKey =
      (x - 1).toString() +
      ',' +
    y.toString()
    if (pointRootMap.has(compKey) && mapVal !== pointRootMap.get(compKey)) {
      return true
    }
  }
  if (y + 1 < canvas.height) {
    compKey =
      x.toString() +
      ',' +
      (y + 1).toString()
    if (pointRootMap.has(compKey) && mapVal !== pointRootMap.get(compKey)) {
      return true
    }
  }
  if (y > 0) {
    compKey =
      x.toString() +
      ',' +
      (y - 1).toString()
    if (pointRootMap.has(compKey) && mapVal !== pointRootMap.get(compKey)) {
      return true
    }
  }
  return false
}

// finds points on fractal boundary in canvas
function findFractalPoints () {
  const boundaryPoints = []
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      if (onBoundary(x, y)) {
        boundaryPoints.push([x, y])
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
  return fractalDimension
}
