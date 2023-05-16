import axios from "axios";
import { GraphQLClient, RequestDocument, Variables } from "graphql-request";

import { STRAPI_GRAPHQL_URL } from "../constants";
import { AnyObject } from "../types";
import { GraphResult } from "../types/models";
import { ensureString } from "../utils";

/**
 * Create GET data use axios.get
 *
 * @param url URL
 * @param params Object query string
 * @returns Data
 */
export const fetcher = async (url: string, params: AnyObject) => {
  if (params && Object.keys(params).length) {
    const searchParams = new URLSearchParams();
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null) {
        searchParams.append(key, ensureString(params[key]));
      }
    });
    url += `${url.includes("?") ? "&" : "?"}${searchParams.toString()}`;
  }
  const { data } = await axios.get(url);
  return data;
};

/**
 * Create POST data use axios.post
 *
 * @param url URL
 * @param params Object data
 * @returns Data
 */
export const creator = async (url: string, params: AnyObject) => {
  const { data } = await axios.post(url, params);
  return data;
};

/**
 * Create PUT data use axios.put
 *
 * @param url URL
 * @param params Object data
 * @returns Data
 */
export const updater = async (url: string, params: AnyObject) => {
  const { data } = await axios.put(url, params);
  return data;
};

/**
 * Create DELETE data use axios.delete
 *
 * @param url URL
 * @param params Object data
 * @returns Data
 */
/* export const eraser = async (url: string, params: AnyObject) => {
  const { data } = await axios.put(url, params);
  return data;
}; */

export const fetcherWithToken = async (url: string, token: string) => {
  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

/**
 * Get Graph QL Client
 * @param token Auth Token
 * @returns GraphQLClient
 */
const getGraphQLClient = (token?: string) => {
  const client = new GraphQLClient(STRAPI_GRAPHQL_URL);
  if (token) {
    client.setHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
  return client;
};

export const fetcherQL = async <T = any>(token: string, document: RequestDocument, variables?: Variables) => {
  const client = getGraphQLClient(token);
  const res = await client.request<GraphResult<T>>(document, variables);
  return res;
};
