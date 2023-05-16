import { Box, Container } from "@mui/material";
import { useCallback, useState } from "react";

import { Base } from "../../components/layouts";
import { NavBar, ProjectTable, SearchCondition } from "../../components/organisms";
import {
  CreateProjectPlanDialog,
  CreateProjectUserDialog,
  ProjectDetailDialog,
  UpdateProjectPlanDialog,
} from "../../components/organisms/dialogs";
import { SearchConditionForm } from "../../forms";
import withPageProtected from "../../utils/withPageProtected";

const TITLE = "Quản lý dự án";

export default withPageProtected(() => {
  const [searchConditionForm, setSearchConditionForm] = useState<SearchConditionForm>({
    year: new Date().getFullYear(),
  });
  const [projectDetailDialogOpen, setProjectDetailDialogOpen] = useState(false);
  const [createProjectUserDialogOpen, setCreateProjectUserDialogOpen] = useState(false);
  const [createProjectPlanDialogOpen, setCreateProjectPlanDialogOpen] = useState(false);
  const [updateProjectPlanDialogOpen, setUpdateProjectPlanDialogOpen] = useState(false);
  const [projectId, setProjectId] = useState<string>();
  const [projectPlanId, setProjectPlanId] = useState<string>();
  const [projectMonth, setProjectMonth] = useState<string>();

  const handleSearch = useCallback((values: SearchConditionForm) => setSearchConditionForm(values), []);
  const handleProjectDetailDialogClose = useCallback(() => setProjectDetailDialogOpen(false), []);
  const handleCreateProjectUserDialogClose = useCallback(() => setCreateProjectUserDialogOpen(false), []);
  const handleCreateProjectPlanDialogClose = useCallback(() => setCreateProjectPlanDialogOpen(false), []);
  const handleUpdateProjectPlanDialogClose = useCallback(() => setUpdateProjectPlanDialogOpen(false), []);

  const handleProjectDetailClick = useCallback((projectId: string) => {
    setProjectId(projectId);
    setProjectDetailDialogOpen(true);
  }, []);

  const handleAddProjectUser = useCallback((projectId: string) => {
    setProjectId(projectId);
    setCreateProjectUserDialogOpen(true);
  }, []);

  const handleCreateProjectPlan = useCallback((projectId: string, month: string) => {
    setProjectId(projectId);
    setProjectMonth(month);
    setCreateProjectPlanDialogOpen(true);
  }, []);

  const handleUpdateProjectPlan = useCallback((projectId: string, month: string, projectPlanId?: string) => {
    setProjectId(projectId);
    setProjectMonth(month);
    setProjectPlanId(projectPlanId);
    setUpdateProjectPlanDialogOpen(true);
  }, []);

  return (
    <Base
      title={TITLE}
      header={
        <>
          <NavBar />
          <Container maxWidth={false} sx={{ paddingY: 3 }}>
            <SearchCondition onSearch={handleSearch} />
          </Container>
        </>
      }
    >
      <Box height="100%">
        <ProjectTable
          searchConditionForm={searchConditionForm}
          onProjectDetailClick={handleProjectDetailClick}
          onAddProjectUser={handleAddProjectUser}
          onCreateProjectPlan={handleCreateProjectPlan}
          onUpdateProjectPlan={handleUpdateProjectPlan}
        />
      </Box>

      <ProjectDetailDialog
        open={projectDetailDialogOpen}
        projectId={projectId}
        onClose={handleProjectDetailDialogClose}
      />

      {createProjectUserDialogOpen && (
        <CreateProjectUserDialog
          open={createProjectUserDialogOpen}
          projectId={projectId}
          searchConditionForm={searchConditionForm}
          onClose={handleCreateProjectUserDialogClose}
        />
      )}

      {createProjectPlanDialogOpen && (
        <CreateProjectPlanDialog
          open={createProjectPlanDialogOpen}
          projectId={projectId}
          projectMonth={projectMonth}
          searchConditionForm={searchConditionForm}
          onClose={handleCreateProjectPlanDialogClose}
        />
      )}

      {updateProjectPlanDialogOpen && (
        <UpdateProjectPlanDialog
          open={updateProjectPlanDialogOpen}
          projectId={projectId}
          projectPlanId={projectPlanId}
          projectMonth={projectMonth}
          searchConditionForm={searchConditionForm}
          onClose={handleUpdateProjectPlanDialogClose}
        />
      )}
    </Base>
  );
});
