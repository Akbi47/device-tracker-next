import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { FormikErrors, useFormik } from "formik";
import moment from "moment";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { mutate } from "swr";

import { createProjectPlan } from "../../../../apis/projectPlan";
import { SearchConditionForm } from "../../../../forms";
import { CreateProjectPlanForm, createProjectPlanFormSchema, ProjectUserPlanForm } from "../../../../forms/projectPlan";
import { useProject } from "../../../../hooks";
import { Loading } from "../../../molecules";

const initialFormValues: CreateProjectPlanForm = {
  projectId: null,
  month: "",
  plan: "",
  note: "",
  projectUserPlans: [],
};

type CreateProjectPlanDialogProps = {
  open: boolean;
  projectId?: string;
  projectMonth?: string;
  searchConditionForm: SearchConditionForm;
  onClose?: () => void;
};

const CreateProjectPlanDialog = ({
  open,
  projectId,
  projectMonth,
  searchConditionForm,
  onClose,
}: CreateProjectPlanDialogProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { project, loading } = useProject(projectId);

  const handleSubmitFormik = (values: CreateProjectPlanForm) => {
    const month = moment(projectMonth).format("YYYY/MM");
    createProjectPlan(values)
      .then(() => {
        mutate(["/api/projects", searchConditionForm]);
        onClose && onClose();
        return enqueueSnackbar(`Tạo kế hoạch tháng ${month} cho dự án thành công`);
      })
      .catch((err) => {
        setSubmitting(false);
        return enqueueSnackbar(err.message, { variant: "error" });
      });
  };

  const { values, errors, touched, isSubmitting, setSubmitting, handleSubmit, handleChange, resetForm } = useFormik({
    initialValues: initialFormValues,
    validationSchema: createProjectPlanFormSchema,
    onSubmit: handleSubmitFormik,
  });

  useEffect(() => {
    if (projectId && projectMonth) {
      const month = moment(projectMonth).format("YYYY-MM-DD[T]00:00:00[Z]");
      const projectUserPlans: ProjectUserPlanForm[] =
        project?.projectUsers.map((projectUser) => ({
          projectUserId: projectUser.id,
          month,
          plan: "",
          note: "",
        })) || [];
      resetForm({
        values: { ...initialFormValues, projectId, month, projectUserPlans },
        isSubmitting: false,
      });
    }
  }, [project?.projectUsers, projectId, projectMonth, resetForm]);

  return (
    <Dialog open={open} scroll="paper" fullWidth maxWidth="md">
      <DialogTitle>Tạo kế hoạch tháng {moment(projectMonth).format("YYYY/MM")}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          {loading ? (
            <Loading />
          ) : (
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={3}>
                    <Typography fontWeight="bold">Khách hàng</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography>{project?.customer.name}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography fontWeight="bold">Dự án</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography>{project?.name}</Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography fontWeight="bold">Kế hoạch dự án</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <TextField
                        name="plan"
                        label="Số lượng Man/Month"
                        InputProps={{
                          endAdornment: <InputAdornment position="end">MM</InputAdornment>,
                        }}
                        value={values.plan}
                        onChange={handleChange}
                        error={touched.plan && Boolean(errors.plan)}
                        helperText={touched.plan && errors.plan}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={8}>
                    <FormControl fullWidth>
                      <TextField
                        name="note"
                        label="Ghi chú"
                        value={values.note}
                        onChange={handleChange}
                        error={touched.note && Boolean(errors.note)}
                        helperText={touched.note && errors.note}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography fontWeight="bold">Kế hoạch nhân sự</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell align="right" width={1}>
                              STT
                            </TableCell>
                            <TableCell width={200}>Nhân sự</TableCell>
                            <TableCell width={140}>Kế hoạch</TableCell>
                            <TableCell>Ghi chú</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {values.projectUserPlans.map((projectUserPlan, index) => (
                            <TableRow key={projectUserPlan.projectUserId}>
                              <TableCell align="right">{index + 1}</TableCell>
                              <TableCell>
                                {project?.projectUsers[index].user.fullName || ""}
                                {/* <Typography color="gray" fontSize="small">
                                  - Đang tham gia dự án {Tên dự án} {xx}%
                                </Typography> */}
                              </TableCell>
                              <TableCell>
                                <Tooltip
                                  followCursor
                                  title={
                                    ((touched.projectUserPlans && touched.projectUserPlans[index]
                                      ? touched.projectUserPlans[index].plan
                                      : false) &&
                                    errors.projectUserPlans &&
                                    errors.projectUserPlans[index]
                                      ? (errors.projectUserPlans as FormikErrors<ProjectUserPlanForm>[])[index].plan
                                      : undefined) || ""
                                  }
                                >
                                  <FormControl fullWidth>
                                    <TextField
                                      name={`projectUserPlans[${index}].plan`}
                                      size="small"
                                      InputProps={{
                                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                      }}
                                      value={values.projectUserPlans[index].plan}
                                      onChange={handleChange}
                                      error={
                                        (touched.projectUserPlans && touched.projectUserPlans[index]
                                          ? touched.projectUserPlans[index].plan
                                          : false) &&
                                        Boolean(
                                          errors.projectUserPlans && errors.projectUserPlans[index]
                                            ? (errors.projectUserPlans as FormikErrors<ProjectUserPlanForm>[])[index]
                                                .plan
                                            : false
                                        )
                                      }
                                    />
                                  </FormControl>
                                </Tooltip>
                              </TableCell>
                              <TableCell>
                                <Tooltip
                                  followCursor
                                  title={
                                    ((touched.projectUserPlans && touched.projectUserPlans[index]
                                      ? touched.projectUserPlans[index].note
                                      : false) &&
                                    errors.projectUserPlans &&
                                    errors.projectUserPlans[index]
                                      ? (errors.projectUserPlans as FormikErrors<ProjectUserPlanForm>[])[index].note
                                      : undefined) || ""
                                  }
                                >
                                  <FormControl fullWidth>
                                    <TextField
                                      name={`projectUserPlans[${index}].note`}
                                      size="small"
                                      value={values.projectUserPlans[index].note}
                                      onChange={handleChange}
                                      error={
                                        (touched.projectUserPlans && touched.projectUserPlans[index]
                                          ? touched.projectUserPlans[index].note
                                          : false) &&
                                        Boolean(
                                          errors.projectUserPlans && errors.projectUserPlans[index]
                                            ? (errors.projectUserPlans as FormikErrors<ProjectUserPlanForm>[])[index]
                                                .note
                                            : false
                                        )
                                      }
                                    />
                                  </FormControl>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
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
          <LoadingButton type="submit" loading={isSubmitting}>
            Lưu
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateProjectPlanDialog;
