import has from "lodash/has";
import isArray from "lodash/isArray";
import isObject from "lodash/isObject";
import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { AnySchema, ValidationError } from "yup";

import { UNAUTHORIZED_ERROR } from "../constants/error";
import { AnyObject } from "../types";
import { ApiError, ApiException } from "../types/error";
import { GraphResultData } from "../types/models";
import { Token } from "../types/nextAuth";

/**
 * Check and get authorization.
 *
 * @param req Next Request
 * @returns Token
 */
export const getCurrentUserToken = async (req: NextApiRequest) => {
  const token = await getToken({ req });
  if (!token) {
    throw new ApiException(401, UNAUTHORIZED_ERROR);
  }
  return token as Token;
};

/**
 * Get error information
 * @param err any
 * @returns Error
 */
export const getErrorInfo = (err: any) => {
  const { message, code, stack, name } = err;
  const error: AnyObject = {
    status: 500,
    ...{ code },
    ...{ name },
    message,
  };
  if (process.env.NODE_ENV !== "production") {
    error.stack = stack;
  }
  return { error };
};

/**
 * Validate data from request
 *
 * @param schema Yub validation schema
 * @param req Next Request
 * @param data Object data
 * @returns Object data or undefined
 */
export const validateInput = async <T = any>(schema: AnySchema, req: NextApiRequest, data?: AnyObject) => {
  try {
    data = { ...req.body, ...req.query, ...data };
    await schema.validate(data);
    return data as T;
  } catch (err) {
    const { type, name, message, stack } = err as ValidationError;
    const error: ApiError = {
      status: 400,
      code: type,
      name,
      message,
    };
    if (process.env.NODE_ENV !== "production") {
      error.stack = stack;
    }
    throw new ApiException(400, error);
  }
};

/**
 * Flatten `attributes` for the input object.
 *
 * @param data Object data
 * @returns Object data flatten `attributes`
 */
const flattenAttributes = (data: AnyObject): AnyObject => {
  if (has(data, "attributes")) {
    return {
      id: data.id,
      ...data.attributes,
    };
  }
  return data;
};

/**
 * Normalize format object data with recursive.
 *
 * @param data Object data
 * @returns Object data normalize format
 */
const recursiveTransformer = (data: AnyObject): AnyObject | null => {
  if (isArray(data)) {
    return data.map((item) => recursiveTransformer(item));
  }

  if (isObject(data) as boolean) {
    let dataTemp: AnyObject | null;
    if (isArray(data.data)) {
      dataTemp = [...data.data];
    } else if (isObject(data.data)) {
      dataTemp = flattenAttributes({ ...data.data });
    } else if (data.data === null) {
      dataTemp = null;
    } else {
      dataTemp = flattenAttributes(data);
    }
    for (const key in dataTemp) {
      dataTemp[key] = recursiveTransformer(dataTemp[key]);
    }
    return dataTemp;
  }

  return data;
};

/**
 * Transform the REST/GRAPHQL API response of Strapi to normalize format
 *
 * @see https://github.com/pankod/refine/blob/next/packages/strapi-v4/src/dataProvider.ts#L94
 * @param graphResultData Graph result data
 * @returns Data flatten `data` and `attributes`
 */
export const transformer = <T = any>(graphResultData: GraphResultData<T>) => {
  const data = graphResultData.data as AnyObject;
  return {
    data: recursiveTransformer(data) as T,
    ...{ meta: graphResultData.meta },
  };
};
