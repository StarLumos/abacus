import { Abacus } from "../Abacus";

class Operation {
    constructor(
        public kind: 'add' | 'subtract',
        public value: number
    ) { }
}

interface Exercise {

}

class FollowingAlong implements Exercise {
    public operations: Operation[]
    public index = 0
    constructor(
        public n: number
    ) {
        this.operations = []
        for (let i = 0; i < n; i++) {
            var kind: 'add' | 'subtract' = Math.random() < 0.50 ? 'add' : 'subtract'
            var value = Math.random() * 100
            if (kind == 'subtract')
                while (this.sum(n) - value < 0)
                    value = Math.random() * 100
            this.operations.push(new Operation(kind, value))
        }
    }

    sum(upto: number): number {
        let sum = 0
        for (let operation of this.operations.slice(0, upto+1))
            sum += operation.kind == 'add' ? operation.value : -operation.value
        return sum
    }
    try(answer: Abacus) {
        if (answer.evaluate() == this.sum(this.index))
            this.index += 1
    }
    isCompleted(): boolean {
        return this.index >= this.operations.length
    }
}

// function isCompleted() {
//     if answer.evaluate() == correct answer
//         trigger next Exercise
// }

// frontend {=
//     var exercise = new FollowingExercise(5)
//     while (exercise.isCompleted() == false) {
//         if (abacasHasChanged)
//             exercise.try(abacus)
//     }

//     exercise.index = exercise.operations.length-1
//     while (exercise.isCompleted() == false) {
//         if (keyboard.press("enter"))
//             exercise.try(abacus)
//     }
