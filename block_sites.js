// if site is bad site and we are in "lockdown", do not let site open
chrome.runtime.sendMessage({
  url: window.location.href
},
function(request, sender, sendResponse) {
  if(request.url === "") {
    alert("GET OFF NOW, WORK!!! :)");
  }
}

