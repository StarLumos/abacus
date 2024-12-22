import { pick } from "@/utils"

class Operation {
    constructor(
        public kind: 'add' | 'subtract',
        public value: number
    ) { }
}

abstract class Exercise {
    public operations: Operation[]
    public index = 0

    constructor(
        public n: number,
    ) {
        this.operations = []
        this.generate(n)
    }

    abstract available(last: number): Operation[]

    get total() {
        console.log(`total()`)
        let count = 0
        for (const operation of this.operations)
            if (operation.kind == 'add')
                count += operation.value
            else
                count -= operation.value
        return count
    }

    private generate(to: number): void {
        console.log(`generating ${to} operations`)
        for (let i = 1; i <= to; i++) {
            console.log(`checking i = ${i}`)
            let choice = pick(this.available(i == 1 ? 0 : this.total))
            console.log(`choice = ${choice.kind == 'add' ? '+' : '-'}${choice.value}`)
            if (choice == undefined)
                throw new Error('No available choices')
            this.operations.push(choice)
        }
    }
}

export { Exercise, Operation }

