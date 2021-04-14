// runs everytime the pop up is clicked
window.onload = function() {
    document.getElementById("MainMenu").hidden = false;
    document.getElementById("PomodoroButton").onclick = () => setPomodoro();
}


function setPomodoro() {
    //hide and unhide
    document.getElementById("MainMenu").hidden = true;
    document.getElementById("SetupTimer").hidden = false;
    document.getElementById("TimerOn").hidden = true;
    document.getElementById("SelectAll").onclick = () => toggle(document.getElementById("SelectAll").checked);
    document.getElementById("start-button").onclick = () => {
        console.log("CLICKED")
        timerSetup(document.getElementsByName("x"));
    }
}

function timerSetup(checkboxes) {
    document.getElementById("MainMenu").hidden = true;
    document.getElementById("SetupTimer").hidden = true;
    document.getElementById("TimerOn").hidden = false;
    console.log(checkboxes);
    startTimer();
}

function toggle(source) { // check and uncheck all items
    var checkboxes = document.getElementsByName("x");
    console.log(checkboxes);
    for (let i = 0; i < checkboxes.length; i += 1) {
        checkboxes[i].checked = source;
    }
}
