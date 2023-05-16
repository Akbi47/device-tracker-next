import { CreateProjectUserForm } from "../forms/projectUser";
import { creator } from "../services";

export const createProjectUser = (projectUserForm: CreateProjectUserForm) =>
  creator("/api/project-users", projectUserForm);
