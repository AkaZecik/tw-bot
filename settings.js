let default_settings = {
    "TW-Bot/farming_label": "c",
    "TW-Bot/wall_max": 2,
    "TW-Bot/distance_max": 15,
    "TW-Bot/click_time_min": 200,
    "TW-Bot/click_time_max": 400,
    "TW-Bot/farming_sleep_min": 15,
    "TW-Bot/farming_sleep_max": 25
};

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    chrome.storage.local.get(default_settings, function (settings) {
        sendResponse(settings);
    });

    return true;
});