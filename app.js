var map;
var pins = [];
var infoWindows = [];
// calling the center outside the function
var startCenter = {lat: 37.7664823, lng: -122.42};

/** MODEL **/
var locations = [
  // here are the 8 hard-coded locations for the requirements:
  {
    name: "Ryoko's",
    latlong: { lat: 37.7882006, lng:-122.4142544 },
    yelpAPI: ""
  },
  {
    name: "Chamber Eat + Drink",
    latlong: { lat: 37.7830672, lng:-122.4203229 },
    yelpAPI: ""
  },
  {
    name: "Starbelly",
      latlong: { lat: 37.7640966, lng:-122.4347866 },
      yelpAPI: ""
  },
  {
    name: "Devil's Acre",
    latlong: { lat: 37.7976738, lng:-122.4083549 },
    yelpAPI: ""
  },
  {
    name: "Elephant Sushi",
    latlong: { lat: 37.7986734, lng:-122.4209331 },
    yelpAPI: ""
  }
];

// Made so that locations remains after it is cleared 
var locations2 = [];
var popLocations2 = function(){
  for (var i in locations){
    locations2.push(locations[i]);
  }
};
popLocations2();

/**  VIEW **/
// init's Google Maps API
function initMap(){
  map = new google.maps.Map(document.getElementById('map'), {
    center: startCenter,
    zoom: 13
  });
  // putting all pins on the map and create the infowindow for each marker:

  for(var i = 0; i < locations.length; i++){
    var marker = new google.maps.Marker({
      position: locations[i].latlong,
      map: map,
      title: locations[i].name
    });

    // adding the Infowindow to populate and creating the error message if the
    // net breaks. contentString is the error message for Ajax

    var errorAjax = "Whoops. Better luck finding your date an Uber. Can't find any data";

    var infoWindow = new google.maps.InfoWindow({
      content: errorAjax
    });

    // IIFE to solve closure issue 
    marker.addListener('click', (function(pinCopy, infoWindowCopy){
        return function(){
          closeInfoWindows();
          infoWindowCopy.open(map, pinCopy);
          toggleBounceOffAll();
          toggleBounceOn(pinCopy);
        };
      })(marker, infoWindow));

    // push each marker into marker's array to make them observable
    pins.push(marker);

    // push infoWindow to the infoWindow's array to make them observable
    infoWindows.push(infoWindow);
  }
}

var toggleOff = function(marker) {
    marker.setMap(null);
};
var toggleOn = function(marker) {
    marker.setMap(map);
};
var toggleOffAll = function() {
    for (var x in pins) {
        pins[x].setMap(null);
    }
};

// function to close all info windows
var closeInfoWindows = function() {
    for (var x in infoWindows) {
        infoWindows[x].close();
    }
};

// functions to toggle pin's BOUNCE animation
var toggleBounceOffAll = function() {
    for (var x in pins) {
        pins[x].setAnimation(null);
    }
};

var toggleBounceOn = function(marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
};

/** VIEWMODEL **/

var viewModel = {
  // data
  pins: ko.observableArray(locations2),
  searchValue: ko.observable(''),

  // ops
  search: function(value){
    viewModel.pins.removeAll();
    toggleOffAll();

    for (var x in locations){
      if(locations[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0 ){
      viewModel.pins.push(locations[x]);
      toggleOn(pins[x]);
      }
    }
  },
  listValue: function(value){
    // closes all info windows, toggles off all Bounce
    closeInfoWindows();
    toggleBounceOffAll();

    for(var x in locations){
      if(locations[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0 ){
        // open the clicked marker's infoWindow and trigger animation
        infoWindows[x].open(map, pins[x]);
        toggleBounceOn(pins[x]);
      }
    }
  }
};
ko.applyBindings(viewModel);
viewModel.searchValue.subscribe(viewModel.search);
  

var googleError = function() {
    alert("Sorry, Google Maps API can't be loaded now. Please try later.");
    alertCount = false;
};  