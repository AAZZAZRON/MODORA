// if site is bad site and we are in "lockdown", do not let site open


var url = "";
function findUrl() {
  url = window.location.href.toString() + ;
}

const webRequestFlags = [
  'blocking',
];
window.chrome.webRequest.onBeforeRequest.addListener(
  page => {
    console.log('page blocked - ' + page.url);

    return {
      cancel: true,
    };
  },
  filter,
  webRequestFlags,
);

function checkUrl() {
  if(url.substring() == "http://www.discord.com") {
    alert("It is Work Time Right Now Get Off!");
  }
}
}

