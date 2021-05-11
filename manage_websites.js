var websiteDiv;
var validEndings = [".com", ".ca", ".org", ".net", ".edu", ".gov", ".info", ".jobs", ".mil", ".name", ".pro", ".me", ".xyz", ".tel", ".io", ".co", ".me"]


document.getElementById("bb4").onclick = () => mainMenu();
document.getElementById("websites-submit").onclick = () => {
    addNewSite(document.getElementById("websites-add").value);
    document.getElementById("websites-add").value = "";
}
document.getElementById("discard-button").onclick = () => document.getElementById("WebsiteBlocked").children = discardSites(document.getElementById("WebsiteBlocked").children);

function setWebsites() { // creates the set websites GUI
    document.getElementById("MainMenu").hidden = true;
    document.getElementById("SetupTimer").hidden = true;
    document.getElementById("TimerOn").hidden = true;
    document.getElementById("abortedScreen").hidden = true;
    document.getElementById("websitesScreen").hidden = false;
    websiteDiv = document.createElement("div");
    websiteDiv.id = "WebsiteBlocked";
    document.getElementById("websites-list").appendChild(websiteDiv);
    const things = getCookie("banned").split(", ")
    for (let i = 0; i < things.length; i += 1) {
        addToBlockedWebsitesList(things[i]); // add website to blocked list
    }
}

function addToBlockedWebsitesList(inner) { // add known blocked website to the blocked website list (in HTML)
    let check = document.createElement("INPUT");
    check.setAttribute("type", "checkbox");
    check.name = inner;
    let label = document.createElement("LABEL");
    label.innerText = inner + "\n";
    label.className = "boxes";
    label.name = inner;
    websiteDiv.appendChild(check);
    websiteDiv.appendChild(label);
}

function addNewSite(link) { // tries (if possible) to add a new cookie and site
    if (link == "") {
        return;
    } else if (link.substring(0, 8) != "https://") {
        alert('Please enter a valid URL precending with "https://".');
    } else {
        var foundValid = false;
        for (let i = 0; i < validEndings.length; i += 1) {
            if (link.includes(validEndings[i])) {
                link = link.split(validEndings[i])[0] + validEndings[i] + "/";
                foundValid = true;
            }
        }
        if (!foundValid) {
            alert("Please enter a valid URL with a proper domain.");
            return;
        }
        if (getCookie("banned").includes(link)) {
            alert("This website is already blocked.")
            return;
        }
        arr = new Set(getCookie("banned").split(", "))
        arr.add(link);
        addCookie("banned", Array.from(arr).join(", "));
        addToBlockedWebsitesList(link, true);
    }
}


function discardSites(instances) {
    var ind = instances.length - 2;
    while (ind >= 0) { // checks every instance of instances, and if the sites match, discard element from cookie and remove from list
        if (instances[ind].checked) {
            var arr = getCookie("banned").split(", ");
            for (let i = 0; i < arr.length; i += 1) {
                var found = true;
                for (let j = 0; j < Math.min(instances[ind + 1].innerText.length, arr[i].length); j += 1) {
                    if (arr[i][j] != instances[ind + 1].innerText[j]) {
                        found = false;
                    }
                }
                if (found) {
                    arr.splice(i, 1);
                    addCookie("banned", arr.join(", "));
                    break;
                }
            }
            instances[ind].remove();
            instances[ind].remove();
        }
        ind -= 2;
    }
    return instances;
}


