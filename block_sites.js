console.log("New site");
var badLinks = []
console.log(window.location.host.toString());

checkUrls(window.location.host.toString());


function checkUrls(link) {
  alert("testingtesting");
  links = "https://" + links;
  for (let i = 0; i < badLinks.length; i += 1) {
    var found = true;
    for (let j = 0; j < Math.min(link.length, badLinks[i].length); j += 1) {
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
  badLinks = arr;
}