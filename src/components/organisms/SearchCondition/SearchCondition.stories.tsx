import { Grid } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import SearchCondition from "./SearchCondition";

export default {
  title: "Components/Organisms/SearchCondition",
  component: SearchCondition,
  args: {
    searchSkill: true,
  },
} as ComponentMeta<typeof SearchCondition>;

const Template: ComponentStory<typeof SearchCondition> = (args) => (
  <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="vi">
    <SearchCondition {...args} />
  </LocalizationProvider>
);

export const Basic = Template.bind({});

export const Usage: ComponentStory<typeof SearchCondition> = (args) => (
  <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="vi">
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SearchCondition {...args} />
      </Grid>
      <Grid item xs={12}>
        <SearchCondition {...args} searchSkill={false} />
      </Grid>
    </Grid>
  </LocalizationProvider>
);
