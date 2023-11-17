/* Custom operation and operation chain functionality (for Complex and Quaternion class) */

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
        return num.sub(baseVal)
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

// parses operation chain from terms
function getOperations (terms) {
  termOperations = []
  terms.forEach(function (term, index) {
    operations = []
    curIndex = 0
    // check for negative sign
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

    // parse complex-valued coefficient (implied by parenthesis)
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
      // parse real-valued coefficient
      while (
        curIndex < term.length &&
        ((term[curIndex] >= '0' && term[curIndex] <= '9') || term[curIndex] === '.')
      ) {
        coeffReal += term[curIndex]
        curIndex++
      }
    }
    // add coefficient to operation chain if has nonzero coefficient
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
    // has variable
    if (curIndex < term.length) {
      switch (term[curIndex]) {
        // parse power of function variable
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

// evaluate function with given array of operations at given value
function functionAt (num, operations) {
  let base
  if (quaternionMode) {
    base = new QuaternionNumber(num.a, num.b, num.c, num.d)
  } else {
    base = new ComplexNumber(num.real, num.imag)
  }
  const terms = []
  // compute value of each term in expression
  operations.forEach(function (operationSet, index) {
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
  // sum values
  terms.forEach(function (term, index) {
    res = res.add(term)
  })
  return res
}
