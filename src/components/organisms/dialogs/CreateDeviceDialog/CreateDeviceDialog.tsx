import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { mutate } from "swr";

import { createDevice } from "../../../../apis/device";
import { useAppContext } from "../../../../context";
import { CreateDeviceForm, createDeviceFormSchema } from "../../../../forms/device";
import DeviceDetailDialog from "../DeviceDetailDialog/DeviceDetailDialog";

type CreateDeviceDialogProps = {
  open: boolean;
  onClose?: () => void;
};

const initialFormValues: CreateDeviceForm = {
  name: "",
};

function CreateDeviceDialog({ open, onClose }: CreateDeviceDialogProps) {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [deviceId, setDeviceId] = useState<string>();
  const [isDeviceDetailDialogOpen, setIsDeviceDetailDialogOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const { devices } = useAppContext();

  const handleSubmitFormik = (values: CreateDeviceForm) => {
    const isExisted = devices.some((value) => value.name === values.name);
    console.log(isExisted ? "true" : "false");
    if (isExisted) {
      setErrorMessage("The Device name is already exists, please choose a different name.");
    } else {
      createDevice(values)
        .then((res) => {
          mutate("/api/devices");

          setDeviceId(res.data.id);
          setIsDeviceDetailDialogOpen(true);
          return;
        })
        .catch((err) => {
          return enqueueSnackbar(err.message, { variant: "error" });
        });
    }
  };

  const { values, handleSubmit, handleChange, touched, errors } = useFormik({
    initialValues: initialFormValues,
    validationSchema: createDeviceFormSchema,
    onSubmit: handleSubmitFormik,
  });

  const handleDeviceDetailClose = () => {
    setIsDeviceDetailDialogOpen(false);
    onClose && onClose();
  };

  return (
    <>
      <Dialog fullWidth={true} maxWidth="xs" open={open}>
        <form onSubmit={handleSubmit}>
          <DialogTitle className="flex flex-row justify-between">
            Create device
            {onClose && (
              <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                }}
              >
                <CloseOutlinedIcon />
              </IconButton>
            )}
          </DialogTitle>
          <DialogContent dividers>
            <Grid spacing={2} container>
              <Grid item xs={12}>
                {errorMessage && (
                  <Grid item xs={12} marginBottom={1.5}>
                    <Alert severity="error">{errorMessage}</Alert>
                  </Grid>
                )}
                <TextField
                  type="text"
                  size="small"
                  fullWidth
                  name="name"
                  label="Device name"
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  value={values.name}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" size="small" color="primary">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <DeviceDetailDialog open={isDeviceDetailDialogOpen} deviceId={deviceId} onClose={handleDeviceDetailClose} />
    </>
  );
}

export default CreateDeviceDialog;
