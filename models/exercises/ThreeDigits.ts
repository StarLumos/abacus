import { equivalent, range } from "@/utils"
import { Exercise, Operation } from "./Exercise"

class ThreeDigits extends Exercise {
    constructor(n: number) {
        super(n)
    }
    available(latest: number): any {
        let operations: (['add'] | ['subtract'] | ['add', 'subtract']) =
            latest == 0   ? ['add'] :
            latest == 999 ? ['subtract'] :
                            ['add', 'subtract']
        
        var random = Math.floor(Math.random() * 100)

        let conditions = { 
            add: (n: number) => (latest + random <= 999 && random >= 100),
            subtract: (n: number) => (latest - random >= 0 && random >= 100)
        }
        
        let condition: (n: number) => boolean =
        equivalent(operations, ['add']) ? conditions['add'] :
        equivalent(operations, ['subtract']) ? conditions['subtract'] :
            (n: number) => conditions['add'](n) && conditions['subtract'](n)

        return range(1, 20)
            .partition(n => condition(n))[0]
            .map(eligible => 
                operations.length == 1 ? new Operation(operations[0], eligible) :
                [new Operation('add', eligible), new Operation('subtract', eligible)]
            ).flat()
    }
}

export { ThreeDigits }
