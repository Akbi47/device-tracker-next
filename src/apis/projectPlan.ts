import { CreateProjectPlanForm, UpdateProjectPlanForm } from "../forms/projectPlan";
import { creator, updater } from "../services";

export const createProjectPlan = (projectPlanForm: CreateProjectPlanForm) =>
  creator("/api/project-plans", projectPlanForm);

export const updateProjectPlan = (projectPlanForm: UpdateProjectPlanForm) =>
  updater("/api/project-plans", projectPlanForm);
