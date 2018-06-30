$(function () {
    let wall_max = $("#wall_max");

    for (i = 0; i <= 20; ++i) {
        wall_max.append($("<option value=\"" + i + "\">" + i + "</option>"));
    }

    restoreSettings();
    $("#save").click(saveSettings);
    $("#reset").click(restoreDefaultSettings);
});

function saveSettings() {
    let settings = {
        "TW-Bot/farming_label": $("#farming_label").val(),
        "TW-Bot/wall_max": $("#wall_max").val(),
        "TW-Bot/distance_max": $("#distance_max").val(),
        "TW-Bot/click_time_min": $("#click_time_min").val(),
        "TW-Bot/click_time_max": $("#click_time_max").val(),
        "TW-Bot/farming_sleep_min": $("#farming_sleep_min").val(),
        "TW-Bot/farming_sleep_max": $("#farming_sleep_max").val(),
        "TW-Bot/spy_required": $("#spy_required").prop("checked"),
        "TW-Bot/farming_order": $("#farming_order").val()
    };

    chrome.storage.local.set(settings, function () {
        $("#status_save").text("Saved");

        setTimeout(function () {
            $("#status_save").text("");
        }, 1000);
    });
}

function restoreSettings() {
    chrome.runtime.sendMessage({name: "getSettings"}, function (settings) {
        fillInForm(settings);
    });
}

function restoreDefaultSettings() {
    chrome.runtime.sendMessage({name: "getDefaultSettings"}, function (defaultSettings) {
        chrome.storage.local.set(defaultSettings, function () {
            fillInForm(defaultSettings);
            $("#status_reset").text("Reverted");

            setTimeout(function () {
                $("#status_reset").text("");
            }, 1000);
        });
    });
}

function fillInForm(settings) {
    $("#farming_label").val(settings["TW-Bot/farming_label"]);
    $("#wall_max").val(settings["TW-Bot/wall_max"]);
    $("#distance_max").val(settings["TW-Bot/distance_max"]);
    $("#click_time_min").val(settings["TW-Bot/click_time_min"]);
    $("#click_time_max").val(settings["TW-Bot/click_time_max"]);
    $("#farming_sleep_min").val(settings["TW-Bot/farming_sleep_min"]);
    $("#farming_sleep_max").val(settings["TW-Bot/farming_sleep_max"]);
    $("#spy_required").prop("checked", settings["TW-Bot/spy_required"]);
    $("#farming_order").val(settings["TW-Bot/farming_order"]);
}

