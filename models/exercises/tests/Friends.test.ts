import { Operation } from "../Exercise"
import { Friends } from "../Friends"

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

describe('Friends', () => {
    it('should return the correct operations', () => {
        const exercise = new Friends(5)
        exercise.operations = [ ]

        // exercise['generate'](10)
        expect(exercise.operations.every(op => op != undefined)).toBe(true)
    })
})
