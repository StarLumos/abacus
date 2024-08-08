import { Abacus, type column } from "@/models/Abacus"

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
