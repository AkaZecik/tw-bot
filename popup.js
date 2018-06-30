$(function () {
    let wall_max = $("#wall_max");

    for (i = 0; i <= 20; ++i) {
        wall_max.append($("<option value=\"" + i + "\">" + i + "</option>"));
    }

    $("#go_to_options").click(function () {
        chrome.runtime.openOptionsPage();
    });
});