import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import 'leaflet.heat/dist/leaflet-heat.js';
import { storage } from '../../firebase/Config';
import { db } from '../../firebase/Config'
import { getDocs, collection } from 'firebase/firestore';

import markerIcon from './marker.png'; // Import the custom icon image

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});


const Geocollection = collection(db, "farms")



const Heatmap = () => {
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);
  const [imgUrls, setImgUrls] = useState({});

  const fetchImage = async (imageUrl) => {
    try {
      const imageRef = storage.ref().child(imageUrl);
      return await imageRef.getDownloadURL();
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  };

  const [Location, setlocationList] = useState([]);


  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getDocs(Geocollection);
        const filteredData = data.docs.map(doc => {
          const { Location, title } = doc.data(); // Assuming 'Location' is an array of GeoPoints and 'title' is the marker name
          return { title, Location }; // Return an object with 'title' and 'Location'
        });
  
        const markers = filteredData.flatMap(({ title, Location }) => {
          if (Location && Array.isArray(Location)) {
            return Location.map(geoPoint => ({
              title,
              position: [geoPoint.latitude, geoPoint.longitude]
            }));
          }
          if (Location) {
            return [{
              title,
              position: [Location.latitude, Location.longitude]
            }];
          }
          return [];
        });
  
        setMarkers(markers);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);
  

  return (
    <MapContainer
      center={[14.10051, 122.96002]}
      zoom={12}
      style={{ height: '100vh', width: '100%' }}
      whenCreated={(map) => (mapRef.current = map)}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          icon={customIcon}
        >
          <Popup>
            <div>
              <p>{marker.title}</p>
              {/* Assuming you want to display the title as the marker info */}
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
