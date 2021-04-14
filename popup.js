// runs everytime the pop up is clicked
var check;
var chooseBlocked;
var defaultBad = ["twitter", "youtube", "reddit", "netflix", "disneyplus", "instagram", "facebook", "discord"]

window.onload = function() { // add all the default "bads"
    getToDoList();
    for (let i = 0; i < defaultBad.length; i += 1) {
        addCookie(defaultBad[i], "==banned");
    }
    console.log(document.cookie);
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
    document.getElementById("bb1").onclick = () => mainMenu();
    document.getElementById("start-button").onclick = () => timerSetup(document.getElementsByName("x"));


    // build list based on "banned" list of user
    chooseBlocked = document.createElement("div");
    chooseBlocked.id = "ChooseBlocked";
    document.getElementById("choose-blocked-form").appendChild(chooseBlocked);
    const things = decodeURIComponent(document.cookie).split("; ");
    for (let i = 0; i < things.length; i += 1) {
        const values = things[i].split("===");
        if (values[1] == "banned") {
            addToBlockedList(values[0]); // add website to blocked list
        }
    }
}

function setWebsites() {
    document.getElementById("MainMenu").hidden = true;
    document.getElementById("SetupTimer").hidden = true;
    document.getElementById("TimerOn").hidden = true;
    document.getElementById("abortedScreen").hidden = true;
    document.getElementById("websitesScreen").hidden = false;
    document.getElementById("bb4").onclick = () => mainMenu();
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

function addToBlockedList(inner) { // add known blocked website to the blocked website list (in HTML)
    let check = document.createElement("INPUT");
    check.setAttribute("type", "checkbox");
    check.name = "x";
    let label = document.createElement("LABEL");
    label.innerText = inner + "\n";
    label.className = "boxes";
    console.log(check);
    console.log(label);
    chooseBlocked.appendChild(check);
    chooseBlocked.appendChild(label);
}
