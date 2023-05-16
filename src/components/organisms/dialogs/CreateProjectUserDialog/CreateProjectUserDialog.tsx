import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { SyntheticEvent, useCallback, useEffect, useMemo } from "react";
import { mutate } from "swr";

import { createProjectUser } from "../../../../apis/projectUser";
import { SearchConditionForm } from "../../../../forms";
import { CreateProjectUserForm, createProjectUserFormSchema } from "../../../../forms/projectUser";
import { useDropdownUsers, useProject } from "../../../../hooks";
import { ensureString } from "../../../../utils";
import { Loading } from "../../../molecules";

const initialFormValues: CreateProjectUserForm = {
  projectId: null,
  userId: null,
  joinDate: new Date(),
  position: null,
};

type CreateProjectUserDialogProps = {
  open: boolean;
  projectId?: string;
  searchConditionForm: SearchConditionForm;
  onClose?: () => void;
};

const POSITIONS = ["PM", "PL", "QC", "DEV", "TESTER"];

const CreateProjectUserDialog = ({ open, projectId, searchConditionForm, onClose }: CreateProjectUserDialogProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { project, loading } = useProject(projectId);
  const { users: dropdownUsers = [] } = useDropdownUsers(true);

  const userOptions = useMemo(() => dropdownUsers.map((item) => item.id), [dropdownUsers]);

  const handleSubmitFormik = (values: CreateProjectUserForm) => {
    createProjectUser(values)
      .then(() => {
        mutate(["/api/projects", searchConditionForm]);
        onClose && onClose();
        return enqueueSnackbar("Thêm nhân viên cho dự án thành công");
      })
      .catch((err) => {
        setSubmitting(false);
        return enqueueSnackbar(err.message, { variant: "error" });
      });
  };

  const { values, errors, touched, isSubmitting, setSubmitting, handleSubmit, handleChange, setFieldValue, resetForm } =
    useFormik({
      initialValues: initialFormValues,
      validationSchema: createProjectUserFormSchema,
      onSubmit: handleSubmitFormik,
    });

  useEffect(() => {
    if (projectId) {
      resetForm({
        values: { ...initialFormValues, projectId },
      });
    }
  }, [projectId, resetForm]);

  const handleComboboxChange = useCallback(
    (fieldName: string) => (event: SyntheticEvent<Element, Event>, value: string | null) => {
      setFieldValue(fieldName, value);
    },
    [setFieldValue]
  );

  return (
    <Dialog open={open} scroll="paper" fullWidth maxWidth="xs">
      <DialogTitle>Thêm nhân sự</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          {loading ? (
            <Loading />
          ) : (
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography fontWeight="bold">Khách hàng</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography>{project?.customer.name}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography fontWeight="bold">Dự án</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography>{project?.name}</Typography>
                  </Grid>
                  {(project?.skills.length || 0) > 0 && (
                    <>
                      <Grid item xs={12}>
                        <Typography fontWeight="bold">Yêu cầu kỹ thuật</Typography>
                      </Grid>
                      <Grid item xs={1} />
                      <Grid item xs={11}>
                        {project?.skills?.map((skill) => (
                          <Typography key={skill.id}>{`- ${skill.name}`}</Typography>
                        ))}
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography fontWeight="bold">Thông tin nhân sự</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <Autocomplete
                        options={userOptions}
                        value={values.userId}
                        onChange={handleComboboxChange("userId")}
                        getOptionLabel={(option) => {
                          const user = dropdownUsers.find((item) => item.id === option);
                          return user?.fullName || "";
                        }}
                        getOptionDisabled={(option) =>
                          !!project?.projectUsers.some((projectUser) => projectUser.user.id === option)
                        }
                        renderOption={(props, option) => {
                          const user = dropdownUsers.find((item) => item.id === option);
                          return (
                            <Box component="li" {...props}>
                              <Stack>
                                {user?.fullName}
                                <Box
                                  color="gray"
                                  display="flex"
                                  flexWrap="wrap"
                                  gap="5px"
                                  sx={{
                                    ">span::after": { content: '", "' },
                                    ">span:last-child::after": { content: '""' },
                                  }}
                                >
                                  {user?.userSkills?.map((userSkill) => (
                                    <Typography
                                      key={userSkill.id}
                                      component="span"
                                      variant="body2"
                                      fontSize="x-small"
                                      whiteSpace="nowrap"
                                    >
                                      {`${userSkill.skill?.name} (${userSkill.level})`}
                                    </Typography>
                                  ))}
                                </Box>
                              </Stack>
                            </Box>
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Nhân sự"
                            error={touched.userId && Boolean(errors.userId)}
                            helperText={touched.userId && errors.userId}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <DatePicker
                        openTo="day"
                        label="Ngày tham gia"
                        value={values.joinDate}
                        onChange={(date: any) => {
                          if (date) {
                            const selectedDate = date.toDate ? date.toDate() : date;
                            setFieldValue("joinDate", selectedDate);
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={touched.joinDate && Boolean(errors.joinDate)}
                            helperText={touched.joinDate && ensureString(errors.joinDate)}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="select-position">Chức vụ</InputLabel>
                      <Select
                        labelId="select-position"
                        label="Chức vụ"
                        name="position"
                        value={values.position}
                        onChange={handleChange}
                      >
                        {POSITIONS.map((item, index) => (
                          <MenuItem value={item} key={index}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isSubmitting}>
            Hủy
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            Lưu
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateProjectUserDialog;
