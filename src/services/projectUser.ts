import { gql } from "graphql-request";
import moment from "moment";

import { CreateProjectUserApiForm } from "../forms/projectUser";
import { Token } from "../types/nextAuth";
import { transformer } from "../utils/server";
import { fetcherQL } from ".";

export async function createProjectUser(token: Token, queryVariables: CreateProjectUserApiForm) {
  const query = gql`
    mutation (
      $joinDate: Date!
      $position: ENUM_PROJECTUSER_POSITION
      $publishedAt: DateTime!
      $projectId: ID!
      $userId: ID!
    ) {
      createProjectUser(
        data: {
          joinDate: $joinDate
          position: $position
          publishedAt: $publishedAt
          project: $projectId
          user: $userId
        }
      ) {
        data {
          id
        }
      }
    }
  `;

  const { projectId, userId, joinDate, position = null } = queryVariables;
  const { createProjectUser } = await fetcherQL(token.jwt, query, {
    projectId,
    userId,
    joinDate: moment(joinDate).format("YYYY-MM-DD"),
    position,
    publishedAt: new Date(),
  });
  return transformer(createProjectUser);
}
