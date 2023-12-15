import React from 'react';
import { GoogleMap, useLoadScript, Marker, MarkerF } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: 500,
  height: 500,
};






const SinglePageGoogleMapView = ({lan,longt}) => {
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

      const center = {
        lat: lan, // default latitude
        lng: longt, // default longitude
      };
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

export default SinglePageGoogleMapView