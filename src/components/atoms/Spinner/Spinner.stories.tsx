import { Grid } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import Spinner from "./Spinner";

export default {
  title: "Components/Atoms/Spinner",
  component: Spinner,
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = (args) => <Spinner {...args} />;

export const Basic = Template.bind({});

export const Usage: ComponentStory<typeof Spinner> = (args) => (
  <Grid container spacing={2}>
    <Grid item xs={4}>
      <Spinner {...args} size="small" />
    </Grid>
    <Grid item xs={4}>
      <Spinner {...args} size="medium" />
    </Grid>
    <Grid item xs={4}>
      <Spinner {...args} size="large" />
    </Grid>
  </Grid>
);
