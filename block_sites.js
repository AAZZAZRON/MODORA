console.log("New site");
var badLinks;
var found = false;


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status == "complete" && tab.status == "complete" && tab.url != undefined) {
    checkUrls(tab.url);
  }
})

 
function checkUrls(link) {
  console.log(link);
  for (let i = 0; i < badLinks.length; i += 1) {
    found = true;
    console.log(badLinks[i], link)
    for (let j = 0; j < Math.min(link.length, badLinks[i].length); j += 1) {
      console.log(badLinks[i][j], link[j])
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
  console.log(badLinks);
}
