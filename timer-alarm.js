var hr = 0;
var min = 0;
var sec = 0;
var start = true;
var isDone = true;
var stopwatch;


function startTimer() {
  start = true;
  stopwatch = setInterval(timing, 1000);
}

function stoptTimer() {
  start = false;
}

function timing() {
  if(start) {
    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);


sec -= 1;

    if (sec == 00) {
      min -= 1;
      sec = 59;
    }
    if (min == 00) {
      hr -= 1;
      min = 59;
      sec = 59;
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

    document.getElementById("timer").innerText = hr + ':' + min + ':' + sec;

  } else {
    clearInterval(stopwatch);
  }
}

function resetTimer() {
  document.getElementById("timer").innerText = '00:05:00';
  start = false;
  hr = 0;
  sec = 0;
  min = 5;
}



