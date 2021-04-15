// if site is bad site and we are in "lockdown", do not let site open


var urlsssss = "";
function checkUrl() {
  urlsssss = window.location.host.toString();
  for(let i = 0; i < addToBlockedList.length(); i++) {
    if(url == addToBlockedList[i]) {
      for(;;) {
        spammer();
      }
    
    }
    else {
      alert("Good Choice :D");
    }
  }
}

function spammer() {
  for(let i = 0; i < 3; i++) {
    alert("It is Work Time Right Now Get Off!");
  }
  
  alert("You have 10 seconds to get off this website!");
}
