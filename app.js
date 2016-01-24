var map;
var infowindow;
function initMap() {
  var sanFrancisco = {lat: 37.7664823, lng: -122.4194691};
  map = new google.maps.Map(document.getElementById('map'), {
      center: sanFrancisco,
      zoom: 13,
      scrollwheel: false
    });

  infowindow = new google.maps.InfoWindow();

    // Create the PlaceService and send the request.
    // Handle the callback with an anonymous function.
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: sanFrancisco,
    radius: 500,
    types: ['stores'],
  }, callback); 

    };
  function callback(results, status){
    if(status === google.maps.places.PlacesServiceStatus.OK){
      for(var i=0; i<results.length; i++){
        createMarker(results[i]);
      }
    }
  }
  function createMarker(place){
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map : Map,
      position : place.geometry.location
    });
      // Run the initialize function when the window has finished loading.
  google.maps.event.addListener(marker, 'click', function(){
    infowindow.setContent(place.name);
    infowindow.open(map, this);
    });
  };