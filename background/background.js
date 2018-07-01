chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message) {
        if (message.name === "startFarming") {
            console.log(message);
        }
    }

    return true;
});