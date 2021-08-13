function sendBadSites(instances) { // creates a global array of the "bad arrays", which is then used by the background to check the websites
    arr = ["https://monkeybananamonkeybananamonkeyandsomekeyboardsmashLKSDFJ.ca/"];
    var ind = instances.length - 2;
    while (ind >= 0) {
        if (instances[ind].checked) {
            arr.push(instances[ind + 1].innerText.substring(0, instances[ind + 1].innerText.length - 2));
        }
        ind -= 2;
    }
    chrome.runtime.sendMessage({message: "update badLinks", content: `${arr.join(", ")}`});
    return arr;
}

function toggle() { // check and uncheck all items
    var checkboxes = document.getElementsByName("x");
    if (check) {
        check = false;
    } else {
        check = true;
    }
    for (let i = 0; i < checkboxes.length; i += 1) {
        checkboxes[i].checked = check;
    }
}
