function addToBlockedList(inner, website=false) { // add known blocked website to the blocked website list (in HTML)
    let check = document.createElement("INPUT");
    check.setAttribute("type", "checkbox");
    if (!website) {
        check.name = "x";
    } else {
        check.name = inner;
    }
    let label = document.createElement("LABEL");
    label.innerText = inner + "\n";
    label.className = "boxes";
    if (!website) {
        label.name = "x";
    } else {
        label.name = inner;
    }

    console.log(check);
    console.log(label);
    chooseBlocked.appendChild(check);
    chooseBlocked.appendChild(label);
}

function setWebsites() {
    document.getElementById("MainMenu").hidden = true;
    document.getElementById("SetupTimer").hidden = true;
    document.getElementById("TimerOn").hidden = true;
    document.getElementById("abortedScreen").hidden = true;
    document.getElementById("websitesScreen").hidden = false;
    document.getElementById("bb4").onclick = () => {
        chooseBlocked.remove();
        mainMenu();
    };
    document.getElementById("websites-submit").onclick = () => {
        addNewSite(document.getElementById("websites-add").value);
    }
    document.getElementById("discard-button").onclick = () => document.getElementById("WebsiteBlocked").children = discardSites(document.getElementById("WebsiteBlocked").children);
    
    chooseBlocked = document.createElement("div");
    chooseBlocked.id = "WebsiteBlocked";
    document.getElementById("websites-list").appendChild(chooseBlocked);
    console.log(document.cookies);
    const things = decodeURIComponent(document.cookie).split("; ");
    for (let i = 0; i < things.length; i += 1) {
        const values = things[i].split("===");
        if (values[1] == "banned") {
            addToBlockedList(values[0]); // add website to blocked list
        }
    }
}

function addNewSite(link) {
    console.log(link.substring(0, 5))
    if (link == "") {
        return;
    } else if (link.substring(0, 5) != "https") {
        return;
    } else {
        addCookie(link, "==banned");
        addToBlockedList(link, true);
    }
}


function discardSites(instances) {
    var ind = instances.length - 2;
    while (ind >= 0) {
        console.log(ind, instances[ind].name, instances[ind].checked);
        if (instances[ind].checked) {
            console.log(instances[ind + 1].innerText)
            instances[ind].remove();
            instances[ind].remove();
        }
        ind -= 2;
    }
    return instances;
}