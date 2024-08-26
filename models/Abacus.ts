import { configureLayoutAnimationBatch } from "react-native-reanimated/lib/typescript/reanimated2/core"

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
            total += this.calculate(this.columns[0][i]) * (10 ** i)
        for (let i = 0; i < this.columns[1].length; i++)
            total += this.calculate(this.columns[1][i]) * (10 ** -(i + 1))

        let precision = 0
        var i = 0
        for (let column of this.columns[1]) {
            if (column.some(bead => bead == 1))
                precision = i
            i += 1
        }
        return parseFloat(total.toFixed(precision + 1))
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

// here
// function rsum(column: column, index: number = 4) {
//     if (index == 4)
//         return 0

//     let bead = column[index]

//     if (bead == 1)
//         value(index) + rsum(column, index - 1)

//     rsum(column, index + 1)
// }

// let s = (column: column) =>
//     (column[0] ? 5 : 0) + column.slice(1).reduce((total, bead) => total + bead)

// // function abasucsmath(somecolumnstate) => total sum

// function ss(column: column) {
//     let total = 0
//     if (column[0] == 1)
//         total += 5
//     for (let bead of column.slice(1)) // skip first one cause line 38 already took care of him
//         total += bead // bead is either 1 or 0, so adding 0s will do nothing (no worries)

//     return total
//     // so in summary,
//     // its (possibly 5) + ((possibly 1 or 0) for the remaining 4)
// }

// function sum(column: column) {
//     let total = 0
//     let leadingBead = 0

//     for (let i = 0; i < column.length - 1; i++) {
//         if (column[i] == 1)
//             leadingBead = Math.max(leadingBead, i)
//     }

//     for (let i = 0; i < leadingBead; i++) {
//         column[i] = 1
//     }

//     column.forEach((bead, index) => {
//         var worth = value(index)
//         total += (worth * bead)
//         console.log(index, worth, worth*bead, total)
//     })
//     return total
// }

// export { sum }
