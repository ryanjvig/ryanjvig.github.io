// Class to perform modular arithmetic
class Mod {
  constructor (value, modulus) {
    this.value = ((value % modulus) + modulus) % modulus
    this.modulus = modulus
  }

  // Performs modular arithmetic
  add (other) {
    return new Mod(this.value + other.value, this.modulus)
  }

  // Performs modular subtraction
  subtract (other) {
    return new Mod(this.value - other.value, this.modulus)
  }

  // Performs modular multiplication
  times (other) {
    return new Mod(this.value * other.value, this.modulus)
  }

  // Finds modular inverse using Extended Euclidean Algorithm
  inverse () {
    const a = this.value
    const m = this.modulus
    let [oldR, r] = [a, m]
    let [oldS, s] = [1, 0]

    while (r !== 0) {
      const quotient = Math.floor(oldR / r)
      ;[oldR, r] = [r, oldR - quotient * r]
      ;[oldS, s] = [s, oldS - quotient * s]
    }

    return new Mod(oldS, m)
  }

  // Determines when two numbers are equivalent for a given modulus
  equals (other) {
    return this.value === other.value && this.modulus === other.modulus
  }
}

// Generates directed graph for given polynomial over a finite field of given order
// NOTE: performance appears to be primarily bottlenecked by time to render graph after computations are made.
//       consider looking into setting changes that may increase render performance
function main () {
  document.getElementById('generateGraph').onclick = function (_) {
    const p = parseInt(document.getElementById('inputP').value)
    const polynomial = document.getElementById('inputPoly').value
    // computes function derivative
    const deriv = math.derivative(polynomial, 'x').toString()
    if (isNaN(p) || p <= 0) {
      alert('Please enter a positive integer for P.')
      return
    }

    // vertices setup
    const rawNodes = Array.from({ length: p }, (_, i) => ({
      id: i,
      label: i.toString()
    }))
    rawNodes.push({ id: '∞', label: '∞' })
    const nodes = new vis.DataSet(rawNodes)
    const edges = []
    // trivial infinity to infinity edge
    edges.push({ from: '∞', to: '∞', edges: { arrows: 'to' } })

    for (let i = 0; i < p; i++) {
      const x = new Mod(i, p) // i mod p
      const xNew = new Mod(math.evaluate(polynomial, { x: x.value }), p) // f(x) mod p
      const fprimeX = new Mod(math.evaluate(deriv, { x: x.value }), p) // f'(x) mod p
      let target
      if (fprimeX.value === 0) {
        // diverges since derivative is in denominator
        target = '∞'
      } else {
        // Newton method iteration performed mod p
        target = new Mod(i - xNew.times(fprimeX.inverse()).value, p).value
      }
      edges.push({ from: i, to: target, edges: { arrows: 'to' } })
    }
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
