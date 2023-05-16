import { gql } from "graphql-request";
import moment from "moment";

import { ProjectUserPlanForm } from "../forms/projectPlan";
import { Token } from "../types/nextAuth";
import { transformer } from "../utils/server";
import { fetcherQL } from ".";

export async function createProjectUserPlan(token: Token, queryVariables: ProjectUserPlanForm) {
  const query = gql`
    mutation ($projectUser: ID!, $month: Date!, $plan: Float!, $note: String, $publishedAt: DateTime!) {
      createProjectUserPlan(
        data: { projectUser: $projectUser, month: $month, plan: $plan, note: $note, publishedAt: $publishedAt }
      ) {
        data {
          id
        }
      }
    }
  `;

  const { projectUserId, month, plan, note } = queryVariables;
  const { createProjectUserPlan } = await fetcherQL(token.jwt, query, {
    projectUser: projectUserId,
    month: moment(month).format("YYYY-MM-DD"),
    plan: Number(plan),
    note,
    publishedAt: new Date(),
  });

  return transformer(createProjectUserPlan);
}

export async function updateProjectUserPlan(token: Token, queryVariables: ProjectUserPlanForm) {
  const query = gql`
    mutation ($projectUserPlanId: ID!, $month: Date!, $plan: Float!, $actual: Float!, $note: String) {
      updateProjectUserPlan(
        id: $projectUserPlanId
        data: { month: $month, plan: $plan, actual: $actual, note: $note }
      ) {
        data {
          id
        }
      }
    }
  `;

  const { projectUserPlanId, month, plan, actual, note } = queryVariables;
  const { updateProjectUserPlan } = await fetcherQL(token.jwt, query, {
    projectUserPlanId,
    month: moment(month).format("YYYY-MM-DD"),
    plan: Number(plan),
    actual: Number(actual),
    note,
  });

  return transformer(updateProjectUserPlan);
}
