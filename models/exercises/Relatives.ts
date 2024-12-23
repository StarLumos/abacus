import { range } from "@/utils"
import { Exercise, Operation } from "./Exercise"

class Relatives extends Exercise {
    constructor(n: number) {
        super(n)
    }
    
    available(latest: number) {
        return (
            range(1, 10)
                .partition(n => 
                    (latest == 0 && n >= 1 && n <= 9) ||
                    (latest % 10 <= 4 && latest % 10 + n >= 10) ||
                    (latest % 10 >= 5 && n <= 5 && latest % 10 + n >= 10) ||
                    (latest % 10 >= 6 && n >= 6 && latest % 10 + n >= 15)
                )[0]
                .map(n => new Operation('add', n))
            .concat(
            range(1, 10)
                .partition(n => 
                    (latest % 10 + 10 <= 14 && n <= 5 && latest - n <= 9 && latest - n >= 0) ||
                    (latest % 10 + 10 <= 13 && n >= 6 && latest - n <= 4 && latest - n >= 0) ||
                    (latest % 10 + 10 >= 15 && n >= 6 && latest - n <= 9 && latest - n >= 0) ||
                    (latest % 10 + 10 == 19 && n >= 1 && n <= 9)
                )[0]
                .map(n => new Operation('subtract', n)))
        )
    }
}

export { Relatives }
