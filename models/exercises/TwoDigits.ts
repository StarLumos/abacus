import { range } from "@/utils"
import { Exercise, Operation } from "./Exercise"

class TwoDigits extends Exercise {
    constructor(n: number) {
        super(n)
    }
    
    available(latest: number) {
        const random = Math.floor(Math.random() * 10) + Math.floor(Math.random())
        
        return (
            range(1, 20)
                .partition(n => latest + random <= 99 && random >= 10)[0]
                .map(n => new Operation('add', n))
            .concat(
            range(1, 20)
                .partition(n => latest - random >= 0 && random >= 10)[0]
                .map(n => new Operation('subtract', n)))
        )
    }
}
export { TwoDigits }

