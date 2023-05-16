import { LatLngBoundsLiteral } from "leaflet";
import React, { useEffect, useState } from "react";
import { Polyline as CustomPolyline, useMap } from "react-leaflet";

import { useAppContext } from "../../../context";

const Polyline = () => {
  const { eventDatas } = useAppContext();
  const [position, setPostitions] = useState<LatLngBoundsLiteral>([]);
  const map = useMap();

  useEffect(() => {
    const latLngBounds: LatLngBoundsLiteral = [];
    eventDatas.map((item) => {
      latLngBounds.push([item.latitude, item.longitude]);
    });
    setPostitions(latLngBounds);
  }, [eventDatas, map]);

  return <CustomPolyline positions={position} color="blue" />;
};

export default Polyline;
