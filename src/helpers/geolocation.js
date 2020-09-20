import {
    geocodeByAddress
} from 'react-places-autocomplete';

export function geocodeByAddr(address, values){
    return new Promise(function(resolve, reject){
        geocodeByAddress(address).then(results => {
            resolve(results);
        }).catch(err => {
            reject(err);
        });
    });
}

export function getVerifiedAddresses(address){
    return new Promise(function(resolve, reject){
        geocodeByAddress(address).then(function(results){
            resolve(results);
        }).catch(function(err){
            reject(err);
        });
    });
}

// Given a set of markers, calculate the bounds
// Markers:
// [{
//     id: 1,
//     location: {
//         coordinates: [lat, lng],
//         type: "Point"
//     }
// }]
// Return bounds:

export function calculateBounds(markers){
    var bounds = new window.google.maps.LatLngBounds();
    if (markers){
        var len = markers.length;
        for (var i=0; i<len; i++){
            var marker = markers[i];
            if (marker.location){
                //var point = new maps.LatLng(marker.location.coordinates[0],marker.location.coordinates[1]);
                var point = new window.google.maps.LatLng(marker.location.coordinates[0],marker.location.coordinates[1]);
                bounds.extend(point);
            }
        }
    }
    // Convert to correct format
    var ne = bounds.getNorthEast();
    var sw = bounds.getSouthWest();
    var retBounds = {
        lat0: ne.lat(),
        lng0: ne.lng(),
        lat1: sw.lat(),
        lng1: sw.lng()
    };
    return retBounds;
}

export function addPoint(bounds, point){
    var ne = new window.google.maps.LatLng(bounds.lat0, bounds.lng0);
    var sw = new window.google.maps.LatLng(bounds.lat1, bounds.lng1);
    var newBounds = new window.google.maps.LatLngBounds(sw, ne);
    var newPoint = new window.google.maps.LatLng(point.coordinates[0], point.coordinates[1]);
    newBounds.extend(newPoint);
    return newBounds;
}

const geolocation = {
    geocodeByAddr,
    getVerifiedAddresses,
    calculateBounds,
    addPoint
};
export default geolocation;
