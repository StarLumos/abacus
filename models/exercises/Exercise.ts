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
        console.log(`total()`)
        let count = 0
        // console.log(this.operations)
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
            // this.operations.push(new Operation('add', 1))
        }
    }
}

export { Exercise, Operation }


if (import.meta.vitest) {
    const { it, expect, test} = import.meta.vitest

    test('pick()', () => {
        for (let i = 0; i < 100; i++) {
            const elements = [1, 2, 3, 4, 5]
            expect(elements).toContain(pick(elements))
        }
    })
}