/* eslint-disable @next/next/no-img-element */

import DvrOutlinedIcon from "@mui/icons-material/DvrOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import StayCurrentPortraitOutlinedIcon from "@mui/icons-material/StayCurrentPortraitOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import { Box, Button, Link, Typography } from "@mui/material";
import { styled } from "@mui/material";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Marker as MarkerLeaflet, Popup, Tooltip, useMap } from "react-leaflet";

import { useAppContext } from "../../../../context";
import { Device } from "../../../../types/models";

const CustomPopup = styled(Popup)(() => ({
  width: "400px",
}));

const CustomMarker = styled(MarkerLeaflet)(() => ({
  zIndex: "9999999999999 !important",
}));

const CustomTooltip = styled(Tooltip)(() => ({
  backgroundColor: "#000 !important",
  borderColor: "#fff !important",
  borderWidth: "2px !important",
  color: "#fff !important",
  borderRadius: "18px !important",
  padding: "3px 10px !important",
  "&::before": {
    display: "none",
  },
}));

const Customdirection = styled(Tooltip)(() => ({
  backgroundColor: "transparent !important",
  border: "unset !important",
  boxShadow: "unset !important",
  width: "60px",
  height: "70px",
  top: "28px",
  left: "-16px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: "-99999999 !important",
}));

type MapMarkerProps = {
  device: Device;
  showHistory?: boolean;
};

