// runs everytime the pop up is clicked
var check = false;
window.onload = function() {
    document.getElementById("MainMenu").hidden = false;
    document.getElementById("PomodoroButton").onclick = () => setPomodoro();
}


function setPomodoro() {
    //hide and unhide
    document.getElementById("MainMenu").hidden = true;
    document.getElementById("SetupTimer").hidden = false;
    document.getElementById("TimerOn").hidden = true;
    document.getElementById("SelectAll").onclick = () => toggle();
    document.getElementById("start-button").onclick = () => timerSetup(document.getElementsByName("x"));
}

function timerSetup(checkboxes) {
    document.getElementById("MainMenu").hidden = true;
    document.getElementById("SetupTimer").hidden = true;
    document.getElementById("TimerOn").hidden = false;
    console.log(checkboxes);
    resetTimer();
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
