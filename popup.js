// runs everytime the pop up is clicked
var check = false;
var chooseBlocked;
var defaultBad = ["twitter", "youtube", "reddit", "netflix", "disneyplus", "instagram", "facebook", "discord"]

window.onload = function() { // add all the default "bads"
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
    addCookie("tracker", "mainMenu");
    document.getElementById("back-button").onclick = () => mainMenu();
    document.getElementById("MainMenu").hidden = false;
    document.getElementById("SetupTimer").hidden = true;
    document.getElementById("TimerOn").hidden = true;
    document.getElementById("PomodoroButton").onclick = () => setPomodoro();
}

function setPomodoro() { // show pomodoro setup screen
    document.getElementById("MainMenu").hidden = true;
    document.getElementById("SetupTimer").hidden = false;
    document.getElementById("TimerOn").hidden = true;
    document.getElementById("SelectAll").onclick = () => toggle();
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
    resetTimer();
}


function timerSetup(checkboxes) { // set up the timer screen, start and reset timer
    addCookie("tracker", "timerOn")
    document.getElementById("MainMenu").hidden = true;
    document.getElementById("SetupTimer").hidden = true;
    document.getElementById("TimerOn").hidden = false;
    console.log(checkboxes);
    document.getElementById("abort").onclick = () => {
        mainMenu();
    }
    startTimer();
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
