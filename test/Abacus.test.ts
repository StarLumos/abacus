import { Abacus, type column } from "@/models/Abacus"
import { Simple } from "@/models/exercises/Simple"

describe('abacus', () => {
    it('calculates individual columns', () => {
        let columns: [column[], column[]] = [
            [[1, 1, 1, 1, 0]],
            [[0, 0, 0, 0, 0]]
        ]
        let abacus007 = new Abacus(columns)
        expect(abacus007['calculate'](abacus007.columns[0][0])).toBe(8)
    })
    it('evaluate abacus state', () => {
        const columns: [column[], column[]] = [
            [
                [0, 1, 1, 1, 1],
                [0, 1, 1, 1, 0],
                [0, 1, 1, 0, 0],
                [0, 1, 0, 0, 0]
            ],
            [
                [1, 0, 0, 0, 0],
                [1, 1, 0, 0, 0],
                [1, 1, 1, 0, 0],
                [1, 1, 1, 1, 0]
            ]
        ]
        const abacus = new Abacus(columns)
        expect(abacus.evaluate()).toBe(1234.5678)
    })
})

describe('calculations', () => {
    it('calculates simple', () => {
        const exercise = new Simple(5)
        
        // console.log(exercise.available(1))
        
        // expect(exercise.available(2)).toBeDefined()
        // expect(exercise.available(3)).toBeDefined()
        // expect(exercise.available(4)).toBeDefined()
        // expect(exercise.available(5)).toBeDefined()
        // expect(exercise.available(6)).toBeDefined()
        // expect(exercise.available(7)).toBeDefined()
        // expect(exercise.available(8)).toBeDefined()
        // expect(exercise.available(9)).toBeDefined()
        // expect(exercise.available(10)).toBeDefined()
        // expect(exercise.available(11)).toBeDefined()
        // expect(exercise.available(12)).toBeDefined()
        
    })
})