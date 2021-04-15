var hr = 0;
var min = 0;
var sec = 0;
var stopwatchStart = false;
var breakOrWork = false;
var timerStart = false;
var stopwatch, timer;
var isTimerDone = false;
aborted = false;
var cycle = 1;
var finish;
var tmp = [];
chrome.runtime.onMessage.addListener(
    function (request) {
        if (request == "begin") {
            cycle = 1;
        }
        if (request.message == "start stopwatch") {
            hr = 0;
            min = 0;
            sec = 0;
            stopwatchStart = true;
            aborted = false;
            stopwatch = setInterval(stopwatchFunction, 1000);
        } else if (request.message == "abort") {
            clearInterval(stopwatch);
            clearInterval(timer);
            aborted = true;
        } else if (request.message == "completed") {
            clearInterval(finish);
        } else if (request.message == "update badLinks") {
          tmp = request.content;
          updateArray(request.content);
        }
    }
);

function timerFunction() {
    if (timerStart) {
      breakOrWork = false;
        sec = parseInt(sec);
        min = parseInt(min);
        hr = parseInt(hr);
        sec -= 1;
        if (sec == -1) {
            sec = 59;
            min -= 1;
        }
        if (min == -1) {
            min = 59;
            hr -= 1;
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
        if (chrome.extension.getViews({type: "popup"}).length == 1) {
            chrome.runtime.sendMessage({message: `${hr}:${min}:${sec}`});
        }
    } else {
        console.log(hr, min, sec, aborted);
        clearInterval(timer);
    }
    if (hr == "0-1") {
        timerStart = false;
        alert("Back to Work!");
        chrome.runtime.sendMessage({message: "text", time: "00:00:00", subtitle: `Pomodoro Cycle ${cycle}`});
        updateArray(tmp);

        // start stopwatch
        clearInterval(timer);
        stopwatchStart = true;
        aborted = false;
        hr = 0;
        min = 0;
        sec = 0;
        stopwatch = setInterval(stopwatchFunction, 1000)
    } else {
    chrome.runtime.sendMessage({message: "text", time: `${hr}:${min}:${sec}`, subtitle: "Take a Break!"})
    }
}


function stopwatchFunction() {
  breakOrWork = true;
  if (stopwatchStart) {
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
    if (chrome.extension.getViews({type: "popup"}).length == 1) {
        chrome.runtime.sendMessage({message: `${hr}:${min}:${sec}`});
    }
  }
  if (hr == "00" && min == "01" && sec == "01") {
    if (!aborted && cycle == 4) {
        clearInterval(stopwatch);
        alert("You are done!");
        finish = setInterval(callPopup, 1000);
    } else {
        stopwatchStart = false;
        alert(`You have completed Cycle ${cycle} of the Pomodoro!\nPlease take a five minute break.`);
        cycle += 1;
        chrome.runtime.sendMessage({message: "text", time: "00:05:00", subtitle: "Take a Break!"});
        updateArray("null");

        clearInterval(stopwatch);
        // start timer
        timerStart = true;
        aborted = false;
        hr = 0;
        min = 1;
        sec = 0;

        timer = setInterval(timerFunction, 500)
    }
  } else {
    chrome.runtime.sendMessage({message: "text", time: `${hr}:${min}:${sec}`, subtitle: `Pomodoro Cycle ${cycle}`})
  }
}

function callPopup() {
  breakOrWork = false;
    chrome.runtime.sendMessage({message: "done"});
}
