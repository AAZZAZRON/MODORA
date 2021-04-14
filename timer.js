// timer = setInterval(increment, 1000, time);
  
// }

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

    document.getElementById("timer").innerText = hr + ':' + min + ':' + sec;

  } else {
    clearInterval(stopwatch);
  }
}

function resetTimer() {
  document.getElementById("timer").innerText = '00:00:00';
  start = false;
  hr = 0;
  sec = 0;
  min = 0;
}
  // or use below
  // if(isDone == true) {
  //     timer.innerHTML = '00:00:00';
  // }




// function increment() {
//     counter += 1;
//     document.getElementById("time").innerText = `🕰️ ${counter}`;
//     if (done) {
//         clearInterval(timer);
//     }
// } 
