export function getColorFromMax(value: number, max: number){
    if (value < max * 0.25) return "text-red-500"
    if (value < max * 0.5) return "text-orange-500"
    if (value < max * 0.75) return "text-yellow-500"

    return "text-green-500"
}