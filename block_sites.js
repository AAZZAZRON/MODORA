var badLinks;
var found = false;


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status == "complete" && tab.status == "complete" && tab.url != undefined) {
    checkUrls(tab.url);
  }
})

 
function checkUrls(link) {
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
