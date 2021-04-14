// runs everytime the pop up is clicked
window.onload = function() {
    document.getElementById("MainMenu").hidden = false;
    document.getElementById("PomodoroButton").onclick = () => setPomodoro();
}


function setPomodoro() {
    document.getElementById("MainMenu").hidden = true;
    document.getElementById("SetupTimer").hidden = false;

}
