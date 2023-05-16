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

import { updateProjectPlan } from "../../../../apis/projectPlan";
import { SearchConditionForm } from "../../../../forms";
import { ProjectUserPlanForm, UpdateProjectPlanForm, updateProjectPlanFormSchema } from "../../../../forms/projectPlan";
import useProjectPlanAtMonth from "../../../../hooks/useProjectPlanAtMonth";
import { Loading } from "../../../molecules";

const initialFormValues: UpdateProjectPlanForm = {
  projectId: null,
  projectPlanId: null,
  month: "",
  plan: "",
  note: "",
  projectUserPlans: [],
};

type UpdateProjectPlanDialogProps = {
  open: boolean;
  projectId?: string;
  projectPlanId?: string;
  projectMonth?: string;
  searchConditionForm: SearchConditionForm;
  onClose?: () => void;
};

const UpdateProjectPlanDialog = ({
  open,
  projectId,
  projectPlanId,
  projectMonth,
  searchConditionForm,
  onClose,
}: UpdateProjectPlanDialogProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    project,
    projectPlan,
    projectUsers = [],
    loading,
  } = useProjectPlanAtMonth(projectId, projectPlanId, projectMonth);

  const handleSubmitFormik = (values: UpdateProjectPlanForm) => {
    const month = moment(projectMonth).format("YYYY/MM");
    updateProjectPlan(values)
      .then(() => {
        mutate(["/api/projects", searchConditionForm]);
        onClose && onClose();
        return enqueueSnackbar(`Chỉnh sửa kế hoạch tháng ${month} cho dự án thành công`);
      })
      .catch((err) => {
        setSubmitting(false);
        return enqueueSnackbar(err.message, { variant: "error" });
      });
  };

  const { values, errors, touched, isSubmitting, setSubmitting, handleSubmit, handleChange, resetForm } = useFormik({
    initialValues: initialFormValues,
    validationSchema: updateProjectPlanFormSchema,
    onSubmit: handleSubmitFormik,
  });

  useEffect(() => {
    if (!loading && project) {
      const month = moment(projectMonth).format("YYYY-MM-DD[T]00:00:00[Z]");
      const projectUserPlans: ProjectUserPlanForm[] =
        projectUsers.map((projectUser) => ({
          projectUserId: projectUser.id,
          month,
          projectUserPlanId: projectUser.projectUserPlans[0]?.id || "",
          plan: String(projectUser.projectUserPlans[0]?.plan || ""),
          actual: String(projectUser.projectUserPlans[0]?.actual || ""),
          note: projectUser.projectUserPlans[0]?.note || "",
        })) || [];
      resetForm({
        values: {
          ...initialFormValues,
          projectId: String(projectId),
          projectPlanId: String(projectPlanId),
          month,
          plan: String(projectPlan?.plan || ""),
          note: String(projectPlan?.note || ""),
          projectUserPlans,
        },
        isSubmitting: false,
      });
    }
  }, [
    loading,
    project,
    projectId,
    projectMonth,
    projectPlan?.note,
    projectPlan?.plan,
    projectPlanId,
    projectUsers,
    resetForm,
  ]);

  return (
    <Dialog open={open} scroll="paper" fullWidth maxWidth="md">
      <DialogTitle>Chỉnh sửa kế hoạch tháng {moment(projectMonth).format("YYYY/MM")}</DialogTitle>
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
                            <TableCell width={140}>Thực tế</TableCell>
                            <TableCell>Ghi chú</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {values.projectUserPlans.map((projectUserPlan, index) => (
                            <TableRow key={projectUserPlan.projectUserId}>
                              <TableCell align="right">{index + 1}</TableCell>
                              <TableCell>
                                {projectUsers[index].user.fullName || ""}
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
                                      ? touched.projectUserPlans[index].actual
                                      : false) &&
                                    errors.projectUserPlans &&
                                    errors.projectUserPlans[index]
                                      ? (errors.projectUserPlans as FormikErrors<ProjectUserPlanForm>[])[index].actual
                                      : undefined) || ""
                                  }
                                >
                                  <FormControl fullWidth>
                                    <TextField
                                      name={`projectUserPlans[${index}].actual`}
                                      size="small"
                                      InputProps={{
                                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                      }}
                                      value={values.projectUserPlans[index].actual}
                                      onChange={handleChange}
                                      error={
                                        (touched.projectUserPlans && touched.projectUserPlans[index]
                                          ? touched.projectUserPlans[index].actual
                                          : false) &&
                                        Boolean(
                                          errors.projectUserPlans && errors.projectUserPlans[index]
                                            ? (errors.projectUserPlans as FormikErrors<ProjectUserPlanForm>[])[index]
                                                .actual
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

export default UpdateProjectPlanDialog;
