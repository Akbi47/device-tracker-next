import { ApiError } from "../types/error";
/**
 * 401 Unauthorized
 */
export const UNAUTHORIZED_ERROR: ApiError = {
  status: 401,
  name: "UnauthorizedError",
  message: "Missing or invalid credentials",
};

/**
 * 403 Forbidden
 */
export const FORBIDDEN_ERROR: ApiError = {
  status: 405,
  name: "ForbiddenError",
  message: "Forbidden",
};

/**
 * 405 Method Not Allowed
 */
export const METHOD_NOT_ALLOWED_ERROR: ApiError = {
  status: 405,
  name: "MethodNotAllowedError",
  message: "Method Not Allowed",
};
