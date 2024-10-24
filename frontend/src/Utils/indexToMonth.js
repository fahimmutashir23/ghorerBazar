export const getMonth = (month, year) => {
    const currentMonth = month -1
    const date = new Date(year, currentMonth);
    const monthName = date.toLocaleString('default', {month: 'long'});
    return `${monthName} ${year}`
}