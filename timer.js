function createTimer() {
  document.getElementById("timer").innerText = "00:00:00";
  chrome.runtime.sendMessage({message: "start stopwatch"})
}

function abortTimer() {
  chrome.runtime.sendMessage({message: "abort"})
}

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
      console.log(request, sender, sendResponse);
      if (request.message == "done") {
          // do the done stuff
      } else {
        document.getElementById("timer").innerText = request.message;
      }
  }
);
