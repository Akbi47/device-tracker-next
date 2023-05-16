import { Grid } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import Loading from "./Loading";

export default {
  title: "Components/Molecules/Loading",
  component: Loading,
  args: {
    label: "Loading...",
  },
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = (args) => <Loading {...args} />;

export const Basic = Template.bind({});

export const Usage: ComponentStory<typeof Loading> = (args) => (
  <Grid container spacing={2}>
    <Grid item xs={4}>
      <Loading size="small" />
    </Grid>
    <Grid item xs={4}>
      <Loading size="medium" />
    </Grid>
    <Grid item xs={4}>
      <Loading size="large" />
    </Grid>
    <Grid item xs={4}>
      <Loading {...args} size="small" />
    </Grid>
    <Grid item xs={4}>
      <Loading {...args} size="medium" />
    </Grid>
    <Grid item xs={4}>
      <Loading {...args} size="large" />
    </Grid>
  </Grid>
);