const MapMarker = ({ device, showHistory = true }: MapMarkerProps) => {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const { focusedDevice, focusedEventData, clearFocusedDevice } = useAppContext();

  const markerRef = useRef<any>(null);
  const popupRef = useRef<any>(null);

  const map = useMap();

  const eventData = useMemo(() => {
    if (showHistory) {
      return device.events[0];
    } else {
      return focusedEventData;
    }
  }, [device, showHistory, focusedEventData]);

  useEffect(() => {
    setAddress("");
  }, [eventData]);

  useEffect(() => {
    if (showHistory && focusedDevice && focusedDevice.id === device.id && focusedDevice.events[0]) {
      const { latitude, longitude } = focusedDevice.events[0];
      map.flyTo([latitude, longitude], 16);
      markerRef.current?.openPopup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusedDevice?.id]);

  useEffect(() => {
    if (!showHistory && focusedEventData?.latitude && focusedEventData?.longitude) {
      const { latitude, longitude } = focusedEventData;
      map.flyTo([latitude, longitude], 16);
      markerRef.current?.openPopup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusedEventData?.latitude, focusedEventData?.longitude]);

  // useEffect(() => {
  //   console.log(`showHistory: ${showHistory}`, focusedEventData);
  //   if (showHistory) {
  //     if (focusedDevice && focusedDevice.id === device.id && focusedDevice.events[0]) {
  //       const { latitude, longitude } = focusedDevice.events[0];
  //       map.flyTo([latitude, longitude], 16);
  //       markerRef.current?.openPopup();
  //     }
  //   } else {
  //     if (focusedEventData) {
  //       const { latitude, longitude } = focusedEventData;
  //       map.flyTo([latitude, longitude], 16);
  //       markerRef.current?.openPopup();
  //     }
  //   }
  // }, [device.id, focusedDevice, focusedEventData, map, showHistory]);

  const provider = useMemo(
    () =>
      new OpenStreetMapProvider({
        params: {
          "accept-language": "en", // render results in English
          countrycodes: "en", // limit search results to the English
        },
      }),
    []
  );

  useEffect(() => {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon2x.src,
      iconUrl: markerIcon.src,
      shadowUrl: markerShadow.src,
      // iconRetinaUrl: "/assets/images/marker-icon-2x.png",
      // iconUrl: "/assets/images/marker-icon.png",
      // shadowUrl: "/assets/images/marker-shadow.png",
    });
  }, []);

  const handleHistoryClick = () => {
    clearFocusedDevice();
    router.replace(`/tracker/history?deviceId=${device.id}`);
  };

  const handleGeolocationClick = async () => {
    const { latitude, longitude } = eventData || {};
    if (latitude && longitude) {
      const results = await provider.search({ query: `${latitude},${longitude}` });
      const [firstPosition] = results;
      firstPosition?.label ? setAddress(firstPosition.label) : setAddress("(Address not found)");
    }
  };

  const handlePopupCloseClick = () => {
    showHistory && clearFocusedDevice();
  };

  if (!eventData) return null;

  return (
    <CustomMarker
      riseOnHover={true}
      ref={markerRef}
      position={[eventData.latitude, eventData.longitude]}
      eventHandlers={{
        popupclose: handlePopupCloseClick,
      }}
    >
      <CustomPopup ref={popupRef}>
        <Box className="poup" sx={{ width: "350px" }}>
          <Box className="poup-contain">
            <Box
              className="poup-contain__item"
              sx={{
                display: "grid",
                gridTemplateColumns: "120px 1fr",
                gap: "20px",
                alignItems: "flex-start",
                marginBottom: "10px",
              }}
            >
              <Box className="poup-item__title" sx={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <PersonOutlineOutlinedIcon />
                <Typography variant="caption" sx={{ fontSize: "13px", fontWeight: "600" }}>
                  Device name:
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ fontSize: "13px", fontWeight: "400" }}>
                {device.name}
              </Typography>
            </Box>
            <Box
              className="poup-contain__item"
              sx={{
                display: "grid",
                gridTemplateColumns: "120px 1fr",
                gap: "20px",
                alignItems: "flex-start",
                marginBottom: "10px",
              }}
            >
              <Box className="poup-item__title" sx={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <StayCurrentPortraitOutlinedIcon />
                <Typography variant="caption" sx={{ fontSize: "13px", fontWeight: "600" }}>
                  Device code:
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ fontSize: "13px", fontWeight: "400" }}>
                {device.code}
              </Typography>
            </Box>
            <Box
              className="poup-contain__item"
              sx={{
                display: "grid",
                gridTemplateColumns: "120px 1fr",
                gap: "20px",
                alignItems: "flex-start",
                marginBottom: "10px",
              }}
            >
              <Box className="poup-item__title" sx={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <DvrOutlinedIcon />
                <Typography variant="caption" sx={{ fontSize: "13px", fontWeight: "600" }}>
                  MAC:
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ fontSize: "13px", fontWeight: "400" }}>
                {device.mac}
              </Typography>
            </Box>
            <Box
              className="poup-contain__item"
              sx={{
                display: "grid",
                gridTemplateColumns: "120px 1fr",
                gap: "20px",
                alignItems: "flex-start",
                marginBottom: "10px",
              }}
            >
              <Box className="poup-item__title" sx={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <TimerOutlinedIcon />
                <Typography variant="caption" sx={{ fontSize: "13px", fontWeight: "600" }}>
                  Last update:
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ fontSize: "13px", fontWeight: "400" }}>
                {`${moment(eventData.datetime).format("MM/DD/YYYY HH:mm:ss")}`}
              </Typography>
            </Box>
            <Box
              className="poup-contain__item"
              sx={{
                display: "grid",
                gridTemplateColumns: "120px 1fr",
                gap: "20px",
                alignItems: "flex-start",
                marginBottom: "10px",
              }}
            >
              <Box className="poup-item__title" sx={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <LocationOnOutlinedIcon />
                <Typography variant="caption" sx={{ fontSize: "13px", fontWeight: "600" }}>
                  Location:
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ fontSize: "13px", fontWeight: "400" }}>
                {`${eventData.latitude},${eventData.longitude}`}
              </Typography>
            </Box>
            <Box
              className="poup-contain__item"
              sx={{
                display: "grid",
                gridTemplateColumns: "120px 1fr",
                gap: "20px",
                alignItems: "flex-start",
                marginBottom: "10px",
              }}
            >
              <Box className="poup-item__title" sx={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <MapOutlinedIcon />
                <Typography variant="caption" sx={{ fontSize: "13px", fontWeight: "600" }}>
                  Address:
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ fontSize: "13px", fontWeight: "400" }}>
                {address ? (
                  address
                ) : (
                  <Link onClick={handleGeolocationClick} underline="always" sx={{ cursor: "pointer" }}>
                    Click to see the address
                  </Link>
                )}
              </Typography>
            </Box>
          </Box>
          {showHistory && (
            <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
              <Button size="small" color="primary" variant="contained" onClick={handleHistoryClick}>
                History
              </Button>
            </Box>
          )}
        </Box>
      </CustomPopup>
      <Customdirection permanent={true} direction="center">
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
          <span
            style={{
              clipPath: "polygon(50% 100%, 100% 0, 0 0)",
              width: "55px",
              height: "48px",
              background: "linear-gradient(to top, #0A3A80, #C6EBFA)",
              transform: `rotate(${eventData.heading}deg)`,
              transformOrigin: "bottom",
              opacity: 0.7,
              display: "block",
              zIndex: -999999,
              borderRadius: "50%",
            }}
          />
          <h4
            style={{
              backgroundColor: "#000",
              borderColor: "#fff",
              borderWidth: "2px",
              borderStyle: "solid",
              color: "#fff ",
              borderRadius: "18px",
              padding: "3px 10px",
              display: "inline-block",
              marginTop: "5px",
              opacity: !showHistory ? 0 : 1,
            }}
          >
            {device.name}
          </h4>
        </div>
      </Customdirection>
    </CustomMarker>
  );
};

export default MapMarker;
