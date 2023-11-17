// Thanks to Elad Zelingher for providing this class
class GaloisFieldWithTable {
    constructor(characteristic, degree) {
        this.mLogarithmicTable = new Map();
        this.Degree = degree;
        this.Characteristic = characteristic;
        this.NumberOfElements = Math.pow(this.Characteristic, this.Degree);
        this.Zero = new GaloisFieldElement(new Array(degree).fill(0), this);
        let identity = new GaloisFieldElement([1].concat(Array(degree - 1).fill(0)), this);
        this.Identity = identity;
        this.mExponentialTable = new Array(this.NumberOfElements - 1);
        if (!(this.NumberOfElements < Math.pow(2, 16))) {
            throw new Error("Too many elements for a table-based finite field.");
        }
        this.IrreduciblePolynomial = ConwayPolynomials.get(characteristic, degree);
        let current;
        if (degree > 1) {
            current = new GaloisFieldElement([0, 1].concat(new Array(degree - 2).fill(0)), this);
        }
        else {
            current = new GaloisFieldElement([this.Modulo(-this.IrreduciblePolynomial[0])], this);
        }
        this.mLogarithmicTable.set("1", 0);
        this.mExponentialTable[0] = identity;
        for (let i = 1; i < Math.pow(characteristic, degree) - 1; i++) {
            this.mLogarithmicTable.set(current.toString(), i);
            this.mExponentialTable[i] = current;
            current = current.CyclicShift(this.IrreduciblePolynomial);
        }
    }
    get Elements() {
        return this.mExponentialTable.map(x => x);
    }
    get Generator() {
        return this.mExponentialTable[1];
    }
    Add(x, y) {
        const result = new Array(this.Degree);
        for (let i = 0; i < this.Degree; i++) {
            result[i] = this.Modulo(x.get(i) + y.get(i));
        }
        return new GaloisFieldElement(result, this);
    }
    Negative(x) {
        const result = new Array(this.Degree);
        for (let i = 0; i < this.Degree; i++) {
            result[i] = this.Modulo(-x.get(i));
        }
        return new GaloisFieldElement(result, this);
    }
    Multiply(x, y) {
        // return zero element early if either is 0 to avoid log table undefined issues?
        const xStr = x.toString()
        const yStr = y.toString()
        const charStr = this.Characteristic.toString()
        if (xStr == '0' || yStr == '0' || xStr == charStr || yStr == charStr) {
          return this.Zero
        }
        let exponent = this.mLogarithmicTable.get(x.toString()) + this.mLogarithmicTable.get(y.toString());
        exponent = GaloisFieldWithTable.Modulo(exponent, this.NumberOfElements - 1);
        return this.mExponentialTable[exponent];
    }
    Inverse(x) {
        if (this.Zero.Equals(x)) {
            throw new Error("Divide by zero exception");
        }
        let exponent = -this.mLogarithmicTable.get(x.toString());
        exponent = GaloisFieldWithTable.Modulo(exponent, this.NumberOfElements - 1);
        return this.mExponentialTable[exponent];
    }
    Exp(base, exponent) {
        if (this.Zero.Equals(base) && exponent > 0) {
            return this.Zero;
        }
        if (exponent === 0) {
            return this.Identity;
        }
        let log = this.mLogarithmicTable.get(base.toString());
        let exponentTimesLog = GaloisFieldWithTable.Modulo(log * exponent, this.NumberOfElements - 1);
        let result = this.mExponentialTable[exponentTimesLog];
        return result;
    }
    Modulo(value) {
        return GaloisFieldWithTable.Modulo(value, this.Characteristic);
    }
    static Modulo(value, prime) {
        let result = value % prime;
        if (result >= 0) {
            return result;
        }
        return result + prime;
    }
    Equals(other) {
        if (other === null)
            return false;
        if (this === other)
            return true;
        return this.Characteristic === other.Characteristic && this.Degree === other.Degree;
    }
    equals(obj) {
        if (obj === null)
            return false;
        if (this === obj)
            return true;
        if (obj.constructor !== this.constructor)
            return false;
        return this.Equals(obj);
    }
    getHashCode() {
        return (this.Characteristic * 397) ^ this.Degree;
    }
}
class GaloisFieldElement {
    constructor(coefficients, field) {
        this.mToString = null;
        this.Field = field;
        this.mCoefficients = coefficients;
    }
    get(index) {
        if (index < this.mCoefficients.length) {
            return this.mCoefficients[index];
        }
        return 0;
    }
    CyclicShift(fieldPolynomial) {
        const shiftedCoefficients = [0].concat(this.mCoefficients.slice(0, this.mCoefficients.length - 1));
        const lastCoefficient = this.mCoefficients[this.mCoefficients.length - 1];
        const currentPolynomial = fieldPolynomial.slice(0, this.mCoefficients.length)
            .map(x => this.Field.Modulo(-x * lastCoefficient));
        const result = currentPolynomial.map((x, i) => this.Field.Modulo(x + shiftedCoefficients[i]));
        return new GaloisFieldElement(result, this.Field);
    }
    Inverse() {
        return this.Field.Inverse(this);
    }
    Equals(other) {
        if (other === null) {
            return false;
        }
        if (this.Field == other.Field && this.mCoefficients.length == other.mCoefficients.length) {
            for (let index = 0; index < this.mCoefficients.length; index++) {
                if (this.mCoefficients[index] !== other.mCoefficients[index]) {
                    return false;
                }
            }
            return true;
        }
        else {
            return false;
        }
    }
    toString() {
        if (this.mToString === null) {
            if (this.Equals(this.Field.Zero)) {
                this.mToString = "0";
            }
            else {
                this.mToString = this.mCoefficients.map((x, i) => ({ x, i }))
                    .filter(x => x.x !== 0)
                    .map(x => this.Format(x))
                    .join(" + ");
            }
        }
        return this.mToString;
    }
    Format({ x, i }) {
        let formattedCoefficient = x === 1 ? "" : x.toString();
        if (i === 0) {
            return x.toString();
        }
        else if (i === 1) {
            return `${formattedCoefficient}X`;
        }
        else if (i < 10) {
            return `${formattedCoefficient}X^${i}`;
        }
        return `${formattedCoefficient}X^{${i}}`;
    }
}