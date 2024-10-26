class Operation {
    constructor(
        public kind: 'add' | 'subtract',
        public value: number
    ) { }
}

function pick<T>(elements: T[]): T {
    const index = Math.floor(Math.random() * elements.length)
    return elements[index]
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
        let count = 0
        console.log(this.operations)
        for (const operation of this.operations)
            if (operation.kind == 'add')
                count += operation.value
            else
                count -= operation.value
        return count
    }

    private generate(to: number): void {
        for (let i = 1; i <= to; i++) {
            let choice = pick(this.available(i == 1 ? 0 : this.total))
            // if (choice == undefined)
            //     throw new Error('No available choices')
            this.operations.push(choice)
        }
    }
}

export { Exercise, Operation }
