export type YubObjectSchema<T> = { [P in keyof T]?: T[P] | any };

export type AnyObject<T = any> = { [key: string]: T };
