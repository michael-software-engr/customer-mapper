
import * as customerMapperLib from '../lib/customerMapper/index';

export default class MapBuilder {
  static initMap(mapAreaId) {
    return new window.google.maps.Map(document.getElementById(mapAreaId));
  }

  static loadMarkers(map, customers, functions) {
    const markersAndBounds = MapBuilder.createMarkersAndBounds(
      map, customers, functions
    );

    return markersAndBounds;
  }

  static createMarkersAndBounds(map, customers, functions) {
    // ...
    // "Global" infowindow variable. Only one info box visible at a time.
    // Must remove per marker infowindow variable at the bottom if this is active.
    const infowindow = new window.google.maps.InfoWindow();

    const bounds = new window.google.maps.LatLngBounds();
    const markers = [];

    customers.filter((markerInput) => {
      if (!(markerInput.latitude || markerInput.longitude)) {
        console.warn('One or both latitude and longitude is falsy...', markerInput);
        return false;
      }

      return true;
    }).forEach((markerInput) => {
      const marker = MapBuilder.createMarker(
        map, markerInput, infowindow, functions
      );

      bounds.extend(marker.getPosition());
      markers.push(marker);
    });

    return { markers, bounds };
  }

  static createMarker(map, markerInput, infowindow, functions) {
    const markerInfo = {
      title: markerInput.name,
      position: {
        lat: parseFloat(markerInput.latitude),
        lng: parseFloat(markerInput.longitude),
      },
      // icon: '...some image...',
      map,
    };

    const marker = new window.google.maps.Marker(markerInfo);

    MapBuilder.attachInfoWindow(
      map,
      marker,
      infowindow,
      customerMapperLib.infoBoxFormat(markerInput),
      functions,
      markerInput
    );

    return marker;
  }

  static attachInfoWindow(map, marker, infowindow, info, functions, markerInput) {
    // Allow multiple info boxes open at a time. The per marker infowindow variable.
    // Must remove "global" infowindow variable at the top if you should desire this behavior.
    // let infowindow = new google.maps.InfoWindow();

    const {
      setCustomerWindow,
      setInputFormVisibility,
      setVehicleFormVisibility,
      setIsHandlingInputChange
    } = functions;

    window.google.maps.event.addListener(marker, 'click', () => {
      infowindow.setContent(info);
      infowindow.open(map, marker);

      setIsHandlingInputChange(true);
      setInputFormVisibility(false);
      setVehicleFormVisibility(false);
      setCustomerWindow({ isVisible: true, customer: markerInput });
    });

    window.google.maps.event.addListener(map, 'click', () => {
      infowindow.close();
    });

    // google.maps.event.addListener(marker, 'mouseover', function () {
    //   infowindow.setContent(info);
    //   infowindow.open(map, marker);
    // });

    // // ... we want to hide the infowindow when user mouses-out.
    // google.maps.event.addListener(marker, 'mouseout', function () {
    //   infowindow.close();
    // });
  }

  static showMap(map, markers, bounds, radius) {
    // https://stackoverflow.com/questions/11454229/how-to-set-zoom-level-in-google-map
    let center;

    if (markers.length === 0) {
      // Downtown LA
      // center = { lat: 34.0522300, lng: -118.2436800 };
      center = { lat: 40.730610, lng: -73.935242 };
      map.setCenter(center);
      map.setZoom(12);
    } else if (markers.length === 1) {
      center = markers[0].position;
      map.setCenter(center);
      map.setZoom(16);

      // gridSize = 30;
    } else {
      map.fitBounds(bounds);

      const centerUnwrapped = map.getCenter();

      // TODO: fix later.
      //   I don't know why this is undefined when init (most recent request events).
      //   Decided to not put radius circle drawing.
      if (centerUnwrapped) {
        center = {
          lat: centerUnwrapped.lat(), lng: centerUnwrapped.lng()
        };
      }

      map.setCenter(center);
    }

    const mcOptions = {
      // maxZoom: 3,
      gridSize: 10, // 40 ..., // 60 default obtained from *.getGridSize()
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    };

    if (center) {
      if (radius) {
        new window.google.maps.Circle({ // eslint-disable-line no-new
          strokeColor: '#218F33',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          // fillColor: '#218F33',
          fillOpacity: 0,
          map,
          center,
          radius: parseFloat(radius) * 1609.34 // Miles to meters
        });
      }
    }

    new window.MarkerClusterer(map, markers, mcOptions); // eslint-disable-line no-new
  }
}
