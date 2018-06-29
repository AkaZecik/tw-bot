let default_settings = {
    "TW-Bot/farming_label": "c",
    "TW-Bot/wall_max": 2,
    "TW-Bot/distance_max": 15,
    "TW-Bot/click_time_min": 200,
    "TW-Bot/click_time_max": 400,
    "TW-Bot/farming_sleep_min": 15,
    "TW-Bot/farming_sleep_max": 25
};

function validateSettings(settings) {
    // TODO
    return true;
}

$(function () {
    let wall_max = $("#wall_max");

    for (i = 0; i <= 20; ++i) {
        wall_max.append($("<option value=\"" + i + "\">" + i + "</option>"));
    }

    restoreSettings();
    $("#save").click(saveSettings);
    $("#reset").click(revertDefaultSettings);
});

function saveSettings() {
    let settings = {
        "TW-Bot/farming_label": $("#farming_label").val(),
        "TW-Bot/wall_max": $("#wall_max").val(),
        "TW-Bot/distance_max": $("#distance_max").val(),
        "TW-Bot/click_time_min": $("#click_time_min").val(),
        "TW-Bot/click_time_max": $("#click_time_max").val(),
        "TW-Bot/farming_sleep_min": $("#farming_sleep_min").val(),
        "TW-Bot/farming_sleep_max": $("#farming_sleep_max").val()
    };

    if (!validateSettings(settings)) {
        return;
    }

    chrome.storage.local.set(settings, function () {
        $("#status_save").text("Saved");

        setTimeout(function () {
            $("#status_save").text("");
        }, 1000);
    });
}

function restoreSettings() {
    chrome.storage.local.get(default_settings, function (settings) {
        $("#farming_label").val(settings["TW-Bot/farming_label"]);
        $("#wall_max").val(settings["TW-Bot/wall_max"]);
        $("#distance_max").val(settings["TW-Bot/distance_max"]);
        $("#click_time_min").val(settings["TW-Bot/click_time_min"]);
        $("#click_time_max").val(settings["TW-Bot/click_time_max"]);
        $("#farming_sleep_min").val(settings["TW-Bot/farming_sleep_min"]);
        $("#farming_sleep_max").val(settings["TW-Bot/farming_sleep_max"]);
    });
}

function revertDefaultSettings() {
    chrome.storage.local.set(default_settings, function () {
        restoreSettings();
        $("#status_reset").text("Reverted");

        setTimeout(function () {
            $("#status_reset").text("");
        }, 1000);
    });
}

