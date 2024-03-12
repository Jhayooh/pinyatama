import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import 'leaflet.heat/dist/leaflet-heat.js';
import { storage } from '../../firebase/Config';

import markerIcon from './marker.png'; // Import the custom icon image

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const Heatmap = () => {
  const [markers, setMarkers] = useState([
    { id: 1, position: { lat: 14.10051, lng: 122.96002 }, info: "Marker 1 info", imageUrl: "gs://pinyatama-64d69.appspot.com/Farms/VwluEFdRHb2KG35mKbNR/w.png" },
    // Add other markers as needed
  ]);
  const mapRef = useRef(null);
  const [imgUrls, setImgUrls] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      const urls = await Promise.all(markers.map(async (marker) => {
        const url = await fetchImage(marker.imageUrl);
        return { id: marker.id, url };
      }));
      const imageUrls = urls.reduce((acc, curr) => {
        acc[curr.id] = curr.url;
        return acc;
      }, {});
      setImgUrls(imageUrls);
    };

    fetchImages();
  }, [markers]);

  const fetchImage = async (imageUrl) => {
    try {
      const imageRef = storage.ref().child(imageUrl);
      return await imageRef.getDownloadURL();
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  };

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
        >
          <Popup>
            <div>
              <p>{marker.info}</p>
              <img src={imgUrls} alt="Marker Image" style={{ maxWidth: '100%' }} />
            </div>
          </Popup>
        </Marker>
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
