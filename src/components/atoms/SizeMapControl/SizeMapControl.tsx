import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { styled } from "@mui/material";
import { ControlOptions } from "leaflet";
import React from "react";
import Control from "react-leaflet-custom-control";

import { useAppContext } from "../../../context";

const Anchor = styled("a")(() => ({
  cursor: "pointer",
  display: "flex !important",
  justifyContent: "center",
  alignItems: "center",
}));

export type SizeMapControlProps = Required<ControlOptions> & {
  prepend?: boolean;
};

export default function SizeMapControl(props: SizeMapControlProps) {
  const { drawerOpen, setDrawerOpen } = useAppContext();

  const handleClick = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Control {...props} container={{ className: "leaflet-bar" }}>
      <Anchor onClick={handleClick}>{drawerOpen ? <ArrowBackIcon /> : <ArrowForwardIcon />}</Anchor>
    </Control>
  );
}
