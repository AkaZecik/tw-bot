$(function () {
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