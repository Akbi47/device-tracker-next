import axios from "axios";
import { gql } from "graphql-request";

import { STRAPI_API_URL } from "../constants";
import { SearchUserApiForm } from "../forms/user";
import { Token } from "../types/nextAuth";
import { transformer } from "../utils/server";
import { fetcherQL } from ".";

export type LoginData = {
  email: string;
  password: string;
};

/**
 * Login using the Strapi provider.
 *
 * @param email Email
 * @param password Password
 * @returns User
 */
export async function login({ email, password }: LoginData) {
  const { data } = await axios.post(`${STRAPI_API_URL}/auth/local`, {
    identifier: email,
    password,
  });
  return data;
}

export async function getUser(token: Token, id: string) {
  const query = gql`
    query ($id: ID!) {
      usersPermissionsUser(id: $id) {
        data {
          id
          attributes {
            username
            fullName
            email
            phone
            gPoint
            userSkills(pagination: { limit: -1 }) {
              data {
                id
                attributes {
                  level
                  skill {
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
            projectUsers(pagination: { limit: -1 }) {
              data {
                id
                attributes {
                  joinDate
                  position
                  project {
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
              }
            }
          }
        }
      }
    }
  `;

  const { usersPermissionsUser } = await fetcherQL(token.jwt, query, { id });
  return transformer(usersPermissionsUser);
}

export async function getUsers(token: Token, queryVariables: SearchUserApiForm = {}) {
  const query = gql`
    query ($months: [Date!], $userId: ID, $projectId: ID, $skillIds: [ID]) {
      usersPermissionsUsers(
        filters: {
          id: { eq: $userId }
          userSkills: { skill: { id: { in: $skillIds } } }
          projectUsers: { project: { id: { eq: $projectId } } }
        }
        pagination: { limit: -1 }
        sort: "username:asc"
      ) {
        data {
          id
          attributes {
            username
            fullName
            email
            phone
            gPoint
            updatedAt
            userSkills(pagination: { limit: -1 }) {
              data {
                id
                attributes {
                  level
                  skill {
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
            projectUsers(pagination: { limit: -1 }) {
              data {
                id
                attributes {
                  joinDate
                  position
                  project {
                    data {
                      id
                      attributes {
                        name
                      }
                    }
                  }
                  projectUserPlans(filters: { month: { between: $months } }, pagination: { limit: -1 }) {
                    data {
                      id
                      attributes {
                        month
                        plan
                        actual
                        note
                        updatedAt
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

  const { year = new Date().getFullYear(), userId, projectId, skillIds = [] } = queryVariables;
  const months = [`${year}-01-01`, `${year}-12-31`];
  const { usersPermissionsUsers } = await fetcherQL(token.jwt, query, {
    months,
    userId,
    projectId,
    ...(skillIds.length ? { skillIds } : {}),
  });
  return transformer(usersPermissionsUsers);
}

export async function getDropdownUsers(token: Token, includeUserSkills = false) {
  const query = gql`
    {
      usersPermissionsUsers(pagination: { limit: -1 }) {
        data {
          id
          attributes {
            username
            fullName
            email
            userSkills(filters: { id: { ${includeUserSkills ? "gt" : "eq"}: 0 } }, pagination: { limit: -1 }) {
              data {
                id
                attributes {
                  level
                  skill {
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
        }
      }
    }
  `;

  const { usersPermissionsUsers } = await fetcherQL(token.jwt, query);
  return transformer(usersPermissionsUsers);
}

export async function getProfile(token: Token) {
  const query = gql`
    query ($id: ID!) {
      usersPermissionsUser(id: $id) {
        data {
          id
          attributes {
            username
            fullName
            email
            phone
            isAdmin
            gPoint
            blocked
            createdAt
            updatedAt
          }
        }
      }
    }
  `;

  const { usersPermissionsUser } = await fetcherQL(token.jwt, query, {
    id: token.id,
  });
  return transformer(usersPermissionsUser);
}
