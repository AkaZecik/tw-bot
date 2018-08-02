chrome.runtime.onMessageExternal.addListener(function (message, sender, sendResponse) {
    if (message) {
        if (message.name === "getVillagesFromGroup") {
            chrome.tabs.executeScript(sender.tab.id, {code: "chrome.runtime.id = \"" + chrome.runtime.id + "\";"}, function () {
                chrome.tabs.executeScript(sender.tab.id, {code: "let settings = " + message.settings + ";"}, function () {
                    chrome.tabs.executeScript(sender.tab.id, {file: "farmer.js"});
                });
            });
        }
    }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message) {
        if (message.name === "startFarming") {
            injectCode(message.tabID, `
                TribalWars.request("POST",
                    TribalWars.buildURL("GET", "groups", {ajax: "load_villages_from_group"}),
                    {group_id: "${message.groupID}"},
                    function (groups) {                            
                        chrome.runtime.sendMessage("${chrome.runtime.id}", {
                            name: "getVillagesFromGroup",
                            groups: $(document.createElement("div"))
                                .html(groups.html)
                                .find("#group_popup_content_container tr")
                                .map(function () {
                                    return $(this).find("a").prop("href").match(/\\\\((\\\\d+)/)[1];
                                }).get()
                        });
                    }
                );
                `
            );
        }

        if (message.name === "finishedFarming") {
            console.log("finished farming!!!");
        }
    }

    return true;
});