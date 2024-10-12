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
        for (const operation of this.operations)
            if (operation.kind == 'add')
                count += operation.value
            else
                count -= operation.value
        return count
    }

    private generate(to: number): void {
        this.operations.push(
            new Operation('add', Math.round(Math.random() * 8 + 1))
        )
        for (let i = 1; i < to; i++) {
            let choice = pick(this.available(this.total))
            if (choice == undefined)
                throw new Error('No available choices')
            this.operations.push(choice)
        }
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
    
    available(latest: number): any {
        let array: Operation[] = []
        
        for (let i = 1; i < 10; i++) {
            var type: 'simple' | 'friends' = Math.random() < 0.50 ? 'simple' : 'friends'
            var kind: 'add' | 'subtract'

            function add() {
                if (type == 'simple') {
                    if ((latest < 4) && (i < 4) && (latest + i < 5)) {
                        array.push(new Operation(kind, i))
                    }
                    else if ((latest < 5) && (i > 4) && (latest + i <= 9)) {
                        array.push(new Operation(kind, i))
                    }
                    else if ((latest >= 5) && (latest + i <= 9)) {
                        array.push(new Operation(kind, i))
                    }
                } else {
                    if ((latest <= 4) && (i <= 4) && (latest + i >= 5))
                        array.push(new Operation(kind, i))
                }
            }

            function subtract() {
                if (type == 'simple') {
                    if ((latest < 5) && (i < 5) && (latest - i >= 0)) {
                        array.push(new Operation(kind, i))
                    }
                    else if ((latest >= 5) && (i < 5) && (latest - i >= 5)) {
                        array.push(new Operation(kind, i))
                    }
                    else if ((latest >= 5) && (i >= 5) && (latest - i >= 0)) {
                        array.push(new Operation(kind, i))
                    }
                } else {
                    if ((latest >= 5) && (i <= 4) && (latest - i < 5))
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
