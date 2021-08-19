function createTimer() {
  document.getElementById("timer").innerText = "00:00:00";
  document.getElementById("subtitle").innerText = "Pomodoro Round 1 Cycle 1";
  chrome.runtime.sendMessage({message: "start stopwatch"})
  addCookie("timer-on", "on");
}


chrome.runtime.onMessage.addListener(
  function (request) {
      if (request.message == "done") {// if stopwatch is done
        showCompletedScreen();
        chrome.runtime.sendMessage({message: "completed"});
        addCookie("timer-on", "off");
      } else { // if it is not done
        document.getElementById("timer").innerText = getCookie("time");
        document.getElementById("subtitle").innerText = getCookie("subtitle");
      }
  }
);

