// console.log("Tirth, background script is running");
// // chrome.browserAction.onClicked.addListener(buttonClicked);
// // console.log("Ho gaya");
// // function buttonClicked(){
// //     console.log("button clicked");
// // }

// window.link = "";

// chrome.runtime.onMessage.addListener(receiver);
// function receiver(request, sender, sendResponse){
//     if (request.link) {
//         console.log("Changing the link.")
//         window.link = request.link; 
//     }
// }

chrome.runtime.onMessageExternal.addListener(
    function(request, sender, sendResponse) {
      if (request.openUrlInEditor)
        console.log(request.openUrlInEditor);
        chrome.storage.sync.set({"url": request.openUrlInEditor})
});

const tslashlinks = ['t/tirth','t/asha','t/shreni'];
const tresponse = ['www.google.com','www.facebook.com','www.amazon.com']

// if (tslashlinks.includes(window.location.href)) {
//   window.location.href = tresponse(tslashlinks.indexOf(window.location.href))
// }

let searchInput = "";

chrome.omnibox.onInputChanged.addListener((text,suggest)=>{
    console.log(text);
})

chrome.omnibox.onInputEntered.addListener((text) => {
    console.log(text);
    if (text === "tirth") {
        chrome.tabs.create({
            url:"https://www.amazon.com"
        })
    }
})

chrome.webNavigation.onHistoryStateUpdated.addListener((obj) => {
    let decoded = decodeURIComponent(obj.url);
    console.log(decoded)
    console.log(getQueryStringParams("q",obj.url))
})  

function getQueryStringParams(params, url) {
    // first decode URL to get readable data
    var href = decodeURIComponent(url);
    // regular expression to get value
    var regEx = new RegExp('[?&]' + params + '=([^&#]*)', 'i');
    var value = regEx.exec(href);
    // return the value if exist
    return value ? value[1] : null;
  };


