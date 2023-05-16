export type ApiError = {
  status: number;
  code?: string;
  name?: string;
  message: string;
  stack?: string;
};

export class ApiException extends Error {
  public status: number;
  public error: ApiError;

  public constructor(status: number, error: ApiError) {
    super(error.message);
    this.status = status;
    this.error = error;
  }
}
