export const formatDate = (dateString: string) => {
    let date = new Date(Date.parse(dateString))

    date.setTime(date.setHours(date.getHours() + (0 - new Date().getTimezoneOffset() / 60)))
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
}