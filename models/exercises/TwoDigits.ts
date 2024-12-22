import { range } from "@/utils"
import { Exercise, Operation } from "./Exercise"

class TwoDigits extends Exercise {
    constructor(n: number) {
        super(n)
    }
    
    available(latest: number) {
        return (
            range(10, 99)
                .partition(n => latest + n <= 99)[0] 
                .map(n => new Operation('add', n))
            .concat(
            range(10, 99)
                .partition(n => latest - n >= 0)[0]
                .map(n => new Operation('subtract', n))
            )
        )
    }
}

export { TwoDigits }
