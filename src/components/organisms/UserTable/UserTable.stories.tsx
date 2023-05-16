import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import UserTable from "./UserTable";

export default {
  title: "Components/Organisms/UserTable",
  component: UserTable,
  args: {
    searchConditionForm: {
      year: new Date().getFullYear(),
    },
  },
} as ComponentMeta<typeof UserTable>;

const Template: ComponentStory<typeof UserTable> = (args) => <UserTable {...args} />;

export const Basic = Template.bind({});
