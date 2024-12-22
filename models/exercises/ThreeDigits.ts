import { range } from "@/utils"
import { Exercise, Operation } from "./Exercise"

class ThreeDigits extends Exercise {
    constructor(n: number) {
        super(n)
    }
    
    available(latest: number) {
        return (
            range(100, 999)
                .partition(n => latest + n <= 999)[0]
                .map(n => new Operation('add', n))
            .concat(
            range(100, 999)
                .partition(n => latest - n >= 0)[0]
                .map(n => new Operation('subtract', n)))
        )
    }
}

export { ThreeDigits }
