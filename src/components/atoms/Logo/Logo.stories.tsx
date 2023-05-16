import { Grid } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import Logo from "./Logo";

export default {
  title: "Components/Atoms/Logo",
  component: Logo,
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />;

export const Basic = Template.bind({});

export const Usage: ComponentStory<typeof Logo> = (args) => (
  <Grid container spacing={2}>
    <Grid item xs={4}>
      <Logo {...args} size="small" />
    </Grid>
    <Grid item xs={4}>
      <Logo {...args} size="medium" />
    </Grid>
    <Grid item xs={4}>
      <Logo {...args} size="large" />
    </Grid>
  </Grid>
);
