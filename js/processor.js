var csv_text = "";
var data = [];
var validMarkers = [];
$.get('../data/ApprovedFoodTrucks.csv', function(dat) {
    csv_text = dat;
    data = $.csv.toObjects(csv_text);
    validMarkers = data.slice(0);
});

var constraints = {};
var LAT = 37.7833;
var LON = -122.4167;
var R = 3961;

function handleConstraintsChange(new_constraints) {
    var min_reg = /^min/;
    var max_reg = /^max/;
    var full = false;

    for (var name in new_constraints) {
        if (constraints[name] == undefined) {
            constraints[name] = new_constraints[name];
        }

        if (min.reg.test(name)) {
            if (new_constraints[name] >= constraints[name]) {
                constraints[name] = new_constraints[name];
            } else {
                constraints[name] = new_constraints[name];
                full = true;
            }
        } else if (max_reg.test(name)) {
            if (new_constraints[name] <= constraints[name]) {
                constraints[name] = new_constraints[name];
            } else {
                constraints[name] = new_constraints[name];
                full = true;
            }
        } else {
            constraints[name] = new_constraints[name];
            full = true;
        }
    }
    if (full) {
        filter(data);
    } else {
        filter(validMarkers);
    }
}

function filter(start) {
    validMarkers = [];
    for (index in start) {
        if (check(start[index])) {
            validMarkers.push(start[index]);
        }
    }
    handleUpdate();
}

function check(item) {
    var valid = true;
    if (constraints["min_dist"] !== undefined) {
        lon2 = parseFloat(item["Longitude"]);
        lat2 = parseFloat(item["Latitude"]);
        var change_lon = Math.abs(lon2 - LON);
        var change_lat = Math.abs(lat2 - LAT);
        
        var dlon = change_lon * 69;
        
        var dlat = change_lat * 69;
        var d = Math.sqrt(dlon^2 + dlat^2)*2 + 0.1;

        valid = valid && d >= constraints["min_dist"];
    }

    if (constraints["max_dist"] !== undefined) {
        valid = valid && d <= constraints["max_dist"];
    }

    // //Stars, Reviews, Reservations, and other items for filtering go here
    // if (constraints["Take out"] !== undefined && constraints["Take out"]) {
    //     valid = valid && item["takeout"] == "TRUE"
    // }

    return valid;
}

// Send data to map
$(function() {
    $("#dist_slider").slider({
        range: true,
        min: 0,
        max: 6,
        step: 0.1,
        values: [0, 6],
        slide: function(event, ui) {
            $("#dist_amount").val(ui.values[0] + " - " + ui.values[1] + " mi");
        },
        change: function(event, ui) {
            var new_constraints = {
                min_dist: ui.values[0],
                max_dist: ui.values[1]
            }
            handleConstraintsChange(new_constraints);
        }
    });

    $("#dist_amount").val($("#dist_slider").slider("values", 0) + " - " +
        $("#dist_slider").slider("values", 1) + " mi");
});

// Handle checked boxes