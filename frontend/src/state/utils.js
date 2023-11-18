// BigInts are the death of me 

export const fixBigIntTypes = (obj) => {
    for (const key in obj) {
        const value = obj[key]
        if (typeof value == 'bigint') {
            obj[key] = Number(value)
        }
    }
    return obj
}