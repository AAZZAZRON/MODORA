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
        if (request.message == "start stopwatch") {
            hr = 0;
            min = 0;
            sec = 0;
            cycle = 1;
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
      if (chrome.extension.getViews({type: "popup"}).length == 1) {
          chrome.runtime.sendMessage({message: `${hr}:${min}:${sec}`});
      }
  } else {
      clearInterval(timer);
  }
  if (hr == "0-1") {
      timerStart = false;
      alert("Back to Work!");
      chrome.runtime.sendMessage({message: "text", time: "00:00:00", subtitle: `Pomodoro Cycle ${cycle}`});
      updateArray(tmp);
      localStorage.setItem("nyaa",localStorage.getItem("TEMP"));

      // start stopwatch
      clearInterval(timer);
      stopwatchStart = true;
      aborted = false;
      hr = 0;
      min = 0;
      sec = 0;
      stopwatch = setInterval(stopwatchFunction, 1000)
  } else {
    addCookie("time", `${hr}:${min}:${sec}`);
    addCookie("subtitle", "Take a Break!");
    chrome.runtime.sendMessage({message: "text", time: `${hr}:${min}:${sec}`, subtitle: "Take a Break!"})
  }
}


function stopwatchFunction() {
  breakOrWork = true;
  if (stopwatchStart) {
    sec = parseInt(sec) + 1;
    min = parseInt(min);
    hr = parseInt(hr);

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
    if (chrome.extension.getViews({type: "popup"}).length == 1) {
        chrome.runtime.sendMessage({message: `${hr}:${min}:${sec}`});
    }
  }
  if (hr == "00" && min == "25" && sec == "01") {
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
        badArray = ["*://*.thisisnotarealwebsite.com/*","*://*.ijustneedaplaceholderorelsethiswillerror.com/*"];
        localStorage.setItem("TEMP",localStorage.getItem("nyaa"));
        localStorage.setItem("nyaa",badArray);

        clearInterval(stopwatch);
        // start timer
        timerStart = true;
        aborted = false;
        hr = 0;
        min = 5;
        sec = 0;

        timer = setInterval(timerFunction, 1000)
    }
  } else {
    addCookie("time", `${hr}:${min}:${sec}`);
    addCookie("subtitle", `Pomodoro Cycle ${cycle}`);
    chrome.runtime.sendMessage({message: "text", time: `${hr}:${min}:${sec}`, subtitle: `Pomodoro Cycle ${cycle}`})
  }
}

function callPopup() {
  breakOrWork = false;
  chrome.runtime.sendMessage({message: "done"});
}
