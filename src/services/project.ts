import { gql } from "graphql-request";

import { SearchProjectApiForm } from "../forms/project";
import { Token } from "../types/nextAuth";
import { transformer } from "../utils/server";
import { fetcherQL } from ".";

export async function getProject(token: Token, id: string) {
  const query = gql`
    query ($id: ID!) {
      project(id: $id) {
        data {
          id
          attributes {
            name
            startDate
            endDate
            description
            requirement
            customer {
              data {
                id
                attributes {
                  name
                }
              }
            }
            skills(pagination: { limit: -1 }) {
              data {
                id
                attributes {
                  name
                }
              }
            }
            projectPlans(pagination: { limit: -1 }, sort: "month:asc") {
              data {
                id
                attributes {
                  month
                  plan
                  note
                }
              }
            }
            projectUsers(pagination: { limit: -1 }) {
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
                }
              }
            }
          }
        }
      }
    }
  `;

  const { project } = await fetcherQL(token.jwt, query, { id });
  return transformer(project);
}

export async function getProjects(token: Token, queryVariables: SearchProjectApiForm = {}) {
  const query = gql`
    query ($months: [Date!], $projectId: ID, $userId: ID) {
      projects(
        filters: { id: { eq: $projectId }, projectUsers: { user: { id: { eq: $userId } } } }
        pagination: { limit: -1 }
      ) {
        data {
          id
          attributes {
            name
            startDate
            endDate
            description
            requirement
            customer {
              data {
                id
                attributes {
                  name
                }
              }
            }
            skills(pagination: { limit: -1 }) {
              data {
                id
                attributes {
                  name
                }
              }
            }
            projectPlans(filters: { month: { between: $months } }, pagination: { limit: -1 }) {
              data {
                id
                attributes {
                  month
                  plan
                  note
                }
              }
            }
            projectUsers(pagination: { limit: -1 }) {
              data {
                id
                attributes {
                  joinDate
                  position
                  user {
                    data {
                      id
                      attributes {
                        username
                        fullName
                        email
                        phone
                        gPoint
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
        }
      }
    }
  `;

  const { year = new Date().getFullYear(), projectId, userId } = queryVariables;
  const months = [`${year}-01-01`, `${year}-12-31`];
  const { projects } = await fetcherQL(token.jwt, query, { months, projectId, userId });
  return transformer(projects);
}

export async function getDropdownProjects(token: Token) {
  const query = gql`
    {
      projects {
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
    }
  `;

  const { projects } = await fetcherQL(token.jwt, query);
  return transformer(projects);
}
