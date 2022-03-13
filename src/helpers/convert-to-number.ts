export function convertToNumber (val: string | number | undefined): number {
    if (val === '' && Number.isNaN(Number(val))) {
        return 0
    }
    return Number(val)
}