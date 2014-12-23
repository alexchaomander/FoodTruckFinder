// In the following example, markers appear when the user clicks on the map.
// The markers are stored in an array.
// The user can then click an option to hide, show or delete the markers.
var map;
var markers = [];
var markers_map = {};

function initialize() {
  var sanFrancisco = new google.maps.LatLng(37.7833, -122.4167);

  var mapOptions = {
    zoom: 12,
    center: sanFrancisco,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    panControl: true,
    zoomControl: true,
    scaleControl: true
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // This event listener will call addMarker() when the map is clicked.
/*  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.luatLng);
  });*/

  // Adds a marker at the center of the map.
  // addMarker(sanFrancisco);
  fillMap(); 
}

// Add a marker to the map and push to the array.
function addMarker(location, row_id) {
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    title: row_id + ""
  });
  markers.push(marker);
  markers_map[row_id] = marker;

  var address = getAddress(row_id);
  var name = getName(row_id);
  var message = "<p>" + name + "</p> \
      <p>" + address + "</p>";

  var infoWindow = new google.maps.InfoWindow({
    //content: markers_map[row_id]["name"] + "\n" + markers_map[row_id]["full_address"]
    //content: name;
    //content: "<p>Restaurant name</p> \
      //    <p>1111 Fake Address Dr. Berkeley, CA 94720</p>"
  })

  infoWindow.setContent(message);

  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.open(map, marker)
  });


  closeInfoWindow = function() {
    infoWindow.close();
  }

  google.maps.event.addListener(map, 'click', closeInfoWindow);

  
}

// Sets the map on all markers in the array.
function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setAllMap(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setAllMap(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}

//Fill map with initial markers
function fillMap() {
    for (var i = 0; i < data.length; i++) {
        var point = new google.maps.LatLng(data[i]["Latitude"], data[i]["Longitude"]);
        addMarker(point, data[i][""]);
    }
}

//Handling updates
function handleUpdate() {
    for (var i = 0; i < data.length; i++) {
        if ($.inArray(data[i],validMarkers) != -1) {
          if ($.inArray(markers_map[data[i][""]], markers) == -1) {
            markers_map[data[i][""]].setMap(map);
            markers.push(markers_map[data[i][""]]);
          }
        } else {
          if ($.inArray(markers_map[data[i][""]], markers) != -1) {
            markers_map[data[i][""]].setMap(null);
            markers.splice($.inArray(markers_map[data[i][""]], markers), 1);
          }   
        }
    }
}

function getAddress(row_id) {
    for (var i = 0; i < validMarkers.length; i++) {
        if (validMarkers[i][""] == row_id) {
            return validMarkers[i]["Address"]
        }
    }
}

function getName(row_id) {
    for (var i = 0; i < validMarkers.length; i++) {
        if (validMarkers[i][""] == row_id) {
            return validMarkers[i]["Applicant"];
        }
    }
}

google.maps.event.addDomListener(window, 'load', initialize);
