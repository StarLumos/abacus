import { range } from "@/utils"
import { Exercise, Operation } from "./Exercise"

class ThreeDigits extends Exercise {
    constructor(n: number) {
        super(n)
    }
    
    available(latest: number) {
        const random = Math.floor(Math.random() * 100 + Math.random() * 10 + Math.random())
        
        return (
            range(1, 20)
                .partition(n => latest + random <= 999 && random >= 100)[0]
                .map(n => new Operation('add', n))
            .concat(
            range(1, 20)
                .partition(n => latest - random >= 0 && random >= 100)[0]
                .map(n => new Operation('subtract', n)))
        )
    }
}

export { ThreeDigits }
