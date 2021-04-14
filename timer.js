function createTimer() {
  document.getElementById("timer").innerText = "00:00:00";
  document.getElementById("subtitle").innerText = "Pomodoro Cycle 1";
  chrome.runtime.sendMessage({message: "begin"})
  chrome.runtime.sendMessage({message: "start stopwatch"})
}

function abortTimer() {
  chrome.runtime.sendMessage({message: "abort"})
}

chrome.runtime.onMessage.addListener(
  function (request) {
    console.log(request);
      if (request.message == "done") {// if stopwatch is done
          alert("You are done!");
      } else { // if it is not done
      document.getElementById("timer").innerText = request.time;
      document.getElementById("subtitle").innerText = request.subtitle;
      }
  }
);
