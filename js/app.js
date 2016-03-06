/** MODEL **/
var locationsData = [
  // The hard-coded locations for the requirements:
  {
    name: "Ryoko's",
    latLng: { lat: 37.7882006, lng:-122.4142544 },
    fsID: "433c8000f964a52043281fe3"
  },
  {
    name: "Chamber Eat + Drink",
    latLng: { lat: 37.7830672, lng:-122.4203229 },
    fsID: "50e63342b0ed7e4688ddb834"
  },
  {
    name: "Starbelly",
    latLng: { lat: 37.7640966, lng:-122.4347866 },
    fsID: "4a789bbbf964a52004e61fe3"
  },
  {
    name: "Devil's Acre",
    latLng: { lat: 37.7976738, lng:-122.4083549 },
    fsID: "5487a2cb498ea3c43c7cd3f4"
  },
  {
    name: "Elephant Sushi",
    latLng: { lat: 37.7986734, lng:-122.4209331 },
    fsID: "55b42ca5498e4c7fcfdc6d3c"
  },
  {
    name: "Benjamin Cooper",
    latLng: { lat: 37.7873384, lng:-122.4118848 },
    fsID: "54f132e7498e5d065370a6b1"
  },
  {
    name: "Exploratorium",
    latLng: { lat: 37.8008602, lng: -122.4008237 },
    fsID: "4585a93ef964a520ac3f1fe3"
  },
  {
    name: "Foreign Cinema",
    latLng: { lat: 37.7564817, lng: -122.4213619 },
    fsID: "3fd66200f964a520a0ec1ee3"
  },
  {
    name: "Chubby Noodle",
    latLng: { lat: 37.7994414, lng: -122.4400868 },
    fsID: "5127a9e2183f56cf2d7bfe9a"
  },
  {
    name: "Gracias Madre",
    latLng: { lat: 37.7615745, lng: -122.4212534 },
    fsID: "4b4955ccf964a520b86d26e3"
  },
  {
    name: "Cliff House",
    latLng: { lat: 37.7784894, lng: -122.516152 },
    fsID: "4bf0588dd5bc0f470f366921"
  },
  {
    name: "Green's Restaurant",
    latLng: { lat: 37.8068007, lng: -122.4343576 },
    fsID: "4a1c397bf964a520257b1fe3"
  },
  {
    name: "Trick Dog",
    latLng: { lat: 37.7593538, lng: -122.4133968 },
    fsID: "5095da318302abffba3c23fd"
  },
  {
    name: "Central Kitchen",
    latLng: { lat: 37.7592602, lng: -122.4132552 },
    fsID: "4faaba890cd6e74f6f96bab1"
  },
  {
    name: "Cocotte",
    latLng: { lat: 37.7948162, lng: -122.4206194 },
    fsID: "5078e44ee4b0da2384e74824"
  },
  {
    name: "Palmer's Tavern",
    latLng: { lat: 37.7906335, lng: -122.4361915 },
    fsID: "521ec12f11d2224d014b63f4"
  },
  {
    name: "State Bird Provisions",
    latLng: { lat: 37.7836666, lng: -122.4352882 },
    fsID: "4ef52a378231b0d6238dd471"
  },
  {
    name: "Nopa",
    latLng: { lat:37.7748978, lng: -122.4396831  },
    fsID: "44646408f964a52026331fe3"
  },
  {
    name: "Tomasso's",
    latLng: { lat: 37.7978025, lng: -122.4074324 },
    fsID: "49e05c38f964a52052611fe3"
  },
  {
    name: "The Ice Cream Bar Soda Foundation",
    latLng: { lat:37.7664591, lng: -122.4524319  },
    fsID: "4eac41a5dab40d132703fc44"
  },{
    name: "Biergarten",
    latLng: { lat: 37.7760198, lng: -122.4261769 },
    fsID: "4dd7e48fd22d38ef42f35bd8"
  }
];

function initMap(){
   var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 37.7764823, lng: -122.42},
    zoomControl: false
  });
}

