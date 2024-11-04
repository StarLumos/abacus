import { range } from "@/utils"
import { Exercise, Operation } from "./Exercise"

class Simple extends Exercise {
    constructor(n: number) {
        super(n)
    }

    available(latest: number) {
        return (
            range(1, 10)
                .partition(n => 
                    (latest <= 3 && n <= 4 && latest + n <= 4) ||
                    (latest <= 4 && n >= 5 && latest + n <= 9) ||
                    (latest >= 5 && latest + n <= 9)
                )[0]
                .map(n => new Operation('add', n))
            .concat(
            range(1, 10)
                .partition(n => 
                    (latest <= 4 && n <= 4 && latest - n >= 0) ||
                    (latest >= 6 && n <= 4 && latest - n >= 5) ||
                    (latest >= 5 && n >= 5 && latest - n >= 0)
                )[0]
                .map(n => new Operation('subtract', n)))
        )
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
