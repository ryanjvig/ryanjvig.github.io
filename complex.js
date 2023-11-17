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
  }
}

// parses string into ComplexNumber object
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
