chrome.runtime.onMessageExternal.addListener(function (message, sender, sendResponse) {
    if (message) {
        if (message.name === "getGameData") {
            let farming_group = $("#farming_group");
            let groups = message.groups.result;

            for (let i = 0; i < groups.length; ++i) {
                let groupID = groups[i].group_id;
                let groupName = groups[i].name;
                farming_group.append(
                    $("<option value=\"" + groupID + "\">" + groupName + "</option>")
                );
            }

            $("#submit").click(function () {
                let settings = collectSettings();

                chrome.runtime.sendMessage({
                    name: "startFarming",
                    hostname: message.hostname,
                    settings: settings
                });

                window.close();
            });

            $("#loading").hide();
            $("#main").show();
        }
    }

    return true;
});

$(function () {
    chrome.tabs.query({active: true, currentWindow: true, url: "https://*.plemiona.pl/*"}, function (tabs) {
        if (tabs.length === 0) {
            $("#loading").hide();
            $("#wrong_page").show();
            return;
        }

        chrome.runtime.sendMessage({name: "getSettings"}, function (settings) {
            fillInForm(settings);
        });

        let wall_max = $("#wall_max");

        for (i = 0; i <= 20; ++i) {
            wall_max.append($("<option value=\"" + i + "\">" + i + "</option>"));
        }

        $("#go_to_options").click(function () {
            chrome.runtime.openOptionsPage();
        });

        injectFunction(tabs[0].id, function () {
            TribalWars.get("groups", {ajax: "load_groups"}, function (groups) {
                chrome.runtime.sendMessage(TW_Bot_id, {
                    name: "getGameData",
                    groups: groups,
                    hostname: "https://" + window.location.hostname,
                    game_data: game_data
                });
            });
        });
    });
});