function collectSettings() {
    return {
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
