import { equivalent, range } from "@/utils"
import { Exercise, Operation } from "./Exercise"

class Simple extends Exercise {
    constructor(n: number) {
        super(n)
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

export { Simple }

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