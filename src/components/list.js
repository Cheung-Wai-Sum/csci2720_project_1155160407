import React, { useEffect, useState, useHistory } from 'react';
import axios from 'axios';
import GoogleMapView from './googlemapview';
import { GoogleMap } from '@react-google-maps/api';
import  Table  from './home';
import SinglePageGoogleMapView from './singleplacemapview.js';



const Lists = () => {
    const [eventTable, setEventTable] = useState([]);
    const [check,setCheck] = useState([{latitude: 22.29386,
        location: "Hong Kong Cultural Centre (Concert Hall)",
        longtitude: 114.17053,
        vid: 1}])

    

    

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

    const setUrl = (num) => {
        console.log(num)
        let dataArr = [];
        dataArr = eventTable;
        const wantedSportCenter = dataArr.filter((obj)=>{
            //console.log(Math.abs(obj.properties.LATITUDE-location.coords.latitude))
            
            return obj.vid === num
        })
        setCheck(wantedSportCenter)
        console.log(check)

    }

    return(
        <>
            <section>
                {/* //Hello world */}
                {
                check.map((item)=> (
                  
                    <table className="event-table">
                    <thead>
                        <tr>
                        <th>Location ID</th>
                        <th>Location</th>
                        <th>Lantitude</th>
                        <th>Longtitude</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                            <td>{item.vid}</td>
                            <td>{item.location}</td>
                            <td>{item.latitude}</td> {/* Accessing location property of venue */}
                            <td>{item.longtitude}</td>
                            
                    </tbody>
                    </table>

                   
                    
                ))}

            {check.map((item)=> (
                  <SinglePageGoogleMapView 
                    lan= {item.latitude}
                    longt={item.longtitude}
                  />
                  
                  
            ))}
               
                
            </section>

            <ul>
                <button type="button" className="mx-2 btn btn-success" onClick={(e) => {setUrl(1)}}>Hong Kong Cultural Centre (Concert Hall)</button><br />
                <button type="button" className="mx-2 btn btn-success" onClick={(e) => {setUrl(2)}}>Hong Kong Cultural Centre (Grand Theatre)</button><br />
                <button type="button" className="mx-2 btn btn-success" onClick={(e) => {setUrl(3)}}>Hong Kong Cultural Centre (Studio Theatre)</button><br />
                <button type="button" className="mx-2 btn btn-success" onClick={(e) => {setUrl(4)}}>Hong Kong Cultural Centre (Exhibition Gallery)</button><br />
                <button type="button" className="mx-2 btn btn-success" onClick={(e) => {setUrl(5)}}>Hong Kong Cultural Centre (Foyer Exhibition Areas)</button><br />
                <button type="button" className="mx-2 btn btn-success" onClick={(e) => {setUrl(6)}}>Tuen Mun Town Hall (Music Studio)</button><br />
                <button type="button" className="mx-2 btn btn-success" onClick={(e) => {setUrl(7)}}>Tuen Mun Town Hall (Lecture Room (1))</button><br />
                <button type="button" className="mx-2 btn btn-success" onClick={(e) => {setUrl(8)}}>Kwai Tsing Theatre (Dance Studio)"</button><br />
                <button type="button" className="mx-2 btn btn-success" onClick={(e) => {setUrl(9)}}>Kwai Tsing Theatre (Rehearsal Room)</button><br />
                <button type="button" className="mx-2 btn btn-success" onClick={(e) => {setUrl(10)}}>Kwai Tsing Theatre (Lecture Room)</button><br />
            </ul>
        </>
        
    )

}

export default Lists;