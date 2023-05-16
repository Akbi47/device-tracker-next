import { gql } from "graphql-request";
import moment from "moment";

import { CreateDeviceForm, UpdateDeviceForm } from "../forms/device";
import { GetDeviceForm } from "../forms/device";
import { AnyObject } from "../types";
import { Token } from "../types/nextAuth";
import { randomString } from "../utils";
import { transformer } from "../utils/server";
import { fetcherQL } from ".";

export async function getDevices(token: Token) {
  const query = gql`
    {
      devices(pagination: { limit: -1 }, sort: "name:asc") {
        data {
          id
          attributes {
            name
            code
            mac
            active
            events(pagination: { limit: 1 }, sort: "createdAt:desc") {
              data {
                id
                attributes {
                  latitude
                  longitude
                  accuracy
                  speed
                  heading
                  datetime
                }
              }
            }
          }
        }
      }
    }
  `;

  const { devices } = await fetcherQL(token.jwt, query);
  return transformer(devices);
}

export async function getDevice(token: Token, queryVariables: GetDeviceForm) {
  const { date, id } = queryVariables;
  let variables: AnyObject = { id };
  let query = "";
  if (date) {
    query = gql`
      query ($id: ID!, $startDate: DateTime, $endDate: DateTime) {
        device(id: $id) {
          data {
            id
            attributes {
              name
              code
              mac
              active
              events(
                pagination: { limit: -1 }
                filters: { datetime: { between: [$startDate, $endDate] } }
                sort: "createdAt:asc"
              ) {
                data {
                  id
                  attributes {
                    latitude
                    longitude
                    accuracy
                    speed
                    heading
                    datetime
                  }
                }
              }
            }
          }
        }
      }
    `;
    const inputDate = moment.utc(date);
    const startDate = inputDate.startOf("date").toISOString();
    const endDate = inputDate.endOf("date").toISOString();
    variables = { ...variables, startDate, endDate };
  } else {
    query = gql`
      query ($id: ID!) {
        device(id: $id) {
          data {
            id
            attributes {
              name
              code
              mac
              active
            }
          }
        }
      }
    `;
  }

  const { device } = await fetcherQL(token.jwt, query, variables);
  return transformer(device);
}

export async function createDevice(token: Token, queryVariables: CreateDeviceForm) {
  const query = gql`
    mutation ($name: String, $code: String, $active: Boolean, $publishedAt: DateTime!) {
      createDevice(data: { name: $name, code: $code, active: $active, publishedAt: $publishedAt }) {
        data {
          id
        }
      }
    }
  `;

  const { name } = queryVariables;
  const { createDevice } = await fetcherQL(token.jwt, query, {
    name,
    code: randomString(6),
    active: false,
    publishedAt: new Date(),
  });

  return transformer(createDevice);
}

export async function updateDeviceName(token: Token, queryVariables: UpdateDeviceForm) {
  const query = gql`
    mutation ($id: ID!, $name: String) {
      updateDevice(id: $id, data: { name: $name }) {
        data {
          id
        }
      }
    }
  `;

  const { id, name } = queryVariables;
  const { updateDevice } = await fetcherQL(token.jwt, query, {
    id,
    name,
  });

  return transformer(updateDevice);
}
