import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Button, DialogActions, Grid, IconButton, Input, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useEffect, useState } from "react";
import { mutate } from "swr";

import { updateDeviceName } from "../../../../apis/device";
import useDevice from "../../../../hooks/useDevice";
import { Loading } from "../../../molecules";

type DeviceDetailDialogProps = {
  open: boolean;
  deviceId?: string;
  onClose?: () => void;
};

const DeviceDetailDialog = ({ open, deviceId, onClose }: DeviceDetailDialogProps) => {
  const { device, loading } = useDevice({ id: deviceId });
  const [isUpdate, setIsUpdate] = useState(false);
  const [newDeviceName, setNewDeviceName] = useState("");

  useEffect(() => {
    if (!open) {
      setIsUpdate(false);
    }
  }, [open]);

  useEffect(() => {
    setNewDeviceName(device?.name || "");
  }, [device]);

  const handleShowUpdateInput = () => {
    setIsUpdate(!isUpdate);
    setNewDeviceName(device?.name || "");
  };

  const handleUpdateDeviceName = () => {
    updateDeviceName({
      id: deviceId || "",
      name: newDeviceName,
    })
      .then((res) => {
        mutate("/api/devices");
        return res;
      })
      .catch((err) => {
        console.log(err);
      });

    onClose && onClose();
  };

  return (
    <Dialog open={open} fullWidth={true} maxWidth="xs">
      <DialogTitle id="alert-dialog-title">Device information</DialogTitle>
      <DialogContent dividers>
        {loading ? (
          <Loading />
        ) : (
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Typography fontWeight="bold">Device name</Typography>
            </Grid>
            <Grid item xs={8} sx={{ display: "flex", gap: "10px" }}>
              <Typography sx={{ display: isUpdate ? "none" : "block" }}>{device?.name}</Typography>
              <Input
                onChange={(e) => setNewDeviceName(e.target.value)}
                value={newDeviceName}
                sx={{ display: isUpdate ? "block" : "none", "& input": { padding: "0px" } }}
              />
              <IconButton sx={{ marginLeft: 1 }} size="small" onClick={handleShowUpdateInput}>
                {isUpdate ? <CloseOutlinedIcon fontSize="small" /> : <EditOutlinedIcon fontSize="small" />}
              </IconButton>
            </Grid>
            <Grid item xs={4}>
              <Typography fontWeight="bold">Device code</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{device?.code}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography fontWeight="bold">MAC address</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{device?.mac}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography fontWeight="bold">Status</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{device?.active ? "Activated" : "Inactive"}</Typography>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        {isUpdate && (
          <Button disabled={!newDeviceName} variant="contained" color="primary" onClick={handleUpdateDeviceName}>
            Save
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DeviceDetailDialog;
