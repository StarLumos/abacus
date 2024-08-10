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

        return total
    }

    public clone(): Abacus {
        return new Abacus(
            this.columns
        )
    }
}

export { Abacus, type column }
