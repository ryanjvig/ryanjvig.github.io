/* Custom operation and operation chain functionality (for Galois class) */

// enum for operation types
const OperationType = {
  Negative: 'n',
  Add: 'a',
  Subtract: 's',
  Multiply: 'm',
  Divide: 'd',
  Exp: 'e'
}

// stores operation data
function Operation (type, val) {
  this.type = type
  this.val = val
}

// performs op (of type Operation) on num, substituting in baseVal if op has value 'b'
function performOperation (galoisField, num, op, baseVal) {
  switch (op.type) {
    case OperationType.Negative: {
      return galoisField.Negative(num)
    }
    case OperationType.Exp: {
      return galoisField.Exp(baseVal, op.val)
    }
    case OperationType.Add: {
      if (op.val === 'b') {
        return galoisField.Add(num, baseVal)
      }
      return galoisField.Add(num, op.val)
    }
    case OperationType.Subtract: {
      if (op.val === 'b') {
        return galoisField.Add(num, galoisField.Negative(baseVal))
      }
      return galoisField.Add(num, galoisField.Negative(op.val))
    }
    case OperationType.Multiply: {
      if (op.val === 'b') {
        return galoisField.Multiply(num, baseVal)
      }
      return galoisField.Multiply(num, op.val)
    }
    case OperationType.Divide: {
      if (op.val === 'b') {
        return galoisField.Multiply(galoisField.Inverse(baseVal), num)
      }
      return galoisField.Multiply(galoisField.Inverse(op.val), num)
    }
  }
}

// parses operation chain from terms
function getOperations (terms, galoisField) {
  termOperations = []
  terms.forEach(function (term, index) {
    const operations = []
    let curIndex = 0
    let isNegative = false
    // check for negative sign
    if (term[0] === '-') {
      isNegative = true
      curIndex++
    } else if (term[0] === '+') {
      curIndex++
    }
    let coeffReal = ''
    let coeffImag = ''

    // parse real-valued coefficient
    while (
      curIndex < term.length &&
      (term[curIndex] >= '0' && term[curIndex] <= '9')
    ) {
      coeffReal += term[curIndex]
      curIndex++
    }

    // add coefficient to operation chain if has nonzero coefficient
    if (coeffReal.length !== 0 || coeffImag.length !== 0) {
      if (coeffReal.length === 0) {
        coeffReal = '0'
      } else if (coeffImag.length === 0) {
        coeffImag = '0'
      }
      operations.push(
        new Operation(
          OperationType.Multiply,
          new GaloisFieldElement(numToCoefficients(galoisField, parseInt(coeffReal)), galoisField)
        )
      )
    }
    // has variable
    if (curIndex < term.length) {
      switch (term[curIndex]) {
        // parse power of function variable
        case 'x':
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
      }
    }
    // add negative at end to flip sign of result
    if (isNegative) {
      operations.push(new Operation(OperationType.Negative, null))
    }
    termOperations.push(operations)
  })
  return termOperations
}

// evaluate function with given array of operations at given value
function functionAt (coefficients, galoisField, operations) {
  const base = new GaloisFieldElement(coefficients, galoisField)
  const terms = []
  // compute value of each term in expression
  operations.forEach(function (operationSet, index) {
    const tempCoefficients = new Array(galoisField.Degree).fill(0)
    tempCoefficients[0] = 1
    let tempNum = new GaloisFieldElement(tempCoefficients, galoisField)
    operationSet.forEach(function (operation, index) {
      tempNum = performOperation(galoisField, tempNum, operation, base)
    })
    terms.push(tempNum)
  })
  const resCoefficients = new Array(galoisField.Degree).fill(0)
  let res = new GaloisFieldElement(resCoefficients, galoisField)
  // sum values
  terms.forEach(function (term, index) {
    res = galoisField.Add(res, term)
  })
  return res
}

function numToCoefficients (galoisField, num) {
  coefficients = new Array(galoisField.Degree).fill(0)
  let div = galoisField.NumberOfElements / galoisField.Characteristic
  for (let i = galoisField.Degree - 1; i >= 0; i--) {
    const quotient = Math.floor(num / div)
    if (quotient === galoisField.Characteristic) {
      coefficients[i] = 0
    } else {
      coefficients[i] = quotient
    }
    num -= div * quotient
    div /= galoisField.Characteristic
  }
  return coefficients
}
