import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import ProjectTable from "./ProjectTable";

export default {
  title: "Components/Organisms/ProjectTable",
  component: ProjectTable,
  args: {
    searchConditionForm: {
      year: new Date().getFullYear(),
    },
  },
} as ComponentMeta<typeof ProjectTable>;

const Template: ComponentStory<typeof ProjectTable> = (args) => <ProjectTable {...args} />;

export const Basic = Template.bind({});
