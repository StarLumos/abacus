const equivalent = (a: any[], b: any[]) =>
    a.length === b.length && a.every((value, index) => value === b[index])

const range = (start: number, end: number): number[] => 
    Array.from({ length: end - start }, (_, i) => start + i)

export { equivalent, range }
