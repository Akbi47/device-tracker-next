import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { DatePicker } from "@mui/x-date-pickers";
import moment, { Moment } from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { getDevice } from "../../../apis/device";
import { useAppContext } from "../../../context";
import { EventData } from "../../../types/models";
import { Loading } from "../../molecules";
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

const HistoryDrawerContent = () => {
  const router = useRouter();

  const {
    originDevices,
    eventDatas,
    setEventDatas,
    setFocusedDevice,
    clearFocusedDevice,
    setFocusedEventData,
    clearFocusedEventData,
  } = useAppContext();

  const [deviceId, setDeviceId] = useState(`${router.query["deviceId"] || ""}`);

  const [date, setDate] = useState<Date | null>(new Date());

  const [loading, setLoading] = useState<boolean>(false);

  // const { loading } = useDevice({ id: deviceId, date: moment.utc(date).startOf("date").format() });

  useEffect(() => {
    // search event data if deviceId & date not empty
    if (deviceId && date) {
      handleSearchClick();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      // Clear data before leave
      setEventDatas([]);
      clearFocusedDevice();
      clearFocusedEventData();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeviceIdChange = (event: SelectChangeEvent) => {
    setDeviceId(event.target.value as string);
  };

  const handleDateChange = (value: Moment | null) => {
    if (value && value.isValid()) {
      setDate(value.toDate());
    } else {
      setDate(null);
    }
  };

  const handleSearchClick = async () => {
    setLoading(true);
    if (deviceId && date) {
      const dt = moment.utc(date).startOf("date").format();
      const result = await getDevice({
        id: deviceId,
        date: dt,
      });
      setLoading(false);
      setFocusedDevice(result.data);
      setEventDatas(result.data.events || []);
    } else {
      setEventDatas([]);
    }
    clearFocusedEventData();
  };

  const handleEventClick = (eventData: EventData) => () => {
    setFocusedEventData(eventData);
  };

  const getNewestEventData = (eventData: EventData) => {
    if (eventData) {
      return `${eventData.latitude},${eventData.longitude}`;
    }
    return "";
  };

  const getTimeEventData = (eventData: EventData) => {
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
      <Grid item xs={12} sx={{ marginTop: 1 }}>
        <FormControl size="small" fullWidth>
          <InputLabel id="select-position">Device</InputLabel>
          <Select
            labelId="select-position"
            label="Device"
            name="position"
            value={deviceId}
            onChange={handleDeviceIdChange}
          >
            {originDevices.map((item, index) => (
              <MenuItem value={item.id} key={index} disabled={item.events.length === 0}>
                {`${item.name} (${item.code})`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <FormControl fullWidth>
        <DatePicker
          openTo="day"
          label="Date"
          value={date}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} size="small" />}
        />
      </FormControl>
      <Button fullWidth sx={{ bgcolor: "#1ab394" }} variant="contained" onClick={handleSearchClick}>
        Search
      </Button>
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
                <StyledTableCell>List of events</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <Loading />
              ) : eventDatas.length ? (
                eventDatas.map((item, index) => (
                  <StyledTableRow key={index} sx={{ cursor: "pointer" }} onClick={handleEventClick(item)}>
                    <StyledTableCell>
                      <Grid container spacing={0.5}>
                        <Grid item xs={4}>
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
                        <Grid item xs={8}>
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
                        </Grid>
                      </Grid>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <NotFound showButton={false} />
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default HistoryDrawerContent;
