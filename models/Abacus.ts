type column
    = [0,0,0,0,0]
    | [0,1,0,0,0]
    | [0,1,1,0,0]
    | [0,1,1,1,0]
    | [0,1,1,1,1]
    | [1,0,0,0,0]
    | [1,1,0,0,0]
    | [1,1,1,0,0]
    | [1,1,1,1,0]
    | [1,1,1,1,1]

class Abacus {
    constructor(public columns: [column[], column[]]) {}

    private calculate = (column: column) => // @ts-ignore
        (column[0] ? 5 : 0) + column.slice(1).reduce((total, bead) => total + bead, 0)

    public evaluate() {
        let total = 0

        for (let i = 0; i < this.columns[0].length; i++)
            total += this.calculate(this.columns[0][i]) * (10 ** (i - 1))
        for (let i = 0; i < this.columns[1].length; i++)
            total += this.calculate(this.columns[1][i]) * (10 ** -(i + 2))

        let precision = 0
        var i = 0
        for (let column of this.columns[1]) {
            if (column.some(bead => bead == 1))
                precision = i
            i += 1
        }
        return parseFloat(total.toFixed(precision + 2))
    }

    public clone(): Abacus {
        return new Abacus(
            this.columns
        )
    }
}

function roundToFixed(num: number, digits: number) {
    const multiplier = Math.pow(10, digits);
    return Math.round(num * multiplier) / multiplier;
}

function correctOn(abacus: Abacus): Abacus {
    for (let side of abacus.columns) {
        for (let column of side) {
            for (let i = column.length - 1; i > 0; i--) {
                if (column[i] == 1) {
                    for (let j = i; j > 0; j--) {
                        column[j] = 1
                    }
                }
            }
        }
    }

    return abacus
}

function correctOff(abacus: Abacus): Abacus {
    for (let side of abacus.columns) {
        for (let column of side) {
            for (let i = 1; i < column.length; i++) {
                if (column[i] == 0) {
                    for (let j = i; j < column.length; j++)
                        column[j] = 0
                }
            }
        }
    }

    return abacus
}

export { Abacus, type column, correctOn, correctOff }
