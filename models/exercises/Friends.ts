import { equivalent, range } from "@/utils"
import { Exercise, Operation } from "./Exercise"

class Friends extends Exercise {
    constructor(n: number) {
        super(n)
    }

    available(latest: number) {
        const kind = Math.random() < 0.50 ? 'simple' : 'friends'
        const operations: ['add'] | ['subtract'] | ['add', 'subtract'] =
            latest == 0 ? ['add'] :
            latest == 9 ? ['subtract'] :
                          ['add', 'subtract']

        let conditions = {
            add: (n: number) => (
                kind == 'friends' ? 
                    (latest <= 4 && n <= 4 && latest + n >= 5)
                :
                    (latest < 4 && n < 4 && latest + n < 5) ||
                    (latest < 5 && n > 4 && latest + n <= 9) ||
                    (latest >= 5 && latest + n <= 9)
            ),
            subtract: (n: number) => (
                kind == 'friends' ? 
                    (latest >= 5 && n <= 4 && latest - n < 5)
                :
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

export { Friends }
