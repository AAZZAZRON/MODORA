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

function addCookie(name, value) {
    var expire = "expires=Fri, 31 Dec 3000 23:59:59 GMT";
    document.cookie += `; ${name}=${value}; ${expire}`;
    console.log(document.cookie);
    console.log(decodeURIComponent(document.cookie));
}
