// runs everytime the pop up is clicked
var check;
var chooseBlocked;
var defaultBad = ["https://twitter.com/", "https://www.youtube.com/", "https://www.reddit.com/", "https://www.netflix.com/ca/", "https://www.disneyplus.com/", "https://www.instagram.com/", "https://www.facebook.com/", "https://discord.com/"]

window.onload = function() { // add all the default "bads"
    var arr = getCookie("banned").split(", ");
    console.log(arr, arr.length);
    if (arr.length == 1) {
        arr = [];
        for (let i = 0; i < defaultBad.length; i += 1) {
            arr.push(defaultBad[i]);
        }
        console.log(arr);
        addCookie("banned", arr.join(", "));
    }
    var goTo = getCookie("tracker");
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
    document.getElementById("ToDoList").hidden = true;
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
        chooseBlocked.remove();
        timerSetup(document.getElementsByName("x"));
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

function timerSetup(checkboxes) { // set up the timer screen, start and reset timer
    document.getElementById("MainMenu").hidden = true;
    document.getElementById("SetupTimer").hidden = true;
    document.getElementById("TimerOn").hidden = false;
    document.getElementById("abortedScreen").hidden = true;
    console.log(checkboxes);
    document.getElementById("abort").onclick = () => {
        showAbortScreen();
    }
    if (getCookie("tracker") != "timerOn") {
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
    abortTimer();
}

function showCompletedScreen() {
    document.getElementById("MainMenu").hidden = true;
    document.getElementById("SetupTimer").hidden = true;
    document.getElementById("TimerOn").hidden = true;
    document.getElementById("completedScreen").hidden = false;
    document.getElementById("bb3").onclick = () => mainMenu();
    addCookie("tracker", "mainMenu");
}


function toggle() { // check and uncheck all items
    var checkboxes = document.getElementsByName("x");
    console.log(checkboxes);
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
        document.getElementById("websites-add").value = "";
    }
    document.getElementById("discard-button").onclick = () => document.getElementById("WebsiteBlocked").children = discardSites(document.getElementById("WebsiteBlocked").children);
    
    chooseBlocked = document.createElement("div");
    chooseBlocked.id = "WebsiteBlocked";
    document.getElementById("websites-list").appendChild(chooseBlocked);
    console.log(document.cookies);
    const things = getCookie("banned").split(", ")
    for (let i = 0; i < things.length; i += 1) {
        addToBlockedList(things[i]); // add website to blocked list
    }
}

function addNewSite(link) {
    console.log(link.substring(0, 5))
    if (link == "") {
        return;
    } else if (link.substring(0, 5) != "https") {
        alert("Please enter a valid https link");
    } else {
        arr = getCookie("banned").split(", ")
        arr.push(link);
        addCookie("banned", arr.join(", "));
        addToBlockedList(link, true);
    }
}


function discardSites(instances) {
    var ind = instances.length - 2;
    while (ind >= 0) {
        console.log(ind, instances[ind].name, instances[ind].checked);
        if (instances[ind].checked) {
            console.log(instances[ind + 1].innerText);
            var arr = getCookie("banned").split(", ");
            for (let i = 0; i < arr.length; arr += 1) {
                if (arr[i] == instances[ind + 1].innerText) {
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