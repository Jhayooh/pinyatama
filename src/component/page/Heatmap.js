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
    const [markers, setMarkers] = useState([
      { title: 'Farm', Info: 'Test', position: [0, 0 ], state: 'budding' },
    
    ]);
    const mapRef = useRef(null);
    const [imgUrls, setImgUrls] = useState({});

    const currentDate = new Date();
    const [Location, setlocationList] = useState([]);
  
    useEffect(() => {
      
      const getData = async () => {
        try {
          const data = await getDocs(Geocollection);
          const filteredData = data.docs.map(doc => {
            const { geopoint, title } = doc.data(); 
            return { geopoint, title  };
          });
      
          const markers = filteredData.flatMap(({ geopoint, title  }) => {
            if (geopoint && Array.isArray(geopoint)) {
              return geopoint.map(geoPoint => ({
                title,
                position: [geoPoint.latitude, geoPoint.longitude]
              }));
            }
            if (geopoint) {
              return [{
                title,
                position: [geopoint.latitude, geopoint.longitude]
              }];
            }
            return [];
          });
      
          const filteredData1 = data.docs
    .filter(doc => doc.data().title === markers[0].title)
    .map(doc => {
        const eventsCollection = collection(doc.ref, "events");
        console.log("Filtered Data:", eventsCollection);
        return { eventsCollection };
    });

console.log("Filtered Data Array:", filteredData1);

      
          const resolvedData = await Promise.all(filteredData1);
          setMarkers(markers);
          console.log("Filtered Data:", filteredData1);
        } catch (err) {
          console.error(err);
        }
      };
      
      getData();
    }, []);
    
    const HeatLayerExample = ({ markers }) => {
      const map = useMap();
  
      useEffect(() => {
          if (!markers || markers.length === 0) {
              // Remove any existing heat layer when markers are empty
              map.eachLayer(layer => {
                  if (layer instanceof L.HeatLayer) {
                      map.removeLayer(layer);
                  }
              });
              return;
          }
  
          try {
              const data = markers.map(marker => [
                  marker.position[0],
                  marker.position[1],
                  1 // Fixed intensity value for all markers
              ]);
  
              // Remove any existing heat layer before adding a new one
              map.eachLayer(layer => {
                  if (layer instanceof L.HeatLayer) {
                      map.removeLayer(layer);
                  }
              });
  
              L.heatLayer(data, { radius: 80 }).addTo(map); // Increase the radius value to make the points bigger
          } catch (error) {
              console.error('Error in HeatLayerExample:', error);
          }
      }, [map, markers]);
  
      return null;
  };
  
  

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
              
            </div>
            </Popup>
          </Marker>
        ))}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <HeatLayerExample markers={markers} />
      </MapContainer>
    );
  };

 
  


  

  export default Heatmap;
