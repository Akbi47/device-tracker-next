import { ComponentMeta, ComponentStory } from "@storybook/react";
import { vi } from "date-fns/locale";
import setDefaultOptions from "date-fns/setDefaultOptions";
import React from "react";

import UserWithSkills from "./UserWithSkills";

const USER: any = {
  id: "1",
  username: "anonymous.user",
  fullName: "Anonymous User",
  email: "username@gss-sol.com",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  userSkills: [
    {
      id: "13",
      level: "Senior",
      skill: {
        id: "1",
        name: ".NET Core",
      },
    },
    {
      id: "14",
      level: "Senior",
      skill: {
        id: "2",
        name: "AngularJS",
      },
    },
    {
      id: "15",
      level: "Expert",
      skill: {
        id: "3",
        name: "TypeScript",
      },
    },
    {
      id: "16",
      level: "Mid_Senior",
      skill: {
        id: "4",
        name: "Java",
      },
    },
    {
      id: "17",
      level: "Mid_Senior",
      skill: {
        id: "5",
        name: "MySQL",
      },
    },
    {
      id: "18",
      level: "Junior",
      skill: {
        id: "9",
        name: "Vue.js",
      },
    },
    {
      id: "19",
      level: "Mid_Senior",
      skill: {
        id: "11",
        name: "Postgres",
      },
    },
    {
      id: "20",
      level: "Junior",
      skill: {
        id: "12",
        name: "SQL Server",
      },
    },
    {
      id: "21",
      level: "Expert",
      skill: {
        id: "13",
        name: "JavaScript",
      },
    },
    {
      id: "22",
      level: "Junior",
      skill: {
        id: "14",
        name: "Struts 1.x",
      },
    },
    {
      id: "23",
      level: "Junior",
      skill: {
        id: "15",
        name: "Struts 2.x",
      },
    },
    {
      id: "24",
      level: "Junior",
      skill: {
        id: "17",
        name: "Spring Boot",
      },
    },
    {
      id: "25",
      level: "Senior",
      skill: {
        id: "18",
        name: "React Native",
      },
    },
    {
      id: "26",
      level: "Junior",
      skill: {
        id: "19",
        name: "Python",
      },
    },
    {
      id: "27",
      level: "Mid_Senior",
      skill: {
        id: "6",
        name: "C#",
      },
    },
    {
      id: "28",
      level: "Senior",
      skill: {
        id: "20",
        name: "Node.js",
      },
    },
    {
      id: "29",
      level: "Junior",
      skill: {
        id: "24",
        name: ".NET",
      },
    },
    {
      id: "30",
      level: "Junior",
      skill: {
        id: "25",
        name: "VB.NET",
      },
    },
    {
      id: "31",
      level: "Senior",
      skill: {
        id: "26",
        name: "ReactJS",
      },
    },
    {
      id: "32",
      level: "Junior",
      skill: {
        id: "27",
        name: "Objective-C",
      },
    },
    {
      id: "33",
      level: "Senior",
      skill: {
        id: "28",
        name: "Next.js",
      },
    },
    {
      id: "34",
      level: "Junior",
      skill: {
        id: "29",
        name: "NestJS",
      },
    },
    {
      id: "35",
      level: "Mid_Senior",
      skill: {
        id: "30",
        name: "Express.js",
      },
    },
  ],
  projectUsers: [],
};

setDefaultOptions({ locale: vi });

export default {
  title: "Components/Molecules/UserWithSkills",
  component: UserWithSkills,
  args: {
    user: USER,
  },
} as ComponentMeta<typeof UserWithSkills>;

const Template: ComponentStory<typeof UserWithSkills> = (args) => <UserWithSkills {...args} />;

export const Basic = Template.bind({});
