// runs everytime the pop up is clicked
var check;
var chooseBlocked;
var badLinks = [];
var defaultBad = ["https://twitter.com/", "https://www.youtube.com/", "https://www.reddit.com/", "https://www.netflix.com/ca/", "https://www.disneyplus.com/", "https://www.instagram.com/", "https://www.facebook.com/", "https://discord.com/"]

window.onload = function() { // runs everytime the popup extension is opened
    var arr = getCookie("banned").split(", ");
    if (arr.length == 1) { // if no "bad apps", then add the defaultBad
        arr = [];
        for (let i = 0; i < defaultBad.length; i += 1) {
            arr.push(defaultBad[i]);
        }
        addCookie("banned", arr.join(", "));
    }
    var goTo = getCookie("tracker"); // tracker cookie shows where the user last left off
    if (goTo == "") {
        addCookie("tracker", "mainMenu");
        goTo = "mainMenu";
    }
    if (goTo == "mainMenu") {
        mainMenu();
    } else if (goTo == "timerOn") {
        timerSetup();
    }
}

function mainMenu() { // show main menu screen
    check = false;
    addCookie("tracker", "mainMenu");
    document.getElementById("MainMenu").hidden = false;
    document.getElementById("SetupTimer").hidden = true;
    document.getElementById("TimerOn").hidden = true;
    document.getElementById("abortedScreen").hidden = true;
    document.getElementById("websitesScreen").hidden = true;
    document.getElementById("completedScreen").hidden = true;
    document.getElementById("PomodoroButton").onclick = () => setPomodoro();
    document.getElementById("ToDoListButton").onclick = () => setToDoList();
    document.getElementById("ManageWebsitesButton").onclick = () => setWebsites();
}

function setPomodoro() { // show pomodoro setup screen
    document.getElementById("MainMenu").hidden = true;
    document.getElementById("SetupTimer").hidden = false;
    document.getElementById("TimerOn").hidden = true;
    document.getElementById("abortedScreen").hidden = true;
    document.getElementById("websitesScreen").hidden = true;
    document.getElementById("SelectAll").onclick = () => toggle();
    document.getElementById("bb1").onclick = () => {
        chooseBlocked.remove();
        mainMenu();
    };
    document.getElementById("start-button").onclick = () => {
        sendBadSites(document.getElementById("ChooseBlocked").children); 
        chooseBlocked.remove();
        timerSetup();
    }


    // build list based on "banned" list of user
    chooseBlocked = document.createElement("div");
    chooseBlocked.id = "ChooseBlocked";
    document.getElementById("choose-blocked-form").appendChild(chooseBlocked);
    const things = getCookie("banned").split(", ")
    for (let i = 0; i < things.length; i += 1) {
        addToBlockedList(things[i]); // add website to blocked list
    }   
}

function sendBadSites(instances) { // creates a global array of the "bad arrays", which is then used by the background to check the websites
    badLinks = [];
    updateArray(badLinks);
    console.log(instances);
    var ind = instances.length - 2;
    while (ind >= 0) {
        if (instances[ind].checked) {
            badLinks.push(instances[ind + 1].innerText.substring(0, instances[ind + 1].innerText.length - 2));
        }
        ind -= 2;
    }
    updateArray(badLinks);
}




function timerSetup() { // set up the timer screen, start and reset timer
    document.getElementById("MainMenu").hidden = true;
    document.getElementById("SetupTimer").hidden = true;
    document.getElementById("TimerOn").hidden = false;
    document.getElementById("abortedScreen").hidden = true;
    document.getElementById("abort").onclick = () => {
        showAbortScreen();
    }
    if (getCookie("tracker") != "timerOn") { // makes sure that the timer is only set once
        createTimer();
    }
    addCookie("tracker", "timerOn")
}

function showAbortScreen() {
    document.getElementById("MainMenu").hidden = true;
    document.getElementById("SetupTimer").hidden = true;
    document.getElementById("TimerOn").hidden = true;
    document.getElementById("abortedScreen").hidden = false;
    document.getElementById("bb2").onclick = () => mainMenu();
    addCookie("tracker", "mainMenu");
    badLinks = [];
    updateArray(badLinks);
    abortTimer();
}

function showCompletedScreen() {
    document.getElementById("MainMenu").hidden = true;
    document.getElementById("SetupTimer").hidden = true;
    document.getElementById("TimerOn").hidden = true;
    document.getElementById("completedScreen").hidden = false;
    document.getElementById("bb3").onclick = () => mainMenu();
    badLinks = [];
    updateArray(badLinks);
    addCookie("tracker", "mainMenu");
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
    if (!website) { // reuse function for multiple "test cases"
        label.name = "x";
    } else {
        label.name = inner;
    }
    chooseBlocked.appendChild(check);
    chooseBlocked.appendChild(label);
}

function setWebsites() { // creates the set websites GUI
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
        document.getElementById("websites-add").value = "";
    }
    document.getElementById("discard-button").onclick = () => document.getElementById("WebsiteBlocked").children = discardSites(document.getElementById("WebsiteBlocked").children);
    
    chooseBlocked = document.createElement("div");
    chooseBlocked.id = "WebsiteBlocked";
    document.getElementById("websites-list").appendChild(chooseBlocked);
    const things = getCookie("banned").split(", ")
    for (let i = 0; i < things.length; i += 1) {
        addToBlockedList(things[i]); // add website to blocked list
    }
}

function addNewSite(link) { // tries (if possible) to add a new cookie and site
    if (link == "") {
        return;
    } else if (link.substring(0, 5) != "https") {
        alert('Please enter a valid URL precending with "https://".');
    } else {
        arr = new Set(getCookie("banned").split(", "))
        arr.add(link);
        addCookie("banned", Array.from(arr).join(", "));
        addToBlockedList(link, true);
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


