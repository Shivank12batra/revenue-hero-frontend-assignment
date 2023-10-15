export const filterData = (data, days) => {
    return data.filter(row => row.lastSeen <= days)
}