/**  VIEWMODEL **/
var ViewModel = function(){
	var self = this;
  // store all places into an array within the ViewModel
  self.allPlaces = [];
  locationsData.forEach(function(place){
    self.allPlaces.push(new Place(place));
  });

   // builds all the markers and places them on the map. Adds listeners to click
   // on and off the markers to trigger animations
   	self.allPlaces.forEach(function(place){
	  	var markerOptions = {
	  	map: self.googleMap,
	  	position: place.latLng,
	  	icon: 'assets/heart_icon.svg',
	  	animation: google.maps.Animation.DROP
	  	};
   		place.marker = new google.maps.Marker(markerOptions);
	});
	self.visiblePlaces = ko.observableArray();
	self.allPlaces.forEach(function(place) {
		self.visiblePlaces.push(place);
	});
	
	self.userInput = ko.observable('');

   function Place(dataObj) {
     this.locationName = dataObj.name;
     this.latLng = dataObj.latLong;
    
     // This will save a reference to the Places' map marker after the marker
     // is built:
     this.marker = null;
   }
  
  
   self.searchValue = ko.observable('');
   self.pins = ko.observableArray([]);
   self.search = function(value){
     ViewModel.pins.removeAll();
     toggleOffAll();
    
       for (var x = 0; x < pins.length; x++){
       	if(pins[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0 ){
       	ViewModel.pins.push(pins[x]);
       	toggleOn(pins[x]);
	     	}
   		}
   };
   self.listClick = function(){
   	closeInfoWindows();
     toggleBounceOffAll();

   };
  
   // // adding the Infowindow to populate and creating the error message if the
   //  // net breaks. contentString is the error message for Ajax

     var errorAjax = "Whoops. Better luck finding your date an Uber. Can't find any data";

     var infoWindow = new google.maps.InfoWindow({
       content: errorAjax
         });

     infoWindow.addListener('closeclick', function(e) {
       // stop marker from bouncing here
       toggleBounceOffAll(); 
     });

     marker.addListener('click', (function(pinCopy, infoWindowCopy){
           closeInfoWindows();
           infoWindowCopy.open(map, pinCopy);
           toggleBounceOffAll();
           toggleBounceOn(pinCopy);
         }));

       // push each marker into marker's array to make them observable
       pins.push(marker);

       // push infoWindow to the infoWindow's array to make them observable
       infoWindows.push(infoWindow);


       var toggleOff = function(marker) {
           marker.setVisible(false);
       };
       var toggleOn = function(marker) {
           marker.setVisible(true);
       };
        
       var toggleOffAll = function() {
           for (var x in pins) {
             if(pins !== undefined){
               pins[x].setVisible(false);
             }
           }

        
         // function to close all info windows
       var closeInfoWindows = function() {
           for (var x = 0; x < infoWindows.length; x++) {
             if(infoWindows !==undefined){
               infoWindows[x].close();
             }
           }
       };

       // functions to toggle pin's BOUNCE animation
       var toggleBounceOffAll = function() {
           for (var x = 0; x < pins.length; x++) {
             if(pins !== undefined){
               pins[x].setAnimation(null);
             }
           }
       };

         var toggleBounceOn = function(marker) {
           marker.setAnimation(google.maps.Animation.BOUNCE);
         };
        
   };
};

/** VIEWMODEL **/

ko.applyBindings(new ViewModel());
ViewModel.searchValue.subscribe(ViewModel.search);
for( var e=0; e<locationsData.length; e++){
  if(locationsData[e] !== undefined){
    var url = "https://api.foursquare.com/v2/venues/" +
      locationsData[e].fsID +
      "?client_id=QGVCFTGB1GBUX5KJII1OMKU14YO3JTD34OHVNUZ4NFATZKWJ" +
      "&client_secret=XVFP3G1ZTANLVEZFMVDXUC3502R2C3YXQXKH0XD0N354NKZA&v=20150321";

      $.getJSON(url, (function(fsData){ // IIFE
          return function(data) {
              // use returned JSON here
              locationsData[fsData].foursquareData = data;
              var venue = data.response.venue;

              // create contentString
              var contentString0 = '<div><h4>' + venue.name + '</h4><h5>';
              var contentString3;
              if (venue.rating !== undefined) {
                contentString3 = '</h5><div><span>' + venue.location.formattedAddress[0] + '</span>, <span>' +
                    venue.location.formattedAddress[1] + '</span></div><br><div>Rating: <span>' + venue.rating +
                    '</span>/10 Based on <span>' + venue.ratingSignals + '</span> votes</div></div>';
              } else {
                contentString3 = '</h5><div><span>' + venue.location.formattedAddress[0] + '</span>, <span>' +
                venue.location.formattedAddress[1] + '</span></div><br><div>Rating not available</div></div>';
              }
              var contentString2 = '';
              var categories = venue.categories;
              var formattedPhone = venue.contact.formattedPhone;
              var phone = venue.contact.phone;
              var contentString1 = '';
              if(phone || formattedPhone !== undefined){
                contentString1 += '<a class="tel" href="tel:' + phone + '">' + formattedPhone +'</a>';
              } else {
                contentString1 += "<span>This place is so hip they don't even have a phone.</span>";
              }  
            for (var i=0; i < categories.length; i++) {
                contentString1 += '<p>' + categories[i].name + ' </p>';
              }
              // delete last two positions of contentString2. Only category wanted per hit
              contentString2 = contentString2.slice(0, -1);
              var contentString = contentString0 + contentString1 + contentString2 + contentString3;

              // change info windows' content
              infoWindows[fsData].content = contentString;

          };
    })(x)).fail(function(){ // error handling
        if (alertCount === true) {
        alert("Shoot. We can't find anything. Please try later.");
        alertCount = false; // make sure it only alert once
        }
    });
  }
}
var googleError = function() {
    alert("Snap, something busted on Google Maps. Quick! Say something funny.");
    alertCount = false;
};

var alertCount = true;
