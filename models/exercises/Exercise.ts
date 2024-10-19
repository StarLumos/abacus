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
        // this.operations.push(
        //     new Operation('add', Math.round(Math.random() * 8 + 1))
        // )
        for (let i = 1; i <= to; i++) {
            let choice = pick(this.available(i == 1 ? 0 : this.total))
            if (choice == undefined)
                throw new Error('No available choices')
            this.operations.push(choice)
        }
    }
}

const range = (start: number, end: number): number[] => 
    Array.from({ length: end - start }, (_, i) => start + i)




// Extending Object prototype
Array.prototype.partition = function<T>(predicate: (value: T, index: number, array: T[]) => boolean): [T[], T[]] {
    return this.reduce(
        (acc, value, index, array) => {
            if (predicate(value, index, array)) {
                acc[0].push(value)
            } else {
                acc[1].push(value)
            }
            return acc
        },
        [[], []] as [T[], T[]]
    )
}

const equivalent = (a: any[], b: any[]) =>
    a.length === b.length && a.every((value, index) => value === b[index])

class Simple extends Exercise {
    constructor(n: number) {
        super(n)
        console.log(`hey: ${range(1,9)}`)
    }

    available(latest: number) {
        let operations: (['add'] | ['subtract'] | ['add', 'subtract']) = 
            latest == 0 ? ['add']  :
            latest == 9 ? ['subtract'] :
                ['add', 'subtract']

        let conditions = {
            add: (n: number) => (
                (latest < 4 && n < 4 && latest + n < 5) ||
                (latest < 5 && n > 4 && latest + n <= 9) ||
                (latest >= 5 && latest + n <= 9)
            ),
            subtract: (n: number) => (
                (latest < 5 && n < 5 && latest - n >= 0) ||
                (latest >= 5 && n < 5 && latest - n >= 5) ||
                (latest >= 5 && n >= 5 && latest - n >= 0)
            )
        }

        let condition: (n: number) => boolean =
            equivalent(operations, ['add']) ? conditions['add'] :
            equivalent(operations, ['subtract']) ? conditions['subtract'] :
                (n: number) => conditions['add'](n) && conditions['subtract'](n)

        return range(1, 10)
            .partition(n => condition(n))[0]
            .map(eligible => 
                operations.length == 1 ? new Operation(operations[0], eligible) :
                [new Operation('add', eligible), new Operation('subtract', eligible)]
            ).flat()
    }
}

class Friends extends Exercise {
    constructor(n: number) {
        super(n)
    }
    
    available(latest: number) {
        // TODO: implement this fp style


        // old imperative way (bad, undefined error prone)
        // let array: Operation[] = []
        
        // for (let i = 1; i < 10; i++) {
        //     var type: 'simple' | 'friends' = Math.random() < 0.50 ? 'simple' : 'friends'
        //     var kind: 'add' | 'subtract'

        //     function add() {
        //         if (type == 'simple') {
        //             if ((latest < 4) && (i < 4) && (latest + i < 5)) {
        //                 array.push(new Operation(kind, i))
        //             }
        //             else if ((latest < 5) && (i > 4) && (latest + i <= 9)) {
        //                 array.push(new Operation(kind, i))
        //             }
        //             else if ((latest >= 5) && (latest + i <= 9)) {
        //                 array.push(new Operation(kind, i))
        //             }
        //         } else {
        //             if ((latest <= 4) && (i <= 4) && (latest + i >= 5))
        //                 array.push(new Operation(kind, i))
        //         }
        //     }

        //     function subtract() {
        //         if (type == 'simple') {
        //             if ((latest < 5) && (i < 5) && (latest - i >= 0)) {
        //                 array.push(new Operation(kind, i))
        //             }
        //             else if ((latest >= 5) && (i < 5) && (latest - i >= 5)) {
        //                 array.push(new Operation(kind, i))
        //             }
        //             else if ((latest >= 5) && (i >= 5) && (latest - i >= 0)) {
        //                 array.push(new Operation(kind, i))
        //             }
        //         } else {
        //             if ((latest >= 5) && (i <= 4) && (latest - i < 5))
        //                 array.push(new Operation(kind, i))
        //         }
        //     }

        //     if (latest == 0) {
        //         kind = 'add'
        //         add()
        //     } else if (latest == 9) {
        //         kind = 'subtract'
        //         subtract()
        //     } else {
        //         kind = "add"
        //         add()
        //         kind = "subtract"
        //         subtract()
        //     }
        // }
        // return array
    }
}

