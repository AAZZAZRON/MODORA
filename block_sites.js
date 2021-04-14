// if site is bad site and we are in "lockdown", do not let site open


var url = "";
function checkUrl() {
  url = window.location.host.toString();
  for(int i = 0; i < addToBlockedList.length(); i++) {
    if(url == addToBlockedList[i]) {
    alert("It is Work Time Right Now Get Off!");
  }
  }
}
}

