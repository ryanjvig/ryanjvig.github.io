/* Custom class for quaternion arithmetic */
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
   * addition operation - takes either 1 argument (QuaternionNumber), or 4 arguments (a, b, c, d)
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
   * subtraction operation - takes either 1 argument (QuaternionNumber), or 4 arguments (a, b, c, d)
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
   * Hamilton product - takes either 1 argument (QuaternionNumber), or 4 arguments (a, b, c, d)
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
   * division operation (Hamilton product of 'this' and reciprocal of given quaternion number) - takes either 1 argument (QuaternionNumber), or 4 arguments (a, b, c, d)
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
  // TODO: add functionality for below transcendental functions
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
