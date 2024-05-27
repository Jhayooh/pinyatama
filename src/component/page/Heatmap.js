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
import { Gradient } from '@mui/icons-material';

  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });


  const Geocollection = collection(db, "farms")



  const Heatmap = () => {
    const [markers, setMarkers] = useState([]);
    const [markers1, setMarkers1] = useState([]);
    const mapRef = useRef(null);
    const [imgUrls, setImgUrls] = useState({});
    const [locationList, setLocationList] = useState([]);
    const [isValid, setIsValid] = useState(true);

  
    useEffect(() => {
      const getData = async () => {
        try {
          const data = await getDocs(Geocollection);
          const filteredData = data.docs.map(doc => {
            const { geopoint, title, cropStage } = doc.data(); 
            return { geopoint, title, cropStage };
          });
  
          const markers = filteredData.flatMap(({ geopoint, title, cropStage }) => {
            if (geopoint && Array.isArray(geopoint)) {
              return geopoint.map(geoPoint => ({
                cropStage,
                title,
                position: [geoPoint.latitude, geoPoint.longitude]
              }));
            }
            if (geopoint) {
              return [{
                cropStage,
                title,
                position: [geopoint.latitude, geopoint.longitude]
              }];
            }
            return [];
          });
  
          const sortedData = await Promise.all(
            data.docs.map(async (doc) => {
              const eventsCollection = collection(doc.ref, "events");
              const snapshot = await getDocs(eventsCollection);
              const eventsData = snapshot.docs.map((doc) => {
                const eventData = doc.data();
                
               
                return {
                  ...eventData,
                  date: eventData.start_time.toDate(), // Convert timestamp to date
                  startDate: new Date(eventData.start_time.toDate().getTime() - 86400000), // Set timestamp to be 1 day before the date
                  endDate: eventData.end_time.toDate(), // Set timestamp to be the date itself
                };
              });
              return { title: doc.data().title, eventsData };
            })
          );
          
          const filteredSortedData = sortedData.sort((a, b) => a.title.localeCompare(b.title));
          

  
          console.log("Filtered and Sorted Data:", filteredSortedData);
          setMarkers(markers);
          setMarkers1(sortedData);
          console.log("marker data:", markers1);
        } catch (err) {
          console.error("Error fetching data:", err);
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
                90 // Fixed intensity value for all markers
              ]);
  
   // Remove any existing heat layer before adding a new one
              map.eachLayer(layer => {
                  if (layer instanceof L.HeatLayer) {
                      map.removeLayer(layer);
                  }
              });
  
              L.heatLayer(data, { radius: 50,    gradient: {
               
                
                0.6: 'green',
               
                
            }, blur: 25 }).addTo(map); // Increase the radius value to make the points bigger
          } catch (error) {
              console.error('Error in HeatLayerExample:', error);
          }
      }, [map, markers]);
  
      return null;
  };
 
  // vegetative
  // 0.6: 'green',

  // fruiting
  // 0.5: 'green',
  // 1: 'yellow',

   // fruiting
  // 0.5: 'yellow',
  // 1: 'orange',
  
  

    return (
      
      <MapContainer
        center={[14.10051, 122.96002]}
        zoom={10}
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
              <p>{marker.cropStage}</p>
              
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
