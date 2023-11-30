/* Custom class and helper for complex arithmetic */
// performs better than mathjs library, which has easy-to-use support for complex numbers and operations but is much slower
function ComplexNumber (real, imag) {
  this.real = real
  this.imag = imag
}
ComplexNumber.prototype = {
  real: 0, // real part
  imag: 0, // imaginary part
  /**
   * addition operation - takes either 1 argument (ComplexNumber), or 2 arguments (real part, imaginary part)
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
   * subtraction operation - takes either 1 argument (ComplexNumber), or 2 arguments (real part, imaginary part)
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
   * multiplication operation - takes either 1 argument (ComplexNumber), or 2 arguments (real part, imaginary part)
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
   * division operation - takes either 1 argument (ComplexNumber), or 2 arguments (real part, imaginary part)
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
  },
  /**
   * returns "this" to the given complex exponent - takes one ComplexNumber argument
   */
  // NOTE: this can be multivalued for fractional powers, so we assume 0 for the coefficient of the periodic term here
  // Implementation based on this discussion: https://math.stackexchange.com/questions/476968/complex-power-of-a-complex-number
  compExp: function () {
    const param = arguments[0]
    const arg = Math.atan2(arguments[0].real, arguments[0].imag) // argument of our complex number
    const norm = Math.sqrt((this.real * this.real) + (this.imag * this.imag))
    const i = new ComplexNumber(0, 1)
    const imagArg = i.mult(arg, 0)
    const lnNorm = new ComplexNumber(Math.log(norm), 0)
    let expPow = lnNorm.mult(param)
    expPow = expPow.add(imagArg.mult(param))
    return expPow.exp()
  }
}

// parses string into ComplexNumber object
function getComplex (term) {
  let realPart = ''
  let imagPart = ''
  let coeffOne = ''
  let coeffTwo = ''
  let curIndex = 0
  // parse first part of term
  while (
    (curIndex < term.length && ((term[curIndex] >= '0' && term[curIndex] <= '9') ||
    term[curIndex] === '.'))
  ) {
    coeffOne += term[curIndex]
    curIndex++
  }
  if (curIndex < term.length) {
    // currently at '+' or 'i' if has two parts
    if (term[curIndex] === 'i') {
      // lets 'i' alone be '1i'
      if (coeffOne.length === 0) {
        coeffOne = '1'
      }
      curIndex++
    }
    if (curIndex === term.length) {
      imagPart = coeffOne
    } else {
      // add sign ('+' or '-') to second coefficient part if negative
      if (term[curIndex] === '-') {
        coeffTwo = '-'
      }
      curIndex++
      while (
        (term[curIndex] >= '0' && term[curIndex] <= '9') ||
        term[curIndex] === '.'
      ) {
        coeffTwo += term[curIndex]
        curIndex++
      }
      // if not at end, must be at 'i'
      if (curIndex < term.length) {
        if (coeffTwo.length === 0) {
          coeffTwo = '1'
        }
        realPart = coeffOne
        imagPart = coeffTwo
      } else {
        realPart = coeffTwo
        imagPart = coeffOne
      }
    }
  } else {
    realPart = coeffOne
  }
  if (realPart.length === 0) {
    realPart = '0'
  }
  if (imagPart.length === 0) {
    imagPart = '0'
  }
  return new ComplexNumber(parseFloat(realPart), parseFloat(imagPart))
}
