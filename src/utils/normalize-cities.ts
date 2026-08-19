export function normalizeCities(city: string) {
    return city
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
}