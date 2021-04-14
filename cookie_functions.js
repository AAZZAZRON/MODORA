function getCookie(name) {
    var find = name + "=";
    var things = decodeURIComponent(document.cookie).split("; ");
    console.log(things);
    for (let i = 0; i < things.length; i += 1) {
        var found = true;
        for (let j = 0; j < find.length; j += 1) {
            if (things[i][j] != find[j]) {
                found = false;
                break;
            }
        }
        if (found) {
            return things[i].split(find)[1];
        }
    }
    return "notFound";
}

