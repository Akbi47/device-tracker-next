export type GraphResultData<T = any> = {
  data: T;
  meta?: Meta;
};

export type GraphResult<T = any> = {
  [key: string]: GraphResultData<T>;
};

export type ApiResult<T = any> = {
  data: T;
  meta?: Meta;
};

export type Meta = {
  pagination: Pagination;
};

export type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type CommonAttributes = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type UserSkillLevel = "Junior" | "Mid-Senior" | "Senior" | "Expert";

export type UserSkill = CommonAttributes & {
  level: UserSkillLevel;
  user: User;
  skill: Skill;
};

export type User = CommonAttributes & {
  username: string;
  email: string;
  provider?: string;
  fullName?: string;
  phone?: string;
  confirmed: boolean;
  blocked: boolean;
  isAdmin: boolean;
  gPoint?: number;
  partner?: Customer;
  userSkills: UserSkill[];
  projectUsers: ProjectUser[];
};

export type ProjectUserPlan = CommonAttributes & {
  month: string;
  plan: number;
  actual?: number;
  note?: string;
  projectUser: ProjectUser;
};

export type ProjectUserPlanPosition = "PM" | "PL" | "QC" | "DEV" | "TESTER";
export type ProjectUser = CommonAttributes & {
  joinDate: string;
  position?: string;
  user: User;
  project: Project;
  projectUserPlans: ProjectUserPlan[];
};

export type ProjectPlan = CommonAttributes & {
  month: string;
  plan: number;
  note?: string;
  project: Project;
};

export type Project = CommonAttributes & {
  name: string;
  description?: string;
  requirement?: string;
  startDate: string;
  endDate?: string;
  customer: Customer;
  skills: Skill[];
  projectPlans: ProjectPlan[];
  projectUsers: ProjectUser[];
};

export type Customer = CommonAttributes & {
  name: string;
  description?: string;
  projects: Project[];
  users: User[];
};

export type Skill = CommonAttributes & {
  name: string;
  description?: string;
  projects: Project[];
  userSkills: UserSkill[];
};

export type Device = CommonAttributes & {
  name: string;
  code: string;
  mac?: string;
  active: boolean;
  events: EventData[];
};

export type EventData = CommonAttributes & {
  device: Device;
  latitude: number;
  longitude: number;
  accuracy?: number;
  speed?: number;
  heading?: number;
  datetime: string;
};
