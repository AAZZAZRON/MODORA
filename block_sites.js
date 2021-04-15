console.log("New site");
var badLinks;
var found = false;
var 

chrome.tabs.onUpdated.addListener((tab) => {
  checkUrls(tab.url);
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
      alert("bad boy or girl")

    }
  }
}


function updateArray(arr) {
  badLinks = arr.split(", ");
  console.log(badLinks);
}
