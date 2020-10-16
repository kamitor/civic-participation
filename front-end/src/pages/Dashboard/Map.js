import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const MapContainer = (props) => {
    const mapStyles = {
        height: "86vh",
        width: "100%"
    };
    const defaultCenter = {
        lat: 52.1135031, lng: 4.2829047
    }
    const [currentPosition, setCurrentPosition] = useState(defaultCenter);
    const [currentTitle, setCurrentTitle] = useState()
    const [selected, setSelected] = useState(false);

    const onSelect = (item) => {
        setSelected(item)
    }

    useEffect(() => {
        console.log(selected)
        if (props.location.lat && props.location.lng) {
            setCurrentPosition(props.location);
            setCurrentTitle(props.title);
        }
    })

    return (
        <LoadScript
            googleMapsApiKey='AIzaSyDMa6KMn669HY33Qrdu5gd0ggyf5C8G4WQ'>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={17}
                center={currentPosition}>
                {
                    props.proposalList.map(item => {
                        return (
                            <Marker
                                key={item["proposalId"]}
                                position={{
                                    lat: parseFloat((item["location"]).split(",")[0]),
                                    lng: parseFloat((item["location"]).split(",")[1])
                                }}
                                onClick={() => onSelect({location: item["location"]})}
                            >
                                {
                                    (selected.location == item["location"]) &&
                                    (
                                        <InfoWindow
                                            position={{
                                                lat: parseFloat((item["location"]).split(",")[0]),
                                                lng: parseFloat((item["location"]).split(",")[1])
                                            }}
                                            onCloseClick={() => setSelected({})}
                                        >
                                            <p>{item["title"]}</p>
                                        </InfoWindow>
                                    )
                                }
                            </Marker>
                        )
                    })
                }
                {/* {
                    currentPosition.lat ?
                        <Marker
                            position={currentPosition}
                            onClick={() => onSelect()}
                        /> :
                        null
                }
                {
                    props.location.lat && selected  &&
                    (
                        <InfoWindow
                            position={currentPosition}
                            onCloseClick={() => setSelected({})}
                        >
                            <p>{currentTitle}</p>
                        </InfoWindow>
                    )
                } */}

            </GoogleMap>
        </LoadScript>
    )
}

export default MapContainer;