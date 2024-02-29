import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import 'leaflet.heat/dist/leaflet-heat.js';
const customIcon = new L.Icon({
    iconUrl: require('./marker.png'),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
  
const Heatmap = () => {
    const [markers, setMarkers] = useState([
        { id: 1, position: { lat: 14.10051, lng: 122.96002 } },
        // Add other markers as needed
      ]);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.leafletElement;
      const data = [
        [14.30051, 122.96002, 1],
        [14.20051, 122.96002, 1],
        [14.40051, 122.96002, 1],
        [14.50051, 122.96002, 1],
      ];

      L.heatLayer(data).addTo(map);
    }
  }, []);

  return (
    <MapContainer


    center={[14.10051, 122.96002]}
      zoom={12}
      style={{ height: '100vh', width: '100%' }}
      whenCreated={(map) => (mapRef.current = map)}
    >
          {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.position}
          icon={customIcon}
          
        />
      ))}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <HeatLayerExample />
    </MapContainer>
  );
};

const HeatLayerExample = () => {
    const map = useMap();
  
    useEffect(() => {
      const data = [
        [14.10051, 122.94002, 20],
        
      ];
  
      L.heatLayer(data, { radius: 80 }).addTo(map); // Increase the radius value to make the points bigger
    }, [map]);
  
    return null;
  };

export default Heatmap;
