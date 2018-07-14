var filters = {
    timeGsh(item) {
        if (item.indexOf("T") == -1) {
            return item;
        }
        return item.substr(0, item.indexOf("T"));
    },
    dateTimeGsh(item) {
        var date = item.substr(0, item.indexOf("T"));
        var time = item.substr(item.indexOf("T") + 1, 8)

        return date + ' ' + time;
    },
    mouthTimeGsh(item) {
        var date = item.substr(5, 5);
        var time = item.substr(item.indexOf("T") + 1, 8)

        return date + ' ' + time;
    }
}

export default filters;