class Relatives extends Exercise {
    constructor(n: number) {
        super(n)
    }
    available(latest: number): any {
        let array: Operation[] = []
        
        for (let i = 1; i < 20; i++) {
            let type: 'simple' | 'relatives'
            const random = Math.random() 
            if (random < 0.5) {
                type = 'simple'
            } else {
                type = 'relatives'
            }
            
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
                    
                    let registry = {
                        1: [9],
                        2: [8, 9],
                        3: [7, 8, 9],
                        4: [6, 7, 8, 9],
                        5: [5],
                        6: [4, 5, 9],
                        7: [3, 4, 5, 8, 9],
                        8: [2, 3, 4, 5, 7, 8, 9],
                        9: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                        11: [9],
                        12: [8, 9],
                        13: [7, 8, 9],
                        14: [6, 7, 8, 9],
                        15: [5],
                        16: [4, 5, 9],
                        17: [3, 4, 5, 8, 9],
                        18: [2, 3, 4, 5, 7, 8, 9],
                        19: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    }
                    try {
                        if (Object.keys(registry).map(parseInt).includes(latest)) {
                            try {
                                console.log(registry[latest])
                                let tmp = registry[latest]
                                if (registry[latest] == undefined)
                                    { tmp = []; console.log(`!!!${latest}`) }
                                else
                                    tmp = registry[latest]
                                
                                for (var value of tmp)
                                    array.push(new Operation(kind, value))
                            } catch (e) {
                                throw new Error(`EEEE: ${e} yo ${latest}`)
                            }
                        }
                    } catch (e) {
                        throw new Error(`EEEE: ${e} yo ${latest}`)
                    }
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
                    let registry = {
                        10: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                        11: [2, 3, 4, 5, 7, 8, 9],
                        12: [3, 4, 5, 8, 9],
                        13: [7, 8, 9],
                        14: [4, 5, 9],
                        15: [5],
                        16: [6, 7, 8, 9],
                        17: [7, 8, 9],
                        18: [8, 9],
                        19: [9],
                    }
                    try {
                        if (Object.keys(registry).map(parseInt).includes(latest)) {
                            for (var value of registry[latest])
                                array.push(new Operation(kind, value))
                        }
                    } catch (e) {
                        throw new Error(`EEEE: ${e} yo ${latest}`)
                    }
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

class Mixed extends Exercise {
    constructor(n: number) {
        super(n)
    }
    available(latest: number): any {
        let array: Operation[] = []
        
        for (let i = 1; i < 20; i++) {
            let type: 'simple' | 'mix'
            const random = Math.random() 
            if (random < 0.5) {
                type = 'simple'
            } else {
                type = 'mix'
            }
            
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
                    let registry = {
                        5: [6, 7, 8, 9],
                        6: [6, 7, 8],
                        7: [6, 7],
                        8: [6],
                        15: [6, 7, 8, 9],
                        16: [6, 7, 8],
                        17: [6, 7],
                        18: [6]
                    }
                    if (Object.keys(registry).map(parseInt).includes(latest)) {
                        for (var value of registry[latest])
                            array.push(new Operation(kind, value))
                    }
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
                    let registry = {
                         11: [6],
                        12: [6, 7],
                        13: [6, 7, 8],
                        14: [6, 7, 8, 9]
                    }
                    if (Object.keys(registry).map(parseInt).includes(latest)) {
                        for (var value of registry[latest])
                            array.push(new Operation(kind, value))
                    }
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
        
        if (array.length == 0 || array.includes(undefined))
            array.push(new Operation('add', 5))
        }

        return array
    }
}

class TwoDigits extends Exercise {
    constructor(n: number) {
        super(n)
    }
    available(latest: number): any {
        let array: Operation[] = []
        
        for (let i = 1; i < 20; i++) {
            var kind: 'add' | 'subtract'
            var num = Math.floor(Math.random() * 100)

            function add() {
                if ((latest + num <= 99) && (num >= 10)) {
                    array.push(new Operation('add', num))
                }
            }

            function subtract() {
                if ((latest - num >= 0) && (num >= 10)) {
                    array.push(new Operation('subtract', num))
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

            if (array.length == 0 || array.includes(undefined))
                array.push(new Operation('add', 50))
        }

        return array
    }
}

class ThreeDigits extends Exercise {
    constructor(n: number) {
        super(n)
    }
    available(latest: number): any {
        let array: Operation[] = []
        
        for (let i = 1; i < 20; i++) {
            var kind: 'add' | 'subtract'
            var num = Math.floor(Math.random() * 1000)

            function add() {
                if ((latest + num <= 999) && (num >= 100)) {
                    array.push(new Operation('add', num))
                }
            }

            function subtract() {
                if ((latest - num >= 0) && (num >= 100)) {
                    array.push(new Operation('subtract', num))
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

            if (array.length == 0 || array.includes(undefined))
                array.push(new Operation('add', 500))
        }
        return array
    }
}

export { Exercise, Simple, Friends, Relatives, Mixed, TwoDigits, ThreeDigits }
