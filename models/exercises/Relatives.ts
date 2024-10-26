import { equivalent, range } from "@/utils"
import { Exercise, Operation } from "./Exercise"

class Relatives extends Exercise {
    constructor(n: number) {
        super(n)
    }
    
    available(latest: number): any {
        let kind: 'simple' | 'relatives' =
            Math.random() < 0.50 ? 'simple' : 'relatives'
        
        let operations: (['add'] | ['add', 'subtract']) = 
            latest == 0 ? ['add'] : ['add', 'subtract']

        let conditions = {
            add: (n: number) => (
                kind == 'relatives' ? 
                    (latest % 10 <= 4 && latest % 10 + n >= 10 ) ||
                    (latest % 10 >= 5 && latest % 10 <= 9 && n <= 5 && latest % 10 + n >= 10) ||
                    (latest % 10 >= 6 && latest % 10 <= 9 && n >= 6 && latest % 10 + n >= 15)
                :
                    (latest < 4 && n < 4 && latest + n < 5) ||
                    (latest < 5 && n > 4 && latest + n <= 9) ||
                    (latest >= 5 && latest + n <= 9)
            ),
            subtract: (n: number) => (
                kind == 'relatives' ? 
                    (latest % 10 + 10 <= 14) && (n <= 5) && (latest - n <= 9) ||
                    (latest % 10 + 10 <= 14) && (latest - n <= 4) ||
                    (latest % 10 + 10 >= 15) && (latest - n <= 9)
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

export { Relatives }
