import { Abacus } from "../Abacus";

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
        console.log("SDFJKSD:LJKFFJ")
        this.operations = this.generate(n)
    }
    
    abstract available(n: number): Operation[]
    
    get total() {
        let count = 0
        for (const operation of this.operations)
            if (operation.kind == 'add')
                count += operation.value
            else
                count -= operation.value
        return count
    }

    private generate(to: number): Operation[] {
        const operations = []
        for (let i = 0; i < to; i++) 
            operations.push(pick(this.available(this.total)))
        console.log("operations", operations)
        return operations
    }
    
    // try(answer: number) {
    //     if (answer == this.add(this.index))
    //         this.index += 1
    // }

    // isCompleted(): boolean {
    //     if (this.infinity == false)
    //         return this.index >= this.operations.length
    //     else
    //         return false
    // }
}

class Simple extends Exercise {
    constructor(n: number) {
        super(n)
    }
    available(n: number): Operation[] {
        let array: Operation[] = []
        for (let i = 1; i < 10 - n; i++) {
            var kind: 'add' | 'subtract' = Math.random() < 0.50 ? 'add' : 'subtract'
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

// class FollowingAlong implements Exercise {
//     public _operations: Operation[]
//     public index = 0
//     constructor(
//         public n: number
//     ) {
//         this._operations = []
//         for (let i = 0; i < n; i++) {
//             var kind: 'add' | 'subtract' = Math.random() < 0.50 ? 'add' : 'subtract'
//             var value = Math.random() * 100
//             if (kind == 'subtract')
//                 while (this.sum(n) - value < 0)
//                     value = Math.random() * 100
//             this._operations.push(new Operation(kind, value))
//         }
//     }

//     sum(upto: number): number {
//         let sum = 0
//         for (let operation of this._operations.slice(0, upto+1))
//             sum += operation.kind == 'add' ? operation.value : -operation.value
//         return sum
//     }

//     try(answer: Abacus) {
//         if (answer.evaluate() == this.sum(this.index))
//             this.index += 1
//     }
//     isCompleted(): boolean {
//         return this.index >= this._operations.length
//     }
// }

// function isCompleted() {
//     if answer.evaluate() == correct answer
//         trigger next Exercise
// }

// frontend {=
//     var exercise = new FollowingExercise(5)
//     while (exercise.isCompleted() == false) {
//         if (abacasHasChanged)
//             exercise.try(abacus)
//     }

//     exercise.index = exercise.operations.length-1
//     while (exercise.isCompleted() == false) {
//         if (keyboard.press("enter"))
//             exercise.try(abacus)
//     }

export { Exercise, Simple, Friends, Relatives, Mix, TwoDigits, ThreeDigits }