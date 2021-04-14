timer = setInterval(increment, 1000, timeNeeded);

function countUp() {
    counter += 1;
    document.getElementById("time").innerText = `🕰️ ${counter}`;


}






// function increment() {
//     counter += 1;
//     document.getElementById("time").innerText = `🕰️ ${counter}`;
//     if (done) {
//         clearInterval(timer);
//     }
// } 
