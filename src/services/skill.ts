import { gql } from "graphql-request";

import { Token } from "../types/nextAuth";
import { transformer } from "../utils/server";
import { fetcherQL } from ".";

export async function getDropdownSkills(token: Token) {
  const query = gql`
    {
      skills(pagination: { limit: -1 }) {
        data {
          id
          attributes {
            name
          }
        }
      }
    }
  `;

  const { skills } = await fetcherQL(token.jwt, query);
  return transformer(skills);
}
