var hr = 0;
var min = 0;
var sec = 0;
var start = true;
var isDone = true;
var stopwatch;
var isTimerDone = false;
aborted = false;

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request, sender, sendResponse);
        if (request.message == "start stopwatch") {
            start = true;
            stopwatch = setInterval(stopwatchFunction, 1000);
        } else if (request.message == "abort") {
            start = false;
            aborted = true;
        }
    }
);

function stopwatchFunction() {
  if (start) {
    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);

    sec += 1;

    if (sec == 60) {
      min += 1;
      sec = 0;
    }
    if (min == 60) {
      hr += 1;
      min = 0;
      sec = 0;
    }

    if (sec < 10 || sec == 0) {
      sec = '0' + sec;
    }
    if (min < 10 || min == 0) {
      min = '0' + min;
    }
    if (hr < 10 || hr == 0) {
      hr = '0' + hr;
    }
    console.log(hr, min, sec);
    chrome.runtime.sendMessage({message: `${hr}:${min}:${sec}`});

  } else {
    if (!aborted) {
        chrome.runtime.sendMessage({message: "done"})
    }
    aborted = false;
    resetTimer();
    clearInterval(stopwatch);
  }
  if (hr == "00" && min == "25" && sec == "00") {
    start = false;
  }
}

function resetTimer() {
  start = false;
  hr = 0;
  sec = 0;
  min = 0;
}

