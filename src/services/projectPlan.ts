import { gql } from "graphql-request";
import moment from "moment";

import {
  CreateProjectPlanForm,
  GetProjectPlanByIdAndMonthApiForm,
  GetProjectPlanByIdApiForm,
  UpdateProjectPlanForm,
} from "../forms/projectPlan";
import { Token } from "../types/nextAuth";
import { toNullOrNumber } from "../utils";
import { transformer } from "../utils/server";
import { fetcherQL } from ".";
import { createProjectUserPlan, updateProjectUserPlan } from "./projectUserPlan";

export async function getProjectPlanById(token: Token, queryVariables: GetProjectPlanByIdApiForm) {
  const query = gql`
    query ($projectId: ID!, $projectPlanId: ID) {
      project(id: $projectId) {
        data {
          id
          attributes {
            name
            customer {
              data {
                id
                attributes {
                  name
                }
              }
            }
          }
        }
      }
      projectPlan(id: $projectPlanId) {
        data {
          id
          attributes {
            month
            plan
            note
          }
        }
      }
      projectUsers(filters: { project: { id: { eq: $projectId } } }, pagination: { limit: -1 }) {
        data {
          id
          attributes {
            user {
              data {
                id
                attributes {
                  username
                  email
                  fullName
                }
              }
            }
            projectUserPlans(pagination: { limit: -1 }) {
              data {
                id
                attributes {
                  month
                  plan
                  actual
                  note
                }
              }
            }
          }
        }
      }
    }
  `;

  const { id: projectId } = queryVariables;
  const projectPlanId = toNullOrNumber(queryVariables.projectPlanId);
  const { project, projectPlan, projectUsers } = await fetcherQL(token.jwt, query, { projectId, projectPlanId });
  return transformer({ data: { project, projectPlan, projectUsers } });
}

export async function getProjectPlanByIdAndMonth(token: Token, queryVariables: GetProjectPlanByIdAndMonthApiForm) {
  const query = gql`
    query ($projectId: ID!, $projectPlanId: ID, $months: [Date]!) {
      project(id: $projectId) {
        data {
          id
          attributes {
            name
            customer {
              data {
                id
                attributes {
                  name
                }
              }
            }
          }
        }
      }
      projectPlan(id: $projectPlanId) {
        data {
          id
          attributes {
            month
            plan
            note
          }
        }
      }
      projectUsers(filters: { project: { id: { eq: $projectId } } }, pagination: { limit: -1 }) {
        data {
          id
          attributes {
            user {
              data {
                id
                attributes {
                  username
                  email
                  fullName
                }
              }
            }
            projectUserPlans(filters: { month: { between: $months } }) {
              data {
                id
                attributes {
                  month
                  plan
                  actual
                  note
                }
              }
            }
          }
        }
      }
    }
  `;

  const { id: projectId, month } = queryVariables;
  const projectPlanId = toNullOrNumber(queryVariables.projectPlanId);
  const months = [
    moment(month).startOf("month").format("YYYY-MM-DD"),
    moment(month).endOf("month").format("YYYY-MM-DD"),
  ];
  const { project, projectPlan, projectUsers } = await fetcherQL(token.jwt, query, {
    projectId,
    projectPlanId,
    months,
  });
  return transformer({ data: { project, projectPlan, projectUsers } });
}

export async function createProjectPlan(token: Token, queryVariables: CreateProjectPlanForm) {
  const query = gql`
    mutation ($projectId: ID!, $month: Date!, $plan: Float!, $note: String, $publishedAt: DateTime!) {
      createProjectPlan(
        data: { project: $projectId, month: $month, plan: $plan, note: $note, publishedAt: $publishedAt }
      ) {
        data {
          id
        }
      }
    }
  `;

  const { projectId, month, plan, note = "", projectUserPlans } = queryVariables;
  const { createProjectPlan } = await fetcherQL(token.jwt, query, {
    projectId,
    month: moment(month).format("YYYY-MM-DD"),
    plan: Number(plan),
    note,
    publishedAt: new Date(),
  });

  projectUserPlans.forEach(async (projectUserPlan) => {
    await createProjectUserPlan(token, projectUserPlan);
  });

  return transformer(createProjectPlan);
}

export async function updateProjectPlan(token: Token, queryVariables: UpdateProjectPlanForm) {
  const query = gql`
    mutation ($projectPlanId: ID!, $month: Date!, $plan: Float!, $note: String) {
      updateProjectPlan(id: $projectPlanId, data: { month: $month, plan: $plan, note: $note }) {
        data {
          id
        }
      }
    }
  `;

  const { projectPlanId, month, plan, note = "", projectUserPlans } = queryVariables;
  const { updateProjectPlan } = await fetcherQL(token.jwt, query, {
    projectPlanId,
    month: moment(month).format("YYYY-MM-DD"),
    plan: Number(plan),
    note,
  });

  projectUserPlans.forEach(async (projectUserPlan) => {
    if (projectUserPlan.projectUserPlanId) {
      await updateProjectUserPlan(token, projectUserPlan);
    } else {
      await createProjectUserPlan(token, projectUserPlan);
    }
  });

  return transformer(updateProjectPlan);
}
