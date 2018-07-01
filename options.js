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
    let settings = collectSettings();

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
