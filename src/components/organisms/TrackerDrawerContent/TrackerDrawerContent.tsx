import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import StayCurrentPortraitOutlinedIcon from "@mui/icons-material/StayCurrentPortraitOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import { MouseEvent, useCallback, useEffect, useState } from "react";

import { useAppContext } from "../../../context";
import { useDevices } from "../../../hooks";
import { Device } from "../../../types/models";
import { Loading } from "../../molecules";
import { CreateDeviceDialog } from "../dialogs";
import DeviceDetailDialog from "../dialogs/DeviceDetailDialog/DeviceDetailDialog";
import { NotFound } from "../NotFound/NotFound";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "4px 8px",
  height: "48px",
  minHeight: "48px",
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1ab394",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledItemBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  gap: theme.spacing(0.5),
}));

const StyledItemColumnBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.5),
}));

const TrackerDrawerContent = () => {
  const { originDevices, devices, setDevices, setFocusedDevice } = useAppContext();
  const [deviceId, setDeviceId] = useState("");
  const [keywords, setKeywords] = useState("");
  const [deviceDetailDialogOpen, setDeviceDetailDialogOpen] = useState(false);
  const [deviceDialogOpen, setDeviceDialogOpen] = useState(false);

  const { loading } = useDevices();

  const handleCreateDeviceClick = () => setDeviceDialogOpen(true);
  const handleCreateDeviceClose = () => setDeviceDialogOpen(false);

  const handleDeviceDetailClick = (item: Device) => (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setDeviceId(item.id);
    setDeviceDetailDialogOpen(true);
  };

  const handleDeviceDetailClose = () => setDeviceDetailDialogOpen(false);

  const updateFilterData = useCallback(() => {
    if (keywords) {
      const data = originDevices.filter((item) => {
        const newKeywords = `${keywords}`.toLowerCase();
        return (
          `${item.name}`.toLowerCase().indexOf(newKeywords) !== -1 ||
          `${item.code}`.toLowerCase().indexOf(newKeywords) !== -1
        );
      });
      setDevices(data);
    } else {
      setDevices(originDevices);
    }
  }, [keywords, originDevices, setDevices]);

  useEffect(() => {
    updateFilterData();
  }, [updateFilterData]);

  const handleSearchClick = () => {
    updateFilterData();
  };

  const getNewestEventData = (device: Device) => {
    const eventData = device.events[0];
    if (eventData) {
      return `${eventData.latitude},${eventData.longitude}`;
    }
    return "No signal";
  };

  const getTimeEventData = (device: Device) => {
    const eventData = device.events[0];
    if (eventData) {
      return moment(eventData.datetime).format("MM/DD/YYYY HH:mm:ss");
    }
    return "";
  };

  return (
    <Box
      sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        height: "100%",
        overflow: "hidden",
      }}
    >
      <FormControl fullWidth variant="outlined" size="small" sx={{ marginTop: 1 }}>
        <InputLabel>Enter device name/code to filter data</InputLabel>
        <OutlinedInput
          label="Enter device name/code to filter data"
          onChange={(e) => setKeywords(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end" onClick={handleSearchClick}>
                <SearchOutlinedIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Box
        sx={{
          flex: 1,
          height: "calc(100% - 48px)",
          overflow: "hidden",
          border: "1px solid rgba(224, 224, 224, 1)",
          borderRadius: 2,
        }}
      >
        <TableContainer sx={{ maxHeight: "100%" }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell width="100%">
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box>List of devices</Box>
                    <IconButton sx={{ color: "white" }} onClick={handleCreateDeviceClick}>
                      <AddCircleOutlineOutlinedIcon />
                    </IconButton>
                  </Box>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            {loading ? (
              <Loading />
            ) : (
              <TableBody>
                {devices.length ? (
                  devices.map((item, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>
                        <Grid
                          container
                          spacing={0.5}
                          onClick={() => setFocusedDevice(item)}
                          sx={{
                            ...(item.events[0]?.latitude && item.events[0]?.longitude
                              ? { cursor: "pointer" }
                              : { opacity: 0.5, cursor: "unset" }),
                            paddingY: 0.5,
                          }}
                        >
                          <Grid item xs={5}>
                            <StyledItemBox>
                              <PersonOutlineOutlinedIcon
                                fontSize="small"
                                sx={{
                                  color: "#1ab394",
                                  opacity: "50%",
                                }}
                              />
                              {item.name}
                            </StyledItemBox>
                          </Grid>
                          <Grid item xs={7}>
                            <StyledItemBox>
                              <TimerOutlinedIcon
                                fontSize="small"
                                sx={{
                                  color: "#1ab394",
                                  opacity: "50%",
                                }}
                              />
                              {getTimeEventData(item)}
                            </StyledItemBox>
                          </Grid>
                          <Grid item xs={12}>
                            <StyledItemBox justifyContent="space-between">
                              <StyledItemColumnBox>
                                <StyledItemBox>
                                  <StayCurrentPortraitOutlinedIcon
                                    fontSize="small"
                                    sx={{
                                      color: "#1ab394",
                                      opacity: "50%",
                                    }}
                                  />
                                  {item.code}
                                </StyledItemBox>
                                <StyledItemBox>
                                  <LocationOnOutlinedIcon
                                    fontSize="small"
                                    sx={{
                                      color: "#1ab394",
                                      opacity: "50%",
                                    }}
                                  />
                                  {getNewestEventData(item)}
                                </StyledItemBox>
                              </StyledItemColumnBox>
                              <IconButton onClick={handleDeviceDetailClick(item)}>
                                <InfoOutlinedIcon />
                              </IconButton>
                            </StyledItemBox>
                          </Grid>
                        </Grid>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <NotFound handelFunction={handleCreateDeviceClick} />
                )}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Box>

      <DeviceDetailDialog open={deviceDetailDialogOpen} deviceId={deviceId} onClose={handleDeviceDetailClose} />
      {deviceDialogOpen && <CreateDeviceDialog open={deviceDialogOpen} onClose={handleCreateDeviceClose} />}
    </Box>
  );
};

export default TrackerDrawerContent;
