import React, { useState, useEffect } from "react";
import { Map , TileLayer } from "react-leaflet";
import data from "../assets/data.json";
import Markers from "./VenueMarkers";

import { useLocation, useNavigate } from "react-router-dom";

import "leaflet/dist/leaflet.css";

const MapView = (props) => {
  const [state, setState] = useState({
    currentLocation: { lat: 52.52437, lng: 13.41053 },
    zoom: 13,
    data,
  });

  const location = useLocation();
  const history = useNavigate();
  console.log(location);
  useEffect(() => {
    console.log(state);
    console.log(location);
    console.log(location.state.latitude)
    if (location.state.latitude && location.state.longitude) {
      const currentLocation = {
        lat: location.state.latitude,
        lng: location.state.longitude,
      };
      console.log(state);
      setState({
        ...state,
        data: {
          venues: state.data.venues.concat({
            name: "new",
            geometry: [currentLocation.lat, currentLocation.lng],
          }),
        },
        currentLocation,
      });
      
    }
  }, [location]);

  return (
    <Map   className="markercluster-map"
    center={[51.0, 19.0]}
    zoom={4}
    maxZoom={18}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
   
    </Map>
  );
};

export default MapView;
