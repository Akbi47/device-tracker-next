import { Box } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import LoginForm from "./LoginForm";

export default {
  title: "Components/Organisms/Forms/LoginForm",
  component: LoginForm,
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => (
  <Box height="100vh">
    <LoginForm {...args} />
  </Box>
);

export const Basic = Template.bind({});
