import { Abacus } from "../Abacus";
import { Alert } from "react-native";


class Operation {
    constructor(
        public kind: 'add' | 'subtract',
        public value: number
    ) { }
}

const friendspair = (a: number, b: number) =>
    b + a == 5

const relativespair = (a: number, b: number) =>
    b + a == 10

function pick<T>(elements: T[]): T {
    console.log('running pick()')
    const index = Math.floor(Math.random() * elements.length)
    console.log('--randomly generated index: ', index)
    console.log('--length of elements: ', elements.length)
    console.log("pick me!: ", elements[index])
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
        console.log(`running total()`)
        console.log('--length of operations: ', this.operations.length)
        let count = 0
        try {
            console.log('--operations we have so far:', this.operations)
            for (const operation of this.operations)
                if (operation.kind == 'add')
                    count += operation.value
                else
                    count -= operation.value
        } catch (e) {
            console.log("--ERROR", e)
        }
        console.log(`--total: ${count}`)
        return count
    }

    private generate(to: number): void {
        console.log(`running generate(${to}) `)
        this.operations.push(
            new Operation('add', Math.round(Math.random() * 8 + 1))
        )
        console.log('--added first operation: ', this.operations[0])
        for (let i = 1; i < to; i++) {
            this.operations.push(
                pick(this.available(this.total)))
        }
        console.log('--generated all operations: ', this.operations)
    }
}

class Simple extends Exercise {
    constructor(n: number) {
        super(n)
    }

    available(latest: number): Operation[] {
        let array: Operation[] = []
        for (let i = 1; i < 10; i++) {
            var kind: 'add' | 'subtract'
            
            function add() {
                if ((latest < 4) && (i < 4) && (latest + i < 5)) {
                    array.push(new Operation(kind, i))
                }
                else if ((latest < 5) && (i > 4) && (latest + i <= 9)) {
                    array.push(new Operation(kind, i))
                }
                else if ((latest >= 5) && (latest + i <= 9)) {
                    array.push(new Operation(kind, i))
                }
            }

            function subtract() {
                if (latest > 5) {
                    if (i < 5)
                        console.log(`i < 5: ${latest} - ${i} >= 5 == ${latest - i >= 5}`)
                    else if (i <= 5)
                        console.log(`i >= 5: ${latest} - ${i} >= 0 == ${latest - i >= 0}`)
                }

                if ((latest < 5) && (i < 5) && (latest - i >= 0)) {
                    array.push(new Operation(kind, i))
                }
                else if ((latest >= 5) && (i < 5) && (latest - i >= 5)) {
                    array.push(new Operation(kind, i))
                }
                else if ((latest >= 5) && (i >= 5) && (latest - i >= 0)) {
                    array.push(new Operation(kind, i))
                }
            }
            
            if (latest == 0) {
                kind = 'add'
                add()
            } else if (latest == 9) {
                kind = 'subtract'
                subtract()
            } else {
                kind = "add"
                add()
                kind = "subtract"
                subtract()
            }
        }
        return array
    }
}

class Friends extends Exercise {
    constructor(n: number) {
        super(n)
    }
    available(n: number): any {
        let array: Operation[] = []
        for (let i = 1; i < 10 - n; i++) {
            var type: 'simple' | 'friends' = Math.random() < 0.50 ? 'simple' : 'friends'
            var kind: 'add' | 'subtract' = Math.random() < 0.50 ? 'add' : 'subtract'
            if (type == 'simple')
                if (kind == 'add')
                    if ((n < 4) && (i < 4) && (n + i < 5))
                        array.push(new Operation(kind, i))
                    else if ((n < 5) && (i > 4) && (n + i <= 9))
                        array.push(new Operation(kind, i))
                    else if ((n >= 5) && (n + i <= 9))
                        array.push(new Operation(kind, i))
                    else
                        if ((i < 5) && (n - i >= 0))
                            array.push(new Operation(kind, i))
                        else if ((n >= 5) && (i <= 4) && (n - i >= 5))
                            array.push(new Operation(kind, i))
                        else if ((n >= 5) && (i >= 5) && (n - i >= 0))
                            array.push(new Operation(kind, i))
                        else
                            if (kind == 'add')
                                if ((n <= 4) && (i <= 4) && (n + i >= 5))
                                    array.push(new Operation(kind, i))
                                else
                                    if ((n >= 5) && (i <= 4) && (n - i >= 0) && (n - i < 5))
                                        array.push(new Operation(kind, i))
        }
        return array
    }
}

class Relatives extends Exercise {
    constructor(n: number) {
        super(n)
    }
    available(n: number): any {

    }
}

class Mix extends Exercise {
    constructor(n: number) {
        super(n)
    }
    available(n: number): any {

    }
}

class TwoDigits extends Exercise {
    constructor(n: number) {
        super(n)
    }
    available(n: number): any {

    }
}

class ThreeDigits extends Exercise {
    constructor(n: number) {
        super(n)
    }
    available(n: number): any {

    }
}

export { Exercise, Simple, Friends, Relatives, Mix, TwoDigits, ThreeDigits }
