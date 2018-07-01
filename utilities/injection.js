function injectExtensionID(tabID, fnc) {
    chrome.tabs.executeScript(tabID, {
        code: `
            script = document.createElement("script");
            script.textContent = "(" + function () {
                TW_Bot_id = "${chrome.runtime.id}";
            } + ")();";
            script.onload = function () {
                this.remove();
            };
            (document.head || document.documentElement).appendChild(script);
        `
    }, function () {
        fnc && fnc();
    });
}

function injectFile(tabID, fileName) {
    injectExtensionID(tabID, function () {
        chrome.tabs.executeScript(tabID, {
            code: `
                script = document.createElement("script");
                script.src = chrome.runtime.getURL("${fileName}");
                script.onload = function () {
                    this.remove();
                };
                (document.head || document.documentElement).appendChild(script);
            `
        });
    });
}

function injectFunction(tabID, func) {
    injectExtensionID(tabID, function () {
        chrome.tabs.executeScript(tabID, {
            code: `
                script = document.createElement("script");
                script.textContent = "(" + ${func} + ")();";
                script.onload = function () {
                    this.remove();
                };
                (document.head || document.documentElement).appendChild(script);
            `
        });
    });
}