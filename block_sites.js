//block_sites.js

var newLink;
var found = false;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
   console.log(tab.url);
   var url = new URL(tab.url);
   url = String(url.hostname);
   url = url.split(".")
   if (url.length-1 == 2){
      url = url.slice(1).join(".");
   } else {
      url = url.join(".");
   }
   link = "*://*."+url+"/*";
   console.log(link);

   if(chrome.webRequest.onBeforeRequest.hasListener(blockRequest))
     chrome.webRequest.onBeforeRequest.removeListener(blockRequest);
   var rawr = localStorage.getItem("nyaa");
   rawr = rawr.split(',').slice(1);
   console.log(rawr);
   console.log(rawr)
   chrome.webRequest.onBeforeRequest.addListener(blockRequest, {urls: rawr }, ['blocking']);
   if (rawr.includes(link) == true && (changeInfo.status == "complete" && tab.status == "complete" && tab.url != undefined)){
     alert("You are currently in a Pomodoro Session!\nPlease focus.");
   }
})

 
function checkUrls(link) {
  console.log(link);
  for (let i = 0; i < badLinks.length; i += 1) {
    found = true;
    for (let j = 0; j < Math.min(link.length, badLinks[i].length); j += 1) {
      if (badLinks[i][j] != link[j]) {
          found = false;
          break;
      }
    }
    if (found) {
      alert("You are currently in a Pomodoro Session!\nPlease focus.")

    }
  }
}


function updateArray(arr) {
  badLinks = arr.split(", ");
}

function blockRequest(details) {
   return {cancel: true};
}
