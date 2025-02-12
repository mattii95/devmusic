export const addHoursDate = (dateTime: number, hours: number) => {
    const now = new Date(dateTime)
    return now.setHours(now.getHours() + hours);
}