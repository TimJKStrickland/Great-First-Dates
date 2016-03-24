var map;
var startCenter = {lat: 37.7764823, lng: -122.42};
contentString = "";
var errorAjax = "Whoops. Better luck finding your date an Uber. Can't find any data.";

/** VIEWMODEL **/
var ViewModel = function(){
  var self = this;
  var marker;
  self.allLocations = [];
  self.locationList = ko.observableArray();
  self.searchValue = ko.observable();  

  /** MODEL **/
  self.locations = [
  // here are the 8 hard-coded locations for the requirements:
    {
      name: "Ryoko's",
      pos: { lat: 37.7882006, lng:-122.4142544 },
      fsID: "433c8000f964a52043281fe3"
    },
    {
      name: "Chamber Eat + Drink",
      pos: { lat: 37.7830672, lng:-122.4203229 },
      fsID: "50e63342b0ed7e4688ddb834"
    },
    {
      name: "Starbelly",
      pos: { lat: 37.7640966, lng:-122.4347866 },
      fsID: "4a789bbbf964a52004e61fe3"
    },
    {
      name: "Devil's Acre",
      pos: { lat: 37.7976738, lng:-122.4083549 },
      fsID: "5487a2cb498ea3c43c7cd3f4"
    },
    {
      name: "Elephant Sushi",
      pos: { lat: 37.7986734, lng:-122.4209331 },
      fsID: "55b42ca5498e4c7fcfdc6d3c"
    },
    {
      name: "Benjamin Cooper",
      pos: { lat: 37.7873384,lng:-122.4118848 },
      fsID: "54f132e7498e5d065370a6b1"
    },
    {
      name: "Exploratorium",
      pos: { lat: 37.8008602, lng: -122.4008237 },
      fsID: "4585a93ef964a520ac3f1fe3"
    },
    {
      name: "Foreign Cinema",
      pos: { lat: 37.7564817, lng: -122.4213619 },
      fsID: "3fd66200f964a520a0ec1ee3"
    },
    {
      name: "Chubby Noodle",
      pos: { lat: 37.7994414, lng: -122.4400868 },
      fsID: "5127a9e2183f56cf2d7bfe9a"
    },
    {
      name: "Gracias Madre",
      pos: { lat: 37.7615745,lng: -122.4212534 },
      fsID: "4b4955ccf964a520b86d26e3"
    },
    {
      name: "Cliff House",
      pos: { lat: 37.7784894, lng: -122.516152 },
      fsID: "4bf0588dd5bc0f470f366921"
    },
    {
      name: "Green's Restaurant",
      pos: { lat: 37.8068007, lng: -122.4343576 },
      fsID: "4a1c397bf964a520257b1fe3"
    },
    {
      name: "Trick Dog",
      pos: { lat: 37.7593538, lng: -122.4133968 },
      fsID: "5095da318302abffba3c23fd"
    },
    {
      name: "Central Kitchen",
      pos: { lat: 37.7592602, lng: -122.4132552 },
      fsID: "4faaba890cd6e74f6f96bab1"
    },
    {
      name: "Cocotte",
      pos: { lat: 37.7948162, lng: -122.4206194 },
      fsID: "5078e44ee4b0da2384e74824"
    },
    {
      name: "Palmer's Tavern",
      pos: { lat: 37.7906335, lng: -122.4361915 },
      fsID: "521ec12f11d2224d014b63f4"
    },
    {
      name: "State Bird Provisions",
      pos: { lat: 37.7836666, lng: -122.4352882 },
      fsID: "4ef52a378231b0d6238dd471"
    },
    {
      name: "Nopa",
      pos: { lat:37.7748978, lng: -122.4396831 },
      fsID: "44646408f964a52026331fe3"
    },
    {
      name: "Tomasso's",
      pos: { lat: 37.7978025, lng: -122.4074324 },
      fsID: "49e05c38f964a52052611fe3"
    },
    {
      name: "The Ice Cream Bar Soda Foundation",
      pos: { lat:37.7664591, lng: -122.4524319 },
      fsID: "4eac41a5dab40d132703fc44"
    },
    {
      name: "Biergarten",
      pos: { lat: 37.7760198, lng: -122.4261769 },
      fsID: "4dd7e48fd22d38ef42f35bd8"
    }
  ];

// Place constructor
  function Place(data) {
    this.name = data.name;
    this.pos = data.pos;
    this.fsID = data.fsID;
    this.marker = null;
  }
    
  var toggleBounceOn = function(marker){
    if(marker.getAnimation() !== null ){
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  };
  
  var toggleBounceOffAll = function(){
    self.allLocations.forEach(function(location){
      if(location.marker.getAnimation() !== null){
        location.marker.setAnimation(null);
      }
    });
  };

  var infoWindow = new google.maps.InfoWindow({
    content: errorAjax,
    maxWidth: 200
  });

  self.locations.forEach(function(location){
    // pushes each of the locations
    self.allLocations.push(new Place(location));
  });

  self.allLocations.forEach(function(location){

    var markerOptions = {
      map: map,
      position: location.pos,
      name: location.name,
      animation: google.maps.Animation.DROP,
      icon: 'assets/heart_icon.svg'
    };

    location.marker = new google.maps.Marker(markerOptions);

    google.maps.event.addListener(location.marker, 'click', (function(markerCopy, infoWindowCopy){
      return function(){
        infoWindowCopy.open(map, markerCopy);
        foursquareGet(location.marker);
        toggleBounceOffAll();
        toggleBounceOn(markerCopy);
      };
    })(location.marker, infoWindow));
      google.maps.event.addListener(infoWindow, 'closeclick', function(){
      infoWindow.close();
      location.marker.setAnimation(null);
    });

    google.maps.event.addListener(map, 'click', function(e) {
      infoWindow.close();
      location.marker.setAnimation(null);
    });
    var fourSquareUrl = 'https://api.foursquare.com/v2/venues/' + location.fsID +
      "?client_id=QGVCFTGB1GBUX5KJII1OMKU14YO3JTD34OHVNUZ4NFATZKWJ" +
      "&client_secret=XVFP3G1ZTANLVEZFMVDXUC3502R2C3YXQXKH0XD0N354NKZA&v=20150321";
    
    self.listClick = function(place){
      google.maps.event.trigger(place[data], 'click');
    };
  var foursquareGet = function(marker){
    infoWindow.setContent(errorAjax);
    $.ajax(fourSquareUrl, {
      datatype:"json",
      success: function (data){
        return (function(fsdata){ // calling an IIFE to ensure callback success
          // use returned JSON here
          var venue = data.response.venue;
          // create contentString
          var contentString0 = '<div><h4>' + venue.name + '</h4><h5>';
          if (venue.rating !== undefined) {
            contentString3 = '</h5><div><span>' + venue.location.formattedAddress[0] +
            '</span>, <span>' + venue.location.formattedAddress[1] + 
            '</span></div><br><div>Rating: <span>' + venue.rating + '</span>/10 Based on <span>' +
            venue.ratingSignals + '</span> votes</div></div>';
          } else {
            contentString3 = '</h5><div><span>' + venue.place.formattedAddress[0] +
             '</span>, <span>' + venue.location.formattedAddress[1] + 
             '</span></div><br><div>Rating not available</div></div>';
          }

          var contentString2 = '';
          var categories = venue.categories;
          var formattedPhone = venue.contact.formattedPhone;
          var phone = venue.contact.phone;
          var contentString1 = '';

          if(phone || formattedPhone !== undefined) {
            contentString1 += '<a class="tel" href="tel:' + phone + '">' + formattedPhone +'</a>';
          } else {
            contentString1 += "<span>This place is so hip they don't even have a phone.</span>";
          }  
          for (var i = 0; i < categories.length; i++) {
            contentString1 += '<p>' + categories[i].name + ' </p>';
          }
          // delete last two positions of contentString2. Only category wanted per hit
          contentString2 = contentString2.slice(0, -1);
          var contentString = contentString0 + contentString1 + contentString2 + contentString3;
          infoWindow.setContent(contentString);
          })(data);
        }
      });
    };
  });
  self.visibleLocations = ko.observableArray();

  // pushes all locations to an observableArray function
  // for search manipulations
  self.allLocations.forEach(function(location){
    self.visibleLocations.push(location);
  });

  self.userInput = ko.observable('');
  // borrowed heavily from comments. Thanks reviewer!
  // Credit: http://codepen.io/prather-mcs/pen/KpjbNN?editors=1010
  self.filterMarkers = function() {
    var searchInput = self.userInput().toLowerCase();

    self.visibleLocations.removeAll();
    self.allLocations.forEach(function(location){
      location.marker.setVisible(false);

    if(location.name.toLowerCase().indexOf(searchInput) !== -1){
      self.visibleLocations.push(location);
    } 
    });

    self.visibleLocations().forEach(function(location){
      location.marker.setVisible(true);
    });
  };
};

// Google Map setup
 // init's Google Maps API
function initMap(){
  map = new google.maps.Map(document.getElementById('map'), {
    center: startCenter,
    zoom: 12,
    scrollwheel: false
  });
  ko.applyBindings(new ViewModel());
}
        
var googleError = function() {
    alert("Snap, something busted on Google Maps. Quick! Say something funny.");
    alertCount = false;
};

var alertCount = true;
