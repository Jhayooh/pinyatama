// App.js
import React, { useState, useRef } from 'react';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './GeoLoc.css';

// Custom icon
const customIcon = new L.Icon({
  iconUrl: require('./marker.png'),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const App = () => {
  const [state, setState] = useState({
    isPaneOpen: false,
    selectedMarker: null,
  });

  const [markers, setMarkers] = useState([
    { id: 1, position: { lat: 14.10051, lng: 122.96002 } },
    // Add other markers as needed
  ]);

  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef(null); // Reference to the map instance
  const ZOOM_LEVEL = 10; // Adjust the desired zoom level

  const getUserLocation = () => {
    // ... (existing code)
  };

  const handleMapClick = () => {
    setState({ isPaneOpen: false, selectedMarker: null });
  };

  const handleMarkerClick = (marker) => {
    setState({ isPaneOpen: true, selectedMarker: marker });
  };

  return (
    <div>
      <SlidingPane
        className="some-custom-class"
        overlayClassName="some-custom-overlay-class"
        isOpen={state.isPaneOpen}
        title="PineApple Farm"
        subtitle="Daet, Camarines Norte"
        onRequestClose={() => {
          setState({ isPaneOpen: false, selectedMarker: null });
        }}
        from="left"
        width="300px"
      >
        <div>
          <p>Information about the pineapple </p>
        </div>
        <br />
        
      </SlidingPane>

      <div className={`map-container ${state.isPaneOpen ? 'map-container-open' : ''}`}>
        <MapContainer
          center={
            markers.length > 0 ? markers[markers.length - 1].position : { lat: 0, lng: 0 }
          }
          zoom={ZOOM_LEVEL}
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
          }}
          ref={mapRef}
          onClick={handleMapClick}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Markers */}
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.position}
              icon={customIcon}
              eventHandlers={{
                click: () => handleMarkerClick(marker),
              }}
            />
          ))}

          {/* Marker for the user's location */}
          {userLocation && (
            <Marker key="user" position={userLocation} icon={customIcon} />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default App;
