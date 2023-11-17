math.config({
  number: 'BigNumber' // switches expression notation to decimal rather than fraction (for string parsing)
})

// Generates directed graph for given polynomial over a finite field of given order
// NOTE: performance appears to be primarily bottlenecked by time to render graph after computations are made.
//       consider looking into setting changes that may increase render performance
function main () {
  document.getElementById('generateGraph').onclick = function (_) {
    const p = parseInt(document.getElementById('inputP').value)
    const deg = parseInt(document.getElementById('inputDeg').value)
    const galois = new GaloisFieldWithTable(p, deg)
    // parse function and derivative into operation chain
    let polynomial = document.getElementById('inputPoly').value
    polynomial = math.parse(polynomial)
    polynomial = math.simplify(polynomial, {}, { exactFractions: false })
    let deriv = math.derivative(polynomial, 'x')
    deriv = math.simplify(deriv, {}, { exactFractions: false })
    // parse function expression
    polynomial = math
      .format(polynomial, { notation: 'fixed' })
      .replace(/[\s*]/g, '')
    polyTerms = polynomial.match(/(\+|-)?[a-z0-9.^]+/gi)
    polyTermOps = getOperations(polyTerms, galois)
    // parse function derivative
    deriv = math
      .format(deriv, { notation: 'fixed' })
      .replace(/[\s*]/g, '')
    derivTerms = deriv.match(/(\+|-)?[a-z0-9.^]+/gi)
    derivTermOps = getOperations(derivTerms, galois)
    if (isNaN(p) || p <= 0) {
      alert('Please enter a positive integer for P.')
      return
    }

    // vertices setup (most added in main loop)
    const rawNodes = new Array(0)
    rawNodes.push({ id: '∞', label: '∞' })
    const edges = []
    // trivial infinity to infinity edge
    edges.push({ from: '∞', to: '∞', edges: { arrows: 'to' } })
    const coefficients = new Array(deg).fill(0)
    let done = false
    // iterate every set of coefficients (ascending)
    while (!done) {
      // process element with current set of coefficients
      const x = new GaloisFieldElement(coefficients, galois)
      const strX = x.toString()
      rawNodes.push({ id: strX, label: strX })
      const fx = functionAt(coefficients, galois, polyTermOps)
      const fpx = functionAt(coefficients, galois, derivTermOps)
      // console.log(`processing element with x ${x}, fx ${fx}, fpx ${fpx}`)
      let target
      if (fpx.Equals(galois.Zero)) {
        // diverges since derivative is in denominator
        target = '∞'
      } else {
        // Newton method iteration
        fpxInv = galois.Inverse(fpx)
        diff = galois.Multiply(fpxInv, fx)
        diff = galois.Negative(diff)
        target = (galois.Add(x, diff)).toString()
      }
      edges.push({ from: strX, to: target, edges: { arrows: 'to' } })

      // increment coefficients
      for (let i = 0; i < deg; i++) {
        if (coefficients[i] !== (p - 1)) {
          coefficients[i]++
          break
        } else if (i === (deg - 1)) {
          // stopping condition (no next coefficient to increment)
          done = true
          break
        } else {
          // reset this coefficient and increment next
          coefficients[i] = 0
        }
      }
    }
    const nodes = new vis.DataSet(rawNodes)
    const data = { nodes, edges }

    const container = document.getElementById('graphContainer')
    // graph configuration options
    const options = {
      edges: {
        arrows: {
          to: { enabled: true, scaleFactor: 1, type: 'arrow' }
        }
      },
      layout: {
        // improvedLayout seems to not work with > 150 nodes, set to false for improved performance in those cases
        improvedLayout: p < 150
      }
    }
    // create graph
    const network = new vis.Network(container, data, options)
  }
}

main()
