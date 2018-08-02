$(function () {
    console.log(chrome.runtime.id);
    console.log(settings);
    return;

    $("a.farm_icon_a, a.farm_icon_b, a.farm_icon_c").click(function () {
        $(this).closest("tr").remove();
    });

    let plunderList = [];
    let plunderListHeader = $("table#plunder_list tr").eq(0);
    let wallColumnID = plunderListHeader.find("th").index(plunderListHeader.find("th:has(img[src$=\"wall.png\"])"));
    let distanceColumnID = plunderListHeader.find("th").index(plunderListHeader.find("th:has(img[src$=\"rechts.png\"])"));
    let plunderListRows = $("table#plunder_list tr[id^=\"village_\"]");
    let spies = $("#units_home #spy");

    for (let i = 0; i < plunderListRows.length; i++) {
        let plunderElement = plunderListRows.eq(i);
        let wall = parseInt(plunderElement.find("td").eq(wallColumnID).text().trim());
        let distance = parseFloat(plunderElement.find("td").eq(distanceColumnID).text().trim());

        if (filter(wall, distance, settings)) {
            plunderList.push({
                iconA: plunderElement.find(".farm_icon_a"),
                iconB: plunderElement.find(".farm_icon_b"),
                iconC: plunderElement.find(".farm_icon_c")
            });
        }
    }

    farm(0, plunderList, spies, message.settings);
});

function randomInterval(minTime, maxTime) {
    return Math.floor(Math.random() * (maxTime - minTime) + minTime);
}

function filter(wall, distance, settings) {
    return wall <= settings["TW_Bot/wall_max"] && distance <= settings["TW_Bot/distance_max"];
}

function farm(i, plunderList, spies, settings, callback) {
    if (i < plunderList.length && (!settings["TW_Bot/spy_required"] || i < spies) && remainingTroops()) {
        switch (settings.farmOn) {
            case "a":
                plunderList[i].iconA[0].click();
                break;
            case "b":
                plunderList[i].iconB[0].click();
                break;
            case "c":
                plunderList[i].iconC[0].click();
                break;
        }

        setTimeout(function () {
            farm(i + 1, iterations);
        }, randomInterval(settings["TW_Bot/click_time_min"], settings["TW_Bot/click_time_max"]));
    } else {
        chrome.runtime.sendMessage({name: "finishedFarming"});
    }
}

function remainingTroops() {
    let selectedUnits = $("#units_home input:checked").map(function () {
        return $(this).prop("name");
    }).get();

    for (let i = 0; i < selectedUnits.length; i++) {
        let amount = parseInt($("#units_home #" + selectedUnits[i]).text());

        if (amount !== 0) {
            return true;
        }
    }

    return false;
}