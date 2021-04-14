// timer = setInterval(increment, 1000, time);
  
// }
const timer = document.getElementById('timers');

var hour = 0;
var min = 0;
var sec = 0;
bool start = false;
bool isDone = true;
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

    timer.innerHTML = hr + ':' + min + ':' + sec;

    setTimeout("timing()", 1000);
  }
  function resetTimer() {
    timer.innerHTML = '00:00:00';
    start = false;
    hr = 0;
    sec = 0;
    min = 0;
  }
  // or use below
  // if(isDone == true) {
  //     timer.innerHTML = '00:00:00';
  // }
}



// function increment() {
//     counter += 1;
//     document.getElementById("time").innerText = `🕰️ ${counter}`;
//     if (done) {
//         clearInterval(timer);
//     }
// } 
