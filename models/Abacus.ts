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

    // ev = () => (
        // (this.columns[0].reduce((total, column, index) =>
        //     this.calculate(this.column) * (10 ** i)) +
        // (this.columns[0].reduce((total, column, index) =>
        //     this.calculate(this.column) * (10 ** i)))

    public evaluate() {
        let total = 0

        for (let i = 0; i < this.columns[0].length; i++) {
            total += this.calculate(this.columns[0][i]) * (10 ** i)
        }
        for (let i = 0; i < this.columns[1].length; i++) {
            total += this.calculate(this.columns[1][i]) * (10 ** -(i + 1))
        }

        return total
    }

    // calculate(column: column) {
    //     let total = 0
    //     if (column[0])
    //         total += 5
    //     // the reduce part
    //     for (let bead of column.slice(1))
    //         total += bead
    //     return total
    // }
}

export { Abacus, type column }
