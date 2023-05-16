import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";

import { useProject } from "../../../../hooks";
import { Spinner } from "../../../atoms";
import { Loading } from "../../../molecules";

type ProjectDetailDialogProps = {
  open: boolean;
  projectId?: string;
  onClose?: () => void;
};

const ProjectDetailDialog = ({ open, projectId, onClose }: ProjectDetailDialogProps) => {
  const { project, loading } = useProject(projectId);

  return (
    <Dialog open={open} onClose={onClose} scroll="paper" fullWidth maxWidth="xs">
      <DialogTitle sx={{ display: "flex" }}>
        {loading ? (
          <Spinner size="small" />
        ) : (
          <Typography variant="h6">
            {project?.customer.name && (
              <Typography component="span" variant="h6" color="text.secondary">
                {project?.customer.name}&nbsp;/&nbsp;
              </Typography>
            )}
            {project?.name}
          </Typography>
        )}
      </DialogTitle>
      <DialogContent dividers>
        {loading ? (
          <Loading />
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={4}>
                  <Typography fontWeight="bold">Ngày bắt đầu</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{`${moment(project?.startDate).format("DD/MM/YYYY")}`}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography fontWeight="bold">Ngày kết thúc</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{`${project?.endDate ? moment(project?.endDate).format("DD/MM/YYYY") : ""}`}</Typography>
                </Grid>
                {project?.description && (
                  <>
                    <Grid item xs={4}>
                      <Typography fontWeight="bold">Mô tả dự án</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{`${project?.description}`}</Typography>
                    </Grid>
                  </>
                )}
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
                {project?.requirement && (
                  <>
                    <Grid item xs={4}>
                      <Typography fontWeight="bold">Yêu cầu khác</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{`${project?.requirement}`}</Typography>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>

            {(project?.projectPlans.length || 0) > 0 && (
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography fontWeight="bold">Kế hoạch</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            {project?.projectPlans.map((projectPlan) => (
                              <TableCell key={projectPlan.id} align="center">
                                {moment(projectPlan.month).format("MM/YYYY")}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            {project?.projectPlans.map((projectPlan) => (
                              <TableCell key={projectPlan.id} align="center">
                                {projectPlan.plan}MM
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectDetailDialog;
