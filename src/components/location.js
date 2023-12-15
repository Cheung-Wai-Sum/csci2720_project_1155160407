import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GoogleMapView from './googlemapview';
import { GoogleMap } from '@react-google-maps/api';



const Locat = () => {
    const [eventTable, setEventTable] = useState([]);

    useEffect(() => {
        axios
        .get('http://localhost:3000/api/getvenue')
        .then((response) => {
            setEventTable(response.data);
            console.log("wwwwww"+eventTable)
        })
        .catch((error) => {
            console.error('Error fetching event data:', error);
        });
    },[])

    return(
        <>
            <GoogleMapView/>
        </>
        
    )

}

export default Locat;