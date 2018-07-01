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

            $("#loading").hide();
            $("#main").show();
        }
    }

    return true;
});

$(function () {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
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

    chrome.runtime.sendMessage({name: "getSettings"}, function (settings) {
        $("#farming_label").val(settings["TW-Bot/farming_label"]);
        $("#wall_max").val(settings["TW-Bot/wall_max"]);
        $("#distance_max").val(settings["TW-Bot/distance_max"]);
        $("#click_time_min").val(settings["TW-Bot/click_time_min"]);
        $("#click_time_max").val(settings["TW-Bot/click_time_max"]);
        $("#farming_sleep_min").val(settings["TW-Bot/farming_sleep_min"]);
        $("#farming_sleep_max").val(settings["TW-Bot/farming_sleep_max"]);
        $("#spy_required").prop("checked", settings["TW-Bot/spy_required"]);
        $("#farming_order").val(settings["TW-Bot/farming_order"]);
    });

    let wall_max = $("#wall_max");

    for (i = 0; i <= 20; ++i) {
        wall_max.append($("<option value=\"" + i + "\">" + i + "</option>"));
    }

    $("#go_to_options").click(function () {
        chrome.runtime.openOptionsPage();
    });
});