let default_settings = {
    "TW-Bot/farming_label": "c",
    "TW-Bot/wall_max": 2,
    "TW-Bot/distance_max": 15,
    "TW-Bot/click_time_min": 200,
    "TW-Bot/click_time_max": 400,
    "TW-Bot/farming_sleep_min": 15,
    "TW-Bot/farming_sleep_max": 25,
    "TW-Bot/spy_required": true,
    "TW-Bot/farming_order": "forward"
};

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message) {
        if (message.name === "getSettings") {
            chrome.storage.local.get(default_settings, function (settings) {
                sendResponse(settings);
            });
        }

        if (message.name === "getDefaultSettings") {
            sendResponse(default_settings);
        }
    }

    return true;
});