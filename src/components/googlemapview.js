import React from 'react';
import { GoogleMap, useLoadScript, Marker, MarkerF } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};
const center = {
  lat: 22.29386, // default latitude
  lng: 114.17053, // default longitude
};

const centerTwo = {
    lat: 22.1, // default latitude
    lng: 114.1, // default longitude
  };



const GoogleMapView = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyCFOz8efdpaZgjgmy2EivD3aSZSWarfXjg',
        libraries,
      });
    
      if (loadError) {
        return <div>Error loading maps</div>;
      }
    
      if (!isLoaded) {
        return <div>Loading maps</div>;
      }
    return(
        <>
            <div>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={14}
                    center={center}
                >
                    <MarkerF
                        position={center} />

                </GoogleMap>
            </div>
        </>
    
    )
}

export default GoogleMapView