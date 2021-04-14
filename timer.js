var counter = 1;
function createTimer() {
  document.getElementById("timer").innerText = "00:00:00";
  document.getElementById("subtitle").innerText = "Pomodoro Cycle " + counter;
  chrome.runtime.sendMessage({message: "start stopwatch"})
}

function abortTimer() {
  chrome.runtime.sendMessage({message: "abort"})
  cycle = 1;
}

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
      console.log(request, sender, sendResponse);
      if (request.message == "done") {
        if (cycle == 4) {

        } else {
          alert(`You have completed Cycle ${cycle} of the Pomodoro!\nPlease take a five minute break.`);
        }
      } else {
        document.getElementById("timer").innerText = request.message;
      }
  }
);
