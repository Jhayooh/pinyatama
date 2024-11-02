import React, { useState } from 'react';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import MapProvider from './Map-Provider';
import 'leaflet/dist/leaflet.css';

// Custom icon
const customIcon = new L.Icon({
  iconUrl: require('./marker.png'),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const App = () => {
  const [markers, setMarkers] = useState([
    { id: 1, position: { lat: 14.10051, lng: 122.96002 } },
    // Add other markers as needed
  ]);

  const [userLocation, setUserLocation] = useState(null);
  const mapRef = React.useRef(null); // Reference to the map instance
  const ZOOM_LEVEL = 10; // Adjust the desired zoom level
  const ZOOM_LEVEL1 = 14;

  const getUserLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          // Update user location
          setUserLocation({ lat: userLat, lng: userLng });

          // Add a new marker for the user's location
          setMarkers((prevMarkers) => [
            ...prevMarkers,
            { id: Date.now(), position: { lat: userLat, lng: userLng } },
          ]);

          // Log to check if setView and panTo are being called
          console.log('Zooming to user location:', { lat: userLat, lng: userLng });

          // Zoom in to the user's location
          mapRef.current.setView({ lat: userLat, lng: userLng }, ZOOM_LEVEL1);

          // Pan to the user's location with animation
          mapRef.current.panTo({ lat: userLat, lng: userLng }, { animate: true, duration: 2 });
        },
        (error) => {
          console.error('Error getting user location:', error.message);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      console.error('Geolocation is not supported by your browser');
    }
  };

  return (
    <>
      <h1>test</h1>
      <div>
        <MapContainer center={markers.length > 0 ? markers[markers.length - 1].position : { lat: 0, lng: 0 }} zoom={ZOOM_LEVEL} ref={mapRef}>
          <TileLayer
            url={MapProvider.maptiler?.url || ''}
            attribution={MapProvider.maptiler?.attribution || ''}
            onLoad={(e) => console.log('Tiles loaded:', e)}
            onError={(e) => console.error('Tile error:', e)}
          />

          {/* Markers */}
          {markers.map((marker) => (
            <Marker key={marker.id} position={marker.position} icon={customIcon}>
              <Popup>
                Marker at coordinates {marker.position.lat}, {marker.position.lng}.
              </Popup>
            </Marker>
          ))}

          {/* Marker for the user's location */}
          {userLocation && (
            <Marker key="user" position={userLocation} icon={customIcon}>
              <Popup>
                Your location at coordinates {userLocation.lat}, {userLocation.lng}.
              </Popup>
            </Marker>
          )}
        </MapContainer>

        {/* Button to get user location */}
        <button onClick={getUserLocation}>Get My Location</button>
      </div>
    </>
  );
};

export default App;
