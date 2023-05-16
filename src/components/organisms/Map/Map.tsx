import "leaflet/dist/leaflet.css";

import { styled } from "@mui/material";
import { LatLngBoundsLiteral, Map as LeafletMap } from "leaflet";
import React, { useEffect, useRef, useState } from "react";
import { LayersControl, MapContainer as ReactLeafletMapContainer, TileLayer, ZoomControl } from "react-leaflet";

import { useAppContext } from "../../../context";
import { AnyObject } from "../../../types";
import SizeMapControl from "../../atoms/SizeMapControl/SizeMapControl";
import MapMarker from "./Marker/MapMarker";

const CustomMapContainer = styled(ReactLeafletMapContainer)(() => ({
  height: "calc(100vh - 48px)",
}));

const GOOGLE_TILES: AnyObject = {
  m: "Standard Roadmap",
  s: "Satellite Only",
  y: "Hybrid",
};

const Map = () => {
  const { devices } = useAppContext();
  const [isInitBounds, setIsInitBounds] = useState<boolean>(false);

  const mapRef = useRef<LeafletMap>(null);

  useEffect(() => {
    if (mapRef.current && devices.length && !isInitBounds) {
      const latLngBounds: LatLngBoundsLiteral = [];
      devices.map((item) => {
        if (item.events[0]) {
          const { latitude, longitude } = item.events[0];
          latLngBounds.push([latitude, longitude]);
        }
      });
      latLngBounds.length && mapRef.current.fitBounds(latLngBounds);
      setIsInitBounds(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [devices, mapRef.current]);

  return (
    <CustomMapContainer ref={mapRef} center={{ lat: 10.7300575, lng: 106.6232806 }} zoom={16} zoomControl={false}>
      <LayersControl position="topright" autoZIndex={false}>
        {/* OSM tiles */}
        <LayersControl.BaseLayer name="OSM">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>

        {/* Google tiles */}
        {Object.keys(GOOGLE_TILES).map((key, index) => (
          <LayersControl.BaseLayer key={key} checked={index === 0} name={GOOGLE_TILES[key]}>
            <TileLayer
              url={`https://{s}.google.com/vt/lyrs=${key}&hl=en&x={x}&y={y}&z={z}`}
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />
          </LayersControl.BaseLayer>
        ))}

        {devices.map((item, index) => (
          <MapMarker key={index} device={item} />
        ))}
      </LayersControl>
      <SizeMapControl prepend position="topleft" />
      <ZoomControl position="bottomright" />
    </CustomMapContainer>
  );
};

export default Map;
