document.getElementById('timers');

var hour = 0;
var min = 0;
var sec = 0;
var start = true;
var isDone = true;
function startTimer() {
  if (start == false) {
    start = true;
    timing();
  }
}
function stoptTimer() {
  if (start == true) {
    start = false;
  }
}
function timing() {
  if(start == true) {
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

    timer.innerHTML = hr + ':' + min + ':' + sec;

    setTimeout(timing, 1000);
  }

}
function resetTimer() {
    timer.innerHTML = '00:05:00';
    start = false;
    hr = 0;
    sec = 0;
    min = 5;
}
