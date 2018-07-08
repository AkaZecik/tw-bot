function injectFile(tabID, fileName, callback) {
    chrome.tabs.executeScript(tabID, {
        code: `
            script = document.createElement("script");
            script.src = chrome.runtime.getURL("${fileName}");
            script.onload = function () {
                this.remove();
            };
            (document.head || document.documentElement).appendChild(script);
        `
    }, function () {
        callback && callback();
    });
}

function injectCode(tabID, code, callback) {
    chrome.tabs.executeScript(tabID, {
        code: `
            script = document.createElement("script");
            script.textContent = \`${code}\`;
            script.onload = function () {
                this.remove();
            };
            (document.head || document.documentElement).appendChild(script);
        `
    }, function () {
        callback && callback();
    });
}