import { Box, CssBaseline, Toolbar } from "@mui/material";
import { Drawer } from "@mui/material";
import { styled } from "@mui/material/styles";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { mutate } from "swr";

import { Base } from "../../components/layouts";
import { NavBar, TrackerDrawerContent } from "../../components/organisms";
import { useAppContext } from "../../context";
import { useDevices } from "../../hooks";
import withPageProtected from "../../utils/withPageProtected";

const Map = dynamic(() => import("../../components/organisms/Map/Map"), { ssr: false });

const DRAWER_WIDTH = 380;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  overflow: "hidden",
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${DRAWER_WIDTH}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
  height: "100%",
  "&>div": {
    width: open ? `calc(100vw - ${DRAWER_WIDTH}px)` : "100vw",
  },
}));

export default withPageProtected(() => {
  const { devices } = useDevices();
  const { drawerOpen, setOriginDevices, clearFocusedDevice } = useAppContext();
  const myInterval = useRef<any>();

  useEffect(() => {
    clearFocusedDevice();

    myInterval.current = setInterval(() => {
      mutate("/api/devices");
    }, 15 * 1000);

    return () => {
      clearInterval(myInterval.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setOriginDevices(devices || []);
  }, [devices, setOriginDevices]);

  return (
    <Base header={<NavBar />}>
      <Box sx={{ display: "flex", height: "100%" }}>
        <CssBaseline />
        <Drawer
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
            },
          }}
          anchor="left"
          open={drawerOpen}
          variant="persistent"
        >
          <Toolbar variant="dense" />
          <TrackerDrawerContent />
        </Drawer>
        <Main open={drawerOpen}>
          <Map />
        </Main>
      </Box>
    </Base>
  );
});
