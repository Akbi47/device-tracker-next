import { Box, CssBaseline, Toolbar } from "@mui/material";
import { Drawer } from "@mui/material";
import { styled } from "@mui/material/styles";
import dynamic from "next/dynamic";
import { useEffect } from "react";

import { Base } from "../../../components/layouts";
import { NavBar } from "../../../components/organisms";
import HistoryDrawerContent from "../../../components/organisms/HistoryDrawerContent/HistoryDrawerContent";
import { useAppContext } from "../../../context";
import { useDevices } from "../../../hooks";
import withPageProtected from "../../../utils/withPageProtected";

const MapHistory = dynamic(() => import("../../../components/organisms/MapHistory/MapHistory"), { ssr: false });

const TITLE = "Hành trình";
const DRAWER_WIDTH = 380;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  overflow: "hidden",
  flexGrow: 1,
  // padding: theme.spacing(3),
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
}));

export default withPageProtected(() => {
  const { devices } = useDevices();
  const { drawerOpen, setOriginDevices } = useAppContext();

  useEffect(() => {
    setOriginDevices(devices || []);
  }, [devices, setOriginDevices]);

  return (
    <Base title={TITLE} header={<NavBar />}>
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
          <HistoryDrawerContent />
        </Drawer>
        <Main open={drawerOpen}>
          <MapHistory />
        </Main>
      </Box>
    </Base>
  );
});
