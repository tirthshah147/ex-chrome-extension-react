console.log("Tirth, your content script is running", window.location.href);
chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendResponse){
    console.log(message);
}
