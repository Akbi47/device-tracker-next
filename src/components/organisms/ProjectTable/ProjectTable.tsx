import { AddCircleTwoTone, EditTwoTone, InfoTwoTone } from "@mui/icons-material";
import {
  Alert,
  Box,
  IconButton,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useCallback, useState } from "react";

import { SearchConditionForm } from "../../../forms";
import { useProjects } from "../../../hooks";
import { Project } from "../../../types/models";
import { Loading } from "../../molecules";

type ProjectTableProps = {
  searchConditionForm: SearchConditionForm;
  onProjectDetailClick?: (_projectId: string) => void;
  onAddProjectUser?: (_projectId: string) => void;
  onCreateProjectPlan?: (_projectId: string, _month: string) => void;
  onUpdateProjectPlan?: (_projectId: string, _month: string, _projectPlanId?: string) => void;
};

const ProjectTable = ({
  searchConditionForm,
  onProjectDetailClick,
  onAddProjectUser,
  onCreateProjectPlan,
  onUpdateProjectPlan,
}: ProjectTableProps) => {
  const [currentYear] = useState(new Date().getFullYear());
  const [currentMonth] = useState(new Date().getMonth() + 1);
  const { projects, error, loading } = useProjects(searchConditionForm);

  const calcSum = useCallback((project: Project, month: number) => {
    let sumPlan = 0;
    let sumActual = 0;
    project.projectUsers.forEach((projectUser) => {
      const projectUserPlans = projectUser.projectUserPlans.filter((item) => moment(item.month).month() + 1 === month);
      sumPlan += projectUserPlans.reduce((prev, current) => prev + current.plan, 0) * (projectUser.user.gPoint || 1);
      sumActual +=
        projectUserPlans.reduce((prev, current) => prev + (current.actual || 0), 0) * (projectUser.user.gPoint || 1);
    });
    return [Number((sumPlan / 100).toFixed(2)), Number((sumActual / 100).toFixed(2))];
  }, []);

  const calcDiff = useCallback(
    (project: Project, month: number) => {
      const [_sumPlan, sumActual] = calcSum(project, month);
      const sumProjectPlan =
        project.projectPlans.find((projectPlan) => moment(projectPlan.month).month() + 1 === month)?.plan || 0;
      return Number((sumProjectPlan - sumActual).toFixed(2));
    },
    [calcSum]
  );

  const handleProjectDetailClick = useCallback(
    (projectId: string) => () => {
      onProjectDetailClick && onProjectDetailClick(projectId);
    },
    [onProjectDetailClick]
  );

  const handleAddProjectUserClick = useCallback(
    (projectId: string) => (event: any) => {
      event.preventDefault();
      onAddProjectUser && onAddProjectUser(projectId);
    },
    [onAddProjectUser]
  );

  const handleCreateProjectPlanClick = useCallback(
    (projectId: string, month: number) => () => {
      onCreateProjectPlan && onCreateProjectPlan(projectId, `${searchConditionForm.year}-${month}-01`);
    },
    [onCreateProjectPlan, searchConditionForm.year]
  );

  const handleUpdateProjectPlanClick = useCallback(
    (projectId: string, month: number, projectPlanId?: string) => () => {
      onUpdateProjectPlan && onUpdateProjectPlan(projectId, `${searchConditionForm.year}-${month}-01`, projectPlanId);
    },
    [onUpdateProjectPlan, searchConditionForm.year]
  );

  return (
    <TableContainer
      sx={{
        height: "100%",
        ".sticky-column": {
          left: 0,
          zIndex: 100,
          position: "sticky",
          bgcolor: "#ffffff",
          borderRight: "1px solid #e0e0e0",
        },
      }}
    >
      <Table stickyHeader size="small" sx={{ width: "100%" }}>
        <TableHead sx={{ th: { bgcolor: "#ffffff" } }}>
          <TableRow>
            <TableCell
              className="sticky-column"
              sx={{ width: 200, minWidth: 200, zIndex: "300 !important" }}
              rowSpan={2}
            >
              Dự án
            </TableCell>
            <TableCell
              className="sticky-column"
              sx={{ width: 200, minWidth: 200, zIndex: "300 !important", left: "233px !important" }}
              rowSpan={2}
            >
              Nhân sự
            </TableCell>
            <TableCell
              className="sticky-column"
              align="right"
              sx={{ whiteSpace: "nowrap", width: 50, minWidth: 50, zIndex: "300 !important", left: "466px !important" }}
              rowSpan={2}
            >
              G Point
            </TableCell>
            {Array.from(Array(12).keys()).map((num) => (
              <TableCell key={num} align="center" colSpan={2}>
                T{num + 1}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            {Array.from(Array(24).keys()).map((num) => (
              <TableCell key={num} align="center" sx={{ top: 37 }}>
                <Typography fontSize="x-small">{num % 2 ? "Actual" : "Plan"}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(error || loading) && (
            <TableRow>
              <TableCell colSpan={27}>{error ? <Alert severity="error">Error</Alert> : <Loading />}</TableCell>
            </TableRow>
          )}
          {projects.map((project) => {
            const projectUsers = project.projectUsers || [];
            const rowCount = projectUsers.length + 3;
            return Array.from(Array(rowCount).keys()).map((row) => (
              <TableRow key={row}>
                {row === 0 && (
                  <TableCell className="sticky-column" rowSpan={rowCount} sx={{ verticalAlign: "top" }}>
                    <Stack direction="row">
                      <Stack flex={1}>
                        <Typography fontWeight="bold">
                          {project.customer?.name && (
                            <Typography component="span" fontWeight="bold" color="text.secondary">
                              {project.customer.name}&nbsp;/&nbsp;
                            </Typography>
                          )}
                          {project.name}
                        </Typography>

                        <Typography fontSize="small">
                          Bắt đầu: {`${moment(project.startDate).format("DD/MM/YYYY")}`}
                        </Typography>
                        <Typography fontSize="small">
                          Kết thúc: {`${project.endDate ? moment(project.endDate).format("DD/MM/YYYY") : "-"}`}
                        </Typography>
                      </Stack>
                      <Box>
                        <IconButton size="small" onClick={handleProjectDetailClick(project.id)}>
                          <InfoTwoTone />
                        </IconButton>
                      </Box>
                    </Stack>
                  </TableCell>
                )}
                {row < projectUsers.length && (
                  <>
                    <TableCell className="sticky-column" sx={{ left: "233px !important" }}>
                      {projectUsers[row]?.user?.fullName}
                      {projectUsers[row]?.position && ` (${projectUsers[row]?.position})`}
                    </TableCell>
                    <TableCell className="sticky-column" align="right" sx={{ left: "466px !important" }}>
                      {projectUsers[row]?.user?.gPoint}
                    </TableCell>
                  </>
                )}
                {row === projectUsers.length && (
                  <>
                    <TableCell
                      className="sticky-column"
                      rowSpan={3}
                      sx={{ verticalAlign: "top", left: "233px !important" }}
                    >
                      <Link href="#" onClick={handleAddProjectUserClick(project.id)}>
                        + thêm nhân sự
                      </Link>
                    </TableCell>
                    <TableCell className="sticky-column" rowSpan={3} sx={{ left: "466px !important" }} />
                  </>
                )}
                {Array.from(Array(24).keys()).map((num) => {
                  const projectPlans = project.projectPlans || [];
                  const numToMonth = Math.trunc(num / 2 + 1);
                  const [sumPlan, sumActual] = calcSum(project, numToMonth);
                  const diff = calcDiff(project, numToMonth);
                  const existedMonth = projectPlans.some((projectPlan) => {
                    const month = projectPlan.month ? moment(projectPlan.month).month() + 1 : -1;
                    return month === numToMonth;
                  });
                  const projectPlan = projectPlans.find(
                    (projectPlan) => moment(projectPlan.month).month() + 1 === numToMonth
                  );

                  return existedMonth ? (
                    <>
                      {row < projectUsers.length && (
                        <TableCell key={num} align="center" sx={{ bgcolor: "#e6ffff" }}>
                          {num % 2 === 0 ? (
                            <Typography>
                              {projectUsers[row].projectUserPlans.find(
                                (projectUserPlan) => moment(projectUserPlan.month).month() + 1 === numToMonth
                              )?.plan || 0}
                            </Typography>
                          ) : (
                            <Typography>
                              {projectUsers[row].projectUserPlans.find(
                                (projectUserPlan) => moment(projectUserPlan.month).month() + 1 === numToMonth
                              )?.actual || 0}
                            </Typography>
                          )}
                        </TableCell>
                      )}
                      {row === projectUsers.length && (
                        <TableCell key={num} align="center" sx={{ bgcolor: "#ccffff" }}>
                          {num % 2 === 0 ? <Typography>{sumPlan}</Typography> : <Typography>{sumActual}</Typography>}
                        </TableCell>
                      )}
                      {row + 2 === rowCount && num % 2 === 0 && (
                        <TableCell key={num} align="right" colSpan={2}>
                          <Typography>Plan {projectPlan?.plan || 0}MM</Typography>
                        </TableCell>
                      )}
                      {row + 1 === rowCount && num % 2 === 0 && (
                        <TableCell key={num} align="right" colSpan={2}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <IconButton
                              size="small"
                              onClick={handleUpdateProjectPlanClick(project.id, numToMonth, projectPlan?.id)}
                            >
                              <EditTwoTone />
                            </IconButton>
                            <Tooltip title={projectPlan?.note || ""}>
                              <Typography
                                fontWeight="bold"
                                sx={{ color: diff === 0 ? "inherit" : diff > 0 ? "#4caf50" : "#ef5350" }}
                              >
                                {diff === 0 ? "" : diff > 0 ? "+" : "-"} {Math.abs(diff)}
                              </Typography>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      )}
                    </>
                  ) : row + 1 < rowCount ? (
                    <TableCell
                      key={num}
                      align="center"
                      sx={{ bgcolor: row + 2 === rowCount ? "transparent" : "#f2f2f2" }}
                    >
                      &nbsp;
                    </TableCell>
                  ) : (
                    num % 2 === 0 && (
                      <TableCell key={num} align="center" colSpan={2}>
                        &nbsp;
                        {searchConditionForm.year >= currentYear && numToMonth >= currentMonth && (
                          <IconButton size="small" onClick={handleCreateProjectPlanClick(project.id, numToMonth)}>
                            <AddCircleTwoTone />
                          </IconButton>
                        )}
                        &nbsp;
                      </TableCell>
                    )
                  );
                })}
              </TableRow>
            ));
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectTable;
