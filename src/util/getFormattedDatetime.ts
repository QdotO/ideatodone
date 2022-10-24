function getFormattedDateTime() {
    var date = new Date()
    var str =
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1) +
        '-' +
        date.getDate() +
        ' ' +
        date.getHours() +
        ':' +
        date.getMinutes() +
        ':' +
        date.getSeconds()

    return str
}

export default getFormattedDateTime
