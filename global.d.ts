declare global {
    interface Array<T> {
        partition(predicate: (value: T) => boolean): [T[], T[]]
    }

    interface Object {
        partition<T>(this: Record<string, T>, predicate: (value: T, key: string) => boolean): [Record<string, T>, Record<string, T>]
    }
}

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

export { }