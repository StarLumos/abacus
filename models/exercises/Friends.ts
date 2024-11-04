import { range } from "@/utils"
import { Exercise, Operation } from "./Exercise"

class Friends extends Exercise {
    constructor(n: number) {
        super(n)
    }

    available(latest: number) {
        console.log(`available(${latest})`)
        const kind = Math.random() < 0.50 ? 'simple' : 'friends'
        console.log(`kind ${kind}`)

        return (
            range(1, 10)
                .partition(n => 
                    kind == 'friends' && latest > 0 ? 
                        (latest <= 4 && n <= 4 && latest + n >= 5)
                    :
                        (latest <= 3 && n <= 3 && latest + n <= 4) ||
                        (latest <= 4 && n >= 5 && latest + n <= 9) ||
                        (latest >= 5 && latest + n <= 9)
                )[0] 
                .map(n => new Operation('add', n))
            .concat(
            range(1, 10)
                .partition(n => 
                    kind == 'friends' && latest < 9 ? 
                        (latest >= 5 && n <= 4 && latest - n <= 4)
                    :
                        (latest <= 4 && n <= 4 && latest - n >= 0) ||
                        (latest >= 6 && n <= 4 && latest - n >= 5) ||
                        (latest >= 5 && n >= 5 && latest - n >= 0)
                )[0]
                .map(n => new Operation('subtract', n)))
        )
    }
}

export { Friends }
