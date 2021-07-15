// Define streetmap and darkmap layers
console.log("step1 working");
var graymap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  });

// Create our map, giving it the streetmap and earthquakes layers to display on load
var myMap = L.map("mapid", {
    center: [
      37.09, -95.71
    ],
    zoom: 5
  });
graymap.addTo(myMap);

// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl).then(function(data) {
  console.log(data);
  function chooseRadius(magnitude){
      if (magnitude===0){
          return 1;
      }
      return magnitude * 4;
  }
  function chooseColor(depth){
        switch (true) {
        case depth > 90:
          return "red";
        case depth > 70:
          return "orange";
        case depth > 50:
          return "pink";
        case depth > 30:
          return "yellow";
        case depth > 10:
          return "green";
        default:
            return "#98ee00"
       
        }
      
      
  }

    // Creating a geoJSON layer with the retrieved data
    L.geoJson(data, {
        pointToLayer:function(feature,latlng){
            return L.circleMarker(latlng)
        },
      // Style each feature (in this case a neighborhood)
      style: function(feature) {
        return {
          color: "white",
          // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
          fillColor: chooseColor(feature.geometry.coordinates[2]),
          radius:chooseRadius(feature.properties.mag),
          fillOpacity: 0.5,
          weight: 0.5
        };
      },
      // Called on each feature
      onEachFeature: function(feature, layer) {
    

        // Giving each feature a pop-up with information pertinent to it
        layer.bindPopup("<h1>" + "magnitude: " + feature.properties.mag + "</h1> <hr> <h2>" + "place: " + feature.properties.place + "</h2>");
  
      }
    }).addTo(myMap);
  
});




/* // define the data url
var earthquake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// define the cuntion of marker size
function markerSize(magnitude) {
    return magnitude * 4;
};

var earthquake = new L.LayerGroup();
//// Retrieve the data
d3.json(earthquake_url, function (geoJson) {
    L.geoJSON(geoJson.features, {
        pointToLayer: function (geoJsonPoint, latlng) {
            return L.circleMarker(latlng, { radius: markerSize(geoJsonPoint.properties.mag) });
        },

        style: function (geoJsonFeature) {
            return {
                fillColor: Color(geoJsonFeature.properties.mag),
                fillOpacity: 0.7,
                weight: 0.1,
                color: 'black'

            }
        },
    }
} */