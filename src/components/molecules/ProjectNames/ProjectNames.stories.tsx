import { ComponentMeta, ComponentStory } from "@storybook/react";
import { vi } from "date-fns/locale";
import setDefaultOptions from "date-fns/setDefaultOptions";
import React from "react";

import ProjectNames from "./ProjectNames";

const PROJECT_USERS: any[] = [
  {
    id: "15",
    joinDate: "2022-10-01",
    position: "DEV",
    project: {
      id: "1",
      name: "Yoursup",
    },
    projectUserPlans: [
      {
        id: "20",
        month: "2022-07-01",
        plan: 0,
        actual: 0,
        note: "",
        updatedAt: "2022-10-04T08:02:04.956Z",
      },
    ],
  },
  {
    id: "19",
    joinDate: "2022-10-02",
    position: "DEV",
    project: {
      id: "3",
      name: "Annotation UI",
    },
    projectUserPlans: [
      {
        id: "13",
        month: "2022-10-02",
        plan: 50,
        actual: null,
        note: "",
        updatedAt: "2022-10-01T19:40:36.219Z",
      },
      {
        id: "18",
        month: "2022-11-01",
        plan: 10,
        actual: 11,
        note: "12",
        updatedAt: "2022-10-02T16:06:37.719Z",
      },
    ],
  },
  {
    id: "20",
    joinDate: "2022-10-02",
    position: "DEV",
    project: {
      id: "2",
      name: "IDOM",
    },
    projectUserPlans: [
      {
        id: "24",
        month: "2022-06-01",
        plan: 100,
        actual: 100,
        note: "",
        updatedAt: "2022-10-06T11:50:47.390Z",
      },
      {
        id: "29",
        month: "2022-08-01",
        plan: 100,
        actual: 0,
        note: "",
        updatedAt: "2022-10-02T17:13:15.147Z",
      },
      {
        id: "31",
        month: "2022-11-01",
        plan: 0,
        actual: null,
        note: "",
        updatedAt: "2022-10-02T17:13:08.318Z",
      },
    ],
  },
  {
    id: "22",
    joinDate: "2022-10-04",
    position: "PL",
    project: {
      id: "4",
      name: "Test",
    },
    projectUserPlans: [],
  },
];

setDefaultOptions({ locale: vi });

export default {
  title: "Components/Molecules/ProjectNames",
  component: ProjectNames,
  args: {
    projectUsers: PROJECT_USERS,
  },
} as ComponentMeta<typeof ProjectNames>;

const Template: ComponentStory<typeof ProjectNames> = (args) => <ProjectNames {...args} />;

export const Basic = Template.bind({});
