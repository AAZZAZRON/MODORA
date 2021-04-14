// if site is bad site and we are in "lockdown", do not let site open
function blockWebsite(urls) {
    if(chrome.webRequest.onBeforeRequest.hasListener(blockRequest))
     chrome.webRequest.onBeforeRequest.removeListener(blockRequest);
   chrome.webRequest.onBeforeRequest.addListener(blockRequest, {urls: ["*://*.{ $websiteName }/*", "*://*.facebook.net/*"]}, ['blocking']);
}

